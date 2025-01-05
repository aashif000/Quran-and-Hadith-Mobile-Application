import { useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Picker } from "@react-native-picker/picker";

// API call function to fetch Hizb data (both Arabic and English editions)
const fetchHizbData = async (hizb, edition) => {
  try {
    const response = await fetch(`https://api.alquran.cloud/v1/hizbQuarter/${hizb}/${edition}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Hizb data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching Hizb data:", error);
    throw error; // Re-throw the error to handle it later
  }
};

const HizbView = () => {
  const [selectedHizb, setSelectedHizb] = useState("1");
  const [selectedEdition, setSelectedEdition] = useState("en.asad");

  const { data: hizbData, isLoading, error } = useQuery({
    queryKey: ["hizb", selectedHizb, selectedEdition],
    queryFn: () => fetchHizbData(selectedHizb, selectedEdition),
  });

  const { data: arabicData, isLoading: isArabicLoading } = useQuery({
    queryKey: ["hizb-arabic", selectedHizb],
    queryFn: () => fetchHizbData(selectedHizb, "quran-uthmani"),
  });

  // Loading state
  if (isLoading || isArabicLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Error handling
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Selection Inputs */}
      <View style={styles.selectContainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select Hizb Quarter</Text>
          <Picker
            selectedValue={selectedHizb}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedHizb(itemValue)}
          >
            {[...Array(240)].map((_, i) => (
              <Picker.Item key={i + 1} label={`Hizb Quarter ${i + 1}`} value={(i + 1).toString()} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select Edition</Text>
          <Picker
            selectedValue={selectedEdition}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedEdition(itemValue)}
          >
            <Picker.Item label="Pickthall" value="en.pickthall" />
            <Picker.Item label="Muhammad Asad" value="en.asad" />
          </Picker>
        </View>
      </View>

      {/* Hizb Content */}
      <ScrollView style={styles.card}>
        <View style={styles.contentContainer}>
          {hizbData?.data?.ayahs?.map((ayah, index) => {
            const arabicAyah = arabicData?.data?.ayahs[index];
            return (
              <View key={ayah.number} style={styles.ayahContainer}>
                <View style={styles.ayahHeader}>
                  <Text style={styles.surahInfo}>
                    {ayah.surah.name} - Verse {ayah.numberInSurah}
                  </Text>
                </View>
                <View style={styles.ayahTextContainer}>
                  {/* Arabic text */}
                  <Text style={styles.arabicText} selectable>
                    {arabicAyah?.text}
                  </Text>
                  {/* English translation */}
                  <Text style={styles.englishText} selectable>
                    {ayah.text}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectContainer: {
    marginBottom: 16,
  },
  pickerContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingLeft: 10,
  },
  card: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginTop: 16,
    elevation: 2,
  },
  contentContainer: {
    marginBottom: 16,
  },
  ayahContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 16,
  },
  ayahHeader: {
    marginBottom: 8,
  },
  surahInfo: {
    fontSize: 14,
    color: "#888",
  },
  ayahTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  arabicText: {
    flex: 1,
    fontSize: 20,
    textAlign: "right",
    lineHeight: 28,
    marginBottom: 12,
    marginRight: 8, // Add some margin to give space between Arabic and English
  },
  englishText: {
    flex: 1,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 12,
    marginLeft: 8, // Add some margin to give space between Arabic and English
  },
});

export default HizbView; // This is the default export for HizbView component
