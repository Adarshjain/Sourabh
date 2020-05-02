import {gql} from "apollo-boost";

export const FETCH_CATEGORIES = gql`
    {
        categories {
            id
            name
            imageUrl
            orderOfDisplay
        }
    }
`;

export const UPDATE_CATEGORY = gql`
    mutation updateCategory($input: CategoryInput){
        updateCategory(input: $input) {
            id
            imageUrl
            name
            orderOfDisplay
        }
    }
`;

export const DELETE_CATEGORY = gql`
    mutation deleteCategory($input: String!){
        deleteCategory(id: $input)
    }
`;

export const FETCH_SECOND_CATEGORIES = gql`
    {
        secondCategories {
            id
            name
            imageUrl
            orderOfDisplay
            category {
                id
                name
            }
        }
    }
`;

export const UPDATE_SECOND_CATEGORY = gql`
    mutation updateSecondCategory($input: SecondCategoryInput){
        updateSecondCategory(input: $input) {
            id
            imageUrl
            name
            orderOfDisplay
        }
    }
`;

export const DELETE_SECOND_CATEGORY = gql`
    mutation deleteSecondCategory($input: String!){
        deleteSecondCategory(id: $input)
    }
`;