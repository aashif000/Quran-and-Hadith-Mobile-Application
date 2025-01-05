import React, { useState } from "react"; 
import { ScrollView, View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Picker } from '@react-native-picker/picker';

// API call function to get the Quran data using fetch
const getQuranPage = async (pageNumber, edition) => {
  const response = await fetch(`https://api.alquran.cloud/v1/page/${pageNumber}/${edition}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Quran page data");
  }
  const data = await response.json();
  return data.data.ayahs;
};

const PageView = () => {
  const [pageNumber, setPageNumber] = useState("1");
  const [selectedEdition, setSelectedEdition] = useState("en.asad");

  // Fetch English translation (or selected edition) for the page
  const { data: pageData, isLoading: isLoadingEnglish } = useQuery({
    queryKey: ["page", pageNumber, selectedEdition],
    queryFn: () => getQuranPage(pageNumber, selectedEdition),
    keepPreviousData: true,
  });

  // Fetch Arabic text (quran-uthmani) using the same page number
  const { data: arabicData, isLoading: isLoadingArabic } = useQuery({
    queryKey: ["page", pageNumber, "quran-uthmani"],
    queryFn: () => getQuranPage(pageNumber, "quran-uthmani"),
    keepPreviousData: true,
  });

  // Combine the data from both Arabic and English texts
  const combinedData = pageData?.map((ayah) => {
    const arabicAyah = arabicData?.find((arabicAyah) => arabicAyah.number === ayah.number);
    return {
      ...ayah,
      arabicText: arabicAyah?.text || "",
    };
  });

  const handleSearch = () => {
    // Trigger the page search by changing the page number, the query will refetch automatically
    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 604) {
      alert("Please enter a valid page number (1-604).");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Page and Edition Selection */}
      <View style={styles.selectorContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={pageNumber}
          onChangeText={setPageNumber}
          placeholder="Enter page number (1-604)"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Select Edition</Text>
          <Picker
            selectedValue={selectedEdition}
            onValueChange={(itemValue) => setSelectedEdition(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Muhammad Asad" value="en.asad" />
            <Picker.Item label="Pickthall" value="en.pickthall" />
          </Picker>
        </View>
      </View>

      {/* Loading Skeletons */}
      {isLoadingEnglish || isLoadingArabic ? (
        <View style={styles.skeletonContainer}>
          {[...Array(5)].map((_, i) => (
            <View key={i} style={styles.skeleton} />
          ))}
        </View>
      ) : (
        <View style={styles.card}>
          <ScrollView contentContainerStyle={styles.ayahsContainer}>
            {/* Display Ayahs */}
            {combinedData?.map((ayah) => (
              <View key={ayah.number} style={styles.ayahContainer}>
                <View style={styles.ayahHeader}>
                  <Text style={styles.ayahHeaderText}>
                    {ayah.surah.englishName} - Verse {ayah.numberInSurah}
                  </Text>
                </View>
                <View style={styles.ayahTextsContainer}>
                  {/* Arabic Text */}
                  <Text style={styles.arabicText}>{ayah.arabicText}</Text>

                  {/* English Translation */}
                  <Text style={styles.englishText}>{ayah.text}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  selectorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#0a0a09",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pickerContainer: {
    flex: 1,
    minWidth: 150,
  },
  pickerLabel: {
    fontSize: 16,
    color: "#333",
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 10,
  },
  skeletonContainer: {
    marginTop: 20,
  },
  skeleton: {
    backgroundColor: "#ccc",
    height: 80,
    marginBottom: 12,
    borderRadius: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  ayahsContainer: {
    paddingBottom: 20,
    paddingTop: 10, // Adding some padding to the top of the scroll container
  },
  ayahContainer: {
    marginBottom: 20,
  },
  ayahHeader: {
    marginBottom: 10,
  },
  ayahHeaderText: {
    fontSize: 14,
    color: "#888",
  },
  ayahTextsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  arabicText: {
    fontSize: 20,
    color: "#333",
    flex: 1,
    textAlign: "right", // Arabic text aligned to the right
    marginRight: 10, // Space between Arabic and English text
  },
  englishText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    textAlign: "left", // English text aligned to the left
    marginLeft: 10, // Space between Arabic and English text
  },
});

export default PageView;
