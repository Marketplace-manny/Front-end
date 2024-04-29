"use client";
import DashboardComponent from "@/components/Dashboard";
import Unauthorized from "@/components/Unauthorized";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return;
    },
  });

  if (!session) {
    return <Unauthorized />;
  }

  return (
    <div>
      {session ? <DashboardComponent session={session} /> : <Unauthorized />}
    </div>
  );
};

export default page;
