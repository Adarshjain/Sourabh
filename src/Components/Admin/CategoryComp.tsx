import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {Category as CategoryInterface, CategoryInput, GQLInput} from "../../types";
import Category from "../Common/Category";
import AdminLoading from "./AdminLoading";
import AdminError from "./AdminError";
import {FETCH_CATEGORIES, UPDATE_CATEGORY} from "../../Network/schemaFormats";
import AddCategory from "./AddCategory";
import {Text} from "@ui-kitten/components";

export default function CategoryComp() {

    const {loading, error, data} = useQuery<{ categories: CategoryInterface[] }>(FETCH_CATEGORIES);
    const [updateCategory] = useMutation<{ updateCategory: CategoryInterface }, GQLInput<CategoryInput>>(UPDATE_CATEGORY);
    // let categories: CategoryInterface[] = [];
    const [categories, updateCategories] = useState<CategoryInterface[]>([])
    useEffect(() => {
        if (data && data.categories) {
            updateCategories(data.categories);
        }
    }, [data])
    if (loading) {
        return <AdminLoading/>
    }
    if (error) {
        return <AdminError/>
    }

    async function onCategoryAdd({name, orderOfDisplay, file}) {
        let category = await updateCategory({
            variables: {
                input: {
                    name,
                    orderOfDisplay,
                    imageUrl: file.name
                }
            }
        });
        if (category.data !== undefined && category.data.updateCategory !== undefined) {
            updateCategories(categories => [...categories, category.data!.updateCategory])
        }
    }

    return (
        <View>
            <View style={styles.header}>
                <Text category="h5">Category</Text>
                <AddCategory onPrimaryAction={onCategoryAdd}/>
            </View>
            <View style={styles.cardsContainer}>
                {
                    categories.map(category =>
                        <Category {...category} key={category.id} disabled={true}/>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardsContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    header: {
        paddingVertical: 8,
        paddingHorizontal: 42,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        //@ts-ignore
        position: "sticky",
        top: 0,
        zIndex: 10,
        borderBottomColor: 'rgb(207, 212, 222)',
        borderBottomWidth: 2,
        backgroundColor: "#FFF"
    },
    card: {
        width: 280,
        margin: 16,
    },
    cardImage: {
        height: 320,
    }
})