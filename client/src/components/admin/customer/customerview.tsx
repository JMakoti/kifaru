import { useState } from "react";
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
//   Calendar,
  DollarSign,
  Plus,
  Eye
} from "lucide-react";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  totalBookings: number;
  totalSpent: number;
  lastBookingDate: Date;
  status: "active" | "inactive";
}


export default function CustomersView () {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers] = useState<Customer[]>([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1 (555) 123-4567",
      totalBookings: 8,
      totalSpent: 312.45,
      lastBookingDate: new Date(2024, 2, 15),
      status: "active"
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "+1 (555) 987-6543",
      totalBookings: 3,
      totalSpent: 89.50,
      lastBookingDate: new Date(2024, 2, 10),
      status: "active"
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      totalBookings: 15,
      totalSpent: 678.90,
      lastBookingDate: new Date(2024, 2, 12),
      status: "active"
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david@example.com",
      phone: "+1 (555) 456-7890",
      totalBookings: 1,
      totalSpent: 25.00,
      lastBookingDate: new Date(2024, 1, 28),
      status: "inactive"
    }
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Customer["status"]) => {
    return status === "active" 
      ? "bg-secondary/20 text-secondary" 
      : "bg-muted/20 text-muted-foreground";
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === "active").length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">Customer Management</h1>
          <p className="text-muted-foreground">Track and manage your customer relationships</p>
        </div>
        <Button size="lg" className="animate-bounce-in">
          <Plus className="mr-2 h-5 w-5" />
          Add Customer
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-soft hover-lift animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{totalCustomers}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover-lift animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
                <p className="text-2xl font-bold">{activeCustomers}</p>
              </div>
              <Badge className="bg-secondary/20 text-secondary px-3 py-1">Active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover-lift animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer LTV</p>
                <p className="text-2xl font-bold">${(totalRevenue / totalCustomers).toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-vendor" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <Card className="shadow-soft animate-fade-in" style={{ animationDelay: "0.4s" }}>
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

          <div className="space-y-4">
            {filteredCustomers.map((customer, index) => (
              <Card 
                key={customer.id} 
                className="shadow-soft hover-lift card-interactive animate-fade-in"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{customer.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              <span>{customer.email}</span>
                            </div>
                            {customer.phone && (
                              <div className="flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                <span>{customer.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge className={getStatusColor(customer.status)}>
                          {customer.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Total Bookings</p>
                          <p className="font-semibold text-lg">{customer.totalBookings}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Spent</p>
                          <p className="font-semibold text-lg">${customer.totalSpent.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Booking</p>
                          <p className="font-semibold text-lg">
                            {customer.lastBookingDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="hover:scale-105">
                        <Eye className="mr-1 h-4 w-4" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="hover:scale-105">
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No customers found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Try adjusting your search terms" : "Start by adding your first customer"}
              </p>
              <Button variant="default">
                <Plus className="mr-2 h-4 w-4" />
                Add Customer
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
