import { IShoppingProducts } from "@Interfaces/IShopping";

export const shoppingProducts: IShoppingProducts[] = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    color: 'Salmon',
    price: 90,
    quantity: 1,
    size: 'M',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    color: 'Blue',
    price: 32.00,
    quantity: 2,
    size: 'M',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
]