import {Image, StyleSheet} from "react-native";
import {Card, Text} from "@ui-kitten/components";
import React from "react";

export default function Category({imageUrl, name, disabled}) {
    return (
        <Card
            disabled={disabled}
            header={() =>
                <Image
                    style={styles.cardImage}
                    source={{uri: imageUrl}}
                />}
            style={styles.card}>
            <Text style={styles.title}>{name}</Text>
        </Card>
    )
}
const styles = StyleSheet.create({
    card: {
        width: 280,
        margin: 16,
        padding: 0,
    },
    cardImage: {
        height: 320,
    },
    title: {}
})