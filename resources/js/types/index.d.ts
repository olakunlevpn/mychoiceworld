export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    role: 'customer' | 'vendor' | 'admin';
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    notification_prefs?: NotificationPrefs;
    email_verified_at?: string;
    created_at: string;
}

export interface NotificationPrefs {
    reservationUpdates: boolean;
    promotions: boolean;
    newArrivals: boolean;
}

export interface Vendor {
    id: number;
    user_id: number;
    store_name: string;
    slug: string;
    description?: string;
    logo?: string;
    banner?: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code?: string;
    operating_hours?: OperatingHour[];
    status: 'pending' | 'approved' | 'suspended' | 'rejected';
    rejection_reason?: string;
    license_number?: string;
    license_document?: string;
    is_featured: boolean;
    rating_avg: number;
    rating_count: number;
    approved_at?: string;
    products_count?: number;
    distance_km?: number;
    created_at: string;
}

export interface OperatingHour {
    day: string;
    open: string;
    close: string;
    closed: boolean;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    icon?: string;
    parent_id?: number;
    sort_order: number;
    is_active: boolean;
    products_count?: number;
}

export interface EventType {
    id: number;
    name: string;
    slug: string;
    icon?: string;
    is_active: boolean;
}

export interface StylePreference {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
}

export interface Product {
    id: number;
    vendor_id: number;
    category_id: number;
    name: string;
    slug: string;
    description?: string;
    price: number;
    compare_price?: number;
    currency: string;
    gender: 'women' | 'men' | 'unisex';
    primary_color?: string;
    primary_color_hex?: string;
    status: 'draft' | 'active' | 'out_of_stock' | 'archived';
    is_featured: boolean;
    is_reservable: boolean;
    views_count: number;
    reservations_count: number;
    created_at: string;
    distance_km?: number;
    // Relations
    vendor?: Vendor;
    category?: Category;
    images?: ProductImage[];
    primary_image?: ProductImage;
    variants?: ProductVariant[];
    event_types?: EventType[];
    style_preferences?: StylePreference[];
}

export interface ProductImage {
    id: number;
    product_id: number;
    url: string;
    thumbnail_url?: string;
    alt_text?: string;
    color?: string;
    sort_order: number;
    is_primary: boolean;
}

export interface ProductVariant {
    id: number;
    product_id: number;
    size?: string;
    color?: string;
    color_hex?: string;
    sku?: string;
    stock_quantity: number;
    price_override?: number;
    is_active: boolean;
}

export interface ProductColor {
    name: string;
    hex: string;
}

export interface Reservation {
    id: number;
    reservation_code: string;
    customer_id: number;
    vendor_id: number;
    product_id: number;
    variant_id?: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'expired' | 'no_show';
    customer_note?: string;
    vendor_note?: string;
    reserved_at: string;
    expires_at?: string;
    confirmed_at?: string;
    completed_at?: string;
    cancelled_at?: string;
    cancelled_by?: string;
    cancellation_reason?: string;
    source: 'browse' | 'ai_match';
    created_at: string;
    // Relations
    customer?: User;
    vendor?: Vendor;
    product?: Product;
    variant?: ProductVariant;
    review?: Review;
}

export interface Review {
    id: number;
    customer_id: number;
    vendor_id: number;
    product_id?: number;
    reservation_id?: number;
    rating: number;
    comment: string;
    is_published: boolean;
    vendor_reply?: string;
    vendor_replied_at?: string;
    created_at: string;
    // Relations
    customer?: User;
    vendor?: Vendor;
    product?: Product;
}

export interface Wishlist {
    id: number;
    customer_id: number;
    product_id: number;
    created_at: string;
    product?: Product;
}

export interface VendorAnalytic {
    id: number;
    vendor_id: number;
    date: string;
    profile_views: number;
    product_views: number;
    reservations_made: number;
    reservations_completed: number;
    reservations_no_show: number;
    ai_matches_shown: number;
}

export interface AppNotification {
    id: string;
    type: string;
    data: {
        title: string;
        message: string;
        link?: string;
    };
    read_at?: string;
    created_at: string;
}

export interface HelpCategory {
    id: number;
    title: string;
    slug: string;
    description?: string;
    icon?: string;
    sort_order: number;
    is_active: boolean;
    articles?: HelpArticle[];
}

export interface HelpArticle {
    id: number;
    help_category_id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    read_time?: string;
    sort_order: number;
    is_published: boolean;
    category?: HelpCategory;
}

export interface Faq {
    id: number;
    question: string;
    answer: string;
    sort_order: number;
    is_active: boolean;
}

export interface ColorPalette {
    id: number;
    skin_tone: string;
    color_name: string;
    color_hex: string;
    season?: string;
    score: number;
}

// Pagination — matches Laravel's default paginator toArray()
export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    links: { url?: string; label: string; active: boolean }[];
    first_page_url: string;
    last_page_url: string;
    next_page_url?: string;
    prev_page_url?: string;
    path: string;
}

// Shared Inertia page props
export interface SharedProps {
    auth: {
        user: User | null;
        vendor: Pick<Vendor, 'id' | 'store_name' | 'slug' | 'status' | 'logo'> | null;
        unread_notifications_count: number;
    };
    settings: {
        site_name: string;
        site_description: string;
        support_email: string;
        logo_path?: string;
        logo_desktop_dark?: string;
        logo_desktop_light?: string;
        logo_mobile_dark?: string;
        logo_mobile_light?: string;
        favicon_path?: string;
        homepage_background?: string;
        contact_address?: string;
        contact_phone?: string;
        contact_email?: string;
        currency_code: string;
        currency_symbol: string;
        default_country: string;
        default_radius_km: number;
        max_radius_km: number;
        reservation_hold_hours: number;
        customer_registration_enabled: boolean;
        vendor_registration_enabled: boolean;
        google_login_enabled: boolean;
        google_maps_api_key?: string;
        social_facebook?: string;
        social_instagram?: string;
        social_twitter?: string;
        social_tiktok?: string;
        social_youtube?: string;
        social_linkedin?: string;
        social_whatsapp?: string;
        social_telegram?: string;
    };
    flash: {
        success?: string;
        error?: string;
    };
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & SharedProps;
