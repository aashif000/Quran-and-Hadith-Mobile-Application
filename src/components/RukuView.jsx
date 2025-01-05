import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";

// Function to fetch both English and Arabic translations concurrently
const fetchRukuData = async (rukuNumber, edition) => {
  const api1 = `https://api.alquran.cloud/v1/ruku/${rukuNumber}/${edition}`; // First API (English translation)
  const api2 = `https://api.alquran.cloud/v1/ruku/${rukuNumber}/quran-uthmani`; // Second API (Arabic script)

  const [response1, response2] = await Promise.all([fetch(api1), fetch(api2)]);

  // Check for successful responses before parsing JSON
  if (!response1.ok || !response2.ok) {
    throw new Error("Failed to fetch data from one or more APIs");
  }

  const data1 = await response1.json();
  const data2 = await response2.json();

  return { data1: data1.data, data2: data2.data };
};

const RukuView = () => {
  const [selectedRuku, setSelectedRuku] = useState("1");
  const [selectedEdition, setSelectedEdition] = useState("en.asad");
  const [rukuInput, setRukuInput] = useState("");
  const [error, setError] = useState("");

  // Fetch data using the custom fetch function
  const { data: rukuData, isLoading } = useQuery({
    queryKey: ["ruku", selectedRuku, selectedEdition],
    queryFn: () => fetchRukuData(selectedRuku, selectedEdition),
    enabled: !!selectedRuku, // Only run the query when a valid Ruku number is selected
  });

  const handleSearch = () => {
    // Validate if the input is a number and within the valid range (1-556)
    const rukuNumber = parseInt(rukuInput, 10);
    if (isNaN(rukuNumber) || rukuNumber < 1 || rukuNumber > 556) {
      setError("Please enter a valid Ruku number between 1 and 556.");
    } else {
      setError(""); // Clear error
      setSelectedRuku(rukuInput); // Trigger the query with the valid Ruku number
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Ruku Search */}
      <View style={styles.searchContainer}>
        <Text style={styles.label}>Search by Ruku Number</Text>
        <TextInput
          style={styles.input}
          value={rukuInput}
          onChangeText={setRukuInput}
          keyboardType="numeric"
          placeholder="Enter Ruku number (1-556)"
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      {/* Edition Selection */}
      <View style={styles.selectorContainer}>
        <Text style={styles.label}>Select Edition</Text>
        <View style={styles.pickerWrapper}>
          <TouchableOpacity
            style={[styles.picker, { backgroundColor: selectedEdition === "en.asad" ? "#ddd" : "#fff" }]}
            onPress={() => setSelectedEdition("en.asad")}
          >
            <Text style={styles.pickerText}>Muhammad Asad</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.picker, { backgroundColor: selectedEdition === "en.pickthall" ? "#ddd" : "#fff" }]}
            onPress={() => setSelectedEdition("en.pickthall")}
          >
            <Text style={styles.pickerText}>Pickthall</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading Skeleton */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <View style={styles.card}>
          <ScrollView contentContainerStyle={styles.dataContainer}>
            {/* Display Data */}
            {rukuData?.data1?.ayahs?.map((ayah, index) => (
              <View key={ayah.number} style={styles.ayahContainer}>
                <View style={styles.ayahInfo}>
                  <Text style={styles.ayahInfoText}>
                    {ayah.surah.name} - Verse {ayah.numberInSurah}
                  </Text>
                </View>
                {/* Display English and Arabic text on the same line */}
                <View style={styles.ayahTexts}>
                  <Text style={styles.englishText}>{ayah.text}</Text>
                  <Text style={styles.arabicText}>{rukuData.data2.ayahs[index]?.text}</Text>
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
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  searchContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0a0a09",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    fontSize: 14,
  },
  selectorContainer: {
    marginBottom: 20,
  },
  pickerWrapper: {
    flexDirection: "row",
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  pickerText: {
    fontSize: 16,
    color: "#333",
  },
  loader: {
    marginTop: 20,
    alignSelf: "center",
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
  dataContainer: {
    paddingBottom: 20,
  },
  ayahContainer: {
    marginBottom: 20,
  },
  ayahInfo: {
    marginBottom: 10,
  },
  ayahInfoText: {
    fontSize: 14,
    color: "#888",
  },
  ayahTexts: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  englishText: {
    fontSize: 18,
    color: "#333",
    flex: 1,
    textAlign: "left",
  },
  arabicText: {
    fontSize: 22,
    color: "#333",
    flex: 1,
    textAlign: "right",
    fontFamily: "Scheherazade", // Optional Arabic font
  },
});

export default RukuView;
