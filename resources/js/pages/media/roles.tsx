import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';

export default function Roles() {
  const { roles, users, flash } = usePage().props as any;

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!selectedUser) return;

    setLoading(true);
    console.log({ roles, users, flash });

    if (!users) return <div>Loading users...</div>;

    router.post(`/users/${selectedUser.id}/roles`, {
      roles: selectedRoles,
    }, {
      onFinish: () => setLoading(false),
    });
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Role Management', href: '/media/roles' }]}>
      <Head title="Role Management" />

      <div className="p-6 space-y-6">

        {/* Flash Messages */}
        {flash?.success && (
          <div className="bg-green-100 text-green-700 p-3 rounded">
            {flash.success}
          </div>
        )}
        {flash?.error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {flash.error}
          </div>
        )}

        {/* Select User */}
        <select
          onChange={(e) => {
            const user = users.find(
              (u: any) => u.id === Number(e.target.value) // ✅ fix type
            );

            if (!user) return;

            setSelectedUser(user);
            setSelectedRoles(user.roles.map((r: any) => r.name));
          }}
          className="border p-2 rounded w-full"
        >
          <option value="">Select User</option>
          {users.map((user: any) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {/* Select Roles */}
        {selectedUser && (
          <>
            {roles.map((role: any) => (
              <label key={role.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedRoles.includes(role.name)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRoles([...selectedRoles, role.name]);
                    } else {
                      setSelectedRoles(selectedRoles.filter(r => r !== role.name));
                    }
                  }}
                />
                {role.name}
              </label>
            ))}

            {/* Selected Roles Preview */}
            <div className="flex gap-2 flex-wrap">
              {selectedRoles.map((role) => (
                <span
                  key={role}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-500'
                }`}
            >
              {loading ? 'Updating...' : 'Update Roles'}
            </button>
          </>
        )}
      </div>
    </AppLayout>
  );
}
