import {Image, StyleSheet, View} from "react-native";
import {Button, Text} from "@ui-kitten/components";
import React from "react";
import {Product} from "../../../types";

interface ExtraItems {
    onEdit?: () => void
    onDelete?: () => void
}

export default function ProductItem(
    {
        name,
        categoryOne: {name: categoryOneName},
        categoryTwo: {name: categoryTwoName},
        images,
        onDelete,
        onEdit
    }: Product & ExtraItems) {
    return (
        <View style={styles.card}>
            <Image style={styles.cardImage} source={{uri: images && images[0] || ""}}/>
            <View style={{display: "flex", flex: 1, flexDirection: "column"}}>
                <Text style={styles.title}>{name}</Text>
                {categoryOneName && <Text style={styles.title}>{'Category: ' + categoryOneName}</Text>}
                {categoryTwoName && <Text style={styles.title}>{'Sub Category: ' + categoryTwoName}</Text>}
                <View style={{flexDirection: "row", justifyContent: "space-around", marginTop: "auto"}}>
                    {onEdit &&
                    <Button
                        size="small"
                        status="basic"
                        onPress={() => onEdit()}
                    >Edit</Button>
                    }
                    {onDelete &&
                    <Button
                        size="small"
                        status="basic"
                        onPress={() => onDelete()}
                    >Delete</Button>
                    }
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        shadowColor: '#d3d3d3',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 5,
        borderRadius: 8,
        overflow: "hidden",
        padding: 12
    },
    cardImage: {
        width: 200,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginRight: 8
    },
    title: {
        marginBottom: 12
    }
})