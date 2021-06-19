import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

import { MoodContext } from '../../../App';

export default function ShowAvatarMessageModal() {
    const mood = useContext(MoodContext)

    // console.log(mood.value + " mood value")
    return (
        <>
            <View>
                <TouchableOpacity
                    onPress={() => mood.setShowAvatarMessageModal(!mood.showAvatarMessageModal)}>
                    <Icon name="chatbubble-ellipses-outline" size={30} color="white" />
                </TouchableOpacity>
            </View >

            <Modal
                backdropTransitionOutTiming={0}
                onBackdropPress={() => mood.setShowAvatarMessageModal(!mood.showAvatarMessageModal)}
                isVisible={mood.showAvatarMessageModal}
                >
                <View style={{ padding: 50, backgroundColor: "white", borderRadius: 20 }}>
                    <Text style={{textAlign:'center', fontSize: 22}}>{mood.moodObj.message}</Text>

                    <TouchableOpacity
                        style={{ ...styles.openButton2, marginTop: 10 }}
                        onPress={() => mood.setShowAvatarMessageModal(!mood.showAvatarMessageModal)}
                    >
                        <Icon name="close-outline" size={30} color="#373737" />
                    </TouchableOpacity>
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