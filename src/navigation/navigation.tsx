import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Dashboard , {screenOptions as DashboardScreenOption} from "../screens/dashboard/Dashboard";
import MyCalendar from "../screens/mycalendar/MyCalendar";
import MyGroups from "../screens/mygroups/MyGroups";
import Settings from "../screens/settings/Settings";

import Login, {screenOptions as LoginScreenOption}  from "../screens/auth/Login";
import Signup, {screenOptions as SignupScreenOptions} from "../screens/auth/Signup";
const DashboardStackNavigator = createNativeStackNavigator();
const AuthStackNavigator = createNativeStackNavigator();

import styles from "../services/appStyle"
export const DashboardStack = () => {
  return (
    <DashboardStackNavigator.Navigator >
      <DashboardStackNavigator.Screen name="dashboard" component={Dashboard} options={DashboardScreenOption} />
      <DashboardStackNavigator.Screen name="settings" component={Settings}/>
    </DashboardStackNavigator.Navigator>
  );
};
export const AuthStack = () => {
  return(
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen name='login' component={Login} options={LoginScreenOption} />
      <AuthStackNavigator.Screen name='signup' component={Signup} options={SignupScreenOptions} />
    </AuthStackNavigator.Navigator>
  )
}

const AppBottomTabs = createMaterialBottomTabNavigator();
export const AppTabs = () => {
  return (
    <AppBottomTabs.Navigator >
      <AppBottomTabs.Screen
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} size={30} name="space-dashboard" />
          ),
        }}
        name="dashboardTabs" component={DashboardStack} />
      <AppBottomTabs.Screen
        options={{
          tabBarLabel: "MyCalendar",
          tabBarIcon: ({ color }) => (
            <FontAwesome color={color} size={30} name="calendar" />
          ),
        }}
        name="myCalendarTabs" component={MyCalendar} />
      <AppBottomTabs.Screen
        options={{
          tabBarLabel: "myGroups",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons color={color} size={30} name="home-group" />
          ),
        }}
        name="myGroupsTabs" component={MyGroups} />
    </AppBottomTabs.Navigator>
  )
}
// export const AuthStack = () => {
//   return(
//     <AuthStackNavigator.Navigator>
//       <AuthStackNavigator.Screen name='login' component={Login} options={LoginScreenOptions} />
//       <AuthStackNavigator.Screen name='signup' component={Signup} options={SignupScreenOptions} />
//     </AuthStackNavigator.Navigator>
//   )
// }