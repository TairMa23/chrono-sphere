import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface ModalMessageProps {
    visible: boolean;
    message: string;
    onClose: () => void;
}

const ModalMessage: React.FC<ModalMessageProps> = ({ visible, message, onClose }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={handleClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{message}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

interface Styles {
    centeredView: ViewStyle;
    modalView: ViewStyle;
    modalText: TextStyle;
    closeButton: ViewStyle;
    closeButtonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#2196F3',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ModalMessage;
