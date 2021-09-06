import React from 'react'
import { Alert, Button, Divider, Text, View, TouchableOpacity } from 'react-native';
import { Link, useHistory } from "react-router-native";

export default function NavbarConnect() {
    return (
        <View style={{display: 'flex', flexDirection: 'row'}}>
            <View
                style={{
                    width: "auto",
                    minWidth: 50,
                    width: 100,
                    height: 50,
                    backgroundColor: "powderblue",
                }}
                />
            <TouchableOpacity>
                <Link to="/friends">
                    <Text>Friend</Text>
                </Link>
            </TouchableOpacity>
            <View
                style={{
                    width: "auto",
                    minWidth: 50,
                    width: 100,
                    height: 50,
                    backgroundColor: "powderblue",
                }}
                />
            <TouchableOpacity>
                <Link to="/camera">
                    <Text>Camera</Text>
                </Link>
            </TouchableOpacity>

        </View>
    )
}