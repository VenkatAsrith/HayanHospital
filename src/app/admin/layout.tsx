"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  CalendarCheck,
  Building2,
  Users,
  Stethoscope,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  Shield,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, render without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Appointments", href: "/admin/appointments", icon: CalendarCheck },
    { label: "Hospital Info", href: "/admin/hospital", icon: Building2 },
    { label: "Doctors", href: "/admin/doctors", icon: Users },
    { label: "Services", href: "/admin/services", icon: Stethoscope },
    { label: "Facilities", href: "/admin/facilities", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-[#E5E7E7] flex flex-col justify-between shrink-0">
        <div>
          {/* Logo / Header */}
          <div className="p-6 border-b border-[#E5E7E7]">
            <Link href="/" className="block">
              <span className="text-xl font-bold tracking-tight text-[#111111]">
                HAYAN
              </span>
              <p className="text-[10px] font-semibold tracking-wider uppercase text-[#164B61] mt-0.5">
                Hospital Administration
              </p>
            </Link>
            <div className="mt-2 flex items-center space-x-1.5 text-[11px] text-[#626262]">
              <Shield className="w-3 h-3 text-emerald-600" />
              <span>Kodad Clinical CMS</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-[#164B61] text-white shadow-sm"
                      : "text-[#555555] hover:bg-[#F7F8F6] hover:text-[#111111]"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility */}
        <div className="p-4 border-t border-[#E5E7E7] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2 text-xs font-medium text-[#555555] hover:text-[#111111] rounded-lg hover:bg-[#F7F8F6]"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#888888]" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
