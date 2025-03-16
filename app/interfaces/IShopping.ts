/* id: number;
title: string;
color: string;
price: number;
size: string;
quantity: number;
imageSrc: string;
imageAlt: string; */

export interface IShoppingProducts {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: IShoppingRating;

}
export interface IShoppingRating {
    rate: number;
    count: number;
}