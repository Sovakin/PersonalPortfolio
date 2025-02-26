import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function Navbar() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/experience", label: "Experience" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Portfolio
        </Link>

        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-primary",
                  location === link.href && "text-primary font-medium"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-sm transition-colors hover:text-primary p-2 rounded-md",
                        location === link.href && "bg-primary/10 text-primary font-medium"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}