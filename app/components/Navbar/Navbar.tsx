'use client';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'

/* Next */
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/navigation";

/* Utils */
import { RouteNavigatorNavbar } from '@Utils/router';

/* Services */
import { AuthService } from '@Services/index';
import { useEffect, useState } from 'react';

export default function Navbar() {    
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    const validateToken = () => {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        (token || user) ? setIsVisible(true) : setIsVisible(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            validateToken();
        }, 3000);

        return () => clearInterval(interval);
    }, []);


    return (
        <>
            <Disclosure as="nav" className={`bg-white ${ isVisible ? "show" : "hidden" }`} onBlur={() => validateToken() }>
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
                                <Link href="/">
                                    <Image    
                                        src="/assets/eagle-wear.png"
                                        alt="Eagle Wear"
                                        width={ 300 }
                                        height={ 300 }
                                        className="mx-auto h-10 w-auto"
                                    />
                                </Link>
                            </div>

                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <Link className='rounded-md hover:bg-red-100 text-black px-3 py-2 text-sm font-medium' href={ RouteNavigatorNavbar.home }>Inicio</Link>
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button type="button" className="relative rounded-full p-1 text-gray-400  hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                <Link href={ RouteNavigatorNavbar.shop } className="group -m-2 flex items-center p-2">
                                    <ShoppingBagIcon aria-hidden="true" className="size-6 shrink-0 text-grey-700 group-hover:text-black" />
                                </Link>
                            </button>

                            {/* Profile Dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <MenuButton className="relative flex rounded-full">
                                    <div className="flex -space-x-1 overflow-hidden">
                                        <Image
                                            src={'/assets/profiles/profile.avif'}
                                            alt='Profile Image'
                                            width={100}
                                            height={100}
                                            className="inline-block size-8 rounded-full ring-1 ring-white"
                                        />

                                        <Image
                                            src={'/assets/sps-logo.png'}
                                            alt='Profile Image'
                                            width={100}
                                            height={100}
                                            className="inline-block size-8 rounded-full ring-1 ring-white"
                                        />
                                    </div>
                                </MenuButton>

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

                                    { isVisible ? 
                                            <MenuItem>
                                            <a 
                                                onClick={ () => {
                                                    AuthService.logout();
                                                    router.push(RouteNavigatorNavbar.login);
                                                }}
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
                                                Cerrar Sesión
                                            </a>
                                        </MenuItem> 
                                        :
                                        <MenuItem>
                                            <a 
                                                onClick={ () => {
                                                    AuthService.logout();
                                                    router.push(RouteNavigatorNavbar.login);
                                                }}
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
                                                Iniciar Sesión
                                            </a>
                                        </MenuItem> 
                                    }
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden"> 
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <DisclosureButton
                            key={ 'Home' }
                            as="a"
                            href={ RouteNavigatorNavbar.home }
                            className={ 'bg-gray-200 text-black hover:bg-red-200 hover:text-black block rounded-md px-3 py-2 text-base font-medium'}
                        >
                            Inicio
                        </DisclosureButton>

                        <DisclosureButton
                            key={ 'Logout' }
                            as="a"
                            onClick={ () => {
                                AuthService.logout();
                                router.push(RouteNavigatorNavbar.login);
                            }}
                            className={ 'bg-gray-200 text-black hover:bg-red-200 hover:text-black block rounded-md px-3 py-2 text-base font-medium'}
                        >
                            Cerrar Sesión
                        </DisclosureButton>
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </>
    );
}