import type { MenuItem } from "../../App"

export default function SidebarMenu({
  menu = [],
}: Readonly<{
  menu: MenuItem[]
}>) {
  return (
    <div className="grid w-full gap-2 ">
      {menu.map((item: MenuItem, index: number) => (
        <div
          key={index}
          className={`flex items-center justify-start px-3 py-1 rounded-lg gap-2 hover:bg-gray-200 bg-gray-100 transition w-full dark:bg-dark-tremor-background dark:text-white`}
        >
          {item.icon}
          {item.title}
        </div>
      ))}
    </div>
  )
}
