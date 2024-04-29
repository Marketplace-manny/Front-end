import { signOut } from "next-auth/react";

function Dashboard({ session }: { session: any }) {
  return (
    <div>
      <h1>Welcome to Your Dashboard, {session?.user?.name}!</h1>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

export default Dashboard;
