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
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

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

interface WeatherDetailProps {
  icon: string;
  label: string;
  value: string;
}

interface ForecastCardProps {
  day: string;
  temp: string;
  icon: string;
}

const API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY || '';

const WeatherScreen = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<any[]>([]); // Store 5-day forecast data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric'); // Celsius or Fahrenheit
  const scale = useSharedValue(1);

  const handleSearch = async () => {
    if (!location.trim()) return;
    Keyboard.dismiss();
    setLoading(true);
    setError('');

    try {
      const finalApi = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=${unit}`;
      const response = await axios.get(finalApi);
      
      setWeather(response.data);
            // Fetch 5-day forecast
            const forecastData = await getForecastTemp(location, 'metric');
            setForecast(forecastData);
      setLoading(false);
    } catch (err) {
      setError('Location not found. Try again!');
      setLoading(false);
      setWeather(null);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    if (weather) handleSearch(); // Refresh weather with new unit
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    if (weather) {
      scale.value = withSpring(1.05, { duration: 300 }); // Subtle spring animation
    }
  }, [weather]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.rootContainer}>
        <LinearGradient
          colors={
            weather?.weather?.[0]?.main
              ? getBackgroundColors(weather.weather[0].main)
              : ['#2C3E50', '#4CA1AF']
          }
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Enter a city..."
              placeholderTextColor="#A0A0A0"
              value={location}
              onChangeText={setLocation}
              onSubmitEditing={handleSearch}
              autoCorrect={false}
              clearButtonMode="always"
            />
            <TouchableOpacity onPress={handleSearch} style={styles.searchButton} disabled={loading}>
              <Icon name="magnify" size={26} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Unit Toggle */}
          <TouchableOpacity onPress={toggleUnit} style={styles.unitToggle}>
            <Text style={styles.unitText}>{unit === 'metric' ? '°C' : '°F'}</Text>
          </TouchableOpacity>

          {/* Loading State */}
          {loading && (
            <Animated.View entering={FadeIn} style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Loading weather...</Text>
            </Animated.View>
          )}

          {/* Error State */}
          {error && (
            <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.errorContainer}>
              <Icon name="alert-circle-outline" size={40} color="#FF6B6B" />
              <Text style={styles.errorText}>{error}</Text>
            </Animated.View>
          )}

          {/* Weather Display */}
          {weather && (
            <Animated.ScrollView
              contentContainerStyle={styles.weatherContainer}
              entering={FadeInDown.delay(100)}
              showsVerticalScrollIndicator={false}
            >
              {/* Current Weather */}
              <Animated.View style={[styles.currentWeather, animatedStyle]}>
                <Text style={styles.city}>{weather.name}</Text>
                <Text style={styles.temp}>
                  {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
                </Text>
                <Icon
                  name={getWeatherIcon(weather.weather[0].main)}
                  size={100}
                  color="#fff"
                />
                <Text style={styles.description}>{weather.weather[0].description}</Text>
              </Animated.View>

              {/* Details Section */}
              <View style={styles.detailsContainer}>
                <WeatherDetail
                  icon="weather-windy"
                  label="Wind"
                  value={`${weather.wind.speed} ${unit === 'metric' ? 'm/s' : 'mph'}`}
                />
                <WeatherDetail
                  icon="water-outline"
                  label="Humidity"
                  value={`${weather.main.humidity}%`}
                />
                <WeatherDetail
                  icon="gauge"
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
                {forecast.map((item, index) => (
                  <ForecastCard
                    key={index}
                    day={item.day}
                    temp={`${item.temp}°C`}
                    icon={item.icon}
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
    <Icon name={icon} size={28} color="#fff" />
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const ForecastCard: React.FC<ForecastCardProps> = ({ day, temp, icon }) => (
  <View style={styles.forecastCard}>
    <Text style={styles.forecastDay}>{day}</Text>
    <Icon name={icon} size={36} color="#fff" />
    <Text style={styles.forecastTemp}>{temp}°</Text>
  </View>
);

// Utility Functions
const getWeatherIcon = (condition: string): string => {
  switch (condition.toLowerCase()) {
    case 'clear': return 'weather-sunny';
    case 'rain': return 'weather-rainy';
    case 'clouds': return 'weather-cloudy';
    case 'snow': return 'weather-snowy';
    default: return 'weather-partly-cloudy';
  }
};

const getDay = (offset: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return offset === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
};

// const getForecastTemp = (offset: number): number => {
//   // Dummy data; replace with real 5-day forecast API
//   return Math.floor(Math.random() * 10 + 20);
// };

const getForecastTemp = async (location: string, unit: 'metric' | 'imperial') => {
  try {
    const finalApi = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=${unit}`;
    const response = await axios.get(finalApi);
    const forecastData = response.data.list;

    // Group forecast data by day
    const dailyForecast: { [key: string]: { temp: number; icon: string } } = {};

    forecastData.forEach((item: any) => {
      const date = new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' });
      if (!dailyForecast[date]) {
        dailyForecast[date] = {
          temp: item.main.temp,
          icon: item.weather[0].main,
        };
      }
    });

    // Return first 5 days of forecast
    return Object.entries(dailyForecast)
      .slice(0, 5)
      .map(([day, data]: [string, { temp: number; icon: string }]) => ({
        day,
        temp: Math.round(data.temp),
        icon: getWeatherIcon(data.icon),
      }));
  } catch (error) {
    console.error("Error fetching 5-day forecast:", error);
    return [];
  }
};

const getBackgroundColors = (weatherMain: string): [string, string] => {
  switch (weatherMain.toLowerCase()) {
    case 'clear': return ['#74B9FF', '#A3DFFA'];
    case 'clouds': return ['#636E72', '#B2BEC3'];
    case 'rain': return ['#2D3436', '#636E72'];
    case 'snow': return ['#DFE6E9', '#F1F2F6'];
    default: return ['#2C3E50', '#4CA1AF'];
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
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  searchButton: {
    padding: 12,
    backgroundColor: '#0984E3',
    borderRadius: 10,
  },
  unitToggle: {
    alignSelf: 'flex-end',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    marginBottom: 20,
  },
  unitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  weatherContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  currentWeather: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
  },
  city: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
  },
  temp: {
    color: '#fff',
    fontSize: 72,
    fontWeight: '200',
    marginBottom: 10,
  },
  description: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'capitalize',
    opacity: 0.9,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  detailCard: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    width: '30%',
  },
  detailLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    opacity: 0.8,
  },
  detailValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  forecastContainer: {
    width: '100%',
  },
  forecastTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  forecastScrollView: {
    paddingVertical: 10,
  },
  forecastCard: {
    width: 100,
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    marginHorizontal: 8,
  },
  forecastDay: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    opacity: 0.8,
  },
  forecastTemp: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default WeatherScreen;