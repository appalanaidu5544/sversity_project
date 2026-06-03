import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import pb from '@/lib/pocketbaseClient';
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    );
  }

  return context;
};

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);

  const [initialLoading, setInitialLoading] =
    useState(true);

  // LOAD AUTH USER
  useEffect(() => {

    if (
      pb.authStore.isValid &&
      pb.authStore.model
    ) {
      setCurrentUser(pb.authStore.model);
    }

    // LISTEN AUTH CHANGES
    pb.authStore.onChange(() => {

      if (pb.authStore.isValid) {
        setCurrentUser(pb.authStore.model);
      } else {
        setCurrentUser(null);
      }

    });

    setInitialLoading(false);

  }, []);

  // LOGIN
  const login = async (email, password) => {

    try {

      const authData = await pb
        .collection('users')
        .authWithPassword(
          email,
          password,
          {
            $autoCancel: false,
          }
        );

      setCurrentUser(authData.record);

      return authData.record;

    } catch (error) {

      console.error('Login Error:', error);

      throw error;
    }
  };

  // SIGNUP
  const signup = async (userData) => {

    try {

      const role =
        userData.role || 'student';

      // CREATE USER
      const record = await pb
        .collection('users')
        .create(
          {
            ...userData,
            role,
            emailVisibility: true,
          },
          {
            $autoCancel: false,
          }
        );

      // NO AUTO LOGIN
      // USER MUST LOGIN MANUALLY

      return record;

    } catch (error) {

      console.error(
        'Signup Error:',
        error
      );

      throw error;
    }
  };

  // LOGOUT
  const logout = () => {

    pb.authStore.clear();

    setCurrentUser(null);
  };
  // FORGOT PASSWORD
  const forgotPassword = async (email) => {

    try {

      await pb
        .collection('users')
        .requestPasswordReset(email);

    } catch (error) {

      console.error(
        'Forgot Password Error:',
        error
      );

      throw error;
    }
  };

  // RESET PASSWORD
  const resetPassword = async (
    token,
    password,
    passwordConfirm
  ) => {

    try {

      await pb
        .collection('users')
        .confirmPasswordReset(
          token,
          password,
          passwordConfirm
        );

    } catch (error) {

      console.error(
        'Reset Password Error:',
        error
      );

      throw error;
    }
  };

  // SEND VERIFICATION EMAIL
  const sendVerificationEmail = async (
    email
  ) => {
    try {
      await pb
        .collection('users')
        .requestVerification(email);
    } catch (error) {
      console.error(
        'Verification Email Error:',
        error
      );
      throw error;
    }
  };

  // AUTH STATUS
  const isAuthenticated =
    pb.authStore.isValid;

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isAuthenticated,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
  };

  // LOADER
  if (initialLoading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-muted-foreground">
            Loading...
          </p>

        </div>

      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};