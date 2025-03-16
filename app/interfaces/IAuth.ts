
export interface IAuthLoginUser {
    username: string;
    password: string;
}

export interface IAuthRegisterUser extends IAuthLoginUser {
    id: number;
    username: string;
}

export interface IAuthMessageResponse {
    message: string;
    severity: "success" | "error" | "warning" | "info";
}