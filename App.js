import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./login/SignInScreen";
import SignUpScreen from "./login/SignUpScreen";
import HomeScreen from "./main/HomeScreen";
import UserScreen from "./main/profile/UserScreen";
import ProfileScreen from "./main/profile/ProfileScreen";
import Welcome from "./welcome/Welcome";
import ListProducts from "./main/products/ListProducts";
import ProductScreen from "./main/products/ProductScreen";
import ItemCart from "./welcome/ItemCart";
import CartScreen from "./main/CartScreen";
import FavoriteProduct from "./main/products/FavoriteProduct";

const Stack = createNativeStackNavigator();

function App() {
  return (
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={HomeScreen}
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
        <Stack.Screen
          name="ListProducts"
          options={{ headerShown: false }}
          component={ListProducts}
        />
        <Stack.Screen
          name="ProductScreen"
          options={{ headerShown: false }}
          component={ProductScreen}
        />
        <Stack.Screen
          name="ItemCart"
          options={{ headerShown: false }}
          component={ItemCart}
        />
        <Stack.Screen
          name="Cart"
          options={{ headerShown: false }}
          component={CartScreen}
        />
        <Stack.Screen
          name="favorite"
          options={{ headerShown: false }}
          component={FavoriteProduct}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
