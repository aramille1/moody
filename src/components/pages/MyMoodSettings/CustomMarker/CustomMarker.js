import React, { useContext } from 'react';
import { StyleSheet, Image } from 'react-native';
import { MoodContext } from '../MyMoodSettings';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { AnimatedEmoji } from 'react-native-animated-emoji';
import Emoji from '../../../../../node_modules/react-native-emoji';


const CustomMarker = () => {
    const mood = useContext(MoodContext)
    // console.log(mood.value + " in customMaker");
    return (

                mood.values == 0 ? <Emoji name="rage" style={{fontSize: 40}} />
                    : mood.values == 1 ? <Emoji name="cry" style={{fontSize: 40}} />
                        : mood.values == 2 ? <Emoji name="disappointed" style={{fontSize: 40}} />
                            : mood.values == 3 ? <Emoji name="worried" style={{fontSize: 40}} />
                                : mood.values == 4 ? <Emoji name="unamused" style={{fontSize: 40}} />
                                    : mood.values == 5 ? <Emoji name="neutral_face" style={{fontSize: 40}} />
                                        : mood.values == 6 ? <Emoji name="slightly_smiling_face" style={{fontSize: 40}} />
                                            : mood.values == 7 ? <Emoji name="smiley" style={{fontSize: 40}} />
                                                : mood.values == 8 ? <Emoji name="blush" style={{fontSize: 40}} />
                                                    : mood.values == 9 ? <Emoji name="heart_eyes" style={{fontSize: 40}} />
                                                        : mood.values == 10 ? <Emoji name="star-struck" style={{fontSize: 40}} />
                                                            : <Emoji name="smiley" style={{fontSize: 40}} />

            
    );
}

const styles = StyleSheet.create({
    image: {
        height: 120,
        width: 80,
        borderRadius: 50,
    },
});

export default CustomMarker;