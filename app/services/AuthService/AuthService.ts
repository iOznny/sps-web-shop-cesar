import axios, { AxiosError } from 'axios';

/* Interfaces */
import { 
    IAuthLoginUser, 
    IAuthRegisterUser 
} from "@Interfaces/IAuth";

const ErrorMessages = {
    errorInRegister: "Error en el registro.",
    tryAgain: "Ocurrio une error inesperado, por favor intente nuevamente.",
}

const AuthService = {
    setInformation: (request: IAuthLoginUser | IAuthRegisterUser) => localStorage.setItem('user', JSON.stringify(request)),
    login: async (request: IAuthLoginUser) => {
        /* try {
            const response = await axios.post(`${ process.env.REACT_APP_URL }/auth/login`, JSON.stringify(request));

            console.log(response);
            // AuthService.setInformation(request);
            
            if (response.status !== 200) {
                throw new Error(ErrorMessages.errorInRegister);
            }
            
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw error.message;
            }

            throw ErrorMessages.tryAgain;
        } */
    },
    register: async (request: IAuthRegisterUser) => {
        try {
            const response = await axios.post(`${ process.env.REACT_APP_URL }/users`, JSON.stringify(request));
            AuthService.setInformation(request);
            
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