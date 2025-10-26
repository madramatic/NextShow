import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import theme from '../../../../core/theme';

type DateItem = { id: number; day: number; month: string };

export default function DateTabs({
  dates,
  selectedDate,
  onSelect,
}: {
  dates: DateItem[];
  selectedDate: number;
  onSelect: (id: number) => void;
}) {
  return (
    <View style={styles.dateSection}>
      <Text style={styles.sectionTitle}>Date</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateScrollContent}
      >
        {dates.map((date) => (
          <Pressable
            key={date.id}
            style={[
              styles.dateTab,
              selectedDate === date.id && styles.dateTabActive,
            ]}
            onPress={() => onSelect(date.id)}
          >
            <Text
              style={[
                styles.dateTabText,
                selectedDate === date.id && styles.dateTabTextActive,
              ]}
            >
              {date.day} {date.month}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  dateSection: {
    paddingVertical: 40,
    backgroundColor: theme.colors.lightGray,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.dark,
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 40,
  },
  dateScrollContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  dateTab: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: theme.colors.gray,
  },
  dateTabActive: {
    backgroundColor: theme.colors.blue,
  },
  dateTabText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.light,
  },
  dateTabTextActive: {
    color: theme.colors.light,
  },
});
