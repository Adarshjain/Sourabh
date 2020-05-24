import {StyleSheet, View} from "react-native";
import {Card, CheckBox, IndexPath, Input, Modal, Radio, Select, SelectItem, Text} from "@ui-kitten/components";
import React, {useEffect} from "react";
import {CategoryOne, CategoryTwo, MutationUpdateProductArgs} from "../../../types";
import Loading from "../../Common/Loading";
import Footer from "../../Common/PopupFooter";
import MultiFileSelect from "./MultiFileSelect";
import {uploadImage} from "../../../libs/FileUpload";

interface Props {
    onPrimaryAction: (obj: MutationUpdateProductArgs) => void | Promise<void>,
    onSecondaryAction?: () => void,
    visible: boolean
    // name?: string;
    // categoryOne?: CategoryOne;
    // categoryTwo?: CategoryTwo;
    // price?: number;
    // images?: string[];
    // weight?: string;
    // purity?: string;
    // gender?: string;
    // size?: string;
    // isOnDiscount?: boolean;
    // isHallmark?: boolean;
    // isHidden?: boolean;
    categoriesOne: CategoryOne[]
    categoriesTwo: CategoryTwo[]
}

export default function ProductEdit(
    {name, gender, isHallmark, isHidden, purity, size, weight, visible, onPrimaryAction, onSecondaryAction, images, categoriesOne, categoriesTwo, categoryOne, categoryTwo}: Props & MutationUpdateProductArgs
) {
    //Data states
    const [internalName, setName] = React.useState<string>(name || '');
    const [internalWeight, setWeight] = React.useState<string>(weight || '');
    const [internalPurity, setPurity] = React.useState<string>(purity || '');
    const [internalGender, setGender] = React.useState<string>(gender || '');
    const [internalSize, setSize] = React.useState<string>(size || '');
    const [internalHallmark, setHallmark] = React.useState<boolean>(!!isHallmark);
    const [internalHidden, setHidden] = React.useState<boolean>(!!isHidden);
    const [internalImages, setImages] = React.useState<any[]>(images || []);
    const [selectedCategoryOne, setCategoryOne] = React.useState<string | undefined>(categoryOne?.id);
    const [selectedCategoryTwo, setCategoryTwo] = React.useState<string | undefined>(categoryTwo?.id);
    //Input states
    const [internalNameState, setInternalNameState] = React.useState("basic");
    const [internalWeightState, setInternalWeightState] = React.useState("basic");
    const [imagesState, setImagesState] = React.useState("basic");
    const [selectedCategoryOneState, setSelectedCategoryOneState] = React.useState("basic");
    const [selectedCategoryTwoState, setSelectedCategoryTwoState] = React.useState("basic");

    //Others
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        if (internalName !== "") {
            setInternalNameState("basic");
        }
        if (internalImages.length > 0) {
            setImagesState("basic");
        }
        if (internalWeight !== "") {
            setInternalWeightState("basic");
        }
        if (!!selectedCategoryOne) {
            setSelectedCategoryOneState("basic");
        }
        if (!!selectedCategoryTwo) {
            setSelectedCategoryTwoState("basic");
        }
    }, [internalName, internalImages, internalWeight, selectedCategoryOne, selectedCategoryTwo]);

    useEffect(() => {

    }, [selectedCategoryOne]);

    async function onUpdate() {
        let hasError = false;
        if (internalName === "") {
            setInternalNameState("danger");
            hasError = true;
        }
        if (internalImages.length === 0) {
            setInternalNameState("danger");
            hasError = true;
        }
        if (internalWeight === "") {
            setInternalNameState("danger");
            hasError = true;
        }
        if (!selectedCategoryOne) {
            setSelectedCategoryOneState("danger");
            hasError = true;
        }
        if (!selectedCategoryTwo) {
            setSelectedCategoryTwoState("danger");
            hasError = true;
        }
        if (hasError) {
            return;
        }
        setIsLoading(true);
        let uploadedImageURL = await uploadImage(internalImages);
        setIsLoading(false);
        if (!hasError) {
            onPrimaryAction({
                name: internalName,
                //@ts-ignore
                categoryOne: categoriesOne.find(cat => cat.id === selectedCategoryOne),
                //@ts-ignore
                categoryTwo: categoriesTwo.find(cat => cat.id === selectedCategoryTwo),
                gender: internalGender,
                images: uploadedImageURL,
                isHallmark: internalHallmark,
                isHidden: internalHidden,
                purity: internalPurity,
                size: internalSize,
                weight: internalWeight
            });
        }
    }

    return (
        <Modal visible={visible} backdropStyle={styles.backdrop}>
            {
                !isLoading ?
                    <Card
                        style={styles.cardContainer}
                        disabled={true}
                        header={(props) => <Text {...props}>Product</Text>}
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
                        <View>
                            <View style={{flexDirection: "row"}}>
                                <Select
                                    style={[styles.input, {width: "calc(50% - 12px)", marginRight: 12}]}
                                    status={selectedCategoryOneState}
                                    label='Category'
                                    value={categoriesOne.find(cat => cat.id === selectedCategoryOne)?.name}
                                    onSelect={(selected) => {
                                        if (selected instanceof IndexPath) {
                                            setCategoryOne(categoriesOne[selected.row].id)
                                        }
                                    }}
                                >
                                    {
                                        categoriesOne
                                            .map(category =>
                                                <SelectItem
                                                    selected={category.id === selectedCategoryOne}
                                                    title={category.name}
                                                    key={category.id}/>
                                            )
                                    }
                                </Select>
                                <Select
                                    style={[styles.input, {width: "50%"}]}
                                    status={selectedCategoryTwoState}
                                    label='Sub Category'
                                    disabled={!selectedCategoryOne}
                                    value={categoriesTwo.find(cat => cat.id === selectedCategoryTwo)?.name}
                                    onSelect={(selected) => {
                                        if (selected instanceof IndexPath) {
                                            setCategoryTwo(categoriesTwo[selected.row].id)
                                        }
                                    }}
                                >
                                    {
                                        categoriesTwo.filter(categ => categ.categoryOne.id === selectedCategoryOne)
                                            .map(category =>
                                                <SelectItem
                                                    selected={category.id === selectedCategoryTwo}
                                                    title={category.name}
                                                    key={category.id}/>
                                            )
                                    }
                                </Select>
                            </View>
                            <Input
                                style={styles.input}
                                value={internalName}
                                label='Name'
                                status={internalNameState}
                                onChangeText={name => setName(name)}
                            />
                            {/*Weight & Purity*/}
                            <View style={{flexDirection: "row"}}>
                                <Input
                                    style={[styles.input, {width: "calc(50% - 12px)", marginRight: 12}]}
                                    value={internalWeight}
                                    label='Weight'
                                    status={internalWeightState}
                                    onChangeText={value => setWeight(value)}
                                    keyboardType="numeric"
                                    caption="Weight in grams"
                                />
                                <Input
                                    style={[styles.input, {width: "50%"}]}
                                    value={internalPurity}
                                    label='Purity'
                                    onChangeText={value => setPurity(value)}
                                />
                            </View>
                            {/*Gender */}
                            <View style={{display: "flex", flexDirection: "row", marginBottom: 12}}>
                                <Text style={{
                                    color: "rgb(143, 155, 179)",
                                    fontSize: 14,
                                    fontWeight: "800",
                                    marginRight: 12
                                }}>Gender </Text>
                                <Radio
                                    style={{marginRight: 12}}
                                    checked={internalGender === "male"}
                                    onChange={nextChecked => nextChecked && setGender('male')}>
                                    Male
                                </Radio>
                                <Radio
                                    style={{marginRight: 12}}
                                    checked={internalGender === "female"}
                                    onChange={nextChecked => nextChecked && setGender('female')}>
                                    Female
                                </Radio>
                                <Radio
                                    checked={internalGender === "both"}
                                    onChange={nextChecked => nextChecked && setGender('both')}>
                                    Unisex
                                </Radio>
                            </View>
                            <Input
                                style={styles.input}
                                value={internalSize}
                                label='Size'
                                onChangeText={size => setSize(size)}
                            />
                            <View style={{flexDirection: "row", marginBottom: 12}}>
                                <CheckBox
                                    checked={internalHallmark}
                                    onChange={yes => setHallmark(yes)}>Hallmark</CheckBox>
                                <CheckBox
                                    checked={internalHidden}
                                    onChange={yes => setHidden(yes)}>Hide</CheckBox>
                            </View>
                            <MultiFileSelect status={imagesState} images={internalImages} onImagesUpdate={setImages}/>
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
        width: 800
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    footerControl: {
        marginLeft: 2,
        marginRight: 2
    },
    input: {
        marginBottom: 12
    }
});