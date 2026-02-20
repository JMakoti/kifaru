import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/types/user.types";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Shield,
  CheckCircle,
  LogOut,
} from "lucide-react";

interface AdminProfileViewProps {
  user: User;
  onLogout?: () => void;
}

export default function AdminProfileView({
  user,
  onLogout,
}: AdminProfileViewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="mx-auto space-y-8">
        {/* Header with Avatar */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
                <span className="text-3xl font-bold">
                  {user.first_name.charAt(0)}
                  {user.last_name.charAt(0)}
                </span>
              </div>
              <div className="space-y-2">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user.first_name} {user.last_name}
                  </h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <div className="flex items-center space-x-4 pt-2">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-600 capitalize">
                      {user.role}
                    </span>
                  </div>
                  {user.is_verified && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-semibold text-green-600">
                        Verified
                      </span>
                    </div>
                  )}
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </div>
                </div>
              </div>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="inline-flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-gray-900 break-all">{user.email}</p>
                </div>
              </div>
              {user.phone_number && (
                <div className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <p className="text-gray-900">{user.phone_number}</p>
                  </div>
                </div>
              )}
              {user.whatsapp_number && (
                <div className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      WhatsApp
                    </p>
                    <p className="text-gray-900">{user.whatsapp_number}</p>
                  </div>
                </div>
              )}
              {user.country_of_residence && (
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Country</p>
                    <p className="text-gray-900 capitalize">
                      {user.country_of_residence}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Preferences & Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences & Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <Globe className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Preferred Language
                  </p>
                  <p className="text-gray-900 capitalize">
                    {user.preferred_language}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Account Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Member Since
                  </p>
                  <p className="text-gray-900">
                    {formatDate(user.date_joined)}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Calendar className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Last Login
                  </p>
                  <p className="text-gray-900">{formatDate(user.last_login)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assigned Properties */}
        {user.assigned_properties && user.assigned_properties.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Assigned Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {user.assigned_properties.map((property, index) => (
                  <div key={index} className="text-gray-700">
                    {JSON.stringify(property)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
