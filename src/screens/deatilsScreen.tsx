import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useStore } from "../context/store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/index";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function DetailsScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const { findProduct, addToCart } = useStore();
  const product = findProduct(id);
  const [qty, setQty] = useState(1);

  if (!product) return <SafeAreaView><Text>Product not found.</Text></SafeAreaView>;

  const add = () => {
    addToCart(product.id, qty);
    navigation.navigate("Cart");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Image source={{ uri: product.image }} style={styles.img} />
        <View style={styles.body}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>₹{product.price}</Text>
          <Text style={styles.desc}>{product.description}</Text>

          <View style={{ height: 12 }} />
          <View style={styles.qtyRow}>
            <TouchableOpacity style={styles.squareBtn} onPress={() => setQty(Math.max(1, qty - 1))}>
              <Icon name="minus" size={20} color="#333" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{qty}</Text>
            <TouchableOpacity style={styles.squareBtn} onPress={() => setQty(Math.min(10, qty + 1))}>
              <Icon name="plus" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={{ height: 16 }} />
          <TouchableOpacity style={styles.btn} onPress={add}>
            <Icon name="cart-plus" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.btnText}>Add to Cart • ₹{product.price * qty}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  img: { width: "100%", height: 240 },
  body: { padding: 16 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 4 },
  price: { marginTop: 8, fontSize: 18, fontWeight: "800" },
  desc: { marginTop: 10, lineHeight: 20, color: "#333" },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  squareBtn: { width: 42, height: 42, borderRadius: 10, borderWidth: 1, borderColor: "#ccc", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  qtyBtnText: { fontSize: 20, fontWeight: "800" },
  qtyText: { fontSize: 18, width: 40, textAlign: "center" },
  btn: { backgroundColor: "#0a7", padding: 14, borderRadius: 12, alignItems: "center", flexDirection: "row", justifyContent: "center" },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
