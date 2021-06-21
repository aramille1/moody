import React, {useContext} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import Feather from 'react-native-vector-icons/Feather';
// import AvatarImagePicker from '../MyMoodSettings/Modal/AvatarImagePicker';
import { MoodContext } from '../../App';

const SignUnScreen = ({navigation}) => {
    const mood = useContext(MoodContext)

    const [username, setUsername] = React.useState('')

    const [image, setImage] = React.useState('')

    const textInputChange = (val) => setUsername(val)

    const onSignIn = () =>{
        mood.setUsername(username)
        navigation.navigate('main');
    }


    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        {/* <View style={styles.header}>
            <Text style={styles.text_header}>Personal settings!</Text>
        </View> */}
        <Animatable.View 
            animation="fadeInUp"
            style={styles.footer}
        >
            <ScrollView>
            {/* <AvatarImagePicker setImageProp={(img) => setImage(img)}/> */}
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {/* {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null} */}
            </View>


            


            </ScrollView>
        </Animatable.View>
        <Animatable.View 
                    animation="fadeInUp"
                >
            <View style={styles.button}>
            <TouchableOpacity style={styles.btn} onPress={onSignIn}>
 
            <Text style={styles.textSign}>Save</Text>
            <MaterialIcons
                name="navigate-next"
                color="#4f6367"
                size={20}
            />
            </TouchableOpacity>
            </View>
            </Animatable.View>
      </View>
    );
};

export default SignUnScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387',
      justifyContent: 'center'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    footer: {
        // flex: Platform.OS === 'ios' ? 3 : 9,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginHorizontal: 15
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    btn:{
        backgroundColor: '#fff',
        paddingHorizontal: 140,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'row',
        borderRadius: 10
      },
      textSign: {
        color: '#4f6367',
        fontWeight: 'bold'
      },

  });