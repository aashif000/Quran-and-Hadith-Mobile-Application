import React, { useState, useMemo } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Modal, Button, Platform } from "react-native";
import { useQuery } from "@tanstack/react-query";
 
import { Picker } from "@react-native-picker/picker";

// API call function to fetch Quran data based on the selected edition
const fetchQuran = async (edition) => {
  const response = await fetch(`https://api.alquran.cloud/v1/quran/${edition}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Quran data");
  }
  return response.json();
};

const CompleteQuran = () => {
  const [arabicEdition, setArabicEdition] = useState("quran-uthmani");
  const [englishEdition, setEnglishEdition] = useState("en.asad");
  const [isEditionModalVisible, setEditionModalVisible] = useState(false);

// Update to the new query syntax for React Query v5
const { data: arabicQuran, isLoading: isLoadingArabic, error: arabicError } = useQuery({
  queryKey: ['quran', arabicEdition],
  queryFn: () => fetchQuran(arabicEdition),
  cacheTime: 1000 * 60 * 60,
  staleTime: 1000 * 60 * 10,
});

const { data: englishQuran, isLoading: isLoadingEnglish, error: englishError } = useQuery({
  queryKey: ['quran', englishEdition],
  queryFn: () => fetchQuran(englishEdition),
  cacheTime: 1000 * 60 * 60,
  staleTime: 1000 * 60 * 10,
});


  // Combine data and prevent unnecessary rerenders
  const combinedData = useMemo(() => {
    if (!arabicQuran || !englishQuran) return [];
    return arabicQuran.data.surahs.map((surah) => {
      const englishSurah = englishQuran.data.surahs.find((s) => s.number === surah.number);
      return {
        arabic: surah,
        english: englishSurah,
      };
    });
  }, [arabicQuran, englishQuran]);

  return (
    <View style={styles.container}>
      {/* Edition Selection Button */}
      <View style={styles.selectContainer}>
        <Button style={styles.selectEditions} title="Select Editions" onPress={() => setEditionModalVisible(true)} />
      </View>

      {/* Modal for edition selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditionModalVisible}
        onRequestClose={() => setEditionModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Editions</Text>

            {/* Arabic Edition Picker */}
            <Text style={styles.selectLabel}>Arabic Edition</Text>
            <Picker
              selectedValue={arabicEdition}
              onValueChange={setArabicEdition}
              style={styles.picker}
            >
              <Picker.Item label="Uthmani" value="quran-uthmani" />
              <Picker.Item label="Indo-Pak" value="quran-indopak" />
              <Picker.Item label="Warsh" value="quran-warsh" />
            </Picker>

            {/* English Edition Picker */}
            <Text style={styles.selectLabel}>English Edition</Text>
            <Picker
              selectedValue={englishEdition}
              onValueChange={setEnglishEdition}
              style={styles.picker}
            >
              <Picker.Item label="Asad" value="en.asad" />
              <Picker.Item label="Sahih International" value="en.sahih" />
              <Picker.Item label="Pickthall" value="en.pickthall" />
            </Picker>

            <Button title="Close" onPress={() => setEditionModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Content Grid */}
      <View style={styles.gridContainer}>
        {/* Arabic Text */}
        <View style={styles.card}>
          <Text style={styles.title}>النص العربي</Text>
          {isLoadingArabic ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : arabicError ? (
            <Text style={styles.errorText}>Error: {arabicError.message}</Text>
          ) : (
            <ScrollView style={styles.scrollView}>
              {combinedData?.map((surahData) => (
                <View key={surahData.arabic.number} style={styles.surahContainer}>
                  <Text style={styles.surahName}>{surahData.arabic.name}</Text>
                  {surahData.arabic.ayahs.slice(0, 5).map((ayah) => (
                    <Text key={ayah.number} style={styles.ayahText}>
                      {ayah.text} ﴿{ayah.numberInSurah}﴾
                    </Text>
                  ))}
                  {surahData.arabic.ayahs.length > 5 && (
                    <Text style={styles.moreText}>+ {surahData.arabic.ayahs.length - 5} more...</Text>
                  )}
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {/* English Translation */}
        <View style={styles.card}>
          <Text style={styles.title}>English Translation</Text>
          {isLoadingEnglish ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : englishError ? (
            <Text style={styles.errorText}>Error: {englishError.message}</Text>
          ) : (
            <ScrollView style={styles.scrollView}>
              {combinedData?.map((surahData) => (
                <View key={surahData.english.number} style={styles.surahContainer}>
                  <Text style={styles.surahName}>{surahData.english.englishName}</Text>
                  {surahData.english.ayahs.slice(0, 5).map((ayah) => (
                    <Text key={ayah.number} style={styles.ayahText}>
                      {ayah.text} ({ayah.numberInSurah})
                    </Text>
                  ))}
                  {surahData.english.ayahs.length > 5 && (
                    <Text style={styles.moreText}>+ {surahData.english.ayahs.length - 5} more...</Text>
                  )}
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  selectContainer: {
    marginBottom: 16,
    alignItems: "center",
    color: '#0e0f12', 
  },
  selectEditions:{
    color: '#0e0f12',
    backgroundColor: '#0e0f12',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
    width: "85%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  selectLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 5,
    maxWidth: "48%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  surahContainer: {
    marginBottom: 12,
  },
  surahName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ayahText: {
    fontSize: 14,
    marginBottom: 6,
    color: "#0e0f12",
  },
  scrollView: {
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  moreText: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
    textAlign: "center",
  },
});

export default CompleteQuran;
