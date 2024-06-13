import { ReactNode } from 'react'

const SidebarWrapper = ({
  children,
  visiblityClassNames,
}: {
  children: ReactNode
  visiblityClassNames?: string
}) => {
  return (
    <div
      className={`col-span-1 bg-white px-4 pb-6 shadow-lg rounded overflow-hidden ${visiblityClassNames} dark:bg-black dark:text-white`}
    >
      {children}
    </div>
  )
}
export default SidebarWrapper
