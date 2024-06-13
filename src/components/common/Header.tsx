import { getDictionary } from '@/app/[lang]/dictionaries'
import { auth } from '@/auth'

import { getRandomProductId } from '@/db/queries/product.queries'
import ReactQueryProvider from '@/providers/QueryProvider'
import { fetchUserCart, fetchUserWishlist } from '@/utils/headerFetchUtil'
import Image from 'next/image'
import Link from 'next/link'
import { MdAdminPanelSettings } from 'react-icons/md'
import logo from '../../../public/kart-logo.png'
import HeaderButtons from './HeaderButtons'
import HeaderContainer from './HeaderContainer'
import HeaderDropDown from './HeaderDropDown'
import Search from './Search'

const Header = async ({ lang }: ILang) => {
  const { search, wishlist, cart, account } = await getDictionary(lang)
  const session = (await auth()) as SessionWith_Id

  const isAdmin = session?.user?.role === 'admin'

  // fetch user wishlists
  const wishlists =
    session?.user?._id && (await fetchUserWishlist(session?.user?._id))
  // fetch user cart items
  const cartItems =
    session?.user?._id && (await fetchUserCart(session?.user?._id))

  const headerButtonTexts = {
    search,
    wishlist,
    cart,
    account,
  }

  const randomProductId = await getRandomProductId()

  return (
    <HeaderContainer>
      <div className='flex justify-between bg-dark flex-col lg:flex-row mx-6'>
        {/* logo */}
        <div className='flex justify-between items-center'>
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
          {isAdmin && (
            <nav className='block lg:hidden'>
              <Link
                className='flex gap-2 bg-purple-600 p-2 self-end sm:ml-96 text-white rounded-md'
                href={`/${lang}/admin-dashboard`}
              >
                <MdAdminPanelSettings />
                <p className='text-xs flex gap-1'>
                  Admin{' '}
                  <span className='hidden min-[375px]:block'> Dashboard</span>
                </p>
              </Link>
            </nav>
          )}

          <div className='hidden sm:flex xl:ml-36'>
            <ReactQueryProvider>
              <Search searchLocale={search} />
            </ReactQueryProvider>
          </div>
          {!isAdmin && (
            <HeaderDropDown
              isAdmin={isAdmin}
              user={session?.user}
              search={search}
              headerButtonTexts={headerButtonTexts}
              wishlists={wishlists}
              cartItems={cartItems}
              lang={lang}
              randomProductId={randomProductId}
            />
          )}
        </div>

        <div className='hidden lg:flex'>
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
      <div className='flex sm:hidden'>
        <ReactQueryProvider>
          <Search searchLocale={search} />
        </ReactQueryProvider>
      </div>
    </HeaderContainer>
  )
}
export default Header
