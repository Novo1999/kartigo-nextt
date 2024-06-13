import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Product from '../product/Product'

const NewArrivalProducts = ({
  products,
  lang,
}: {
  products: IProduct[]
  lang: ILang['lang']
}) => {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className='w-full'
    >
      <CarouselContent className='flex'>
        {products.map((product) => (
          <CarouselItem key={product._id} className='md:basis-1/2 lg:basis-1/3'>
            <Card>
              <CardContent className='flex aspect-square items-center justify-center p-2'>
                <Product lang={lang} product={product} key={product._id} />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
export default NewArrivalProducts
