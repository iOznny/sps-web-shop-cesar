/* Constants */
import { MessagesServices } from '@/app/constants/Service/Service';

import axios, { AxiosError } from 'axios';

const API_URL = process.env.REACT_APP_URL;

const ProductService = {
    getProductsByOffset: async () => {
        try {
            const response = await axios.get(`${ API_URL }/products`);
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw error.message;
            }

            throw MessagesServices.tryAgain;
        }
    }
}

export default ProductService;