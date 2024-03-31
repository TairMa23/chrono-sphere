import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import styles from "../../services/appStyle"
import DropdownComponent from "../../components/DropdownComponent"
import { auth } from "../../services/firebase-config";
import { fetchMyEventListByUid } from "../../services/eventListService";
import PopUpGroup from "../../components/PopUpGroup";


const Dashboard = () => {
    const [selected, setSelected] = useState('');
    const [events, setEvents] = useState({});

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const userEvents = await fetchMyEventListByUid(auth.currentUser?.uid);
                console.log("&&L ", userEvents)
                const markedEvents = {};
                userEvents.forEach((event) => {
                    markedEvents[event.startDate.dateString] = {
                        selected: true,
                        marked: true,
                        selectedColor: 'green',
                    };
                });
                setEvents(markedEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []); // Empty dependency array to run once on component mount


    return (
        <View style={styles.container_app}>

            <Calendar
                style={{
                    height: 400,
                    marginTop: 5,
                    padding: 20,
                }}
                onDayPress={day => {
                    console.log("day press: ", day.dateString)
                    setSelected(day.dateString);
                }}
                markedDates={{
                    ...events,
                    [selected]: { selected: true, disableTouchEvent: true, selectedColor: 'orange' }
                }}
            />
            <DropdownComponent />
            <PopUpGroup/>

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