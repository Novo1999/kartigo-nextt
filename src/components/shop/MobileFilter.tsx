import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { BsFilterLeft } from 'react-icons/bs'
import { Badge } from '../ui/badge'
import Sidebar from './Sidebar'
import SidebarWrapper from './SidebarWrapper'

const MobileFilter = ({ lang }: ILang) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Badge className='flex gap-2 items-center p-2 w-24 lg:hidden'>
          <BsFilterLeft className='text-xl' /> Filter
        </Badge>
      </SheetTrigger>
      <SheetContent side='left' className='z-[9999]'>
        <SheetHeader>
          <SheetTitle>Filter Items</SheetTitle>
          <SidebarWrapper>
            <Sidebar lang={lang} />
          </SidebarWrapper>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
export default MobileFilter
