import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconOutline } from '@ant-design/icons-react-native'; // Import Ant Design Icon

const { width, height } = Dimensions.get('window');

// Grid dimensions
const GRID_COLUMNS = 3;
const GRID_ROWS = 4;

// App data
const APPS_LIST = [
  { id: 'notes', name: 'Notes', icon: 'document-text-outline' },
  { id: 'calendar', name: 'Calendar', icon: 'calendar-outline' },
];

type AppIconProps = {
  id: string;
  name: string;
  icon: string;
  position: { x: number; y: number };
  onMove: (id: string, newX: number, newY: number) => void;
};

const AppIcon = ({ id, name, icon, position, onMove }: AppIconProps) => {
  const pan = new Animated.ValueXY({ x: position.x, y: position.y });
  const [isDragging, setIsDragging] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => isDragging, // Only allow dragging if isDragging is true
    onPanResponderMove: (_, gestureState) => {
      pan.setValue({ x: gestureState.dx + position.x, y: gestureState.dy + position.y });
    },
    onPanResponderRelease: (_, gestureState) => {
      const newX = Math.round((gestureState.dx + position.x) / (width / GRID_COLUMNS)) * (width / GRID_COLUMNS);
      const newY = Math.round((gestureState.dy + position.y) / (height / GRID_ROWS)) * (height / GRID_ROWS);

      // Snap to grid
      Animated.spring(pan, {
        toValue: { x: newX, y: newY },
        useNativeDriver: false,
      }).start();

      // Update position in parent
      onMove(id, newX, newY);
      setIsDragging(false); // Stop dragging
    },
  });

  return (
    <Animated.View
      style={[
        styles.appIconContainer,
        { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableWithoutFeedback
        onPressIn={() => {
          // Start a timer for long press detection
          longPressTimer.current = setTimeout(() => {
            setIsDragging(true); // Enable drag after 500ms
          }, 500);
        }}
        onPressOut={() => {
          if (longPressTimer.current) {
            clearTimeout(longPressTimer.current); // Clear the timer if released early
          }
        }}
      >
        <View
          style={[
            styles.appIcon,
            isDragging && styles.draggingIcon, // Highlight when dragging
          ]}
        >
          <Icon name={icon} size={30} color="#ffffff" />
          <Text style={styles.appName}>{name}</Text>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const YourSpaceScreen = () => {
  const [apps, setApps] = useState<
    { id: string; name: string; icon: string; position: { x: number; y: number } }[]
  >([]);
  const [isAppListVisible, setIsAppListVisible] = useState(false);

  // Add an app to the grid
  const addApp = (app: { id: string; name: string; icon: string }) => {
    const newApp = {
      ...app,
      position: { x: 0, y: 0 }, // Default position
    };
    setApps((prevApps) => [...prevApps, newApp]);
    setIsAppListVisible(false); // Hide the app list after adding
  };

  // Update the position of an app
  const updateAppPosition = (id: string, newX: number, newY: number) => {
    setApps((prevApps) =>
      prevApps.map((app) =>
        app.id === id ? { ...app, position: { x: newX, y: newY } } : app
      )
    );
  };

  // Animation for the "Add Apps" button
  const pulseAnimation = new Animated.Value(1);
  Animated.loop(
    Animated.sequence([
      Animated.timing(pulseAnimation, {
        toValue: 1.2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ])
  ).start();

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.gridContainer}>
        {/* Render grid placeholders */}
        {[...Array(GRID_COLUMNS * GRID_ROWS)].map((_, index) => {
          const row = Math.floor(index / GRID_COLUMNS);
          const col = index % GRID_COLUMNS;
          return (
            <View
              key={index}
              style={[
                styles.gridPlaceholder,
                { left: col * (width / GRID_COLUMNS), top: row * (height / GRID_ROWS) },
              ]}
            />
          );
        })}

        {/* Render added apps */}
        {apps.map((app) => (
          <AppIcon
            key={app.id}
            id={app.id}
            name={app.name}
            icon={app.icon}
            position={app.position}
            onMove={updateAppPosition}
          />
        ))}

        {/* Add Apps Button */}
        <TouchableOpacity
          style={styles.addAppsButton}
          onPress={() => setIsAppListVisible(!isAppListVisible)}
        >
          <Animated.View
            style={{
              transform: [{ scale: pulseAnimation }],
            }}
          >
            <IconOutline name="appstore-add" size={50} color="#1E90FF" />
          </Animated.View>
          <Text style={styles.addAppsButtonText}>Add Apps</Text>
        </TouchableOpacity>
      </View>

      {/* App List Modal */}
      {isAppListVisible && (
        <View style={styles.appListModal}>
          <FlatList
            data={APPS_LIST}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.appListItem}
                onPress={() => addApp(item)}
              >
                <Icon name={item.icon} size={30} color="#1E90FF" />
                <Text style={styles.appListItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light gray background for a clean look
  },
  gridContainer: {
    flex: 1,
    position: 'relative',
  },
  gridPlaceholder: {
    position: 'absolute',
    width: width / GRID_COLUMNS,
    height: height / GRID_ROWS,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
  },
  appIconContainer: {
    position: 'absolute',
    width: width / GRID_COLUMNS,
    height: height / GRID_ROWS,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E90FF', // Vibrant blue for app icons
    justifyContent: 'center',
    alignItems: 'center',
  },
  draggingIcon: {
    backgroundColor: '#FFD700', // Change color while dragging
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  appName: {
    marginTop: 5,
    fontSize: 12,
    color: '#333333', // Dark gray text for readability
    textAlign: 'center',
  },
  addAppsButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  addAppsButtonText: {
    marginTop: 5,
    fontSize: 14,
    color: '#1E90FF', // Consistent blue text
    textAlign: 'center',
  },
  appListModal: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF', // White background for modal
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  appListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  appListItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#1E90FF', // Blue text for modal items
  },
});

export default YourSpaceScreen;