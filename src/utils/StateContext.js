import { createContext, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Firebase';

export const StateContext = createContext();

/**
 * StateProvider component to manage state for the application.
 *
 * @param {object} children - The child components to render.
 * @returns {object} - The provider component with state values.
 */
export const StateProvider = ({ children }) => {
  // Get authenticated user and loading state
  const [user, loading] = useAuthState(auth);
  
  // Set initial user role
  const [userRole, setUserRole] = useState(null);

  let email = '';
  
  // Set email if user is authenticated
  if (user) {
    email = user.email;
  }

  // Return provider component with state values
  return (
    <StateContext.Provider value={{ user, loading, email, userRole, setUserRole }}>
      {children}
    </StateContext.Provider>
  );
};
