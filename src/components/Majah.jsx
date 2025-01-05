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

const Majah = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Scheherazade_400Regular,
    Scheherazade_700Bold
  });

  const { data: metadata, isLoading } = useQuery({
    queryKey: ['majahMetadata'],
    queryFn: async () => {
      const response = await fetch('https://cdn.jsdelivr.net/gh/aashif000/DB-for-Q-H@main/ibnmajah/1.json');
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
          <Text style={styles.titleArabic}>{metadata?.arabic.title}</Text>
          <Text style={styles.titleEnglish}>{metadata?.english.title}</Text>
          <Text style={styles.description}>
            Sunan Ibn Majah is a collection of hadith compiled by Imam Muhammad bin Yazid Ibn Majah al-Qazvini (rahimahullah). 
            It is widely considered to be the sixth of the six canonical collection of hadith (Kutub as-Sittah) of the Sunnah of the Prophet (ﷺ).
          </Text>
        </View>

        {/* Chapters Grid */}
        <View style={styles.chaptersGrid}>
          {Array.from({ length: 37 }, (_, i) => i + 1).map((chapter) => (
            <TouchableOpacity
              key={chapter}
              style={styles.chapterCard}
              onPress={() => navigation.navigate('MajahDetails', { chapterId: chapter })}
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
// Helper functions to get chapter titles
const getChapterTitle = (chapter) => {
  const titles = {
    1: "The Book of the Sunnah",
    2: "The Book of Purification and its Sunnah",
    3: "The Book of the Prayer",
    4: "The Book of the Adhan and the Sunnah Regarding It",
    5: "The Book On The Mosques And The Congregations",
    6: "Establishing the Prayer and the Sunnah Regarding Them",
    7: "Chapters Regarding Funerals",
    8: "Fasting",
    9: "The Chapters Regarding Zakat",
    10: "The Chapters on Marriage",
    11: "The Chapters on Divorce",
    12: "The Chapters on Expiation",
    13: "The Chapters on Business Transactions",
    14: "The Chapters on Rulings",
    15: "The Chapters on Gifts",
    16: "The Chapters on Charity",
    17: "The Chapters on Pawning",
    18: "The Chapters on Pre-emption",
    19: "The Chapters on Lost Property",
    20: "The Chapters on Manumission (of Slaves)",
    21: "The Chapters on Legal Punishments",
    22: "The Chapters on Blood Money",
    23: "The Chapters on Wills",
    24: "Chapters on Shares of Inheritance",
    25: "The Chapters on Jihad",
    26: "Chapters on Hajj Rituals",
    27: "Chapters on Sacrifices",
    28: "Chapters on Slaughtering",
    29: "Chapters on Hunting",
    30: "Chapters on Food",
    31: "Chapters on Drinks",
    32: "Chapters on Medicine",
    33: "Chapters on Dress",
    34: "Etiquette",
    35: "Supplication",
    36: "Interpretation of Dreams",
    37: "Tribulations",
    38: "Zuhd"
  };
  return titles[chapter] || `Chapter ${chapter}`;
};

const getChapterTitleArabic = (chapter) => {
  const titles = {
    1: "كتاب المقدمة",
    2: "كتاب الطهارة وسننها",
    3: "كتاب الصلاة",
    4: "كتاب الأذان والسنة فيها",
    5: "كتاب المساجد والجماعات",
    6: "كتاب إقامة الصلاة والسنة فيها",
    7: "كتاب الجنائز",
    8: "كتاب الصيام",
    9: "كتاب الزكاة",
    10: "كتاب النكاح",
    11: "كتاب الطلاق",
    12: "كتاب الكفارات",
    13: "كتاب التجارات",
    14: "كتاب الأحكام",
    15: "كتاب الهبات",
    16: "كتاب الصدقات",
    17: "كتاب الرهون",
    18: "كتاب الشفعة",
    19: "كتاب اللقطة",
    20: "كتاب العتق",
    21: "كتاب الحدود",
    22: "كتاب الديات",
    23: "كتاب الوصايا",
    24: "كتاب الفرائض",
    25: "كتاب الجهاد",
    26: "كتاب المناسك",
    27: "كتاب الأضاحي",
    28: "كتاب الذبائح",
    29: "كتاب الصيد",
    30: "كتاب الأطعمة",
    31: "كتاب الأشربة",
    32: "كتاب الطب",
    33: "كتاب اللباس",
    34: "كتاب الأدب",
    35: "كتاب الدعاء",
    36: "كتاب تعبير الرؤيا",
    37: "كتاب الفتن",
    38: "كتاب الزهد"
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

export default Majah;