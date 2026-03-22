<?php

namespace App\Http\Requests\Vendor;

use App\Enums\Gender;
use App\Enums\ProductStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'price' => ['required', 'integer', 'min:0'],
            'compare_price' => ['nullable', 'integer', 'min:0'],
            'gender' => ['required', Rule::enum(Gender::class)],
            'primary_color' => ['nullable', 'string', 'max:50'],
            'primary_color_hex' => ['nullable', 'string', 'max:7'],
            'status' => ['required', Rule::enum(ProductStatus::class)],
            'is_featured' => ['boolean'],
            'is_reservable' => ['boolean'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'event_type_ids' => ['nullable', 'array'],
            'event_type_ids.*' => ['exists:event_types,id'],
            'style_preference_ids' => ['nullable', 'array'],
            'style_preference_ids.*' => ['exists:style_preferences,id'],
        ];
    }
}
