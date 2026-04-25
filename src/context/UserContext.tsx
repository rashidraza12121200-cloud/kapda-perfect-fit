import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase";

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

const getIdentityFromUser = (user: User | null) => {
  if (!user) {
    return { name: GUEST_NAME, email: GUEST_EMAIL, phone: "", isLoggedIn: false };
  }

  return {
    name:
      localStorage.getItem("kapda_name") ||
      user.displayName ||
      user.email?.split("@")[0] ||
      user.phoneNumber ||
      GUEST_NAME,
    email: user.email || localStorage.getItem("kapda_email") || GUEST_EMAIL,
    phone: user.phoneNumber || localStorage.getItem("kapda_phone") || "",
    isLoggedIn: true,
  };
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const initialIdentity = getIdentityFromUser(auth.currentUser);
  const [name, setNameState] = useState(initialIdentity.name);
  const [email, setEmailState] = useState(initialIdentity.email);
  const [phone, setPhoneState] = useState(initialIdentity.phone);
  const [isLoggedIn, setIsLoggedIn] = useState(initialIdentity.isLoggedIn);
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem("kapda_addresses");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  useEffect(() => { localStorage.setItem("kapda_addresses", JSON.stringify(addresses)); }, [addresses]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const identity = getIdentityFromUser(user);

      setNameState(identity.name);
      setEmailState(identity.email);
      setPhoneState(identity.phone);
      setIsLoggedIn(identity.isLoggedIn);

      if (identity.isLoggedIn) {
        localStorage.setItem("kapda_loggedin", "1");
        localStorage.setItem("kapda_name", identity.name);
        localStorage.setItem("kapda_email", identity.email);
        localStorage.setItem("kapda_phone", identity.phone);
      } else {
        localStorage.removeItem("kapda_loggedin");
        localStorage.removeItem("kapda_name");
        localStorage.removeItem("kapda_email");
        localStorage.removeItem("kapda_phone");
      }
    });

    return unsubscribe;
  }, []);

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
    signOut(auth).catch(() => undefined);
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
