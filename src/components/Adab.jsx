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


const Adab = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Scheherazade_400Regular,
    Scheherazade_700Bold
  });

  const { data: metadata, isLoading } = useQuery({
    queryKey: ['majahMetadata'],
    queryFn: async () => {
      const response = await fetch('https://cdn.jsdelivr.net/gh/aashif000/DB-for-Q-H@main/aladab_almufrad/1.json');
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
          <Text style={styles.titleArabic}>الأدب المفرد</Text>
          <Text style={styles.titleEnglish}>Al-Adab al-Mufrad
          </Text>
          <Text style={styles.description}>
          
          Al-Adab al-Mufrad (Arabic: الأدب المفرد) is a topical book of hadiths collected by Muhammad al-Bukhari addressing the question of perfecting Muslim manners.
          </Text>
        </View>

        {/* Chapters Grid */}
        <View style={styles.chaptersGrid}>
          {Array.from({ length: 37 }, (_, i) => i + 1).map((chapter) => (
            <TouchableOpacity
              key={chapter}
              style={styles.chapterCard}
              onPress={() => navigation.navigate('AdabDetails', { chapterId: chapter })}
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
    1: "Parents",
    2: "Ties of Kinship",
    3: "Mawlas (Clients of Manumission)",
    4: "Looking after girls",
    5: "Looking after children",
    6: "Neighbours",
    7: "Generosity and Orphans",
    8: "Children's Death",
    9: "Being a master",
    10: "Supervision",
    11: "Good Conduct",
    12: "Cheerfulness Towards People",
    13: "Consultation",
    14: "Excellence in Character",
    15: "Cursing",
    16: "Praise",
    17: "Visitation",
    18: "The Elderly",
    19: "Children",
    20: "Mercy",
    21: "Social Behaviour",
    22: "Abandonment",
    23: "Advising",
    24: "Disparaging",
    25: "Extravagance in Building",
    26: "Compassion",
    27: "Attending to this world",
    28: "Injustice",
    29: "Visiting the Ill",
    30: "General Behavior",
    31: "Supplication",
    32: "Guests and Spending",
    33: "Sayings",
    34: "Names",
    35: "Kunyas",
    36: "Poetry",
    37: "Words",
    38: "Consequences",
    39: "Omens",
    40: "Sneezing and Yawning",
    41: "Gestures",
    42: "Greetings",
    43: "Asking Permission",
    44: "The People of the Book",
    45: "Letters",
    46: "Gatherings",
    47: "Behaviour with people",
    48: "Sitting and lying down",
    49: "Mornings and evenings",
    50: "Sleep and night lodging",
    51: "Animals",
    52: "Midday Naps",
    53: "Circumcision",
    54: "Betting and similar pastimes",
    55: "Recognition",
    56: "Meddling and Harshness",
    57: "Anger"
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

export default Adab;