import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Calendar,
  CreditCard,
  TrendingUp,
  ArrowDownLeft,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { usePayments } from "@/services/booking.service";
import LoadingScreen from "@/components/loadingscreen";
import type { Payment } from "@/types/booking.types";

export default function TransactionView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { data, isLoading } = usePayments();

  if (isLoading) {
    return <LoadingScreen />;
  }

  const payments = data?.results ?? [];

  const formatDate = (date: Date) => {
    if (isNaN(date.getTime())) return "TBD";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const filteredTransactions = payments
    .map((payment) => ({
      id: payment.transaction_id,
      type: "payment" as const,
      amount: Number(payment.amount),
      status: payment.payment_status,
      method: payment.payment_method,
      customerName: `Booking #${payment.booking}`,
      date: new Date(payment.created_at),
      reference: payment.paystack_reference,
    }))
    .filter((txn) => {
      const matchesSearch =
        txn.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.reference.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || txn.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

  const getStatusColor = (status: Payment["payment_status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: Payment["payment_status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTypeIcon = () => {
    return <ArrowDownLeft className="w-5 h-5 text-green-600" />;
  };

  const totalTransactions = payments.filter(
    (p) => p.payment_status === "completed",
  ).length;

  const totalRevenue = payments
    .filter((p) => p.payment_status === "completed")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const pendingAmount = payments
    .filter((p) => p.payment_status === "pending")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">
            Transaction Management
          </h1>
          <p className="text-muted-foreground">
            Track and manage all payment transactions securely. View payment
            history and resolve issues quickly from this panel.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-soft h-30 bg-card/50 border-border" style={{ animationDelay: "0.1s" }} >
          <CardContent className="py-3 px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Transactions
                </p>
                <p className="text-2xl font-bold font-heading">
                  {totalTransactions}
                </p>
                <p className="text-xs text-muted-foreground">
                  Completed transactions
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft h-30" style={{ animationDelay: "0.2s" }}>
          <CardContent className="py-3 px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold font-heading">
                  €{totalRevenue.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Payments received
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft h-30" style={{ animationDelay: "0.3s" }}>
          <CardContent className="py-3 px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Amount
                </p>
                <p className="text-2xl font-bold font-heading text-primary">
                  €{pendingAmount.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Awaiting processing
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transaction History</CardTitle>
            {/* <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button> */}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search transaction reference"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("completed")}
              >
                Completed
              </Button>
              <Button
                variant={statusFilter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("pending")}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === "failed" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("failed")}
              >
                Failed
              </Button>
            </div>
          </div>

          {/* Transaction Cards */}
          <div className="space-y-3">
            {filteredTransactions.map((txn) => (
              <Card key={txn.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getTypeIcon()}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">
                                {txn.id}
                              </h3>
                              <Badge className={getStatusColor(txn.status)}>
                                <span className="flex items-center gap-1">
                                  {getStatusIcon(txn.status)}
                                  {txn.status}
                                </span>
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`text-2xl font-bold ${
                                txn.type === "payment" || txn.type === "deposit"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {txn.type === "payment" || txn.type === "deposit"
                                ? "+"
                                : "-"}
                              {/* € */}
                              {payments[0]?.currency ?? "KES"}{" "}
                              {txn.amount.toFixed(2)}
                            </div>
                            {txn.reference && (
                              <p className="text-ls text-gray-500">
                                {txn.reference}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <span className="font-medium">
                              {txn.customerName}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {formatDate(txn.date)}
                          </div>
                        </div>

                        {txn.status === "failed" && (
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline">
                              Retry Payment
                            </Button>
                            <Button size="sm" variant="outline">
                              Contact Support
                            </Button>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No transactions found</p>
              <p className="text-sm">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Your transaction history will appear here"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
