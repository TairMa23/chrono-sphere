import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { auth } from "../../services/firebase-config";
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from "../../services/appStyle"


const Login = (props) => {
  const [email, setEmail] = useState("tair@gmail.com");
  const [password, setPassword] = useState("123456");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  const loginAction = () => {
    setIsLoading(true)
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(res => {
          setIsLoading(false)
          console.log(res);
        })
        .catch(err => {
          Alert.alert(err.message)
          setIsLoading(false)
        })
    } else {
      Alert.alert("All inputs are require")
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <Text style={styles.title}>Chrono </Text>
        <FontAwesome6 size={40} name="business-time" />
        <Text style={styles.title}> Sphere</Text>
      </View>

      <View style={styles.form_container}>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          placeholder="Email address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          keyboardType="default"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder="Password"
          style={styles.input}
        />
      </View>
      {
        isLoading ? (<ActivityIndicator size='large' />) :
          (<TouchableOpacity style={styles.btn} onPress={loginAction}>
            <Text style={styles.btn_txt}>Login</Text>
          </TouchableOpacity>)
      }

      <TouchableOpacity onPress={() => { props.navigation.navigate("signup") }} style={styles.outline_btn}>
        <Text style={styles.outline_btn_txt}>Don't have an account? SignUp Now!</Text>
      </TouchableOpacity>

    </View>
  )
}


export const screenOptions = () => {
  return {
    headerShown: false
  }
}

export default Login;