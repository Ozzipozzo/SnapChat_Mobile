import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Link, useHistory } from "react-router-native";
import Logo from '../components/Logo';
import StoreData from '../settings/storage/StoreData'

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        fetch('http://149.91.89.133:6088/connection', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                alert(`Welcome ${email}`)
                StoreData(response.data.token)
                navigation.push("camera");

            })
    }


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Logo style={styles.image} />
            <Text style={{ fontWeight: 'bold', fontSize: 25, marginTop: 30 }}>Login</Text>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={(handleSubmit)}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Link to="/register">
                    <Text style={styles.forgot_button}>Not a member yet ?</Text>
                </Link>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.forgot_button}>I forgot my password ?</Text>
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

    inputView: {
        backgroundColor: "#FFFF",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        // marginBottom: 30,
        marginTop: 30,
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
    valitBtn: {
        backgroundColor: 'black',
        color: 'white',
        fontSize: 20,
        padding: '10px 60px',
        borderRadius: 5,
        margin: '10px 0px',
    },
});