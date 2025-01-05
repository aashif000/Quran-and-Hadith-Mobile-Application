import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

// Import Nasai and Mishkat
import Nasai from './src/components/Nasai';
import NasaiDetails from './src/components/NasaiDetails';
import Majah from './src/components/Majah'
import MajahDetails from './src/components/MajahDetails';
import Darmini from './src/components/Darmini';
import DarminiDetails from './src/components/DarminiDetails';
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


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const queryClient = new QueryClient();

// Home Screen
const HomeScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Welcome to the Quran App!</Text>
  </View>
);

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

function MuhammadiyahStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Muhammadiyah" component={Muhammadiyah} options={{ headerShown: false }} />
      <Stack.Screen name="ChapterDetails" component={ChapterDetails} />
    </Stack.Navigator>
  );
}

function BukhariStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bukhari" component={Bukhari} options={{ headerShown: false }} />
      <Stack.Screen name="ChapterDetails" component={ChapterDetails} />
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
      <Stack.Screen name="ChapterDetails" component={ChapterDetails} />
    </Stack.Navigator>
  );
}
 
function MuslimStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Muslim" component={Muslim} options={{ headerShown: false }} />
      <Stack.Screen name="ChapterDetails" component={ChapterDetails} />
    </Stack.Navigator>
  );
}

function AbuStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Abu Dawud" component={Abu} options={{ headerShown: false }} />
      <Stack.Screen name="ChapterDetails" component={ChapterDetails} />
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

function DarimniStackNavigator() {
  return (
<Stack.Navigator 
          initialRouteName="Darmini"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Darmini" component={Darmini} />
          <Stack.Screen name="DarminiDetails" component={DarminiDetails} />
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

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Complete Quran" component={CompleteQuran} />
          <Drawer.Screen name="Ayah Search" component={AyahView} />
          <Drawer.Screen name="Hizb Quarters" component={HizbView} />
          <Drawer.Screen name="Juz " component={JuzView} />
          <Drawer.Screen name="Surahs" component={Surahs} />
          <Drawer.Screen name="Rukus" component={RukuView} />
          <Drawer.Screen name="Page Search" component={PageView} />
          <Drawer.Screen name="Listen Quran" component={AudioPlayer} />
          <Drawer.Screen name="Sahih al-Bukhari" component={BukhariStackNavigator} options={{ headerShown: false }} />
          <Drawer.Screen name="Sahih Muslim" component={MuslimStackNavigator} options={{ headerShown: false }} />
          <Drawer.Screen name="Sunan al-Tirmidhi" component={TrimidhiStackNavigator} options={{ headerShown: false }} />
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
          <Drawer.Screen name="Sunan ad-Darimi" component={DarimniStackNavigator} options={{ headerShown: false }} />
          <Drawer.Screen name="Al-Adab Al-Mufrad" component={AdabStackNavigator} options={{ headerShown: false }} />
          <Drawer.Screen name="Riyad as-Salihin" component={RiyadStackNavigator} options={{ headerShown: false }} />
          <Drawer.Screen name="Al-Nawawi's Forty Hadith" component={NawawiStackNavigator} options={{ headerShown: false }} />
          <Drawer.Screen name="Forty Hadith Qudsi" component={QudsiStackNavigator} options={{ headerShown: false }} />
        
       </Drawer.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
