import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex h-dvh items-center justify-center bg-gray-300">
      <SignIn />
    </div>
  );
}
