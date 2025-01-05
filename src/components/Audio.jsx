import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Audio as ExpoAudio } from "expo-av";

// Fetch Surah data from the given URL
const fetchSurah = async (surahNo) => {
  const response = await fetch(`https://quranapi.pages.dev/api/${surahNo}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Surah ${surahNo}`);
  }
  return response.json();
};

const AudioPlayer = () => {
  const [surahs, setSurahs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [playingSurah, setPlayingSurah] = useState(null);
  const [selectedReciters, setSelectedReciters] = useState({});
  const [sound, setSound] = useState(null);
  const [loadingSound, setLoadingSound] = useState(null);

  // Set audio mode for proper playback behavior
  useEffect(() => {
    const setAudioMode = async () => {
      await ExpoAudio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeIOS: ExpoAudio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: ExpoAudio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
      });
    };
    setAudioMode();
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  // Fetch all Surahs on initial load
  useEffect(() => {
    const fetchAllSurahs = async () => {
      try {
        setIsLoading(true);
        const surahPromises = Array.from({ length: 114 }, (_, i) => fetchSurah(i + 1));
        const results = await Promise.all(surahPromises);
        setSurahs(results);
      } catch (error) {
        console.error("Error fetching Surahs:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllSurahs();
  }, []);

  // Handle audio playback
  const handlePlay = async (audioUrl, surahNo) => {
    if (!audioUrl) return console.error(`No audio URL available for Surah ${surahNo}`);

    if (loadingSound) return; // Avoid multiple clicks causing race conditions
    setLoadingSound(surahNo);

    // Stop currently playing audio
    if (playingSurah === surahNo) {
      await sound.pauseAsync();
      setPlayingSurah(null);
    } else {
      if (sound) await sound.unloadAsync();
      try {
        const { sound: newSound } = await ExpoAudio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true }
        );
        setSound(newSound);
        setPlayingSurah(surahNo);

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setPlayingSurah(null);
            newSound.unloadAsync();
          }
        });
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }

    setLoadingSound(null);
  };

  // Handle stop functionality
  const handleStop = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.setPositionAsync(0);
      setPlayingSurah(null);
    }
  };

  // Handle pause functionality
  const handlePause = async () => {
    if (sound) {
      await sound.pauseAsync();
      setPlayingSurah(null);
    }
  };

  // Handle reciter selection
  const handleReciterChange = async (surahNo, reciterUrl) => {
    if (sound) await sound.unloadAsync();
    setPlayingSurah(null);
    setSelectedReciters((prev) => ({ ...prev, [surahNo]: reciterUrl }));
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (isError) {
    return <Text style={styles.errorText}>Error loading Surahs. Please try again later.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {surahs.map((surah) => {
          const reciters = Object.keys(surah.audio).map((key) => ({
            reciterName: surah.audio[key].reciter,
            audioUrl: surah.audio[key].url,
          }));

          return (
            <View key={surah.surahNo} style={styles.surahCard}>
              <Text style={styles.surahTitle}>{surah.surahName}</Text>
              <Text style={styles.surahTranslation}>{surah.surahNameTranslation}</Text>
              <Text style={styles.surahDetails}>
                Revelation: {surah.revelationPlace}, Ayahs: {surah.totalAyah}
              </Text>

              {reciters.length > 0 && (
                <View style={styles.selectReciter}>
                  <Picker
                    selectedValue={selectedReciters[surah.surahNo] || reciters[0].audioUrl}
                    onValueChange={(value) => handleReciterChange(surah.surahNo, value)}
                  >
                    {reciters.map((reciter, index) => (
                      <Picker.Item key={index} label={reciter.reciterName} value={reciter.audioUrl} />
                    ))}
                  </Picker>
                </View>
              )}

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.playButton]}
                  onPress={() => handlePlay(selectedReciters[surah.surahNo] || reciters[0].audioUrl, surah.surahNo)}
                  disabled={loadingSound === surah.surahNo}
                >
                  <Text style={styles.buttonText}>
                    {loadingSound === surah.surahNo ? "Loading..." : "Play"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.pauseButton]}
                  onPress={handlePause}
                  disabled={!playingSurah || playingSurah !== surah.surahNo}
                >
                  <Text style={styles.buttonText}>Pause</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.stopButton]}
                  onPress={handleStop}
                  disabled={!playingSurah || playingSurah !== surah.surahNo}
                >
                  <Text style={styles.buttonTextStop}>Stop</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f9f9f9" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", textAlign: "center", fontSize: 18 },
  grid: { marginTop: 16 },
  surahCard: { backgroundColor: "white", padding: 16, borderRadius: 8, marginBottom: 16 },
  surahTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  surahTranslation: { fontSize: 16, marginVertical: 4 },
  surahDetails: { fontSize: 14, color: "gray" },
  selectReciter: { marginVertical: 12 },
  buttonContainer: { marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  button: { flex: 1, padding: 10, borderRadius: 5, alignItems: "center" },
  playButton: { backgroundColor: "#0d0d0b" },
  pauseButton: { backgroundColor: "#666565" },
  buttonTextStop:{color: "#0d0d0b", fontWeight: "bold"},
  stopButton: { backgroundColor: "#e0dede", color: "0d0d0b", borderColor:"0d0d0b", borderWidth: 2, },
  activeButton: { opacity: 0.7 },
  buttonText: {  color: "#fff", fontWeight: "bold" },
});

export default AudioPlayer;
