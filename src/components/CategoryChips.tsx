import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../theme";

type Props = {
  categories: string[];
  active?: string;
  onSelect: (c?: string) => void;
};

export default function CategoryChips({ categories, active, onSelect }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      <Chip label="All" active={!active} onPress={() => onSelect(undefined)} />
      {categories.map((c) => (
        <Chip key={c} label={c} active={active === c} onPress={() => onSelect(c)} />
      ))}
    </ScrollView>
  );
}

function Chip({ label, active, onPress }: { label: string; active?: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.text, active && styles.textActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { paddingVertical: 8, gap: 8, paddingHorizontal: 16 },
  chip: { backgroundColor: "#eee", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  chipActive: { backgroundColor: theme.colors.primary + "22" },
  text: { color: theme.colors.muted, fontWeight: "700" },
  textActive: { color: theme.colors.primary },
});


