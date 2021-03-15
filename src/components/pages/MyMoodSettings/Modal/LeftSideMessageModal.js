import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import AddMessage from '../AddMessage/AddMessage.js';
import Icon from 'react-native-vector-icons/Ionicons';
import { MoodContext } from '../MyMoodSettings';
import Modal from 'react-native-modal';


export default function LeftSideMessageModal() {
    const [modalVisible, setModalVisible] = React.useState(false);

    const mood = useContext(MoodContext)

    const addItem = text => {
        if (!text) {
            Alert.alert(
                'Write how you feeling',
                { cancelable: true },
            );
        } else {
            mood.setleftSideMessage(text);
        }
    };
    return (
        <>
            <View>
                <TouchableOpacity style={styles.message} onPress={() => setModalVisible(true)}>
                    <Text style={{ color: "white", textTransform: "capitalize" }}>{mood.leftSideMessage}</Text>
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
                            <Text>Add your message here</Text>
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
        borderWidth: 1,
        borderColor: "white",
        justifyContent: "flex-end",
        padding: 5,
        paddingRight: 0,
        position: "absolute",
        top: 20,

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