import { BaseModel } from "./baseModel";

export interface Art extends BaseModel {
    culturalCenterId: string;
    name: string;
    story: string;
    imageLocation: string;
    sensitive: boolean;
}