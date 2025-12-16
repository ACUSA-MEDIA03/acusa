'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Circle, Menu }  from "lucide-react"
import Logo from '@/public/Logo/logo.png'

const NavBar = () => {
  const navRef = useRef<HTMLDivElement | null>(null)
  const navBarRef = useRef<HTMLUListElement | null>(null)
  const pathname = usePathname()
  const active = pathname.split('/')[1] || ''

  /* -------------------------------------------
     Scroll effect only
  -------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('scrollNav', window.scrollY > 40)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  

  /* Mobile navigation handlers */
  const showNav = () => {
    if (!navBarRef.current) return
    navBarRef.current.style.display = 'flex'
    navBarRef.current.style.position = 'fixed'
  }

  const removeNav = () => {
    if (!navBarRef.current) return
    navBarRef.current.style.display = 'none'
  }

  /* Helper for active link styles */
  const linkClass = (key: string) =>
    `lg:px-0 px-4 lg:hover:bg-none
     ${active === key ? 'active text-sub bg-secondary lg:bg-transparent lg:text-secondary' : ''}
     lg:hover:text-secondary lg:hover:bg-transparent
     lg:py-2 lg:text-left text-right py-4 pr-[40px]`

  return (
    <div
      ref={navRef}
      className={`fixed flex lg:items-center lg:justify-between
      lg:px-16 lg:py-5 p-5 z-10 w-full
      ${active === '' ? 'text-white' : ''}`}
    >
      {/* Logo */}
      <Link href="/">
        <Image
          src={Logo}
          alt="Logo"
          className="lg:w-12.5 w-10"
          priority
        />
      </Link>

      {/* Navigation */}
      <ul
        ref={navBarRef}
        className={`lg:flex lg:flex-row font-grotesk lg:relative hidden
        top-0 lg:bg-transparent absolute left-0
        lg:w-fit lg:h-fit h-lvhh z-30 w-full
        bg-[#101f82fe] space-x-0 lg:space-x-12.5
        flex-col justify-center
        lg:divide-none divide-secondary divide-y
        motion-preset-slide-left motion-duration-300`}
      >
        <Circle
          className="z-40 text-[50px] hover:text-main-yellow
          lg:hidden absolute right-8 top-10 cursor-pointer"
          onClick={removeNav}
        />

        <Link href="/" className={linkClass('')}>
          Home
        </Link>

        <Link href="/about" className={linkClass('about')}>
          About Us
        </Link>

        <Link href="/gallery" className={linkClass('gallery')}>
          Gallery
        </Link>

        <Link href="/publication" className={linkClass('publication')}>
          Publications
        </Link>

        <Link href="/feedback" className={linkClass('feedback')}>
          Feedbacks
        </Link>
      </ul>

      {/* Mobile menu icon */}
      <Menu
        className="lg:hidden absolute right-4 text-[30px] cursor-pointer"
        onClick={showNav}
      />
    </div>
  )
}

export default NavBar