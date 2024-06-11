'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ReactQueryProvider from '@/providers/QueryProvider'
import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RxCross1 } from 'react-icons/rx'
import HeaderButtons from './HeaderButtons'
import Search from './Search'

const HeaderDropDown = ({
  user,
  search,
  headerButtonTexts,
  wishlists,
  cartItems,
  isAdmin,
}: IHeaderButtons) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DropdownMenuTrigger className='block sm:hidden'>
        {isOpen ? (
          <RxCross1 className='text-3xl' />
        ) : (
          <GiHamburgerMenu className='text-3xl' />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-screen relative top-6 block sm:hidden'>
        <ReactQueryProvider>
          <Search searchLocale={search!} />
        </ReactQueryProvider>
        {/* dont show this buttons if user is admin */}
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
