import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useFonts, Scheherazade_400Regular, Scheherazade_700Bold } from '@expo-google-fonts/scheherazade';

const Muhammadiyah = ({ navigation }) => {
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
          <Text style={styles.titleArabic}>الشمائل المحمدية</Text>
          <Text style={styles.titleEnglish}>Ash-Shama'il Al-Muhammadiyah</Text>
          <Text style={styles.description}>
            Ash-Shama'il Al-Muhammadiyah is a collection of the noble features and characteristics of the Prophet Muhammad (PBUH). It contains detailed descriptions of his appearance, mannerisms, and virtues.
          </Text>
        </View>

        {/* Chapters Grid */}
        <View style={styles.chaptersGrid}>
          {chapters.map((chapter, index) => (
            <TouchableOpacity
              key={index}
              style={styles.chapterCard}
              onPress={() => navigation.navigate('MuhammadiyahDetails', { chapterId: index + 1 })}
            >
              <Text style={styles.chapterNumber}>{index + 1}</Text>
              <Text style={styles.chapterTitleEnglish}>
                {chapter.titleEnglish}
              </Text>
              <Text style={styles.chapterTitleArabic}>
                {chapter.titleArabic}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Hardcoded chapters array with both English and Arabic titles
const chapters = [
  { titleEnglish: "The Noble Features Of Rasoolullah", titleArabic: "باب ما جاء في خلق رسول الله صلى الله عليه وسلم" },
  { titleEnglish: "Seal Of Nubuwwah (Prophethood) Of Rasoolullah", titleArabic: "باب ما جاء في خاتم النبوة" },
  { titleEnglish: "The Mubarak Hair Of Rasoolullah", titleArabic: "باب ما جاء في شعر رسول الله صلى الله عليه وسلم" },
  { titleEnglish: "The Combing Of The Hair Of Rasoolullah", titleArabic: "باب ما جاء في ترجل رسول الله صلى الله عليه وسلم" },
  { titleEnglish: "Appearing Of The White Hair Of Rasoolullah", titleArabic: "باب ما جاء في شيب رسول الله صلى الله عليه وسلم" },
  { titleEnglish: "Rasoolullah Using a Dye", titleArabic: "باب ما جاء في خضاب رسول الله صلى الله عليه وسلم" },
  { titleEnglish: "Kuhl Of Rasoolullah", titleArabic: "باب ما جاء في كُحل رسول الله صلى الله عليه وسلم" },
  { titleEnglish: "The Dressing Of Rasoolullah", titleArabic: "باب ما جاء في لباس رسول الله صلى الله عليه وسلم" },
  { titleEnglish: "The Khuff (Leather Socks) Of Rasoolullah", titleArabic: "باب ما جاء في خف رسول الله صلى الله عليه وسلم" },
  { titleEnglish: "The Shoes Of Rasoolullah", titleArabic: "باب ما جاء في نعل رسول الله صلى الله عليه وسلم" },
  { titleEnglish: "The Mubarak Ring Of Rasoolullah", titleArabic: "باب ما جاء في ذكر خاتم رسول الله صلى الله عليه وسلم" },
  { titleEnglish: "The Sword Of Rasoolullah", titleArabic: "باب ما جاء في صفة سَيْفِ رَسُولِ اللهِ صلى الله عليه وسلم" },
  { titleEnglish: "The Armor Of Rasoolullah", titleArabic: "باب ما جاء في صفة درع رَسُولِ اللهِ صلى الله عليه وسلم" },
  { titleEnglish: "The Helmet Of Rasoolullah", titleArabic: "باب ما جاء في صفة مغفر رسول الله صلى الله عليه وسلم" },
  { titleEnglish: "The Turban Of Rasoolullah", titleArabic: "باب ما جاء في عمامة رسول الله صلى الله عليه وسلم" },
  { titleEnglish: "The Lungi Of Rasoolullah", titleArabic: "باب ما جاء في صفة إزار رسول الله صلى الله عليه وسلم" },
  { titleEnglish: "The Walking Of Rasoolullah", titleArabic: "باب ما جاء في مشية رسول الله صلى الله عليه وسلم" },
  { titleEnglish: "The Qinaa Of Rasoolullah", titleArabic: "باب ما جاء في تقنع رسول الله صلى الله عليه وسلم" },
  { titleEnglish: "The Sitting Of Rasoolullah", titleArabic: "باب ما جاء في جلسته صلى الله عليه وسلم" },
  { titleEnglish: "The Pillow Of Rasoolullah", titleArabic: "باب ما جاء في تكأة رسول الله صلى الله عليه وسلم" },
  { titleEnglish: "Rasoolullah Leaning On Something Other Than a Pillow", titleArabic: "باب ما جاء في اتكاء رسول الله صلى الله عليه وسلم" },
  { titleEnglish: "Description Of The Eating Of Rasoolullah", titleArabic: "باب ما جاء في أكل رسول الله صلى الله عليه وسلم" }
  // Add more chapters as required...
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

export default Muhammadiyah;
