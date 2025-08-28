import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useStore } from "../context/store.js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CheckoutScreen({ navigation }) {
  const { cartTotal, checkout } = useStore();

  const pay = () => {
    const orderId = checkout();
    navigation.replace("Orders", { justPlaced: orderId });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.wrap}>
        <Text style={styles.h1}>Checkout</Text>
        <Text style={styles.meta}>Total to pay</Text>
        <Text style={styles.total}>₹{cartTotal}</Text>
        <TouchableOpacity 
          style={styles.btn} 
          onPress={pay}
          accessibilityRole="button"
          accessibilityLabel="Pay Now"
        >
          <Icon name="credit-card-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.btnText}>Pay Now</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.btn, styles.btnGhost]} 
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go Back"
        >
          <Icon name="arrow-left" size={20} color="#111" style={{ marginRight: 8 }} />
          <Text style={[styles.btnText, { color: "#111" }]}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16, gap: 10 },
  h1: { fontSize: 22, fontWeight: "800" },
  meta: { color: "#666" },
  total: { fontSize: 28, fontWeight: "900", marginVertical: 10 },
  btn: { backgroundColor: "#0a7", paddingHorizontal: 18, paddingVertical: 14, borderRadius: 12, marginTop: 8, flexDirection: "row", alignItems: "center" },
  btnGhost: { backgroundColor: "#eee" },
  btnText: { color: "#fff", fontWeight: "800" },
});
