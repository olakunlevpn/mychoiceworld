<?php

return [
    // UserRole
    'role_customer' => 'Customer',
    'role_vendor' => 'Vendor',
    'role_admin' => 'Admin',

    // VendorStatus
    'vendor_status_pending' => 'Pending',
    'vendor_status_approved' => 'Approved',
    'vendor_status_suspended' => 'Suspended',
    'vendor_status_rejected' => 'Rejected',

    // ProductStatus
    'product_status_draft' => 'Draft',
    'product_status_active' => 'Active',
    'product_status_out_of_stock' => 'Out of Stock',
    'product_status_archived' => 'Archived',

    // Gender
    'gender_men' => 'Men',
    'gender_women' => 'Women',
    'gender_unisex' => 'Unisex',
    'gender_kids' => 'Kids',

    // ReservationStatus
    'reservation_status_pending' => 'Pending',
    'reservation_status_confirmed' => 'Confirmed',
    'reservation_status_completed' => 'Completed',
    'reservation_status_cancelled' => 'Cancelled',
    'reservation_status_expired' => 'Expired',
    'reservation_status_no_show' => 'No Show',

    // CancelledBy
    'cancelled_by_customer' => 'Customer',
    'cancelled_by_vendor' => 'Vendor',
    'cancelled_by_system' => 'System',

    // ReservationSource
    'source_browse' => 'Browse',
    'source_ai_match' => 'AI Match',

    // AiMatchStatus
    'ai_match_status_processing' => 'Processing',
    'ai_match_status_completed' => 'Completed',
    'ai_match_status_failed' => 'Failed',
];
