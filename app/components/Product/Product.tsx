'use client';
import { StarIcon } from '@heroicons/react/20/solid'
import Image from "next/image";
import Link from "next/link";

/* Interfaces */
import { IShoppingProducts } from "@Interfaces/IShopping";

/* Utils */
import { RouteNavigatorNavbar } from "@Utils/router";

/* Hooks */
import { useClassNames } from "@Hooks/index";

interface Props {
    product: IShoppingProducts
}

const ProductItem = ({ product }: Props) => {
    const classNames = useClassNames();

    return (
        <div className="group relative h-100">
            <Image
                src={ product.image }
                alt={ product.description }
                width={100}
                height={100}
                className="aspect-square w-full rounded-md object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80"
            />

            <div className="mt-5 mb-3">
                <h3 className="text-sm text-gray-700">{ product.title.slice(0, 45) }...</h3>
            </div>

           <div className="flex items-center">
                <div className="flex items-center">
                    { [0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                        key={ rating }
                        aria-hidden="true"
                        className={classNames(
                            Number(product?.rating.rate) > rating ? 'text-gray-700' : 'text-gray-300', 'size-3')}
                    />
                    ))}
                </div>
            </div>

            <div className="flex items-center">
            </div>

            <div className="flex justify-between">
                <p className="text-sm font-bold text-gray-900">${ product.price.toFixed(2) }</p>
                <p className="text-sm text-right font-medium cursor-pointer text-red-400 hover:text-red-800">
                    <Link href={`${ RouteNavigatorNavbar.detail }/${ product.id }`}>Ver más</Link>
                </p>
            </div>
        </div>
    )
}

export default ProductItem;