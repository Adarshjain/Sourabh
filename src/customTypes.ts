import {CategoryOne, CategoryTwo} from "./types";

export interface CategoryOneResponse {
    data: { categoriesOne: CategoryOne[] }
}
export interface CategoryTwoResponse {
    data: { categoriesTwo: CategoryTwo[] }
}