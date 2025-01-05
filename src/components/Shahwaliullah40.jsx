import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo and Ionicons


const Shahwaliullah40 = ({ navigation }) => {
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the CDN URL
    const fetchHadiths = async () => {
      try {
        const response = await fetch(
          'https://cdn.jsdelivr.net/gh/aashif000/DB-for-Q-H/shahwaliullah40/all.json'
        );
        const data = await response.json();

        // Log the data to check its structure
        // console.log('Data from all.json:', data);

        // Ensure data is valid and contains hadiths
        if (data && data.hadiths) {
          setHadiths(data.hadiths);
        } else {
          console.error('Data is not in the expected format');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hadith data:', error);
        setLoading(false);
      }
    };

    fetchHadiths();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}> 
      <View style={styles.heroSection}>
        <Text style={styles.titleArabic}>أربعون شاه ولي الله الدهلوي</Text>
        <Text style={styles.titleEnglish}>Forty Hadith of Shah Waliullah Dehlawi</Text>
      
      </View>
 

      {/* List of Hadiths */}
      <FlatList
        data={hadiths}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
          >
            <Text style={styles.hadithArabic}>{item.arabic}</Text>
            <Text style={styles.hadithEnglish}>{item.english.text}</Text>
          </TouchableOpacity>
        )}
      />
 
    </View>
  );};

export default Shahwaliullah40;

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
  container: {
    paddingTop: 24,
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20, // Increased space at the top
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: { 
    color: '#0d0c0b',marginTop: 23,
    marginRight: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0d0c0b',
    marginTop: 23,
    marginLeft: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 5,
  },
  hadithArabic: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d0c0b',
    marginBottom: 5,
  },
  hadithEnglish: {
    fontSize: 16,
    color: '#333',
  },
  chapterTitleEnglish: {
    fontSize: 16,
    marginBottom: 4,
  },
  chapterTitleArabic: {
    fontFamily: 'Scheherazade_400Regular',
    fontSize: 20,
    textAlign: 'right',
  },
  titleArabic: {
    fontFamily: 'Scheherazade_700Bold',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 8,
  },
  titleEnglish: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSection: {
    padding: 20,
    alignItems: 'center',
  },
});
