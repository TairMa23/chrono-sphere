import create from 'zustand';

export interface GroupMember {
    uid: string;
    name: string;
}

export interface Group {
    id: string;
    name: string;
    members: GroupMember[];
}

interface GroupStore {
    groups: Group[];
    setGroups: (groups: Group[]) => void;
    addGroup: (group: Group) => void;
    addMemberToGroup: (groupId: string, member: GroupMember) => void;
}

export const useGroups = create<GroupStore>((set) => ({
    groups: [],
    setGroups: (groups) => set({ groups }),
    addGroup: (group) => set((state) => ({ groups: [...state.groups, group] })),
    addMemberToGroup: (groupId, member) =>
        set((state) => ({
            groups: state.groups.map((group) =>
                group.id === groupId
                    ? { ...group, members: [...group.members, member] }
                    : group
            ),
        })),
}));
