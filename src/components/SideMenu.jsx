import { useState } from 'react';
import { Button, Drawer, Sidebar, TextInput } from 'flowbite-react';
import { HiChartPie, HiSearch, HiShoppingBag, HiCollection, HiUsers, HiClipboard, HiInformationCircle } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

export function SideMenu({ isOpen, setIsOpen }) {
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex items-center justify-center">
        <Button 
          className="w-4 h-8 bg-[var(--secondary-color)] rounded-l-full fixed left-0 top-1/4 transform -translate-y-1/2 rotate-180 z-50"
          onClick={() => setIsOpen(true)}
        ></Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose} className="w-56 h-full mt-14">
        <Drawer.Header title="WELCOME" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                {/* <form className="pb-3 md:hidden"> */}
                  {/* <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} /> */}
                {/* </form> */}
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item icon={HiChartPie}>
                      <NavLink to="/rawdata">BQ data</NavLink>
                    </Sidebar.Item>
                    <Sidebar.Item icon={HiShoppingBag}>
                      <NavLink to="/products">Products</NavLink>
                    </Sidebar.Item>
                    <Sidebar.Item icon={HiCollection}>
                      <NavLink to="/costs">Costs</NavLink>
                    </Sidebar.Item>
                    <Sidebar.Item icon={HiUsers}>
                      <NavLink to="/rules">Rules</NavLink>
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    {/* <Sidebar.Item icon={HiClipboard}>
                      <NavLink to="/about">Api Docs</NavLink>
                    </Sidebar.Item>
                    <Sidebar.Item icon={HiInformationCircle}>
                      <NavLink to="/contact">Help</NavLink>
                    </Sidebar.Item> */}
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
}

export default SideMenu;
