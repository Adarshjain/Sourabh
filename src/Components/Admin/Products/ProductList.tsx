import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {MutationUpdateProductArgs, Product} from "../../../types";
import ProductItem from "./ProductItem";
import {
    DELETE_PRODUCT,
    FETCH_CATEGORIES,
    FETCH_PRODUCTS,
    FETCH_SECOND_CATEGORIES,
    UPDATE_PRODUCT
} from "../../../Network/schemaFormats";
import {Button, Text} from "@ui-kitten/components";
import GqlQueryWrapper from "../../Common/GqlQueryWrapper";
import {AllProductResponse} from "../../../customTypes";
import ProductEdit from "./ProductEdit";
import AdminLoading from "../../Common/Loading";
import AdminError from "../../Common/Error";
import {getSplicedArray, pushToArray, replaceArrayAt} from "../../../libs/Helpers";
import ConfirmationPopup from "../../Common/ConfirmationPopup";

export default GqlQueryWrapper(ProductList, FETCH_PRODUCTS);

function ProductList({data: {allProducts}}: AllProductResponse) {
    const [isEditPopupVisible, setIsEditPopupVisible] = React.useState(false);
    const [internalProducts, updateCategories] = useState<Product[]>(allProducts || []);
    const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [updateProduct] = useMutation<{ updateProduct: Product }, MutationUpdateProductArgs>(UPDATE_PRODUCT);
    const [deleteProduct] = useMutation<{ deleteProduct: boolean }, {id:string}>(DELETE_PRODUCT);
    const {loading: loadingOne, error: errorOne, data: categoriesOne} = useQuery(FETCH_CATEGORIES);
    const {loading: loadingTwo, error: errorTwo, data: categoriesTwo} = useQuery(FETCH_SECOND_CATEGORIES);

    if (loadingOne || loadingTwo) {
        return <AdminLoading/>
    }
    if (errorOne || errorTwo) {
        return <AdminError/>
    }

    async function onCategoryUpdate(tempProduct: MutationUpdateProductArgs) {
        setIsEditPopupVisible(false);
        if (!!currentProduct) {
            //TODO: check if no edit has been done!
            tempProduct.id = currentProduct.id;
        }
        let product = await updateProduct({variables: tempProduct});
        if (product.data !== undefined && product.data.updateProduct !== undefined) {
            if (!!currentProduct) {
                let foundIndex = internalProducts.findIndex(cat => cat.id === currentProduct.id)
                updateCategories(replaceArrayAt(internalProducts, foundIndex, product.data!.updateProduct))
            } else {
                updateCategories(pushToArray(internalProducts, product.data!.updateProduct))
            }
        }
        setCurrentProduct(undefined);
    }

    function onEditAction(product: Product) {
        setCurrentProduct(product);
        setIsEditPopupVisible(true);
    }

    function onEditCancel() {
        setCurrentProduct(undefined);
        setIsEditPopupVisible(false);
    }

    async function onDeleteAction(category: Product) {
        setCurrentProduct(category);
        setShowDeleteConfirmation(true);
    }

    async function onDeleteConfirm() {
        setShowDeleteConfirmation(false);
        if (!currentProduct) {
            return;
        }
        let {data} = await deleteProduct({
            variables: {
                id: currentProduct.id
            }
        });

        if (data && data.deleteProduct) {
            let categoryIndex = internalProducts.findIndex(cat => cat.id === currentProduct.id);
            let splicedArray = getSplicedArray(internalProducts, categoryIndex);
            updateCategories(splicedArray);
        }
    }

    async function onDeleteCancel() {
        setShowDeleteConfirmation(false);
        setCurrentProduct(undefined);
    }

    function onAddNewProductAction() {
        setCurrentProduct(undefined);
        setIsEditPopupVisible(true);
    }

    return (
        <View>
            <View style={styles.header}>
                <Text category="h5">Products</Text>
                <Button size="medium"
                        onPress={onAddNewProductAction}
                >Add Product</Button>
            </View>
            <View style={styles.cardsContainer}>
                {
                    internalProducts.map((product, index) =>
                        <View key={product.id} style={{width: "33%", padding: 6, zIndex: index}}>
                            <ProductItem {...product}
                                         onEdit={() => onEditAction(product)}
                                         onDelete={() => onDeleteAction(product)}
                            />

                        </View>
                    )
                }
            </View>
            {
                isEditPopupVisible &&
                <ProductEdit
                    onSecondaryAction={onEditCancel}
                    onPrimaryAction={onCategoryUpdate}
                    visible={true}
                    {...currentProduct}
                    categoriesOne={categoriesOne ? categoriesOne.categoriesOne : []}
                    categoriesTwo={categoriesTwo ? categoriesTwo.categoriesTwo : []}
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