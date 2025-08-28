import React, { useState, useMemo } from "react";
import { 
  FlatList, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  RefreshControl,
  ScrollView
} from "react-native";
import { useStore } from "../context/store";
import ProductCard from "../components/ProductCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/index";
import SearchBar from "../components/SearchBar";
import CategoryChips from "../components/CategoryChips";
import { theme } from "../theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { 
    products, 
    cartItemCount, 
    getFeaturedProducts, 
    getProductsByCategory,
    addToWishlist,
    removeFromWishlist,
    isInWishlist 
  } = useStore();
  
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [refreshing, setRefreshing] = useState(false);

  const categories = useMemo(() => 
    Array.from(new Set(products.map(p => p.category))).sort(), 
    [products]
  );

  const featuredProducts = useMemo(() => getFeaturedProducts(), [getFeaturedProducts]);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Filter by category
    if (activeCategory) {
      filtered = getProductsByCategory(activeCategory);
    }
    
    // Filter by search query
    if (query.trim()) {
      const searchTerm = query.trim().toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    return filtered;
  }, [products, activeCategory, query, getProductsByCategory]);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleWishlistPress = (productId: string) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.greeting}>Welcome to</Text>
          <Text style={styles.title}>ToyShop</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate("Orders")}
          >
            <Icon name="clipboard-text-outline" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => navigation.navigate("Cart")}
          >
            <Icon name="cart-outline" size={24} color={theme.colors.text.white} />
            {cartItemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      
      <SearchBar 
        value={query} 
        onChange={setQuery}
        placeholder="Search for toys..."
      />
      
      <CategoryChips 
        categories={categories}
        active={activeCategory}
        onSelect={setActiveCategory}
      />
    </View>
  );

  const renderFeaturedSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Toys</Text>
                  <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredScroll}
      >
        {featuredProducts.map(product => (
          <View key={product.id} style={styles.featuredCard}>
            <ProductCard
              product={product}
              onPress={() => navigation.navigate("Details", { id: product.id })}
              onWishlistPress={() => handleWishlistPress(product.id)}
              isInWishlist={isInWishlist(product.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderProductItem = ({ item }: { item: any }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate("Details", { id: item.id })}
      onWishlistPress={() => handleWishlistPress(item.id)}
      isInWishlist={isInWishlist(item.id)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="toy-brick-outline" size={64} color={theme.colors.text.light} />
      <Text style={styles.emptyStateTitle}>No toys found</Text>
      <Text style={styles.emptyStateText}>
        Try adjusting your search or category filter
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        ListHeaderComponent={
          <View>
            {renderHeader()}
            {!activeCategory && !query && renderFeaturedSection()}
            <View style={styles.productsHeader}>
              <Text style={styles.productsTitle}>
                {activeCategory ? activeCategory : "All Toys"}
              </Text>
              <Text style={styles.productsCount}>
                {filteredProducts.length} items
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={renderEmptyState}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  contentContainer: {
    paddingBottom: theme.spacing.xl,
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.md,
  },
  greeting: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
  },
  headerActions: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.round,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.small,
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.round,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    ...theme.shadows.small,
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.round,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    ...theme.typography.small,
    color: theme.colors.text.primary,
    fontWeight: "700",
  },
  section: {
    marginTop: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  seeAllText: {
    ...theme.typography.captionBold,
    color: theme.colors.primary,
  },
  featuredScroll: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  featuredCard: {
    width: 200,
  },
  productsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  productsTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  productsCount: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  productRow: {
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: theme.spacing.xxl,
  },
  emptyStateTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  emptyStateText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: "center",
    paddingHorizontal: theme.spacing.lg,
  },
});


