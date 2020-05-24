import {CategoryOne, CategoryTwo, Product} from "./types";

export interface CategoryOneResponse {
    data: { categoriesOne: CategoryOne[] }
}

export interface CategoryTwoResponse {
    data: { categoriesTwo: CategoryTwo[] }
}

export interface AllProductResponse {
    data: { allProducts: Product[] }
}