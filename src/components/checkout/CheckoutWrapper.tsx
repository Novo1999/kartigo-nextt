import CheckoutProvider from '@/providers/CheckoutProvider'
import ReactQueryProvider from '@/providers/QueryProvider'

const CheckoutWrapper = ({ children }: WrapperChild) => {
  return (
    <div className='container sm:grid lg:grid-cols-12 flex flex-col items-start pb-16 pt-4 gap-6 dark:bg-slate-800 dark:text-white'>
      <ReactQueryProvider>
        <CheckoutProvider>{children}</CheckoutProvider>
      </ReactQueryProvider>
    </div>
  )
}
export default CheckoutWrapper
