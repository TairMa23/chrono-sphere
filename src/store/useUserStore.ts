import create from 'zustand';

export interface User {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    uid: string,
}

interface UserStore {
    users: User[];
    setUsers: (users: User[]) => void;
    addUser: (user: User) => void;
    getUsersByFirstNameAndLastName: (firstName: string, lastName: string) => User[]; // Function to get users by first name and last name
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    setUsers: (users) => set({users}),
    addUser: (user) => set((state) => ({users: [...state.users, user]})),
    getUsersByFirstNameAndLastName: (firstName, lastName) => {
        const foundUsers = useUserStore.getState().users.filter(user =>
            user.firstName === firstName && user.lastName === lastName
        );
        return foundUsers;
    }
}));
