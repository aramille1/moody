import React, { useState, useContext, useRef, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import auth from '@react-native-firebase/auth'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

import { Styles } from '../styles/Styles';
import ErrorBoundary from '../components/ErrorBoundry';
import colors from '../styles/Colors';
import { isAndroid } from '../components/HelperFunctions';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import FullButtonComponent from '../components/FullButtonComponent';
import { MoodContext } from '../../App';

const OTPScreen = function ({ route: { params: { phoneNumber } }, navigation }) {
const mood = useContext(MoodContext)

  const [otpArray, setOtpArray] = useState(['', '', '', '']);
  const [submittingOtp, setSubmittingOtp] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirm, setConfirm] = useState(null);

  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fivthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);

  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };

  useEffect(() => {
    signInWithPhoneNumber();
  }, [])

  async function signInWithPhoneNumber() {
   try{
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    }catch(e){
     alert(JSON.stringify(e));
     console.log(e)
   }
  }

  async function confirmCode() {
    try{
    const code = otpArray.join("");
    const response = await confirm.confirm(code);
    if(response){
      alert('should be in SignUpScreen next!')
      navigation.navigate('SignUpScreen');
      // mood.setOtpConfirmation(true)
    }
    } catch(e){
      // alert(JSON.stringify(e));
      alert('code is wrong!')
    }
    alert(2)
  }
  const onOtpChange = index => {
    return value => {
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

  const onOtpKeyPress = index => {
    return ({ nativeEvent: { key: value } }) => {
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
    <ErrorBoundary screenName={'OTPScreen'}>

      <View style={{backgroundColor:'#009387', flex:1}}>
      <View style={styles.container}>
      <Animatable.View animation="fadeInUp">

        <Text style={{fontSize:18, textAlign: 'center', color: '#fff'}}>
          Enter SMS sent to your number: {' ' + phoneNumber}
        </Text>
        <View style={[Styles.row, Styles.mt12]}>
          {[
            firstTextInputRef,
            secondTextInputRef,
            thirdTextInputRef,
            fourthTextInputRef,
            fivthTextInputRef,
            sixthTextInputRef,
          ].map((textInputRef, index) => (
            <CustomTextInput
              containerStyle={[Styles.fill, Styles.mr12]}
              value={otpArray[index]}
              onKeyPress={onOtpKeyPress(index)}
              onChangeText={onOtpChange(index)}
              keyboardType={'numeric'}
              maxLength={1}
              style={[styles.otpText, Styles.centerAlignedText]}
              autoFocus={index === 0 ? true : undefined}
              refCallback={refCallback(textInputRef)}
              key={index}
            />
          ))}
        </View>
        {errorMessage ? (
          <CustomText
            style={[
              Styles.negativeText,
              Styles.mt12,
              Styles.centerAlignedText,
            ]}>
            {errorMessage}
          </CustomText>
        ) : null}

        {/* <FullButtonComponent
          type={'fill'}
          text={'Submit'}
          textStyle={styles.submitButtonText}
          buttonStyle={Styles.mt24}
          onPress={() => confirmCode()}
          disabled={submittingOtp}
        /> */}

      </Animatable.View>

      </View>
      <Animatable.View animation="fadeInUp">

            <TouchableOpacity style={styles.btn} disabled={submittingOtp} onPress={() => confirmCode()}>
 
            <Text style={styles.textSign}>Submit</Text>
            <MaterialIcons
                name="navigate-next"
                color="#4f6367"
                size={20}
            />
            </TouchableOpacity>
      </Animatable.View>

      </View>
    </ErrorBoundary>
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
    backgroundColor: '#009387'
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
    flexDirection: 'row'
},
btn:{
  backgroundColor: '#fff',
  paddingHorizontal: 120,
  paddingVertical: 20,
  // flex:1,
  alignItems: 'center',
  marginTop: 40,
  marginHorizontal: 20,
  justifyContent:'center',
  flexDirection: 'row',
  borderRadius: 10
},
textSign: {
  color: '#4f6367',
  fontWeight: 'bold'
},
});

export default OTPScreen;