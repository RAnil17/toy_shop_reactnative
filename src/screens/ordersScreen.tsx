import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/index";
import { useStore } from "../context/store";
import { theme } from "../theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = NativeStackScreenProps<RootStackParamList, "Orders">;

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return theme.colors.warning;
    case "confirmed":
      return theme.colors.secondary;
    case "shipped":
      return theme.colors.primary;
    case "delivered":
      return theme.colors.success;
    default:
      return theme.colors.text.secondary;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return "clock-outline";
    case "confirmed":
      return "check-circle-outline";
    case "shipped":
      return "truck-delivery-outline";
    case "delivered":
      return "package-variant-closed-check";
    default:
      return "help-circle-outline";
  }
};

export default function OrdersScreen({ navigation, route }: Props) {
  const { orders } = useStore();
  const { justPlaced } = route.params || {};

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderEmptyOrders = () => (
    <View style={styles.emptyContainer}>
      <Icon name="package-variant" size={80} color={theme.colors.text.light} />
      <Text style={styles.emptyTitle}>No orders yet</Text>
      <Text style={styles.emptyText}>
        Start shopping to see your orders here!
      </Text>
      <TouchableOpacity
        style={styles.shopNowButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.shopNowText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOrderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.orderCard,
        justPlaced === item.orderId && styles.highlightedOrder,
      ]}
      onPress={() => {
        // TODO: Navigate to order details when implemented
        Alert.alert("Order Details", `Order #${item.orderId} details will be shown here.`);
      }}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>#{item.orderId}</Text>
          <Text style={styles.orderDate}>
            {formatDate(item.placedAtISO)} • {formatTime(item.placedAtISO)}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Icon
            name={getStatusIcon(item.status)}
            size={16}
            color={getStatusColor(item.status)}
          />
          <Text style={[
            styles.statusText,
            { color: getStatusColor(item.status) }
          ]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.orderItems}>
        {item.items.slice(0, 2).map((orderItem: any, index: number) => (
          <View key={index} style={styles.orderItem}>
            <Image source={{ uri: orderItem.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {orderItem.title}
              </Text>
              <Text style={styles.itemQty}>Qty: {orderItem.qty}</Text>
            </View>
            <Text style={styles.itemPrice}>₹{orderItem.price * orderItem.qty}</Text>
          </View>
        ))}
        {item.items.length > 2 && (
          <Text style={styles.moreItems}>
            +{item.items.length - 2} more items
          </Text>
        )}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>₹{item.total}</Text>
      </View>

      {justPlaced === item.orderId && (
        <View style={styles.newOrderBadge}>
          <Text style={styles.newOrderText}>New Order!</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>My Orders</Text>
      {orders.length > 0 && (
        <Text style={styles.orderCount}>{orders.length} orders</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderId}
        renderItem={renderOrderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyOrders}
        contentContainerStyle={styles.contentContainer}
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
  orderCount: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
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
    borderRadius: theme.radius.lg,
    ...theme.shadows.medium,
  },
  shopNowText: {
    ...theme.typography.bodyBold,
    color: theme.colors.text.white,
  },
  orderCard: {
    backgroundColor: theme.colors.background.card,
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
    ...theme.shadows.medium,
    position: "relative",
  },
  highlightedOrder: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.md,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    ...theme.typography.bodyBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  orderDate: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  statusText: {
    ...theme.typography.captionBold,
  },
  orderItems: {
    marginBottom: theme.spacing.md,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.sm,
    marginRight: theme.spacing.sm,
  },
  itemDetails: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  itemTitle: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  itemQty: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  itemPrice: {
    ...theme.typography.bodyBold,
    color: theme.colors.primary,
  },
  moreItems: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    textAlign: "center",
    paddingVertical: theme.spacing.sm,
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  totalLabel: {
    ...theme.typography.bodyBold,
    color: theme.colors.text.primary,
  },
  totalAmount: {
    ...theme.typography.h3,
    color: theme.colors.primary,
  },
  newOrderBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.radius.round,
  },
  newOrderText: {
    ...theme.typography.small,
    color: theme.colors.text.primary,
    fontWeight: "700" as const,
  },
});
