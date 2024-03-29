import React, {useContext, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import auth, {firebase} from '@react-native-firebase/auth';
import PushNotification from "react-native-push-notification";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import LeftSideMessageModal from '../components/Modal/LeftSideMessageModal';
import RightSideMessageModal from '../components/Modal/RightSideMessageModal';
import SetAvatarMessageModal from '../components/Modal/SetAvatarMessageModal';
import {MoodContext} from '../../App';
import AvatarImagePicker from '../components/Modal/AvatarImagePicker';
import gradient from '../assets/images/gradient.png';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import storage from '@react-native-firebase/storage';
import CustomLabel from '../components/CustomLabel';
import Icon from 'react-native-vector-icons/Ionicons';
import AddMessage from '../components/AddMessage';
import {
  GifSearch,
  poweredByTenorLogoWhite,
  poweredByTenorLogoGrey,
  poweredByTenorLogoBlue,
  viaTenorLogoWhite,
  viaTenorLogoGrey,
  viaTenorLogoBlue,
  poweredByGiphyLogoGrey,
  poweredByGiphyLogoWhite,
} from 'react-native-gif-search';
const GIPHY_API_KEY = 'NctafbvmG7x6Z1HyDVsd5gvB5SBf87ZE';
const DEVELOPMENT_MODE = true;
export default function MyMoodSettings({navigation}) {
  const [image, setImage] = React.useState();
  const [message, setMessage] = React.useState('empty message');
  const [tempSliderValues, setTempSliderValues] = React.useState([8]);
  const [leftSideMessage, setleftSideMessage] = React.useState('sad');
  const [rightSideMessage, setrightSideMessage] = React.useState('happy');
  const [user, setUser] = React.useState([]);
  const [userId, setUserId] = React.useState();
  const mood = useContext(MoodContext);
  const [username, setUsername] = React.useState('username');
  const [visible, setVisible] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [imageIsUploaded, setImageIsUploaded] = React.useState(false);
  const [transferred, setTransferred] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [updated, setUpdated] = React.useState(false);
  const [logedout, setLogedout] = React.useState(false);

  const [gif_url, setGif_url] = React.useState(null);
  const [gif_provider, setGif_provider] = React.useState(null);
  const [gif_type, setGif_type] = React.useState(null);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    const subscriber = firestore()
      .collection('users')
      .onSnapshot((docs) => {
        docs.forEach((doc) => {
          if (doc.data().user.phoneNumber === auth()._user._user.phoneNumber) {
            setMessage(doc.data().message);
            setUserId(doc.id); // recording user's id
            let users = user.slice();
            users.push(doc.data());
            setUser(users);
            users.forEach((user) => {
              setTempSliderValues(user.sliderValues),
              setleftSideMessage(user.leftSideMessage),
              setIsLoading(false);
              setUpdated(user.updated);
              setGif_url(user.gif)
                setUsername(user.username),
                setImage(user.image),
                setMessage(user.message);
                setrightSideMessage(user.rightSideMessage);
            });
          }
        });
      });
    return () => {
      subscriber();
      backHandler.remove();
    };
  }, []);

  const submit = () => {
    if (imageIsUploaded) {
      uploadImageToCloudStorage();
      setImageIsUploaded(false);
    } else {
      let userObject = {
        image: image,
        message: message,
        sliderValues: tempSliderValues,
        leftSideMessage: leftSideMessage,
        rightSideMessage: rightSideMessage,
        username: username,
        updated: true,
        gif: gif_url
      };
      firestore().collection('users').doc(userId).update(userObject);
      showMessage({
        message: 'Changes Saved!',
        type: 'success',
      });
    }
  };

  const uploadImageToCloudStorage = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    setUploading(true);
    setTransferred(0);

    const task = storage().ref(filename).putFile(uploadUri);

    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;
      setUploading(false);
      showMessage({
        message: 'Saved!',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
    }

    let imgRef = firebase.storage().ref(filename);

    imgRef.getDownloadURL().then((url) => {
      console.log(url);
      setImage(url);
      let userObject = {
        image: url,
        message: message,
        sliderValues: tempSliderValues,
        leftSideMessage: leftSideMessage,
        rightSideMessage: rightSideMessage,
        username: username,
        updated: true,
        gif: gif_url
      };
      firestore().collection('users').doc(userId).update(userObject);
    });
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const onSignIn = () => {
    mood.setUsername(username);

    setVisible(false);
  };

  const customMarker = () => {
    return (
      <Image source={{uri: image}} style={styles.customMarkerStyles}></Image>
    );
  };

  const setImageFunc = (img) => {
    setImage(img);
    setImageIsUploaded(true);
  };

  const onGifSelected = (gif_url, gif_object) => {
    setGif_url(gif_url);
    setGif_provider(gif_object.provider);
    setGif_type(gif_object.type);
  };

  const onGifLongPress = (gif_url, gif_object) => {
    alert(gif_url);
  };

  const handleNotifications = () =>{
    PushNotification.localNotification({
      channelId:"test-channel",
      title:"You got notification from " + auth()._user._user.phoneNumber,
      message: 'user updated the mood'
    })
  }

  return (
    <>
      <View style={styles.containerStyle}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Modal
          backdropTransitionOutTiming={0}
          onBackdropPress={() => setVisible(false)}
          isVisible={visible}
          style={styles.modalStyles}>
          <View style={styles.footer}>
            <ScrollView>
              <View style={{}}>
                <Text style={{color: '#05375a', fontSize: 30, paddingLeft: 5}}>
                  Edit Profile
                </Text>
              </View>
              <View style={styles.actionInModal}>
                {/* <FontAwesome name="user-o" color="#05375a" size={20} /> */}
                <TextInput
                  placeholder="Your Username"
                  style={styles.textInputinModal}
                  // autoCapitalize="none"
                  onChangeText={(val) => setUsername(val)}
                />
              </View>
              <View style={styles.actionInModal2}>
                <TextInput
                  placeholder="Your mood message"
                  style={styles.textInputinModal}
                  onChangeText={(val) => setMessage(val)}
                />
              </View>

              <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps={'handled'}>
                <GifSearch
                  giphyApiKey={GIPHY_API_KEY}
                  provider={'all'}
                  gifsToLoad={10}
                  maxGifsToLoad={50}
                  style={{backgroundColor: '#fff', height: 200, width: 290, paddingTop:0}}
                  textInputStyle={{color: 'black'}}
                  gifStyle={{height: 70}}
                  loadingSpinnerColor={'black'}
                  placeholderTextColor={'grey'}
                  placeholderText={'Search Gifs'}
                  stickersPlaceholderText={'Search Stickers'}
                  onGifSelected={onGifSelected}
                  onGifLongPress={onGifLongPress}
                  visible={true}
                  horizontal={true}
                  showScrollBar={true}
                  onError={(error) => {
                    console.log(error);
                  }}
                  noGifsFoundText={'No Gifs found :('}
                  noGifsFoundTextStyle={{fontWeight: 'bold'}}
                  textInputProps={{
                    autoFocus: true,
                    fontSize: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#f2f2f2',
                    marginLeft: 0,
                    paddingBottom: 0,
                  }}
                  gifType={'all'}
                  previewGifQuality={'low'}
                  selectedGifQuality={'medium'}
                />
                <View style={styles.gifPreview}>
                  {gif_url ? (
                    <View>
                      <Text style={{textAlign: 'center', fontSize: 20}}>
                        Selected {gif_type}:
                      </Text>
                      <View style={styles.gifContainer}>
                        <Image style={styles.gif} source={{uri: gif_url}} />
                        {!DEVELOPMENT_MODE ? (
                          <Image
                            source={
                              gif_provider == 'tenor'
                                ? viaTenorLogoGrey
                                : poweredByGiphyLogoGrey
                            }
                            style={styles.providerLogo}
                          />
                        ) : null}
                      </View>
                    </View>
                  ) : null}
                </View>
                <TouchableOpacity style={styles.btnSave} onPress={onSignIn}>
                  <Text style={styles.textSign}>Save</Text>

                  <MaterialIcons name="navigate-next" color="#fff" size={20} />
                </TouchableOpacity>
              </ScrollView>
            </ScrollView>
          </View>

          <TouchableOpacity
            style={{...styles.openButton2, marginTop: 10}}
            onPress={() => setVisible(false)}>
            <Icon name="close-outline" size={30} color="#373737" />
          </TouchableOpacity>
        </Modal>

        {isLoading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <>
            {/* <TouchableOpacity onPress={logout} style={{position: 'absolute', top:'2.5%', right: '35%'}}>
            <Icon name="log-out-outline" size={30}/>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={{position: 'absolute', top: '2%', right: '20%'}}>
              <Icon name="create-outline" size={30} />
            </TouchableOpacity>
            <AvatarImagePicker setImageProp={(image) => setImageFunc(image)} />

            <View>
              {/* username */}
              <Text style={styles.username}>{username}</Text>
              <View
                style={{
                  width: 300,
                  // height: 100,
                  padding: 10,
                  borderRadius: 10
                }}>
                <Text style={{textAlign: 'center', paddingVertical: 10}}>{message}</Text>
                {gif_url ? <Image style={styles.gifonMoodSettings} source={{uri: gif_url}} /> : null}
              </View>
            </View>

            <Animatable.View animation="fadeIn">
              <ImageBackground source={gradient} style={styles.trackBgImage}>
                <MultiSlider
                  selectedStyle={{
                    backgroundColor: 'transparent',
                  }}
                  unselectedStyle={{
                    backgroundColor: 'transparent',
                  }}
                  values={tempSliderValues}
                  min={0}
                  max={10}
                  step={1}
                  containerStyle={{
                    height: 30,
                    // borderColor: 'black',
                    // borderWidth: 1,
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
                  markerStyle={{height: 50, width: 50}}
                  onValuesChangeFinish={(values) => setTempSliderValues(values)}
                />
              </ImageBackground>

              {/* sad and happy indicators */}
              <View style={styles.leftAndRightContainer}>
                <View style={styles.leftsideMsg}>
                  <LeftSideMessageModal
                    leftSideMessage={leftSideMessage}
                    setLeftsideMessageProp={(value) =>
                      setleftSideMessage(value)
                    }
                  />
                </View>

                <View style={styles.rightsideMsg}>
                  <RightSideMessageModal
                    rightSideMessage={rightSideMessage}
                    setRightsideMessageProp={(value) =>
                      setrightSideMessage(value)
                    }
                  />
                </View>
              </View>
              {/* end of sad and happy indicators */}
            </Animatable.View>
            {/* end of mood slider */}

            {uploading ? (
              <View>
                <Text>{transferred}% complted</Text>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <>
                <FlashMessage position="top" floating />
                <Animatable.View animation="fadeIn">
                  <View
                    style={{
                      borderRadius: 10,
                      backgroundColor: '#009387',
                      marginBottom: 40,
                    }}>
                    <TouchableOpacity
                      style={{paddingHorizontal: 140, paddingVertical: 15}}
                      onPress={submit}>
                      <Text style={{fontSize: 18, color: '#fff'}}>Save</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={handleNotifications}>
                      <Text>Send Notification</Text>
                    </TouchableOpacity> */}
                  </View>
                </Animatable.View>
              </>
            )}

            {/* <View
              style={{
                position: 'absolute',
                top: 175,
                left:
                  tempSliderValues == 10
                    ? '80%'
                    : tempSliderValues == 0
                    ? '10%'
                    : tempSliderValues == 9
                    ? '80%'
                    : tempSliderValues * 10 + '%',
              }}>
              <SetAvatarMessageModal
                setMessage={(message) => setMessage(message)}
              />
            </View> */}
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalStyles: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 20,
    // height: '100%',
    // position: 'absolute',
    // top: '0%',
  },
  leftAndRightContainer: {
    flexDirection: 'row',
    height: 80,
  },
  trackBgImage: {
    marginTop:50,
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

  footer: {
    // flex: Platform.OS === 'ios' ? 3 : 9,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  actionInModal: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    // paddingBottom: 5,
  },
  actionInModal2: {
    flexDirection: 'row',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    // paddingBottom: 5,
  },
  textInputinModal: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 16,
  },
  spinner: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  btnSave: {
    backgroundColor: '#009387',
    paddingHorizontal: 100,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    margin: 10,
  },
  textSign: {
    color: '#fff',
    fontWeight: 'bold',
  },

  btnSkip: {
    backgroundColor: '#fff',
    paddingHorizontal: 140,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
  username: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  leftsideMsg: {
    flex: 1,
    width: 100,
    height: '100%',
    alignItems: 'flex-start',
    marginLeft: 0,
    marginTop: 10,
  },
  rightsideMsg: {
    flex: 1,
    width: 100,
    height: '100%',
    alignItems: 'flex-end',
    marginTop: 10,
    marginRight: 0,
  },
  customMarkerStyles: {
    borderRadius: 45,
    height: 90,
    width: 90,
    borderWidth: 1,
    borderColor: '#05375a',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    marginHorizontal: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton2: {
    position: 'absolute',
    top: 0,
    right: 10,
  },

  gifPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 20,
  },
  gifContainer: {
    // width: 100,
    // height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 5,
    // borderWidth: 1,
    // marginVertical: 10,
    padding: 10
  },
  gif: {
    width: 200,
    height: 100,
    borderRadius: 25,
    resizeMode: 'contain',
  },

  gifonMoodSettings: {
    width: 200,
    height: 100,
    alignSelf:'center',
    marginTop:20
  },
  providerLogo: {
    width: 190,
    height: 15,
    resizeMode: 'contain',
    marginTop: 13,
    marginBottom: 2,
  },
});
