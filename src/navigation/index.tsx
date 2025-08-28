import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/detailsScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/checkoutScreen";
import OrdersScreen from "../screens/ordersScreen";
import CategoriesScreen from "../screens/CategoriesScreen.tsx";
import { useStore } from "../context/store";
import { theme } from "../theme";

export type RootStackParamList = {
  Home: undefined;
  Details: { id: string };
  Cart: undefined;
  Checkout: undefined;
  Orders: { justPlaced?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function Tabs() {
  const { cartItemCount } = useStore();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
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
          fontWeight: "600" as const,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen as any} 
        options={{ 
          title: "🏠 Home",
        }} 
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoriesScreen as any} 
        options={{ 
          title: "📂 Categories",
        }} 
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen as any} 
        options={{ 
          title: cartItemCount > 0 ? `🛒 Cart (${cartItemCount > 99 ? "99+" : cartItemCount})` : "🛒 Cart",
        }} 
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersScreen as any} 
        options={{ 
          title: "📋 Orders",
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
          fontWeight: "700" as const,
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
