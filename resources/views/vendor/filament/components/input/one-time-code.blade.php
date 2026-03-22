@props([
    'length' => 6,
])

@php
    $wireModel = null;
    if ($input && $input->attributes) {
        foreach ($input->attributes->getIterator() as $key => $value) {
            if (str_starts_with($key, 'wire:model')) {
                $wireModel = $value;
                break;
            }
        }
    }
@endphp

<div
    x-data="{
        digits: Array({{ $length }}).fill(''),
        get code() {
            return this.digits.join('')
        },
        handleInput(index, event) {
            const value = event.target.value.replace(/\D/g, '')
            this.digits[index] = value.slice(-1)
            event.target.value = this.digits[index]
            this.syncWireModel()
            if (value && index < {{ $length }} - 1) {
                this.$refs['digit' + (index + 1)].focus()
            }
        },
        handleKeydown(index, event) {
            if (event.key === 'Backspace') {
                if (this.digits[index] === '' && index > 0) {
                    this.$refs['digit' + (index - 1)].focus()
                }
                this.digits[index] = ''
                event.target.value = ''
                this.syncWireModel()
            }
        },
        handlePaste(event) {
            event.preventDefault()
            const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, {{ $length }})
            for (let i = 0; i < {{ $length }}; i++) {
                this.digits[i] = pasted[i] || ''
                this.$refs['digit' + i].value = this.digits[i]
            }
            this.syncWireModel()
            const focusIndex = Math.min(pasted.length, {{ $length }} - 1)
            this.$refs['digit' + focusIndex].focus()
        },
        syncWireModel() {
            @if($wireModel)
                $wire.set('{{ $wireModel }}', this.code)
            @endif
        },
        init() {
            @if($wireModel)
                const existing = $wire.get('{{ $wireModel }}') || ''
                for (let i = 0; i < {{ $length }}; i++) {
                    this.digits[i] = existing[i] || ''
                    this.$refs['digit' + i].value = this.digits[i]
                }
            @endif
        }
    }"
    {{
        $attributes
            ->class([
                'fi-one-time-code-input-ctn',
            ])
    }}
    x-resize.document="
        const isSmall = $width < 480;
        $refs.otpContainer.style.gap = isSmall ? '0.375rem' : '0.625rem';
        document.querySelectorAll('[data-otp-digit]').forEach(el => {
            el.style.maxWidth = isSmall ? '2.5rem' : '3.5rem';
            el.style.height = isSmall ? '2.75rem' : '3.5rem';
            el.style.fontSize = isSmall ? '1.125rem' : '1.5rem';
        })
    "
    style="width: 100%; display: flex; gap: 0.625rem; justify-content: center;"
    x-ref="otpContainer"
>
    @foreach (range(0, $length - 1) as $index)
        <input
            type="text"
            inputmode="numeric"
            maxlength="1"
            data-otp-digit
            x-ref="digit{{ $index }}"
            x-on:input="handleInput({{ $index }}, $event)"
            x-on:keydown="handleKeydown({{ $index }}, $event)"
            x-on:paste="handlePaste($event)"
            @if($index === 0) autofocus @endif
            style="flex: 1; max-width: 3.5rem; height: 3.5rem; text-align: center; font-family: ui-monospace, monospace; font-size: 1.5rem; font-weight: 600; border-radius: 0.5rem; border: 1px solid rgba(255, 255, 255, 0.2); background: rgba(255, 255, 255, 0.05); color: white; outline: none; caret-color: transparent;"
            onfocus="this.style.borderColor='#14878E'; this.style.borderWidth='2px'"
            onblur="this.style.borderColor='rgba(255, 255, 255, 0.2)'; this.style.borderWidth='1px'"
        />
    @endforeach

    {{-- Hidden input for Livewire form binding --}}
    <input
        type="hidden"
        {{ $input?->attributes }}
        x-bind:value="code"
    />
</div>
