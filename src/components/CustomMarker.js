import React, { useContext } from 'react';
import { StyleSheet, Image } from 'react-native';
import { MoodContext } from '../../App';
import Emoji from '../../node_modules/react-native-emoji';


const CustomMarker = () => {
    const mood = useContext(MoodContext)
    return (     
        <Image
            source={{uri: mood.moodObj.image}}
            style={{borderRadius: 45, height: 90, width: 70 }}>
        </Image>

                // mood.moodObj.sliderValues == 0 ? <Emoji name="rage" style={{fontSize: 40}} />
                //     : mood.moodObj.sliderValues == 1 ? <Emoji name="cry" style={{fontSize: 40}} />
                //         : mood.moodObj.sliderValues == 2 ? <Emoji name="disappointed" style={{fontSize: 40}} />
                //             : mood.moodObj.sliderValues == 3 ? <Emoji name="worried" style={{fontSize: 40}} />
                //                 : mood.moodObj.sliderValues == 4 ? <Emoji name="unamused" style={{fontSize: 40}} />
                //                     : mood.moodObj.sliderValues == 5 ? <Emoji name="neutral_face" style={{fontSize: 40}} />
                //                         : mood.moodObj.sliderValues == 6 ? <Emoji name="slightly_smiling_face" style={{fontSize: 40}} />
                //                             : mood.moodObj.sliderValues == 7 ? <Emoji name="smiley" style={{fontSize: 40}} />
                //                                 : mood.moodObj.sliderValues == 8 ? <Emoji name="blush" style={{fontSize: 40}} />
                //                                     : mood.moodObj.sliderValues == 9 ? <Emoji name="heart_eyes" style={{fontSize: 40}} />
                //                                         : mood.moodObj.sliderValues == 10 ? <Emoji name="star-struck" style={{fontSize: 40}} />
                //                                             : <Emoji name="smiley" style={{fontSize: 40}} />

            
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