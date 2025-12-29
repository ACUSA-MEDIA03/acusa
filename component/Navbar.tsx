"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import { FaBarsStaggered } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";
import Logo from '@/assets/Logo/logo.png'

type ActivePage =
  | ""
  | "about"
  | "gallery"
  | "publication"
  | "feedback";
interface NavbarProps {
  active?: ActivePage;
}

export default function Navbar({ active = "" }: NavbarProps) {
  const navBarRef = useRef<HTMLUListElement | null>(null);
  const [open, setOpen] = useState(false);

  const showNav = () => setOpen(true);
  const removeNav = () => setOpen(false);

  return (
    <div
      className={`fixed z-10 w-full flex p-5 lg:px-16 lg:py-10 lg:items-center lg:justify-between
      ${active === "" ? "text-[#fff]" : ""}`}
    >
      {/* Logo */}
      <Link href="/">
        <Image
          src={Logo} 
          alt=" ACUSA Logo"
          className="lg:w-12.5 w-10"
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
          className="lg:hidden absolute right-8 top-10 text-[50px] cursor-pointer hover:text-sub"
          onClick={removeNav}
        />

        <NavItem
            href="/"
          label="Home"
          active={active === ""}
        />
        <NavItem
          href="/about"
          label="About Us"
          active={active === "about"}
        />
        <NavItem
          href="/gallery"
          label="Gallery"
          active={active === "gallery"}
        />
        <NavItem
          href="/publication"
          label="Publications"
          active={active === "publication"}
        />
        <NavItem
          href="/feedback"
          label="Feedbacks"
          active={active === "feedback"}
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
}

function NavItem({ href, label, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`px-4 lg:px-0 py-4 lg:py-2 text-right lg:text-left
       lg:hover:bg-transparent 
      ${
        active
          ? "text-sub font-medium  lg:bg-transparent"
          : ""
      }`}
    >
      {label}
    </Link>
  );
}
