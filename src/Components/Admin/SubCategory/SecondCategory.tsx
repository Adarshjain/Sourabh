import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {useMutation} from "@apollo/react-hooks";
import {GQLInput, SecondCategory, SecondCategoryInput} from "../../../types";
import Category from "../../Common/Category";
import {DELETE_SECOND_CATEGORY, FETCH_SECOND_CATEGORIES, UPDATE_SECOND_CATEGORY} from "../../../Network/schemaFormats";
import SecondCategoryEdit from "./SecondCategoryEdit";
import {Button, Text} from "@ui-kitten/components";
import GqlQueryWrapper from "../../Common/GqlQueryWrapper";
import {getSplicedArray, pushToArray, replaceArrayAt} from "../../../libs/Helpers";
import ConfirmationPopup from "../../Common/ConfirmationPopup";

interface CategoryResponse {
    data: { secondCategories: SecondCategory[] }
}

export default GqlQueryWrapper(SecondCategoryComp, FETCH_SECOND_CATEGORIES);

function SecondCategoryComp({data: {secondCategories}}: CategoryResponse) {
    const [isEditPopupVisible, setIsEditPopupVisible] = React.useState(false);
    const [internalCategories, updateCategories] = useState<SecondCategory[]>(secondCategories || []);
    const [currentCategory, setCurrentCategory] = useState<SecondCategory | undefined>(undefined);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [updateCategory] = useMutation<{ updateSecondCategory: SecondCategory }, GQLInput<SecondCategoryInput>>(UPDATE_SECOND_CATEGORY);
    const [deleteCategory] = useMutation<{ deleteSecondCategory: boolean }, GQLInput<string>>(DELETE_SECOND_CATEGORY);

    async function onCategoryUpdate(tempCategory: SecondCategoryInput) {
        setIsEditPopupVisible(false);
        if (!!currentCategory) {
            if (tempCategory.name === currentCategory.name
                && tempCategory.orderOfDisplay === currentCategory.orderOfDisplay
                && tempCategory.categoryId === currentCategory.category.id
                && tempCategory.imageUrl === currentCategory.imageUrl) {
                setCurrentCategory(undefined);
                return;
            }
            tempCategory.id = currentCategory.id;
        }
        let category = await updateCategory({
            variables: {input: tempCategory}
        });
        if (category.data !== undefined && category.data.updateSecondCategory !== undefined) {
            if (!!currentCategory) {
                let foundIndex = internalCategories.findIndex(cat => cat.id === currentCategory.id)
                updateCategories(replaceArrayAt(internalCategories, foundIndex, category.data!.updateSecondCategory))
            } else {
                updateCategories(pushToArray(internalCategories, category.data!.updateSecondCategory))
            }
        }
        setCurrentCategory(undefined);
    }

    function onEditAction(category: SecondCategory) {
        setCurrentCategory(category);
        setIsEditPopupVisible(true);
    }

    function onEditCancel() {
        setCurrentCategory(undefined);
        setIsEditPopupVisible(false);
    }

    async function onDeleteAction(category: SecondCategory) {
        setCurrentCategory(category);
        setShowDeleteConfirmation(true);
    }

    async function onDeleteConfirm() {
        setShowDeleteConfirmation(false);
        if (!currentCategory) {
            return;
        }
        let {data} = await deleteCategory({
            variables: {
                input: currentCategory.id
            }
        });

        if (data && data.deleteSecondCategory) {
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
                <Text category="h5">Sub Category</Text>
                <Button size="medium" onPress={onAddNewCategoryAction}>Add Sub Category</Button>
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
                <SecondCategoryEdit
                    onSecondaryAction={onEditCancel}
                    onPrimaryAction={onCategoryUpdate}
                    visible={true}
                    name={currentCategory && currentCategory.name}
                    orderOfDisplay={currentCategory && currentCategory.orderOfDisplay}
                    imageUrl={currentCategory && currentCategory.imageUrl}
                    categoryId={currentCategory?.category.id}
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