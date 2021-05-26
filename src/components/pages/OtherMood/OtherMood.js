import React, { useContext } from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, View, Text } from 'react-native';

import CustomMarker from '../MyMoodSettings/CustomMarker/CustomMarker';
import { MoodContext } from '../../../../App';

import gradient from '../../../assets/images/gradient.png';
import bg from '../../../assets/images/css-gradient.png';
import ShowAvatarMessageModal from '../MyMoodSettings/Modal/ShowAvatarMessageModal';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';


export default function OtherMood() {
    const mood = useContext(MoodContext)
    const fall = new Animated.Value(1);
    // console.log(" in other Mood: "+ mood.value);
    return (
        <>
            <ImageBackground source={bg} style={{
                resizeMode: "cover",
                justifyContent: "center",
                height: "100%",
            }}>
                <View style={styles.container}>
                <Animated.View style={{
                margin: 20,
                opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
            }}>
                <View style={{ alignItems: 'center' }}>
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
                                    uri: mood.image,
                                }}
                                style={{ height: 100, width: 100 }}
                                imageStyle={{ borderRadius: 15 }}>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    {!mood.image ? <Icon
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
                                        }}
                                    /> : null}
                                </View>
                            </ImageBackground>
                        </View>
                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold', color: "#fff" }}>
                        John Doe
                    </Text>
                </View>
            </Animated.View>
                    <ImageBackground source={gradient} style={styles.trackBgImage}>
                        <View style={{
                            position: "absolute", left: mood.values == 10 ? "80%" : (mood.values * 10 - 10) + "%"
                        }}>
                            <CustomMarker />
                        </View>


                    </ImageBackground>
                    <View style={{ position: "absolute", top: 180, left: mood.values == 10 ? "80%" : mood.values == 0 ? "10%" : (mood.values * 10) + "%" }}>
                        <ShowAvatarMessageModal />
                    </View>

                    {/* sad and happy indicators */}
                    <View style={styles.leftAndRightContainer}>
                        <View >
                            <Text style={styles.indicatorsMessage}>{mood.leftSideMessage}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: "flex-end",
                        }}>
                            <Text style={styles.indicatorsMessage}>{mood.rightSideMessage}</Text>
                        </View>
                    </View>
                    {/* end */}

                </View>

            </ImageBackground>


        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        // marginTop: 150
        paddingTop: 100

    },
    leftAndRightContainer: {
        marginBottom: 320,
        flexDirection: "row",
        height: 80,
        paddingHorizontal: 30
    },
    trackBgImage: {
        resizeMode: "cover",
        justifyContent: "center",
        width: 300,
        height: 40,
        marginTop: 50
    },
    titleText: {
        textAlign: "center",
        fontSize: 30,
        color: "white",
        paddingVertical: 10,
        marginBottom: 30
    },
    indicatorsMessage: {
        width: 100,
        color: "white",
        borderColor: "white",
        borderWidth: 1,
        marginTop: 50,
        padding: 10,
        textAlign: "center"
    }

});