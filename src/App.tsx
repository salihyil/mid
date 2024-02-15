import SidebarMenu from "@/components/SideBar/Menu"
import type { MenuItem } from "@/types"
import { RiHomeLine, RiSunFill, RiSunLine } from "@remixicon/react"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { Dashboard } from "./features/dashboard/Dashboard"
import { dashboardActions, dashboardSelectors } from "./features/dashboard/dashboardSlice"
import { useInterval } from "./hooks/useInterval"

const App = () => {
  const dispatch = useAppDispatch()
  const selectedCoin = useAppSelector(dashboardSelectors.selectCoin)
  const [darkMode, setDarkMode] = useState(false)
  const menu: MenuItem[] = [
    {
      icon: <RiHomeLine />,
      path: "/",
      title: "Dashboard",
    },
  ]

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  useInterval(() => {
    dispatch(dashboardActions.getCoinsRequest({ id: selectedCoin }))
  }, 20000)

  return (
    <div className={`${darkMode && "dark"}`}>
      <header className="border dark:border-dark-tremor-ring">
        <div className="  mx-auto flex justify-end items-center py-8 px-8  dark:bg-dark-tremor-background ">
          <div onClick={toggleDarkMode}>{darkMode ? <RiSunFill className="text-white" /> : <RiSunLine />}</div>
        </div>
      </header>
      <div className="flex">
        <aside className=" flex-col min-h-screen p-6 overflow-hidden w-[300px] border-r dark:border-r-dark-tremor-ring lg:flex max-xl:border-none dark:bg-dark-tremor-background ">
          <div className="max-xl:hidden">
            <div className="w-full grow">
              <SidebarMenu menu={menu} />
            </div>
          </div>
        </aside>

        <Dashboard />
      </div>
    </div>
  )
}

export default App
