import React, {ChangeEvent, useEffect, useState} from "react";
import {Image, StyleSheet, TouchableHighlight, View} from "react-native";
import UploadButton from "../../Common/UploadButton";
import {Icon} from "@ui-kitten/components";
import {getSplicedArray, removeDuplicatesFromArray} from "../../../libs/Helpers";

export default function MultiFileSelect({images, status, onImagesUpdate}: { images?: string[], status?: string, onImagesUpdate?: (images: string[]) => void }) {
    const [imagesList, setImages] = useState<string[]>(images || []);

    useEffect(() => {
        onImagesUpdate && onImagesUpdate(imagesList);
    }, [imagesList,onImagesUpdate])

    async function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
        if (!(event && event.target && event.target.files)) {
            return;
        }
        let all = Array.from(event.target.files);
        if(all.some(file => !(file.type.startsWith('image') || file.size <= 24000))){
            alert('Some of the files either is not an image or the file size is large. Please check your files.');
            return;
        }

        let allPromise = Array.from(event.target.files).map((file, index) => {
            return new Promise(resolve => {
                let reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target?.result as any);
                }
                reader.readAsDataURL(file);
            })
        }) as Promise<string>[];
        setImages(removeDuplicatesFromArray([...imagesList, ...await Promise.all(allPromise)]));
    }

    function deleteAtIndex(index) {
        setImages(getSplicedArray(imagesList, index));
    }

    return (
        <View>
            <View style={{flexDirection: "row", width: "100%", overflow: "scroll"}}>
                {imagesList.map((image, index) => <View key={image} style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: image}}/>
                    <TouchableHighlight style={styles.iconHolder} onPress={() => deleteAtIndex(index)}>
                        <Icon style={styles.icon} fill='#424242' name='close-circle'/>
                    </TouchableHighlight>
                </View>)}
            </View>
            <UploadButton onChange={onFileSelected} status={status} multiple={true}>Add Images</UploadButton>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        margin: 8,
        borderColor: '#d3d3d3',
        borderWidth: 1,
        borderRadius: 8,
        position: "relative"
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
    },
    icon: {
        width: 24,
        height: 24,
    },
    iconHolder: {
        position: "absolute",
        right: -12,
        top: -10,
        backgroundColor: "#FFFFFF",
        borderRadius: 12
    }
})