"use client";
import { usePathname, useRouter } from "next/navigation";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
interface IAuthProviderProps {}

import Spinner from "@/components/Spinner";
import { api } from "@/lib/api";
import { env } from "@/lib/utils/envValidation";
import { Loader2 } from "lucide-react";
import useSWR from "swr";
import { LoginResponse } from "../types/api";

export const Icons = {
  spinner: Loader2,
};

interface LoginParam {
  ambulance_company_name: string;
  id_card: string;
  password: string;
}

interface IAuthContext {
  initialized: boolean;
  user: {
    id_card: string;
    employee_id: string;
    ambulance_company_id: string;
    role: "ADMIN" | "DRIVER" | "EMERGENCY_MEDICAL_TECHNICIAN" | "DISPATCHER";
    employee_name: string;
  } | null;
  accessToken: string | null;
  signIn: (loginParam: LoginParam) => Promise<boolean>;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

type IAuthContextWithUser = Omit<IAuthContext, "user"> & {
  user: NonNullable<IAuthContext["user"]>;
};

export function useAuth(options?: { isLogin?: true }): IAuthContextWithUser;
export function useAuth(options?: { isLogin?: false }): IAuthContext;
export function useAuth(options?: {
  isLogin?: boolean;
}): IAuthContext | IAuthContextWithUser {
  const result = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  if (!result?.initialized) {
    throw new Error("Auth context must be used within a AuthProvider!");
  }
  if (options?.isLogin) {
    if (result.user === null) router.push(`/login?callbackURL=${pathname}`);
    return result;
  }
  return result;
}

const loginApi = async (loginParam: LoginParam) =>
  api<LoginResponse>("/api/ems/auth/login", {
    method: "POST",
    body: JSON.stringify(loginParam),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

function useProvideAuth() {
  const fetcher = async (input: RequestInfo | URL, init?: RequestInit) => {
    const res = await api<LoginResponse>(input, init);
    if (!res.is_success || !res.result.is_login) return false;
    return res.result;
  };
  // const router = useRouter();
  const [user, setUser] = useState<IAuthContext["user"] | null>(null);
  const [accessToken, setAccessToken] =
    useState<IAuthContext["accessToken"]>(null);
  const { data, error } = useSWR("/api/ems/auth", fetcher);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (data === false) {
      setStatus("success");
    }
    if (data) {
      const { employee, access_token } = data;
      setUser({ ...employee });
      setAccessToken(access_token);
      setStatus("success");
    }
    if (error) {
      setStatus("error");
    }
  }, [data, status, error]);

  const signIn = async (loginParam: LoginParam) => {
    const res = await loginApi(loginParam);
    if (!res.is_success || !res.result.is_login) return false;
    const { employee, access_token } = res.result;
    setUser({ ...employee });
    setAccessToken(access_token);
    return true;
  };
  const signOut = () => {
    fetch("/api/ems/auth/logout", { method: "POST" })
      .then((res) => res.json())
      .then((res) => {
        if (res.is_success) {
          // router.push("/login");
          setUser(null);
          setAccessToken(null);
        }
      });
  };

  return {
    user,
    signIn,
    signOut,
    status,
    accessToken,
  };
}
const publicPageList = ["/login"];
const isPublicPage = (pathname: string) => publicPageList.includes(pathname);
const devPageList = ["/ui-components"];
const isDevPage = (pathname: string) =>
  env.NEXT_PUBLIC_NODE_ENV === "dev" && devPageList.includes(pathname);

const AuthProvider = ({ children }: PropsWithChildren<IAuthProviderProps>) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, signIn, signOut, status, accessToken } = useProvideAuth();
  const [isLoading, setIsLoading] = useState<boolean>(
    status ? status === "loading" : true
  );
  useEffect(() => {
    setIsLoading(true);
    if (status === "loading") return;
    if (isDevPage(pathname)) {
      setIsLoading(false);
      return;
    }
    if (isPublicPage(pathname)) {
      setIsLoading(false);
      return;
    }
    if (!user) {
      router.push(`/login?callbackURL=${pathname}`);
      return;
    }
    setIsLoading(false);
  }, [router, user, status, pathname]);

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        {/* <Icons.spinner className="h-24 w-24 animate-spin text-main" /> */}
        <Spinner />
      </div>
    );

  if (isDevPage(pathname)) return <>{children}</>;

  if (isPublicPage(pathname))
    return (
      <AuthContext.Provider
        value={{ initialized: true, user, signIn, signOut, accessToken }}
      >
        {children}
      </AuthContext.Provider>
    );

  if (!user) router.push(`/login?callbackURL=${pathname}`);

  return (
    <AuthContext.Provider
      value={{ initialized: true, user, signIn, signOut, accessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default React.memo(AuthProvider);
