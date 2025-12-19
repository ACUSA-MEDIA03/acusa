'use client'

import { ArrowRight } from 'lucide-react'

type ButtonProps = {
  text: string
  bgcolor?: 'blue' | 'main' | 'sub'
}

export default function Button({ text, bgcolor = 'main' }: ButtonProps) {
  const bgClass =
    bgcolor === 'blue' ? 'bg-sub' : 'bg-main'

  return (
    <button
      className="relative inline-flex items-center justify-center
      px-[16px] lg:py-[23px] py-[19px]
      overflow-hidden font-medium text-white
      transition duration-300 ease-out
      group cursor-pointer"
    >
      {/* Hover layer */}
      <span
        className={`absolute inset-0 flex items-center justify-center
        w-full h-full text-white duration-300
        -translate-x-full group-hover:translate-x-0 ease
        ${bgClass}`}
      >
        <ArrowRight className="w-6 h-6" />
      </span>

      {/* Text layer */}
      <span
        className="absolute flex items-center justify-center
        w-full h-full transition-all duration-300 transform
        group-hover:translate-x-full ease
        lg:text-[14px] text-[13px] font-semibold"
      >
        {text}
      </span>
    </button>
  )
}
