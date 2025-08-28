import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text, View, StyleSheet } from "react-native";
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

// Styled components to avoid inline styles
const CartBadge = ({ count }) => {
  if (count === 0) return null;
  
  return (
    <View style={styles.cartBadge}>
      <Text style={styles.cartBadgeText}>
        {count > 99 ? "99+" : count}
      </Text>
    </View>
  );
};

const CartIcon = ({ color, size, focused, count }) => (
  <View style={styles.cartIconContainer}>
    <Icon 
      name={focused ? "cart" : "cart-outline"} 
      size={size} 
      color={color} 
    />
    <CartBadge count={count} />
  </View>
);

const HomeIcon = ({ color, size, focused }) => (
  <Icon 
    name={focused ? "home" : "home-outline"} 
    size={size} 
    color={color} 
  />
);

const CategoriesIcon = ({ color, size, focused }) => (
  <Icon 
    name={focused ? "view-grid" : "view-grid-outline"} 
    size={size} 
    color={color} 
  />
);

const OrdersIcon = ({ color, size, focused }) => (
  <Icon 
    name={focused ? "clipboard-text" : "clipboard-text-outline"} 
    size={size} 
    color={color} 
  />
);

// Icon functions for tabBarIcon
const getHomeIcon = (color, size, focused) => (
  <HomeIcon color={color} size={size} focused={focused} />
);

const getCategoriesIcon = (color, size, focused) => (
  <CategoriesIcon color={color} size={size} focused={focused} />
);

const getCartIcon = (color, size, focused, count) => (
  <CartIcon color={color} size={size} focused={focused} count={count} />
);

const getOrdersIcon = (color, size, focused) => (
  <OrdersIcon color={color} size={size} focused={focused} />
);

function Tabs() {
  const { cart } = useStore();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

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
          tabBarIcon: ({ color, size, focused }) => getHomeIcon(color, size, focused),
        }} 
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoriesScreen} 
        options={{ 
          title: "Categories",
          tabBarIcon: ({ color, size, focused }) => getCategoriesIcon(color, size, focused),
        }} 
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{ 
          title: "Cart",
          tabBarIcon: ({ color, size, focused }) => getCartIcon(color, size, focused, cartItemCount),
        }} 
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersScreen} 
        options={{ 
          title: "Orders",
          tabBarIcon: ({ color, size, focused }) => getOrdersIcon(color, size, focused),
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

const styles = StyleSheet.create({
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: theme.colors.accent,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  cartIconContainer: {
    position: 'relative',
  },
});
