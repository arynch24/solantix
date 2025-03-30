"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleDashboardClick = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/api/auth/signin");
    }
  };

  return (
    <header className="w-full px-6 py-4 pt-6 bg-background border-b">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Solantix</h1>
        </Link>

        {/* Right-side buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button className="bg-indigo-600" onClick={handleDashboardClick}>
            Dashboard
          </Button>
          {session ? (
            <Button
              variant="outline"
              onClick={() => {
                signOut();
                router.push("/");
              }}
            >
              Sign Out
            </Button>
          ) : (
            <Button variant="outline" onClick={() => router.push("/signin")}>
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-4">
            <Button asChild>
              <Link href="/get-credentials">Get Postgres Credentials</Link>
            </Button>
            {session ? (
              <Button
                variant="outline"
                onClick={() => {
                  signOut();
                  router.push("/");
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Button variant="outline" onClick={() => router.push("/signin")}>
                Sign In
              </Button>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
