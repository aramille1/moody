// import React, { useEffect } from 'react'
import * as React from 'react';
import { View, TouchableOpacity, Image, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators, CardStyleInterpolators  } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Main from '../screens/Main';
import MyMoodSettings from '../screens/MyMoodSettings'
import OtherMood from '../screens/OtherMood';
import CustomSidebarMenu from '../components/CustomSidebarMenu';

import PhoneNumScreen from '../screens/PhoneNumScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OTPScreen from '../screens/OtpScreen';
import { MoodContext } from '../../App';



// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//       <Button
//         title="Go to Settings"
//         onPress={() => navigation.navigate('Settings')}
//       />
//     </View>
//   );
// }

// function SettingsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//       <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//     </View>
//   );
// }



const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
}








// //Structure for the navigatin Drawer
// const NavigationDrawerStructure = (props) => {
//   const toggleDrawer = () => {
//     //Props to open/close the drawer
//     props.navigationProps.toggleDrawer();
//   };

//   const logout = () => {
//     auth()
//       .signOut()
//       .then(() => console.log('User signed out!'))
//       .catch(error => console.log(error))
//     // alert(1)
//   }

//   return (
//     <View style={{ flexDirection: 'row', marginLeft: 5, alignItems: 'center', }}>
//       <TouchableOpacity onPress={toggleDrawer}>
//         {/*Donute Button Image */}
//         {/* <Image
//           source={{
//             uri:
//               'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
//           }}
//           style={{ width: 25, height: 25, marginLeft: 5 }}
//         /> */}
//         <Icon name="menu-outline" size={30} color="#373737" />

//       </TouchableOpacity>
//       {/* <TouchableOpacity style={{
//         // position:'relative',left: 270,marginHorizontal:10, 
//         width: 320,
//         zIndex: 100
//       }} onPress={logout}><Text style={{ textAlign: 'right' }}>Logout</Text>
//       </TouchableOpacity> */}
//     </View>
//   );
// };

// const MainStack = createStackNavigator();
// const mainScreenStack = ({ navigation }) => (
//   <MainStack.Navigator initialRouteName="main page">
//     <MainStack.Screen
//       name="main"
//       component={Main}
//       options={{
//         title: '',
//         headerLeft: () => (
//           <NavigationDrawerStructure navigationProps={navigation} />
//         ),
//         headerStyle: {
//           backgroundColor: '#fff',//Set Header color
//           height: 30
//         },
//         headerTintColor: '#fff', //Set Header text color
//         headerTitleStyle: {
//           fontWeight: 'bold', //Set Header text style
//           fontSize: 12
//         },
//       }}
//     />
//   </MainStack.Navigator>
// )


// const MyMoodStack = createStackNavigator();
// const moodScreenStack = ({ navigation }) => (
//   <MyMoodStack.Navigator initialRouteName="MyMoodSettings" >
//     <MyMoodStack.Screen
//       name="MyMoodSettings"
//       component={MyMoodSettings}
//       options={{
//         title: '', //Set Header Title
//         // headerShown: false,
//         headerLeft: () => (
//           <NavigationDrawerStructure navigationProps={navigation} />
//         ),
//         headerStyle: {
//           backgroundColor: '#fff',//Set Header color
//           height: 30,
//         },
//         headerTintColor: '#fff', //Set Header text color
//         headerTitleStyle: {
//           fontWeight: 'bold', //Set Header text style
//           fontSize: 12
//         },
//         // headerShown: false 
//       }}
//     />
//   </MyMoodStack.Navigator>
// )

// const otherScreenStack = createStackNavigator();
// const otherMoodScreenStack = ({ route, navigation }) => (
//   <otherScreenStack.Navigator initialRouteName="OtherMood">
//     <otherScreenStack.Screen
//       name="OtherMood"
//       initialParams={{ params: route.params }}
//       component={OtherMood}
//       options={({ route }) => ({
//         title: '', //Set Header Title
//         headerLeft: () => (
//           <NavigationDrawerStructure navigationProps={navigation} />
//         ),
//         headerStyle: {
//           backgroundColor: '#fff', //Set Header color
//         },
//         headerTintColor: '#fff', //Set Header text color
//         headerTitleStyle: {
//           fontWeight: 'bold', //Set Header text style
//         },
//       })}
//     />
//   </otherScreenStack.Navigator>
// )

// const AppDrawer = createDrawerNavigator();

// const AppDrawerScreen = ({ route, navigation }) => (
//   <AppDrawer.Navigator
//     drawerContentOptions={{
//       activeTintColor: 'white',
//       inactiveTintColor: 'white',
//       backgroundColor: '#16376b',
      
//       itemStyle: { marginVertical: 5, }, //item style in the drawer
//     }}
//     drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      
//     <AppDrawer.Screen
//       name="main page"
//       options={{ drawerLabel: 'Main' }}
//       component={mainScreenStack}
//     />
//     <AppDrawer.Screen
//       name="EditMood"
//       options={{ drawerLabel: 'My Mood Settings', }}
//       component={moodScreenStack}
//     />
//     <AppDrawer.Screen
//       name="OtherMood"
//       component={otherMoodScreenStack}
//       options={{
//         drawerLabel: () => null,
//         title: null,
//         drawerIcon: () => null,
//       }}
//     />
//   </AppDrawer.Navigator>
// )

const forFade = ({ next }) => ({
  cardStyle: {
    opacity: next.progress,
  },
});



const RootStack = createStackNavigator();
const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="PhoneNumScreen" component={PhoneNumScreen} />
    <RootStack.Screen name="OtpScreen" component={OTPScreen} />
    {/* <RootStack.Screen name="SignUpScreen" component={SignUpScreen} /> */}
    <RootStack.Screen name="main" component={MainTabNavScreen} />
    {/* <RootStack.Screen name="SignInScreen" component={SignInScreen}/> */}
  </RootStack.Navigator>
);
const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const MainTabNavScreen = ({route, navigation}) => (
  <Tab.Navigator screenOptions={{ headerShown: false,  tabBarLabel:() => {return null}}}>
      <Tab.Screen name="home" options={{tabBarIcon:({focused})=>(<Icon name={focused ? "home" : "home-outline"} size={30}/>)}}> 
        {() => (
          <HomeStack.Navigator >
            <HomeStack.Screen name="Moody" component={Main} options={{headerLeft: ()=> null}}/>
            <HomeStack.Screen name="OtherMood" component={OtherMood} options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerTitle:() => null }}/>
          </HomeStack.Navigator>
        )}
      </Tab.Screen>  
      <Tab.Screen name="Settings" component={MyMoodSettings} options={{tabBarIcon: ({focused }) => (<Icon name={focused ? "settings" : "settings-outline"} size={30}/> )}}/>
  </Tab.Navigator>
)

export default () => {
  // const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();
  // const mood = React.useContext(MoodContext)



  React.useEffect(() => {
    const subscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        console.log('user is not signed [in Navigation]')
      }
    })

    subscribe()
  }, []);


  return (
    <NavigationContainer>
      {user ? <MainTabNavScreen/> : <RootStackScreen/>}
    </NavigationContainer>
            
)
}



          {/* <AppDrawerScreen/> */}
          {/* {user ? <AppDrawerScreen /> : <RootStackScreen />} */}
