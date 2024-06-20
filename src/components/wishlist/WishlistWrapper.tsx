const WishlistWrapper = ({ children }: WrapperChild) => {
  return (
    <div className='gap-6 pt-4 pb-16 min-h-[40vh] dark:bg-slate-800 dark:*:text-white mx-auto'>
      {children}
    </div>
  )
}
export default WishlistWrapper
