"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DraftingCompass } from "lucide-react";
interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  createdAt: string;
  _count: {
    events: number;
    publications: number;
  };
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "admin" | "user">("all");

  //Fetch users function declared BEFORE any useEffect
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      let url = "/api/admin/users?limit=100";

      if (filter === "admin") url += "&role=ADMIN";
      else if (filter === "user") url += "&role=USER";

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/signin");
    }
  }, [status, router]);

  // Fetch users after authentication
  useEffect(() => {
    if (status !== "authenticated") return;
    fetchUsers();
  }, [status, fetchUsers]);

  //  Toggle role
  const toggleRole = async (userId: string, currentRole: string) => {
  const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";

  const actionText =
    newRole === "ADMIN"
      ? "promote this user to admin"
      : "remove admin privileges from this user";

  toast.error(`Are you sure you want to ${actionText}?`, {
    action: {
      label: "Confirm",
      onClick: async () => {
        try {
          const response = await fetch(`/api/admin/users/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: newRole }),
          });

          const data = await response.json();

          if (!response.ok) {
            toast.error(data.error || "Failed to update user role");
            return;
          }

          toast.success(data.message || "User role updated successfully");
          fetchUsers();
        } catch (err) {
          console.error("Update error:", err);
          toast.error("Failed to update user role");
        }
      },
    },
    cancel: {
      label: "Cancel",
      onClick: () => {
        toast.dismiss();
      },
    },
  });
};

  // Delete user
  const deleteUser = (userId: string, userEmail: string) => {
  toast.error(
    `Are you sure you want to delete user ${userEmail}? This action cannot be undone.`,
    {
      action: {
        label: "Delete user",
        onClick: async () => {
          try {
            const response = await fetch(`/api/admin/users/${userId}`, {
              method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
              toast.error(data.error || "Failed to delete user");
              return;
            }

            toast.success("User deleted successfully");
            fetchUsers();
          } catch (err) {
            console.error("Delete error:", err);
            toast.error("Failed to delete user");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.dismiss();
        },
      },
    }
  );
};

  //  Show loader while fetching
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sub"></div>
      </div>
    );
  }

  //  Filtered lists
  const adminUsers = users.filter((u) => u.role === "ADMIN");
  const regularUsers = users.filter((u) => u.role === "USER");

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-main">User Management</h1>
          <p className="text-sub mt-2">Manage user roles and permissions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-main">{users.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Administrators</p>
            <p className="text-3xl font-bold text-main">{adminUsers.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Regular Users</p>
            <p className="text-3xl font-bold text-main">{regularUsers.length}</p>
          </div>
        </div>

        {/* Warning Box */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Warning:</strong> Be careful when managing admin roles. You cannot remove your
                own admin privileges.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "all"
                ? "bg-main text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Users
          </button>
          <button
            onClick={() => setFilter("admin")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "admin"
                ? "bg-main text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Admins ({adminUsers.length})
          </button>
          <button
            onClick={() => setFilter("user")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "user"
                ? "bg-main text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Regular Users ({regularUsers.length})
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th> 
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className={user.id === session?.user?.id ? "bg-blue-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                        {user.id === session?.user?.id && (
                          <span className="ml-2 text-xs text-blue-600">(You)</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user._count.events} events, {user._count.publications} publications
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => toggleRole(user.id, user.role)}
                      disabled={user.id === session?.user?.id}
                      className={`px-3 py-1 rounded-lg transition text-sm ${
                        user.role === "ADMIN"
                          ? "bg-yellow-600 text-white hover:bg-yellow-700"
                          : "bg-green-600 text-white hover:bg-green-700"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {user.role === "ADMIN" ? "Demote" : "Promote"}
                    </button>
                    <button
                      onClick={() => deleteUser(user.id, user.email || "this user")}
                      disabled={user.id === session?.user?.id}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
