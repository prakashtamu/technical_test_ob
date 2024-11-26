"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const pages = [
    { name: "Create Interests", path: "/pages/createInterests" },
    { name: "Get Interests", path: "/pages/getInterests" },
  ];

  return (
    <div className="h-screen w-64 py-4 px-2 bg-[#48bcbb] text-white">
      <p className="uppercase text-center">OB technical test</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {pages.map((page, index) => (
          <li key={index} style={{ margin: "10px 0" }}>
            <Link
              href={page.path}
              passHref
              style={{
                color: pathname === page.path ? "blue" : "white", // Highlight active link
                fontWeight: pathname === page.path ? "bold" : "normal",
              }}
            >
              {page.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
