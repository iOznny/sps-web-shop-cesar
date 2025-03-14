'use client';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';

/* Next */
import Link from 'next/link';
import Image from 'next/image';

/* Interfaces */
import { INavigation } from '@/app/interfaces/INavigation';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const [navigation, setNavigation] = useState<INavigation[]>([
        { name: 'Dashboard', href: '/views/dashboard', current: true, show: true },
        { name: 'Detalles', href: '/views/detail', current: false, show: true },
        { name: 'Carrito', href: '/views/detail', current: false, show: false },
    ]);

    const setActive = (href: string) => {
        setNavigation((prevNav) =>
            prevNav.map((item) => ({
                ...item,
                current: item.href === href,
            }))
        );
    };
    
    return (
        <>
            <Disclosure as="nav" className="bg-white">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                            </DisclosureButton>
                        </div>

                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <Image
                                    src="/assets/eagle-wear.png"
                                    alt="Eagle Wear"
                                    width={ 300 }
                                    height={ 300 }
                                    className="mx-auto h-10 w-auto"
                                />
                            </div>

                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    { navigation.map((item) => (
                                        item.show ?
                                        <Link 
                                            key={ item.name } 
                                            href={ item.href }
                                            onClick={() => setActive(item.href)}
                                            className={ classNames(
                                                item.current ? 
                                                'rounded-md bg-red-100 text-black' :
                                                'text-black' ,
                                                'px-3 py-2 text-sm font-medium',
                                            )}
                                        >
                                            { item.name }
                                        </Link> : ''                                  
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button type="button" className="relative rounded-full p-1 text-gray-400  hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                <Link onClick={() => setActive('/views/shopping')} href={'/views/shopping'} className="group -m-2 flex items-center p-2" >
                                    <ShoppingBagIcon aria-hidden="true" className="size-6 shrink-0 text-grey-700 group-hover:text-black" />
                                    <span className="ml-2 text-sm font-medium text-grey-700 group-hover:text-black">0</span>
                                    <span className="sr-only">items in cart, view bag</span>
                                </Link>
                            </button>

                            {/* Profile Dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded-full bg-red-800 text-sm focus:ring-red focus:ring-1 focus:outline-hidden">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>

                                        <Image
                                            src={'/assets/profiles/profile.avif'}
                                            alt='Profile Image'
                                            width={100}
                                            height={100}
                                            className="size-8 rounded-full"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems 
                                    transition 
                                    className="
                                        absolute 
                                        right-0 
                                        z-10 
                                        mt-2 
                                        w-48 
                                        origin-top-right 
                                        rounded-md bg-white py-1 
                                        ring-1 shadow-lg ring-black/5 
                                        transition 
                                        focus:outline-hidden 
                                        data-closed:scale-95 
                                        data-closed:transform 
                                        data-closed:opacity-0 
                                        data-enter:duration-100 
                                        data-enter:ease-out 
                                        data-leave:duration-75 
                                        data-leave:ease-in"
                                    >
                                    { navigation.map((item) => (
                                        <MenuItem>
                                            <Link 
                                                key={ item.name } 
                                                href={ item.href }
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                            >
                                                { item.name }
                                            </Link>                                   
                                        </MenuItem>
                                    ))}

                                    <MenuItem>
                                        <a 
                                            href="#" 
                                            onClick={ () => {
                                                console.log("logout");
                                                /* localStorage.removeItem('token');
                                                setIsAuthenticated(false); */
                                            }}
                                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
                                            Cerrar Sesión
                                        </a>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden"> 
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        { navigation.map((item) => (
                            <DisclosureButton
                                key={ item.name }
                                as="a"
                                href={ item.href }
                                aria-current={ item.current ? 'page' : undefined }
                                className={ classNames(
                                    item.current ? 
                                    'bg-black text-white' : 
                                    'hover:bg-gray-200 hover:text-black',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                { item.name }
                            </DisclosureButton>
                        ))}
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </>
    )
}

export default Navbar;
