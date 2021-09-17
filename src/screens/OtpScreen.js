import React, {useState, useContext, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Keyboard,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import RNOtpVerify from 'react-native-otp-verify';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {Styles} from '../styles/Styles';
import ErrorBoundary from '../components/ErrorBoundry';
import colors from '../styles/Colors';
import {isAndroid} from '../components/HelperFunctions';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import FullButtonComponent from '../components/FullButtonComponent';
import {MoodContext} from '../../App';
const RESEND_OTP_TIME_LIMIT = 90;
const OTPScreen = function ({
  route: {
    params: {phoneNumber},
  },
  navigation,
}) {
  const mood = useContext(MoodContext);
  
  const [otpArray, setOtpArray] = useState(['', '', '', '']);
  const [submittingOtp, setSubmittingOtp] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [otp, setOtp] = useState('');
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fivthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
);
  let resendOtpTimerInterval;
  
  const refCallback = (textInputRef) => (node) => {
    textInputRef.current = node;
  };

  useEffect(() => {
    startResendOtpTimer();

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    }
  }, [resendButtonDisabledTime]);

  useEffect(() => {
    signInWithPhoneNumber();

    RNOtpVerify.getHash()
    .then(console.log)
    .catch(console.log);

    RNOtpVerify.getOtp()
      .then((p) => RNOtpVerify.addListener(otpHandler))
      .catch((p) => console.log(p));
    return () => {
      RNOtpVerify.removeListener();
    }
  }, []);

  //to start resent otp option
const startResendOtpTimer = () => {
  if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
  }
  resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
          clearInterval(resendOtpTimerInterval);
      } else {
          setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
  }, 1000);
};

//on click of resend button
const onResendOtpButtonPress = () => {
  //clear input field
  setOtp('')
  setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
  startResendOtpTimer();

  // resend OTP Api call
  signInWithPhoneNumber();

};

  const otpHandler = (message) => {
    const otp = /(\d{6})/g.exec(message)[1];
    setOtp(otp);
    RNOtpVerify.removeListener();
    Keyboard.dismiss();
  };

  async function signInWithPhoneNumber() {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (e) {
      alert(JSON.stringify(e));
      console.log(e);
    }
  }

  async function confirmCode() {
    try {
      const code = otpArray.join('');
      const response = await confirm.confirm(otp);
      if (response) {
        navigation.navigate('main');
        // mood.setOtpConfirmation(true)
      }
    } catch (e) {
      // alert(JSON.stringify(e));
      // alert('code is wrong!')
      navigation.navigate('main');
    }
  }
  const onOtpChange = (index) => {
    return (value) => {
      if (isNaN(Number(value))) {
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);
      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        } else if (index === 3) {
          fivthTextInputRef.current.focus();
        } else if (index === 4) {
          sixthTextInputRef.current.focus();
          setSubmittingOtp(false);
        }
      }
    };
  };

  const onOtpKeyPress = (index) => {
    return ({nativeEvent: {key: value}}) => {
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        } else if (index === 4) {
          fourthTextInputRef.current.focus();
        } else if (index === 5) {
          fivthTextInputRef.current.focus();
        }
        if (isAndroid && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = '';
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  return (
    <View
      style={{
        backgroundColor: '#009387',
        height: '100%',
        paddingTop: 100,
      }}>
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          color: '#fff',
        }}>
        Enter SMS sent to your number: {' ' + phoneNumber}{' '}
      </Text>
      <OTPInputView
        style={{
          width: '80%',
          height: 200,
          marginLeft: 40,
          backgroundColor: 'transparent',
        }}
        pinCount={6}
        code={otp}
        //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        onCodeChanged={(code) => setOtp(code)}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={(code) => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />

      {/* View for resend otp  */}
      {resendButtonDisabledTime > 0 ? (
          <View style={styles.resendCodeContainer}>
            <Text style={styles.resendCodeText}>Resend Authorisation Code in {resendButtonDisabledTime} sec</Text>
            </View>
            ) : (
                <TouchableOpacity
                    onPress={onResendOtpButtonPress}>
                    <View style={styles.resendCodeContainer}>
                        <Text style={styles.resendCode} > Resend Authorisation Code</Text>
                        {/* <Text style={{ marginTop: 40 }}> in {resendButtonDisabledTime} sec</Text> */}
                    </View>
                </TouchableOpacity >
            )
        }

      <Animatable.View animation="fadeInUp">
        <TouchableOpacity style={styles.btn} onPress={() => confirmCode()}>
          <Text style={styles.textSign}>Submit</Text>
          <MaterialIcons name="navigate-next" color="#4f6367" size={20} />
        </TouchableOpacity>
      </Animatable.View>
    </View>
    // <ErrorBoundary screenName={'OTPScreen'}>

    // <View style={{backgroundColor:'#009387', flex:1}}>
    // <View style={styles.container}>
    // <Animatable.View animation="fadeInUp">

    //     <Text style={{fontSize:18, textAlign: 'center', color: '#fff'}}>
    //       Enter SMS sent to your number: {' ' + phoneNumber}
    //     </Text>
    //     <View style={[Styles.row, Styles.mt12]}>
    //       {[
    //         firstTextInputRef,
    //         secondTextInputRef,
    //         thirdTextInputRef,
    //         fourthTextInputRef,
    //         fivthTextInputRef,
    //         sixthTextInputRef,
    //       ].map((textInputRef, index) => (
    //         <CustomTextInput
    //           containerStyle={[Styles.fill, Styles.mr12]}
    //           value={otpArray[index]}
    //           onKeyPress={onOtpKeyPress(index)}
    //           onChangeText={onOtpChange(index)}
    //           keyboardType={'numeric'}
    //           maxLength={1}
    //           style={[styles.otpText, Styles.centerAlignedText]}
    //           autoFocus={index === 0 ? true : undefined}
    //           refCallback={refCallback(textInputRef)}
    //           key={index}
    //         />
    //       ))}
    //     </View>
    //     {errorMessage ? (
    //       <CustomText
    //         style={[
    //           Styles.negativeText,
    //           Styles.mt12,
    //           Styles.centerAlignedText,
    //         ]}>
    //         {errorMessage}
    //       </CustomText>
    //     ) : null}

    //     {/* <FullButtonComponent
    //       type={'fill'}
    //       text={'Submit'}
    //       textStyle={styles.submitButtonText}
    //       buttonStyle={Styles.mt24}
    //       onPress={() => confirmCode()}
    //       disabled={submittingOtp}
    //     /> */}

    // </Animatable.View>

    // </View>
    // <Animatable.View animation="fadeInUp">

    //         <TouchableOpacity style={styles.btn} disabled={submittingOtp} onPress={() => confirmCode()}>

    //         <Text style={styles.textSign}>Submit</Text>
    //         <MaterialIcons
    //             name="navigate-next"
    //             color="#4f6367"
    //             size={20}
    //         />
    //         </TouchableOpacity>
    // </Animatable.View>

    // </View>
    // </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 0,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
    marginHorizontal: 10,
    borderRadius: 10,
    // marginBottom: 0,
    backgroundColor: '#009387',
    // paddingTop: 130,
  },
  submitButtonText: {
    color: colors.WHITE,
  },
  otpText: {
    color: '#fff',
    fontSize: 18,
    width: '100%',
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#fff',
    paddingHorizontal: 120,
    paddingVertical: 20,
    // flex:1,
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
  textSign: {
    color: '#4f6367',
    fontWeight: 'bold',
  },

  borderStyleBase: {
    width: 20,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  resendCode: {
    color: '#57d5ff',
    marginStart: 20,
    marginTop: 40,
},
resendCodeText: {
    marginStart: 20,
    marginTop: 40,
    color:'white'
},
resendCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'

}
});

export default OTPScreen;
