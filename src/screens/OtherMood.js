import React, { useContext } from 'react';
import { ImageBackground, StyleSheet, View, Text, StatusBar } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

import { MoodContext } from '../../App';
import CustomMarker from '../components/CustomMarker';
import gradient from '../assets/images/gradient.png';
import bg from '../assets/images/css-gradient.png';
import ShowAvatarMessageModal from '../components/Modal/ShowAvatarMessageModal';
import CustomLabel from '../components/CustomLabel';


export default function OtherMood() {
    const mood = useContext(MoodContext)
    // const fall = new Animated.Value(1);
    // console.log(" in other Mood: "+ mood.value);
    return (
        <>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <StatusBar backgroundColor='#fff' barStyle="dark-content" />
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {/* User image */}
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
                                {!mood.moodObj.image ? <Icon
                                    name="camera"
                                    size={35}
                                    color="#4f6367"
                                    style={{
                                        opacity: 0.7,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: '#4f6367',
                                        borderRadius: 10,
                                        padding: 30
                                    }}
                                /> : null}
                            </View>
                        </ImageBackground>
                        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold', color: "#4f6367" }}>
                            {mood.moodObj.username}
                        </Text>
                    </View>
                    {/* end of User image */}

                </View>


                {/* mood slider */}
                <View style={styles.container}>
                    <ImageBackground source={gradient} style={styles.trackBgImage}>
                        <MultiSlider
                            selectedStyle={{
                                backgroundColor: 'transparent',
                            }}
                            unselectedStyle={{
                                backgroundColor: 'transparent',
                            }}
                            values={[mood.moodObj.sliderValues]}
                            min={0}
                            max={10}
                            step={1}
                            containerStyle={{
                                height: 30,
                                borderColor: '#4f6367',
                                borderWidth: 1,
                            }}
                            trackStyle={{
                                height: 50,
                                backgroundColor: 'red',
                            }}
                            touchDimensions={{
                                height: 100,
                                width: 100,
                                borderRadius: 20,
                                slipDisplacement: 200,
                            }}
                            markerOffsetY={20}
                            markerSize={0}
                            customLabel={CustomLabel}
                            customMarker={CustomMarker}
                            sliderLength={300}
                            enabledOne={false}
                            // pressedMarkerStyle={{backgroundColor:'#D3D3D3'}}
                            markerStyle={{ height: 50, width: 50 }}
                        />
                    </ImageBackground>

                    {/* Users Message */}
                    <View style={{
                        position: "absolute", top: 0, left: mood.moodObj.sliderValues == 10 ? "80%" :
                            mood.moodObj.sliderValues == 0 ? "10%" : mood.moodObj.sliderValues == 9 ? "80%" : (mood.moodObj.sliderValues * 10) + "%"
                    }}>
                        <ShowAvatarMessageModal />
                    </View>
                    {/* end of Users Message */}


                    {/* sad and happy indicators */}
                    <View style={styles.leftAndRightContainer}>
                        <View style={{
                            position: 'absolute',
                            top: -50,
                            left: -160
                        }}>
                            <Text style={styles.indicatorsMessage}>{mood.moodObj.leftSideMessage}</Text>
                        </View>
                        <View style={{
                            position: 'absolute',
                            top: -50,
                            right: -150
                        }}>
                            <Text style={styles.indicatorsMessage}>{mood.moodObj.rightSideMessage}</Text>
                        </View>
                    </View>
                    {/* end */}

                </View>
                {/* end of mood slider*/}

            </View>


        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
    },
    leftAndRightContainer: {
        flexDirection: "row",
        height: 80,
        paddingHorizontal: 30,
    },
    trackBgImage: {
        resizeMode: 'cover',
        justifyContent: 'center',
        width: 300,
        height: 30,
    },
    titleText: {
        textAlign: "center",
        fontSize: 30,
        color: "#4f6367",
        paddingVertical: 10,
        marginBottom: 30
    },
    indicatorsMessage: {
        width: 100,
        color: "#4f6367",
        marginTop: 50,
        padding: 10,
        textAlign: "center",
    }

});