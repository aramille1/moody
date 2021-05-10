import React, { useContext } from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';

import CustomMarker from '../MyMoodSettings/CustomMarker/CustomMarker';
import { MoodContext } from '../../../../App';

import gradient from '../../../assets/images/gradient.png';
import bg from '../../../assets/images/css-gradient.png';
import ShowAvatarMessageModal from '../MyMoodSettings/Modal/ShowAvatarMessageModal';


export default function OtherMood() {
    const mood = useContext(MoodContext)

    // console.log(" in other Mood: "+ mood.value);
    return (
        <>
            <ImageBackground source={bg} style={{
                resizeMode: "cover",
                justifyContent: "center",
                height: "100%",
            }}>
                <View style={styles.container}>
                    <Text style={styles.titleText}>Other Mood</Text>
                    <ImageBackground source={gradient} style={styles.trackBgImage}>
                        <View style={{
                            position: "absolute", left: mood.values == 10 ? "80%" : (mood.values * 10 - 10) + "%"
                        }}>
                            <CustomMarker />
                        </View>


                    </ImageBackground>
                    <View style={{ position: "absolute", top: 120, left: mood.values == 10 ? "80%" : mood.values == 0 ? "10%" : (mood.values * 10) + "%" }}>
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
        borderColor: "black",
        borderWidth: 3,
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