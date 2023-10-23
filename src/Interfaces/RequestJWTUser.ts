import { Request } from "@nestjs/common";


type User = {
    username:string,
    id:number
}

export interface RequestJWTUser extends Request {
    user: User,
    cookies: Object,
}