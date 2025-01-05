import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Font from "expo-font"; // Import Font module

export const Surahs = () => {
  const [surahData, setSurahData] = useState(null);
  const [surahList, setSurahList] = useState([]); // List of all Surahs
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSurah, setSelectedSurah] = useState(114); // Default Surah: 114
  const [searchSurahNumber, setSearchSurahNumber] = useState(""); // Search Surah by number
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load fonts from online URLs (Google Fonts)
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Roboto': 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
        'Scheherazade': 'https://fonts.googleapis.com/css2?family=Scheherazade&display=swap',
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  // Fetch all Surahs list (surah number and name)
  useEffect(() => {
    const fetchSurahList = async () => {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/surah");
        if (!response.ok) {
          throw new Error("Failed to fetch Surah list");
        }
        const data = await response.json();
        setSurahList(data.data); // Store Surah list
      } catch (err) {
        setError("Failed to fetch Surah list. Please try again later.");
      }
    };

    fetchSurahList();
  }, []);

  // Fetch selected Surah data (Arabic and English)
  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        const arabicResponse = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}`);
        const englishResponse = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/en.asad`);

        if (!arabicResponse.ok || !englishResponse.ok) {
          throw new Error("Failed to fetch Surah data");
        }

        const arabicData = await arabicResponse.json();
        const englishData = await englishResponse.json();

        // Merge both Arabic and English data
        const mergedData = arabicData.data.ayahs.map((ayah, index) => {
          return {
            arabicText: ayah.text,
            englishText: englishData.data.ayahs[index]?.text || "Translation not available",
          };
        });

        setSurahData(mergedData); // Set the merged data
      } catch (err) {
        setError("Failed to fetch Surah data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurahData();
  }, [selectedSurah]);

  // Handle the search by Surah number
  const handleSearchByNumber = async () => {
    const number = parseInt(searchSurahNumber, 10);
    if (isNaN(number) || number < 1 || number > 114) {
      alert("Please enter a valid Surah number (1-114).");
      return;
    }
    setSelectedSurah(number);
    setSearchSurahNumber(""); // Clear input after searching
    setIsLoading(true); // Reset loading state while fetching new Surah data
  };

  // Handling error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Wait until fonts are loaded before rendering
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {/* Dropdown for Surah List */}
      <Picker
        selectedValue={selectedSurah}
        style={styles.surahPicker}
        onValueChange={(itemValue) => {
          setSelectedSurah(itemValue);
          setIsLoading(true); // Reset loading state when changing Surah
        }}
      >
        {surahList.map((surah) => (
          <Picker.Item key={surah.number} label={surah.englishName} value={surah.number} />
        ))}
      </Picker>

      {/* Search by Surah Number */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Surah num (1-114)"
          value={searchSurahNumber}
          onChangeText={setSearchSurahNumber}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchByNumber}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Loading State */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        surahData && (
          <FlatList
            data={surahData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                {/* Card to Display both Arabic and English Text */}
                <TouchableOpacity style={styles.card}>
                  <Text style={styles.arabicText}>{item.arabicText}</Text>
                  <Text style={styles.englishText}>{item.englishText}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  arabicText: {
    fontSize: 18,
    color: "#333",
    textAlign: "right", // Align Arabic text to the right
    marginBottom: 10,
    fontFamily: "Scheherazade", // Arabic font loaded from URL
  },
  englishText: {
    fontSize: 16,
    color: "#333",
    textAlign: "left", // Align English text to the left
    fontFamily: "Roboto", // English font loaded from URL
  },
  surahPicker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginRight: 10,
    width: 150,
  },
  searchButton: {
    backgroundColor: "#0a0a09",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Surahs;
