import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker'; // Correct import for Picker

export const JuzView = () => {
  const [selectedJuz, setSelectedJuz] = useState("30"); // Default to Juz 30
  const [selectedEdition, setSelectedEdition] = useState("en.asad"); // Default translation: Muhammad Asad
  const [juzData, setJuzData] = useState(null);
  const [arabicData, setArabicData] = useState(null); // State for Arabic text
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Juz data based on selected Juz and edition
  useEffect(() => {
    const fetchJuzData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch the English translation
        const response = await fetch(
          `https://api.alquran.cloud/v1/juz/${selectedJuz}/${selectedEdition}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setJuzData(data.data);

        // Fetch the Arabic text (quran-uthmani edition)
        const arabicResponse = await fetch(
          `https://api.alquran.cloud/v1/juz/${selectedJuz}/quran-uthmani`
        );
        if (!arabicResponse.ok) {
          throw new Error("Failed to fetch Arabic data");
        }
        const arabicData = await arabicResponse.json();
        setArabicData(arabicData.data);

      } catch (err) {
        setError("Failed to fetch Juz data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJuzData();
  }, [selectedJuz, selectedEdition]);

  // Handling error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Juz and Edition Selection */}
        <View style={styles.selectionContainer}>
          <Picker
            selectedValue={selectedJuz}
            onValueChange={(itemValue) => setSelectedJuz(itemValue)}
            style={styles.picker}
          >
            {[...Array(30)].map((_, i) => (
              <Picker.Item key={i + 1} label={`Juz ${i + 1}`} value={(i + 1).toString()} />
            ))}
          </Picker>
          <Picker
            selectedValue={selectedEdition}
            onValueChange={(itemValue) => setSelectedEdition(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Muhammad Asad" value="en.asad" />
            <Picker.Item label="Pickthall" value="en.pickthall" /> 
          </Picker>
        </View>

        {/* Loading State */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          juzData && arabicData && (
            <ScrollView style={styles.contentContainer}>
              <Text style={styles.manzilTitle}>Juz {selectedJuz}</Text>
              <View style={styles.ayahList}>
                {juzData.ayahs.map((ayah, index) => (
                  <View key={ayah.number} style={styles.ayahContainer}>
                    {/* Arabic Text */}
                    <Text style={styles.arabicText} selectable>
                      {arabicData.ayahs[index]?.text}
                    </Text>

                    {/* English Translation */}
                    <Text style={styles.englishText} selectable>
                      {ayah.text}
                    </Text>

                    <Text style={styles.surahInfo}>
                      Surah {ayah.surah.name} - Ayah {ayah.numberInSurah}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  card: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 20,
    elevation: 3,
  },
  selectionContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 55,
    width: "100%",
    marginBottom: 15,
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  contentContainer: {
    marginTop: 20,
  },
  manzilTitle: {
    fontSize: 26,  // Increased font size for better readability
    fontWeight: "bold",
    marginBottom: 20,
  },
  ayahList: {
    marginBottom: 25,
  },
  ayahContainer: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 20,
  },
  arabicText: {
    fontSize: 24,  // Larger font size for Arabic text
    color: "#333",
    textAlign: "right",
    marginBottom: 12,
    lineHeight: 30,
  },
  englishText: {
    fontSize: 20,  // Increased font size for English text
    color: "#555",
    marginBottom: 12,
    lineHeight: 28,
  },
  surahInfo: {
    fontSize: 18,  // Slightly larger for surah information
    color: "#777",
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    color: "red",
    fontSize: 18,  // Slightly larger error text for visibility
    textAlign: "center",
  },
});

export default JuzView;
