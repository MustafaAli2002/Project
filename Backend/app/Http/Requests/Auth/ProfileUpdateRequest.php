<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class ProfileUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
           'email' => [
                         'required',
                         'string',
                         'email',
                         'max:255',
                          Rule::unique('users', 'email')->ignore($this->user()->id),
],
            'phone_no' => 'sometimes|max:20',
            'address' => 'required|string|max:255',
            'gender' => 'required|in:male,female',
        ];
    }
}
