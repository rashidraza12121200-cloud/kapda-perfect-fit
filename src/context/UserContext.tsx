import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface Address {
  id: string;
  label: string;
  full: string;
  phone: string;
}

interface UserContextType {
  name: string;
  email: string;
  setName: (name: string) => void;
  addresses: Address[];
  addAddress: (addr: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string | null) => void;
  isLoggedIn: boolean;
  logout: () => void;
  login: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [name, setNameState] = useState(() => localStorage.getItem("kapda_name") || "Kapda+ User");
  const [email] = useState("kapda.user@example.com");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem("kapda_addresses");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  useEffect(() => { localStorage.setItem("kapda_addresses", JSON.stringify(addresses)); }, [addresses]);

  const setName = (n: string) => { setNameState(n); localStorage.setItem("kapda_name", n); };
  const addAddress = (addr: Omit<Address, "id">) => {
    const newAddr = { ...addr, id: `addr-${Date.now()}` };
    setAddresses((prev) => [...prev, newAddr]);
    if (!selectedAddressId) setSelectedAddressId(newAddr.id);
  };
  const removeAddress = (id: string) => setAddresses((prev) => prev.filter((a) => a.id !== id));
  const logout = () => setIsLoggedIn(false);
  const login = () => setIsLoggedIn(true);

  return (
    <UserContext.Provider value={{ name, email, setName, addresses, addAddress, removeAddress, selectedAddressId, setSelectedAddressId, isLoggedIn, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
