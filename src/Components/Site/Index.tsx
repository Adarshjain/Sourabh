import React from "react";
import {Text} from "react-native";
import styled from 'styled-components/native'

export default function Index() {
    const Container = styled.View`
    padding:50px 0;
    justify-content:center;
    background-color:#f4f4f4;
    align-items:center
`

    return <Container>
        <Text>Site</Text>
    </Container>
}