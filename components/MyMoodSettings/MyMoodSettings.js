import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider'


// import CustomMarker from '../CustomMarker';
// import SetAvatarMessageModal from '../Modal/SetAvatarMessageModal';
// import LeftSideMessageModal from '../Modal/LeftSideMessageModal';
// import RightSideMessageModal from '../Modal/RightSideMessageModal';
// import { MoodContext } from '../App';
// import AvatarImagePicker from '../components/Modal/AvatarImagePicker'

// import gradient from '../Assets/gradient.png'
import bg from '../../assets/css-gradient.png'

import CustomLabel from '../CustomLabel/CustomLabel.js'


export default class MyMoodSettings extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            images: null,
            values:[]
        };
    }
    // mood = useContext(MoodContext)


    render() {
        return (
                        <ImageBackground 
                        source={bg} 
                        style={{
                            resizeMode: "cover",
                            justifyContent: "center",
                            height: "100%"
                        }}>
                            <Text style={styles.titleText}>My Mood Settings</Text>
                            <View style={styles.container}>
                                {/* <ImageBackground 
                                    // source={gradient} 
                                    // style={styles.trackBgImage}
                                    > */}
                                    <MultiSlider
                                        selectedStyle={{
                                            backgroundColor: 'transparent',
                                        }}
                                        unselectedStyle={{
                                            backgroundColor: 'transparent',
                                        }}
                                        values={[5]}
                                        min={0}
                                        max={6}
                                        step={1}
                                        
                                        containerStyle={{
                                            height: 30,
                                            borderColor: "white",
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
                                        // customMarker={CustomMarker}
                                        // customLabel={CustomLabel}
                                        sliderLength={300}
                                        // pressedMarkerStyle={{backgroundColor:'#D3D3D3'}}
                                        markerStyle={{height:50,width:50}}

                                        onValuesChangeFinish={(values) => this.setState({values:values})}
                                    />

                                {/* </ImageBackground> */}

                                {/* <SetAvatarMessageModal setMessage={mood.setMessage} value={mood.value} /> */}

                                {/* sad and happy indicators */}
                                <View style={styles.leftAndRightContainer}>
                                    <View style={{
                                        flex: 1,
                                        width: 100,
                                        height: "100%",
                                    }}>
                                        {/* <LeftSideMessageModal /> */}
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        width: 100,
                                        height: "100%",
                                        alignItems: "flex-end",
                                    }}>
                                        {/* <RightSideMessageModal /> */}
                                    </View>
                                </View>
                                {/* end */}
                                
                            </View>

                            {/* <AvatarImagePicker /> */}

                        </ImageBackground>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150

    },
    leftAndRightContainer: {
        marginBottom: 320,
        flexDirection: "row",
        height: 80,
        paddingHorizontal: 30,
    },
    trackBgImage: {
        resizeMode: "cover",
        justifyContent: "center",
        width: 300,
        height: 40,
    },
    titleText: {
        textAlign: "center",
        fontSize: 30,
        color: "white",
        paddingVertical: 10,
        marginTop: 30
    },


});