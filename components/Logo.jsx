import React from 'react';
import { Image, View } from 'react-native';
import logo from '../assets/snapchat-logo.png';

export default function Logo() {
    return (
        <View>
            <Image source={logo} style={{ width: 200, height: 100, marginTop: 20 }} />
        </View>
    )
}