'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IUser } from '@/types';

export default function EditUserPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        async function fetchUser() {
            try {
                const res = await fetch(`/api/proxy/users/${id}`, { cache: 'no-store' });
                if (!res.ok) throw new Error('User not found');
                setUser(await res.json());
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [id]);

    if (!id) return <p>User ID is missing.</p>;
    if (loading) return <p>Loading user...</p>;
    if (!user) return <p>User not found.</p>;

    return (
        <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Edit User</h1>
            <form
                onSubmit={async e => {
                    e.preventDefault();
                    const res = await fetch(`/api/proxy/users/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(user),
                    });
                    if (!res.ok) alert('Error updating user');
                }}
            >
                <input
                    type="text"
                    value={user.name}
                    onChange={e => setUser({ ...user, name: e.target.value })}
                    className="border p-2 w-full mb-4 rounded"
                />
                <input
                    type="email"
                    value={user.email}
                    onChange={e => setUser({ ...user, email: e.target.value })}
                    className="border p-2 w-full mb-4 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded shadow"
                >
                    Save
                </button>
            </form>
        </div>
    );
}