import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex h-dvh items-center justify-center bg-gray-300">
      <SignUp />
    </div>
  );
}
