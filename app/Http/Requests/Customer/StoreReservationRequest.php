<?php

namespace App\Http\Requests\Customer;

use App\Enums\ReservationSource;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreReservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_id' => ['required', 'integer', 'exists:products,id'],
            'variant_id' => ['nullable', 'integer', 'exists:product_variants,id'],
            'customer_note' => ['nullable', 'string', 'max:500'],
            'source' => ['nullable', 'string', Rule::enum(ReservationSource::class)],
        ];
    }
}
