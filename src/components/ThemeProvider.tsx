import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { themes } from '../utils/themes';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const theme = useSelector((state: RootState) => state.theme.theme);
  
    // Ensuring children are valid React elements
    const safeChildren = React.Children.map(children, (child) => {
      if (typeof child === 'string') {
        // Wrapping plain text in a <Text> component
        return <Text>{child}</Text>;
      }
      return child;
    });
  
    return (
      <View style={[styles.container, { backgroundColor: themes[theme].backgroundColor }]}>
        {safeChildren}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  
  export default ThemeProvider;