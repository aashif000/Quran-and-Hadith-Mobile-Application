import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView 
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { 
  useFonts,
  Scheherazade_400Regular,
  Scheherazade_700Bold
} from '@expo-google-fonts/scheherazade';
import { ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
const MajahDetails = ({ route, navigation }) => {
  const { chapterId } = route.params;
  const [fontsLoaded] = useFonts({
    Scheherazade_400Regular,
    Scheherazade_700Bold
  });
  const { data, isLoading } = useQuery({
    queryKey: ['majahChapter', chapterId],
    queryFn: async () => {
      const response = await fetch(`https://cdn.jsdelivr.net/gh/aashif000/DB-for-Q-H@main/ibnmajah/${chapterId}.json`);
      return response.json();
    }
  });
  if (!fontsLoaded || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00668c" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}> 
      </View>
      <ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.titleEnglish}>{data?.metadata?.english?.title}</Text>
          <Text style={styles.titleArabic}>{data?.metadata?.arabic?.title}</Text>
        </View>
        <View style={styles.hadithsContainer}>
          {data?.hadiths?.map((hadith) => (
            <View key={hadith.id} style={styles.hadithCard}>
              <Text style={styles.hadithNumber}>Hadith #{hadith.idInBook}</Text>
              <Text style={styles.arabicText}>{hadith.arabic}</Text>
              <Text style={styles.narratorText}>{hadith.english.narrator}</Text>
              <Text style={styles.englishText}>{hadith.english.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#00668c',
  },
  titleContainer: {
    padding: 20,
    alignItems: 'center',
  },
  titleEnglish: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  titleArabic: {
    fontFamily: 'Scheherazade_700Bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
  hadithsContainer: {
    padding: 16,
  },
  hadithCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  hadithNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  arabicText: {
    fontFamily: 'Scheherazade_400Regular',
    fontSize: 24,
    textAlign: 'right',
    lineHeight: 36,
    marginBottom: 16,
  },
  narratorText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  englishText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
export default MajahDetails;
