import  { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";

// Function to fetch Ayah data from the API
const fetchAyah = async (reference, edition) => {
  const response = await fetch(`https://api.alquran.cloud/v1/ayah/${reference}/${edition}`);
  const data = await response.json();
  if (data.code !== 200) {
    throw new Error("Ayah not found or API error");
  }
  return data;
};

const AyahView = () => {
  const [reference, setReference] = useState("");
  const [edition, setEdition] = useState("en.asad");

  // Using useQuery to fetch data from the API
  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["ayah", reference, edition],
    queryFn: () => fetchAyah(reference, edition),
    enabled: false, // Only run the query when triggered manually
  });

  const handleSearch = () => {
    if (reference) {
      refetch();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Quran Ayah Viewer</Text>

        {/* Input field and Search button */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Reference no."
            value={reference}
            onChangeText={setReference}
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            style={[styles.searchButton, isLoading ? styles.loadingButton : {}]}
            onPress={handleSearch}
            disabled={isLoading || !reference}
          >
            <Text style={styles.buttonText}>{isLoading ? "Loading..." : "Search"}</Text>
          </TouchableOpacity>
        </View>

        {/* Error handling */}
        {isError && (
          <Text style={styles.errorText}>
            {error instanceof Error ? error.message : "Something went wrong"}
          </Text>
        )}

        {/* Loading state */}
        {isLoading && (
          <ActivityIndicator size="large" color="#6200ea" style={styles.loader} />
        )}

        {/* Result section */}
        {!isLoading && data?.data && (
          <ScrollView style={styles.result}>
            <Text style={styles.arabicText}>{data?.data?.text || "No text available"}</Text>
            {data?.data?.translation && (
              <Text style={styles.translationText}>{data?.data?.translation}</Text>
            )}
            <Text style={styles.surahInfo}>
              Surah: {data?.data?.surah?.name || "Unknown"} - Verse {data?.data?.numberInSurah || "Unknown"}
            </Text>
          </ScrollView>
        )}

        {/* No data message */}
        {!isLoading && !data?.data && reference && (
          <Text style={styles.noDataText}>No data found. Please try a different reference.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 40, // Add space at the top for the component to sit at the top of the screen
    paddingHorizontal: 16,
  },
  card: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
    marginHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0a0a09",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    borderColor: "#0a0a09",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    // Adjust placeholder font size
  },
  searchButton: {
    backgroundColor: "#0a0a09",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 120,
  },
  loadingButton: {
    backgroundColor: "#a2a2a2",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loader: {
    marginVertical: 20,
  },
  arabicText: {
    fontSize: 30,
    textAlign: "center",
    marginVertical: 20,
  },
  translationText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
    fontStyle: "italic",
  },
  surahInfo: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 10,
  },
  noDataText: {
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  result: {
    marginTop: 20,
  },
});

export default AyahView;
