import React from 'react'
import { View, Text, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import AddMessage from '../AddMessage';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';


export default function RightSideMessageModal({rightSideMessage, setRightsideMessageProp}) {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [text, setText] = React.useState('happy')

    const addItem = text => {
        if (!text) {
            Alert.alert(
                'Write how you feeling',
                { cancelable: true },
            );
        } else {
            // mood.setRightSideMessage(text);
            setText(text)
            setRightsideMessageProp(text)
        }
    };
    return (
        <>
            <View style={styles.message}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={{ color: "white", textTransform: "capitalize" }}>{text}</Text>
                </TouchableOpacity>
            </View>

            {/* MODAL */}
            <View style={styles.centeredView}>
                <Modal
                    isVisible={modalVisible}
                    backdropTransitionOutTiming={0}
                    onBackdropPress={() => setModalVisible(!modalVisible)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text>Add your message here</Text>
                            <View style={{ marginTop: 20 }}>
                                <AddMessage placeHolder="e.g. Ready To Talk!" addItem={addItem} setModalVisible={() => setModalVisible(!modalVisible)} />
                            </View>

                            <TouchableHighlight
                                style={{ ...styles.openButton, marginTop: 10 }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
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
        // height: "100%",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "white",
        justifyContent: "flex-end",
        padding: 5,
        paddingRight: 0,
        position: "absolute",
        top: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        marginHorizontal: 22,
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
    // textStyle: {
    //     color: "white",
    //     fontWeight: "bold",
    //     textAlign: "center",
    //     marginTop: 10,
    //     padding: 10
    // },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

});