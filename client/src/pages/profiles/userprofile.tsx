import { BookingHistory } from "./bookinghistory";
import { ProfileSidebar } from "./profilesidebar";

const mockUser = {
  name: "Sarah Mitchell",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
  location: "San Francisco, CA",
  memberSince: "March 2021",
  email: "sarah.mitchell@email.com",
  phone: "+1 (555) 123-4567",
  verified: true,
  reviewsCount: 28,
  avgRating: 4.9,
  stayCount: 15,
};

export default function UserProfile() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <ProfileSidebar user={mockUser} />
        <BookingHistory />
      </div>
    </main>
  );
}
