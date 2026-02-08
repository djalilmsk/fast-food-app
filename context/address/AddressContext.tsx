import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/auth/AuthContext';

export interface AddressContextType {
  selectedAddress: string | null;
  address1: string | null;
  address2: string | null;
  setSelectedAddress: (address: 'address1' | 'address2') => void;
  updateAddress: (addressType: 'address1' | 'address2', addressValue: string) => void;
  currentAddress: string | null;
}

// Create context
const AddressContext = createContext<AddressContextType | undefined>(undefined);

// Storage keys
const SELECTED_ADDRESS_KEY = '@fast_food_selected_address';

// Provider component
export const AddressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [selectedAddress, setSelectedAddressState] = useState<'address1' | 'address2' | null>(null);
  const [address1, setAddress1] = useState<string | null>(null);
  const [address2, setAddress2] = useState<string | null>(null);

  // Initialize addresses from user data and saved preference
  useEffect(() => {
    const initializeAddresses = async () => {
      if (user) {
        // Set addresses from user data
        setAddress1(user.address1 || null);
        setAddress2(user.address2 || null);

        // Try to load selected address preference from storage
        try {
          const savedPreference = await AsyncStorage.getItem(SELECTED_ADDRESS_KEY);
          if (savedPreference === 'address2' && user.address2) {
            setSelectedAddressState('address2');
          } else if (user.address1) {
            setSelectedAddressState('address1');
          } else if (user.address2) {
            setSelectedAddressState('address2');
          }
        } catch (error) {
          console.error('Error loading selected address preference:', error);
          // Default to address1 if available
          if (user.address1) {
            setSelectedAddressState('address1');
          } else if (user.address2) {
            setSelectedAddressState('address2');
          }
        }
      }
    };

    initializeAddresses();
  }, [user]);

  const setSelectedAddress = useCallback(async (address: 'address1' | 'address2') => {
    // Check if the address exists
    const addressValue = address === 'address1' ? address1 : address2;
    if (addressValue) {
      setSelectedAddressState(address);
      try {
        await AsyncStorage.setItem(SELECTED_ADDRESS_KEY, address);
      } catch (error) {
        console.error('Error saving selected address preference:', error);
      }
    }
  }, [address1, address2]);

  const updateAddress = useCallback((addressType: 'address1' | 'address2', addressValue: string) => {
    if (addressType === 'address1') {
      setAddress1(addressValue);
      // If this is the first address being added, select it
      if (!selectedAddress) {
        setSelectedAddressState('address1');
      }
    } else {
      setAddress2(addressValue);
      // If this is the first address being added, select it
      if (!selectedAddress) {
        setSelectedAddressState('address2');
      }
    }
  }, [selectedAddress]);

  const currentAddress = selectedAddress
    ? selectedAddress === 'address1'
      ? address1
      : address2
    : null;

  const value: AddressContextType = {
    selectedAddress,
    address1,
    address2,
    setSelectedAddress,
    updateAddress,
    currentAddress,
  };

  return <AddressContext.Provider value={value}>{children}</AddressContext.Provider>;
};

// Hook to use address context
export const useAddress = (): AddressContextType => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};
