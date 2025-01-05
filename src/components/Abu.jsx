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
import AbuDetails from './AbuDetails';
const Abu = ({ navigation }) => {
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
          <Text style={styles.titleArabic}>سنن أبي داود</Text>
          <Text style={styles.titleEnglish}>Sunan Abi Dawud</Text>
          <Text style={styles.description}>
            Sunan Abi Dawud is a collection of hadith compiled by Imam Abu Dawud Sulayman ibn al-Ash'ath as-Sijistani (rahimahullah). It is widely considered to be among the six canonical collections of hadith (Kutub as-Sittah) of the Sunnah of the Prophet (ﷺ). It consists of 5274 ahadith in 43 books.
          </Text>
        </View>

        {/* Chapters Grid */}
        <View style={styles.chaptersGrid}>
          {Array.from({ length: 43 }, (_, i) => i + 1).map((chapter) => (
            <TouchableOpacity
              key={chapter}
              style={styles.chapterCard}
              onPress={() => navigation.navigate('AbuDetails', { chapterId: chapter })}
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
    1: "Purification (Kitab Al-Taharah)",
    2: "Prayer (Kitab Al-Salat)",
    3: "The Book Of The Prayer For Rain (Kitab al-Istisqa')",
    4: "Prayer: Detailed Rules about Journey",
    5: "Voluntary Prayers",
    6: "Detailed Injunctions about Ramadan",
    7: "Prostration while Reciting Qur'an",
    8: "Detailed Injunctions about Witr",
    9: "Zakat (Kitab Al-Zakat)",
    10: "The Book of Lost and Found Items",
    11: "The Rites of Hajj",
    12: "Marriage (Kitab Al-Nikah)",
    13: "Divorce (Kitab Al-Talaq)",
    14: "Fasting (Kitab Al-Siyam)",
    15: "Jihad (Kitab Al-Jihad)",
    16: "Sacrifice (Kitab Al-Dahaya)",
    17: "Game (Kitab Al-Said)",
    18: "Wills (Kitab Al-Wasaya)",
    19: "Shares of Inheritance (Kitab Al-Fara'id)",
    20: "Tribute, Spoils, and Rulership",
    21: "Funerals (Kitab Al-Jana'iz)",
    22: "Oaths and Vows",
    23: "Commercial Transactions",
    24: "Wages (Kitab Al-Ijarah)",
    25: "The Office of the Judge",
    26: "Knowledge (Kitab Al-Ilm)",
    27: "Drinks (Kitab Al-Ashribah)",
    28: "Foods (Kitab Al-At'imah)",
    29: "Medicine (Kitab Al-Tibb)",
    30: "Divination and Omens",
    31: "Manumission of Slaves",
    32: "Dialects and Readings of the Qur'an",
    33: "Hot Baths (Kitab Al-Hammam)",
    34: "Clothing (Kitab Al-Libas)",
    35: "Combing the Hair",
    36: "Signet-Rings (Kitab Al-Khatam)",
    37: "Trials and Fierce Battles",
    38: "The Promised Deliverer",
    39: "Battles (Kitab Al-Malahim)",
    40: "Prescribed Punishments",
    41: "Types of Blood-Wit",
    42: "Model Behavior of the Prophet",
    43: "General Behavior"
  };

  return titles[chapter] || `Chapter ${chapter}`;
};

const getChapterTitleArabic = (chapter) => {
  const titles = {
    1: "كتاب الطهارة",
    2: "كتاب الصلاة",
    3: "كتاب الاستسقاء",
    4: "كتاب صلاة السفر",
    5: "كتاب التطوع",
    6: "كتاب شهر رمضان",
    7: "كتاب سجود القرآن",
    8: "كتاب الوتر",
    9: "كتاب الزكاة",
    10: "كتاب اللقطة",
    11: "كتاب المناسك",
    12: "كتاب النكاح",
    13: "كتاب الطلاق",
    14: "كتاب الصوم",
    15: "كتاب الجهاد",
    16: "كتاب الضحايا",
    17: "كتاب الصيد",
    18: "كتاب الوصايا",
    19: "كتاب الفرائض",
    20: "كتاب الخراج والإمارة",
    21: "كتاب الجنائز",
    22: "كتاب الأيمان والنذور",
    23: "كتاب البيوع",
    24: "كتاب الإجارة",
    25: "كتاب الأقضية",
    26: "كتاب العلم",
    27: "كتاب الأشربة",
    28: "كتاب الأطعمة",
    29: "كتاب الطب",
    30: "كتاب الكهانة",
    31: "كتاب العتق",
    32: "كتاب الحروف والقراءات",
    33: "كتاب الحمَّام",
    34: "كتاب اللباس",
    35: "كتاب الترجل",
    36: "كتاب الخاتم",
    37: "كتاب الفتن والملاحم",
    38: "كتاب المهدى",
    39: "كتاب الملاحم",
    40: "كتاب الحدود",
    41: "كتاب الديات",
    42: "كتاب السنة",
    43: "كتاب الأدب"
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

export default Abu;
