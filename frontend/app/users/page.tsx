import { IUser } from "@/types";
import UserList from "../components/UserList";

async function getUsers(filter?: string): Promise<IUser[]> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users${filter ? `?filter=${filter}` : ""}`,
        { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
}

export default async function UsersPage({
    searchParams,
}: {
    searchParams: Promise<{ filter?: string }>;  // now promise
}) {
    const { filter } = await searchParams;
    const users = await getUsers(filter);

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">All Users</h1>
            <UserList users={users} />
        </div>
    );
}