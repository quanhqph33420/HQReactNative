import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "./screens/welcome/Welcome";
import SignInScreen from "./screens/login/screens/SignInScreen";
import SignUpScreen from "./screens/login/screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/products/cart/CartScreen";
import ListProducts from "./screens/products/list/ListProducts";
import FavoriteProduct from "./screens/products/favorite/FavoriteProduct";
import ProductScreen from "./screens/products/ProductScreen";
import ChatScreen from "./screens/chat/chat/ChatScreen";
import UserScreen from "./screens/profile/UserScreen";
import ProfileScreen from "./screens/profile/UserScreen";
import AllchatScreen from "./screens/chat/AllchatScreen";
import ForgotPasswordScreen from "./screens/login/getPassword/ForgotPasswordScreen";
import ResetPassword from "./screens/login/getPassword/ResetPassword";
import VerifyScreen from "./screens/login/getPassword/VerifyScreen";

import { Provider } from "react-redux";
import store from "./src/redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="welcome">
          <Stack.Screen
            name="welcome"
            options={{ headerShown: false }}
            component={Welcome}
          />
          <Stack.Screen
            name="SignIn"
            options={{ headerShown: false }}
            component={SignInScreen}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerTitle: "",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: "#f2f2f2" },
            }}
          />
          <Stack.Screen
            name="Main"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="user"
            options={{
              headerStyle: {
                backgroundColor: "#f2f2f2",
              },
              headerShadowVisible: false,
            }}
            component={UserScreen}
          />
          <Stack.Screen
            name="profile"
            options={{ headerTitle: "User" }}
            component={ProfileScreen}
          />
          <Stack.Screen
            name="ListProducts"
            options={{ headerShown: false }}
            component={ListProducts}
          />
          <Stack.Screen
            name="ProductScreen"
            options={{
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: "#f2f2f2",
              },
              headerShadowVisible: false,
            }}
            component={ProductScreen}
          />
          <Stack.Screen
            name="Cart"
            options={{ headerShown: false }}
            component={CartScreen}
          />
          <Stack.Screen
            name="favorite"
            options={{ headerTitle: "Favorite" }}
            component={FavoriteProduct}
          />
          <Stack.Screen
            name="allChat"
            options={{
              headerTitle: "My message",
            }}
            component={AllchatScreen}
          />
          <Stack.Screen name="chat" component={ChatScreen} />
          <Stack.Screen
            name="forgotPassword"
            options={{
              headerTitle: "",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: "#f2f2f2" },
            }}
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name="resetPassword"
            options={{
              headerTitle: "",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: "#f2f2f2" },
            }}
            component={ResetPassword}
          />
          <Stack.Screen
            name="verifyPassword"
            options={{
              headerTitle: "",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: "#f2f2f2" },
            }}
            component={VerifyScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
