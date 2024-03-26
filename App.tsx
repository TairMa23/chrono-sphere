import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppTabs,AuthStack } from "./src/navigation/navigation";
import { StyleSheet, Text, View } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";


import { auth } from "./src/services/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
const theme = {
  ...DefaultTheme,
};
export default function App() {

  const [isUser, setIsUser] = useState(false);
  const handleAuthStateChange = async (authUser) => {
    if (authUser) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer>
         <PaperProvider theme={theme}>
            {isUser ? <AppTabs /> :<AuthStack/>}
          </PaperProvider>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
