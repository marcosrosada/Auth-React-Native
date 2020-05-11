import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import * as auth from '../services/auth';

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storageUser = await AsyncStorage.getItem('@AuthRN:user');
      const storageToken = await AsyncStorage.getItem('@AuthRN:token');

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
    }

    loadStoragedData();
  });

  async function signIn() {
    const response = await auth.signIn();

    setUser(response.user);

    await AsyncStorage.setItem('@AuthRN:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@AuthRN:token', response.token);
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }
  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
