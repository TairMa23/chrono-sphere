import React, { useState } from "react";
import { TouchableOpacity, Button, Text, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDateByGroup from "./SelectDateByGroup";

function PopUp() {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleModal}>
                <Ionicons name="add" size={50} color="black" />
            </TouchableOpacity>
            <Text>Add Event</Text>
            <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1 }}>
                    <Text>Hello!</Text>
                    <SelectDateByGroup />
                    <Button title="Hide modal" onPress={toggleModal} />
                </View>
            </Modal>
        </View>
    );
}

export default PopUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
});