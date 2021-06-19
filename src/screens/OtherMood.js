import React, { useContext } from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';
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
            <ImageBackground 
                source={bg} 
                style={{
                resizeMode: "cover",
                justifyContent: "center",
                height: "100%",
            }}>
                <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 120,
                            marginBottom: 70
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
                            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold', color: "#fff" }}>
                                {mood.moodObj.username}
                            </Text>
                        </View>
                </View>

                    {/* <ImageBackground source={gradient} style={styles.trackBgImage}>
                        <View style={{
                            position: "absolute", left: mood.moodObj.sliderValues == 10 ? "80%" : (mood.moodObj.sliderValues * 10 - 10) + "%"
                        }}>
                            <CustomMarker />
                        </View>


                    </ImageBackground> */}

                    <View style={styles.container}>
                        {/* mood slider */}
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
                                    borderColor: 'white',
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
                        {/* end of mood slider*/}
                    </View>


                    <View style={{
                        position: "absolute", top: 205, left: mood.moodObj.sliderValues == 10 ? "90%" :
                            mood.moodObj.sliderValues == 0 ? "10%" : mood.moodObj.sliderValues == 9 ? "80%" : (mood.moodObj.sliderValues * 10) + "%"
                    }}>
                        <ShowAvatarMessageModal />
                    </View>

                    {/* sad and happy indicators */}
                    <View style={styles.leftAndRightContainer}>
                        <View >
                            <Text style={styles.indicatorsMessage}>{mood.moodObj.leftSideMessage}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: "flex-end",
                        }}>
                            <Text style={styles.indicatorsMessage}>{mood.moodObj.rightSideMessage}</Text>
                        </View>
                    </View>
                    {/* end */}

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
        marginTop: 180,
    },
    container2:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 180,

    },
    leftAndRightContainer: {
        marginBottom: 320,
        flexDirection: "row",
        height: 80,
        paddingHorizontal: 30
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