import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { CgSearch } from 'react-icons/cg'
import { Button } from './button'

const SpotlightButton = ({
  disabled,
  onClick,
  searchLocale,
}: {
  disabled: boolean
  onClick: () => void
  searchLocale: string
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const spanRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { width } = (e.target as HTMLElement)?.getBoundingClientRect()
      const offset = e.offsetX
      const left = `${(offset / width) * 100}%`

      spanRef.current!.animate({ left }, { duration: 250, fill: 'forwards' })
    }

    const handleMouseLeave = () => {
      spanRef.current!.animate(
        { left: '50%' },
        { duration: 100, fill: 'forwards' }
      )
    }

    btnRef?.current?.addEventListener('mousemove', handleMouseMove)
    btnRef?.current?.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      btnRef?.current?.removeEventListener('mousemove', handleMouseMove)
      btnRef?.current?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className='flex items-center justify-center'>
      <motion.button
        disabled={disabled}
        onClick={onClick}
        whileTap={{ scale: 0.985 }}
        ref={btnRef}
        className='relative w-36 h-10 overflow-hidden rounded-lg hidden sm:flex justify-center bg-gradient-to-r from-slate-900 to-slate-700 px-4 py-3 text-lg font-medium text-white'
      >
        <span className='pointer-events-none relative z-10 m-auto text-sm mix-blend-difference hidden sm:block'>
          {searchLocale}
        </span>
        <span className='block sm:hidden pointer-events-none relative z-10 mr-16 text-sm mix-blend-difference'>
          <CgSearch />
        </span>
        <span
          ref={spanRef}
          className='pointer-events-none absolute left-[50%] top-[50%] h-20 w-20 -translate-x-[60%] -translate-y-[50%] rounded-full bg-gradient-to-r from-indigo-200 to-yellow-100'
        />
      </motion.button>
      <Button variant='ringHover' className='block sm:hidden'>
        <CgSearch />
      </Button>
    </div>
  )
}

export default SpotlightButton
