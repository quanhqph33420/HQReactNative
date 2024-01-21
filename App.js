import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./login/SignInScreen";
import SignUpScreen from "./login/SignUpScreen";
import MainScreen from "./main/MainScreen";
import UserScreen from "./main/profile/UserScreen";
import ProfileScreen from "./main/profile/ProfileScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          options={{ headerShown: false }}
          component={SignInScreen}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={MainScreen}
        />
        <Stack.Screen
          name="user"
          options={{ headerShown: false }}
          component={UserScreen}
        />
        <Stack.Screen
          name="profile"
          options={{ headerShown: false }}
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
