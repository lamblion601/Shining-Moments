import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// TODO: 실제 화면 컴포넌트 import
// import { LoginScreen } from '../features/auth/LoginScreen';
// import { UploadScreen } from '../features/upload/UploadScreen';
// import { AnalysisScreen } from '../features/analysis/AnalysisScreen';
// import { CoachingScreen } from '../features/coaching/CoachingScreen';
// import { DashboardScreen } from '../features/dashboard/DashboardScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFB6C1',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        {/* TODO: 실제 화면 추가 */}
        {/* <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="Analysis" component={AnalysisScreen} />
        <Stack.Screen name="Coaching" component={CoachingScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};




