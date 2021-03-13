import React, { Component } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, TouchableHighlight } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
// import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { MoodContext } from '../../App';


const styles = StyleSheet.create({

    button: {
        backgroundColor: 'blue',
        marginBottom: 10,
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    modal: {
        // width: 500,
        // height: 500,
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    uploadImg: {
        borderColor: "white",
        borderWidth: 1,
        width: 100,
        // flex: 1,
        padding: 5,
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 20
    },
    openButton2: {
        position: "absolute",
        top: 0,
        right: 10
    },
});

export default class AvatarImagePicker extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            images: null,
        };
    }

    pickSingleWithCamera(cropping, mediaType = 'photo') {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 500,
            height: 500,
            includeExif: true,
            mediaType,
        })
            .then((image) => {
                console.log('received image', image);
                this.setState({
                    image: {
                        uri: image.path,
                        width: image.width,
                        height: image.height,
                        mime: image.mime,
                    },
                    images: null,
                });
            })
            .catch((e) => alert(e));
    }



    cleanupImages() {
        ImagePicker.clean()
            .then(() => {
                console.log('removed tmp images from tmp directory');
            })
            .catch((e) => {
                alert(e);
            });
    }

    cleanupSingleImage() {
        let image =
            this.state.image ||
            (this.state.images && this.state.images.length
                ? this.state.images[0]
                : null);
        console.log('will cleanup image', image);

        ImagePicker.cleanSingle(image ? image.uri : null)
            .then(() => {
                console.log(`removed tmp image ${image.uri} from tmp directory`);
            })
            .catch((e) => {
                alert(e);
            });
    }

    cropLast() {
        if (!this.state.image) {
            return Alert.alert(
                'No image',
                'Before open cropping only, please select image'
            );
        }

        ImagePicker.openCropper({
            path: this.state.image.uri,
            width: 200,
            height: 200,
        })
            .then((image) => {
                console.log('received cropped image', image);
                this.setState({
                    image: {
                        uri: image.path,
                        width: image.width,
                        height: image.height,
                        mime: image.mime,
                    },
                    images: null,
                });
            })
            .catch((e) => {
                console.log(e);
                Alert.alert(e.message ? e.message : e);
            });
    }

    pickSingle(cropit, circular = false, mediaType) {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: cropit,
            cropperCircleOverlay: circular,
            sortOrder: 'none',
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
            cropperStatusBarColor: 'white',
            cropperToolbarColor: 'white',
            cropperActiveWidgetColor: 'white',
            cropperToolbarWidgetColor: '#3498DB',
        })
            .then((image) => {
                console.log('received image', image);
                this.setState({
                    image: {
                        uri: image.path,
                        width: image.width,
                        height: image.height,
                        mime: image.mime,
                    },
                    images: null,
                });
            })
            .catch((e) => {
                console.log(e);
                Alert.alert(e.message ? e.message : e);
            });
    }


    scaledHeight(oldW, oldH, newW) {
        return (oldH / oldW) * newW;
    }


    renderImage(image) {
        return (
            <Image
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
                source={image}
            />
        );
    }

    renderAsset(image) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
            return this.renderVideo(image);
        }

        return this.renderImage(image);
    }

    render() {
        return (
            <MoodContext.Consumer>
                {
                    mood => <>
                        <TouchableOpacity style={styles.uploadImg} onPress={() => mood.setImgPickerModal(true)}>
                            <Text style={{ color: "white" }}>upload / edit</Text>
                            <Text style={{ color: "white" }}>profile photo</Text>
                        </TouchableOpacity>
                        <Modal
                            backdropTransitionOutTiming={0}
                            isVisible={mood.imgPickerModal}
                            onBackdropPress={() => mood.setImgPickerModal(!mood.imgPickerModal)}
                            style={styles.modal}>
                            <ScrollView style={{ borderWidth: 1, borderColor: "black", width: "100%" }}>
                                {this.state.image ? this.renderAsset(this.state.image) : null}
                                {this.state.images
                                    ? this.state.images.map((i) => (
                                        <View key={i.uri}>{this.renderAsset(i)}</View>
                                    ))
                                    : null}
                            </ScrollView>

                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <TouchableOpacity
                                    style={{ padding: 5 }}
                                    onPress={() => this.pickSingleWithCamera(true)}
                                // style={styles.button}
                                >
                                    <Icon name="camera-outline" size={30} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ padding: 5 }}
                                    onPress={() => this.cropLast()}>
                                    <Icon name="crop-outline" size={30} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ padding: 5 }}
                                    onPress={() => this.pickSingle(true)}
                                >
                                    <Icon name="cloud-upload-outline" size={30} />
                                </TouchableOpacity>

                                {/* <TouchableOpacity
                    onPress={this.cleanupImages.bind(this)}
                    style={styles.button}
                >
                    <Text style={styles.text}>Cleanup All Images</Text>
                </TouchableOpacity> */}
                                <TouchableOpacity
                                    style={{ padding: 5 }}
                                    onPress={this.cleanupSingleImage.bind(this)}
                                >
                                    <Icon name="trash-outline" size={30} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ padding: 5, borderWidth: 1, borderColor: "black", height: 40 }}
                                >
                                    <Text>Upload!</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableHighlight
                                style={{ ...styles.openButton2, marginTop: 10 }}
                                onPress={() => {
                                    mood.setImgPickerModal(!mood.imgPickerModal);
                                }}
                            >
                                <Icon name="close-outline" size={30} color="#373737" />
                            </TouchableHighlight>

                        </Modal>
                    </>

                }
            </MoodContext.Consumer>
        );
    }
}