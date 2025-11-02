import React, { createContext, useContext, useState, ReactNode } from "react";
import { Address } from "../types";

interface AddressContextType {
  addresses: Address[];
  addAddress: (address: Address) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (id: number) => void;
  selectedAddressId: number | null;
  setSelectedAddressId: (id: number | null) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: "Home",
      fullAddress: "Al Barsha Marina Mall 2781 Build Riyadh, SA",
      name: "Mohammed Sbiaa",
      phone: "+966 366 00 81",
      buildingNo: "2781",
      showMap: true,
    },
    {
      id: 2,
      type: "Work",
      fullAddress: "Al Barsha Marina Mall 2781 Build Riyadh, SA",
      name: "Mohammed Sbiaa",
      phone: "+966 366 00 81",
      buildingNo: "2781",
    },
    {
      id: 3,
      type: "Other",
      customType: "Gym",
      fullAddress: "Al Barsha Marina Mall 2781 Build Riyadh, SA",
      name: "Mohammed Sbiaa",
      phone: "+966 366 00 81",
      buildingNo: "2781",
    },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(1);

  const addAddress = (address: Address) => {
    const newId = Math.max(...addresses.map((a) => a.id || 0), 0) + 1;
    const newAddress = { ...address, id: newId };
    setAddresses([...addresses, newAddress]);
  };

  const updateAddress = (address: Address) => {
    setAddresses(addresses.map((a) => (a.id === address.id ? address : a)));
  };

  const deleteAddress = (id: number) => {
    setAddresses(addresses.filter((a) => a.id !== id));
    if (selectedAddressId === id) {
      setSelectedAddressId(addresses[0]?.id || null);
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        selectedAddressId,
        setSelectedAddressId,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddressContext = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddressContext must be used within AddressProvider");
  }
  return context;
};
