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

const Qudsi = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Scheherazade_400Regular,
    Scheherazade_700Bold
  });

  const { data, isLoading } = useQuery({
    queryKey: ['qudsiAll'],
    queryFn: async () => {
      const response = await fetch('https://cdn.jsdelivr.net/gh/aashif000/DB-for-Q-H@main/qudsi40/all.json');
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
      <ScrollView>
        <View style={styles.heroSection}>
          <Text style={styles.titleArabic}>{data?.metadata?.arabic?.title}</Text>
          <Text style={styles.titleEnglish}>{data?.metadata?.english?.title}</Text>
          <Text style={styles.description}>
            Hadith Qudsi are the sacred sayings where Allah speaks in the first person through Prophet Muhammad ﷺ. These forty hadiths are a collection of such divine narratives.
          </Text>
        </View>

        <View style={styles.hadithsContainer}>
          {data?.hadiths?.map((hadith, index) => (
            <TouchableOpacity
              key={hadith.id}
              style={styles.hadithCard}
              onPress={() => navigation.navigate('QudsiDetails', { hadithId: hadith.id })}
            >
              <Text style={styles.hadithNumber}>Hadith {hadith.number || index + 1}</Text>
              <Text style={styles.previewArabic} numberOfLines={2}>
                {hadith.arabic}
              </Text>
              <Text style={styles.previewEnglish} numberOfLines={2}>
                {hadith.english.text}
              </Text>
            </TouchableOpacity>
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
  heroSection: {
    padding: 20,
    alignItems: 'center',
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
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d0d0b',
    marginBottom: 8,
    textDecorationLine: 'underline',
  },
  previewArabic: {
    fontFamily: 'Scheherazade_400Regular',
    fontSize: 20,
    textAlign: 'right',
    marginBottom: 8,
  },
  previewEnglish: {
    fontSize: 14,
    color: '#666',
  },
});

export default Qudsi;