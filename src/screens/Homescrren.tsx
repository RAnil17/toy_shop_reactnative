import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useStore } from "../context/store";
import ProductCard from "../components/ProductCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/index";
import SearchBar from "../components/SearchBar";
import CategoryChips from "../components/CategoryChips";
import { PRODUCTS } from "../data/products";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { products, cart } = useStore();
  const [query, setQuery] = React.useState("");
  const [activeCat, setActiveCat] = React.useState<string | undefined>(undefined);
  const categories = React.useMemo(() => Array.from(new Set(PRODUCTS.map((p) => (p as any).category || "Other"))).sort(), []);
  const filtered = React.useMemo(() => {
    return products.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchText = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const matchCat = !activeCat || (((p as any).category || "Other") === activeCat);
      return matchText && matchCat;
    });
  }, [products, query, activeCat]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.h1}>ToyShop</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity 
            style={styles.btn} 
            onPress={() => navigation.navigate("Orders")}
            accessibilityRole="button"
            accessibilityLabel="View Orders"
          >
            <Icon name="clipboard-text-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.btnText}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.btn} 
            onPress={() => navigation.navigate("Cart")}
            accessibilityRole="button"
            accessibilityLabel="Open Cart"
          >
            <Icon name="cart-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.btnText}>Cart ({cart.length})</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <View>
            <View style={{ paddingHorizontal: 16 }}>
              <SearchBar value={query} onChange={setQuery} />
            </View>
            <CategoryChips categories={categories} active={activeCat} onSelect={setActiveCat} />
            <View style={{ height: 8 }} />
          </View>
        }
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => navigation.navigate("Details", { id: item.id })} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  h1: { fontSize: 24, fontWeight: "800" },
  btn: { backgroundColor: "#111", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, flexDirection: "row", alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700" },
});
