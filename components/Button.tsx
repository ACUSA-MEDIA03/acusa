'use client'
import { ArrowRight } from 'lucide-react'

type ButtonProps = {
  text: string
  bgcolor?: 'blue' | 'main' | 'sub'
  as?: 'button' | 'link'
}

export default function Button({
  text,
  bgcolor = 'main',
  as = 'button',
}: ButtonProps) {
  const bgClass =
    bgcolor === 'blue' ? 'bg-sub' : 'bg-main'
  const content = (
    <>
      <span
        className={`absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full group-hover:translate-x-0 ease ${bgClass}`}
      >
        <ArrowRight className="w-6 h-6" />
      </span>

      <span
        className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease lg:text-[14px] text-[13px] font-semibold"
      >
        {text}
      </span>
    </>
  )
  if (as === 'link') {
    return (
      <div className="relative inline-flex items-center justify-center px-4 lg:py-5.75 py-4.75 overflow-hidden font-medium text-white transition duration-300 ease-out group cursor-pointer">
        {content}
      </div>
    )
  }
  return (
    <button className="relative inline-flex items-center justify-center px-4 lg:py-5.75 py-4.75 overflow-hidden font-medium text-white transition duration-300 ease-out group cursor-pointer">
      {content}
    </button>
  )
}