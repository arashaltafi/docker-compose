'use client';

import { IUser } from '@/types';
import Link from 'next/link';

export default function UserList({ users, onDelete }: { users: IUser[]; onDelete?: (id: string) => void }) {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map(u => (
                <li key={u._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition flex justify-between items-center">
                    <Link href={`/users/${u._id}`} className="font-semibold text-blue-600 hover:underline">{u.name}</Link>
                    <div className="space-x-2">
                        <button onClick={() => onDelete?.(u._id)} className="text-red-600 hover:underline">Delete</button>
                        <Link href={`/users/edit?id=${u._id}`} className="text-blue-600 hover:underline">Edit</Link>
                    </div>
                </li>
            ))}
        </ul>
    );
}