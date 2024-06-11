import { getDictionary } from '@/app/[lang]/dictionaries'
import { auth } from '@/auth'

import ReactQueryProvider from '@/providers/QueryProvider'
import { fetchUserCart, fetchUserWishlist } from '@/utils/headerFetchUtil'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../public/kart-logo.png'
import HeaderButtons from './HeaderButtons'
import HeaderContainer from './HeaderContainer'
import HeaderDropDown from './HeaderDropDown'
import Search from './Search'

const Header = async ({ lang }: ILang) => {
  const { search, wishlist, cart, account } = await getDictionary(lang)
  const session = (await auth()) as SessionWith_Id

  const isAdmin = session?.user?.role === 'admin'

  const wishlists =
    session?.user?._id && (await fetchUserWishlist(session?.user?._id))
  const cartItems =
    session?.user?._id && (await fetchUserCart(session?.user?._id))

  const headerButtonTexts = {
    search,
    wishlist,
    cart,
    account,
  }

  return (
    <HeaderContainer>
      <div className='container flex items-center justify-between bg-dark'>
        <Link href={isAdmin ? `/${lang}/admin-dashboard` : `/${lang}`}>
          <div className='flex gap-2 items-center'>
            <Image
              src={logo}
              width={1200}
              height={1200}
              alt='Logo'
              className='size-16'
              placeholder='blur'
            />
            <div className='flex gap-1 dark:text-white'>
              <p className='font-semibold'>Karti</p>
              <p className='font-bold'>Go</p>
            </div>
          </div>
        </Link>

        <HeaderDropDown
          isAdmin={isAdmin}
          user={session?.user}
          search={search}
          headerButtonTexts={headerButtonTexts}
          wishlists={wishlists}
          cartItems={cartItems}
        />
        <div className='hidden sm:flex'>
          <ReactQueryProvider>
            <Search searchLocale={search} />
          </ReactQueryProvider>
          {/* dont show this buttons if user is admin */}
          {!isAdmin && (
            <HeaderButtons
              user={session?.user}
              headerButtonTexts={headerButtonTexts}
              wishlists={wishlists ?? []}
              cartItems={cartItems ?? []}
            />
          )}
        </div>
      </div>
    </HeaderContainer>
  )
}
export default Header
