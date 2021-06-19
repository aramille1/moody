import React from 'react'
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function AddMessage({ addItem, setModalVisible, placeHolder }) {

    const [textValue, setTextValue] = React.useState('')
    const onChange = textValue => setTextValue(textValue);
    const onAddingMessage = () => {
        if (textValue === '') {
            alert('you cannot add empty message, please type something or press cancel')
        }
        else {
            addItem(textValue);
            setModalVisible()
            setTextValue('');
        }
    }
    return (
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <View>
                        <TextInput
                            style={styles.textInput}
                            placeholder={placeHolder}
                            onChangeText={onChange}
                            value={textValue}
                        />  
                    </View>

                < TouchableOpacity style={styles.btn} onPress={onAddingMessage}>
                    <Text>add</Text>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        padding: 15,
        borderWidth: 1,
        borderColor: "black",
        marginLeft: 10,
        height: 60
    },
    textInput: {
        width: 190,
        height: 60,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: "transparent",
        paddingHorizontal: 10
    }
});