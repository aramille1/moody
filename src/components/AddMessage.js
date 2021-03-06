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
        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <View>
                        <TextInput
                            style={styles.textInput}
                            placeholder={placeHolder}
                            onChangeText={onChange}
                            value={textValue}
                        />  
                    </View>

                < TouchableOpacity style={styles.btn} onPress={onAddingMessage}>
                    <Text style={{color: '#fff', textAlign:'center'}}>Add</Text>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        padding: 20,
        // borderWidth: 1,
        borderRadius: 10,
        // borderColor: "#4f6367",
        marginTop: 10,
        height: 60,
        backgroundColor: '#009387',
        width: 190,
    },
    textInput: {
        width: 190,
        height: 60,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#4f6367',
        backgroundColor: "transparent",
        paddingHorizontal: 10
    }
});