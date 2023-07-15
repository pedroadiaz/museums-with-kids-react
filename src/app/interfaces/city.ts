import { BaseModel } from "./baseModel";

export interface City extends BaseModel {
    city: string;
    country: string;
    description?: string;
}