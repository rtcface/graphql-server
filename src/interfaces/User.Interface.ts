export interface User {
    name: string,
    lastName: string,
    email: string,
    password: string,
    createAt: Date
}

export interface Login {
    email: string,
    password: string
}

export interface Token {
    token: string
}

export interface JwtPayload{
    id:string;
}

export interface UserPass{
    id:string;
    password:string;
}