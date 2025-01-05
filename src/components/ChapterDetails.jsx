import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';

const ChapterDetails = ({ route }) => {
  const { chapterId } = route.params;
  const [hadiths, setHadiths] = useState([]);
  const [filteredHadiths, setFilteredHadiths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHadiths = async () => {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/gh/aashif000/DB-for-Q-H@main/bukhari/${chapterId}.json`
        );
        const data = await response.json();
        setHadiths(data.hadiths);
        setFilteredHadiths(data.hadiths);
        setLoading(false);
      } catch (err) {
        setError('Failed to load chapter details.');
        setLoading(false);
      }
    };

    fetchHadiths();
  }, [chapterId]);

  // Handle search filter
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredHadiths(hadiths);
    } else {
      const filtered = hadiths.filter(
        (hadith) =>
          hadith.english.text.toLowerCase().includes(query.toLowerCase()) ||
          hadith.arabic.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredHadiths(filtered);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading Chapter Details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Hadith..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Hadith List */}
      <FlatList
        data={filteredHadiths}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.hadithArabic}>{item.arabic}</Text>
            <Text style={styles.hadithEnglish}>{item.english.text}</Text>
            <Text style={styles.narrator}>- {item.english.narrator}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ChapterDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 15,
    backgroundColor: '#fff',
    fontSize: 16,
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
    marginBottom: 10,
    color: '#4CAF50',
  },
  hadithEnglish: {
    fontSize: 16,
    marginBottom: 5,
  },
  narrator: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'right',
  },
});
