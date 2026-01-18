# Authentication State Summary

## Overview
The application uses a React Context-based authentication system with React Query for API calls. Authentication is handled uniformly for both Admin and User roles through a single auth provider.

---

## Current Auth State Structure

### **AuthContext Interface** ([authprovider.tsx](src/providers/authprovider.tsx))
```typescript
interface AuthState {
  isAuthenticated: boolean;  // Boolean flag indicating if user is logged in
  user: User | null;         // Current logged-in user profile
  login: (credentials: LoginFormInputs) => Promise<void>;      // User login function
  register: (credentials: RegisterFormInputs) => Promise<void>; // User registration
  logout: () => Promise<void>; // Logout function
  isLoading: boolean;        // Loading state during auth restoration
}
```

### **User Profile Data** ([user.types.ts](src/services/user.types.ts))
```typescript
interface User {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  whatsapp_number: string;
}
```

---

## Authentication Flow

### 1. **App Initialization**
- `AuthProvider` mounted at app root
- On load: Calls `getProfile()` to restore user session from backend
- Sets `isLoading: true` until restoration completes
- If profile exists: Sets `user` data and `isAuthenticated: true`
- If no profile/error: Sets `user: null` and `isAuthenticated: false`

### 2. **User Login** (Both Admin & User)
- **User Login**: `/auth` → `user.login.tsx` → `useLogin()` hook
- **Admin Login**: `/auth/admin` → `admin.login.tsx` → `useAdminLogin()` hook
- Both call their respective API endpoints with `LoginFormInputs` (email + password)
- API response includes: `User` object + tokens
- Auth state updates: `setUser(userData)` + `setIsAuthenticated(true)`

### 3. **User Registration**
- `/auth/register` → `register.tsx` → `useRegister()` hook
- Accepts `RegisterFormInputs` with additional fields
- Similar flow to login: Updates user state on success

### 4. **User Logout**
- Calls `logoutUser()` endpoint
- Clears state: `setUser(null)` + `setIsAuthenticated(false)`
- Tokens removed from localStorage

---

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/user/login/` | POST | User login |
| `/admin/login/` | POST | Admin login |
| `/user/register/` | POST | User registration |
| `/user/me/` | GET | Get current user profile |
| `/user/logout/` | POST | Logout current user |

---

## How to Access Auth State

### **In Components:**
```typescript
import { useAuth } from "@/providers/authprovider";

function MyComponent() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {user?.first_name}!</div>;
}
```

---

## Current Limitations & Notes

1. **Single Auth Provider**: Both Admin and User use the same `AuthProvider` - no separate admin-specific auth state
   - Admin users login via `/admin/login` → `useAdminLogin()` 
   - Both responses stored in same `user` state

2. **Role Information**: User profile doesn't include role/permissions data
   - Current `User` interface has no `role` or `isAdmin` field
   - Role differentiation happens through route protection, not auth state

3. **Token Storage**: 
   - Tokens stored in localStorage (`auth-token`)
   - Interceptor adds tokens to request headers automatically

4. **Profile Restoration**: 
   - Happens only on app load/refresh
   - Backend validates token and returns user if valid
   - No client-side token validation

---

## Recommended Improvements

### To distinguish Admin vs User in Auth State:
1. Extend `User` interface with a `role` field:
```typescript
interface User {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  whatsapp_number: string;
  role: 'admin' | 'user';  // Add this
}
```

2. This would allow components to check:
```typescript
const { user } = useAuth();
if (user?.role === 'admin') {
  // Show admin UI
}
```

### To improve role-based access:
1. Create a separate `useAdmin()` hook or add methods like:
```typescript
const { isAdmin } = useAuth();
const { canManageProperties } = useAuth();
```

2. Store permissions in auth context for centralized access control

---

## Files Involved

- **Provider**: [authprovider.tsx](src/providers/authprovider.tsx)
- **Types**: [user.types.ts](src/services/user.types.ts)
- **API Calls**: [user.endpoints.ts](src/services/user.endpoints.ts)
- **React Query Hooks**: [user.service.ts](src/services/user.service.ts)
- **Auth Routes**: [auth.routes.tsx](src/apps/auth/auth.routes.tsx)
- **Admin Login**: [admin.login.tsx](src/apps/auth/admin.login.tsx)
- **User Login**: [user.login.tsx](src/apps/auth/user.login.tsx)
