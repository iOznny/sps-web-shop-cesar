import Image from "next/image";
import Link from "next/link";

/* Interfaces */
import { IDashboardProducts } from "@/app/interfaces/IDashboard";

/* Utils */
import { RouteNavigatorNavbar } from "@/app/utils/router";

interface Props {
    product: IDashboardProducts
}

const ProductItem = ({ product }: Props) => {
    return (
        <div className="group relative">
            <Image
                alt={ product.imageAlt }
                src={ product.imageSrc }
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                width={100}
                height={100}
            />

            <div className="mt-4 flex justify-between">
                <h3 className="text-sm text-gray-700">{ product.name }</h3>
                <p className="mt-1 text-sm text-gray-500">{ product.color }</p>
            </div>

            <p className="text-sm font-medium text-gray-900">{ product.price }</p>
            <p className="text-sm font-medium text-right cursor-pointer text-red-400">
                <Link href={ String(RouteNavigatorNavbar.detail) }>Ver más</Link>
            </p>
        </div>
    )
}

export default ProductItem;