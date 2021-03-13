import React, { useContext } from 'react';
import { StyleSheet, Image } from 'react-native';
import { MoodContext } from '../App';

const CustomMarker = () => {
    const mood = useContext(MoodContext)
    // console.log(mood.value + " in customMaker");
    return (
        <Image
            style={styles.image}
            source={
                mood.value == 0 ? require('../Assets/0.jpg')
                    : mood.value == 1 ? require('../Assets/0.jpg')
                        : mood.value == 2 ? require('../Assets/1.jpg')
                            : mood.value == 3 ? require('../Assets/1.jpg')
                                : mood.value == 4 ? require('../Assets/2.jpg')
                                    : mood.value == 5 ? require('../Assets/3.jpg')
                                        : mood.value == 6 ? require('../Assets/4.jpg')
                                            : mood.value == 7 ? require('../Assets/5.jpg')
                                                : require('../Assets/prettyman.png')

            }
            resizeMode="contain"
        />
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