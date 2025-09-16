'use client';

import { IUser } from '@/types';
import { useRouter } from 'next/navigation';

export default function UserDetailClient({ user }: { user: IUser }) {
    const router = useRouter();

    async function handleDelete() {
        const res = await fetch(`/api/proxy/users/${user._id}`, { method: 'DELETE' });
        if (res.ok) router.push('/users');
        else alert('Failed to delete user');
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-700 mb-4">Email: {user.email}</p>
            <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded shadow transition"
            >
                Delete User
            </button>
        </div>
    );
}