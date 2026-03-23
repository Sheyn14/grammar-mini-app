'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { logIn, getCurrentUser, logOut as supabaseLogOut, supabase } from '@/auth/supabase';

interface User {
  id: string;
  email: string;
  user_metadata?: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        // Restore session from localStorage
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          // Handle refresh token errors specifically
          if (sessionError.message?.includes('Refresh Token') || sessionError.message?.includes('not found')) {
            console.warn('⚠️ Corrupted session - clearing and requiring re-login');
            // Clear bad session
            try {
              await supabase.auth.signOut();
            } catch (e) {
              console.warn('Could not sign out, clearing localStorage manually');
              // Manual clear
              if (typeof window !== 'undefined') {
                const keys = Object.keys(window.localStorage);
                keys.forEach(key => {
                  if (key.includes('sb-') || key.includes('auth')) {
                    window.localStorage.removeItem(key);
                  }
                });
              }
            }
            setLoading(false);
            return;
          }
          console.warn('⚠️ Session restore error:', sessionError.message);
          setLoading(false);
          return;
        }

        if (session?.user) {
          console.log('✅ Session restored for user:', session.user.id);
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            user_metadata: session.user.user_metadata,
          });
        } else {
          console.log('No existing session found');
          setUser(null);
        }
      } catch (error) {
        console.error('❌ Auth check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'TOKEN_REFRESHED') {
          console.log('🔄 Token refreshed successfully');
        }
        
        if (session?.user) {
          console.log('✅ Auth state changed - user signed in');
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            user_metadata: session.user.user_metadata,
          });
        } else {
          console.log('User signed out');
          setUser(null);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    console.log('🔐 Logging in user:', email);
    setLoading(true);
    try {
      const result = await logIn(email, password);

      if (!result.success) {
        throw new Error(result.error || 'Login failed');
      }

      if (!result.user) {
        throw new Error('No user returned from login');
      }

      console.log('✅ Login successful');
      setUser({
        id: result.user.id,
        email: result.user.email || '',
        user_metadata: result.user.user_metadata,
      });
      setLoading(false);
    } catch (err: any) {
      console.error('❌ Login error:', err.message);
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    console.log('🚪 Logging out user');
    try {
      await supabaseLogOut();
      console.log('✅ Logout successful');
      setUser(null);
    } catch (err) {
      console.error('❌ Logout error:', err);
      // Still clear user even if logout fails
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
