@php
    $settings = app(\App\Settings\GeneralSettings::class);
    use Illuminate\Support\Facades\Storage;
@endphp
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ $settings->site_name }}</title>

        @if($settings->favicon_path)
            <link rel="icon" href="{{ str_starts_with($settings->favicon_path, '/') || str_starts_with($settings->favicon_path, 'http') ? $settings->favicon_path : Storage::disk('public')->url($settings->favicon_path) }}">
        @endif

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
