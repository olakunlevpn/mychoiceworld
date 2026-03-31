@php
    $apiKey = app(\App\Settings\GeneralSettings::class)->google_maps_api_key;
@endphp

@if($apiKey)
<div
    x-data="{
        lat: $wire.data?.latitude || 20.5937,
        lng: $wire.data?.longitude || 78.9629,
        map: null,
        marker: null,
        autocomplete: null,

        init() {
            if (window.google?.maps) {
                this.initMap()
            } else {
                window.initAdminGoogleMap = () => this.initMap()
                const script = document.createElement('script')
                script.src = 'https://maps.googleapis.com/maps/api/js?key={{ $apiKey }}&libraries=places&callback=initAdminGoogleMap'
                script.async = true
                script.defer = true
                document.head.appendChild(script)
            }
        },

        initMap() {
            const center = { lat: parseFloat(this.lat) || 20.5937, lng: parseFloat(this.lng) || 78.9629 }
            const zoom = (this.lat && this.lat != 20.5937) ? 16 : 5

            this.map = new google.maps.Map(this.$refs.map, {
                center,
                zoom,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
            })

            this.marker = new google.maps.Marker({
                map: this.map,
                position: center,
                draggable: true,
            })

            this.autocomplete = new google.maps.places.Autocomplete(this.$refs.searchInput, {
                fields: ['geometry', 'address_components', 'formatted_address'],
            })
            this.autocomplete.bindTo('bounds', this.map)

            this.autocomplete.addListener('place_changed', () => {
                const place = this.autocomplete.getPlace()
                if (!place.geometry?.location) return
                const lat = place.geometry.location.lat()
                const lng = place.geometry.location.lng()
                this.map.setCenter({ lat, lng })
                this.map.setZoom(17)
                this.marker.setPosition({ lat, lng })
                this.updatePosition(lat, lng)
                this.fillAddressFields(place)
            })

            this.map.addListener('click', (e) => {
                this.marker.setPosition(e.latLng)
                const lat = e.latLng.lat()
                const lng = e.latLng.lng()
                this.updatePosition(lat, lng)
                this.reverseGeocode(lat, lng)
            })

            this.marker.addListener('dragend', () => {
                const pos = this.marker.getPosition()
                const lat = pos.lat()
                const lng = pos.lng()
                this.updatePosition(lat, lng)
                this.reverseGeocode(lat, lng)
            })

            setTimeout(() => google.maps.event.trigger(this.map, 'resize'), 200)
        },

        getComponent(place, type) {
            const comp = place.address_components?.find(c => c.types.includes(type))
            return comp?.long_name || ''
        },

        fillAddressFields(place) {
            const streetNumber = this.getComponent(place, 'street_number')
            const route = this.getComponent(place, 'route')
            const sublocality = this.getComponent(place, 'sublocality_level_1') || this.getComponent(place, 'sublocality')
            const address = [streetNumber, route, sublocality].filter(Boolean).join(', ') || place.formatted_address || ''
            const city = this.getComponent(place, 'locality') || this.getComponent(place, 'administrative_area_level_2') || ''
            const state = this.getComponent(place, 'administrative_area_level_1')
            const country = this.getComponent(place, 'country')
            const postalCode = this.getComponent(place, 'postal_code')

            if (address) $wire.set('data.address', address)
            if (city) $wire.set('data.city', city)
            if (state) $wire.set('data.state', state)
            if (country) $wire.set('data.country', country)
            if (postalCode) $wire.set('data.postal_code', postalCode)
        },

        reverseGeocode(lat, lng) {
            const geocoder = new google.maps.Geocoder()
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === 'OK' && results?.[0]) {
                    this.$refs.searchInput.value = results[0].formatted_address
                    this.fillAddressFields(results[0])
                }
            })
        },

        updatePosition(lat, lng) {
            this.lat = lat
            this.lng = lng
            $wire.set('data.latitude', lat.toFixed(6))
            $wire.set('data.longitude', lng.toFixed(6))
        },

        detectLocation() {
            if (!navigator.geolocation) return
            navigator.geolocation.getCurrentPosition((pos) => {
                const lat = pos.coords.latitude
                const lng = pos.coords.longitude
                this.map.setCenter({ lat, lng })
                this.map.setZoom(17)
                this.marker.setPosition({ lat, lng })
                this.updatePosition(lat, lng)
                this.reverseGeocode(lat, lng)
            }, () => {}, { timeout: 10000, enableHighAccuracy: true })
        }
    }"
    class="space-y-3"
>
    <input
        x-ref="searchInput"
        type="text"
        placeholder="Start typing your store address..."
        class="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
    />

    <div class="flex items-center gap-2">
        <button type="button" @click="detectLocation()" class="inline-flex items-center gap-1.5 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
            Use my current location
        </button>
        <span class="text-xs text-gray-500 dark:text-gray-400">or click on the map</span>
    </div>

    <div x-ref="map" class="rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden" style="height: 280px;"></div>

    <p class="text-xs text-gray-500 dark:text-gray-400">
        Coordinates: <span x-text="Number(lat).toFixed(6)"></span>, <span x-text="Number(lng).toFixed(6)"></span>
    </p>
</div>
@else
<div class="rounded-lg border border-yellow-300 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-3 text-sm text-yellow-700 dark:text-yellow-400">
    Google Maps API key not configured. Add it in Settings &gt; Platform &gt; Google Maps API Key.
</div>
@endif
