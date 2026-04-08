<?php

namespace App\Http\Controllers\Vendor;

use App\Actions\Product\CreateProduct;
use App\Actions\Product\CreateVariant;
use App\Actions\Product\DeleteProduct;
use App\Actions\Product\DeleteProductImage;
use App\Actions\Product\DeleteVariant;
use App\Actions\Product\ReorderProductImages;
use App\Actions\Product\SetPrimaryImage;
use App\Actions\Product\UpdateProduct;
use App\Actions\Product\UpdateVariant;
use App\Actions\Product\UploadProductImage;
use App\Data\ProductData;
use App\Http\Controllers\Concerns\HasVendor;
use App\Http\Controllers\Controller;
use App\Http\Requests\Vendor\StoreProductRequest;
use App\Http\Requests\Vendor\UpdateProductRequest;
use App\Models\Category;
use App\Models\EventType;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\StylePreference;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    use HasVendor;

    public function index(Request $request): Response
    {
        $products = $this->vendor()
            ->products()
            ->with(['primaryImage', 'category:id,name'])
            ->when($request->input('search'), fn ($q, $search) => $q->where('name', 'like', "%{$search}%"))
            ->when($request->input('status'), fn ($q, $status) => $q->where('status', $status))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Vendor/Products/Index', [
            'products' => $products,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Vendor/Products/Create', [
            'categories' => Category::query()->orderBy('name')->get(['id', 'name']),
            'eventTypes' => EventType::query()->orderBy('name')->get(['id', 'name']),
            'stylePreferences' => StylePreference::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(StoreProductRequest $request, CreateProduct $action): RedirectResponse
    {
        $data = ProductData::from($request->validated());
        $action->execute($this->vendor(), $data);

        return redirect()->route('vendor.products.index')
            ->with('success', __('product.product_created'));
    }

    public function edit(Product $product): Response
    {
        $this->authorize('update', $product);

        $product->load(['images', 'variants', 'eventTypes:id', 'stylePreferences:id']);

        return Inertia::render('Vendor/Products/Edit', [
            'product' => $product,
            'categories' => Category::query()->orderBy('name')->get(['id', 'name']),
            'eventTypes' => EventType::query()->orderBy('name')->get(['id', 'name']),
            'stylePreferences' => StylePreference::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product, UpdateProduct $action): RedirectResponse
    {
        $this->authorize('update', $product);

        $data = ProductData::from($request->validated());
        $action->execute($product, $data);

        return back()->with('success', __('product.product_updated'));
    }

    public function destroy(Product $product, DeleteProduct $action): RedirectResponse
    {
        $this->authorize('delete', $product);

        $action->execute($product);

        return redirect()->route('vendor.products.index')
            ->with('success', __('product.product_deleted'));
    }

    public function uploadImage(Request $request, Product $product, UploadProductImage $action): RedirectResponse
    {
        $this->authorize('update', $product);

        $request->validate([
            'images' => ['required', 'array'],
            'images.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'alt_text' => ['nullable', 'string', 'max:255'],
        ]);

        foreach ($request->file('images', []) as $file) {
            $action->execute($product, $file, $request->input('alt_text'));
        }

        return back()->with('success', __('product.image_uploaded'));
    }

    public function deleteImage(Product $product, ProductImage $image, DeleteProductImage $action): RedirectResponse
    {
        $this->authorize('update', $product);

        $action->execute($image);

        return back()->with('success', __('product.image_deleted'));
    }

    public function reorderImages(Request $request, Product $product, ReorderProductImages $action): RedirectResponse
    {
        $this->authorize('update', $product);

        $request->validate(['image_ids' => ['required', 'array']]);

        $action->execute($request->input('image_ids'));

        return back()->with('success', __('product.images_reordered'));
    }

    public function setPrimaryImage(Product $product, ProductImage $image, SetPrimaryImage $action): RedirectResponse
    {
        $this->authorize('update', $product);

        $action->execute($image);

        return back()->with('success', __('product.primary_image_set'));
    }

    public function storeVariant(Request $request, Product $product, CreateVariant $action): RedirectResponse
    {
        $this->authorize('update', $product);

        $validated = $request->validate([
            'size' => ['nullable', 'string', 'max:20'],
            'color' => ['nullable', 'string', 'max:50'],
            'color_hex' => ['nullable', 'string', 'max:7'],
            'sku' => ['nullable', 'string', 'max:100'],
            'stock_quantity' => ['required', 'integer', 'min:0'],
            'price_override' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ]);

        $action->execute($product, $validated);

        return back()->with('success', __('product.variant_created'));
    }

    public function updateVariant(Request $request, Product $product, ProductVariant $variant, UpdateVariant $action): RedirectResponse
    {
        $this->authorize('update', $product);

        $validated = $request->validate([
            'size' => ['nullable', 'string', 'max:20'],
            'color' => ['nullable', 'string', 'max:50'],
            'color_hex' => ['nullable', 'string', 'max:7'],
            'sku' => ['nullable', 'string', 'max:100'],
            'stock_quantity' => ['required', 'integer', 'min:0'],
            'price_override' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ]);

        $action->execute($variant, $validated);

        return back()->with('success', __('product.variant_updated'));
    }

    public function destroyVariant(Product $product, ProductVariant $variant, DeleteVariant $action): RedirectResponse
    {
        $this->authorize('update', $product);

        $action->execute($variant);

        return back()->with('success', __('product.variant_deleted'));
    }
}
