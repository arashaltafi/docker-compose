import { INews } from '@/types';
import UserList from '../components/UserList';

async function getUsers(page = 1, pageSize = 10): Promise<{ items: INews[], totalItems: number }> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, pageSize }),
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
}

export default async function UsersPage() {
    const { items: users } = await getUsers();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">All Users</h1>
            <UserList users={users} />
        </div>
    );
}