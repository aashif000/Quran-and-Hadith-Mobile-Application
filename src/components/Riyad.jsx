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


const Riyad = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Scheherazade_400Regular,
    Scheherazade_700Bold
  });

  const { data: metadata, isLoading } = useQuery({
    queryKey: ['majahMetadata'],
    queryFn: async () => {
      const response = await fetch('https://cdn.jsdelivr.net/gh/aashif000/DB-for-Q-H@main/riyad_assalihin/1.json');
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
          <Text style={styles.titleArabic}>رياض الصالحين</Text>
          <Text style={styles.titleEnglish}>Riyad as-Salihin 
          </Text>
          <Text style={styles.description}>
          
          Riyad as-Salihin is a selection of hadith compiled by Imam Yahya ibn Sharaf an-Nawawi. It is one of the most widely known and read books of hadith all over the world, containing approximately 1,900 carefully chosen hadith on ethics, manners, worship, knowledge, and other topics compiled from the Six Books of hadith. It is practical and accessible to Muslims of all levels.
          </Text>
        </View>

        {/* Chapters Grid */}
        <View style={styles.chaptersGrid}>
          {Array.from({ length: 19 }, (_, i) => i + 1).map((chapter) => (
            <TouchableOpacity
              key={chapter}
              style={styles.chapterCard}
              onPress={() => navigation.navigate('RiyadDetails', { chapterId: chapter })}
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
    0: "The Book of Miscellany",
    1: "The Book of Good Manners",
    2: "The Book About the Etiquette of Eating",
    3: "The Book of Dress",
    4: "The Book of the Etiquette of Sleeping, Lying and Sitting etc.",
    5: "The Book of Greetings",
    6: "The Book of Visiting the Sick",
    7: "The Book of Etiquette of Traveling",
    8: "The Book of Virtues",
    9: "The Book of I'tikaf",
    10: "The Book of Hajj",
    11: "The Book of Jihad",
    12: "The Book of Knowledge",
    13: "The Book of Praise and Gratitude to Allah",
    14: "The Book of Supplicating Allah to Exalt the Mention of Allah's Messenger",
    15: "The Book of the Remembrance of Allah",
    16: "The Book of Du'a (Supplications)",
    17: "The Book of the Prohibited Actions",
    18: "The Book of Miscellaneous Ahadith of Significant Values",
    19: "The Book of Forgiveness"
  };
 


  return titles[chapter] || `Chapter ${chapter}`;
};

const getChapterTitleArabic = (chapter) => {
  const titles = {
    0: "كتاب المقدمة",
    1: "كتاب الأدب",
    2: "كتاب أدب الطعام",
    3: "كتاب اللباس",
    4: "كتاب آداب النوم والاضطجاع والجلوس وما إلى ذلك",
    5: "كتاب السلام",
    6: "كتاب عيادة المريض",
    7: "كتاب آداب السفر",
    8: "كتاب الفضائل",
    9: "كتاب الاعتكاف",
    10: "كتاب الحج",
    11: "كتاب الجهاد",
    12: "كتاب العلم",
    13: "كتاب حمد الله تعالى وشكره",
    14: "كتاب الصلاة على رسول الله صلى الله عليه وسلم",
    15: "كتاب الأذكار",
    16: "كتاب الدعوات",
    17: "كتاب الأمور المنهي عنها",
    18: "كتاب المنثورات والملح",
    19: "كتاب الاستغفار"
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

export default Riyad;