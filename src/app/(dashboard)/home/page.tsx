import { auth, currentUser } from "@clerk/nextjs";

export default async function HomePage() {
    const { userId } : { userId: string | null } = await auth();
    const user = await currentUser();

    return (
        <div className="ml-[400px]">
            <h1>Dashboard</h1>
            <p>{user?.username}</p>
            <p>{userId}</p>
        </div>
    );
};