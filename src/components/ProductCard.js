import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../theme.js";

const { width } = Dimensions.get("window");
const cardWidth = (width - theme.spacing.md * 3) / 2; // 2 cards per row with spacing

export default function ProductCard({ 
  product, 
  onPress, 
  onWishlistPress, 
  isInWishlist = false,
  compact = false 
}) {
  const renderBadges = () => {
    const badges = [];
    
    if (product.new) {
      badges.push(
        <View key="new" style={[styles.badge, styles.newBadge]}>
          <Text style={styles.badgeText}>NEW</Text>
        </View>
      );
    }
    
    if (product.sale) {
      badges.push(
        <View key="sale" style={[styles.badge, styles.saleBadge]}>
          <Text style={styles.badgeText}>SALE</Text>
        </View>
      );
    }
    
    if (product.featured) {
      badges.push(
        <View key="featured" style={[styles.badge, styles.featuredBadge]}>
          <Text style={styles.badgeText}>⭐</Text>
        </View>
      );
    }
    
    return badges;
  };

  const renderRating = () => (
    <View style={styles.ratingContainer}>
      <Icon name="star" size={12} color={theme.colors.accent} />
      <Text style={styles.ratingText}>
        {product.rating} ({product.reviews})
      </Text>
    </View>
  );

  const renderPrice = () => (
    <View style={styles.priceContainer}>
      <Text style={styles.price}>₹{product.price}</Text>
      {product.discount > 0 && (
        <Text style={styles.originalPrice}>₹{(product.price / (1 - product.discount / 100)).toFixed(2)}</Text>
      )}
    </View>
  );

  return (
    <TouchableOpacity 
      style={[styles.card, compact && styles.compactCard]} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.badgeContainer}>
          {renderBadges()}
        </View>
        {onWishlistPress && (
          <TouchableOpacity 
            style={styles.wishlistButton} 
            onPress={onWishlistPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon 
              name={isInWishlist ? "heart" : "heart-outline"} 
              size={20} 
              color={isInWishlist ? theme.colors.primary : theme.colors.text.primary} 
            />
          </TouchableOpacity>
        )}
        {!product.inStock && (
          <View style={styles.outOfStockOverlay}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        
        {!compact && (
          <Text style={styles.category} numberOfLines={1}>
            {product.category}
          </Text>
        )}
        
        {renderRating()}
        {renderPrice()}
        
        {!compact && (
          <Text style={styles.description} numberOfLines={1}>
            {product.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.lg,
    overflow: "hidden",
    marginBottom: theme.spacing.md,
    ...theme.shadows.medium,
  },
  compactCard: {
    width: "100%",
    flexDirection: "row",
    height: 100,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: cardWidth * 0.8,
    resizeMode: "cover",
  },
  badgeContainer: {
    position: "absolute",
    top: theme.spacing.xs,
    left: theme.spacing.xs,
    flexDirection: "row",
    gap: theme.spacing.xs,
  },
  badge: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  newBadge: {
    backgroundColor: theme.colors.success,
  },
  saleBadge: {
    backgroundColor: theme.colors.primary,
  },
  featuredBadge: {
    backgroundColor: theme.colors.accent,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  wishlistButton: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.round,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.small,
  },
  outOfStockOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  outOfStockText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    padding: theme.spacing.sm,
  },
  title: {
    ...theme.typography.body,
    fontWeight: "600",
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  category: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
  },
  ratingText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.xs,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
  },
  price: {
    ...theme.typography.body,
    fontWeight: "600",
    color: theme.colors.primary,
    marginRight: theme.spacing.xs,
  },
  originalPrice: {
    ...theme.typography.caption,
    color: theme.colors.text.light,
    textDecorationLine: "line-through",
  },
  description: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
  },
});
