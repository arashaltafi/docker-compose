import UserList from '../../components/UserList';
import { IUser } from '../../types';

async function getUsers(filter?: string): Promise<IUser[]> {
    const res = await fetch(`/api/proxy/users${filter ? `?filter=${filter}` : ''}`, { cache: 'no-store' });
    return res.json();
}

export default async function UsersPage({ searchParams }: { searchParams?: { filter?: string } }) {
    const users = await getUsers(searchParams?.filter);
    return (
        <>
            <h1 className="text-2xl mb-4">All Users</h1>
            <UserList users={users} />
        </>
    );
}