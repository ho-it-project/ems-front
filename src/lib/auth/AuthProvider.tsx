"use client";
import { usePathname, useRouter } from "next/navigation";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";
interface IAuthProviderProps {}

import { Loader2 } from "lucide-react";

export const Icons = {
  spinner: Loader2,
};
interface IAuthContext {
  initialized: boolean;
  user: {
    id_card: string;
    employee_name: string;
    hospital_name: string;
    role: "ADMIN" | "DRIVER" | "EMERGENCY_MEDICAL_TECHNICIAN" | "DISPATCHER";
  } | null;
  signIn: () => void;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function useAuth() {
  const result = useContext(AuthContext);
  if (!result?.initialized) {
    throw new Error("Auth context must be used within a AuthProvider!");
  }
  // console.log(result);
  return result;
}

// const publicPageList = ["/login"];
// const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
// const PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
// const isPublicPage = (pathname: string) => {
//   return publicPageList.includes(pathname);
// };
function useProvideAuth() {
  const fetcher = (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, init).then((res) => res.json());
  const [user, setUser] = useState<IAuthContext["user"] | null>(null);
  const { data, error } = useSWR("/api/auth", fetcher);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    if (data) {
      setUser(data.result.user);
      setStatus("success");
    }
    if (error) {
      setStatus("error");
    }
  }, [data, status, error]);
  const signIn = () => {
    console.log("signIn", data);
  };
  const signOut = () => {
    fetch("api/auth/logout", { method: "GET" });
    setUser(null);
  };

  return {
    user,
    signIn,
    signOut,
    status,
  };
}
const AuthProvider = ({ children }: PropsWithChildren<IAuthProviderProps>) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, signIn, signOut, status } = useProvideAuth();
  const [isLoading, setIsLoading] = useState<boolean>(status === "loading");
  console.log(pathname);
  useEffect(() => {
    setIsLoading(true);
    console.log(user);
    // if (status === 'loading') {
    //   return;
    // }
    if (!user) {
      router.push("/login");
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  }, [router, user]);

  return (
    <AuthContext.Provider value={{ initialized: true, user, signIn, signOut }}>
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Icons.spinner className="h-24 w-24 animate-spin text-main" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default React.memo(AuthProvider);
