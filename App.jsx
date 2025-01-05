import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

// Import your screens and components
import CompleteQuran from './src/components/CompleteQuran';
import AyahView from './src/components/AyahView';
import HizbView from './src/components/HizbView';
import { JuzView } from './src/components/JuzView';
import { Surahs } from './src/components/Surahs';
import RukuView from './src/components/RukuView';
import PageView from './src/components/PageView';
import AudioPlayer from './src/components/Audio';

import Bukhari from './src/components/Bukhari';
import ChapterDetails from './src/components/ChapterDetails';
import Trimidhi from './src/components/Trimidhi';
import Muslim from './src/components/Muslim';
import Muhammadiyah from './src/components/Muhammadiyah';
import Shahwaliullah40 from './src/components/Shahwaliullah40';
import HadithDetails from './src/components/HadithDetails';
import Abu from './src/components/Abu';
import Malik from './src/components/Malik';
import MalikDetails from './src/components/MalikDetails';
import Nasai from './src/components/Nasai';
import NasaiDetails from './src/components/NasaiDetails';
import Majah from './src/components/Majah';
import MajahDetails from './src/components/MajahDetails';
import Darimi from './src/components/Darimi';
import DarimiDetails from './src/components/DarimiDetails';
import Adab from './src/components/Adab';
import AdabDetails from './src/components/AdabDetails';
import Ahmed from './src/components/Ahmed';
import AhmedDetails from './src/components/AhmedDetails';
import RiyadDetails from './src/components/RiyadDetails';
import Riyad from './src/components/Riyad';
import Nawawi from './src/components/Nawawi';
import NawawiDetails from './src/components/NawawiDetails';
import Qudsi from './src/components/Qudsi';
import QudsiDetails from './src/components/QudsiDetails';
import AbuDetails from './src/components/AbuDetails';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const queryClient = new QueryClient(); 

import { SafeAreaView } from 'react-native-safe-area-context';

// Home Screen
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.arabicText}>السَّلامُ عَلَيْكُمْ</Text>
        <Text style={styles.transliteration}>(As-salaam-alaikum)</Text>

        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>
            Welcome to the IslamHub!
          </Text>

          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>Collection of Quran and all</Text>
            <Text style={styles.messageText}>I am Aashif</Text>
            <Text style={styles.messageText}>This is completely Free App</Text>
            <Text style={styles.messageText}>
              Please don't pay anywhere{'\n'}to use this app
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};


import BukhariDetails from './src/components/BukhariDetails';

// Stack Navigator for Bukhari
function BukhariStackNavigator() {
  return (
    <Stack.Navigator  >
    <Stack.Screen name="Bukhari" component={Bukhari} />
    <Stack.Screen name="BukhariDetails" component={BukhariDetails} />
  </Stack.Navigator>
  );
}


// Stack Navigator for Nasai
function NasaiStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Nasai">
    <Stack.Screen name="Nasai" component={Nasai} />
    <Stack.Screen name="NasaiDetails" component={NasaiDetails} />
  </Stack.Navigator>
  );
}

// Stack Navigator for Mishkat
function MishkatStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Mishkat" component={Mishkat} options={{ headerShown: false }} />
      <Stack.Screen name="MishkatDetails" component={MishkatDetails} />
    </Stack.Navigator>
  );
}

// Other stack navigators...
function Shahwaliullah40StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Shah Waliullah 40 Hadith"
        component={Shahwaliullah40}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="HadithDetails" component={HadithDetails} />
    </Stack.Navigator>
  );
}
import MuhammadiyahDetails from './src/components/MuhammadiyahDetails';
function MuhammadiyahStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Muhammadiyah" component={Muhammadiyah} options={{ headerShown: false }} />
      <Stack.Screen name="MuhammadiyahDetails" component={MuhammadiyahDetails} />
    </Stack.Navigator>
  );
}
 

function TrimidhiStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Trimidhi" component={Trimidhi} options={{ headerShown: false }} />
      <Stack.Screen name="ChapterDetails" component={ChapterDetails} />
    </Stack.Navigator>
  );
}

function MalikStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Muwatta Malik" component={Malik} options={{ headerShown: false }} />
      <Stack.Screen name="MalikDetails" component={MalikDetails} />
    </Stack.Navigator>
  );
}
  

function AbuStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Abu Dawud" component={Abu} options={{ headerShown: false }} />
      <Stack.Screen name="AbuDetails" component={AbuDetails} />
    </Stack.Navigator>
  );
}

function MajahStackNavigator() {
  return (
<Stack.Navigator 
          initialRouteName="Majah"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Majah" component={Majah} />
          <Stack.Screen name="MajahDetails" component={MajahDetails} />
        </Stack.Navigator>
 );
}

function DarimiStackNavigator() {
  return (
<Stack.Navigator 
          initialRouteName="Darimi"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Darimi" component={Darimi} />
          <Stack.Screen name="DarimiDetails" component={DarimiDetails} />
        </Stack.Navigator>
 );
}


function AdabStackNavigator() {
  return (
<Stack.Navigator 
          initialRouteName="Adab"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Adab" component={Adab} />
          <Stack.Screen name="AdabDetails" component={AdabDetails} />
        </Stack.Navigator>
 );
}

function AhmedStackNavigator() {
  return (
<Stack.Navigator 
          initialRouteName="Ahmed"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Ahmed" component={Ahmed} />
          <Stack.Screen name="AhmedDetails" component={AhmedDetails} />
        </Stack.Navigator>
 );
}


function RiyadStackNavigator() {
  return (
<Stack.Navigator 
          initialRouteName="Riyad"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Riyad" component={Riyad} />
          <Stack.Screen name="RiyadDetails" component={RiyadDetails} />
        </Stack.Navigator>
 );
}

function NawawiStackNavigator() {
  return (
<Stack.Navigator 
          initialRouteName="Nawawi"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Nawawi" component={Nawawi} />
          <Stack.Screen name="NawawiDetails" component={NawawiDetails} />
        </Stack.Navigator>
 );
}
function QudsiStackNavigator() {
  return (
<Stack.Navigator 
          initialRouteName="Qudsi"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Qudsi" component={Qudsi} />
          <Stack.Screen name="QudsiDetails" component={QudsiDetails} />
        </Stack.Navigator>
 );
}

import MuslimDetails from './src/components/MuslimDetails';
function MuslimStackNavigator() {
  return (
<Stack.Navigator 
          initialRouteName="Muslim"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Muslim" component={Muslim} />
          <Stack.Screen name="MuslimDetails" component={MuslimDetails} />
        </Stack.Navigator>
 );
}


// Floating Action Button
const FAB = () => {
  const navigation = useNavigation();

  const handleFabPress = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
      <Icon name="menu" size={30} color="#fff" />
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <View style={{ flex: 1 }}> 
          <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeScreen} />
          
          <Drawer.Screen name="Ayah Search" component={AyahView} />
          <Drawer.Screen name="Hizb Quarters" component={HizbView} />
          <Drawer.Screen name="Juz " component={JuzView} />
          <Drawer.Screen name="Surahs" component={Surahs} />
          <Drawer.Screen name="Rukus" component={RukuView} />
          <Drawer.Screen name="Page Search" component={PageView} />
          <Drawer.Screen name="Listen Quran" component={AudioPlayer} />
          <Drawer.Screen name="Complete Quran" component={CompleteQuran} />
          <Drawer.Screen name="Sahih al-Bukhari" component={BukhariStackNavigator} options={{ headerShown: false }} />
          <Drawer.Screen name="Sahih Muslim" component={MuslimStackNavigator} options={{ headerShown: false }} />
          <Drawer.Screen name="Ash-Shama'il Al-Muhammadiyah" component={MuhammadiyahStackNavigator} options={{ headerShown: false }} />
          <Drawer.Screen
            name="Shah Waliullah 40 Hadith"
            component={Shahwaliullah40StackNavigator}
            options={{ headerShown: false }}
          />
          <Drawer.Screen name="Abu Dawud" component={AbuStackNavigator} options={{ headerShown: false }} />
          <Drawer.Screen name="Muwatta Malik" component={MalikStackNavigator} />
          <Drawer.Screen name="Riyad - Assalihin" component={RiyadStackNavigator} options={{ headerShown: false }}  />
          <Drawer.Screen name="Sunan an-Nasai" component={NasaiStackNavigator} options={{ headerShown: false }} />
          <Drawer.Screen name="Sunan Ibn Majah" component={MajahStackNavigator} options={{ headerShown: false }} />
          <Drawer.Screen name="Sunan ad-Darimi" component={DarimiStackNavigator} options={{ headerShown: false }} />
          <Drawer.Screen name="Al-Adab Al-Mufrad" component={AdabStackNavigator} options={{ headerShown: false }} />
          <Drawer.Screen name="Riyad as-Salihin" component={RiyadStackNavigator} options={{ headerShown: false }} />
          <Drawer.Screen name="Al-Nawawi's Forty Hadith" component={NawawiStackNavigator} options={{ headerShown: false }} />
          <Drawer.Screen name="Forty Hadith Qudsi" component={QudsiStackNavigator} options={{ headerShown: false }} />
        
       </Drawer.Navigator>
          <FAB />
        </View>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({ 
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  arabicText: {
    fontSize: 32,
    color: '#222222',
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '300',
  },
  transliteration: {
    fontSize: 16,
    color: '#8A898C',
    marginBottom: 32,
    textAlign: 'center',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: '#222222',
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '300',
  },
  messageContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 16,
  },
  messageText: {
    fontSize: 18,
    color: '#8A898C',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  }, 
  messageTextA: {
    fontSize: 18,
    fontWeight: 'bold', 
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
    
  },
 
  fab: {
    position: 'absolute',
    bottom: 20,
    right: '45%',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#080a0a',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
