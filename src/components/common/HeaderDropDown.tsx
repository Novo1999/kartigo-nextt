'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ReactQueryProvider from '@/providers/QueryProvider'
import Link from 'next/link'
import { useState } from 'react'
import { BsInfoSquareFill } from 'react-icons/bs'
import { CiShoppingCart } from 'react-icons/ci'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdHome } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import { Button } from '../ui/button'
import Navlink from '../ui/Navlink'
import HeaderButtons from './HeaderButtons'
import Search from './Search'

const HeaderDropDown = ({
  user,
  search,
  headerButtonTexts,
  wishlists,
  cartItems,
  isAdmin,
  lang,
  randomProductId,
}: IHeaderButtons) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DropdownMenuTrigger className='block lg:hidden'>
        {isOpen ? (
          <RxCross1 className='text-3xl' />
        ) : (
          <GiHamburgerMenu className='text-3xl' />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-screen relative top-6 m-auto lg:hidden flex flex-col items-center pt-2'>
        <ReactQueryProvider>
          <div className='hidden lg:block'>
            <Search searchLocale={search!} />
          </div>
        </ReactQueryProvider>
        {/* dont show this buttons if user is admin */}
        <div className='flex gap-4 mt-24 sm:mt-0'>
          {!isAdmin && (
            <>
              <Navlink href={`/${lang}`}>
                <MdHome />
                Home
              </Navlink>
              <Navlink href={`/${lang}/shop`}>
                <CiShoppingCart className='text-xl font-bold' />
                Shop
              </Navlink>
              <Navlink href={`/${lang}/about`}>
                <BsInfoSquareFill />
                About
              </Navlink>
            </>
          )}
        </div>
        <Link href={`/${lang}/product-details/${randomProductId}`}>
          <Button className='hover:border group border-blue-500 hover:bg-orange-500 mt-4 bg-orange-600 transition-all duration-200 hover:scale-[102%] text-xs sm:text-md'>
            <span className='group-hover:rotate-180 transition-all duration-300'>
              🍀
            </span>{' '}
            I am feeling lucky
          </Button>
        </Link>
        {!isAdmin && (
          <HeaderButtons
            user={user}
            headerButtonTexts={headerButtonTexts}
            wishlists={wishlists ?? []}
            cartItems={cartItems ?? []}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default HeaderDropDown
