import {gql} from "apollo-boost";

export const FETCH_CATEGORIES = gql`
    {
        categoriesOne {
            id
            name
            imageUrl
            orderOfDisplay
        }
    }
`;

export const UPDATE_CATEGORY = gql`
    mutation updateCategory(
        $id:String
        $name: String!
        $imageUrl: String!
        $orderOfDisplay: Int!
    ){
        updateCategoryOne(
            id: $id
            name: $name
            imageUrl: $imageUrl
            orderOfDisplay: $orderOfDisplay
        ) {
            id
            imageUrl
            name
            orderOfDisplay
        }
    }
`;

export const DELETE_CATEGORY = gql`
    mutation deleteCategory($input: String!){
        deleteCategoryOne(categoryOneId: $input)
    }
`;

export const FETCH_SECOND_CATEGORIES = gql`
    {
        categoriesTwo {
            id
            name
            imageUrl
            orderOfDisplay
            categoryOne {
                id
                name
            }
        }
    }
`;

export const UPDATE_SECOND_CATEGORY = gql`
    mutation updateSecondCategory(
        $id:String
        $name: String!
        $imageUrl: String!
        $orderOfDisplay: Int!
        $categoryOneId: String!
    ){
        updateCategoryTwo(
            id: $id
            name: $name
            imageUrl: $imageUrl
            orderOfDisplay: $orderOfDisplay
            categoryOneId: $categoryOneId
        ) {
            id
            imageUrl
            name
            orderOfDisplay
        }
    }
`;

export const DELETE_SECOND_CATEGORY = gql`
    mutation deleteSecondCategory($input: String!){
        deleteCategoryTwo(categoryTwoId: $input)
    }
`;


export const FETCH_PRODUCTS = gql`
    {
        allProducts{
            name
            categoryOne{
                id
                name
                imageUrl
                orderOfDisplay
            }
            categoryTwo{
                id
                name
                imageUrl
                orderOfDisplay
                categoryOne{
                    id
                    name
                    imageUrl
                    orderOfDisplay
                }
            }
            price
            favorite
            images
            weight
            purity
            gender
            size
            isOnDiscount
            isHallmark
            isHidden
        }
    }
`;

export const UPDATE_PRODUCT = gql`
    mutation updateCategory(
        $id:String
        $name: String!
        $imageUrl: String!
        $orderOfDisplay: Int!
    ){
        updateCategoryOne(
            id: $id
            name: $name
            imageUrl: $imageUrl
            orderOfDisplay: $orderOfDisplay
        ) {
            id
            imageUrl
            name
            orderOfDisplay
        }
    }
`;

export const DELETE_PRODUCT = gql`
    mutation deleteCategory($input: String!){
        deleteCategoryOne(categoryOneId: $input)
    }
`;