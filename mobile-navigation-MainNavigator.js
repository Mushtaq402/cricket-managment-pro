import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/home/HomeScreen';
import TournamentsScreen from '../screens/tournaments/TournamentsScreen';
import TournamentDetailScreen from '../screens/tournaments/TournamentDetailScreen';
import PlayersScreen from '../screens/players/PlayersScreen';
import PlayerDetailScreen from '../screens/players/PlayerDetailScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import MatchDetailScreen from '../screens/matches/MatchDetailScreen';
import LiveScoringScreen from '../screens/matches/LiveScoringScreen';
import StreamingScreen from '../screens/streaming/StreamingScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="HomeStack" 
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="MatchDetail" 
        component={MatchDetailScreen}
        options={{
          title: 'Match Details',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="LiveScoring" 
        component={LiveScoringScreen}
        options={{
          title: 'Live Scoring',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="Streaming" 
        component={StreamingScreen}
        options={{
          title: 'Live Stream',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
}

function TournamentsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="TournamentsStack" 
        component={TournamentsScreen}
        options={{
          headerTitle: 'Tournaments',
        }}
      />
      <Stack.Screen 
        name="TournamentDetail" 
        component={TournamentDetailScreen}
        options={{
          title: 'Tournament Details',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
}

function PlayersStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="PlayersStack" 
        component={PlayersScreen}
        options={{
          headerTitle: 'Players',
        }}
      />
      <Stack.Screen 
        name="PlayerDetail" 
        component={PlayerDetailScreen}
        options={{
          title: 'Player Profile',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="ProfileStack" 
        component={ProfileScreen}
        options={{
          headerTitle: 'My Profile',
        }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent = Ionicons;
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Tournaments':
              iconName = focused ? 'trophy' : 'trophy-outline';
              break;
            case 'Players':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'question';
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: '#999999',
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Tournaments" 
        component={TournamentsStackNavigator}
        options={{
          tabBarLabel: 'Tournaments',
        }}
      />
      <Tab.Screen 
        name="Players" 
        component={PlayersStackNavigator}
        options={{
          tabBarLabel: 'Players',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}
