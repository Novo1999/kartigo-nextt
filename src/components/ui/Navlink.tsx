'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavlinkWrapper extends WrapperChild {
  href: string
  onClick?: () => void
}

const Navlink = ({ children, href, onClick }: NavlinkWrapper) => {
  const pathname = usePathname()

  // the about and contact page is unused
  return (
    <Link
      onClick={onClick}
      href={href !== '/about' && href !== '/contact' ? href : '/'}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${
          pathname === href ||
          (pathname === href && pathname.includes('admin-dashboard'))
            ? 'bg-gradient-to-r from-gray-100 to-gray-300 group p-2 rounded-lg'
            : ' hover:bg-gradient-to-r hover:from-indigo-200 hover:to-yellow-100 rounded-lg bg-gradient-to-r from-rose-100 to-teal-100'
        }  p-1 rounded-full text-black transition flex items-center gap-1 shadow-lg border w-fit sm:w-24 lg:w-fit text-sm`}
      >
        {children}
      </motion.div>
    </Link>
  )
}
export default Navlink
