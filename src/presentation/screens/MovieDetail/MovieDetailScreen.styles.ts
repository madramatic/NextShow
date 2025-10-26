import { StyleSheet } from 'react-native';
import theme from '../../../core/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.light,
  },
  landscapeContainer: {
    flexDirection: 'row',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  landscapeScrollContent: {
    paddingBottom: 0,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.light,
  },
  errorText: {
    color: theme.colors.pink,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
  },
  logo: {
    width: 200,
    height: 60,
    alignSelf: 'center',
    marginBottom: 12,
  },
  headerSection: {
    position: 'relative',
    height: 466,
  },
  landscapeHeaderSection: {
    width: '45%',
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 56,
    left: 20,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  landscapeBackButton: {
    top: 48,
    left: 24,
  },
  watchText: {
    position: 'absolute',
    top: 50,
    left: 70,
    fontSize: 24,
    fontFamily: theme.fonts.medium,
    color: theme.colors.light,
  },
  watchTextPortrait: {
    position: 'absolute',
    top: 58,
    left: 66,
    fontSize: 20,
    fontFamily: theme.fonts.medium,
    color: theme.colors.light,
  },
  landscapeLogoAndButtons: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  landscapeLogo: {
    width: 180,
    height: 54,
    marginBottom: 12,
  },
  landscapeReleaseInfo: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.light,
    marginBottom: 16,
    textAlign: 'center',
  },
  landscapeButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },
  landscapeTicketsButton: {
    flex: 1,
    backgroundColor: theme.colors.blue,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  landscapeTrailerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.blue,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonsOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  releaseInfo: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.light,
    marginBottom: 16,
    textAlign: 'center',
  },
  contentSection: {
    paddingHorizontal: 32,
    paddingTop: 24,
  },
  landscapeContentSection: {
    width: '55%',
    paddingHorizontal: 48,
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: theme.colors.light,
  },
  ticketsButton: {
    backgroundColor: theme.colors.blue,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 66,
  },
  trailerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.blue,
    paddingVertical: 14,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginHorizontal: 66,
  },
  trailerButtonText: {
    color: theme.colors.light,
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    marginLeft: 8,
  },
  genresSection: {
    marginBottom: 24,
  },
  landscapeGenresSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.dark,
    marginBottom: 12,
  },
  landscapeSectionTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  landscapeGenresContainer: {
    gap: 10,
  },
  genreTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  landscapeGenreTag: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  genreText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: theme.colors.light,
  },
  landscapeGenreText: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.lightGray,
    marginBottom: 24,
  },
  overviewSection: {
    marginBottom: 24,
  },
  landscapeOverviewSection: {
    flex: 1,
  },
  overviewText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
  landscapeOverviewText: {
    fontSize: 14,
    lineHeight: 24,
  },
  ticketsButtonText: {
    color: theme.colors.light,
    fontSize: 16,
    fontFamily: theme.fonts.medium,
  },
});

export default styles;
