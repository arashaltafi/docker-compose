import { INews } from '@/types';
import UserDetailClient from '../../components/UserDetailClient';

async function getUser(id: string): Promise<INews> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('User not found');
    return res.json();
}

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await getUser(id);

    return (
        <div className="bg-white p-6 rounded shadow">
            <UserDetailClient user={user} />
        </div>
    );
}