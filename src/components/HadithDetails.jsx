import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HadithDetails = ({ route }) => {
  const { hadithId } = route.params;  // Get the passed hadithId from navigation
  const [hadith, setHadith] = useState(null);

  // Fetch the data from the CDN again or use already fetched data
  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/gh/aashif000/DB-for-Q-H@main/shahwaliullah40/all.json')
      .then((response) => response.json())
      .then((data) => {
        const selectedHadith = data.hadiths.find(h => h.id === hadithId);
        setHadith(selectedHadith);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [hadithId]);

  if (!hadith) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hadith Details</Text>
      <Text style={styles.arabicText}>{hadith.arabic}</Text>
      <Text style={styles.englishText}>{hadith.english.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  arabicText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  englishText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
});

export default HadithDetails;
