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

const Bukhari = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Scheherazade_400Regular,
    Scheherazade_700Bold
  });

  const { data: metadata, isLoading } = useQuery({
    queryKey: ['bukhariMetadata'],
    queryFn: async () => {
      const response = await fetch(
        'https://cdn.jsdelivr.net/gh/aashif000/DB-for-Q-H@main/bukhari/1.json'
      );
      const data = await response.json();
      return data.metadata;
    },
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
          <Text style={styles.titleArabic}>{metadata.arabic.title}</Text>
          <Text style={styles.titleEnglish}>{metadata.english.title}</Text>
          <Text style={styles.description}>Sahih al-Bukhari is a collection of hadith compiled by Imam Muhammad al-Bukhari (d. 256 AH/870 AD) (rahimahullah). His collection is recognized by the overwhelming majority of the Muslim world to be the most authentic collection of reports of the Sunnah of the Prophet Muhammad (ﷺ). It contains over 7500 hadith (with repetitions) in 97 books. The translation provided here is by Dr. M. Muhsin Khan.</Text>
        </View>

        {/* Chapters Grid */}
        <View style={styles.chaptersGrid}>
          {Array.from({ length: 97}, (_, i) => i + 1).map((chapter) => (
            <TouchableOpacity
              key={chapter}
              style={styles.chapterCard}
              onPress={() => navigation.navigate('BukhariDetails', { chapterId: chapter })}
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
// Helper functions to get chapter titles in English and Arabic

const getChapterTitle = (chapter) => {
  const titles = {
    1: "Revelation",
    2: "Belief",
    3: "Knowledge",
    4: "Ablutions (Wudu')",
    5: "Bathing (Ghusl)",
    6: "Menstrual Periods",
    7: "Rubbing Hands and Feet with Dust (Tayammum)",
    8: "Prayers (Salat)",
    9: "Times of the Prayers",
    10: "Call to Prayers (Adhaan)",
    11: "Friday Prayer",
    12: "Fear Prayer",
    13: "The Two Festivals (Eids)",
    14: "Witr Prayer",
    15: "Invoking Allah for Rain (Istisqaa)",
    16: "Eclipses",
    17: "Prostration During Recital of Qur'an",
    18: "Shortening the Prayers (At-Taqseer)",
    19: "Prayer at Night (Tahajjud)",
    20: "Virtues of Prayer at Masjid Makkah and Madinah",
    21: "Actions while Praying",
    22: "Forgetfulness in Prayer",
    23: "Funerals (Al-Janaa'iz)",
    24: "Obligatory Charity Tax (Zakat)",
    25: "Hajj (Pilgrimage)",
    26: "`Umrah (Minor Pilgrimage)",
    27: "Pilgrims Prevented from Completing the Pilgrimage",
    28: "Penalty of Hunting while on Pilgrimage",
    29: "Virtues of Madinah",
    30: "Fasting",
    31: "Praying at Night in Ramadaan (Taraweeh)",
    32: "Virtues of the Night of Qadr",
    33: "Retiring to a Mosque for Remembrance of Allah (I'tikaf)",
    34: "Sales and Trade",
    35: "Sales in which a Price is Paid for Goods to be Delivered Later (As-Salam)",
    36: "Shuf'a",
    37: "Hiring",
    38: "Transferance of a Debt from One Person to Another (Al-Hawaala)",
    39: "Kafalah",
    40: "Representation, Authorization, Business by Proxy",
    41: "Agriculture",
    42: "Distribution of Water",
    43: "Loans, Payment of Loans, Freezing of Property, Bankruptcy",
    44: "Lawsuits",
    45: "Lost Things Picked up by Someone (Luqatah)",
    46: "Oppressions",
    47: "Partnership",
    48: "Mortgaging",
    49: "Manumission of Slaves",
    50: "Makaatib",
    51: "Gifts",
    52: "Witnesses",
    53: "Peacemaking",
    54: "Conditions",
    55: "Wills and Testaments (Wasaayaa)",
    56: "Fighting for the Cause of Allah (Jihaad)",
    57: "One-fifth of Booty to the Cause of Allah (Khumus)",
    58: "Jizyah and Mawaada'ah",
    59: "Beginning of Creation",
    60: "Prophets",
    61: "Virtues and Merits of the Prophet (pbuh) and his Companions",
    62: "Companions of the Prophet",
    63: "Merits of the Helpers in Madinah (Ansaar)",
    64: "Military Expeditions led by the Prophet (pbuh) (Al-Maghaazi)",
    65: "Prophetic Commentary on the Qur'an (Tafseer of the Prophet (pbuh))",
    66: "Virtues of the Qur'an",
    67: "Wedlock, Marriage (Nikaah)",
    68: "Divorce",
    69: "Supporting the Family",
    70: "Food, Meals",
    71: "Sacrifice on Occasion of Birth (`Aqiqa)",
    72: "Hunting, Slaughtering",
    73: "Al-Adha Festival Sacrifice (Adaahi)",
    74: "Drinks",
    75: "Patients",
    76: "Medicine",
    77: "Dress",
    78: "Good Manners and Form (Al-Adab)",
    79: "Asking Permission",
    80: "Invocations",
    81: "To make the Heart Tender (Ar-Riqaq)",
    82: "Divine Will (Al-Qadar)",
    83: "Oaths and Vows",
    84: "Expiation for Unfulfilled Oaths",
    85: "Laws of Inheritance (Al-Faraa'id)",
    86: "Limits and Punishments set by Allah (Hudood)",
    87: "Blood Money (Ad-Diyat)",
    88: "Apostates",
    89: "Statements made under Coercion",
    90: "Tricks",
    91: "Interpretation of Dreams",
    92: "Afflictions and the End of the World",
    93: "Judgments (Ahkaam)",
    94: "Wishes",
    95: "Accepting Information Given by a Truthful Person",
    96: "Holding Fast to the Qur'an and Sunnah",
    97: "Oneness, Uniqueness of Allah (Tawheed)",
  };
  return titles[chapter];
};

const getChapterTitleArabic = (chapter) => {
  const titles = {
    1: "كتاب بدء الوحي",
    2: "كتاب الإيمان",
    3: "كتاب العلم",
    4: "كتاب الوضوء",
    5: "كتاب الغسل",
    6: "كتاب الحيض",
    7: "كتاب التيمم",
    8: "كتاب الصلاة",
    9: "كتاب مواقيت الصلاة",
    10: "كتاب الأذان",
    11: "كتاب الجمعة",
    12: "كتاب صلاة الخوف",
    13: "كتاب العيدين",
    14: "كتاب الوتر",
    15: "كتاب الاستسقاء",
    16: "كتاب الكسوف",
    17: "كتاب سجود القرآن",
    18: "كتاب التقصير",
    19: "كتاب التهجد",
    20: "كتاب فضل الصلاة في مسجد مكة والمدينة",
    21: "كتاب العمل في الصلاة",
    22: "كتاب السهو",
    23: "كتاب الجنائز",
    24: "كتاب الزكاة",
    25: "كتاب الحج",
    26: "كتاب العمرة",
    27: "كتاب المحصر",
    28: "كتاب جزاء الصيد",
    29: "كتاب فضائل المدينة",
    30: "كتاب الصوم",
    31: "كتاب صلاة التراويح",
    32: "كتاب فضل ليلة القدر",
    33: "كتاب الاعتكاف",
    34: "كتاب البيوع",
    35: "كتاب السلم",
    36: "كتاب الشفعة",
    37: "كتاب الإجارة",
    38: "كتاب الحوالات",
    39: "كتاب الكفالة",
    40: "كتاب الوكالة",
    41: "كتاب المزارعة",
    42: "كتاب المساقاة",
    43: "كتاب في الاستقراض",
    44: "كتاب الخصومات",
    45: "كتاب في اللقطة",
    46: "كتاب المظالم",
    47: "كتاب الشركة",
    48: "كتاب الرهن",
    49: "كتاب العتق",
    50: "كتاب المكاتب",
    51: "كتاب الهبة وفضلها والتحريض عليها",
    52: "كتاب الشهادات",
    53: "كتاب الصلح",
    54: "كتاب الشروط",
    55: "كتاب الوصايا",
    56: "كتاب الجهاد والسير",
    57: "كتاب فرض الخمس",
    58: "كتاب الجزية والموادعة",
    59: "كتاب بدء الخلق",
    60: "كتاب أحاديث الأنبياء",
    61: "كتاب المناقب",
    62: "كتاب فضائل أصحاب النبي صلى الله عليه وسلم",
    63: "كتاب مناقب الأنصار",
    64: "كتاب المغازي",
    65: "كتاب التفسير",
    66: "كتاب فضائل القرآن",
    67: "كتاب النكاح",
    68: "كتاب الطلاق",
    69: "كتاب النفقات",
    70: "كتاب الأطعمة",
    71: "كتاب العقيقة",
    72: "كتاب الذبائح والصيد",
    73: "كتاب الأضاحي",
    74: "كتاب الأشربة",
    75: "كتاب المرضى",
    76: "كتاب الطب",
    77: "كتاب اللباس",
    78: "كتاب الأدب",
    79: "كتاب الاستئذان",
    80: "كتاب الدعوات",
    81: "كتاب الرقاق",
    82: "كتاب القدر",
    83: "كتاب الأيمان والنذور",
    84: "كتاب كفارات الأيمان",
    85: "كتاب الفرائض",
    86: "كتاب الحدود",
    87: "كتاب الديات",
    88: "كتاب استتابة المرتدين والمعاندين وقتالهم",
    89: "كتاب الإكراه",
    90: "كتاب الحيل",
    91: "كتاب التعبير",
    92: "كتاب الفتن",
    93: "كتاب الأحكام",
    94: "كتاب التمني",
    95: "كتاب أخبار الآحاد",
    96: "كتاب الاعتصام بالكتاب والسنة",
    97: "كتاب التوحيد",
  };
  return titles[chapter];
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

export default Bukhari;
