import Image from "next/image";
import Link from "next/link";

/* Interfaces */
import { IShoppingProducts } from "@Interfaces/IShopping";

/* Utils */
import { RouteNavigatorNavbar } from "@Utils/router";

interface Props {
    product: IShoppingProducts
}

const ProductItem = ({ product }: Props) => {
    return (
        <div className="group relative">
            <Image
                src={ product.image }
                alt={ product.description }
                width={250}
                height={200}
                className="hidden  object-contain lg:block"
            />

            <div className="mt-2 flex justify-between">
                <h3 className="text-sm text-gray-700">{ product.title }</h3>
            </div>

            <p className="text-sm font-medium text-gray-900">${ product.price.toFixed(2) }</p>
            <p className="text-sm font-medium text-left cursor-pointer text-red-400">
                <Link href={`${ RouteNavigatorNavbar.detail }/${ product.id }`}>Ver más {product.id}</Link>
            </p>
        </div>
    )
}

export default ProductItem;