import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Edit,
  Trash2,
  Users,
  Mail,
  Phone,
  DollarSign,
  // Plus,
} from "lucide-react";

import { useAdminUsers, useDeleteUser } from "@/services/user.service";
import LoadingScreen from "@/components/loadingscreen";

export default function CustomersView() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error, refetch } = useAdminUsers({});
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);

  const userList = useMemo(() => data?.results || [], [data]);

  const filteredUsers = userList.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (is_active: boolean) =>
    is_active
      ? "bg-[var(--kifaru-nature)]/50 text-background"
      : "bg-muted/20 text-muted-foreground";

  const totalUsers = userList.length;
  const activeUsers = userList.filter((u) => u.is_active).length;

  const { mutateAsync } = useDeleteUser();

  const handleDelete = async (userId: number) => {
    setDeletingUserId(userId);
    try {
      await mutateAsync(userId);
      await refetch();
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">
            Customer Management
          </h1>
          <p className="text-muted-foreground">
            Track and manage your customer relationships
          </p>
        </div>
        {/* <Button size="lg" className="animate-bounce-in">
          <Plus className="mr-2 h-5 w-5" />
          Add Customer
        </Button> */}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          className="shadow-soft hover-lift animate-fade-in bg-card/50 border-border"
          style={{ animationDelay: "0.1s" }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Customers
                </p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card
          className="shadow-soft hover-lift animate-fade-in bg-card/50 border-border"
          style={{ animationDelay: "0.2s" }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Customers
                </p>
                <p className="text-2xl font-bold">{activeUsers}</p>
              </div>
              <Badge className="bg-[var(--kifaru-nature)] text-background px-3 py-1">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card
          className="shadow-soft hover-lift animate-fade-in bg-card/50 border-border"
          style={{ animationDelay: "0.3s" }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Customer LTV
                </p>
                <p className="text-2xl font-bold">—</p>
              </div>
              <DollarSign className="h-8 w-8 text-vendor" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <Card
        className="shadow-soft animate-fade-in bg-card/50 border-border"
        style={{ animationDelay: "0.4s" }}
      >
        <CardHeader>
          <CardTitle className="font-heading">Customer Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search customers by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 form-input"
              />
            </div>
          </div>

          {isLoading && <LoadingScreen />}
          {error && (
            <p className="text-center py-6 text-red-500">{error.message}</p>
          )}

          <div className="space-y-4">
            {filteredUsers.map((user, index) => (
              <Card
                key={user.id}
                className="shadow-soft hover-lift card-interactive animate-fade-in bg-card/70 border-border"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {user.first_name} {user.last_name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              <span>{user.email}</span>
                            </div>
                            {user.phone_number && (
                              <div className="flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                <span>{user.phone_number}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge className={getStatusColor(user.is_active)}>
                          {user.is_active ? "active" : "inactive"}
                        </Badge>
                      </div>

                      {/* <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            Total Bookings
                          </p>
                          <p className="font-semibold text-lg">0</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Spent</p>
                          <p className="font-semibold text-lg">€0</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Booking</p>
                          <p className="font-semibold text-lg">01/01/2026</p>
                        </div>
                      </div> */}
                    </div>

                    <div className="flex gap-2">
                      {/* <Button
                        size="sm"
                        variant="outline"
                        className="hover:scale-105"
                      >
                        <Eye className="mr-1 h-4 w-4" />
                        View
                      </Button> */}
                      <Button
                        size="sm"
                        variant="outline"
                        aria-label="Edit user"
                        className="hover:scale-105"
                      >
                        <Edit className="mr-1 h-4 w-4" />
                        {/* Edit */}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        aria-label="Delete user"
                        className="text-destructive hover:text-destructive"
                        disabled={deletingUserId === user.id}
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        {deletingUserId === user.id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUsers.length === 0 && !isLoading && (
            <div className="text-center py-12 animate-fade-in">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Guests found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Start by adding your first Guest"}
              </p>
              {/* <Button variant="default">
                <Plus className="mr-2 h-4 w-4" />
                Add Guest
              </Button> */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
