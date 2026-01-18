// import { useEffect } from "react";
// import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/authprovider";
import { BookingHistory } from "./bookinghistory";
import { ProfileSidebar } from "./profilesidebar";

export default function UserProfile() {
  const { user, isLoading } = useAuth();
  // const queryClient = useQueryClient();

  // Refetch user profile on mount to ensure fresh data
  // useEffect(() => {
  //   queryClient.refetchQueries({ queryKey: ["auth-user"] });
  // }, [queryClient]);

  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">User not found</p>
        </div>
      </main>
    );
  }

  const userProfile = {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone_number: user.phone_number,
    whatsapp_number: user.whatsapp_number,
    role: user.role,
    preferred_language: user.preferred_language,
    country_of_residence: user.country_of_residence,
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <ProfileSidebar user={userProfile} />
        <BookingHistory />
      </div>
    </main>
  );
}
