import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { useStore } from "../context/store.js";
import { theme } from "../theme.js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CartScreen({ navigation }) {
  const {
    cart,
    findProduct,
    updateQty,
    removeFromCart,
    cartTotal,
    cartItemCount,
    clearCart,
  } = useStore();

  const cartItems = cart.map((item) => {
    const product = findProduct(item.id);
    return { ...item, product };
  }).filter((item) => item.product);

  const subtotal = cartTotal;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + tax;

  const handleQuantityChange = (id, newQty) => {
    if (newQty <= 0) {
      Alert.alert(
        "Remove Item",
        "Do you want to remove this item from your cart?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Remove", style: "destructive", onPress: () => removeFromCart(id) },
        ]
      );
    } else {
      updateQty(id, newQty);
    }
  };

  const handleRemoveItem = (id, title) => {
    Alert.alert(
      "Remove Item",
      `Do you want to remove "${title}" from your cart?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", style: "destructive", onPress: () => removeFromCart(id) },
      ]
    );
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) return;
    
    Alert.alert(
      "Clear Cart",
      "Do you want to remove all items from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear All", style: "destructive", onPress: clearCart },
      ]
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Empty Cart", "Your cart is empty. Add some items first!");
      return;
    }
    navigation.navigate("Checkout");
  };

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Icon name="cart-outline" size={80} color={theme.colors.text.light} />
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptyText}>
        Add some amazing toys to get started!
      </Text>
      <TouchableOpacity
        style={styles.shopNowButton}
        onPress={() => navigation.navigate("Home")}
        accessibilityRole="button"
        accessibilityLabel="Start Shopping"
      >
        <Icon name="shopping" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
        <Text style={styles.shopNowText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCartItem = (item) => (
    <View key={item.id} style={styles.cartItem}>
      <Image source={{ uri: item.product.image }} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.product.title}
        </Text>
        <Text style={styles.itemCategory}>{item.product.category}</Text>
        <Text style={styles.itemPrice}>₹{item.product.price}</Text>
        
        <View style={styles.itemActions}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.id, item.qty - 1)}
            >
              <Icon name="minus" size={16} color={theme.colors.text.primary} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.qty}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.id, item.qty + 1)}
            >
              <Icon name="plus" size={16} color={theme.colors.text.primary} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveItem(item.id, item.product.title)}
          >
            <Icon name="delete-outline" size={20} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.itemTotal}>
        <Text style={styles.itemTotalText}>
          ₹{item.product.price * item.qty}
        </Text>
      </View>
    </View>
  );

  const renderOrderSummary = () => (
    <View style={styles.orderSummary}>
      <Text style={styles.summaryTitle}>Order Summary</Text>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal ({cartItemCount} items)</Text>
        <Text style={styles.summaryValue}>₹{subtotal}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Tax (GST 18%)</Text>
        <Text style={styles.summaryValue}>₹{tax}</Text>
      </View>
      
      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>₹{total}</Text>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        {renderEmptyCart()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Cart</Text>
        <TouchableOpacity onPress={handleClearCart}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.cartList} showsVerticalScrollIndicator={false}>
        {cartItems.map(renderCartItem)}
      </ScrollView>

      {renderOrderSummary()}

      <View style={styles.checkoutSection}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
          accessibilityRole="button"
          accessibilityLabel="Proceed to Checkout"
        >
          <Icon name="credit-card-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          <Text style={styles.checkoutTotal}>₹{total}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
  },
  clearText: {
    ...theme.typography.caption,
    fontWeight: "600",
    color: theme.colors.error,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.xl,
  },
  emptyTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: "center",
    marginBottom: theme.spacing.xl,
  },
  shopNowButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadows.medium,
  },
  shopNowText: {
    ...theme.typography.body,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: "row",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.card,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.small,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemTitle: {
    ...theme.typography.body,
    fontWeight: "600",
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  itemCategory: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  itemPrice: {
    ...theme.typography.body,
    fontWeight: "600",
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  itemActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.background.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  quantityText: {
    ...theme.typography.body,
    fontWeight: "600",
    color: theme.colors.text.primary,
    minWidth: 24,
    textAlign: "center",
  },
  removeButton: {
    padding: theme.spacing.xs,
  },
  itemTotal: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginLeft: theme.spacing.sm,
  },
  itemTotalText: {
    ...theme.typography.body,
    fontWeight: "600",
    color: theme.colors.text.primary,
  },
  orderSummary: {
    backgroundColor: theme.colors.background.card,
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.medium,
  },
  summaryTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  summaryLabel: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  summaryValue: {
    ...theme.typography.body,
    fontWeight: "600",
    color: theme.colors.text.primary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    paddingTop: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  totalLabel: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  totalValue: {
    ...theme.typography.h3,
    color: theme.colors.primary,
  },
  checkoutSection: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  checkoutButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.medium,
  },
  checkoutText: {
    ...theme.typography.body,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  checkoutTotal: {
    ...theme.typography.h3,
    color: "#FFFFFF",
  },
});
