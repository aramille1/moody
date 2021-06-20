import React, { useContext } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Emoji from 'react-native-emoji';
import FlashMessage, { showMessage } from "react-native-flash-message";
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'
// import CustomMarker from './CustomMarker/CustomMarker.js';
import SetAvatarMessageModal from '../components/Modal/SetAvatarMessageModal';
import LeftSideMessageModal from '../components/Modal/LeftSideMessageModal';
import RightSideMessageModal from '../components/Modal/RightSideMessageModal';
import { MoodContext } from '../../App';
import AvatarImagePicker from '../components/Modal/AvatarImagePicker'
import gradient from '../assets/images/gradient.png';
import bg from '../assets/images/css-gradient.png';
// import Icon from 'react-native-vector-icons/Ionicons';


import CustomLabel from '../components/CustomLabel';

export default function MyMoodSettings() {
  const [image, setImage] = React.useState()
  const [message, setMessage] = React.useState()
  const [sliderValues, setSliderValues] = React.useState(5)
  const [leftSideMessage, setleftSideMessage] = React.useState('sad')
  const [rightSideMessage, setrightSideMessage] = React.useState('happy')

  const mood = useContext(MoodContext)

  const submit = () => {
    let obj = {
      image: image,
      message: message,
      sliderValues: sliderValues,
      leftSideMessage: leftSideMessage,
      rightSideMessage: rightSideMessage,
      username: mood.moodObj.username
    }
    mood.setMoodObj(obj)
    showMessage({
      message: "Saved!",
      type: "success",
    });
  }

  const customMarker = () => {
    return sliderValues == 0 ? <Emoji name="rage" style={{ fontSize: 40 }} />
      : sliderValues == 1 ? <Emoji name="cry" style={{ fontSize: 40 }} />
        : sliderValues == 2 ? <Emoji name="disappointed" style={{ fontSize: 40 }} />
          : sliderValues == 3 ? <Emoji name="worried" style={{ fontSize: 40 }} />
            : sliderValues == 4 ? <Emoji name="unamused" style={{ fontSize: 40 }} />
              : sliderValues == 5 ? <Emoji name="neutral_face" style={{ fontSize: 40 }} />
                : sliderValues == 6 ? <Emoji name="slightly_smiling_face" style={{ fontSize: 40 }} />
                  : sliderValues == 7 ? <Emoji name="smiley" style={{ fontSize: 40 }} />
                    : sliderValues == 8 ? <Emoji name="blush" style={{ fontSize: 40 }} />
                      : sliderValues == 9 ? <Emoji name="heart_eyes" style={{ fontSize: 40 }} />
                        : sliderValues == 10 ? <Emoji name="star-struck" style={{ fontSize: 40 }} />
                          : <Emoji name="smiley" style={{ fontSize: 40 }} />
  }

  return (
    <>
      <ImageBackground
        // source={bg}
        style={{
          backgroundColor:'#fff',
          // backgroundColor:'#4f6367',
          resizeMode: 'cover',
          justifyContent: 'center',
          height: '100%',
        }}>
        {/* <Text style={styles.titleText}>My Mood Settings</Text> */}
        <StatusBar backgroundColor='#fff' barStyle="dark-content"/>
        <AvatarImagePicker setImageProp={(image) => setImage(image)} />
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
                borderColor: 'black',
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
              customMarker={customMarker}
              sliderLength={300}
              // pressedMarkerStyle={{backgroundColor:'#D3D3D3'}}
              markerStyle={{ height: 50, width: 50 }}
              onValuesChangeFinish={(values) =>
                // mood.setValues(values)
                setSliderValues(values)
              }
            />
          </ImageBackground>
          {/* end of mood slider*/}

          <View style={{
            position: "absolute", top: -175, left: sliderValues == 10 ? "90%" :
              sliderValues == 0 ? "10%" : sliderValues == 9 ? "80%" : (sliderValues * 10) + "%"
          }}>
            <SetAvatarMessageModal setMessage={(message) => setMessage(message)} />
          </View>

          {/* sad and happy indicators */}
          {/* <Text style={{ color: 'black' }}>{sliderValues}</Text> */}
          <View style={styles.leftAndRightContainer}>
            <View
              style={{
                flex: 1,
                width: 100,
                height: '100%',
              }}>
              <LeftSideMessageModal leftSideMessage={leftSideMessage} setLeftsideMessageProp={(value) => setleftSideMessage(value)} />
            </View>
            <View
              style={{
                flex: 1,
                width: 100,
                height: '100%',
                alignItems: 'flex-end',
              }}>
              <RightSideMessageModal rightSideMessage={rightSideMessage} setRightsideMessageProp={(value) => setrightSideMessage(value)} />
            </View>

          </View>
          {/* end of sad and happy indicators */}


          <View style={{ position: 'absolute', top:130, borderRadius: 10,backgroundColor: '#56a1a8' }}>
            <TouchableOpacity style={{ paddingHorizontal: 150, paddingVertical: 15 }}
              onPress={submit}
            >
              <Text style={{ fontSize: 20, color: '#fff', }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* end of mood slider */}
        <FlashMessage position="top" floating/>
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
  image: {
    height: 120,
    width: 80,
    borderRadius: 50,
  },
});
