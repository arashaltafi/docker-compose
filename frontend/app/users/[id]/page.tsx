import { IUser } from "@/types";
import UserDetailClient from "../../components/UserDetailClient";

async function getUser(id: string): Promise<IUser> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("User not found");
    return res.json();
}

export default async function UserDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;  // note: params is now a Promise
}) {
    // await params before destructuring
    const { id } = await params;
    
    const user = await getUser(id);

    return (
        <div className="p-6">
            <UserDetailClient user={user} />
        </div>
    );
}