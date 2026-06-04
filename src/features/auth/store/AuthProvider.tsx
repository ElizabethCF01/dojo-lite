import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { setAuthToken } from '#shared/api';
import type { AvatarConfig } from '#shared/design/elements';
import * as authApi from '../api';
import type { AuthUser, Role } from '../types';
import {
  clearSession,
  getStoredToken,
  getStoredUser,
  persistUser,
  storeSession,
} from './tokenStorage';

type Status = 'loading' | 'authed' | 'guest';

type AuthContextValue = {
  user: AuthUser | null;
  status: Status;
  login: (email: string, password: string) => Promise<void>;
  register: (input: {
    email: string;
    password: string;
    name: string;
    role: Role;
    joinCode?: string;
  }) => Promise<void>;
  updateAvatar: (avatar: AvatarConfig) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    (async () => {
      const token = await getStoredToken();
      if (!token) {
        setStatus('guest');
        return;
      }
      setAuthToken(token);
      try {
        await authApi.fetchMe();
        setUser(await getStoredUser());
        setStatus('authed');
      } catch {
        setAuthToken(null);
        await clearSession();
        setStatus('guest');
      }
    })();
  }, []);

  const apply = useCallback(async (token: string, nextUser: AuthUser) => {
    setAuthToken(token);
    await storeSession(token, nextUser);
    setUser(nextUser);
    setStatus('authed');
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const { token, user: nextUser } = await authApi.login(email, password);
      await apply(token, nextUser);
    },
    [apply],
  );

  const register = useCallback(
    async (input: {
      email: string;
      password: string;
      name: string;
      role: Role;
      joinCode?: string;
    }) => {
      const { token, user: nextUser } = await authApi.register(input);
      await apply(token, nextUser);
    },
    [apply],
  );

  const updateAvatar = useCallback(async (avatar: AvatarConfig) => {
    await authApi.updateAvatar(avatar);
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, avatar };
      persistUser(next);
      return next;
    });
  }, []);

  const logout = useCallback(async () => {
    setAuthToken(null);
    await clearSession();
    setUser(null);
    setStatus('guest');
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, status, login, register, updateAvatar, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('No AuthProvider');
  return ctx;
}
