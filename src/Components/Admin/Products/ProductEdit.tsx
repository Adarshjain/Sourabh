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
    name?: string;
    categoryOne?: CategoryOne;
    categoryTwo?: CategoryTwo;
    price?: number;
    images?: (string | undefined)[];
    weight?: string;
    purity?: string;
    gender?: string;
    size?: string;
    isOnDiscount?: boolean;
    isHallmark?: boolean;
    isHidden?: boolean;
    categoriesOne: CategoryOne[]
    categoriesTwo: CategoryTwo[]
    description?: string
    isFeatured?: boolean
    isTrending?: boolean
}

export default function ProductEdit(
    {
        name, gender, isHallmark, isHidden, purity, size, weight, visible, onPrimaryAction, onSecondaryAction,
        images, categoriesOne, categoriesTwo, categoryOne, categoryTwo, description, isFeatured, isTrending
    }: Props
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
    const [internalDesc, setDesc] = React.useState<string>(description || '');
    const [selectedCategoryOne, setCategoryOne] = React.useState<string | undefined>(categoryOne?.id);
    const [selectedCategoryTwo, setCategoryTwo] = React.useState<string | undefined>(categoryTwo?.id);
    const [internalIsFeatured, setIsFeatured] = React.useState<boolean>(!!isFeatured);
    const [internalIsTrending, setIsTrending] = React.useState<boolean>(!!isTrending);
    //Input states
    const [internalNameState, setInternalNameState] = React.useState("basic");
    const [internalWeightState, setInternalWeightState] = React.useState("basic");
    const [internalSizeState, setInternalSizeState] = React.useState("basic");
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
        if (internalSize !== "") {
            setInternalSizeState("basic");
        }
        if (!!selectedCategoryOne) {
            setSelectedCategoryOneState("basic");
        }
        if (!!selectedCategoryTwo) {
            setSelectedCategoryTwoState("basic");
        }
    }, [internalName, internalImages, internalWeight, internalSize, selectedCategoryOne, selectedCategoryTwo]);

    useEffect(() => {
        setCategoryTwo(undefined);
    }, [selectedCategoryOne]);

    async function onUpdate() {
        let hasError = false;
        if (internalName === "") {
            setInternalNameState("danger");
            hasError = true;
        }
        if (internalImages.length === 0) {
            setImagesState("danger");
            hasError = true;
        }
        if (internalWeight === "") {
            setInternalWeightState("danger");
            hasError = true;
        }
        if (internalSize === "") {
            setInternalSizeState("danger");
            hasError = true;
        }
        if (!selectedCategoryOne) {
            setSelectedCategoryOneState("danger");
            hasError = true;
        }
        if (!selectedCategoryTwo) {
            setSelectedCategoryTwoState("danger");
            // hasError = true;
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
                categoryOne: categoriesOne.find(cat => cat.id === selectedCategoryOne).id,
                //@ts-ignore
                categoryTwo: categoriesTwo.find(cat => cat.id === selectedCategoryTwo).id,
                description: internalDesc,
                gender: internalGender,
                images: uploadedImageURL,
                isHallmark: internalHallmark,
                isHidden: internalHidden,
                isFeatured: internalIsFeatured,
                isTrending: internalIsTrending,
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
                                {/* CategoryOne */}
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
                                {/* CategoryTwo */}
                                <Select
                                    style={[styles.input, {width: "50%"}]}
                                    status={selectedCategoryTwoState}
                                    label='Sub Category'
                                    disabled={!selectedCategoryOne}
                                    value={categoriesTwo.find(cat => cat.id === selectedCategoryTwo)?.name}
                                    onSelect={(selected) => {
                                        if (selected instanceof IndexPath) {
                                            setCategoryTwo(categoriesTwo.filter(categ => categ.categoryOne.id === selectedCategoryOne)[selected.row].id)
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
                            {/* Name */}
                            <Input
                                style={styles.input}
                                value={internalName}
                                label='Name'
                                status={internalNameState}
                                onChangeText={name => setName(name)}
                            />
                            <label>
                                <Text style={{
                                    color: 'rgb(143, 155, 179)',
                                    fontSize: 12,
                                    fontWeight: '800',
                                    marginBottom: '4px'
                                }}>Description</Text>
                                <textarea
                                    onChange={e => setDesc(e.target.value)}
                                    value={internalDesc}
                                    style={{
                                        width: "100%",
                                        borderColor: "rgb(228, 233, 242)",
                                        borderRadius: '4px',
                                        borderWidth: '1px',
                                        minHeight: '40px',
                                        padding: 8,
                                        backgroundColor: "rgb(247, 249, 252)",
                                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif'
                                    }}/>
                            </label>
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
                                    checked={internalGender === "Men"}
                                    onChange={nextChecked => nextChecked && setGender('Men')}>
                                    Male
                                </Radio>
                                <Radio
                                    style={{marginRight: 12}}
                                    checked={internalGender === "Women"}
                                    onChange={nextChecked => nextChecked && setGender('Women')}>
                                    Female
                                </Radio>
                                <Radio
                                    checked={internalGender === "Unisex"}
                                    onChange={nextChecked => nextChecked && setGender('Unisex')}>
                                    Unisex
                                </Radio>
                                <Radio
                                    checked={internalGender === "Kids"}
                                    onChange={nextChecked => nextChecked && setGender('Kids')}>
                                    Kids
                                </Radio>
                            </View>
                            {/* Size */}
                            <Input
                                style={styles.input}
                                value={internalSize}
                                status={internalSizeState}
                                label='Size'
                                keyboardType="numeric"
                                onChangeText={size => setSize(size)}
                            />
                            <View style={{flexDirection: "row", marginBottom: 12}}>
                                <CheckBox
                                    checked={internalHallmark}
                                    onChange={yes => setHallmark(yes)}>Hallmark</CheckBox>
                                {/*<CheckBox*/}
                                {/*    checked={internalHidden}*/}
                                {/*    onChange={yes => setHidden(yes)}>Hide</CheckBox>*/}
                                <CheckBox
                                    checked={internalIsFeatured}
                                    onChange={yes => setIsFeatured(yes)}>Featured Product</CheckBox>
                                <CheckBox
                                    checked={internalIsTrending}
                                    onChange={yes => setIsTrending(yes)}>Trending Product</CheckBox>
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