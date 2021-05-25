import React, {Component, useContext} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import CustomMarker from './CustomMarker/CustomMarker.js';
import SetAvatarMessageModal from './Modal/SetAvatarMessageModal';
import LeftSideMessageModal from './Modal/LeftSideMessageModal';
import RightSideMessageModal from './Modal/RightSideMessageModal';
import { MoodContext } from '../../../../App';
import AvatarImagePicker from './Modal/AvatarImagePicker'
import gradient from '../../../assets/images/gradient.png';
import bg from '../../../assets/images/css-gradient.png';

import CustomLabel from './CustomLabel/CustomLabel';

export default function MyMoodSettings() {
  const mood = useContext(MoodContext)

    return (
      <>
        <ImageBackground
          source={bg}
          style={{
            resizeMode: 'cover',
            justifyContent: 'center',
            height: '100%',
          }}>
          {/* <Text style={styles.titleText}>My Mood Settings</Text> */}
          

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
                values={[5]}
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
                // pressedMarkerStyle={{backgroundColor:'#D3D3D3'}}
                markerStyle={{height: 50, width: 50}}
                onValuesChangeFinish={(values) =>
                  mood.setValues(values)
                }
              />
            </ImageBackground>
            {/* end of mood slider*/}
            
            <View style={{
                position: "absolute", top: -155, left: mood.values == 10 ? "90%" :
                    mood.values == 0 ? "10%" : mood.values == 9 ? "80%" : (mood.values * 10) + "%"
            }}>
            <SetAvatarMessageModal />
            </View>

            {/* sad and happy indicators */}
            <Text style={{color: 'black'}}>{mood.values}</Text>
            <View style={styles.leftAndRightContainer}>
              <View
                style={{
                  flex: 1,
                  width: 100,
                  height: '100%',
                }}>
                <LeftSideMessageModal />
              </View>
              <View
                style={{
                  flex: 1,
                  width: 100,
                  height: '100%',
                  alignItems: 'flex-end',
                }}>
                <RightSideMessageModal />
              </View>
            </View>
            {/* end of sad and happy indicators */}

          </View>
          {/* end of mood slider */}
          <AvatarImagePicker />
        </ImageBackground>
</>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  leftAndRightContainer: {
    marginBottom: 320,
    flexDirection: 'row',
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
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    paddingVertical: 10,
    marginTop: 30,
  },
});
