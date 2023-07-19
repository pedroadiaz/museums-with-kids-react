import { BaseModel } from "./baseModel";

export interface IUser {
    id: string;
    active: boolean;
    email?: string;
    firstName?: string;
    lastName?: string;
    paid: boolean;
    nextPayDate?: Date;
    isAdmin: boolean;
    createdDate: Date;
}