'use client'
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import { useEffect, useRef, useState } from 'react'

import { useParams } from 'next/navigation'

/* Constants */
import { shoppingProducts } from '@/app/constants/Shopping/Shopping'
import { detailProduct } from '@/app/constants/Detail/Detail'

/* Hooks */
import { useCart, useClassNames } from '@Hooks/index';

/* Components */
import { SnackbarAlert } from '@Components/index'

/* Services */
import { ProductService } from '@Services/index'

/* Interfaces */
import { IShoppingProducts } from '@Interfaces/IShopping'

export default function Detail() {
  const params = useParams();
  const { addToCart } = useCart();
  const hasFetched = useRef(false);
  const classNames = useClassNames();
  
  const [product, setProduct] = useState<IShoppingProducts>();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [selectedColor, setSelectedColor] = useState(detailProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState(detailProduct.sizes[3]);

  useEffect(() => {
    ProductService.getProductById(Number(params.id)).then((response) => {
      setProduct(response);
    });
    hasFetched.current = true;
  }, [params.id]);

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li className="text-sm  text-gray-500">
            #{ product?.id } - { product?.category }
            </li>
          </ol>
        </nav>

        {/* Image Gallery */}
        <div className="mx-auto mt-6 max-w-2xl lg:grid lg:grid-cols-2">
          <img
            alt={ product?.title }
            src={ product?.image }
            className="aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-auto"
          />
        </div>

        {/* Product Info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{ product?.title }</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h3 className="text-sm font-medium text-gray-900">Precio</h3>
            <p className="text-3xl tracking-tight text-gray-900">${ product?.price }</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>

              <div className="flex items-center">
                <div className="flex items-center">
                  { [0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={ rating }
                      aria-hidden="true"
                      className={classNames(
                        Number(product?.rating.rate) > rating ? 'text-gray-900' : 'text-gray-200',
                        'size-5 shrink-0',
                      )}
                    />
                  ))}
                </div>

                <p className="sr-only">{ product?.rating.rate } out of 5 stars</p>
                <p className="ml-3 text-sm font-medium text-red-600">
                  { product?.rating.count } opiniones
                </p>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Colores</h3>

                <fieldset aria-label="Choose a color" className="mt-4">
                  <RadioGroup value={ selectedColor } onChange={ setSelectedColor } className="flex items-center gap-x-3">
                    { detailProduct.colors.map((color) => (
                      <Radio
                        key={ color.name }
                        value={ color } 
                        aria-label={ color.name }
                        className={classNames(
                          color.selectedClass,
                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-hidden data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1',
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={ classNames(color.class, 'size-8 rounded-full border border-black/10') }
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Tallas</h3>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                  >
                    {detailProduct.sizes.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={classNames(
                          size.inStock ? 
                          'cursor-pointer bg-white text-gray-900 shadow-xs' : 
                          'cursor-not-allowed bg-gray-50 text-gray-200',
                          'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-hidden data-focus:ring-2 data-focus:ring-indigo-500 sm:flex-1 sm:py-6',
                        )}
                      >
                        <span>{size.name}</span>
                        { size.inStock ? (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-checked:border-red-500 group-data-focus:border"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              stroke="currentColor"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              className="absolute inset-0 size-full stroke-2 text-gray-200"
                            >
                              <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                            </svg>
                          </span>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
              
              <button
                type="button"
                onClick={() => {
                  addToCart(product!);
                  setShowSnackbar(true);
                }}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-500 px-8 py-3 text-base font-medium text-white cursor-pointer"
              >
                Agregar {' '} <span><ShoppingCartIcon className="size-4" /></span>
              </button>

              <SnackbarAlert
                open={ showSnackbar }
                message="Producto agregado al carrito"
                severity="success"
                duration={4000}
                onClose={() => setShowSnackbar(false) }
              />
            </form>
          </div>

          {/* Description and details */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Descripci´pon</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{ product?.description }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
