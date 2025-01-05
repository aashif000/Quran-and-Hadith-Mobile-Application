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


const Ahmed = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Scheherazade_400Regular,
    Scheherazade_700Bold
  });

  const { data: metadata, isLoading } = useQuery({
    queryKey: ['majahMetadata'],
    queryFn: async () => {
      const response = await fetch('https://cdn.jsdelivr.net/gh/aashif000/DB-for-Q-H@main/ahmed/1.json');
      const data = await response.json();
      return data.metadata;
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
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.titleArabic}>مسند أحمد</Text>
          <Text style={styles.titleEnglish}>Musnad Ahmad
          </Text>
          <Text style={styles.description}>
          
          Musnad Ahmad is a collection of hadith compiled by Imam Ahmad ibn Hanbal (d. 241 AH/855 AD - rahimahullah). It is one of the most famous and important collections of reports of the Sunnah of the Prophet Muhammad (ﷺ). It is the largest of the main books of hadith containing approximately 28,199 hadith sectioned based on individual Companions. The translation provided here is by Nasir Khattab.</Text>
        </View>

        {/* Chapters Grid */}
        <View style={styles.chaptersGrid}>
          {Array.from({ length: 37 }, (_, i) => i + 1).map((chapter) => (
            <TouchableOpacity
              key={chapter}
              style={styles.chapterCard}
              onPress={() => navigation.navigate('AhmedDetails', { chapterId: chapter })}
            >
              <Text style={styles.chapterNumber}>{chapter}</Text>
              <Text style={styles.chapterTitleEnglish}>
                {getChapterTitle(chapter)}
              </Text>
              <Text style={styles.chapterTitleArabic}>
                {getChapterTitleArabic(chapter)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper functions to get chapter titles
const getChapterTitle = (chapter) => {
  const titles = {
    1: "Musnad Abu Bakr as-Siddiq (ra)مُسْنَدُ أَبِي بَكْرٍ الصِّدِّيقِ رَضِيَ اللَّهُ عَنْهُ1to81",
    2: "Musnad `Umar b. al-Khattab (ra)مُسْنَدِ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ82to390",
    3: "The Hadeeth of Saqeefahحَدِيثُ السَّقِيفَةِ391to398",
    4: "Musnad Uthman ibn Affanمُسْنَدُ عُثْمَانَ بْنِ عَفَّانَ رَضِيَ اللَّهُ عَنْهُ399to561",
    5: "Musnad 'Ali Ibn Abi Talibوَمِنْ مُسْنَدِ عَلِيِّ بْنِ أَبِي طَالِبٍ رَضِيَ اللَّهُ عَنْهُ562to1380",
    6: "Musnad of Abu Muhammad Talhah bin 'Ubaidullahمُسْنَدُ أَبِي مُحَمَّدٍ طَلْحَةَ بْنِ عُبَيْدِ اللَّهِ رَضِيَ اللَّهُ تَعَالَى عَنْهُ1381to1404",
    7: "The Musnad of az-Zubair bin al-'Awwamمُسْنَدُ الزُّبَيْرِ بْنِ الْعَوَّامِ رَضِيَ اللَّهُ عَنْهُ1405to1438"
  };

  return titles[chapter] || `Chapter ${chapter}`;
};



const getChapterTitleArabic = (chapter) => {
  const titles = {
    1: "كتاب المقدمة",
    2: "كتاب الطهارة وسننها",
    // ... Add all chapter titles
    37: "كتاب الزهد"
  };
  return titles[chapter] || `الباب ${chapter}`;
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
  },
  chaptersGrid: {
    padding: 10,
  },
  chapterCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  chapterNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00668c',
    marginBottom: 8,
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
});

export default Ahmed;