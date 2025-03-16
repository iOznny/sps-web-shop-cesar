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