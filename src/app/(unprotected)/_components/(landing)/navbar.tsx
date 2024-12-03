import { type FC } from "react";
import { GitBranch } from "lucide-react";
import SignInOut from "./navbar-sign-in-out-btns";

const Navbar: FC = () => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center text-lg font-semibold cursor-pointer">
          <GitBranch className="mr-1 size-5" />
          Git Interact
        </div>
        <div className="ml-auto flex h-full items-center">
          <SignInOut />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
