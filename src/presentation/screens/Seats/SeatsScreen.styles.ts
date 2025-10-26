import { StyleSheet } from 'react-native';
import theme from '../../../core/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightGray,
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: theme.colors.light,
  },
  headerRow: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: theme.colors.light,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 4,
    marginBottom: 12,
  },
  backButtonRow: {
    padding: 4,
    marginRight: 12,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  headerInlineText: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: 22,
    fontFamily: theme.fonts.medium,
    color: theme.colors.dark,
    marginBottom: 4,
    textAlign: 'center',
  },
  releaseDate: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.blue,
    textAlign: 'center',
  },
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  showtimesSection: {
    paddingVertical: 8,
  },
  showtimesScrollContent: {
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    gap: 12,
  },
  showtimeCardOuter: {
    marginRight: 12,
  },
  showtimeCard: {
    width: '100%',
    backgroundColor: theme.colors.light,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
    minHeight: 280,
  },
  showtimeInfo: {
    marginBottom: 12,
  },
  timeText: {
    fontSize: 22,
    fontFamily: theme.fonts.bold,
    color: theme.colors.dark,
    marginBottom: 6,
  },
  hallText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
  seatGridWrapper: {
    marginBottom: 14,
    alignItems: 'center',
  },
  compactSeatGrid: {
    gap: 2,
  },
  seatRow: {
    flexDirection: 'row',
  },
  seat: {
    borderRadius: 2,
  },
  priceRow: {
    marginTop: 4,
  },
  priceText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
  priceValueBold: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.dark,
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    borderTopWidth: 0,
  },
  selectSeatsButton: {
    backgroundColor: theme.colors.blue,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectSeatsButtonText: {
    color: theme.colors.light,
    fontSize: 16,
    fontFamily: theme.fonts.medium,
  },
});
