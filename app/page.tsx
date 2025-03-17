'use client'
import { ChevronDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

/* Components */
import { ProductItem } from '@Components/index';

/* Hooks */
import { useClassNames } from '@Hooks/index';

/* Services */
import { ProductService } from '@Services/index';

/* Interfaces */
import { IShoppingProducts } from '@Interfaces/IShopping';
import { IDashboardFilters } from '@Interfaces/IDashboard';

/* Utils */
import { RouteNavigatorNavbar } from './utils/router';

export default function Dashboard() {
  const router = useRouter();
  const classNames = useClassNames();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  /* Products */
  const [products, setProducts] = useState<IShoppingProducts[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<IShoppingProducts[]>([]); 

  /* Filters */
  const [filterCategories, setFilterCategories] = useState("all");
  const [sort, setSort] = useState("none");
  const [dashboardFilter, setDashboardFilter] = useState<IDashboardFilters[]>(dashboardFilters);
  const [categories, setCategories] = useState<string[]>([]);

  const validateToken = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    if (!token || !user) {
      router.push(RouteNavigatorNavbar.login);  
    }
  };

  const getProducts = async () => {
    await ProductService.getProducts().then((response) => {
      const products: IShoppingProducts[] = response.slice(currentIndex, currentIndex + 5); 

      setProducts(response);
      setVisibleProducts(products);
    });
  }

  const getUniqueCategories = (products: IShoppingProducts[]) => {
    const categories = [...new Set(products.map(product => product.category))];
    return categories;
  }

  const loadMoreProducts = () => {
    const nextProducts = products.slice(currentIndex, currentIndex + 5); 
    
    setVisibleProducts([...visibleProducts, ...nextProducts]);
    setCurrentIndex(currentIndex + 5);
  };

  useEffect(() => {
    const filteredProducts = visibleProducts
    .filter(product => filterCategories === "all" || product.category === filterCategories)
    .sort((a, b) => {
      if (sort === "low-to-high") return a.price - b.price;
      if (sort === "high-to-low") return b.price - a.price;
      if (sort === "best-rating") return b.rating.rate - a.rating.rate;
      return 0;
    });
  
    setVisibleProducts(filteredProducts);
  }, [filterCategories, sort])
  
  useEffect(() => {
    setCategories(getUniqueCategories(products));
  }, [visibleProducts]);

  useEffect(() => {
    getProducts();
    loadMoreProducts();
    validateToken();
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
                  Ordenar por:
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
                        onClick={() => setSort(option.value)}
                        className={ classNames(
                          'font-medium text-black block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
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
            <div className="hidden lg:block">
              {/* Categories */}
              <h3 className="text-black text-sm mb-3">Categoria</h3>
              <div>
                <select
                  id="categorySelect"
                  onChange={(e) => setFilterCategories(e.target.value)}
                  className="mt-1 block capitalize w-full p-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                >
                  { categories.map((category, index) => (
                    <option key={ index } value={ category } className='text-black capitalize'>
                      { category }
                    </option>
                  ))}
                </select>
              </div>
              
              { dashboardFilter.map((section) => (
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
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <ProductItem products={ visibleProducts } />
            </div>
          </div>
        </section>

        {/* Load More Items */}
        <div className="pb-24 text-right">
          <button 
            onClick={ () => loadMoreProducts() } 
            disabled={ visibleProducts.length >=  products.length }
            className="mb-10 rounded-md border border-red-500 bg-white px-10 py-2 text-sm text-black hover:bg-red-100 cursor-pointer disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed">
            Ver más articulos
          </button>
        </div>
      </main>
    </div>
  )
}
