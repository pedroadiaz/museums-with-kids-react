import { BaseModel } from "./baseModel";

export interface CulturalCenter extends BaseModel {
    name: string;
    cityId: string;
    type: "Museum" | "Place of Worship" | "Palace" | "House" | "Other";
    imageLocation: string;
    story: string;
    sensitive: boolean;
}
