import { db } from "@/server/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

const SyncUser = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  
  const userEmail = user.emailAddresses[0]?.emailAddress;
  if (!userEmail) return notFound();

  await db.user.upsert({
    where: { emailAddress: userEmail ?? "" },
    update: {
      imageUrl: user.imageUrl,
      firstName: user.firstName ?? "Anonymous",
      lastName: user.lastName ?? "User",
    },
    create: {
      id: userId,
      emailAddress: userEmail,
      imageUrl: user.imageUrl,
      firstName: user.firstName ?? "Anonymous",
      lastName: user.lastName ?? "User",
    },
  });

  return redirect('/dashboard')
};

export default SyncUser