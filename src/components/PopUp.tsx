import React, { useState } from "react";
import { TouchableOpacity, Button, Text, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import SelectDate from "./SelectDate";
import Ionicons from "react-native-vector-icons/Ionicons";

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
            <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1 }}>
                    <Text>Hello!</Text>
                    <SelectDate />
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
