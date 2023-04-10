import { Exclude } from "class-transformer";

export interface UserAuth{
    id: number;
    username: string;
    password: string;
}

export class SerializedUser{
    id: number;
    username: string;

    @Exclude()
    password: string;

    constructor(partial: Partial<SerializedUser>){ //para poder llamar al serialized user en el controller
       Object.assign(this, partial) 
    }
}