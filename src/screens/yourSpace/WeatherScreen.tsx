import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  Platform,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { 
  FadeIn, 
  FadeInDown, 
  FadeOut, 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming 
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

const API_KEY = process.env.OPEN_WEATHER_API_KEY; // Replace with your API key

const WeatherScreen = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const scale = useSharedValue<number>(1);

  const handleSearch = async () => {
    if (!location) return;
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data as WeatherData);
      setLoading(false);
    } catch (err) {
      setError('Location not found');
      setLoading(false);
      setWeather(null);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  useEffect(() => {
    if (weather) {
      scale.value = withTiming(1.1, { duration: 1000 });
    }
  }, [weather]);

  return (
    <LinearGradient 
      colors={weather?.weather[0]?.main 
        ? getBackgroundColors(weather.weather[0].main) 
        : ['#000033', '#000066']}
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
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
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
        >
          {/* Current Weather */}
          <Animated.View 
            style={[styles.currentWeather, animatedStyle]}
          >
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
  switch(condition) {
    case 'Clear': return 'weather-sunny';
    case 'Rain': return 'weather-rainy';
    case 'Clouds': return 'weather-cloudy';
    default: return 'weather-partly-cloudy';
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

const getBackgroundColors = (condition: string): string[] => {
  const colors: { [key: string]: string[] } = {
    Clear: ['#FFD700', '#FFA500'],
    Rain: ['#1E90FF', '#00BFFF'],
    Clouds: ['#A9A9A9', '#696969'],
  };
  return colors[condition] || ['#000033', '#000066'];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  searchContainer: {
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    position: 'relative',
  },
  searchInput: {
    flex: 1,
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#00BFFF',
  },
  searchButton: {
    position: 'absolute',
    right: 0,
    padding: 15,
    backgroundColor: '#00BFFF',
    borderRadius: 15,
    marginRight: 20,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#00BFFF',
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  weatherContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  currentWeather: {
    alignItems: 'center',
    marginBottom: 30,
  },
  city: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  temp: {
    fontSize: 80,
    fontWeight: '900',
    color: '#00BFFF',
    marginVertical: 10,
  },
  description: {
    fontSize: 20,
    color: '#fff',
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
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    width: 100,
  },
  detailLabel: {
    color: '#888',
    fontSize: 14,
    marginTop: 10,
  },
  detailValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  forecastContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  forecastTitle: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 15,
    marginLeft: 20,
  },
  forecastScrollView: {
    paddingHorizontal: 10,
  },
  forecastCard: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    marginRight: 15,
    minWidth: 120,
  },
  forecastDay: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  forecastTemp: {
    color: '#00BFFF',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default WeatherScreen;