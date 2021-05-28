import React, { useContext } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
// import Modal from 'react-native-modal';
import { MoodContext } from '../../../../../App';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';


export default function AvatarImagePicker({ setImageProp }) {

    const [image, setImage] = React.useState();
    const mood = useContext(MoodContext)


    // const cleanupImages = () => {
    //     ImagePicker.clean()
    //         .then(() => {
    //             console.log('removed tmp images from tmp directory');
    //         })
    //         .catch((e) => {
    //             alert(e);
    //         });
    // }

    // const deleteImage = () => {
    //     ImagePicker.cleanSingle(image ? image.uri : null)
    //         .then(() => {
    //             console.log(`removed tmp image ${image.uri} from tmp directory`);
    //         })
    //         .catch((e) => {
    //             alert(e);
    //         });
    // }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            // mood.setImage(image.path);
            setImage(image.path)
            setImageProp(image.path)
            sheetRef.current.snapTo(1);
        });
    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            // mood.setImage(image.path);
            setImage(image.path)
            setImageProp(image.path)
            sheetRef.current.snapTo(1);
        });
    }


    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
                <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => sheetRef.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );
    const sheetRef = React.useRef();
    const fall = new Animated.Value(1);

    return (
        <>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[410, -200]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                callbackNode={fall}
                initialSnap={1}
                enabledGestureInteraction={true}
            />
            <View style={styles.container}>
                <Animated.View style={{
                    margin: 20,
                    opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => sheetRef.current.snapTo(0)}>
                            <View
                                style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <ImageBackground
                                    source={{
                                        uri: image,
                                    }}
                                    style={{ height: 100, width: 100 }}
                                    imageStyle={{ borderRadius: 15 }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        {!mood.moodObj.image ? <Icon
                                            name="camera"
                                            size={35}
                                            color="#fff"
                                            style={{
                                                opacity: 0.7,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderWidth: 1,
                                                borderColor: '#fff',
                                                borderRadius: 10,
                                                padding: 30
                                            }}
                                        /> : null}
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold', color: "#fff" }}>
                            John Doe
                        </Text>
                    </View>
                </Animated.View>
            </View>
        </>
    );
}



const styles = StyleSheet.create({
    // container: {
    //     flex: 1,

    // },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
});