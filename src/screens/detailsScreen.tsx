import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/index";
import { useStore } from "../context/store";
import { theme } from "../theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProductCard from "../components/ProductCard";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

const { width } = Dimensions.get("window");

export default function ProductDetailsScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const {
    findProduct,
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getRecommendations,
  } = useStore();

  const product = findProduct(id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  const images = product.images || [product.image];
  const recommendations = getRecommendations(id);
  const isWishlisted = isInWishlist(id);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product.stockCount || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product.inStock) {
      Alert.alert("Out of Stock", "This product is currently out of stock.");
      return;
    }
    
    addToCart(id, quantity);
    Alert.alert(
      "Added to Cart",
      `${quantity}x ${product.title} added to your cart!`,
      [
        { text: "Continue Shopping", style: "cancel" },
        { text: "View Cart", onPress: () => navigation.navigate("Cart") },
      ]
    );
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  const renderImageGallery = () => (
    <View style={styles.imageSection}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setSelectedImageIndex(index);
        }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.mainImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      
      {images.length > 1 && (
        <View style={styles.imageIndicators}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === selectedImageIndex && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );

  const renderProductInfo = () => (
    <View style={styles.productInfo}>
      <View style={styles.headerRow}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.brand}>{product.brand}</Text>
        </View>
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={handleWishlistToggle}
        >
          <Icon
            name={isWishlisted ? "heart" : "heart-outline"}
            size={24}
            color={isWishlisted ? theme.colors.primary : theme.colors.text.secondary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.ratingRow}>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color={theme.colors.accent} />
          <Text style={styles.ratingText}>
            {product.rating} ({product.reviewCount} reviews)
          </Text>
        </View>
        <Text style={styles.ageRange}>{product.ageRange}</Text>
      </View>

      <View style={styles.priceSection}>
        <Text style={styles.price}>₹{product.price}</Text>
        {product.originalPrice && product.originalPrice > product.price && (
          <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
        )}
        {product.sale && (
          <View style={styles.saleBadge}>
            <Text style={styles.saleText}>SALE</Text>
          </View>
        )}
      </View>

      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Category</Text>
          <Text style={styles.detailValue}>{product.category}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Stock</Text>
          <Text style={[
            styles.detailValue,
            !product.inStock && styles.outOfStockText
          ]}>
            {product.inStock ? `${product.stockCount || 'Available'}` : 'Out of Stock'}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderQuantityStepper = () => (
    <View style={styles.quantitySection}>
      <Text style={styles.quantityLabel}>Quantity</Text>
      <View style={styles.quantityControls}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          <Icon
            name="minus"
            size={20}
            color={quantity <= 1 ? theme.colors.text.light : theme.colors.text.primary}
          />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(quantity + 1)}
          disabled={quantity >= (product.stockCount || 10)}
        >
          <Icon
            name="plus"
            size={20}
            color={quantity >= (product.stockCount || 10) ? theme.colors.text.light : theme.colors.text.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAddToCartButton = () => (
    <TouchableOpacity
      style={[
        styles.addToCartButton,
        !product.inStock && styles.disabledButton,
      ]}
      onPress={handleAddToCart}
      disabled={!product.inStock}
    >
      <Icon name="cart-plus" size={20} color={theme.colors.text.white} />
      <Text style={styles.addToCartText}>
        {product.inStock ? "Add to Cart" : "Out of Stock"}
      </Text>
    </TouchableOpacity>
  );

  const renderRecommendations = () => (
    <View style={styles.recommendationsSection}>
      <Text style={styles.recommendationsTitle}>You may also like</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recommendationsScroll}
      >
        {recommendations.map((recProduct) => (
          <View key={recProduct.id} style={styles.recommendationCard}>
            <ProductCard
              product={recProduct}
              onPress={() => navigation.replace("Details", { id: recProduct.id })}
              onWishlistPress={() => {
                if (isInWishlist(recProduct.id)) {
                  removeFromWishlist(recProduct.id);
                } else {
                  addToWishlist(recProduct.id);
                }
              }}
              isInWishlist={isInWishlist(recProduct.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderImageGallery()}
      {renderProductInfo()}
      {renderQuantityStepper()}
      {renderAddToCartButton()}
      {recommendations.length > 0 && renderRecommendations()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    ...theme.typography.h3,
    color: theme.colors.text.secondary,
  },
  imageSection: {
    position: "relative",
  },
  mainImage: {
    width: width,
    height: width * 0.8,
  },
  imageIndicators: {
    position: "absolute",
    bottom: theme.spacing.md,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing.xs,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.background.card,
    opacity: 0.5,
  },
  activeIndicator: {
    opacity: 1,
    backgroundColor: theme.colors.primary,
  },
  productInfo: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.card,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.sm,
  },
  titleSection: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  brand: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  wishlistButton: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.round,
    backgroundColor: theme.colors.background.primary,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.small,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.xs,
  },
  ageRange: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  priceSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  price: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    marginRight: theme.spacing.sm,
  },
  originalPrice: {
    ...theme.typography.body,
    color: theme.colors.text.light,
    textDecorationLine: "line-through",
    marginRight: theme.spacing.sm,
  },
  saleBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.radius.sm,
  },
  saleText: {
    ...theme.typography.small,
    color: theme.colors.text.white,
    fontWeight: "700" as const,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    lineHeight: 24,
    marginBottom: theme.spacing.md,
  },
  detailsRow: {
    flexDirection: "row",
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  detailValue: {
    ...theme.typography.bodyBold,
    color: theme.colors.text.primary,
  },
  outOfStockText: {
    color: theme.colors.error,
  },
  quantitySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.card,
    marginTop: theme.spacing.sm,
  },
  quantityLabel: {
    ...theme.typography.bodyBold,
    color: theme.colors.text.primary,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.background.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  quantityText: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    minWidth: 30,
    textAlign: "center",
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    margin: theme.spacing.md,
    borderRadius: theme.radius.lg,
    gap: theme.spacing.sm,
    ...theme.shadows.medium,
  },
  disabledButton: {
    backgroundColor: theme.colors.text.light,
  },
  addToCartText: {
    ...theme.typography.bodyBold,
    color: theme.colors.text.white,
  },
  recommendationsSection: {
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  recommendationsTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  recommendationsScroll: {
    gap: theme.spacing.sm,
  },
  recommendationCard: {
    width: 160,
  },
});


