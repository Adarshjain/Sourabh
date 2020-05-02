import {StyleSheet, View} from "react-native";
import {Card, IndexPath, Input, Modal, Select, SelectItem, Text} from "@ui-kitten/components";
import React, {ChangeEvent} from "react";
import UploadButton from "../../Common/UploadButton";
import Category from "../../Common/Category";
import {SecondCategoryInput} from "../../../types";
import {uploadImage} from "../../../libs/FileUpload";
import Loading from "../../Common/Loading";
import GqlQueryWrapper from "../../Common/GqlQueryWrapper";
import {FETCH_CATEGORIES} from "../../../Network/schemaFormats";
import {CategoryResponse} from "../../../customTypes";
import Footer from "../../Common/PopupFooter";

interface Props {
    onPrimaryAction: (obj: SecondCategoryInput) => void | Promise<void>,
    onSecondaryAction: () => void,
    visible: boolean
    name?: string,
    orderOfDisplay?: any,
    imageUrl?: string
    categoryId?: string
}

export default GqlQueryWrapper(SecondCategoryEdit, FETCH_CATEGORIES);

function SecondCategoryEdit(
    {onPrimaryAction, onSecondaryAction, name, orderOfDisplay, imageUrl, visible, categoryId, data: {categories}}
        : Props & CategoryResponse
) {
    //Data states
    const [internalName, setName] = React.useState(name || '');
    const [internalOrderOfDisplay, setOrderOfDisplay] = React.useState(orderOfDisplay || '');
    const [file, setFile] = React.useState<any>(undefined);
    const [selectedCategory, setSelectedCategory] = React.useState(categoryId);

    //Input field States
    const [internalNameState, setInternalNameState] = React.useState("basic");
    const [internalOrderOfDisplayState, setInternalOrderOfDisplayState] = React.useState("basic");
    const [fileState, setFileState] = React.useState("basic");
    const [selectedCategoryState, setSelectedCategoryState] = React.useState("basic");

    //Others
    const [imageData, setImageData] = React.useState<any>(undefined);
    const [isLoading, setIsLoading] = React.useState(false);

    async function onUpdate() {
        let hasError = false;
        if (internalName === "") {
            setInternalNameState("danger");
            hasError = true;
        }
        if (internalOrderOfDisplay === "") {
            setInternalOrderOfDisplayState("danger");
            hasError = true;
        }
        if (!imageUrl && !file) {
            setFileState("danger");
            hasError = true;
        }
        if (!selectedCategory) {
            setSelectedCategoryState("danger");
            hasError = true;
        }

        let uploadedImageURL: string = "";
        if (file) {
            setIsLoading(true);
            uploadedImageURL = await uploadImage(file);
            setIsLoading(false);
        }
        if (!hasError) {
            onPrimaryAction({
                name: internalName,
                orderOfDisplay: parseInt(internalOrderOfDisplay),
                imageUrl: uploadedImageURL || imageUrl || "",
                categoryId: selectedCategory || ""
            });
        }
    }

    function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
        if (!(event && event.target && event.target.files)) {
            return;
        }
        setFile(event.target.files[0]);
        let reader = new FileReader();
        reader.onload = (e) => {
            setImageData(e.target?.result);
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    return (
        <Modal visible={visible} backdropStyle={styles.backdrop}>
            {
                !isLoading ?
                    <Card
                        style={styles.cardContainer}
                        disabled={true}
                        header={(props) => <Text {...props}>Category</Text>}
                        footer={(props) =>
                            <Footer
                                {...props}
                                primaryText="SAVE"
                                secondaryText="CANCEL"
                                onSecondaryAction={onSecondaryAction}
                                onPrimaryAction={onUpdate}
                            />
                        }
                    >
                        <View style={{flexDirection: "row"}}>
                            <View style={{flex: 1}}>
                                <Input
                                    style={styles.input}
                                    value={internalName}
                                    label='Name'
                                    status={internalNameState}
                                    onChangeText={name => setName(name)}
                                />
                                <Input
                                    style={styles.input}
                                    value={internalOrderOfDisplay}
                                    label='Order of display'
                                    status={internalOrderOfDisplayState}
                                    onChangeText={nextValue => setOrderOfDisplay(nextValue)}
                                    keyboardType="numeric"
                                />
                                <Select
                                    style={styles.input}
                                    status={selectedCategoryState}
                                    label='Category'
                                    value={categories.find(cat => cat.id === selectedCategory)?.name}
                                    onSelect={(selected) => {
                                        if (selected instanceof IndexPath) {
                                            setSelectedCategory(categories[selected.row].id)
                                        }
                                    }}
                                >
                                    {
                                        categories.map(category =>
                                            <SelectItem
                                                selected={category.id === selectedCategory}
                                                title={category.name}
                                                key={category.id}/>
                                        )
                                    }
                                </Select>
                                <UploadButton status={fileState} onChange={onFileSelected}>Pick Image</UploadButton>
                            </View>
                            {
                                (imageData || imageUrl) &&
                                <View style={{flex: 1}}>
                                    <Category name={internalName} disabled={false} imageUrl={imageData || imageUrl}/>
                                </View>
                            }
                        </View>

                    </Card>
                    : <Loading/>
            }

        </Modal>
    )
}

const styles = StyleSheet.create({
    addButton: {
        width: "150px"
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    cardContainer: {
        minWidth: 640
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    footerControl: {
        marginHorizontal: 2
    },
    input: {
        marginBottom: 12
    }
});