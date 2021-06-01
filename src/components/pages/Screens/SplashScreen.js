import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Pressable,
    Dimensions,
    StyleSheet,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();
    const [phoneNumber, addPhoneNumber] = React.useState('+1012345678');

    const GetOTP = () => {
        console.log(phoneNumber)
        if(phoneNumber && phoneNumber.length > 9){
        navigation.navigate('OtpScreen', {phoneNumber});
        }
        else
        alert("Please enter 10 digit phone number");
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.View 
            animation="bounceIn"
            resizeMode="stretch"
            ><Text style={styles.moodyTitle}>Moody</Text>
                </Animatable.View>
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Sign in with your phone number.</Text>
            {/* <Text style={styles.text}>Sign in with your phone number.</Text> */}

            <View style={styles.action}>
                <FontAwesome 
                    name="phone"
                    color="#05375a"
                    size={30}
                    style={{marginTop:5}}
                />
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
                    placeholder="+91 1234567890"
                    keyboardType="numeric"
                    value={phoneNumber}
                    onChangeText={(text) => addPhoneNumber(text)}
                />
            </View>
            <View style={styles.button}>
            <TouchableOpacity  onPress={GetOTP}>
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get OTP!</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>

            </View>
                    {/* <View style={styles.container}>

            <Pressable onPress={GetOTP}
                style={({ pressed }) => ({ ...styles.btnContainer, backgroundColor: pressed ? 'white' : 'blue' })}>
                <Text style={styles.btnText}>
                    
                </Text>
            </Pressable>
        </View> */}
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  otpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
  btnContainer: {
    padding: 20,
    borderRadius: 10,
    marginTop: 30,
},
btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
},
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 6,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30,

  },
  action: {
    flexDirection: 'row',
    marginTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 20,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'center',
      marginTop: 10
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 20,
    color: '#05375a',
    fontSize: 30,
},
moodyTitle:{
    color:"#fff",
    fontSize: 34,
    padding: 20,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 40
}
});