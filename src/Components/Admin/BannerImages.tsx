import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import Category from "../Common/Category";
import {FETCH_MISC, UPDATE_MISC} from "../../Network/schemaFormats";
import {Button, Text} from "@ui-kitten/components";
import GqlQueryWrapper from "../Common/GqlQueryWrapper";
import {BANNER_IMAGES, MISC, MiscResponse} from "../../customTypes";
import {Misc, MutationUpdateMiscArgs, QueryFindMiscArgs} from "../../types";
import AddBannerImage from "./AddBannerImage";
import {useMutation} from "@apollo/react-hooks";
import ConfirmationPopup from "../Common/ConfirmationPopup";

export default GqlQueryWrapper<{ variables: QueryFindMiscArgs }>(BannerImages, FETCH_MISC, {variables: {key: [BANNER_IMAGES]}});

function BannerImages({data: {findMisc}}: MiscResponse) {
    const [isEditPopupVisible, setIsEditPopupVisible] = React.useState(false);
    const [updateMisc] = useMutation<{ updateMisc: Misc }, MutationUpdateMiscArgs>(UPDATE_MISC);

    const [internalMisc,setInternalMisc] = useState<MISC>(() => {
        if (findMisc !== undefined) {
            return JSON.parse(findMisc.value || '{}')
        } else {
            return {};
        }
    });
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [currIndex, setCurrIndex] = useState<number>(-1);

    async function onCategoryUpdate(tempCategory?: { orderOfDisplay: number, url: string }) {
        setIsEditPopupVisible(false);
        let resp: any[] = [];
        if (internalMisc.hasOwnProperty(BANNER_IMAGES) && internalMisc.BANNER_IMAGES !== undefined) {
            resp = JSON.parse(internalMisc.BANNER_IMAGES);
        }
        resp.push(tempCategory);
        let misc = await updateMisc({
            variables: {
                key: BANNER_IMAGES,
                value: JSON.stringify(resp)
            }
        });
        setInternalMisc({BANNER_IMAGES:JSON.stringify(resp)});
    }

    async function onDeleteAction(index: number) {
        setCurrIndex(index);
        setShowDeleteConfirmation(true);
    }

    async function onDeleteConfirm() {
        setShowDeleteConfirmation(false);
        if (currIndex === -1) {
            return;
        }
        if (internalMisc.BANNER_IMAGES) {
            let resp = JSON.parse(internalMisc.BANNER_IMAGES)
                .filter(Boolean)
                .sort((objA, objB) => objA.orderOfDisplay < objB.orderOfDisplay)
            resp.splice(currIndex, 1);
            let misc = await updateMisc({
                variables: {
                    key: BANNER_IMAGES,
                    value: JSON.stringify(resp)
                }
            });
            setInternalMisc({BANNER_IMAGES:JSON.stringify(resp)});
        }
    }

    async function onDeleteCancel() {
        setShowDeleteConfirmation(false);
        setCurrIndex(-1);
    }

    return (
        <View>
            <View style={styles.header}>
                <Text category="h5">Banner Images</Text>
                <Button size="medium"
                        onPress={() => setIsEditPopupVisible(true)}
                        // onPress={() => onCategoryUpdate()}
                >Add Image</Button>
            </View>
            <View style={styles.cardsContainer}>
                {
                    internalMisc.BANNER_IMAGES && JSON.parse(internalMisc.BANNER_IMAGES)
                        .filter(Boolean)
                        .sort((objB, objA) => objA.orderOfDisplay - objB.orderOfDisplay)
                        .map((obj, index) => <View key={obj.url}>
                                <Category imageUrl={obj.url} name={'Order of display: ' + obj.orderOfDisplay}/>
                                <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                                    <Button
                                        size="small"
                                        status="basic"
                                        onPress={() => onDeleteAction(index)}
                                    >Delete</Button>
                                </View>
                            </View>
                        )
                }
            </View>
            {
                isEditPopupVisible &&
                <AddBannerImage
                    onSecondaryAction={() => setIsEditPopupVisible(false)}
                    onPrimaryAction={onCategoryUpdate}
                    visible={true}
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
        paddingHorizontal: 26,
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