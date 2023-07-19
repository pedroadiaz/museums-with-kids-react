export interface BaseModel {
    id: string;
    active: boolean;
    story?: string;
    imageLocation?: string;
    createdDate: Date;
}