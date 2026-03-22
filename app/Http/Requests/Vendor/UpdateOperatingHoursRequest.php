<?php

namespace App\Http\Requests\Vendor;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateOperatingHoursRequest extends FormRequest
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
        $days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        $rules = [
            'hours' => ['required', 'array'],
        ];

        foreach ($days as $day) {
            $rules["hours.{$day}"] = ['required', 'array'];
            $rules["hours.{$day}.open"] = ['required_unless:hours.'.$day.'.closed,true', 'nullable', 'string'];
            $rules["hours.{$day}.close"] = ['required_unless:hours.'.$day.'.closed,true', 'nullable', 'string'];
            $rules["hours.{$day}.closed"] = ['required', 'boolean'];
        }

        return $rules;
    }
}
