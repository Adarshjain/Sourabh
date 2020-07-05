import {CategoryOne, CategoryTwo, Misc, Product} from "./types";

export interface CategoryOneResponse {
    data: { categoriesOne: CategoryOne[] }
}

export interface CategoryTwoResponse {
    data: { categoriesTwo: CategoryTwo[] }
}

export interface AllProductResponse {
    data: { allProducts: Product[] }
}

export interface MiscResponse {
    data: { findMisc: Misc }
}

export interface MISC {
    BANNER_IMAGES?: string
}

export const BANNER_IMAGES = "BANNER_IMAGES";