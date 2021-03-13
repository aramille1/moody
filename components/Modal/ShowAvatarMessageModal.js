import React, { useContext } from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import { MoodContext } from '../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';


export default function ShowAvatarMessageModal() {
    const mood = useContext(MoodContext)

    // console.log(mood.value + " mood value")
    return (
        <>
            <View>
                <TouchableHighlight
                    onPress={() => mood.setShowAvatarMessageModal(true)}>
                    <Icon name="chatbubble-ellipses-outline" size={30} color="white" />
                </TouchableHighlight>
            </View >

            <Modal
                backdropTransitionOutTiming={0}
                isVisible={mood.showAvatarMessageModal}
                onBackdropPress={() => mood.setShowAvatarMessageModal(!mood.showAvatarMessageModal)}>
                <View style={{ padding: 50, backgroundColor: "white", borderRadius: 20 }}>
                    <Text>{mood.message}!</Text>

                    <TouchableHighlight
                        style={{ ...styles.openButton2, marginTop: 10 }}
                        onPress={() => mood.setShowAvatarMessageModal(!mood.showAvatarMessageModal)}
                    >
                        <Icon name="close-outline" size={30} color="#373737" />
                    </TouchableHighlight>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    openButton2: {
        position: "absolute",
        top: 0,
        right: 10
    }
})