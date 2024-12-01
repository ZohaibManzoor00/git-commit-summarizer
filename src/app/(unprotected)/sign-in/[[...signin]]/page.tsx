import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="h-dvh flex justify-center items-center bg-gray-300">
      <SignIn />;
    </div>
  );
}
