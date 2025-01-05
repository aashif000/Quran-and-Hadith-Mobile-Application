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

const QudsiDetails = ({ route, navigation }) => {
  const { hadithId } = route.params;
  const [fontsLoaded] = useFonts({
    Scheherazade_400Regular,
    Scheherazade_700Bold
  });

  const { data, isLoading } = useQuery({
    queryKey: ['qudsiHadith', hadithId],
    queryFn: async () => {
      const response = await fetch('https://cdn.jsdelivr.net/gh/aashif000/DB-for-Q-H@main/qudsi40/all.json');
      const allHadiths = await response.json();
      return allHadiths.hadiths.find(h => h.id === hadithId);
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
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#00668c" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.hadithContainer}>
          <Text style={styles.hadithNumber}>Hadith {data?.number}</Text>
          <Text style={styles.arabicText}>{data?.arabic}</Text>
          <Text style={styles.narratorText}>{data?.english?.narrator}</Text>
          <Text style={styles.englishText}>{data?.english?.text}</Text>
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
  content: {
    flex: 1,
  },
  hadithContainer: {
    padding: 20,
  },
  hadithNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00668c',
    marginBottom: 16,
    textDecorationLine: 'underline',
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

export default QudsiDetails;