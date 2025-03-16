import axios, { AxiosError } from 'axios';
const API_URL = process.env.REACT_APP_URL;

/* Constants */
import { MessagesServices } from '@/app/constants/Service/Service';

const ProductService = {
    getProducts: async () => {
        try {
            const response = await axios.get(`${ API_URL }/products`);

            if (response.status !== 200) {
                throw new Error(MessagesServices.errorGetProducts);
            }

            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw error.message;
            }

            throw MessagesServices.tryAgain;
        }
    },
    getProductById: async (id: number) => {
        try {
            const response = await axios.get(`${ API_URL }/products/${ id }`);

            if (response.status !== 200) {
                throw new Error(MessagesServices.errorGetProductsById);
            }

            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw error.message;
            }

            throw MessagesServices.tryAgain;
        }
    },
}

export default ProductService;