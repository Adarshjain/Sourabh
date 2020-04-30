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

export const UPDATE_CATEGORY = gql `
    mutation updateCategory($input: CategoryInput){
        updateCategory(input: $input) {
            id
            imageUrl
            name
            orderOfDisplay
        }
    }
`;
export const DELETE_CATEGORY = gql `
    mutation deleteCategory($input: String!){
        deleteCategory(id: $input)
    }
`;