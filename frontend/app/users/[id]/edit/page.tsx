import UserForm from '../../../../components/UserForm';
import { IUser } from '../../../../types';

async function getUser(id: string): Promise<IUser> {
    const res = await fetch(`/api/proxy/users/${id}`, { cache: 'no-store' });
    return res.json();
}

export default async function EditUser({ params: { id } }: { params: { id: string } }) {
    const user = await getUser(id);
    return (
        <>
            <h1 className="text-2xl mb-4">Edit User</h1>
            <UserForm user={user} onSave={(data) => fetch(`/api/proxy/users/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(() => window.location.href = `/users/${id}`)} />
        </>
    );
}