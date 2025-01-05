import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const Nasai = ({ navigation }) => {
  // Hardcoded chapter names and their corresponding hadith range
  const chapters = [
    { id: 1, name: 'The Book of Purification', range: '1 to 325' },
    { id: 2, name: 'The Book of Water', range: '326 to 349' },
    { id: 3, name: 'The Book of Menstruation and Istihadah', range: '350 to 397' },
    { id: 4, name: 'The Book of Ghusl and Tayammum', range: '398 to 451' },
    { id: 5, name: 'The Book of Salah', range: '452 to 498' },
    { id: 6, name: 'The Book of the Times (of Prayer)', range: '499 to 631' },
    { id: 7, name: 'The Book of the Adhan (The Call to Prayer)', range: '632 to 694' },
    { id: 8, name: 'The Book of the Masjids', range: '695 to 748' },
    { id: 9, name: 'The Book of the Qiblah', range: '749 to 785' },
    { id: 10, name: 'The Book of Leading the Prayer (Al-Imamah)', range: '786 to 885' },
    { id: 11, name: 'The Book of the Commencement of the Prayer', range: '886 to 1039' },
    { id: 12, name: 'The Book of The At-Tatbiq (Clasping One\'s Hands Together)', range: '1040 to 1190' },
    { id: 13, name: 'The Book of Forgetfulness (In Prayer)', range: '1191 to 1379' },
    { id: 14, name: 'The Book of Jumu\'ah (Friday Prayer)', range: '1380 to 1446' },
    { id: 15, name: 'The Book of Shortening the Prayer When Traveling', range: '1447 to 1473' },
    { id: 16, name: 'The Book of Eclipses', range: '1474 to 1519' },
    { id: 17, name: 'The Book of Praying for Rain (Al-Istisqa\')', range: '1520 to 1545' },
    { id: 18, name: 'The Book of the Fear Prayer', range: '1546 to 1573' },
    { id: 19, name: 'The Book of the Prayer for the Two \'Eids', range: '1574 to 1616' },
    { id: 20, name: 'The Book of Qiyam Al-Lail (The Night Prayer) and Voluntary Prayers During the Day', range: '1617 to 1837' },
    { id: 21, name: 'The Book of Funerals', range: '1838 to 2111' },
    { id: 22, name: 'The Book of Fasting', range: '2112 to 2457' },
    { id: 23, name: 'The Book of Zakah', range: '2458 to 2641' },
    { id: 24, name: 'The Book of Hajj', range: '2642 to 3109' },
    { id: 25, name: 'The Book of Jihad', range: '3110 to 3221' },
    { id: 26, name: 'The Book of Marriage', range: '3222 to 3415' },
    { id: 27, name: 'The Book of the Kind Treatment of Women', range: '3416 to 3443' },
    { id: 28, name: 'The Book of Divorce', range: '3444 to 3617' },
    { id: 29, name: 'The Book of Horses, Races and Shooting', range: '3618 to 3651' },
    { id: 30, name: 'The Book of Endowments', range: '3652 to 3669' },
    { id: 31, name: 'The Book of Wills', range: '3670 to 3731' },
    { id: 32, name: 'The Book of Gifts', range: '3732 to 3748' },
    { id: 33, name: 'The Book of Gifts (Hiba)', range: '3749 to 3767' },
    { id: 34, name: 'The Book of ar-Ruqba', range: '3768 to 3782' },
    { id: 35, name: 'The Book of \'Umra', range: '3783 to 3825' },
    { id: 36, name: 'The Book of Oaths and Vows', range: '3826 to 3922' },
    { id: 37, name: 'The Book of Fighting [The Prohibition of Bloodshed]', range: '3923 to 4006' },
    { id: 39, name: 'The Book Of The Distribution Of Al-Fay\'', range: '4007 to 4023' },
    { id: 40, name: 'The Book of al-Bay\'ah', range: '4024 to 4087' },
    { id: 41, name: 'Kitab ul Aqeeqa', range: '4088 to 4098' },
    { id: 42, name: 'The Book of al-Fara\' and al-\'Atirah', range: '4099 to 4140' },
    { id: 43, name: 'The Book of Hunting and Slaughtering', range: '4141 to 4239' },
    { id: 44, name: 'The Book of ad-Dahaya (Sacrifices)', range: '4240 to 4328' },
    { id: 45, name: 'The Book of Financial Transactions', range: '4329 to 4585' },
    { id: 46, name: 'The Book of Oaths (qasamah), Retaliation and Blood Money', range: '4586 to 4750' },
    { id: 47, name: 'The Book of Cutting off the Hand of the Thief', range: '4751 to 4866' },
    { id: 48, name: 'The Book Of Faith and its Signs', range: '4867 to 4921' },
    { id: 49, name: 'The Book of Adornment', range: '4922 to 5106' },
    { id: 50, name: 'The Book of Adornment (Minal Mujtaba)', range: '5107 to 5261' },
    { id: 51, name: 'The Book of Seeking Refuge with Allah', range: '5262 to 5423' },
    { id: 52, name: 'The Book of Drinks', range: '5424 onwards' }
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('NasaiDetails', { 
        chapterId: item.id,
        chapterName: item.name 
      })}
    >
      <Text style={styles.cardText}>{item.name}</Text>
      <Text style={styles.rangeText}>Hadith {item.range}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chapters}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Sunan an-Nasai</Text>
            <Text style={styles.subHeader}>Sunan an-Nasa'i is a collection of hadith compiled by Imam Ahmad an-Nasa'i (rahimahullah). His collection is unanimously considered to be one of the six canonical collections of hadith (Kutub as-Sittah) of the Sunnah of the Prophet (ﷺ). It contains roughly 5700 hadith (with repetitions) in 52 books.</Text>
          </View>
        }
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
  },
  subHeader: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 5,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    color: '#2c3e50',
    fontWeight: '600',
  },
  rangeText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 8,
  },
});

export default Nasai;