"use client";

import * as React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, Menu, Code, DollarSign, Book, Fingerprint, PieChart, Bell, Video, Image, ImageIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/routes";
import { NavUser } from "../nav-user";
import { UserMenuContent } from "../user-menu-content";
import { DropdownMenuContent } from "../ui/dropdown-menu";
import { UserInfo } from "../user-info";

interface PageProps {
  auth?: {
    user?: any;
  };
}

const features = [
  { title: "Video Production", description: "Track your metrics", icon: Video },
  { title: "Graphic design", description: "Enterprise-grade security", icon: Image },
  { title: "PhotoGraphy", description: "Multiple revenue streams", icon: ImageIcon },
  { title: "Notifications", description: "Real-time alerts", icon: Bell },

];
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Service", path: "/service" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Training", path: "/training" },
];


export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [showFeatures, setShowFeatures] = React.useState(false);
  const { auth } = usePage().props as any;
  const user = auth?.user;
  const { url } = usePage().props;

  function isActive(path: string) {
    const currentPath = window.location.pathname; // Use browser path
    return currentPath === path || currentPath.startsWith(path + "/");
  }

  return (
    <div className="h-15 md:h-10  dark:bg-slate-950"> {/* Unified height */}
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-10 md:h-15 items-center justify-between px-4">

          {/* Logo Section */}
          <Link href="/" className="flex items-center shrink-0">
            <img src="/images/logo.png" alt="Logo" className="h-4 md:h-8 w-auto transition-all duration-300" />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-2">
              {user && (
                <>
                  <NavigationMenuList className="gap-2">
                    {navLinks.map((link) => (
                      <NavigationMenuItem key={link.path}>
                        <Link href={link.path}>
                          <NavigationMenuLink
                            className={cn(
                              "px-4 py-2 text-sm font-medium transition-colors",
                              isActive(link.path)
                                ? "text-blue-600 font-semibold"
                                : "text-gray-700 hover:text-blue-600"
                            )}
                          >
                            {link.name}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side: Auth & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Desktop Auth */}
            {/* Right Side: Auth Buttons */}
            <div className="flex items-center gap-4">
              {!user ? (
                <div className="hidden md:flex items-center space-x-3">
                  <Button variant="ghost" asChild>
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button asChild className="bg-blue-600">
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  {user?.roles?.includes('admin') ? (
                    <Button asChild variant="secondary" className="bg-slate-100 hover:bg-slate-200">
                      <Link href="admin/dashboard">Dashboard</Link>
                    </Button>
                  ) : (
                    <Link href='/profile'>
                      <span className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                        Hi, {user.name.split(" ")[0]}
                      </span>
                    </Link>
                  )}
                  <Button variant="outline" size="sm">
                    <Link
                      href={logout()}
                      method="post"
                      as="button"
                    >
                      Logout
                    </Link>
                  </Button>
                </div>
              )}
              {/* Mobile Menu Trigger */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full backdrop-blur-3xl">
                  {/* Mobile content logic remains similar but cleaned up */}
                  <SheetHeader className="text-left border-b pb-4">
                    <SheetTitle>
                      <Link>
                        <img src="/images/logo.png" alt="hikay" className='w-25' />
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  {user && (
                    <nav className="flex flex-col gap-4 m-6">
                      <Link href="/" onClick={() => setOpen(false)} className="text-lg font-medium">Home</Link>
                      {/* <button onClick={() => setShowFeatures(!showFeatures)} className="flex items-center justify-between text-lg font-medium">
                      Features <ChevronDown className={cn("h-5 w-5 transition-transform", showFeatures && "rotate-180")} />
                    </button> */}
                      {/* ... map features here ... */}
                      <Link href="/portfolio" onClick={() => setOpen(false)} className="text-lg font-medium">Portfolio</Link>
                      <Link href="/service" onClick={() => setOpen(false)} className="text-lg font-medium">Service</Link>
                      <Link href="/about" onClick={() => setOpen(false)} className="text-lg font-medium">About</Link>
                      <Link href="/contact" onClick={() => setOpen(false)} className="text-lg font-medium">Contact</Link>
                      <Link href="/training" onClick={() => setOpen(false)} className="text-lg font-medium">Training</Link>
                    </nav>
                  )}
                  <SheetFooter>
                    {user ? (
                      <div className="flex flex-col gap-2 w-full">
                        {/* Mobile Role Check */}
                        {user?.roles?.includes('admin') ?  (
                          <Button asChild className="w-full bg-slate-900 text-white">
                            <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                          </Button>
                        ) : (
                          <Button asChild variant="ghost" className="w-full justify-start">
                            <Link href="/profile" onClick={() => setOpen(false)}>Hi, {user.name}</Link>
                          </Button>
                        )}

                        <Button asChild variant="outline" size="sm">
                          <Link href={logout()} method="post" as="button">
                            Logout
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2 w-full">
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild className="w-full">
                          <Link href="/register">Register</Link>
                        </Button>
                      </div>
                    )}
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
