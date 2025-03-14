'use client'
import { ChevronDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';

/* Components */
import { Pagination } from '@/app/components/index';

/* Constants */
import { 
  DashboardProducts, 
  filters, 
  sortOptions,
} from '@/app/constants/Dashboard/Dashboard';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-5 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Nuestros Productos</h1>

            {/* Filter Button */}
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Filtrar
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    { sortOptions.map((option) => (
                      <MenuItem key={ option.name }>
                        <a
                          href={ option.href }
                          className={classNames(
                            option.current ? 
                            'font-medium text-gray-900' : 'text-gray-500',
                            'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                          )}
                        >
                          { option.name }
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="text-gray-600">Categorias</h3>
                
                { filters.map((section) => (
                  <Disclosure key={ section.id } as="div" className="border-b border-gray-200 py-6" defaultOpen={true}>
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{ section.name }</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>

                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        { section.options.map((option, optionIdx) => (
                          <div key={ option.value } className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={ option.value }
                                  defaultChecked={ option.checked }
                                  id={`filter-${ section.id }-${ optionIdx }`}
                                  name={`${ section.id }[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 
                                  bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 
                                  indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 
                                  focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 
                                  disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />

                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>

                            <label htmlFor={`filter-${ section.id }-${ optionIdx }`} className="text-sm text-gray-600">
                              { option.label }
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Product Grid */}
              <div className="lg:col-span-3">
                <div className="bg-white">
                  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                      { DashboardProducts.map((product) => (
                        <div key={ product.id } className="group relative">
                          <Image
                            alt={ product.imageAlt }
                            src={ product.imageSrc }
                            className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                            width={100}
                            height={100}
                          />

                          <div className="mt-4 flex justify-between">
                            <div>
                              <h3 className="text-sm text-gray-700">
                                <a href={ product.href }>
                                  <span aria-hidden="true" className="absolute inset-0" />
                                  { product.name }
                                </a>
                              </h3>

                              <p className="mt-1 text-sm text-gray-500">{ product.color }</p>
                            </div>

                            <p className="text-sm font-medium text-gray-900">{ product.price }</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Pagination />
          </section>
        </main>
      </div>
    </div>
  )
}
