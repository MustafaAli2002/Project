<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class RolesStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
{
    return $this->user()?->can('setting edit') ?? false;
}


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
       
            return [
                'permissions' => ['required', 'array'],
                'permissions.*' => ['exists:permissions,name'],
                'role' => ['required', 'unique:roles,name', 'max:30'],
            ];
        
        
    }
}
