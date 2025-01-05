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

const Muslim = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Scheherazade_400Regular,
    Scheherazade_700Bold
  });

  const { data: metadata, isLoading } = useQuery({
    queryKey: ['muslimMetadata'],
    queryFn: async () => {
      const response = await fetch('https://cdn.jsdelivr.net/gh/aashif000/DB-for-Q-H@main/muslim/1.json'); 
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
          <Text style={styles.titleArabic}>صحيح مسلم</Text>
          <Text style={styles.titleEnglish}>Sahih Muslim</Text>
          <Text style={styles.description}>
            Sahih Muslim is a collection of hadith compiled by Imam Muslim ibn al-Hajjaj al-Naysaburi (rahimahullah). His collection is considered to be one of the most authentic collections of the Sunnah of the Prophet (ﷺ), and along with Sahih al-Bukhari forms the "Sahihain," or the "Two Sahihs." It contains roughly 7500 hadith (with repetitions) in 57 books.
          </Text>
        </View>

        {/* Chapters Grid */}
        <View style={styles.chaptersGrid}>
          {Array.from({ length: 56 }, (_, i) => i + 1).map((chapter) => (
            <TouchableOpacity
              key={chapter}
              style={styles.chapterCard}
              onPress={() => navigation.navigate('MuslimDetails', { chapterId: chapter })}
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
    1: "The Book of Faith",
    2: "The Book of Purification",
    3: "The Book of Menstruation",
    4: "The Book of Prayers",
    5: "The Book of Mosques and Places of Prayer",
    6: "The Book of Prayer - Travellers",
    7: "The Book of Prayer - Friday",
    8: "The Book of Prayer - Two Eids",
    9: "The Book of Prayer - Rain",
    10: "The Book of Prayer - Eclipses",
    11: "The Book of Prayer - Funerals",
    12: "The Book of Zakat",
    13: "The Book of Fasting",
    14: "The Book of I'tikaf",
    15: "The Book of Pilgrimage",
    16: "The Book of Marriage",
    17: "The Book of Suckling",
    18: "The Book of Divorce",
    19: "The Book of Invoking Curses",
    20: "The Book of Emancipating Slaves",
    21: "The Book of Transactions",
    22: "The Book of Musaqah",
    23: "The Book of the Rules of Inheritance",
    24: "The Book of Gifts",
    25: "The Book of Wills",
    26: "The Book of Vows",
    27: "The Book of Oaths",
    28: "The Book of Oaths, Muharibin, Qasas (Retaliation), and Diyat (Blood Money)",
    29: "The Book of Legal Punishments",
    30: "The Book of Judicial Decisions",
    31: "The Book of Lost Property",
    32: "The Book of Jihad and Expeditions",
    33: "The Book on Government",
    34: "The Book of Hunting, Slaughter, and what may be Eaten",
    35: "The Book of Sacrifices",
    36: "The Book of Drinks",
    37: "The Book of Clothes and Adornment",
    38: "The Book of Manners and Etiquette",
    39: "The Book of Greetings",
    40: "The Book Concerning the Use of Correct Words",
    41: "The Book of Poetry",
    42: "The Book of Dreams",
    43: "The Book of Virtues",
    44: "The Book of the Merits of the Companions",
    45: "The Book of Virtue, Enjoining Good Manners, and Joining of the Ties of Kinship",
    46: "The Book of Destiny",
    47: "The Book of Knowledge",
    48: "The Book Pertaining to the Remembrance of Allah, Supplication, Repentance and Seeking Forgiveness",
    49: "The Book of Heart-Melting Traditions",
    50: "The Book of Repentance",
    51: "Characteristics of The Hypocrites And Rulings Concerning Them",
    52: "Characteristics of the Day of Judgment, Paradise, and Hell",
    53: "The Book of Paradise, its Description, its Bounties and its Inhabitants",
    54: "The Book of Tribulations and Portents of the Last Hour",
    55: "The Book of Zuhd and Softening of Hearts",
    56: "The Book of Commentary on the Qur'an",
  };

  return titles[chapter] || `Chapter ${chapter}`;
};

const getChapterTitleArabic = (chapter) => {
  const titles = {
    1: "كتاب الإيمان",
    2: "كتاب الطهارة",
    3: "كتاب الحيض",
    4: "كتاب الصلاة",
    5: "كتاب الْمَسَاجِدِ وَمَوَاضِعِ الصَّلاَةِ",
    6: "كتاب صلاة المسافرين وقصرها",
    7: "كتاب الجمعة",
    8: "كتاب صلاة العيدين",
    9: "كتاب صلاة الاستسقاء‏",
    10: "كتاب الكسوف",
    11: "كتاب الجنائز",
    12: "كتاب الزكاة",
    13: "كتاب الصيام",
    14: "كتاب الاعتكاف",
    15: "كتاب الحج",
    16: "كتاب النكاح",
    17: "كتاب الرضاع",
    18: "كتاب الطلاق",
    19: "كتاب اللعان",
    20: "كتاب العتق",
    21: "كتاب البيوع",
    22: "كتاب المساقاة",
    23: "كتاب الفرائض",
    24: "كتاب الهبات",
    25: "كتاب الوصية",
    26: "كتاب النذر",
    27: "كتاب الأيمان",
    28: "كتاب القسامة والمحاربين والقصاص والديات",
    29: "كتاب الحدود",
    30: "كتاب الأقضية",
    31: "كتاب اللقطة",
    32: "كتاب الجهاد والسير",
    33: "كتاب الإمارة",
    34: "كتاب الصيد والذبائح وما يؤكل من الحيوان",
    35: "كتاب الأضاحى",
    36: "كتاب الأشربة",
    37: "كتاب اللباس والزينة",
    38: "كتاب الآداب",
    39: "كتاب السلام",
    40: "كتاب الألفاظ من الأدب وغيرها",
    41: "كتاب الشعر",
    42: "كتاب الرؤيا",
    43: "كتاب الفضائل",
    44: "كتاب فضائل الصحابة رضى الله تعالى عنهم",
    45: "كتاب البر والصلة والآداب",
    46: "كتاب القدر",
    47: "كتاب العلم",
    48: "كتاب الذكر والدعاء والتوبة والاستغفار",
    49: "كتاب الرقاق",
    50: "كتاب التوبة",
    51: "كتاب صفات المنافقين وأحكامهم",
    52: "كتاب صفة القيامة والجنة والنار",
    53: "كتاب الجنة وصفة نعيمها وأهلها",
    54: "كتاب الفتن وأشراط الساعة",
    55: "كتاب الزهد والرقائق",
    56: "كتاب التفسير",
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

export default Muslim;
