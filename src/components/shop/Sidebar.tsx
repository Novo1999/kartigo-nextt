import { getDictionary } from '@/app/[lang]/dictionaries'
import { getAllCategories } from '@/db/queries/product.queries'
import ColorSlider from './ColorSlider'
import ResetFilters from './ResetFilters'
import SidebarCategories from './SidebarCategories'
import SidebarPriceSize from './SidebarPriceSize'
import SidebarStockStatus from './SidebarStockStatus'

const Sidebar = async ({ lang }: ILang) => {
  const categories: ICategory[] = await getAllCategories()
  const {
    filter: { categories: localeCategories, ...rest },
  } = await getDictionary(lang)

  return (
    <div className='divide-y divide-gray-200 space-y-2'>
      <div>
        <ResetFilters />
        <h3 className='text-xl text-gray-800 dark:text-white mb-3 uppercase font-medium'>
          {localeCategories}
        </h3>
        <SidebarCategories categories={categories} localeCategories={rest} />
      </div>
      <SidebarStockStatus locale={rest} />
      <SidebarPriceSize locale={rest} />
      <ColorSlider />
    </div>
  )
}
export default Sidebar
