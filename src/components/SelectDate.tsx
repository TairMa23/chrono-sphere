import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, Button, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from "expo-status-bar";
import styles from "../services/appStyle"
import { addEventToMyEventList } from "../services/eventListService";
import { useMyevent } from "../store/useMyevent";
import { useMutation } from "react-query";
import { auth } from "../services/firebase-config";
// const SelectDate = (props) => {
const SelectDate = () => {
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('Empty');
  const [title, setTitle] = useState('');

  // const addEventToMyEventList = useMyevent((state) => state.addEventToMyEventList);
  // const {mutate, isLoading, error} = useMutation(addTrackToMyPlaylist, {
  //   onSuccess: (data) => {
  //     const uid = auth.currentUser?.uid;
  //     addEventToMyEventList({
  //       uid,
  //       ...props.enent
  //     })
  //   }
  // })


  const onChange = (event, selectDate) => {
    const currentDate = selectDate || date; // Corrected from selectedDate to selectDate

    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1 + '/' + tempDate.getFullYear());
    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
    setText(fDate + ' ' + fTime)

    console.log(date)
  }


  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{text}</Text>
      <View style={styles.rowContainer}>
        <Text>Title</Text>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={val => setTitle(val)}
            style={styles.t_input}
          />
      </View>
      
      <View style={styles.rowContainer}>
        <Text>Start Date</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text>Start Time</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      </View>

      <View style={styles.rowContainer}>
        <Text>End Date</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text>End Time</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      </View>
<Button title="add"/>
      <StatusBar style="auto" />
    </View>
  )
}


export default SelectDate;
