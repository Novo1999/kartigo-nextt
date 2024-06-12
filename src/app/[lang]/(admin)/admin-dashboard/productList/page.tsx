import { AddProductDialog } from '@/components/admin/AddProductForm'
import AdminSearch from '@/components/admin/AdminSearch'
import LinkButtons from '@/components/admin/LinkButtons'
import ProductList from '@/components/admin/ProductList'
import revokeUserInAdminPanel from '@/utils/revokeUserInAdminPanel'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import { getDictionary } from '../../../dictionaries'

const ProductListPage = async ({
  params: { lang },
  searchParams: { query, limit },
}: {
  params: { lang: ILang['lang'] }
  searchParams: { query: string; limit: number }
}) => {
  await revokeUserInAdminPanel()
  const {
    adminPage: { price_chart, product_list },
  } = await getDictionary(lang)

  return (
    <main className='min-h-[50vh] mt-12 mb-6 mx-2 sm:mx-6 lg:mx-12 xl:mx-20 2xl:mx-60'>
      <LinkButtons
        priceChartLocale={price_chart}
        productListLocale={product_list}
        lang={lang}
      />
      <AddProductDialog />
      <div className='flex flex-col sm:flex-row justify-between'>
        <h2 className='my-6 text-xl'>{product_list}</h2>
        <AdminSearch />
      </div>
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
        <Suspense
          key={query}
          fallback={<Loader2 className='animate-spin mx-auto' />}
        >
          <ProductList limit={limit} lang={lang} query={query} />
        </Suspense>
      </section>
    </main>
  )
}

export default ProductListPage
