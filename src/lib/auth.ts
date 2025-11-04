import { supabase } from './supabaseClient';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export const auth = {
  // Login function
  async login(credentials: LoginCredentials) {
    const { email, password } = credentials;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    // Store user in localStorage for mock auth
    if (data.user) {
      localStorage.setItem('mockUser', JSON.stringify(data.user));
    }
    
    return data;
  },

  // Logout function
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Clear mock user from localStorage
    localStorage.removeItem('mockUser');
  },

  // Sign up function
  async signUp(signUpData: SignUpData) {
    const { email, password, name } = signUpData;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) throw error;
    
    // Store user in localStorage for mock auth
    if (data.user) {
      localStorage.setItem('mockUser', JSON.stringify(data.user));
    }
    
    return data;
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Check if user is authenticated
  async isAuthenticated() {
    const user = await this.getCurrentUser();
    return user !== null;
  },

  // Get user session
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },
};