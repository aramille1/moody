import React, { useContext } from 'react';
import { ImageBackground, TextInput, StyleSheet, Text, TouchableOpacity,ScrollView, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { MoodContext } from '../../../App';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function AvatarImagePicker({ setImageProp }) {

    const [image, setImage] = React.useState();
    const mood = useContext(MoodContext)
    const [visible, setVisible] = React.useState(false)
    const [username, setUsername] = React.useState('username')


    const onSignIn = () => {
        mood.setUsername(username)
        console.log(1)
        setVisible(false)
    
      }
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
        }).catch(error => {
            alert(error)
        })
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
                snapPoints={[420, -200]}
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
                                        uri: mood.moodObj.image,
                                    }}
                                    style={{ height: 100, width: 100 }}
                                    imageStyle={{ borderRadius: 15 }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setVisible(true)}>
                            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold', color: "#4f6367" }}>
                                {mood.moodObj.username}
                            </Text>
                        </TouchableOpacity>
                        <Modal
                            backdropTransitionOutTiming={0}
                            onBackdropPress={() => setVisible(false)}
                            isVisible={visible}
                            style={{ backgroundColor: "white", borderRadius: 20, position: 'absolute', top: '25%' }}>

                            <View style={{ marginLeft: 20, marginTop: 30, marginBottom: 0 }}><Text style={{ color: '#05375a', fontSize: 30, }}>What's your name?</Text></View>
                            <View
                                style={styles.footer}
                            >
                                <ScrollView>
                                    <View style={styles.actionInModal}>
                                        <FontAwesome
                                            name="user-o"
                                            color="#05375a"
                                            size={20}
                                        />
                                        <TextInput
                                            placeholder="Your Username"
                                            style={styles.textInputinModal}
                                            autoCapitalize="none"
                                            onChangeText={(val) => setUsername(val)}
                                        />
                                    </View>
                                </ScrollView>
                            </View>

                            <View style={styles.buttonSave}>
                                <TouchableOpacity style={styles.btnSave} onPress={onSignIn}>

                                    <Text style={styles.textSign}>Save</Text>

                                    <MaterialIcons
                                        name="navigate-next"
                                        color="#fff"
                                        size={20}
                                    />

                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnSkip} onPress={() => setVisible(false)}>

                                    <Text style={{ color: '#4f6367', fontWeight: 'bold', display: 'flex' }}>Skip</Text>

                                    <MaterialIcons
                                        name="navigate-next"
                                        color="#4f6367"
                                        size={20}
                                    />

                                </TouchableOpacity>
                            </View>

                        </Modal>
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
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderRightColor: 'black',
        borderLeftColor: 'black'

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
        borderColor: 'black',
        borderWidth: 1,
        borderBottomWidth: 0
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
        backgroundColor: '#009387',
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

    footer: {
        // flex: Platform.OS === 'ios' ? 3 : 9,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        // marginHorizontal: 15,
      },
      actionInModal: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
      },
      textInputinModal: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
      },
      btnSave: {
        backgroundColor: '#009387',
        paddingHorizontal: 140,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        margin: 10
      },
      btnSkip: {
        backgroundColor: '#fff',
        paddingHorizontal: 140,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
      },
      textSign: {
        color: '#fff',
        fontWeight: 'bold',
    
      },
});