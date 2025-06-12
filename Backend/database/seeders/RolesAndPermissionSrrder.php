<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionSrrder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Define permissions
        $permissionNames = [
            'messages create', 'messages view', 'messages edit', 'messages delete',
            'setting create', 'setting view', 'setting edit', 'setting delete',
            'user create', 'user view', 'user edit', 'user delete',
            'post create', 'post view', 'post edit', 'post delete',
            'author create', 'author view', 'author edit', 'author delete',
        ];

        // Create permissions if they don't exist
        foreach ($permissionNames as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }

        // Create roles and assign permissions
        $superAdminRole = Role::firstOrCreate(['name' => 'super admin']);
        $superAdminRole->syncPermissions($permissionNames);

        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $superAdminRole->syncPermissions($permissionNames);

        $userRole = Role::firstOrCreate(['name' => 'user']);
        $userRole->syncPermissions([
            'messages view', 'post view', 'author view'
        ]);
    }
}
