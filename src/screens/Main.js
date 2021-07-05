import React, { Component } from "react";
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Contacts from "react-native-contacts";
import * as Animatable from 'react-native-animatable';
//  import Avatar from "../MyMoodSettings/Avatar";
import SearchBar from '../components/SearchBar/index';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MoodContext } from '../../App';
import ProfileImagePicker from '../components/Modal/ProfileImagePicker'

export default function Main({ navigation }) {
  mood = React.useContext(MoodContext)

  const [profileImg, setProfileImg] = React.useState()
  const [contacts, setContacts] = React.useState([])
  const [searchPlaceholder, setSearchPlaceholder] = React.useState('Search')
  const [typeText, setTypeText] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [visible, setVisible] = React.useState(true)
  const [username, setUsername] = React.useState('username')


  // if you want to read/write the contact note field on iOS, this method has to be called
  // WARNING: by enabling notes on iOS, a valid entitlement file containing the note entitlement as well as a separate
  //          permission has to be granted in order to release your app to the AppStore. Please check the README.md
  //          for further information.
  // Contacts.iosEnableNotesUsage(false);


  //  async componentDidMount() {
  //    if (Platform.OS === "android") {
  //      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
  //        title: "Contacts",
  //        message: "This app would like to view your contacts."
  //      }).then(() => {
  //        this.loadContacts();
  //      });
  //    } else {
  //      this.loadContacts();
  //    }
  //  }

  const loadContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        // this.setState({ contacts, loading: false });
        setContacts(contacts);
        setLoading(false)
      })
      .catch(e => {
        // this.setState({ loading: false });
        setLoading(false)
      });

    Contacts.getCount().then(count => {
      // this.setState({ searchPlaceholder: `Search ${count} contacts` });
      setSearchPlaceholder(`Search ${count} contacts`)
    });

    Contacts.checkPermission();
  }

  const search = (text) => {
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === "" || text === null) {
      this.loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text).then(contacts => {
        // this.setState({ contacts });
        setContacts(contacts)
      });
    } else if (emailAddressRegex.test(text)) {
      Contacts.getContactsByEmailAddress(text).then(contacts => {
        // this.setState({ contacts });
        setContacts(contacts)
      });
    } else {
      Contacts.getContactsMatchingString(text).then(contacts => {
        // this.setState({ contacts });
        setContacts(contacts)
      });
    }
  }

  const onPressContact = (contact) => {
    var text = typeText;
    // this.setState({ typeText: null });
    setTypeText(null)
    if (text === null || text === '')
      Contacts.openExistingContact(contact)
    else {
      var newPerson = {
        recordID: contact.recordID,
        phoneNumbers: [{ label: 'mobile', number: text }]
      }
      Contacts.editExistingContact(newPerson).then(contact => {
        //contact updated
      });
    }
  }

  const addNew = () => {
    Contacts.openContactForm({}).then(contact => {
      // Added new contact
      // this.setState(({ contacts }) => ({
      //   contacts: [contact, ...contacts],
      //   loading: false
      // }));
      setContacts([contact, ...contacts]),
        setLoading(false)
    })
  }

  const onSignIn = () => {
    mood.setUsername(username)
    mood.setImg(profileImg)
    console.log(1)
    setVisible(false)

  }



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#fff' barStyle="dark-content" />

        
        <Modal
          backdropTransitionOutTiming={0}
          onBackdropPress={() => setVisible(false)}
          isVisible={visible}
          style={{ backgroundColor: "white",  borderRadius: 20, position:'absolute',top: '25%' }}>

          <View style={{ marginLeft: 20, marginTop: 30, marginBottom: 0 }}><Text style={{ color: '#05375a', fontSize: 30,  }}>What's your name?</Text></View>
          {/* <ProfileImagePicker setImageProp={(img) => setImage(img)} /> */}
          <View
            style={styles.footer}
          >
            <ScrollView>
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
                  onChangeText={(val) => setUsername(val)}
                />
              </View>
            </ScrollView>
          </View>

            <View style={styles.buttonSave}>
              <TouchableOpacity style={styles.btnSave} onPress={onSignIn}>

                <Text style={styles.textSign}>Save</Text>

                <MaterialIcons
                  name="navigate-next"
                  color="#fff"
                  size={20}
                />

              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSkip} onPress={()=>setVisible(false)}>

                <Text style={{color: '#4f6367',fontWeight: 'bold', display:'flex'}}>Skip</Text>

                <MaterialIcons
                  name="navigate-next"
                  color="#4f6367"
                  size={20}
                />

              </TouchableOpacity>
            </View>

        </Modal>


          <View
            style={{
              paddingLeft: 100,
              paddingRight: 100,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
          </View>
          <Button title="Add new" onPress={() => addNew()} />
          <SearchBar
            searchPlaceholder={searchPlaceholder}
            onChangeText={search}
          />

          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <TextInput
              keyboardType='number-pad'
              style={styles.inputStyle}
              placeholder='Enter number to add to contact'
              onChangeText={text => setTypeText(text)}
              value={typeText}
            />
          </View>

          {/* {
           this.state.loading === true ?
             (
               <View style={styles.spinner}>
                 <ActivityIndicator size="large" color="#0000ff" />
               </View>
             ) : (
               <ScrollView style={{ flex: 1 }}>
                 {this.state.contacts.map(contact => {
                   return (
                     <ListItem
                       leftElement={
                         <Avatar
                           img={
                             contact.hasThumbnail
                               ? { uri: contact.thumbnailPath }
                               : undefined
                           }
                           placeholder={getAvatarInitials(
                             `${contact.givenName} ${contact.familyName}`
                           )}
                           width={40}
                           height={40}
                         />
                       }
                       key={contact.recordID}
                       title={`${contact.givenName} ${contact.familyName}`}
                       description={`${contact.company}`}
                       onPress={() => this.onPressContact(contact)}
                       onDelete={() =>
                         Contacts.deleteContact(contact).then(() => {
                           this.loadContacts();
                         })
                       }
                     />
                   );
                 })}
               </ScrollView>
             )
         } */}

          <View style={{
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            flex: 1,
            marginBottom: 50,
            marginRight: 30
          }}>
            <Icon onPress={() => navigation.navigate('EditMood')} name="add-circle-outline" size={50} color="#373737" />
          </View>





    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spinner: {
    flex: 1,
    flexDirection: 'column',
    alignContent: "center",
    justifyContent: "center"
  },
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: "center"
  },
  container3: {
    flex: 1,
    backgroundColor: '#009387',
    justifyContent: 'center'
  },
  footer: {
    // flex: Platform.OS === 'ios' ? 3 : 9,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // marginHorizontal: 15,
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
  btnSave: {
    backgroundColor: '#009387',
    paddingHorizontal: 140,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    margin: 10
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
  textSign: {
    color: '#fff',
    fontWeight: 'bold',

  },
  buttonSave:{
    
  }
});

const getAvatarInitials = textString => {
  if (!textString) return "";

  const text = textString.trim();

  const textSplit = text.split(" ");

  if (textSplit.length <= 1) return text.charAt(0);

  const initials =
    textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);

  return initials;
};
