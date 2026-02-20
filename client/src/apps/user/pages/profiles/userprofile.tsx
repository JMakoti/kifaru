import { useAuth } from "@/providers/useAuth";
import { BookingHistory } from "./bookinghistory";
import { ProfileSidebar } from "./profilesidebar";
import LoadingScreen from "@/components/loadingscreen";

export default function UserProfile() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
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
    is_active: user.is_active,
    is_verified: user.is_verified,
    date_joined: user.date_joined,
    special_preferences: user.special_preferences,
    assigned_properties: user.assigned_properties,
    last_login: user.last_login,
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
