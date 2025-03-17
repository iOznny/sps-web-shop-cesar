'use client';
import { StarIcon } from '@heroicons/react/20/solid'

/* Interfaces */
import { IShoppingProducts } from "@Interfaces/IShopping";

/* Utils */
import { RouteNavigatorNavbar } from "@Utils/router";

/* Hooks */
import { useClassNames } from "@Hooks/index";

interface Props {
    products: IShoppingProducts[]
}

const ProductItem = ({ products }: Props) => {
    const classNames = useClassNames();

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        { products.map((product) => (
                            <a key={ product.id } className="group" href={`${ RouteNavigatorNavbar.detail }/${ product.id }`}>
                                <img
                                    alt={ product.description }
                                    src={ product.image }
                                    className="aspect-square w-full rounded-lg object-contain group-hover:opacity-75 xl:aspect-7/8"
                                />

                                <h3 className="mt-4 text-sm text-gray-700">{ product.title }</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">${ product.price.toFixed(2) }</p>

                                <div className="flex items-center">
                                    { [0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={ rating }
                                            aria-hidden="true"
                                            className={ classNames(Number(product?.rating.rate) > rating ? 'text-gray-700' : 'text-gray-300', 'size-3') }
                                        />
                                    ))}
                                </div>

                                <p className="text-sm text-right font-medium cursor-pointer text-red-400 hover:text-red-800">Ver más</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductItem;