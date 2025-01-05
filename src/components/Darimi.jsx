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


const Darimi = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Scheherazade_400Regular,
    Scheherazade_700Bold
  });

  const { data: metadata, isLoading } = useQuery({
    queryKey: ['majahMetadata'],
    queryFn: async () => {
      const response = await fetch('https://cdn.jsdelivr.net/gh/aashif000/DB-for-Q-H@main/darimi/1.json');
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
          <Text style={styles.titleArabic}>سنن الدارمي</Text>
          <Text style={styles.titleEnglish}>Sunan ad-Darimi
          </Text>
          <Text style={styles.description}>
          Sunan ad-Darimi is a collection of hadith compiled by Imam Abdullah ibn Abd ar-Rahman ad-Darimi (d. 255 AH/869 CE - rahimahullah). It is considered to be one of the important collections of reports of the Sunnah of the Prophet Muhammad (ﷺ), typically included in the "Nine Books" of hadith collections. It contains approximately 3,400 hadith sectioned by topic (as in a Sunan). It has unfortunately not been translated into English yet.
          </Text>
        </View>

        {/* Chapters Grid */}
        <View style={styles.chaptersGrid}>
          {Array.from({ length: 37 }, (_, i) => i + 1).map((chapter) => (
            <TouchableOpacity
              key={chapter}
              style={styles.chapterCard}
              onPress={() => navigation.navigate('DarimiDetails', { chapterId: chapter })}
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
    1: "The Book of the Sunnah",
    2: "The Book of Purification and its Sunnah",
    3: "The Book of Prayer",
    4: "The Book of Zakat",
    5: "The Book of Fasting",
    6: "The Book of Hajj",
    7: "The Book of Jihad",
    8: "The Book of Marriage",
    9: "The Book of Divorce",
    10: "The Book of Kindness to Parents",
    11: "The Book of Companionship",
    12: "The Book of Knowledge",
    13: "The Book of Al-Fitrah",
    14: "The Book of the Prohibited Actions",
    15: "The Book of Testimonies",
    16: "The Book of Oaths",
    17: "The Book of Ruqyah (Healing)",
    18: "The Book of Prayer for Rain",
    19: "The Book of Salat al-Janazah (Funeral Prayer)",
    20: "The Book of the Times of Prayer",
    21: "The Book of the Adhan (Call to Prayer)",
    22: "The Book of Fiqh (Islamic Jurisprudence)",
    23: "The Book of Tawhid (Oneness of God)",
    24: "The Book of Faith and its Requirements",
    25: "The Book of Qadar (Divine Decree)",
    26: "The Book of Zuhd (Asceticism)",
    27: "The Book of the Descriptions of the Prophet's Prayer",
    28: "The Book of Al-Tafseer (Exegesis)",
    29: "The Book of Etiquette",
    30: "The Book of Generosity",
    31: "The Book of Jihad and the Expedition",
    32: "The Book of Huda (Guidance)",
    33: "The Book of the Companions",
    34: "The Book of Seeking Refuge",
    35: "The Book of Forgiveness",
    36: "The Book of Prayer During Times of Difficulty",
    37: "Zuhd (Asceticism)"
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

export default Darimi;