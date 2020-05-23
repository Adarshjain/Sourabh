import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {useMutation} from "@apollo/react-hooks";
import {CategoryOne, MutationUpdateCategoryOneArgs} from "../../../types";
import Category from "../../Common/Category";
import {DELETE_CATEGORY, FETCH_CATEGORIES, UPDATE_CATEGORY} from "../../../Network/schemaFormats";
import CategoryEdit from "./CategoryEdit";
import {Button, Text} from "@ui-kitten/components";
import GqlQueryWrapper from "../../Common/GqlQueryWrapper";
import {getSplicedArray, pushToArray, replaceArrayAt} from "../../../libs/Helpers";
import ConfirmationPopup from "../../Common/ConfirmationPopup";
import {CategoryOneResponse} from "../../../customTypes";

export default GqlQueryWrapper(CategoryComp, FETCH_CATEGORIES);

function CategoryComp({data: {categoriesOne}}: CategoryOneResponse) {
    const [isEditPopupVisible, setIsEditPopupVisible] = React.useState(false);
    const [internalCategories, updateCategories] = useState<CategoryOne[]>(categoriesOne || []);
    const [currentCategory, setCurrentCategory] = useState<CategoryOne | undefined>(undefined);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [updateCategory] = useMutation<{ updateCategory: CategoryOne }, MutationUpdateCategoryOneArgs>(UPDATE_CATEGORY);
    const [deleteCategory] = useMutation<{ deleteCategory: boolean }, string>(DELETE_CATEGORY);

    async function onCategoryUpdate(tempCategory: MutationUpdateCategoryOneArgs) {
        setIsEditPopupVisible(false);
        if (!!currentCategory) {
            if (tempCategory.name === currentCategory.name
                && tempCategory.orderOfDisplay === currentCategory.orderOfDisplay
                && tempCategory.imageUrl === currentCategory.imageUrl) {
                setCurrentCategory(undefined);
                return;
            }
            tempCategory.id = currentCategory.id;
        }
        let category = await updateCategory({
            variables: tempCategory
        });
        if (category.data !== undefined && category.data.updateCategory !== undefined) {
            if (!!currentCategory) {
                let foundIndex = internalCategories.findIndex(cat => cat.id === currentCategory.id)
                updateCategories(replaceArrayAt(internalCategories, foundIndex, category.data!.updateCategory))
            } else {
                updateCategories(pushToArray(internalCategories, category.data!.updateCategory))
            }
        }
        setCurrentCategory(undefined);
    }

    function onEditAction(category: CategoryOne) {
        setCurrentCategory(category);
        setIsEditPopupVisible(true);
    }

    function onEditCancel() {
        setCurrentCategory(undefined);
        setIsEditPopupVisible(false);
    }

    async function onDeleteAction(category: CategoryOne) {
        setCurrentCategory(category);
        setShowDeleteConfirmation(true);
    }

    async function onDeleteConfirm() {
        setShowDeleteConfirmation(false);
        if (!currentCategory) {
            return;
        }
        let {data} = await deleteCategory({
            variables: currentCategory.id
        });

        if (data && data.deleteCategory) {
            let categoryIndex = internalCategories.findIndex(cat => cat.id === currentCategory.id);
            let splicedArray = getSplicedArray(internalCategories, categoryIndex);
            updateCategories(splicedArray);
        }
    }

    async function onDeleteCancel() {
        setShowDeleteConfirmation(false);
        setCurrentCategory(undefined);
    }

    function onAddNewCategoryAction() {
        setCurrentCategory(undefined);
        setIsEditPopupVisible(true);
    }

    return (
        <View>
            <View style={styles.header}>
                <Text category="h5">Category</Text>
                <Button size="medium" onPress={onAddNewCategoryAction}>Add Category</Button>
            </View>
            <View style={styles.cardsContainer}>
                {
                    internalCategories.map(category =>
                        <View key={category.id}>
                            <Category {...category} disabled={true}/>
                            <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                                <Button
                                    size="small"
                                    status="basic"
                                    onPress={() => onEditAction(category)}
                                >Edit</Button>
                                <Button
                                    size="small"
                                    status="basic"
                                    onPress={() => onDeleteAction(category)}
                                >Delete</Button>
                            </View>
                        </View>
                    )
                }
            </View>
            {
                isEditPopupVisible &&
                <CategoryEdit
                    onSecondaryAction={onEditCancel}
                    onPrimaryAction={onCategoryUpdate}
                    visible={true}
                    name={currentCategory && currentCategory.name}
                    orderOfDisplay={currentCategory && currentCategory.orderOfDisplay}
                    imageUrl={currentCategory && currentCategory.imageUrl}
                />
            }
            <ConfirmationPopup
                onPrimaryAction={onDeleteConfirm}
                onSecondaryAction={onDeleteCancel}
                primaryText="DELETE"
                secondaryText="CANCEL"
                title="Are you sure?"
                primaryActionType="danger"
                visible={showDeleteConfirmation}
            />
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