import React, { Component, useEffect, useState } from 'react';
import GetData from '../settings/storage/GetData';
import { StyleSheet, Text, SafeAreaView, View, Button } from 'react-native';

export default Friends = () => {

    const [member, setMember] = useState([]);
    useEffect(() => {
        GetData()
            .then((t) => {
                console.log('test' + t)
                fetch('http://149.91.89.133:6088/ALL', {
                    method: 'GET',
                    headers: {
                        token: t
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        // console.log(res)
                        const data = res.data
                        // console.log(data)
                        setMember(data);
                        // console.log(member)
                    })
            })
    }, [])
    return (
        <SafeAreaView>
            {member ? member.map((members) => {
                return (
                    <Text>{members.email}</Text>
                )
            }) : null}
        </SafeAreaView>
    )
}
