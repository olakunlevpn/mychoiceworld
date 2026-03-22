import {
  RocketLaunchIcon,
  CalendarDaysIcon,
  BuildingStorefrontIcon,
  UserCircleIcon,
  CreditCardIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/outline'

export interface HelpArticle {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  content: string[]
}

export interface HelpCategory {
  slug: string
  title: string
  description: string
  icon: typeof RocketLaunchIcon
}

export const helpCategories: HelpCategory[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    description: 'Learn how to create your account, browse products, and make your first reservation.',
    icon: RocketLaunchIcon,
  },
  {
    slug: 'reservations',
    title: 'Making Reservations',
    description: 'Understand how the reservation system works, expiry times, and how to confirm with vendors.',
    icon: CalendarDaysIcon,
  },
  {
    slug: 'vendors',
    title: 'Vendor Information',
    description: 'Find out how to become a vendor, manage your store, and grow your business.',
    icon: BuildingStorefrontIcon,
  },
  {
    slug: 'account',
    title: 'Account & Profile',
    description: 'Manage your profile details, preferences, notifications, and account security.',
    icon: UserCircleIcon,
  },
  {
    slug: 'payments',
    title: 'Payments',
    description: 'Accepted payment methods, how charges work, and payment security information.',
    icon: CreditCardIcon,
  },
  {
    slug: 'returns',
    title: 'Returns & Refunds',
    description: 'Our refund policy, how to request a return, and expected processing times.',
    icon: ArrowUturnLeftIcon,
  },
]

export const helpArticles: HelpArticle[] = [
  // Getting Started
  {
    slug: 'creating-your-account',
    title: 'Creating your account',
    excerpt: 'A step-by-step guide to signing up and setting up your MyChoice MyWorld profile.',
    category: 'getting-started',
    readTime: '3 min read',
    content: [
      'Welcome to MyChoice MyWorld! Getting started is quick and easy. Here\'s how to create your account and start discovering products from local boutiques near you.',
      '## Step 1: Sign Up\n\nVisit the registration page and enter your full name, email address, and a secure password. You can also sign up using your Google or Facebook account for faster access.',
      '## Step 2: Verify Your Email\n\nAfter registering, we\'ll send a verification link to your email. Click the link to confirm your account. If you don\'t see it, check your spam folder or request a new link from the verification page.',
      '## Step 3: Complete Your Profile\n\nOnce verified, head to your Profile page to add your location, profile photo, and style preferences. Setting your location helps us show you stores and products near you.',
      '## Step 4: Start Exploring\n\nYou\'re all set! Browse the Discover page to find products, follow your favourite stores, or try Find My Match to get AI-powered style recommendations tailored to you.',
    ],
  },
  {
    slug: 'browsing-and-discovering-products',
    title: 'Browsing and discovering products',
    excerpt: 'Learn how to explore products by category, store, and location.',
    category: 'getting-started',
    readTime: '4 min read',
    content: [
      'MyChoice MyWorld makes it easy to discover unique products from boutiques in your area. Here are the main ways to browse and find what you\'re looking for.',
      '## The Discover Page\n\nThe Discover page is your main hub for product exploration. Browse curated collections, trending items, and new arrivals from stores near you. Use the filters to narrow results by category, price range, and distance.',
      '## Category Pages\n\nClick on any category from the navigation menu to see all products in that category. Categories include Women\'s Fashion, Men\'s Fashion, Jewellery, Accessories, and more. Each category page lets you sort by newest, price, or popularity.',
      '## Store Profiles\n\nEvery vendor has a store profile page where you can see their full product catalogue, store information, reviews, and location. Follow a store to get notified when they add new products.',
      '## Search\n\nUse the search bar at the top of any page to find products by name, description, or store. Search results can be filtered by category, price, and location.',
      '## Find My Match\n\nOur AI-powered style matching tool helps you discover products that suit your taste. Tell us the occasion, your preferences, and budget, and we\'ll recommend items from local stores that match your style.',
    ],
  },
  {
    slug: 'navigating-the-platform',
    title: 'Navigating the platform',
    excerpt: 'An overview of the main sections and how to get around.',
    category: 'getting-started',
    readTime: '2 min read',
    content: [
      'Here\'s a quick tour of the key areas in MyChoice MyWorld so you can find everything easily.',
      '## Home Page\n\nThe homepage showcases featured products, trending stores, and seasonal collections. It\'s a great starting point for casual browsing.',
      '## Navigation Menu\n\nThe top navigation includes links to Home, Discover, and Find My Match. On mobile, tap the menu icon to access the full navigation including your account options.',
      '## Your Account\n\nAccess your account from the user icon in the top right. From there you can manage your reservations, wishlist, reviews, notifications, and profile settings.',
      '## Footer Links\n\nThe footer contains quick links to Help, FAQ, Contact, legal pages, and more. It also has our newsletter signup for exclusive updates.',
    ],
  },
  // Reservations
  {
    slug: 'how-to-reserve-a-product',
    title: 'How to reserve a product at a local store',
    excerpt: 'Walk through the step-by-step process of reserving a product and what happens next.',
    category: 'reservations',
    readTime: '4 min read',
    content: [
      'Reserving a product on MyChoice MyWorld is simple and ensures the item you want is held for you at the store. Here\'s how it works from start to finish.',
      '## Finding a Product\n\nBrowse the Discover page, search for items, or explore store profiles. When you find something you like, click on the product to view its full details including price, availability, sizes, and store location.',
      '## Making the Reservation\n\nOn the product page, select your preferred size and colour (if applicable), then click "Reserve Now". You\'ll be asked to confirm the reservation details and agree to the reservation terms.',
      '## Confirmation\n\nOnce you submit your reservation, the vendor receives a notification. They\'ll review availability and confirm your reservation, usually within a few hours. You\'ll receive a confirmation notification with a unique reservation code.',
      '## Pickup\n\nVisit the store during their business hours with your reservation code. The staff will have your item ready. You can try it on before completing the purchase — there\'s no obligation until you\'re satisfied.',
      '## After Pickup\n\nOnce you\'ve collected your item, the reservation is marked as completed. You\'ll be prompted to leave a review to help other shoppers and the vendor.',
    ],
  },
  {
    slug: 'understanding-reservation-expiry',
    title: 'Understanding reservation expiry',
    excerpt: 'Learn how long your reservation stays active and what happens when it expires.',
    category: 'reservations',
    readTime: '3 min read',
    content: [
      'Reservations on MyChoice MyWorld have a time limit to ensure fairness for all shoppers. Here\'s what you need to know about reservation expiry.',
      '## Default Expiry Period\n\nMost reservations are valid for 48 hours from the time the vendor confirms your reservation. This gives you enough time to visit the store and pick up your item.',
      '## Expiry Notifications\n\nYou\'ll receive reminders as your reservation approaches its expiry time. We send notifications at 24 hours, 6 hours, and 1 hour before expiry so you don\'t miss your window.',
      '## What Happens When It Expires\n\nIf a reservation expires, the item is released back to general availability and other shoppers can reserve it. Any hold on your payment method is also released.',
      '## Extensions\n\nSome vendors may offer the option to extend your reservation. If available, you\'ll see an "Extend Reservation" option on your reservation detail page. Extensions are at the vendor\'s discretion.',
      '## Cancellation vs Expiry\n\nIf you know you won\'t be able to pick up your reservation, it\'s better to cancel it rather than letting it expire. Cancellation is instant and helps the vendor plan their inventory.',
    ],
  },
  {
    slug: 'managing-your-reservations',
    title: 'Managing your reservations',
    excerpt: 'View, track, and manage all your active and past reservations.',
    category: 'reservations',
    readTime: '3 min read',
    content: [
      'Keep track of all your reservations from one central place. Here\'s how to manage them effectively.',
      '## Reservations Page\n\nAccess your reservations from the account menu. The page is organised into tabs: Active (pending and confirmed), Completed, and Cancelled. Each reservation shows the product, store, status, and dates.',
      '## Reservation Details\n\nClick on any reservation to see full details including your unique reservation code, store address and directions, pickup instructions, and a timeline of status changes.',
      '## Cancelling a Reservation\n\nTo cancel, open the reservation detail page and click "Cancel Reservation". You\'ll be asked to confirm. Cancellations before vendor confirmation are free. After confirmation, the vendor\'s cancellation policy applies.',
      '## Contacting the Vendor\n\nIf you need to ask the vendor a question about your reservation, you can reach them through the store contact details shown on the reservation page.',
    ],
  },
  // Vendors
  {
    slug: 'how-to-become-a-vendor',
    title: 'How to apply to become a vendor',
    excerpt: 'Everything you need to know about the vendor application process and what we look for.',
    category: 'vendors',
    readTime: '5 min read',
    content: [
      'Selling on MyChoice MyWorld connects your store with shoppers looking for unique, local products. Here\'s everything you need to know about the application process.',
      '## Eligibility\n\nWe welcome independent boutiques, local stores, and small businesses that sell physical products. You\'ll need a physical store location where customers can pick up their reservations.',
      '## Application Process\n\nClick "Register as Vendor" from the login page or footer. The application is a 4-step process covering your account details, store information, business license (optional), and store location.',
      '## What We Review\n\nOur team reviews your application within 3-5 business days. We look at your store details, product quality, business legitimacy, and location accessibility. Having a business license or social media presence helps speed up approval.',
      '## After Approval\n\nOnce approved, you\'ll receive an email with access to your vendor dashboard. From there you can add products, manage reservations, customise your store profile, and track analytics.',
      '## Getting Started as a Vendor\n\nWe recommend starting by adding at least 5-10 products with clear photos and detailed descriptions. Complete your store profile with your logo, banner, opening hours, and store story to attract shoppers.',
    ],
  },
  {
    slug: 'managing-your-store',
    title: 'Managing your vendor store',
    excerpt: 'Learn how to update your store profile, add products, and manage your presence.',
    category: 'vendors',
    readTime: '4 min read',
    content: [
      'Your vendor dashboard is your command centre for managing everything about your store on MyChoice MyWorld.',
      '## Store Profile\n\nCustomise your store with a logo, banner image, description, and contact details. A complete and attractive profile helps build trust with shoppers and improves your visibility in search results.',
      '## Adding Products\n\nGo to Products > Add New Product to list items. Include clear product photos, detailed descriptions, accurate sizing information, and pricing. Products go live immediately after saving.',
      '## Managing Inventory\n\nKeep your product listings up to date. Mark items as out of stock when unavailable, and update descriptions or prices as needed. Accurate inventory prevents reservation disappointments.',
      '## Store Hours\n\nSet your business hours so shoppers know when they can visit for pickups. You can set different hours for each day of the week and mark holidays or closures.',
      '## Analytics\n\nYour dashboard includes analytics showing product views, reservation rates, customer reviews, and revenue trends. Use these insights to understand what\'s working and optimise your listings.',
    ],
  },
  {
    slug: 'handling-vendor-reservations',
    title: 'Handling reservations as a vendor',
    excerpt: 'How to confirm, manage, and complete customer reservations.',
    category: 'vendors',
    readTime: '4 min read',
    content: [
      'Timely reservation management is key to providing a great customer experience. Here\'s how to handle reservations effectively.',
      '## Receiving Reservations\n\nWhen a customer reserves a product, you\'ll receive an instant notification. The reservation appears in your Pending tab with the customer\'s details and the product they\'ve reserved.',
      '## Confirming Reservations\n\nReview the reservation and click "Confirm" to let the customer know their item is set aside. Aim to confirm within a few hours. The faster you respond, the better the customer experience.',
      '## Preparing for Pickup\n\nOnce confirmed, ensure the item is set aside and ready for the customer. When they arrive with their reservation code, verify the code and hand over the item.',
      '## Completing Reservations\n\nAfter the customer picks up their item, mark the reservation as "Completed" in your dashboard. This triggers a review prompt for the customer.',
      '## Declining Reservations\n\nIf an item is no longer available, you can decline the reservation with a reason. The customer will be notified and any payment hold will be released. Keep your inventory updated to minimise declined reservations.',
    ],
  },
  // Account
  {
    slug: 'find-my-match-ai-discovery',
    title: 'Using Find My Match — AI style discovery',
    excerpt: 'Get the most out of our AI-powered matching tool by setting up your style profile.',
    category: 'account',
    readTime: '4 min read',
    content: [
      'Find My Match is our AI-powered tool that helps you discover products perfectly suited to your style, occasion, and budget. Here\'s how to get the best results.',
      '## How It Works\n\nFind My Match uses AI to analyse your preferences and match you with products from local stores. The more details you provide, the better your matches will be.',
      '## Setting Your Preferences\n\nTell us about the occasion (date night, wedding, casual outing, etc.), your preferred style (classic, trendy, bohemian, minimalist, etc.), colour preferences, and budget range.',
      '## Photo Matching\n\nOptionally upload a photo of an outfit you like, a celebrity look, or even a screenshot from social media. Our AI analyses the style elements and finds similar products available at stores near you.',
      '## Understanding Match Scores\n\nEach result shows a match score from 0-100%. Higher scores mean the product closely matches your stated preferences. Products are also ranked by distance to your location.',
      '## Saving Matches\n\nLike a match? Add it to your wishlist or reserve it directly. Your match history is saved so you can revisit previous recommendations anytime.',
    ],
  },
  {
    slug: 'setting-location-preferences',
    title: 'Setting your location and distance preferences',
    excerpt: 'Adjust how far you want to discover vendors and products from your current location.',
    category: 'account',
    readTime: '2 min read',
    content: [
      'Location settings help us show you the most relevant stores and products near you.',
      '## Setting Your Location\n\nGo to your Profile page and look for the Location section. You can either enter your city manually or allow browser location access for precise positioning.',
      '## Distance Radius\n\nSet your preferred maximum distance for discovering stores. Options range from 1 km to 50 km. A smaller radius shows you the closest stores, while a larger radius gives you more options.',
      '## How Location Affects Results\n\nProducts and stores are sorted by distance by default. Your location also affects Find My Match results, search results, and the stores shown on the Discover page.',
      '## Privacy\n\nYour exact location is never shared with vendors. They only see your general area when you make a reservation. You can disable location access at any time from your browser settings.',
    ],
  },
  {
    slug: 'managing-your-wishlist',
    title: 'How your wishlist works',
    excerpt: 'Save, organise, and shop from your wishlist of favourite products.',
    category: 'account',
    readTime: '2 min read',
    content: [
      'The wishlist is your personal collection of products you love. Here\'s how to make the most of it.',
      '## Adding Items\n\nTap the heart icon on any product card or product page to save it to your wishlist. The icon fills in to confirm it\'s been saved.',
      '## Viewing Your Wishlist\n\nAccess your wishlist from the account menu. It shows all your saved items with their current price, availability status, and the store they\'re from.',
      '## Reserving from Wishlist\n\nReady to buy? Click "Reserve" directly from your wishlist to start the reservation process without having to navigate back to the product page.',
      '## Removing Items\n\nTap the filled heart icon again to remove an item from your wishlist. Items that are no longer available from the vendor are automatically flagged.',
    ],
  },
  {
    slug: 'notification-settings',
    title: 'How to manage your notifications',
    excerpt: 'Control what notifications you receive and how you receive them.',
    category: 'account',
    readTime: '2 min read',
    content: [
      'Stay informed about the things that matter to you while reducing noise. Here\'s how to customise your notification preferences.',
      '## Notification Types\n\nYou can control notifications for: reservation status updates, vendor responses to your reviews, new products from followed stores, price drops on wishlist items, and promotional offers.',
      '## Email Notifications\n\nToggle email notifications on or off for each notification type. We recommend keeping reservation updates on to stay informed about your active reservations.',
      '## In-App Notifications\n\nIn-app notifications appear as a badge on the bell icon in your navigation. Click the bell to see your recent notifications and mark them as read.',
      '## Adjusting Settings\n\nGo to your Profile or Account Settings page to find notification preferences. Changes take effect immediately.',
    ],
  },
  // Payments
  {
    slug: 'accepted-payment-methods',
    title: 'Accepted payment methods',
    excerpt: 'All the ways you can pay for your reservations on MyChoice MyWorld.',
    category: 'payments',
    readTime: '2 min read',
    content: [
      'We offer a variety of payment options to make checkout convenient and secure.',
      '## Credit & Debit Cards\n\nWe accept Visa, Mastercard, and Verve cards. Your card details are encrypted and processed securely through our PCI-compliant payment partner.',
      '## Bank Transfers\n\nPay directly from your bank account via bank transfer. Transfer details are provided at checkout and reservations are confirmed once payment is received.',
      '## Mobile Money\n\nSelect mobile money providers are supported for fast and convenient payments directly from your mobile wallet.',
      '## Payment Holds\n\nWhen you make a reservation, a temporary hold may be placed on your payment method. This is not a charge — it\'s released if the reservation is cancelled or expires. The actual charge is processed only when the vendor confirms your reservation.',
      '## Payment Security\n\nAll transactions are secured with industry-standard encryption. We never store your full card details on our servers.',
    ],
  },
  {
    slug: 'requesting-a-refund',
    title: 'Requesting a refund for a reservation',
    excerpt: 'Step-by-step instructions for initiating a refund and expected timelines.',
    category: 'payments',
    readTime: '3 min read',
    content: [
      'If something goes wrong with your reservation, here\'s how to request a refund.',
      '## When You\'re Eligible\n\nYou can request a refund if: the vendor cancels your reservation, the item is significantly different from the listing, or you cancel before the vendor confirms (free cancellation).',
      '## How to Request\n\nGo to your reservation detail page and click "Request Refund". Select the reason for your refund and provide any additional details. Attach photos if the item wasn\'t as described.',
      '## Review Process\n\nOur team reviews refund requests within 1-2 business days. For vendor-cancelled reservations, refunds are processed automatically.',
      '## Refund Timeline\n\nApproved refunds are returned to your original payment method. Card refunds take 3-5 business days. Bank transfer refunds take 5-7 business days. Mobile money refunds are usually instant.',
      '## Disputes\n\nIf your refund request is declined and you disagree, you can escalate to our support team through the Contact page. We\'ll review the case and provide a final decision within 48 hours.',
    ],
  },
  {
    slug: 'understanding-pricing',
    title: 'Understanding pricing and fees',
    excerpt: 'How pricing works on the platform and what fees to expect.',
    category: 'payments',
    readTime: '2 min read',
    content: [
      'Transparency in pricing is important to us. Here\'s how pricing works on MyChoice MyWorld.',
      '## Product Prices\n\nPrices shown on product listings are set by individual vendors. The price you see is the price you pay — there are no hidden markups from MyChoice MyWorld.',
      '## Service Fees\n\nA small service fee may be applied at checkout to cover platform maintenance and payment processing. This fee is clearly shown before you confirm your reservation.',
      '## Currency\n\nAll prices are displayed in your local currency based on your location settings. Vendors set prices in their local currency.',
      '## Price Changes\n\nVendors may update their prices at any time. However, once you\'ve made a reservation, the price is locked in at the time of reservation regardless of any subsequent price changes.',
    ],
  },
  // Returns
  {
    slug: 'return-policy-overview',
    title: 'Our return policy explained',
    excerpt: 'Everything you need to know about returning items and our return policy.',
    category: 'returns',
    readTime: '3 min read',
    content: [
      'Since MyChoice MyWorld uses a reservation-and-pickup model, our return policy works a bit differently from traditional online shopping.',
      '## Try Before You Buy\n\nThe biggest advantage of our model is that you see and try the product in person before completing the purchase. This significantly reduces the need for returns.',
      '## When Returns Apply\n\nReturns may be applicable if: the product has a defect that wasn\'t apparent during pickup, the item doesn\'t match the online listing, or the vendor offers their own return window.',
      '## Vendor Return Policies\n\nEach vendor sets their own return policy, which is displayed on their store profile and product pages. Some vendors offer 7-day returns, while others may have different terms.',
      '## How to Return\n\nContact the vendor directly through their store contact details. Bring the item back to the store within the return window with your reservation confirmation. The vendor will process your return and refund.',
      '## Platform Guarantee\n\nIf you believe a product was significantly misrepresented in its online listing, contact our support team. We\'ll mediate between you and the vendor to reach a fair resolution.',
    ],
  },
  {
    slug: 'exchange-process',
    title: 'How exchanges work',
    excerpt: 'Need a different size or colour? Here\'s how to exchange items.',
    category: 'returns',
    readTime: '2 min read',
    content: [
      'Exchanges are handled directly with the vendor. Here\'s how the process works.',
      '## In-Store Exchanges\n\nSince you pick up items in person, the easiest way to exchange is at the time of pickup. If the size or colour isn\'t right, ask the store staff if they have alternatives available.',
      '## Post-Pickup Exchanges\n\nIf you need to exchange after leaving the store, contact the vendor and visit again within their exchange window. Bring the original item in its original condition.',
      '## Availability\n\nExchanges depend on the vendor having the alternative item in stock. If the item you want isn\'t available, the vendor may offer a store credit or refund instead.',
      '## No Extra Charges\n\nExchanges for items of equal value have no additional charges. If you exchange for a higher-priced item, you\'ll pay the difference. Lower-priced exchanges result in a partial refund.',
    ],
  },
  {
    slug: 'damaged-items',
    title: 'What to do if your item is damaged',
    excerpt: 'Steps to take if you discover damage after purchasing an item.',
    category: 'returns',
    readTime: '2 min read',
    content: [
      'While our try-before-you-buy model reduces the chance of issues, here\'s what to do if you discover damage.',
      '## Inspect at Pickup\n\nWe always recommend carefully inspecting your item at the time of pickup. Check for any defects, damage, or discrepancies with the online listing before leaving the store.',
      '## Reporting Damage\n\nIf you discover damage after purchase, take clear photos and contact the vendor within 48 hours. Explain the issue and provide your reservation code.',
      '## Resolution Options\n\nDepending on the vendor\'s policy and the nature of the damage, you may be offered: a full refund, a replacement item, store credit, or a repair service.',
      '## Escalating Issues\n\nIf you\'re unable to reach a resolution with the vendor, contact our support team through the Contact page. Include your reservation code, photos of the damage, and details of your communication with the vendor.',
    ],
  },
]

export function getArticlesByCategory(categorySlug: string): HelpArticle[] {
  return helpArticles.filter((a) => a.category === categorySlug)
}

export function getArticleBySlug(slug: string): HelpArticle | undefined {
  return helpArticles.find((a) => a.slug === slug)
}

export function getCategoryBySlug(slug: string): HelpCategory | undefined {
  return helpCategories.find((c) => c.slug === slug)
}

export function getRelatedArticles(article: HelpArticle, limit = 3): HelpArticle[] {
  return helpArticles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, limit)
}
