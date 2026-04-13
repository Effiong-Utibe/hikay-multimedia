import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { EllipsisVertical} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'User Management',
    href: '/media/user',
  },
];
interface Props {
  users: any;
}

export default function User({ users, canEditUsers, filters, flash, auth }: any) {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [search, setSearch] = useState(filters?.search || '');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [actionType, setActionType] = useState<'make' | 'remove' | null>(null);
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<string | null>(null);


  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  const handleSearch = (e: any) => {
    e.preventDefault();

    router.get('/media/user', { search }, {
      preserveState: true,
      replace: true,
    });
  };
  const openModal = (user: any, action: 'make' | 'remove') => {
    setSelectedUser(user);
    setActionType(action);
    setModalOpen(true);
  };
  const submitAction = () => {
    if (!password) return;

    setLoadingId(selectedUser.id);


    const url =
      actionType === 'make'
        ? `/media/users/${selectedUser.id}/make-admin`
        : `/media/users/${selectedUser.id}/remove-admin`;

    router.post(
      url,
      { password },
      {
        onSuccess: () => {
          setToast('Action completed successfully');
        },
        onFinish: () => {
          setModalOpen(false);
          setPassword('');
          setLoadingId(null);
        },
      }
    );
  };


  console.log(users);
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="User Management" />

      {flash.success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {flash.success}
        </div>
      )}
      {toast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow">
          {toast}
        </div>
      )}
      <div className='overflow-x-auto rounded-lg p-6 space-y-8'>
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
        </form>

        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">User Management</h1>

          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.data.map((user: any) => (
                <tr key={user.id} className="border-t">

                  {/* Name */}
                  <td className="p-3">
                    <div className="font-medium">{user.name}</div>
                  </td>

                  {/* Email */}
                  <td className="p-3">{user.email}</td>

                  {/* Role */}
                  <td className="p-3">
                    {user.roles.includes('admin') ? (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                        Admin
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        User
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  {canEditUsers && (
                    <td className="p-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded">
                            <EllipsisVertical size={18} />
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">

                          {/* Make Admin */}
                          {!user.roles.includes('admin') && (
                            <DropdownMenuItem
                              onClick={() => openModal(user, 'make')}
                            >
                              Make Admin
                            </DropdownMenuItem>
                          )}

                          {/* Remove Admin */}
                          {user.roles.includes('admin') && (
                            <DropdownMenuItem
                              disabled={user.id === 1}
                              onClick={() => openModal(user, 'remove')}
                            >
                              Remove Admin
                            </DropdownMenuItem>
                          )}

                          {/* Delete */}
                          <DropdownMenuItem
                            className="text-red-600"
                            disabled={user.id === 1}
                            onClick={() => {
                              if (confirm('Delete this user?')) {
                                router.delete(`/media/users/${user.id}`);
                              }
                            }}
                          >
                            Delete User
                          </DropdownMenuItem>

                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  )}

                </tr>
              ))}
            </tbody>
            <tbody>

              {/* name and email of user */}


            </tbody>

          </table>
          {modalOpen && (
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Action</DialogTitle>
                </DialogHeader>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={submitAction}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Confirm
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          <div className="mt-6 flex gap-2">
            {users.links.map((link: any, index: any) => (
              <button
                key={index}
                disabled={!link.url}
                onClick={() => router.visit(link.url)}
                dangerouslySetInnerHTML={{ __html: link.label }}
                className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-500 text-white' : ''
                  }`}
              />
            ))}
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
