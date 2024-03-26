import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { auth, database } from "../../services/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "../../services/appStyle"
import { addDoc, collection } from "firebase/firestore";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

type Item = string;

const Signup: React.FC = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);




  const signupAction = async () => {
    setIsLoading(true);


    if (email !== "" && password !== "") {

      const user = await createUserWithEmailAndPassword(auth, email, password);
      const docRef = await addDoc(collection(database, "accounts"), {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        email: email,
        uid: user.user.uid,
      });
    } else {
      Alert.alert("All inputs are require");
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <Text style={styles.title}>Chrono</Text>
        <FontAwesome6 size={40} name="business-time" />
        <Text style={styles.title}> Sphere</Text>
      </View>

      <View style={styles.form_container}>
        <TextInput
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          keyboardType="default"
          placeholder="First name"
          style={styles.input}
        />

        <TextInput
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          keyboardType="default"
          placeholder="Last name"
          style={styles.input}
        />

        <TextInput
          value={mobile}
          onChangeText={(text) => setMobile(text)}
          keyboardType="phone-pad"
          placeholder="Mobile"
          autoCapitalize="none"
          style={styles.input}
        />

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

  

        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <TouchableOpacity style={styles.btn} onPress={signupAction}>
            <Text style={styles.btn_txt}>Sign Up</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("login");
          }}
          style={styles.outline_btn}
        >
          <Text style={styles.outline_btn_txt}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};

export default Signup;
