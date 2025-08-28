import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useStore } from "../context/store.js";
import ProductCard from "../components/ProductCard.js";
import SearchBar from "../components/SearchBar.js";
import CategoryChips from "../components/CategoryChips.js";
import { PRODUCTS } from "../data/products.js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function HomeScreen({ navigation }) {
  const { products, cart } = useStore();
  const [query, setQuery] = React.useState("");
  const [activeCat, setActiveCat] = React.useState(undefined);
  const categories = React.useMemo(() => Array.from(new Set(PRODUCTS.map((p) => p.category || "Other"))).sort(), []);
  const filtered = React.useMemo(() => {
    return products.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchText = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const matchCat = !activeCat || (p.category || "Other") === activeCat;
      return matchText && matchCat;
    });
  }, [products, query, activeCat]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.h1}>ToyShop</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.btn} 
            onPress={() => navigation.navigate("Orders")}
            accessibilityRole="button"
            accessibilityLabel="View Orders"
          >
            <Icon name="clipboard-text-outline" size={20} color="#fff" style={styles.btnIcon} />
            <Text style={styles.btnText}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.btn} 
            onPress={() => navigation.navigate("Cart")}
            accessibilityRole="button"
            accessibilityLabel="Open Cart"
          >
            <Icon name="cart-outline" size={20} color="#fff" style={styles.btnIcon} />
            <Text style={styles.btnText}>Cart ({cart.length})</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={
          <View>
            <View style={styles.searchContainer}>
              <SearchBar value={query} onChange={setQuery} />
            </View>
            <CategoryChips categories={categories} active={activeCat} onSelect={setActiveCat} />
            <View style={styles.headerSpacing} />
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
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerButtons: { flexDirection: "row", gap: 8 },
  h1: { fontSize: 24, fontWeight: "800" },
  btn: { backgroundColor: "#111", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, flexDirection: "row", alignItems: "center" },
  btnIcon: { marginRight: 8 },
  btnText: { color: "#fff", fontWeight: "700" },
  listContainer: { padding: 16 },
  columnWrapper: { justifyContent: 'space-between' },
  searchContainer: { paddingHorizontal: 16 },
  headerSpacing: { height: 8 },
});
