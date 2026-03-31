<div
    x-data="{
        lat: $wire.data?.latitude || 20.5937,
        lng: $wire.data?.longitude || 78.9629,
        map: null,
        marker: null,
        init() {
            const L = window.L
            if (!L) return

            this.map = L.map(this.$refs.map).setView([this.lat, this.lng], this.lat !== 20.5937 ? 15 : 5)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap'
            }).addTo(this.map)

            this.marker = L.marker([this.lat, this.lng], { draggable: true }).addTo(this.map)

            this.marker.on('dragend', (e) => {
                const pos = e.target.getLatLng()
                this.updatePosition(pos.lat, pos.lng)
            })

            this.map.on('click', (e) => {
                this.marker.setLatLng(e.latlng)
                this.updatePosition(e.latlng.lat, e.latlng.lng)
            })

            setTimeout(() => this.map.invalidateSize(), 200)
        },
        updatePosition(lat, lng) {
            this.lat = lat
            this.lng = lng
            $wire.set('data.latitude', lat.toFixed(6))
            $wire.set('data.longitude', lng.toFixed(6))
        }
    }"
    x-init="
        const script = document.createElement('link')
        script.rel = 'stylesheet'
        script.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(script)

        const js = document.createElement('script')
        js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        js.onload = () => init()
        document.body.appendChild(js)
    "
    class="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
>
    <div x-ref="map" style="height: 300px; width: 100%;"></div>
    <p class="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
        Click on the map or drag the marker to set the store location. Lat: <span x-text="Number(lat).toFixed(6)"></span>, Lng: <span x-text="Number(lng).toFixed(6)"></span>
    </p>
</div>
