"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard/allorders", label: "All Orders" },
  { href: "/dashboard/pendingorders", label: "Pending Orders" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/additem", label: "Add Item" },
  { href: "/dashboard/menu", label: "Menu" },
];

const SidePanel = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 mb-2 rounded hover:bg-gray-700 ${
              pathname === item.href ? "bg-gray-700" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SidePanel;
