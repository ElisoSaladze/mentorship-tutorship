import { useCallback, useEffect } from 'react'

/**
 * Custom hook for synchronizing logout across multiple tabs or windows.
 *
 * @param logoutCallback A callback function to be invoked when logout is triggered.
 * @returns A function to trigger logout and synchronize it across tabs/windows.
 */
export const useLogoutAcrossTabs = (logoutCallback: () => void) => {
  useEffect(() => {
    // Event listener to detect changes in localStorage
    const syncLogout = (event: StorageEvent) => {
      // Check if the event key is 'logout'
      if (event.key === 'logout') {
        // Invoke the logout callback when logout is triggered
        logoutCallback()
      }
    }

    // Add event listener to listen for storage events
    window.addEventListener('storage', syncLogout)

    // Clean up by removing the event listener
    return () => {
      window.removeEventListener('storage', syncLogout)
    }
  }, [logoutCallback])

  // Function to trigger logout and synchronize it across tabs/windows
  return useCallback(() => {
    // Invoke the logout callback
    logoutCallback()
    // Set a 'logout' item in localStorage with the current timestamp
    localStorage.setItem('logout', String(Date.now()))
  }, [logoutCallback])
}
