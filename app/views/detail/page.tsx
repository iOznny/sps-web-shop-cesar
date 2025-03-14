'use client'

import { Radio, RadioGroup } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

/* Components */
import { Breadcrumb } from '@/app/components/index';

/* Constants */
import { DetailProduct, DetailProductReviews } from '@/app/constants/Detail/Detail'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Detail() {

  const [selectedColor, setSelectedColor] = useState(DetailProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState(DetailProduct.sizes[3]);

  return (
    <div className="bg-white">
      <div className="pt-6">

        {/* Breadcrumb */}
        <Breadcrumb 
          breadcrumbs={ DetailProduct.breadcrumbs }
          name={ DetailProduct.name }
          href={ DetailProduct.href }
        />

        {/* Image Gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <img
            alt={ DetailProduct.images[0].alt }
            src={ DetailProduct.images[0].src }
            className="hidden size-full rounded-lg object-cover lg:block"
          />

          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <img
              alt={ DetailProduct.images[1].alt }
              src={ DetailProduct.images[1].src }
              className="aspect-3/2 w-full rounded-lg object-cover"
            />

            <img
              alt={ DetailProduct.images[2].alt }
              src={ DetailProduct.images[2].src }
              className="aspect-3/2 w-full rounded-lg object-cover"
            />
          </div>
          
          <img
            alt={ DetailProduct.images[3].alt }
            src={ DetailProduct.images[3].src }
            className="aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-auto"
          />
        </div>

        {/* Product Info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{ DetailProduct.name }</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h3 className="text-sm font-medium text-gray-900">Precio</h3>
            <p className="text-3xl tracking-tight text-gray-900">{ DetailProduct.price }</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>

              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={ rating }
                      aria-hidden="true"
                      className={classNames(
                        DetailProductReviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'size-5 shrink-0',
                      )}
                    />
                  ))}
                </div>

                <p className="sr-only">{ DetailProductReviews.average } out of 5 stars</p>
                <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  { DetailProductReviews.totalCount } reviews
                </p>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Colores</h3>

                <fieldset aria-label="Choose a color" className="mt-4">
                  <RadioGroup value={ selectedColor } onChange={ setSelectedColor } className="flex items-center gap-x-3">
                    { DetailProduct.colors.map((color) => (
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
                    {DetailProduct.sizes.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={classNames(
                          size.inStock
                            ? 'cursor-pointer bg-white text-gray-900 shadow-xs'
                            : 'cursor-not-allowed bg-gray-50 text-gray-200',
                          'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-hidden data-focus:ring-2 data-focus:ring-indigo-500 sm:flex-1 sm:py-6',
                        )}
                      >
                        <span>{size.name}</span>
                        {size.inStock ? (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-checked:border-indigo-500 group-data-focus:border"
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
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
              >
                Añadir al carrito
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{ DetailProduct.description }</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Caracteristicas</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  { DetailProduct.highlights.map((highlight: string) => (
                    <li key={ highlight } className="text-gray-400">
                      <span className="text-gray-600">{ highlight }</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Detalles</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{ DetailProduct.details }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
