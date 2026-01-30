"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { FaBarsStaggered } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";
import Logo from '@/assets/Logo/logo.png'

export default function Navbar() {
  const navBarRef = useRef<HTMLUListElement | null>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); 

  const showNav = () => setOpen(true);
  const removeNav = () => setOpen(false);

  return (
    <div
      className={`fixed z-10 w-full flex p-5 lg:px-16 lg:py-10 lg:items-center lg:justify-between
      ${pathname === "/admin" ? "text-main" : ""}`}
    >
      {/* Logo */}
      <Link href="/admin">
        <Image
          src={Logo}
          alt="Logo"
          className="lg:w-12.5 w-10"
          loading="eager"
        />
      </Link>

      {/* Nav Links */}
      <ul
        ref={navBarRef}
        className={`font-grotesk transition-all duration-300
        lg:flex lg:flex-row lg:relative lg:bg-transparent lg:w-fit lg:h-fit lg:space-x-12.5
        ${
          open
            ? "flex absolute left-0 top-0 w-full h-lvh bg-[#101f82fe] flex-col justify-center z-30 divide-y divide-secondary"
            : "hidden"
        }`}
      >
        {/* Close Icon */}
        <CiCircleRemove
          className="lg:hidden absolute right-8 top-10 text-[50px] text-white cursor-pointer hover:text-sub"
          onClick={removeNav}
        />

        <NavItem
          href="/admin/dashboard"
          label="Home"
          active={pathname === "/admin/dashboard"}
          onClick={removeNav}
        />
        <NavItem
          href="/admin/events"
          label="Events"
          active={pathname === "/admin/events"}
          onClick={removeNav}
        />
        <NavItem
          href="/admin/publications"
          label="Publications"
          active={pathname === "/admin/publications"}
          onClick={removeNav}
        />
        <NavItem
          href="/admin/feedbacks"
          label="Feedbacks"
          active={pathname === "/admin/feedbacks"}
          onClick={removeNav}
        />
         <NavItem
          href="/admin/users"
          label="Users"
          active={pathname === "/admin/users"}
          onClick={removeNav}
        />
      </ul>

      {/* Mobile Menu Icon */}
      <FaBarsStaggered
        className="lg:hidden absolute right-4 text-[30px] cursor-pointer"
        onClick={showNav}
      />
    </div>
  );
}

/*  Nav Item Component  */

interface NavItemProps {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({ href, label, active, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-4 lg:px-0 py-4 lg:py-2 text-right lg:text-left
       lg:hover:bg-transparent transition-colors
      ${
        active
          ? "text-sub font-medium lg:bg-transparent"
          : "text-white lg:text-inherit"
      }`}
    >
      {label}
    </Link>
  );
}