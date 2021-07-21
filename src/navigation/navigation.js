import React, { useEffect } from 'react'
import { View, TouchableOpacity, Image,Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

import Main from '../screens/Main';
import MyMoodSettings from '../screens/MyMoodSettings'
import OtherMood from '../screens/OtherMood';
import CustomSidebarMenu from '../components/CustomSidebarMenu';

import PhoneNumScreen from '../screens/PhoneNumScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OTPScreen from '../screens/OtpScreen';
import { MoodContext } from '../../App';
const RootStack = createStackNavigator();


const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode='none'>
    <RootStack.Screen name="PhoneNumScreen" component={PhoneNumScreen} />
    <RootStack.Screen name="OtpScreen" component={OTPScreen} />
    {/* <RootStack.Screen name="SignUpScreen" component={SignUpScreen} /> */}
    <RootStack.Screen name="main" component={AppDrawerScreen} />
    {/* <RootStack.Screen name="SignInScreen" component={SignInScreen}/> */}

  </RootStack.Navigator>
);

//Structure for the navigatin Drawer
const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  const logout = () =>{
    auth()
    .signOut()
    .then(() => console.log('User signed out!'))
    .catch(error => console.log(error))
  }

  return (
    <View style={{ flexDirection: 'row', marginLeft: 5, alignItems:'center', }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        {/* <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        /> */}
        <Icon name="menu-outline" size={30} color="#373737" />

      </TouchableOpacity>
        <TouchableOpacity style={{position:'relative',left: 300, zIndex:100}}  onPress={logout}><Text >Logout</Text></TouchableOpacity>
    </View>
  );
};

const MainStack = createStackNavigator();
const mainScreenStack = ({ navigation }) => (
  <MainStack.Navigator initialRouteName="main">
    <MainStack.Screen
      name="main"
      component={Main}
      options={{
        title: '',
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#fff',//Set Header color
          height: 30
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
          fontSize: 12
        },
      }}
    />
  </MainStack.Navigator>
)


const MyMoodStack = createStackNavigator();
const moodScreenStack = ({ navigation }) => (
  <MyMoodStack.Navigator initialRouteName="MyMoodSettings" >
    <MyMoodStack.Screen
      name="MyMoodSettings"
      component={MyMoodSettings}
      options={{
        title: '', //Set Header Title
        // headerShown: false,
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#fff',//Set Header color
          height: 30,
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
          fontSize: 12
        },
        // headerShown: false 
      }}
    />
  </MyMoodStack.Navigator>
)

const otherScreenStack = createStackNavigator();
const otherMoodScreenStack = ({ route, navigation }) => (
  <otherScreenStack.Navigator initialRouteName="OtherMood">
    <otherScreenStack.Screen
      name="OtherMood"
      initialParams={{ params: route.params }} 
      component={OtherMood}
      options={ ({ route }) => ({
        title: '', //Set Header Title
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#fff', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      })}
    />
  </otherScreenStack.Navigator>
)


const AppDrawer = createDrawerNavigator();

const AppDrawerScreen = ({route, navigation}) => (
  <AppDrawer.Navigator
    drawerContentOptions={{
      activeTintColor: '#2596BE',
      inactiveTintColor: 'black',
      itemStyle: { marginVertical: 5 }, //item style in the drawer
    }}
    drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <AppDrawer.Screen
        name="EditMood"
        options={{ drawerLabel: 'My Mood Settings', }}
        component={moodScreenStack}
      />

    <AppDrawer.Screen
      name="main"
      options={{ drawerLabel: 'Main' }}
      component={mainScreenStack}
    />
    <AppDrawer.Screen
      name="OtherMood"
      options={{ drawerLabel: 'Other Mood' }}
      component={otherMoodScreenStack}
    />
  </AppDrawer.Navigator>
)

export default () => {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();
  const mood = React.useContext(MoodContext)



  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(user =>{
      console.log(user);
      if(user){
        setUser(user)
      }else{
        console.log('user is not signed [in Navigation]')
      }
  })

  subscribe()
  }, []);


  return (
    <NavigationContainer>
      {/* <AppDrawerScreen/> */}
      {user ? <AppDrawerScreen /> : <RootStackScreen />}
    </NavigationContainer>
  )
}
