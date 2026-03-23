import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Custom storage that uses localStorage if available
const storageAdapter = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key);
  },
};

// Create Supabase client with proper session persistence and error recovery
// This ensures sessions are saved to localStorage and restored automatically
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: storageAdapter,
    flowType: 'pkce', // Use PKCE flow for better security and token handling
  },
});

// Listen for auth errors and handle refresh token issues
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
    console.log(`🔄 Auth event: ${event}`);
  }
});

// Set up a global error handler for token refresh failures
if (typeof window !== 'undefined') {
  const originalFetch = fetch;
  
  // Override fetch to catch and handle token errors gracefully
  (window as any).fetchWithTokenErrorHandling = async (url: string, options?: RequestInit) => {
    try {
      const response = await originalFetch(url, options);
      
      // If we get a 401, it might be a token refresh issue
      if (response.status === 401) {
        console.warn('⚠️ Received 401 - possible token issue');
      }
      
      return response;
    } catch (error) {
      console.error('❌ Fetch error:', error);
      throw error;
    }
  };
}

/**
 * Get the current authenticated user
 * Safely handles missing session without throwing AuthSessionMissingError
 * Automatically clears corrupted sessions
 */
export async function getCurrentUser() {
  try {
    // First check if session exists
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      // Check if it's a refresh token error
      if (sessionError.message.includes('Refresh Token') || sessionError.message.includes('not found')) {
        console.warn('⚠️ Corrupted session detected - clearing and forcing re-login');
        // Clear the corrupted session from localStorage
        try {
          await supabase.auth.signOut();
        } catch (e) {
          // Even if signOut fails, clear localStorage manually
          if (typeof window !== 'undefined') {
            const keys = Object.keys(window.localStorage);
            keys.forEach(key => {
              if (key.includes('sb-') || key.includes('auth')) {
                window.localStorage.removeItem(key);
              }
            });
          }
        }
      }
      console.log('No session found - user not authenticated');
      return null;
    }

    if (!session) {
      console.log('No session found - user not authenticated');
      return null;
    }

    // Session exists, safe to getUser
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('Error getting user:', userError.message);
      return null;
    }

    return user;
  } catch (err: any) {
    console.error('Error in getCurrentUser:', err.message);
    return null;
  }
}

/**
 * Get the current user's profile
 * Safely returns null if user doesn't exist or profile not found
 */
export async function getUserProfile() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      console.log('No authenticated user for profile fetch');
      return null;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.warn('Error fetching profile:', error.message);
      return null;
    }

    return data;
  } catch (err: any) {
    console.error('Error in getUserProfile:', err.message);
    return null;
  }
}

/**
 * Sign up a new user
 * Returns: { success, user?, session?, requiresEmailConfirmation?, error? }
 */
export async function signUp(email: string, password: string, fullName: string) {
  try {
    console.log('🔐 Starting signup for:', email);
    
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    console.log('📋 Signup response:', {
      user: authData?.user?.id,
      session: authData?.session ? 'exists' : 'null',
      error: authError?.message,
    });

    if (authError) {
      console.error('❌ Signup error:', authError.message);
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      console.error('❌ No user returned from signup');
      return { success: false, error: 'User creation failed' };
    }

    // KEY DISTINCTION: Check if session exists
    const hasSession = !!authData.session;
    console.log('📝 Has session:', hasSession);
    
    if (!hasSession) {
      console.log('📧 Email confirmation required - no session created yet');
    }

    // Try to create profile, but don't fail if it doesn't work
    try {
      await supabase.from('profiles').insert({
        id: authData.user.id,
        full_name: fullName,
        email,
        created_at: new Date().toISOString(),
      });
    } catch (profileErr) {
      console.warn('⚠️ Profile creation skipped:', profileErr);
    }

    // Return detailed response
    return {
      success: true,
      user: authData.user,
      session: authData.session,
      requiresEmailConfirmation: !hasSession,
    };
  } catch (err: any) {
    console.error('❌ Signup exception:', err);
    return { success: false, error: err.message || 'Sign up failed' };
  }
}

/**
 * Log in a user
 */
export async function logIn(email: string, password: string) {
  try {
    console.log('🔐 Logging in:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('❌ Login error:', error.message);
      return { success: false, error: error.message };
    }

    if (!data.user) {
      console.error('❌ No user returned from login');
      return { success: false, error: 'No user returned' };
    }

    if (!data.session) {
      console.warn('⚠️ Email confirmation required');
      return { success: false, error: 'Email confirmation required. Check your email.' };
    }

    console.log('✅ Login successful for:', email);
    return { success: true, user: data.user, session: data.session };
  } catch (err: any) {
    console.error('❌ Login exception:', err);
    return { success: false, error: err.message || 'Login failed' };
  }
}

/**
 * Log out the current user
 */
export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Watch auth state changes
 */
export function onAuthStateChange(callback: (user: any) => void) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      callback(session.user);
    } else {
      callback(null);
    }
  });

  return subscription;
}
