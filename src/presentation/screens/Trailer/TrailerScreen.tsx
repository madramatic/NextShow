import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, Dimensions, Linking } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';
import * as ScreenOrientation from 'expo-screen-orientation';
import theme from '../../../core/theme';
import { fetchMovieVideos, clearMovieVideos } from '../../redux/movieVideosSlice';
import { RootState, AppDispatch } from '../../redux/store';

interface Props {
  movieId?: string | number | null;
}

export default function TrailerScreen({ movieId }: Props) {
  const router = useRouter();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { videos, loading, error } = useSelector((state: RootState) => state.movieVideos);
  const [playing, setPlaying] = useState<boolean>(true);
  const [playerError, setPlayerError] = useState<string | null>(null);

  useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieVideos(Number(movieId)));
    }
    return () => {
      dispatch(clearMovieVideos());
    };
  }, [movieId, dispatch]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } catch (e) {
      }
    })();

    return () => {
      (async () => {
        if (!mounted) return;
        try {
          await ScreenOrientation.unlockAsync();
        } catch (e) {
          // ignore
        }
      })();
      mounted = false;
    };
  }, []);

  const trailerVideo = videos.find(
    (video) => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
  );

  const handleStateChange = useCallback(
    (state: string) => {
      if (state === 'ended') {
        setPlaying(false);
        ScreenOrientation.unlockAsync().finally(() => router.back());
      }
      if (state === 'playing') {
      }
    },
    [router]
  );

  const handleError = useCallback((err: any) => {
    setPlayerError(String(err ?? 'Unknown error'));
  }, []);

  const openInYoutube = useCallback(() => {
    if (!trailerVideo) return;
    const url = `https://www.youtube.com/watch?v=${trailerVideo.key}`;
    Linking.openURL(url).catch(() => {});
  }, [trailerVideo]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.blue} />
      </View>
    );
  }

  if (error || !trailerVideo) {
    return (
      <View style={styles.centered}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.dark} />
        </Pressable>
        <Text style={styles.errorText}>{error || 'No trailer available for this movie'}</Text>
      </View>
    );
  }

  const { width, height } = Dimensions.get('window');
  const playerHeight = Math.max(width, height);

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButtonOverlay} onPress={() => { ScreenOrientation.unlockAsync().finally(() => router.back()); }}>
        <MaterialIcons name="close" size={28} color={theme.colors.light} />
      </Pressable>

      {playerError ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Player error: {playerError}</Text>
          <Pressable onPress={openInYoutube} style={styles.openButton}>
            <Text style={{ color: '#fff' }}>Open in YouTube</Text>
          </Pressable>
        </View>
      ) : (
        <YoutubePlayer
          height={playerHeight}
          play={playing}
          videoId={trailerVideo.key}
          onChangeState={handleStateChange}
          onError={handleError}
          webViewProps={{
            allowsInlineMediaPlayback: true,
            mediaPlaybackRequiresUserAction: false,
            originWhitelist: ['*'],
          }}
          forceAndroidAutoplay
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.light,
    paddingHorizontal: 20,
  },
  errorText: {
    color: theme.colors.pink,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  backButton: {
    position: 'absolute',
    top: 56,
    left: 20,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.light,
    borderRadius: 20,
  },
  backButtonOverlay: {
    position: 'absolute',
    top: 56,
    left: 20,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 24,
    zIndex: 10,
  },
  openButton: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: theme.colors.blue,
    borderRadius: 6,
  },
});
