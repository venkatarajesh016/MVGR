import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import MapScreen from './src/screens/MapScreen';
import DestinationScreen from './src/screens/DestinationScreen';
import AuthScreen from './src/screens/AuthScreen';
import { AuthContext } from './src/context/AuthContext';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.payload,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.payload,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        console.error('Failed to restore token:', e);
      }
      dispatch({ type: 'RESTORE_TOKEN', payload: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (credentials) => {
        try {
          const response = await fetch('http://your-backend-url/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });
          const data = await response.json();
          if (data.token) {
            await SecureStore.setItemAsync('userToken', data.token);
            dispatch({ type: 'SIGN_IN', payload: data.token });
          }
        } catch (e) {
          console.error('Sign in error:', e);
        }
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('userToken');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (credentials) => {
        try {
          const response = await fetch('http://your-backend-url/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });
          const data = await response.json();
          if (data.token) {
            await SecureStore.setItemAsync('userToken', data.token);
            dispatch({ type: 'SIGN_IN', payload: data.token });
          }
        } catch (e) {
          console.error('Sign up error:', e);
        }
      },
    }),
    []
  );

  if (state.isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {state.userToken == null ? (
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{
                animationEnabled: false,
              }}
            />
          ) : (
            <>
              <Stack.Screen name="Map" component={MapScreen} />
              <Stack.Screen name="Destination" component={DestinationScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar barStyle="dark-content" />
    </AuthContext.Provider>
  );
}
