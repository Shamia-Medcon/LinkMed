import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, ScrollView, Appearance, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';

import ProgressBarLoading from '../../components/common/ProgressBar';
import { Color, Dark } from '../../config/global';
import data from "../../Data/countries.json"

const colorScheme = Appearance.getColorScheme();
let Colors = Color;

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [speciality, setSpeciality] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [term, setTerm] = useState(false);
  const [loading, isLoading] = useState(false);
  const [fristNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [specialityError, setSpecialityError] = useState("");
  const [confrimPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    speciality: "",
    country: "",
  });


  generateData = (data) => {
    const newData = Object.keys(data).reduce((result, currentKey) => {
      if (typeof data[currentKey] === 'string' || data[currentKey] instanceof String) {
        result.push(data[currentKey]);
      } else {
        const nested = generateData(data[currentKey]);
        result.push(...nested);
      }
      return result;
    }, []);
    return newData;
  }
  const handleOnChangeText = async (content, key) => {
    // if (content === '') return;
    setInfo({
      ...info,
      [key]: content
    });
    const copiedContent = await Clipboard.getString();
    if (copiedContent) {
      const isPasted = content.includes(copiedContent);
      if (isPasted) {
        setInfo({
          ...info,
          [key]: content
        });
      }
    }


  }
  useEffect(() => {
    let res = generateData(data);
    setCountries(res);
  }, [data]);
  return (
    <>
      <StatusBar translucent barStyle={"light-content"} backgroundColor={Colors.main_color} />
      {loading ? (
        <>
          <ProgressBarLoading />
        </>) : (<>
          <ScrollView style={styles.scroll}>
            <View style={styles.container}>
              <View style={{ ...styles.header, ...styles.shadowProp }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image source={require('../../assets/img/back.png')}
                    resizeMode='contain'
                    style={{
                      ...styles.backIcon
                    }} />
                </TouchableOpacity>
              </View>
              {error != "" ? (<>
                <View style={styles.errorContent}>
                  <Text style={styles.error}>{error}</Text>
                </View>
              </>) : (<></>)}
              <View>
                <Text style={styles.title}>Personal Details</Text>
              </View>
              {/* First Name Address */}
              {fristNameError != "" ? (<>
                <View style={styles.errorContent}>
                  <Text style={styles.error}>{fristNameError}</Text>
                </View>
              </>) : (<></>)}
              <View style={{ ...styles.itemMargin, ...styles.inputContent }}>
                <TextInput style={styles.input}
                  onChangeText={(first_name) => { handleOnChangeText(first_name, 'first_name') }}
                  placeholderTextColor={Colors.white}
                  cursorColor={Colors.white}
                  value={info.first_name}
                  placeholder="First Name"
                />
              </View>

              {/* Last Name Address */}
              {lastNameError != "" ? (<>
                <View style={styles.errorContent}>
                  <Text style={styles.error}>{lastNameError}</Text>
                </View>
              </>) : (<></>)}
              <View style={{ ...styles.itemMargin, ...styles.inputContent }}>
                <TextInput style={styles.input}
                  onChangeText={(last_name) => { handleOnChangeText(last_name, 'last_name') }}
                  placeholderTextColor={Colors.white}
                  cursorColor={Colors.white}
                  value={info.last_name}
                  placeholder="Last Name"
                />
              </View>

              {/* Email Address */}
              {emailError != "" ? (<>
                <View style={styles.errorContent}>
                  <Text style={styles.error}>{emailError}</Text>
                </View>
              </>) : (<></>)}
              <View style={{ ...styles.itemMargin, ...styles.inputContent }}>
                <View style={{ ...styles.bordered }}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} resizeMode="contain" source={require('../../assets/img/user.png')} />
                  </View>
                  <TextInput style={styles.input}
                    onChangeText={(email) => { handleOnChangeText(email, 'email') }}
                    placeholderTextColor={Colors.white}
                    cursorColor={Colors.white}
                    value={info.email}
                    placeholder="Email Address"
                    keyboardType="email-address" />
                </View>
              </View>
              <View style={{ ...styles.itemMargin, ...styles.inputContent }}>

                <Picker
                  style={{ ...styles.input, color: Colors.white }}
                  dropdownIconColor={Colors.main_color}
                  selectedValue={country}
                  onValueChange={(itemValue) => {
                    handleOnChangeText(itemValue, 'country')
                  }
                  }>
                  <Picker.Item enabled={false} label={"Select Country"} value={""} />
                  <Picker.Item enabled={false} label={"Select Country"} value={""} />
                  {countries.map((item, index) => {
                    return <Picker.Item key={index} label={item} value={item} />
                  })}
                </Picker>
              </View>

            </View>
          </ScrollView>
        </>)}

    </>);

}
const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    position: 'relative'
  },
  container: {
    flex: 1,
    height: Dimensions.get('screen').height * .86,
    backgroundColor: Colors.main_color,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    shadowColor: Colors.black,
    alignContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: Colors.main_color,
    height: Dimensions.get('screen').height * .15,
    width: Dimensions.get('screen').width,
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',

  },
  inputContent: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  itemMargin: {
    marginVertical: 5,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  input: {
    width: Dimensions.get('screen').width * .8,
    fontSize: 16,
    color: Colors.white,
    fontFamily: "OpenSans-Regular",
    borderWidth: 3,
    borderColor: Colors.white,
    borderRadius: 50,
    height: 50,
    textAlign: 'center',
  },
  title: {
    width: Dimensions.get('screen').width * .8,

    color: Colors.white,
    fontSize: 20,
  }

});