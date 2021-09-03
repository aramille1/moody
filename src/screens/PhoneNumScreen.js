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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PhoneNumScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [phoneNumber, addPhoneNumber] = React.useState('+1012345678');

    const GetOTP = () => {
        console.log(phoneNumber)
        if (phoneNumber && phoneNumber.length > 9) {
            navigation.navigate('OtpScreen', { phoneNumber });
        }
        else
            alert("Please enter 10 digit phone number");
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="dark-content" />
            <View style={styles.header}>
                <Animatable.View
                    animation="fadeInUp"
                    resizeMode="stretch"
                >
                    <Text style={styles.moodyTitle}>Moody</Text>
                </Animatable.View>
            </View>
            <Animatable.View
                style={[styles.footer, {
                }]}
                animation="fadeInUp"
            >
                <Text
                    style={styles.title}
                >Sign in with your phone number.
                </Text>

                <View style={styles.action}>

                    <FontAwesome
                        name="phone"
                        color="#05375a"
                        size={30}
                        style={{ marginTop: 5 }}
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

                    <TouchableOpacity style={styles.btn} onPress={GetOTP}>
 
                            <Text style={styles.textSign}>Get OTP!</Text>
                            <MaterialIcons
                                name="navigate-next"
                                color="#4f6367"
                                size={20}
                            />
                    </TouchableOpacity>



                </View>

            </Animatable.View>


            <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            By signing up you agree to our
                        </Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Terms of service</Text>
                        <Text style={styles.color_textPrivate}>{" "}and</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Privacy policy</Text>
                    </View>
        </View>
    );
};

export default PhoneNumScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
        justifyContent: 'space-around'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    action: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 20,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        marginRight:20,
        marginLeft:20,
        borderRadius: 10
    },
    btn:{
        backgroundColor: '#fff',
        // paddingHorizontal: 100,
        marginLeft: 20,
        marginRight: 20,
        paddingVertical: 20,
        // flex:1,
        width: '90%',
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'row',
        borderRadius: 10
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    button: {
        alignItems: 'center',
        marginTop: 10
    },
    textSign: {
        color: '#4f6367',
        fontWeight: 'bold'
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 20,
        color: '#05375a',
        fontSize: 30,
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 20,
        
    },
    color_textPrivate: {
        color: '#fff'
    },
    moodyTitle: {
        color: "#fff",
        fontSize: 34,
        padding: 20,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 40
    }
});