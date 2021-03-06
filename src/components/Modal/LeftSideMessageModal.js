import React, { useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import AddMessage from '../AddMessage';
import Icon from 'react-native-vector-icons/Ionicons';
// import { MoodContext } from '../../../../../App';
import Modal from 'react-native-modal';


export default function LeftSideMessageModal({setLeftsideMessageProp, leftSideMessage}) {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [text, setText] = React.useState('sad')
    // const mood = useContext(MoodContext)

    useEffect(() => {
        setText(leftSideMessage)
    }, [leftSideMessage])

    const addItem = textData => {
        if (!textData) {
            Alert.alert(
                'Write how you feeling',
                { cancelable: true },
            );
        } else {
            // mood.setleftSideMessage(text);
            setText(textData)
            setLeftsideMessageProp(textData)
        }
    };
    return (
        <>
            <View>
                <TouchableOpacity style={styles.message} onPress={() => setModalVisible(true)}>
                    <Text style={{ color: "#4f6367", textTransform: "capitalize" }}>{text}</Text>
                </TouchableOpacity>
            </View>

            {/* MODAL */}
            <View style={styles.centeredView}>
                <Modal
                    backdropTransitionOutTiming={0}
                    onBackdropPress={() => setModalVisible(!modalVisible)}
                    isVisible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text>Add your mood indicator here</Text>
                            <View style={{ marginTop: 20 }}>
                                <AddMessage placeHolder="e.g. Not Ready To Talk.." addItem={addItem} setModalVisible={() => setModalVisible(!modalVisible)} />
                            </View>

                            <TouchableHighlight
                                style={{ ...styles.openButton, marginTop: 10 }}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Icon name="close-outline" size={30} color="#373737" />
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    message: {
        // flex: 1,
        width: 100,
        alignItems: "center",
        // borderWidth: 1,
        // borderRadius: 10,
        // borderColor: "#4f6367",
        justifyContent: "flex-end",
        // padding: 10,
        // paddingRight: 10,
        position: "absolute",
        top: 20,
        left: -30

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        position: "absolute",
        top: 0,
        right: 10
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

});