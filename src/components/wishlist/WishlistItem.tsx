import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useAddToWishlist from '@/hooks/wishlist-hooks/useAddToWishlist'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosRemoveCircle } from 'react-icons/io'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { AddToCartHoverMenu } from './AddToCartHoverMenu'
import StockCount from './StockCount'

const WishlistItem = ({
  product,
  userId,
  lang,
}: {
  product: IProduct
  userId: string
  lang: ILang['lang']
}) => {
  const { _id, product_name, stock_count, discount_price, image } = product
  const hasStock = stock_count > 0
  const queryClient = useQueryClient()
  const { handleWishlist, userWishlist, clickedProduct } =
    useAddToWishlist(product)

  const handleRemoveButton = async () => {
    await handleWishlist(userId, product)
    queryClient.invalidateQueries({ queryKey: ['wishlist', userId] })
  }

  const isLocaleBengali = lang === 'bn'

  const isLoading = userWishlist.loading && clickedProduct === product._id

  return (
    <Card className='mb-2 p-2 sm:p-4 hover:scale-[102%] hover:border hover:border-purple-600 sm:pb-0 transition-all duration-300 '>
      <CardContent className='flex flex-col sm:flex-row items-center justify-between gap-6'>
        <div className='w-full sm:w-28'>
          <Link
            href={`/product-details/${product._id}`}
            className='text-blue-500 text-xl font-medium uppercase'
          >
            <Image
              width={1200}
              height={1200}
              src={image}
              alt='product image'
              className='w-full hover:scale-105 transition-all h-48 sm:h-24 object-cover duration-200'
            />
          </Link>
        </div>
        <div className='w-full sm:w-1/3'>
          <Link
            href={`/product-details/${product._id}`}
            className='text-blue-500 text-sm sm:text-xl font-medium uppercase hover:underline underline-offset-4'
          >
            {product_name}
          </Link>
          <StockCount isLocaleBengali={isLocaleBengali} product={product} />
        </div>
        <div className='text-primary text-lg font-semibold'>
          ${discount_price}
        </div>
        <div className='flex flex-col sm:flex-row gap-2'>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                {isLoading ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  <Button
                    onClick={handleRemoveButton}
                    variant='destructive'
                    className='text-xl'
                  >
                    <IoIosRemoveCircle />
                  </Button>
                )}
              </TooltipTrigger>
              <TooltipContent>
                {isLocaleBengali
                  ? 'ইচ্ছা তালিকা থেকে সরান'
                  : 'Remove from wishlist'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AddToCartHoverMenu
            userId={userId}
            hasStock={hasStock}
            product={product}
            isLocaleBengali={isLocaleBengali}
          />
        </div>
      </CardContent>
    </Card>
  )
}
export default WishlistItem
