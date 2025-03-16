import axios, { AxiosError } from 'axios';

/* Interfaces */
import { 
    IAuthLoginUser, 
    IAuthRegisterUser 
} from "@Interfaces/IAuth";

const ErrorMessages = {
    errorInRegister: "Error en el registro.",
    errorInLogin: "Error al autenticar sus datos, por favor verifiquelos.",
    tryAgain: "Ocurrio une error inesperado, por favor intente nuevamente.",
}

const headers = {
    "Content-Type": "application/json"
}

const AuthService = {
    setInformation: (key: string, request: any) => localStorage.setItem(key, JSON.stringify(request)),
    login: async (request: IAuthLoginUser) => {
        try {
            const response = await axios.post(`${ process.env.REACT_APP_URL }/auth/login`, JSON.stringify(request), {
                headers
            });

            AuthService.setInformation('token', response.data.token);
            AuthService.setInformation('user', request.username);
            
            if (response.status !== 200) {
                throw new Error(ErrorMessages.errorInLogin);
            }
            
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw error.message;
            }

            throw ErrorMessages.tryAgain;
        }
    },
    register: async (request: IAuthRegisterUser) => {
        try {
            const response = await axios.post(`${ process.env.REACT_APP_URL }/users`, JSON.stringify(request), {
                headers
            });

            AuthService.setInformation('user', request.username);
            
            if (response.status !== 200) {
                throw new Error(ErrorMessages.errorInRegister);
            }
            
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw error.message;
            }

            throw ErrorMessages.tryAgain;
        }
    },
    logout: () => {
        localStorage.removeItem('user');
    }
}

export default AuthService;