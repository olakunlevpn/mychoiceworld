<?php

use App\Enums\PageStatus;
use App\Http\Controllers\Customer\AiMatchController;
use App\Http\Controllers\Customer\DashboardController as CustomerDashboardController;
use App\Http\Controllers\Customer\NotificationController;
use App\Http\Controllers\Customer\ReservationController as CustomerReservationController;
use App\Http\Controllers\Customer\ReviewController as CustomerReviewController;
use App\Http\Controllers\Customer\WishlistController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductBrowseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\StoreBrowseController;
use App\Http\Controllers\Vendor\AnalyticsController;
use App\Http\Controllers\Vendor\DashboardController;
use App\Http\Controllers\Vendor\ProductController;
use App\Http\Controllers\Vendor\ReservationController;
use App\Http\Controllers\Vendor\ReviewController;
use App\Http\Controllers\Vendor\StoreProfileController;
use App\Mail\NewsletterWelcome;
use App\Models\ContactMessage;
use App\Models\EventType;
use App\Models\Faq;
use App\Models\HelpArticle;
use App\Models\HelpCategory;
use App\Models\NewsletterSubscriber;
use App\Models\Page;
use App\Models\StylePreference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', HomeController::class)->name('home');
Route::get('/products', [ProductBrowseController::class, 'index'])->name('products.index');
Route::get('/products/{product:slug}', [ProductBrowseController::class, 'show'])->name('products.show');
Route::get('/stores', [StoreBrowseController::class, 'index'])->name('stores.index');
Route::get('/stores/{vendor:slug}', [StoreBrowseController::class, 'show'])->name('stores.show');
Route::get('/search', SearchController::class)->name('search');

// CMS pages (dynamic — replaces hardcoded about/privacy/terms/cookies)
Route::get('/page/{page:slug}', function (Page $page) {
    abort_unless($page->status === PageStatus::Published, 404);

    return Inertia\Inertia::render('CmsPage', ['page' => $page]);
})->name('cms.page');
// Keep short URLs for common pages
Route::get('/about', fn () => redirect('/page/about'));
Route::get('/privacy', fn () => redirect('/page/privacy'));
Route::get('/terms', fn () => redirect('/page/terms'));
Route::get('/cookies', fn () => redirect('/page/cookies'));
Route::get('/find-my-match', fn () => Inertia\Inertia::render('FindMyMatch', [
    'eventTypes' => EventType::where('is_active', true)->orderBy('name')->get(['id', 'name', 'slug']),
    'stylePreferences' => StylePreference::where('is_active', true)->orderBy('name')->get(['id', 'name', 'slug']),
]))->name('find-my-match');
Route::get('/help', fn () => Inertia\Inertia::render('Help/Index', ['categories' => HelpCategory::where('is_active', true)->withCount('articles')->orderBy('sort_order')->get()]))->name('help');
Route::get('/help/category/{helpCategory:slug}', fn (HelpCategory $helpCategory) => Inertia\Inertia::render('Help/Category', ['category' => $helpCategory, 'articles' => $helpCategory->articles()->where('is_published', true)->orderBy('sort_order')->get()]))->name('help.category');
Route::get('/help/articles/{helpArticle:slug}', fn (HelpArticle $helpArticle) => Inertia\Inertia::render('Help/Article', ['article' => $helpArticle->load('category')]))->name('help.article');
Route::get('/faq', fn () => Inertia\Inertia::render('FAQ', ['faqs' => Faq::where('is_active', true)->orderBy('sort_order')->get()]))->name('faq');
Route::get('/contact', fn () => Inertia\Inertia::render('Contact'))->name('contact');
Route::post('/contact', function (Request $request) {
    $request->validate(['name' => 'required|string|max:255', 'email' => 'required|email', 'subject' => 'required|string|max:255', 'message' => 'required|string|max:5000']);
    ContactMessage::create($request->only(['name', 'email', 'subject', 'message']));

    return back()->with('success', 'Your message has been sent. We\'ll get back to you soon.');
})->name('contact.send');
Route::post('/newsletter/subscribe', function (Request $request) {
    $request->validate(['email' => 'required|email|unique:newsletter_subscribers,email']);
    NewsletterSubscriber::create(['email' => $request->input('email')]);

    Mail::to($request->input('email'))
        ->queue(new NewsletterWelcome($request->input('email')));

    return back()->with('success', 'You\'ve been subscribed to our newsletter.');
})->name('newsletter.subscribe');

// Dashboard redirect based on role
Route::get('/dashboard', function () {
    $user = auth()->user();

    if ($user->isAdmin()) {
        return redirect('/admin');
    }

    if ($user->isVendor()) {
        return redirect()->route('vendor.dashboard');
    }

    return redirect()->route('customer.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/avatar', [ProfileController::class, 'uploadAvatar'])->name('profile.avatar');
    Route::patch('/profile/notifications', [ProfileController::class, 'updateNotifications'])->name('profile.notifications');
});

// Customer routes
Route::middleware(['auth', 'verified', 'customer'])
    ->prefix('customer')
    ->name('customer.')
    ->group(function () {
        Route::get('/dashboard', [CustomerDashboardController::class, 'index'])->name('dashboard');

        // Reservations
        Route::get('/reservations', [CustomerReservationController::class, 'index'])->name('reservations.index');
        Route::get('/reservations/{reservation}', [CustomerReservationController::class, 'show'])->name('reservations.show');
        Route::post('/reservations', [CustomerReservationController::class, 'store'])->name('reservations.store');
        Route::put('/reservations/{reservation}/cancel', [CustomerReservationController::class, 'cancel'])->name('reservations.cancel');

        // Wishlist
        Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist.index');
        Route::post('/wishlist/toggle', [WishlistController::class, 'toggle'])->name('wishlist.toggle');

        // Reviews
        Route::get('/reviews', [CustomerReviewController::class, 'index'])->name('reviews.index');
        Route::post('/reviews', [CustomerReviewController::class, 'store'])->name('reviews.store');
        Route::put('/reviews/{review}', [CustomerReviewController::class, 'update'])->name('reviews.update');
        Route::delete('/reviews/{review}', [CustomerReviewController::class, 'destroy'])->name('reviews.destroy');

        // AI Match
        Route::post('/ai-match', [AiMatchController::class, 'start'])->name('ai-match.start');
        Route::get('/ai-match/{session:session_token}', [AiMatchController::class, 'results'])->name('ai-match.results');

        // Notifications
        Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
        Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
        Route::put('/notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.readAll');
    });

// Vendor status page (pending/rejected vendors)
Route::middleware(['auth', 'verified', 'vendor'])->group(function () {
    Route::get('/vendor/status', [DashboardController::class, 'status'])->name('vendor.status');
});

// Vendor dashboard (approved vendors only)
Route::middleware(['auth', 'verified', 'vendor', 'vendor.approved'])
    ->prefix('vendor')
    ->name('vendor.')
    ->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Store Profile
        Route::get('/store', [StoreProfileController::class, 'edit'])->name('store.edit');
        Route::put('/store', [StoreProfileController::class, 'update'])->name('store.update');
        Route::put('/store/hours', [StoreProfileController::class, 'updateHours'])->name('store.hours');

        // Products
        Route::resource('products', ProductController::class)->except(['show']);
        Route::prefix('products/{product}')->name('products.')->group(function () {
            Route::post('/images', [ProductController::class, 'uploadImage'])->name('images.store');
            Route::delete('/images/{image}', [ProductController::class, 'deleteImage'])->name('images.destroy');
            Route::put('/images/reorder', [ProductController::class, 'reorderImages'])->name('images.reorder');
            Route::put('/images/{image}/primary', [ProductController::class, 'setPrimaryImage'])->name('images.primary');
            Route::post('/variants', [ProductController::class, 'storeVariant'])->name('variants.store');
            Route::put('/variants/{variant}', [ProductController::class, 'updateVariant'])->name('variants.update');
            Route::delete('/variants/{variant}', [ProductController::class, 'destroyVariant'])->name('variants.destroy');
        });

        // Reservations
        Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');
        Route::get('/reservations/{reservation}', [ReservationController::class, 'show'])->name('reservations.show');
        Route::put('/reservations/{reservation}/status', [ReservationController::class, 'updateStatus'])->name('reservations.status');

        // Reviews
        Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews.index');
        Route::post('/reviews/{review}/reply', [ReviewController::class, 'reply'])->name('reviews.reply');

        // Analytics
        Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics.index');
    });

require __DIR__.'/auth.php';
