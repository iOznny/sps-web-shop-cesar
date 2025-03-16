import axios, { AxiosError } from 'axios';

/* Interfaces */
import { 
    IAuthLoginUser, 
    IAuthRegisterUser 
} from "@Interfaces/IAuth";

import { MessagesServices } from '@/app/constants/Service/Service';

const headers = {
    "Content-Type": "application/json"
}

const API_URL = process.env.REACT_APP_URL;

const AuthService = {
    setInformation: (key: string, request: any) => localStorage.setItem(key, JSON.stringify(request)),
    login: async (request: IAuthLoginUser) => {
        try {
            const response = await axios.post(`${ API_URL }/auth/login`, JSON.stringify(request), {
                headers
            });

            AuthService.setInformation('token', response.data.token);
            AuthService.setInformation('user', request.username);
            
            if (response.status !== 200) {
                throw new Error(MessagesServices.errorInLogin);
            }
            
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw error.message;
            }

            throw MessagesServices.tryAgain;
        }
    },
    register: async (request: IAuthRegisterUser) => {
        try {
            const response = await axios.post(`${ API_URL }/users`, JSON.stringify(request), {
                headers
            });

            AuthService.setInformation('user', request.username);
            
            if (response.status !== 200) {
                throw new Error(MessagesServices.errorInRegister);
            }
            
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw error.message;
            }

            throw MessagesServices.tryAgain;
        }
    },
    logout: () => {
        localStorage.removeItem('user');
    }
}

export default AuthService;