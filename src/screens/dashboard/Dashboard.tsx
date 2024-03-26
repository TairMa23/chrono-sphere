import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import styles from "../../services/appStyle"
import DropdownComponent from "../../components/DropdownComponent"


const Dashboard = () => {
    const [selected, setSelected] = useState('');
    return (
        <View style={styles.container_app}>
   
            <Calendar
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedColor: 'orange' }
                }}
            />
                     <DropdownComponent />
        </View>
    )
}
export const screenOptions = (navData) => {
    return {
        headerTitle: 'Dashboard',
        headerRight: () => (
            <Ionicons
                onPress={() => { navData.navigation.navigate('settings') }}
                name='options'
                size={24} />
        )


    }
}

export default Dashboard;