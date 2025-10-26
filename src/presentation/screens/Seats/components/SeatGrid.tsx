import React, { useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import theme from '../../../../core/theme';

type Props = {
  rows?: number;
  cols?: number;
  compact?: boolean;
};

export default function SeatGrid({ rows = 8, cols = 14, compact = true }: Props) {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const padding = 12;
  const maxGridWidth = Math.min(520, SCREEN_WIDTH - 96);

  const effectiveWidth = maxGridWidth - padding * 2;
  const step = effectiveWidth / cols;
  const radius = Math.max(5, Math.floor(step * (compact ? 0.22 : 0.28)));
  const gap = Math.max(4, Math.floor(step - radius * 2));

  const [seatStates] = useState(() => {
    const states: string[][] = [];
    for (let r = 0; r < rows; r++) {
      const row: string[] = [];
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        if (idx % 7 === 0) row.push('occupied');
        else if (idx % 11 === 0) row.push('selected');
        else row.push('available');
      }
      states.push(row);
    }
    return states;
  });

  const svgWidth = cols * (radius * 2) + (cols - 1) * gap;
  const svgHeight = rows * (radius * 2) + (rows - 1) * gap;

  const getSeatColor = (status: string) => {
    switch (status) {
      case 'selected':
        return theme.colors.pink;
      case 'occupied':
        return theme.colors.gray;
      default:
        return theme.colors.blue;
    }
  };

  return (
    <View style={styles.compactSeatGrid}>
      <Svg width={svgWidth} height={svgHeight}>
        <G>
          {seatStates.map((row, r) =>
            row.map((status, c) => {
              const cx = c * (radius * 2 + gap) + radius;
              const cy = r * (radius * 2 + gap) + radius;
              return (
                <Circle
                  key={`s-${r}-${c}`}
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill={getSeatColor(status)}
                />
              );
            })
          )}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  compactSeatGrid: {
    gap: 2,
  },
});
