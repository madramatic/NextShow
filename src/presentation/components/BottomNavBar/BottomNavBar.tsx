
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import theme from '../../../core/theme/index';

// Constants for BottomNavBar
const NAVBAR_RADIUS = theme.shape.navbarRadius;
const NAVBAR_PADDING_HORIZONTAL = theme.spacing.navbarHorizontal;
const NAVBAR_PADDING_BOTTOM = theme.spacing.navbarBottom;
const NAVBAR_PADDING_TOP = theme.spacing.navbarTop;
const ICON_SIZE = theme.sizes.icon;
const ICON_OPACITY_DISABLED = 0.5;
const LABEL_FONT_SIZE = theme.sizes.labelFont;
const LABEL_LETTER_SPACING = theme.spacing.labelLetterSpacing;

type TabConfig = {
  label: string;
  icon: React.ReactElement;
  route: string;
  testID?: string;
};

const TABS: TabConfig[] = [
  {
    label: 'Dashboard',
    icon: <MaterialIcons name="dashboard" />, // color/size set dynamically
    route: '/dashboard',
    testID: 'tab-dashboard',
  },
  {
    label: 'Watch',
    icon: <Ionicons name="play-circle" />, // color/size set dynamically
    route: '/',
    testID: 'tab-watch',
  },
  {
    label: 'Media Library',
    icon: <Feather name="archive" />, // color/size set dynamically
    route: '/media',
    testID: 'tab-media',
  },
  {
    label: 'More',
    icon: <Feather name="menu" />, // color/size set dynamically
    route: '/more',
    testID: 'tab-more',
  },
];

const getActiveIndex = (segments: string[]): number => {
  switch (segments[0]) {
    case 'media':
      return 2;
    case 'more':
      return 3;
    case 'dashboard':
      return 0;
    default:
      return 1; // Watch
  }
};

const getTabIconColor = (isActive: boolean): string =>
  isActive ? theme.colors.light : theme.colors.gray;

const getTabLabelStyle = (isActive: boolean, isDisabled: boolean): TextStyle => ({
  ...styles.label,
  ...(isActive ? styles.activeLabel : {}),
  ...(isDisabled ? { opacity: ICON_OPACITY_DISABLED } : {}),
});

const getTabIconProps = (isActive: boolean, isDisabled: boolean) => ({
  color: getTabIconColor(isActive),
  size: ICON_SIZE,
  opacity: isDisabled ? ICON_OPACITY_DISABLED : 1,
});

const isTabDisabled = (idx: number): boolean => idx !== 1;

const handleTabPress = (router: ReturnType<typeof useRouter>, route: string, disabled: boolean) => {
  if (!disabled) return;
  router.replace(route);
};

const BottomNavBar: React.FC = () => {
  const router = useRouter();
  const segments = useSegments();
  const activeIndex = getActiveIndex(segments);

  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        {TABS.map((tab, idx) => {
          const isActive = idx === activeIndex;
          const disabled = isTabDisabled(idx);
          return (
            <TouchableOpacity
              key={tab.label}
              style={styles.tab}
              onPress={() => !disabled && router.replace(tab.route)}
              activeOpacity={!disabled ? 0.8 : 1}
              disabled={disabled}
              testID={tab.testID}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive, disabled }}
            >
              <View style={styles.iconWrapper}>
                {React.cloneElement(tab.icon, getTabIconProps(isActive, disabled))}
              </View>
              <Text style={getTabLabelStyle(isActive, disabled)}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomNavBar;

const styles = StyleSheet.create({
  outer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 100,
  } as ViewStyle,
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.dark,
    borderTopLeftRadius: NAVBAR_RADIUS,
    borderTopRightRadius: NAVBAR_RADIUS,
    paddingHorizontal: NAVBAR_PADDING_HORIZONTAL,
    paddingBottom: NAVBAR_PADDING_BOTTOM,
    paddingTop: NAVBAR_PADDING_TOP,
    marginHorizontal: 0,
    marginBottom: 0,
  shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  } as ViewStyle,
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  } as ViewStyle,
  iconWrapper: {
    marginBottom: 2,
  } as ViewStyle,
  label: {
    fontFamily: theme.fonts.regular,
    fontSize: LABEL_FONT_SIZE,
    color: theme.colors.lightGray,
    letterSpacing: LABEL_LETTER_SPACING,
  } as TextStyle,
  activeLabel: {
    color: theme.colors.light,
    fontFamily: theme.fonts.bold,
  } as TextStyle,
});
