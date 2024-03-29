import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { database } from '../../services/firebase-config';
import { Group, GroupMember } from '../../store/useGroups';
import { getUsersByFirstNameAndLastName } from '../../services/userService';


const MyGroups = () => {
    const [members, setMembers] = useState<GroupMember[]>([]);
    const [newMemberName, setNewMemberName] = useState('');
    const [newGroupName, setNewGroupName] = useState('');
    const [canCreateGroup, setCanCreateGroup] = useState(false);

    
    const handleAddMember = async () => {
        if (newMemberName.trim() !== '') {
            const [firstName, lastName] = newMemberName.split(" ");
            const user = await getUsersByFirstNameAndLastName(firstName, lastName);
            console.log(user);
            
            const newMember: GroupMember = {
                uid: user[0].uid,
                name: newMemberName.trim(),
            };
            setMembers((prevMembers) => [...prevMembers, newMember]);
            setNewMemberName('');
            setCanCreateGroup(true); // Allow group creation when at least one member is added
        }
    };

    const handleDeleteMember = (uid: string) => {
        setMembers((prevMembers) => prevMembers.filter((member) => member.uid !== uid));
        setCanCreateGroup(members.length > 1); // Update canCreateGroup based on remaining members
    };

    const handleCreateGroup = async () => {
        if (newGroupName.trim() === '') {
            Alert.alert('Error', 'Group name cannot be empty');
            return;
        }

        if (members.length < 1) {
            Alert.alert('Error', 'Add at least one member to create a group');
            return;
        }

        const newGroup: Group = {
            id: Math.random().toString(36).substr(2, 9),
            name: newGroupName.trim(),
            members: members,
        };

        try {
            await addGroupToFirestore(newGroup);
            setMembers([]);
            setNewMemberName('');
            setNewGroupName('');
            setCanCreateGroup(false); // Reset canCreateGroup after successful creation
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    const addGroupToFirestore = async (newGroup: Group) => {
        try {
            const docRef = await addDoc(collection(database, 'groups'), newGroup);
            console.log('Document written with ID: ', docRef.id);
        } catch (error) {
            console.error('Error adding document: ', error);
            throw error;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Groups</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMemberName}
                    onChangeText={setNewMemberName}
                    placeholder="Enter member name"
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddMember}>
                    <Text style={styles.buttonText}>Add Member</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={members}
                renderItem={({ item }) => (
                    <View style={styles.memberItem}>
                        <Text>{item.name}</Text>
                        <TouchableOpacity onPress={() => handleDeleteMember(item.uid)}>
                            <Text style={styles.deleteButton}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.uid}
            />
            <TextInput
                style={styles.input}
                value={newGroupName}
                onChangeText={setNewGroupName}
                placeholder="Enter group name"
            />
            <TouchableOpacity
                style={[styles.addButton, canCreateGroup ? styles.enabledButton : styles.disabledButton]}
                onPress={handleCreateGroup}
                disabled={!canCreateGroup}
            >
                <Text style={styles.buttonText}>Create Group</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#007bff',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    enabledButton: {
        backgroundColor: '#007bff',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    memberItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    deleteButton: {
        color: 'red',
        fontWeight: 'bold',
    },
});

export default MyGroups;
