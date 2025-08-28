import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";
import HomeScreen from "../screens/HomeScreen.js";
import DetailsScreen from "../screens/detailsScreen.js";
import CartScreen from "../screens/CartScreen.js";
import CheckoutScreen from "../screens/checkoutScreen.js";
import OrdersScreen from "../screens/ordersScreen.js";
import CategoriesScreen from "../screens/CategoriesScreen.js";
import { useStore } from "../context/store.js";
import { theme } from "../theme.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  const { cartItemCount } = useStore();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          const map = {
            Home: "home",
            Categories: "view-grid",
            Cart: "cart",
            Orders: "clipboard-text",
          };
          const name = map[route.name] || "circle";
          return <Icon name={name} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background.card,
          borderTopColor: theme.colors.border.light,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Icon 
              name={focused ? "home" : "home-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoriesScreen} 
        options={{ 
          title: "Categories",
          tabBarIcon: ({ color, size, focused }) => (
            <Icon 
              name={focused ? "view-grid" : "view-grid-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{ 
          title: "Cart",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ position: "relative" }}>
              <Icon 
                name={focused ? "cart" : "cart-outline"} 
                size={size} 
                color={color} 
              />
              {cartItemCount > 0 && (
                <View style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  backgroundColor: theme.colors.accent,
                  borderRadius: 10,
                  minWidth: 20,
                  height: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 4,
                }}>
                  <Text style={{
                    fontSize: 10,
                    fontWeight: "700",
                    color: theme.colors.text.primary,
                  }}>
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }} 
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersScreen} 
        options={{ 
          title: "Orders",
          tabBarIcon: ({ color, size, focused }) => (
            <Icon 
              name={focused ? "clipboard-text" : "clipboard-text-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background.card,
        },
        headerTintColor: theme.colors.text.primary,
        headerTitleStyle: {
          fontWeight: "700",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={Tabs} 
        options={{ 
          title: "ToyShop", 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={{ 
          title: "Product Details",
          headerBackTitle: "Back",
        }} 
      />
      <Stack.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{ 
          title: "Shopping Cart",
          headerBackTitle: "Back",
        }} 
      />
      <Stack.Screen 
        name="Checkout" 
        component={CheckoutScreen} 
        options={{ 
          title: "Checkout",
          headerBackTitle: "Back",
        }} 
      />
      <Stack.Screen 
        name="Orders" 
        component={OrdersScreen} 
        options={{ 
          title: "My Orders",
          headerBackTitle: "Back",
        }} 
      />
    </Stack.Navigator>
  );
}
