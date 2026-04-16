"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

// 👉 Move your image to /public/images/logo.png
import logo from "@/public/images/logo.png";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A2463] text-white">
      <div className="container mx-auto px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image
                src={logo}
                alt="Gulf Empire Company"
                className="h-12 w-auto brightness-0 invert"
              />
            </div>

            <p className="text-white/80 text-sm mb-4">
              Leading manpower supply and recruitment services across the Middle
              East, connecting talent with opportunities.
            </p>

            <div className="flex items-center gap-3">
              {[Mail, Mail, Mail, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 bg-white/10 hover:bg-[#D4AF37] rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Our Services" },
                { href: "/jobs", label: "Current Openings" },
                { href: "/contact", label: "Contact Us" },
                { href: "/apply", label: "Submit Your CV" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-[#D4AF37] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                { href: "/services#hr-planning", label: "HR Planning" },
                { href: "/services#overseas", label: "Overseas Recruitment" },
                { href: "/services#training", label: "Training & Orientation" },
                { href: "/services#visa", label: "Visa & Emigration Support" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-[#D4AF37] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <div className="text-white/80 text-sm">
                  <p className="font-semibold text-white">Kuwait Office</p>
                  <p>Al Farwaniyah, Kuwait City</p>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <div className="text-white/80 text-sm">
                  <p className="font-semibold text-white">India Office</p>
                  <p>Mumbai, Maharashtra</p>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-white/80 text-sm">+965 1234 5678</span>
              </li>

              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-white/80 text-sm">
                  info@gulfempire.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            <p className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} Gulf Empire Company. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm"
              >
                Terms of Service
              </Link>

              <Link
                href="/admin/login"
                className="text-white/40 hover:text-white/60 transition-colors text-xs"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;