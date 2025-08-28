import React, { useState, useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/index";
import { useStore } from "../context/store";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { theme } from "../theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CATEGORIES } from "../data/products";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const categoryIcons: Record<string, string> = {
  Plush: "teddy-bear",
  Cars: "car",
  Puzzles: "puzzle",
  STEM: "atom",
  Dolls: "baby-face",
  Outdoor: "bike",
  Learning: "school",
  Electronics: "cellphone",
  Games: "gamepad-variant",
  Crafts: "palette",
  Figures: "human-male",
  Building: "hammer-wrench",
};

export default function CategoriesScreen({ navigation }: Props) {
  const { 
    products, 
    getProductsByCategory,
    addToWishlist,
    removeFromWishlist,
    isInWishlist 
  } = useStore();
  
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [refreshing, setRefreshing] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Filter by category
    if (selectedCategory) {
      filtered = getProductsByCategory(selectedCategory);
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
  }, [products, selectedCategory, query, getProductsByCategory]);

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

  const renderCategoryItem = ({ item }: { item: string }) => {
    const categoryProducts = getProductsByCategory(item);
    const isSelected = selectedCategory === item;
    
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          isSelected && styles.selectedCategory,
        ]}
        onPress={() => setSelectedCategory(isSelected ? undefined : item)}
      >
        <View style={styles.categoryIcon}>
          <Icon 
            name={categoryIcons[item] || "toy-brick"} 
            size={24} 
            color={isSelected ? theme.colors.text.white : theme.colors.primary} 
          />
        </View>
        <Text style={[
          styles.categoryName,
          isSelected && styles.selectedCategoryText,
        ]}>
          {item}
        </Text>
        <Text style={[
          styles.categoryCount,
          isSelected && styles.selectedCategoryText,
        ]}>
          {categoryProducts.length} items
        </Text>
      </TouchableOpacity>
    );
  };

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

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Categories</Text>
      <SearchBar 
        value={query} 
        onChange={setQuery}
        placeholder="Search toys..."
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        ListHeaderComponent={
          <View>
            {renderHeader()}
            <View style={styles.categoriesSection}>
              <Text style={styles.sectionTitle}>Browse by Category</Text>
              <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item}
                renderItem={renderCategoryItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesList}
              />
            </View>
            {selectedCategory && (
              <View style={styles.selectedCategoryHeader}>
                <Text style={styles.selectedCategoryTitle}>
                  {selectedCategory} Toys
                </Text>
                <Text style={styles.selectedCategoryCount}>
                  {filteredProducts.length} items
                </Text>
              </View>
            )}
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
    </View>
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
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  categoriesSection: {
    paddingVertical: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  categoriesList: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  categoryItem: {
    alignItems: "center",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.radius.lg,
    minWidth: 100,
    ...theme.shadows.small,
  },
  selectedCategory: {
    backgroundColor: theme.colors.primary,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.round,
    backgroundColor: theme.colors.background.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  categoryName: {
    ...theme.typography.captionBold,
    color: theme.colors.text.primary,
    textAlign: "center",
    marginBottom: theme.spacing.xs,
  },
  selectedCategoryText: {
    color: theme.colors.text.white,
  },
  categoryCount: {
    ...theme.typography.small,
    color: theme.colors.text.secondary,
    textAlign: "center",
  },
  selectedCategoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background.card,
    marginTop: theme.spacing.sm,
  },
  selectedCategoryTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  selectedCategoryCount: {
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


