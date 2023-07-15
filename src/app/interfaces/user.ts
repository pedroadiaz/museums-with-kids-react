import { BaseModel } from "./baseModel";

export interface IUser extends BaseModel {
    email: string;
    firstName: string;
    lastName: string;
    paid: boolean;
    nextPayDate: Date;
}