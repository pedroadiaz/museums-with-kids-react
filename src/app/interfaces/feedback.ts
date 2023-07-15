import { BaseModel } from "./baseModel";

export interface Feedback extends BaseModel {
    email: string;
    feedback: string;
}