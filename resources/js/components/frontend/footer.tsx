import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-10 bg-slate-700 dark: dark:bg-slate-950 h-full text-white">
      <div className="container px-4 py-16 mx-auto md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Link href="/">
                <img src="/images/logo.png" alt="hikay" className="w-24" />
              </Link>
            </div>
            <p className="text-sm text-white/90">
              Your trusted partner for professional multimedia production services.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="rounded-full bg-white p-2 transition-colors hover:bg-white/80"
                >
                  <Icon className="h-4 w-4 text-gray-700" />
                  <span className="sr-only">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Services</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/video-production" className="hover:text-white">Video Production</Link></li>
              <li><Link href="/photography" className="hover:text-white">Photography</Link></li>
              <li><Link href="/editing" className="hover:text-white">Post-Production</Link></li>
              <li><Link href="/consultancy" className="hover:text-white">Creative Consultancy</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Company</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/portfolio" className="hover:text-white">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Stay Updated</h3>
            <p className="text-sm text-white/80">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button variant="secondary" className="w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-white/60">
          <p>© {currentYear} Hikay Multimedia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
