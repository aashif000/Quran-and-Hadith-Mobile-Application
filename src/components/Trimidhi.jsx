import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { 
  useFonts,
  Scheherazade_400Regular,
  Scheherazade_700Bold
} from '@expo-google-fonts/scheherazade';
import { ActivityIndicator } from 'react-native-paper';

const Trimidhi = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Scheherazade_400Regular,
    Scheherazade_700Bold
  });

  if (!fontsLoaded) {
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
          <Text style={styles.titleArabic}>جامع الترمذي</Text>
          <Text style={styles.titleEnglish}>Jami` at-Tirmidhi</Text>
          <Text style={styles.description}>
            Jami` at-Tirmidhi is a collection of hadith compiled by Imam Abu `Isa Muhammad at-Tirmidhi (rahimahullah). 
            His collection is unanimously considered to be one of the six canonical collections of hadith (Kutub as-Sittah) of the Sunnah of the Prophet (ﷺ). 
            It contains roughly 4400 hadith (with repetitions) in 46 books.
          </Text>
        </View>

        {/* Chapters Grid */}
        <View style={styles.chaptersGrid}>
          {Array.from({ length: 46 }, (_, i) => i + 1).map((chapter) => (
            <TouchableOpacity
              key={chapter}
              style={styles.chapterCard}
              onPress={() => navigation.navigate('TrimidhiDetails', { chapterId: chapter })}
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
    1: "The Book on Purification",
    2: "The Book on Salat (Prayer)",
    3: "The Book on Al-Witr",
    4: "The Book on the Day of Friday",
    5: "The Book on the Two Eids",
    6: "The Book on Traveling",
    7: "The Book on Zakat",
    8: "The Book on Fasting",
    9: "The Book on Hajj",
    10: "The Book on Jana''iz (Funerals)",
    11: "The Book on Marriage",
    12: "The Book on Suckling",
    13: "The Book on Divorce and Li'an",
    14: "The Book on Business",
    15: "The Chapters On Judgements From The Messenger of Allah",
    16: "The Book on Blood Money",
    17: "The Book on Legal Punishments (Al-Hudud)",
    18: "The Book on Hunting",
    19: "The Book on Sacrifices",
    20: "The Book on Vows and Oaths",
    21: "The Book on Military Expeditions",
    22: "The Book on Virtues of Jihad",
    23: "The Book on Jihad",
    24: "The Book on Clothing",
    25: "The Book on Food",
    26: "The Book on Drinks",
    27: "Chapters on Righteousness And Maintaining Good Relations With Relatives",
    28: "Chapters on Medicine",
    29: "Chapters On Inheritance",
    30: "Chapters On Wasaya (Wills and Testament)",
    31: "Chapters On Wala' And Gifts",
    32: "Chapters On Al-Qadar",
    33: "Chapters On Al-Fitan",
    34: "Chapters On Dreams",
    35: "Chapters On Witnesses",
    36: "Chapters On Zuhd",
    37: "Chapters on the Description of the Day of Judgement, Ar-Riqaq, and Al-Wara'",
    38: "Chapters on the Description of Paradise",
    39: "The Book on the Description of Hellfire",
    40: "The Book on Faith",
    41: "Chapters on Knowledge",
    42: "Chapters on Seeking Permission",
    43: "Chapters on Manners",
    44: "Chapters on Parables",
    45: "Chapters on The Virtues of the Qur'an",
    46: "Chapters on Recitation",
  };
  return titles[chapter] || `Chapter ${chapter}`;
};

const getChapterTitleArabic = (chapter) => {
  const titles = {
    1: "كتاب الطهارة عن رسول الله صلى الله عليه وسلم",
    2: "كتاب الصلاة",
    3: "أَبْوَابُ الْوِتْرِ",
    4: "كِتَاب الْجُمُعَةِ",
    5: "أَبْوَابُ الْعِيدَيْنِ",
    6: "أَبْوَابُ السَّفَرِ",
    7: "كتاب الزكاة",
    8: "كتاب الصوم",
    9: "كتاب الحج",
    10: "كتاب الجنائز",
    11: "كتاب النكاح",
    12: "كتاب الرضاع",
    13: "كتاب الطلاق واللعان",
    14: "كتاب البيوع",
    15: "كتاب الأحكام",
    16: "كتاب الديات",
    17: "كتاب الحدود",
    18: "كتاب الصيد والذبائح",
    19: "كتاب الأضاحى",
    20: "كتاب النذور والأيمان",
    21: "كتاب السير",
    22: "كتاب فضائل الجهاد",
    23: "كتاب الجهاد",
    24: "كتاب اللباس",
    25: "كتاب الأطعمة",
    26: "كتاب الأشربة",
    27: "كتاب البر والصلة",
    28: "كتاب الطب",
    29: "كتاب الفرائض",
    30: "كتاب الوصايا",
    31: "كتاب الولاء والهبة",
    32: "كتاب القدر",
    33: "كتاب الفتن",
    34: "كتاب الرؤيا",
    35: "كتاب الشهادات",
    36: "كتاب الزهد",
    37: "كتاب صفة القيامة والرقائق",
    38: "كتاب صفة الجنة",
    39: "كتاب صفة جهنم",
    40: "كتاب الإيمان",
    41: "كتاب العلم",
    42: "كتاب الاستئذان",
    43: "كتاب الأدب",
    44: "كتاب الأمثال",
    45: "كتاب ثواب القرآن",
    46: "كتاب القراءات",
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

export default Trimidhi;
