import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { useFonts, Scheherazade_400Regular, Scheherazade_700Bold } from '@expo-google-fonts/scheherazade';
import { ActivityIndicator } from 'react-native-paper';

const Malik = ({ navigation }) => {
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
          <Text style={styles.titleArabic}>موطأ مالك</Text>
          <Text style={styles.titleEnglish}>Muwatta Malik</Text>
          <Text style={styles.description}>
            One of the most widely known and read books of hadith all over the world, 
            containing approximately 1,900 carefully chosen hadith on ethics, manners, 
            worship, knowledge, and other topics.
          </Text>
        </View>

        {/* Chapters Grid */}
        <View style={styles.chaptersGrid}>
          {chapters.map((chapter, index) => (
            <TouchableOpacity
              key={index}
              style={styles.chapterCard}
              onPress={() => navigation.navigate('MalikDetails', { chapterId: index + 1 })}
            >
              <Text style={styles.chapterNumber}>{index + 1}</Text>
              <Text style={styles.chapterTitleEnglish}>{chapter.titleEnglish}</Text>
              <Text style={styles.chapterTitleArabic}>{chapter.titleArabic}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Hardcoded chapters
const chapters = [
  { titleEnglish: "The Times of Prayer", titleArabic: "كتاب وقوت الصلاة" },
  { titleEnglish: "Purity", titleArabic: "كتاب الطهارة" },
  { titleEnglish: "Prayer", titleArabic: "كتاب الصلاة" },
  { titleEnglish: "Forgetfulness in Prayer", titleArabic: "كتاب السهو" },
  { titleEnglish: "Jumu'a", titleArabic: "كتاب الجمعة" },
  { titleEnglish: "Prayer in Ramadan", titleArabic: "كتاب الصلاة فى رمضان" },
  { titleEnglish: "Tahajjud", titleArabic: "كتاب صلاة الليل" },
  { titleEnglish: "Prayer in Congregation", titleArabic: "كتاب صلاة الجماعة" },
  { titleEnglish: "Shortening the Prayer", titleArabic: "كتاب قصر الصلاة فى السفر" },
  { titleEnglish: "The Two 'Ids", titleArabic: "كتاب العيدين" },
  { titleEnglish: "The Fear Prayer", titleArabic: "كتاب صلاة الخوف" },
  { titleEnglish: "The Eclipse Prayer", titleArabic: "كتاب صلاة الكسوف" },
  { titleEnglish: "Asking for Rain", titleArabic: "كتاب الاستسقاء" },
  { titleEnglish: "The Qibla", titleArabic: "كتاب القبلة" },
  { titleEnglish: "The Qur'an", titleArabic: "كتاب القرآن" },
  { titleEnglish: "Burials", titleArabic: "كتاب الجنائز" },
  { titleEnglish: "Zakat", titleArabic: "كتاب الزكاة" },
  { titleEnglish: "Fasting", titleArabic: "كتاب الصيام" },
  { titleEnglish: "I'tikaf in Ramadan", titleArabic: "كتاب الاعتكاف" },
  { titleEnglish: "Hajj", titleArabic: "كتاب الحج" },
  { titleEnglish: "Jihad", titleArabic: "كتاب الجهاد" },
  { titleEnglish: "Vows and Oaths", titleArabic: "كتاب النذور والأيمان" },
  { titleEnglish: "Sacrificial Animals", titleArabic: "كتاب الضحايا" },
  { titleEnglish: "Slaughtering Animals", titleArabic: "كتاب الذبائح" },
  { titleEnglish: "Game", titleArabic: "كتاب الصيد" },
  { titleEnglish: "The 'Aqiqa", titleArabic: "كتاب العقيقة" },
  { titleEnglish: "Fara'id", titleArabic: "كتاب الفرائض" },
  { titleEnglish: "Marriage", titleArabic: "كتاب النكاح" },
  { titleEnglish: "Divorce", titleArabic: "كتاب الطلاق" },
  { titleEnglish: "Suckling", titleArabic: "كتاب الرضاع" },
  { titleEnglish: "Business Transactions", titleArabic: "كتاب البيوع" },
  { titleEnglish: "Qirad", titleArabic: "كتاب القراض" },
  { titleEnglish: "Sharecropping", titleArabic: "كتاب المساقاة" },
  { titleEnglish: "Renting Land", titleArabic: "كتاب كراء الأرض" },
  { titleEnglish: "Pre-emption in Property", titleArabic: "كتاب الشفعة" },
  { titleEnglish: "Judgements", titleArabic: "كتاب الأقضية" },
  { titleEnglish: "Wills and Testaments", titleArabic: "كتاب الوصية" },
  { titleEnglish: "Setting Free and Wala'", titleArabic: "كتاب العتق والولاء" },
  { titleEnglish: "The Mukatab", titleArabic: "كتاب المكاتب" },
  { titleEnglish: "The Mudabbar", titleArabic: "كتاب المدبر" },
  { titleEnglish: "Hudud", titleArabic: "كتاب الحدود" },
  { titleEnglish: "Drinks", titleArabic: "كتاب الأشربة" },
  { titleEnglish: "Blood-Money", titleArabic: "كتاب العقول" },
  { titleEnglish: "The Oath of Qasama", titleArabic: "كتاب القسامة" },
  { titleEnglish: "Madina", titleArabic: "كتاب الْمَدِينَةِ" },
  { titleEnglish: "The Decree", titleArabic: "كتاب القدر" },
  { titleEnglish: "Good Character", titleArabic: "كتاب حسن الخلق" },
  { titleEnglish: "Dress", titleArabic: "كتاب اللباس" },
  { titleEnglish: "The Description of the Prophet, may Allah Bless Him and Grant Him Peace", titleArabic: "كتاب صفة النبى صلى الله عليه وسلم" },
  { titleEnglish: "The Evil Eye", titleArabic: "كتاب العين" },
  { titleEnglish: "Hair", titleArabic: "كتاب الشعر" },
  { titleEnglish: "Visions", titleArabic: "كتاب الرؤيا" },
  { titleEnglish: "Greetings", titleArabic: "كتاب السلام" },
  { titleEnglish: "General Subjects", titleArabic: "كتاب الاستئذان" },
  { titleEnglish: "The Oath of Allegiance", titleArabic: "كتاب البيعة" },
  { titleEnglish: "Speech", titleArabic: "كتاب الكلام" },
  { titleEnglish: "Jahannam", titleArabic: "كتاب جهنم" },
  { titleEnglish: "Sadaqa", titleArabic: "كتاب الصدقة" },
  { titleEnglish: "Knowledge", titleArabic: "كتاب العلم" },
  { titleEnglish: "The Supplication of the Unjustly Wronged", titleArabic: "كتاب دعوة المظلوم" },
  { titleEnglish: "The Names of the Prophet, may Allah Bless Him and Grant Him Peace", titleArabic: "كتاب أسماء النبى صلى الله عليه وسلم" },
];

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

export default Malik;
