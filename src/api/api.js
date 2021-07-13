import React, {useEffect, useContext} from 'react'
import { View, Text } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import MoodContext from '../../App';

export default function api() {
  const mood = useContext(MoodContext)

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () =>{
        const userDocument = await firestore().collection("users").doc('TpZwxmTlnmbzQSaeRQk3').get()
        console.log(userDocument)
    }  

    return (
        <View>
            <Text></Text>
        </View>
    )
}
