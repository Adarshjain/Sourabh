import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {useMutation} from "@apollo/react-hooks";
import {Category as CategoryInterface, CategoryInput, GQLInput} from "../../types";
import Category from "../Common/Category";
import {FETCH_CATEGORIES, UPDATE_CATEGORY} from "../../Network/schemaFormats";
import CategoryCRUD from "./CategoryCRUD";
import {Button, Text} from "@ui-kitten/components";
import GqlQueryWrapper from "../Common/GqlQueryWrapper";

interface CategoryResponse {
    data: { categories: CategoryInterface[] }
}

export default GqlQueryWrapper(CategoryComp, FETCH_CATEGORIES);

function CategoryComp({data: {categories}}: CategoryResponse) {
    const [visible, setVisible] = React.useState(false);
    const [updateCategory] = useMutation<{ updateCategory: CategoryInterface }, GQLInput<CategoryInput>>(UPDATE_CATEGORY);
    const [internalCategories, updateCategories] = useState<CategoryInterface[]>(categories || []);

    async function onCategoryAdd({name, orderOfDisplay, file}) {
        setVisible(false);
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
                <Button size="medium" onPress={() => setVisible(true)}>Add Category</Button>
                {
                    visible &&
                    <CategoryCRUD onSecondaryAction={() => setVisible(false)} onPrimaryAction={onCategoryAdd}/>
                }
            </View>
            <View style={styles.cardsContainer}>
                {
                    internalCategories.map(category =>
                        <View>
                            <Category {...category} key={category.id} disabled={true}/>
                            <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                                <Button size="small" status="basic" onPress={() => setVisible(true)}>Edit</Button>
                                <Button size="small" status="basic" onPress={() => setVisible(true)}>Delete</Button>
                            </View>
                        </View>
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