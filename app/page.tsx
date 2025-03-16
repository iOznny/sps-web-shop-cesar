'use client'
import { ChevronDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';

/* Constants */
import {
  dashboardFilters, 
  dashboardSortOptions,
} from '@/app/constants/Dashboard/Dashboard';
import { shoppingProducts } from '@/app/constants/Shopping/Shopping';

/* Components */
import { Pagination, ProductItem } from '@Components/index';

/* Hooks */
import { useClassNames } from '@Hooks/index';

/* Services */
import { ProductService } from './services';

import { IShoppingProducts } from './interfaces/IShopping';

export default function Dashboard() {
  const classNames = useClassNames();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState<IShoppingProducts[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<IShoppingProducts[]>([]); 

  const getProducts = async () => {
    await ProductService.getProductsByOffset().then((response) => {
      const nextProducts = response.slice(currentIndex, currentIndex + 5); 
      setProducts(response);
      setVisibleProducts(nextProducts);
    });
  }

  const loadMoreProducts = () => {
    const nextProducts = products.slice(currentIndex, currentIndex + 5); 
    setVisibleProducts([...visibleProducts, ...nextProducts]);
    setCurrentIndex(currentIndex + 5);
  };

  useEffect(() => {
    getProducts();
    loadMoreProducts();
  }, []);

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filter Top */}
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-5 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Nuestros Productos</h1>

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
                  { dashboardSortOptions.map((option) => (
                    <MenuItem key={ option.name }>
                      <a
                        href={ option.href }
                        className={ classNames(
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

        {/* Filters & Products */}
        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <form className="hidden lg:block">
              <h3 className="text-gray-600">Categorias</h3>
              
              { dashboardFilters.map((section) => (
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
                                bg-white checked:border-red-500 checked:bg-red-500 indeterminate:border-red-500 
                                indeterminate:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 
                                focus-visible:outline-red-500 disabled:border-gray-300 disabled:bg-gray-100 
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
                    { visibleProducts.map((product, index) => (
                      <ProductItem product={ product } key={ index } />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Load More Items */}
        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <button onClick={ () => loadMoreProducts() } className="mb-10 rounded-md border border-red-500 bg-white py-2 text-sm text-black hover:bg-red-100 cursor-pointer ">
              Ver más articulos
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
