import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../theme.js";

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search toys...",
  onClear 
}) {
  const [isFocused, setIsFocused] = useState(false);

  // Debounce search input
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  const handleClear = () => {
    onChange("");
    if (onClear) onClear();
  };

  return (
    <View style={[
      styles.container,
      isFocused && styles.containerFocused
    ]}>
      <Icon 
        name="magnify" 
        size={20} 
        color={isFocused ? theme.colors.primary : theme.colors.text.secondary} 
        style={styles.searchIcon}
      />
      
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.light}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {value.length > 0 && (
        <TouchableOpacity 
          style={styles.clearButton} 
          onPress={handleClear}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon 
            name="close-circle" 
            size={20} 
            color={theme.colors.text.secondary} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    ...theme.shadows.small,
  },
  containerFocused: {
    borderColor: theme.colors.primary,
    ...theme.shadows.medium,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.text.primary,
    padding: 0,
  },
  clearButton: {
    marginLeft: theme.spacing.sm,
  },
});
