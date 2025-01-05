import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';

const NasaiDetails = ({ route, navigation }) => {
  const { chapterId, chapterName } = route.params;

  // Set the navigation title
  React.useEffect(() => {
    navigation.setOptions({
      title: chapterName,
    });
  }, [navigation, chapterName]);

  const fetchChapterDetails = async () => {
    const response = await fetch(
      `https://cdn.jsdelivr.net/gh/aashif000/DB-for-Q-H@main/nasai/${chapterId}.json`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data: chapterDetails, isLoading, error } = useQuery({
    queryKey: ['nasaiChapter', chapterId],
    queryFn: fetchChapterDetails,
  });

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2c3e50" />
        <Text style={styles.loadingText}>Loading chapter...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading chapter details</Text>
        <Text style={styles.errorSubText}>{error.message}</Text>
      </View>
    );
  }

  if (!chapterDetails) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>No data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.metadataContainer}>
          <Text style={styles.title}>{chapterDetails.metadata?.english?.title}</Text>
          <Text style={styles.author}>{chapterDetails.metadata?.english?.author}</Text>
          <Text style={styles.introduction}>{chapterDetails.metadata?.english?.introduction}</Text>
          <View style={styles.arabicMetadata}>
            <Text style={styles.arabicTitle}>{chapterDetails.metadata?.arabic?.title}</Text>
            <Text style={styles.arabicAuthor}>{chapterDetails.metadata?.arabic?.author}</Text>
            <Text style={styles.arabicIntro}>{chapterDetails.metadata?.arabic?.introduction}</Text>
          </View>
        </View>

        <View style={styles.hadithsContainer}>
          {chapterDetails.hadiths?.map((hadith) => (
            <View key={hadith.id} style={styles.hadithContainer}>
              <Text style={styles.hadithNumber}>Hadith #{hadith.idInBook}</Text>
              <View style={styles.narratorContainer}>
                <Text style={styles.narratorText}>{hadith.english.narrator}</Text>
              </View>
              <Text style={styles.hadithText}>{hadith.english.text}</Text>
              <Text style={styles.arabicText}>{hadith.arabic}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#2c3e50',
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    textAlign: 'center',
  },
  errorSubText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
    textAlign: 'center',
  },
  metadataContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
  },
  introduction: {
    fontSize: 18,
    color: '#2c3e50',
    marginBottom: 16,
    fontWeight: '600',
  },
  arabicMetadata: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 16,
    paddingTop: 16,
  },
  arabicTitle: {
    fontSize: 24,
    textAlign: 'right',
    color: '#2c3e50',
    marginBottom: 8,
  },
  arabicAuthor: {
    fontSize: 16,
    textAlign: 'right',
    color: '#34495e',
    marginBottom: 8,
  },
  arabicIntro: {
    fontSize: 18,
    textAlign: 'right',
    color: '#2c3e50',
    fontWeight: '600',
  },
  hadithsContainer: {
    marginTop: 10,
  },
  hadithContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hadithNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  narratorContainer: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  narratorText: {
    fontSize: 16,
    color: '#34495e',
    fontStyle: 'italic',
  },
  hadithText: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    marginBottom: 16,
  },
  arabicText: {
    fontSize: 18,
    color: '#2c3e50',
    lineHeight: 28,
    textAlign: 'right',
  },
});

export default NasaiDetails;