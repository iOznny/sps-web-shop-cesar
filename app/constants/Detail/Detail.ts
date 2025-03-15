import { 
  IDetailSizes,
  IDetailColors,
  IDetailImages,
  IDetailProduct,
  IDetailBreadcrumb,
  IDetailProductReview,
} from "@Interfaces/IDetail";

const breadcrumbs: IDetailBreadcrumb[] = [
  { id: 1, name: 'Hombre', href: '#' },
  { id: 2, name: 'Ropa', href: '#' },
];

const images: IDetailImages[] = [
  {
    src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
    alt: 'Two each of gray, white, and black shirts laying flat.',
  },
  {
    src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
    alt: 'Model wearing plain black basic tee.',
  },
  {
    src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
    alt: 'Model wearing plain gray basic tee.',
  },
  {
    src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
    alt: 'Model wearing plain white basic tee.',
  }
];

const colors: IDetailColors[] = [
  { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
  { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
  { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
];

const sizes: IDetailSizes[] = [
  { name: 'XXS', inStock: false },
  { name: 'XS', inStock: true },
  { name: 'S', inStock: true },
  { name: 'M', inStock: true },
  { name: 'L', inStock: true },
  { name: 'XL', inStock: true },
  { name: '2XL', inStock: true },
  { name: '3XL', inStock: true },
];

const highlights: string[] = [
  'Hand cut and sewn locally',
  'Dyed with our proprietary colors',
  'Pre-washed & pre-shrunk',
  'Ultra-soft 100% cotton',
];

export const detailProduct: IDetailProduct = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs,
  images,
  colors,
  sizes,
  description: 'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights,
  details: 'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}

export const detailProductReviews: IDetailProductReview = { 
  href: '#', 
  average: 4, 
  totalCount: 117
};