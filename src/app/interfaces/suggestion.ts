import { BaseModel } from "./baseModel";

export interface Suggestion extends BaseModel {
    email: string;
    city?: string;
    culturalCenter?: string;
    art?: string;
}