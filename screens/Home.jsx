import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from "react-native";
import { Link } from "react-router-native";
import Logo from '../components/Logo';

export default function Home({ navigation }) {

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Logo style={styles.image} />
            <TouchableOpacity onPress={() => navigation.navigate('login')} style={styles.loginBtn}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('register')} style={styles.loginBtn}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>REGISTER</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFC00',
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 40,
    },

    loginBtn: {
        width: "70%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#1DC8EA",
        color: "#FFFF",
    },
});