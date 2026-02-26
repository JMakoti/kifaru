// import type { User } from "@/types/user.types";
import { useAuth } from "@/providers/useAuth";
import AdminProfileView from "../components/profileview";
import LoadingScreen from "@/components/loadingscreen";


export default function AdminProfile() {
  const { user, isLoading } = useAuth();
  
    if (isLoading) {
      return <LoadingScreen />;
    }

    if (!user) return;

  return (
    <>
      <main className="min-h-screen mt-15">
        <div className="container py-8 px-6">
          <AdminProfileView user={user} />
        </div>
      </main>
    </>
  );
}
