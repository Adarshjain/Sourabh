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
        $id: ID
        $name: String!
        $image: String
        $orderOfDisplay: Int!
    ){
        updateCategoryOne(
            id: $id
            name: $name
            image: $image
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
    mutation deleteCategory($id: ID!){
        deleteCategoryOne(id: $id)
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
    mutation updateCategoryTwo(
        $id: ID
        $name: String!
        $image: String
        $orderOfDisplay: Int!
        $categoryOne: ID!
    ){
        updateCategoryTwo(
            id: $id
            name: $name
            image: $image
            orderOfDisplay: $orderOfDisplay
            categoryOne: $categoryOne
        ) {
            id
            imageUrl
            name
            orderOfDisplay
            categoryOne {
                id
                imageUrl
                name
                orderOfDisplay
            }
        }
    }
`;

export const DELETE_SECOND_CATEGORY = gql`
    mutation deleteCategoryTwo($id: ID!){
        deleteCategoryTwo(id: $id)
    }
`;

export const FETCH_PRODUCTS = gql`
    {
        allProducts{
            id
            name
            description
            categoryOne{
                id
                imageUrl
                name
                orderOfDisplay
            }
            categoryTwo{
                id
                imageUrl
                name
                orderOfDisplay
                categoryOne{
                    id
                    imageUrl
                    name
                    orderOfDisplay
                }
            }
            price
            favorite
            weight
            purity
            gender
            size
            isOnDiscount
            isHallmark
            isHidden
            isFeatured
            isTrending
            images
        }
    }
`;

export const UPDATE_PRODUCT = gql`
    mutation updateProduct(
        $id: ID
        $description: String
        $name: String!
        $categoryOne: ID!
        $categoryTwo: ID!
        $price: Float
        $favorite: Boolean
        $images: [String]
        $weight: String
        $purity: String
        $gender: String
        $size: String
        $isOnDiscount: Boolean
        $isHallmark: Boolean
        $isFeatured: Boolean
        $isTrending: Boolean
        $isHidden: Boolean
    ){
        updateProduct(
            id: $id
            description: $description
            name: $name
            categoryOne: $categoryOne
            categoryTwo: $categoryTwo
            price: $price
            favorite: $favorite
            images: $images
            weight: $weight
            purity: $purity
            gender: $gender
            size: $size
            isOnDiscount: $isOnDiscount
            isHallmark: $isHallmark
            isTrending: $isTrending
            isFeatured: $isFeatured
            isHidden: $isHidden
        ) {
            id
            name
            description
            images
            categoryOne{
                id
                imageUrl
                name
                orderOfDisplay
            }
            categoryTwo{
                id
                imageUrl
                name
                orderOfDisplay
                categoryOne{
                    id
                    imageUrl
                    name
                    orderOfDisplay
                }
            }
            price
            favorite
            weight
            purity
            gender
            size
            isOnDiscount
            isHallmark
            isHidden
            isFeatured
            isTrending
        }
    }
`;

export const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: ID!){
        deleteProduct(id: $id)
    }
`;

export const FETCH_MISC = gql`
    query findMisc($key:[ID]!){
        findMisc(key: $key){
            value
        }
    }
`;

export const UPDATE_MISC = gql`
    mutation updateMisc($key: String!, $value: String!){
        updateMisc(
            key: $key
            value: $value
        ) {
            value
        }
    }
`;

export const LOGIN = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
        }
    }
`;

export const UPDATE_PASSWORD = gql`
    mutation updatePassword($email: String!, $password: String!){
        updatePassword(email: $email, password: $password)
    }
`;
