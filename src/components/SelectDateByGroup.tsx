import React, { useState } from "react";
import { View, Text, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from "expo-status-bar";
import styles from "../services/appStyle";
import { addEventToMyEventList, fetchMyEventList } from "../services/eventListService";
import { auth } from "../services/firebase-config";
import ModalMessage from "./ModelMessage"


const SelectDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [text, setText] = useState('Empty');
  const [title, setTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const showMessage = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const formatDate = (date) => {
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
    return `${formattedDate} ${formattedTime}`;
  };

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    setText(formatDate(currentDate));
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
    setText(formatDate(currentDate));
  };
  const handleFindTime = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      console.log("User not logged in");
      return;
    }
  
    try {
      const eventlist = await fetchMyEventList();
      
      const newEvent = {
        title: title,
        startDate: startDate,
        endDate: endDate,
        uid: uid
      };
  
      await addEventToMyEventList(newEvent);
  
      console.log("Event added successfully!");
      // Clear input fields or do other necessary actions after adding
      setTitle('');
      setStartDate(new Date());
      setEndDate(new Date());
      setText('Empty');
      showMessage();
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

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
          testID="startDatePicker"
          value={startDate}
          mode="datetime"
          is24Hour={true}
          display='default'
          onChange={onChangeStartDate}
        />
      </View>

      <View style={styles.rowContainer}>
        <Text>End Date</Text>
        <DateTimePicker
          testID="endDatePicker"
          value={endDate}
          mode="datetime"
          is24Hour={true}
          display='default'
          onChange={onChangeEndDate}
        />
      </View>

      <Button title="Find Time" onPress={handleFindTime} />
      <ModalMessage
        visible={modalVisible}
        message="The event was successfully added👋"
        onClose={closeModal}
      />
      <StatusBar style="auto" />
    </View>
  )
}

export default SelectDate;
