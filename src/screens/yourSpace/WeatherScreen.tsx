import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient'; // Changed import
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// Define weather data types
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

// Component props types
interface WeatherDetailProps {
  icon: string;
  label: string;
  value: string;
}

interface ForecastCardProps {
  day: string;
  temp: string;
}

const API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY; // Updated for Expo

const WeatherScreen = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const scale = useSharedValue<number>(1);

  const handleSearch = async () => {
    if (!location.trim()) return;
    Keyboard.dismiss(); // Added keyboard dismissal
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          location
        )}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setLoading(false);
    } catch (err) {
      setError('Location not found');
      setLoading(false);
      setWeather(null);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    if (weather) {
      scale.value = withTiming(1.1, { duration: 1000 });
    }
  }, [weather]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.rootContainer}>
        <LinearGradient
          colors={
            weather?.weather?.[0]?.main
              ? getBackgroundColors(weather.weather[0].main)
              : ['#000033', '#000066']
          }
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Enter location..."
              placeholderTextColor="#888"
              value={location}
              onChangeText={setLocation}
              onSubmitEditing={handleSearch}
              autoCorrect={false}
              clearButtonMode="always"
            />
            <TouchableOpacity
              onPress={handleSearch}
              style={styles.searchButton}
              disabled={loading}
            >
              <Icon name="magnify" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Loading State */}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#00BFFF" />
              <Text style={styles.loadingText}>Fetching weather data...</Text>
            </View>
          )}

          {/* Error State */}
          {error && (
            <Animated.View
              style={styles.errorContainer}
              entering={FadeIn}
              exiting={FadeOut}
            >
              <Icon name="alert-circle" size={40} color="#ff4444" />
              <Text style={styles.errorText}>{error}</Text>
            </Animated.View>
          )}

          {/* Weather Display */}
          {weather && (
            <Animated.ScrollView
              contentContainerStyle={styles.weatherContainer}
              entering={FadeInDown}
              showsVerticalScrollIndicator={false}
            >
              {/* Current Weather */}
              <Animated.View style={[styles.currentWeather, animatedStyle]}>
                <Text style={styles.city}>{weather.name}</Text>
                <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
                <Icon
                  name={getWeatherIcon(weather.weather[0].main)}
                  size={120}
                  color="#00BFFF"
                />
                <Text style={styles.description}>
                  {weather.weather[0].description}
                </Text>
              </Animated.View>

              {/* Details Section */}
              <View style={styles.detailsContainer}>
                <WeatherDetail
                  icon="speedometer"
                  label="Wind"
                  value={`${weather.wind.speed} m/s`}
                />
                <WeatherDetail
                  icon="water"
                  label="Humidity"
                  value={`${weather.main.humidity}%`}
                />
                <WeatherDetail
                  icon="speedometer-slow"
                  label="Pressure"
                  value={`${weather.main.pressure} hPa`}
                />
              </View>

              {/* 5-Day Forecast */}
              <View style={styles.forecastContainer}>
                <Text style={styles.forecastTitle}>5-Day Forecast</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.forecastScrollView}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <ForecastCard
                      key={index}
                      day={getDay(index)}
                      temp={getForecastTemp(index).toString()}
                    />
                  ))}
                </ScrollView>
              </View>
            </Animated.ScrollView>
          )}
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  );
};

// Helper Components
const WeatherDetail: React.FC<WeatherDetailProps> = ({ icon, label, value }) => (
  <View style={styles.detailCard}>
    <Icon name={icon} size={30} color="#00BFFF" />
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const ForecastCard: React.FC<ForecastCardProps> = ({ day, temp }) => (
  <View style={styles.forecastCard}>
    <Text style={styles.forecastDay}>{day}</Text>
    <Icon name="weather-cloudy" size={40} color="#00BFFF" />
    <Text style={styles.forecastTemp}>{temp}°C</Text>
  </View>
);

// Helper Functions
const getWeatherIcon = (condition: string): string => {
  switch (condition) {
    case 'Clear':
      return 'weather-sunny';
    case 'Rain':
      return 'weather-rainy';
    case 'Clouds':
      return 'weather-cloudy';
    default:
      return 'weather-partly-cloudy';
  }
};

const getDay = (offset: number): string => {
  const days = ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'];
  return days[offset];
};

const getForecastTemp = (offset: number): number => {
  // Dummy data - replace with real API call for 5-day forecast
  return Math.floor(Math.random() * 10 + 20);
};

const getBackgroundColors = (weatherMain: string): [string, string, ...string[]] => {
  switch (weatherMain) {
    case 'Clear':
      return ['#87CEEB', '#FFD700']; // Example colors
    case 'Clouds':
      return ['#A9A9A9', '#D3D3D3'];
    default:
      return ['#000033', '#000066'];
  }
};

// Styles
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    paddingBottom: 20,
    minHeight: '100%', // Added for proper layout
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: '#00BFFF',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchButton: {
    position: 'absolute',
    right: 0,
    padding: 10,
    backgroundColor: '#00BFFF',
    borderRadius: 25,
    margin: 5,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '500',
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  weatherContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  currentWeather: {
    alignItems: 'center',
    marginBottom: 30,
  },
  city: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  temp: {
    color: '#fff',
    fontSize: 64,
    fontWeight: '300',
    marginBottom: 16,
  },
  description: {
    color: '#d0d0d0',
    fontSize: 18,
    marginBottom: 24,
    textTransform: 'capitalize',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  detailCard: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
  },
  detailLabel: {
    color: '#d0d0d0',
    fontSize: 16,
    marginTop: 8,
    fontWeight: '500',
  },
  detailValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forecastContainer: {
    width: '100%',
    marginTop: 20,
  },
  forecastTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  forecastScrollView: {
    alignItems: 'center',
  },
  forecastCard: {
    width: 120,
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    marginHorizontal: 8,
  },
  forecastDay: {
    color: '#d0d0d0',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  forecastTemp: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default WeatherScreen; // Ensure this is exported