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
  phone: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  addresses: Address[];
  addAddress: (addr: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string | null) => void;
  isLoggedIn: boolean;
  logout: () => void;
  login: (info?: { name?: string; email?: string; phone?: string }) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const GUEST_NAME = "Guest";
const GUEST_EMAIL = "";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const loggedInInit = localStorage.getItem("kapda_loggedin") === "1";
  // If not logged in, don't surface any leftover stored identity (avoids stale dummy values)
  if (!loggedInInit) {
    localStorage.removeItem("kapda_name");
    localStorage.removeItem("kapda_email");
    localStorage.removeItem("kapda_phone");
  }
  const [name, setNameState] = useState(() => (loggedInInit ? localStorage.getItem("kapda_name") || GUEST_NAME : GUEST_NAME));
  const [email, setEmailState] = useState(() => (loggedInInit ? localStorage.getItem("kapda_email") || GUEST_EMAIL : GUEST_EMAIL));
  const [phone, setPhoneState] = useState(() => (loggedInInit ? localStorage.getItem("kapda_phone") || "" : ""));
  const [isLoggedIn, setIsLoggedIn] = useState(loggedInInit);
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem("kapda_addresses");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  useEffect(() => { localStorage.setItem("kapda_addresses", JSON.stringify(addresses)); }, [addresses]);

  const setName = (n: string) => { setNameState(n); localStorage.setItem("kapda_name", n); };
  const setEmail = (e: string) => { setEmailState(e); localStorage.setItem("kapda_email", e); };
  const setPhone = (p: string) => { setPhoneState(p); localStorage.setItem("kapda_phone", p); };

  const addAddress = (addr: Omit<Address, "id">) => {
    const newAddr = { ...addr, id: `addr-${Date.now()}` };
    setAddresses((prev) => [...prev, newAddr]);
    if (!selectedAddressId) setSelectedAddressId(newAddr.id);
  };
  const removeAddress = (id: string) => setAddresses((prev) => prev.filter((a) => a.id !== id));

  const login = (info?: { name?: string; email?: string; phone?: string }) => {
    const nextName = info?.name ?? GUEST_NAME;
    const nextEmail = info?.email ?? "";
    const nextPhone = info?.phone ?? "";
    setNameState(nextName); localStorage.setItem("kapda_name", nextName);
    setEmailState(nextEmail); localStorage.setItem("kapda_email", nextEmail);
    setPhoneState(nextPhone); localStorage.setItem("kapda_phone", nextPhone);
    setIsLoggedIn(true);
    localStorage.setItem("kapda_loggedin", "1");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setNameState(GUEST_NAME);
    setEmailState(GUEST_EMAIL);
    setPhoneState("");
    localStorage.removeItem("kapda_loggedin");
    localStorage.removeItem("kapda_name");
    localStorage.removeItem("kapda_email");
    localStorage.removeItem("kapda_phone");
  };

  return (
    <UserContext.Provider value={{ name, email, phone, setName, setEmail, setPhone, addresses, addAddress, removeAddress, selectedAddressId, setSelectedAddressId, isLoggedIn, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
