import React from "react";
import { View, Text, Button } from 'react-native';
import { auth } from '../../services/firebase-config'
import styles from "../../services/appStyle"
const Settings = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <Button onPress={() => auth.signOut()} title='Sign Out' />
        </View>
    )
}


export default Settings;