import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AddMessage from '../AddMessage/AddMessage.js';
import Icon from 'react-native-vector-icons/Ionicons';
import { MoodContext } from '../../../../../App';
import Modal from 'react-native-modal';



export default function AvatarMessageModal({setMessage}) {
    // const [modalVisible, setModalVisible] = React.useState(false);

    const mood = useContext(MoodContext)


    const addItem = text => {
        if (!text) {
            Alert.alert(
                'Write how you feeling',
                { cancelable: true },
            );
        } else {
            // mood.setMessage(text);
            setMessage(text)
        }
    };
    return (
        <>

            {/* little message */}

                <TouchableOpacity
                    style={styles.openButton}
                    onPress={() => {
                        mood.setModalVisible(!mood.modalVisible);
                    }}>
                    <Icon name="chatbubble-ellipses-outline" size={30} color="white" />
                </TouchableOpacity>


            <View style={styles.centeredView}>
                <Modal
                    backdropTransitionOutTiming={0}
                    onBackdropPress={() => mood.setModalVisible(!mood.modalVisible)}
                    isVisible={mood.modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text>Add your message here</Text>
                            <View style={{ marginTop: 20 }}>
                                {/* add button */}
                                <AddMessage placeHolder="e.g.: Feeling like an Icecream :)" addItem={addItem} setModalVisible={() => mood.setModalVisible(!mood.modalVisible)} />
                            </View>

                            <TouchableOpacity
                                style={{ ...styles.openButton2, marginTop: 10 }}
                                onPress={() => {
                                    mood.setModalVisible(!mood.modalVisible);
                                }}
                            >
                                <Icon name="close-outline" size={30} color="#373737" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

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
    openButton2: {
        position: "absolute",
        top: 0,
        right: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
        padding: 10
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

});