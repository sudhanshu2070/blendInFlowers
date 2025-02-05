// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
// import Sidebar from '../../components/Sidebar';

// const { width } = Dimensions.get('window');

// const LoggedInUserProfileScreen: React.FC = () => {
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const sidebarAnim = new Animated.Value(0);

//   const toggleSidebar = () => {
//     setSidebarVisible(!sidebarVisible);
//     Animated.timing(sidebarAnim, {
//       toValue: sidebarVisible ? 0 : width / 2,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={toggleSidebar} style={styles.profileButton}>
//         <Text style={styles.profileButtonText}>Profile</Text>
//       </TouchableOpacity>
//       <Animated.View
//         style={[
//           styles.sidebarOverlay,
//           {
//             width: sidebarAnim,
//           },
//         ]}
//       >
//         <Sidebar />
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   profileButton: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 20,
//   },
//   profileButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   sidebarOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     height: '100%',
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     elevation: 5,
//   },
// });

// export default LoggedInUserProfileScreen;