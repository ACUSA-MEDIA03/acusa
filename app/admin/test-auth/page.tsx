"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function TestAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="p-8">
        <p>Signed in as {session.user?.email}</p>
        <p>Role: {session.user?.role}</p>
        <button
          onClick={() => signOut()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <p>Not signed in</p>
      <button
        onClick={() => signIn()}
        className="mt-4 px-4 py-2 bg-main hover:bg-main/90 text-white rounded"
      >
        Sign in
      </button>
    </div>
  );
}