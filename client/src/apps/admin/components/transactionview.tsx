import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Download,
  Calendar,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "payment" | "refund" | "deposit" | "withdrawal";
  amount: number;
  status: "completed" | "pending" | "failed" | "processing";
  method: "card" | "bank_transfer" | "mobile_money" | "cash";
  customerName: string;
  customerEmail?: string;
  date: Date;
  reference: string;
  fee?: number;
}

export default function TransactionView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [transactions] = useState<Transaction[]>([
    {
      id: "TXN001",
      type: "payment",
      amount: 2800.0,
      status: "completed",
      method: "card",
      customerName: "Alice Johnson",
      customerEmail: "alice@example.com",
      date: new Date(2024, 2, 15, 10, 30),
      reference: "REF-2024-0315-001",
      fee: 28.0,
    },
    {
      id: "TXN002",
      type: "payment",
      amount: 450.0,
      status: "pending",
      method: "bank_transfer",
      customerName: "Bob Smith",
      customerEmail: "bob@example.com",
      date: new Date(2024, 2, 15, 14, 15),
      reference: "REF-2024-0315-002",
      fee: 4.5,
    },
    {
      id: "TXN003",
      type: "refund",
      amount: 120.0,
      status: "processing",
      method: "card",
      customerName: "David Wilson",
      customerEmail: "david@example.com",
      date: new Date(2024, 2, 14, 16, 45),
      reference: "REF-2024-0314-003",
    },
    {
      id: "TXN004",
      type: "payment",
      amount: 1950.0,
      status: "completed",
      method: "mobile_money",
      customerName: "Carol Davis",
      customerEmail: "carol@example.com",
      date: new Date(2024, 2, 14, 9, 20),
      reference: "REF-2024-0314-004",
      fee: 19.5,
    },
    {
      id: "TXN005",
      type: "withdrawal",
      amount: 5000.0,
      status: "completed",
      method: "bank_transfer",
      customerName: "Business Account",
      date: new Date(2024, 2, 13, 15, 0),
      reference: "REF-2024-0313-005",
      fee: 25.0,
    },
    {
      id: "TXN006",
      type: "payment",
      amount: 680.0,
      status: "failed",
      method: "card",
      customerName: "Emma Brown",
      customerEmail: "emma@example.com",
      date: new Date(2024, 2, 13, 11, 30),
      reference: "REF-2024-0313-006",
    },
    {
      id: "TXN007",
      type: "deposit",
      amount: 10000.0,
      status: "completed",
      method: "bank_transfer",
      customerName: "Business Account",
      date: new Date(2024, 2, 12, 9, 0),
      reference: "REF-2024-0312-007",
    },
  ]);

  const formatDate = (date: Date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${month} ${day}, ${year} at ${hours}:${minutes}`;
  };

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.reference.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || txn.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      case "processing":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "payment":
      case "deposit":
        return <ArrowDownLeft className="w-5 h-5 text-green-600" />;
      case "refund":
      case "withdrawal":
        return <ArrowUpRight className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getMethodBadge = (method: Transaction["method"]) => {
    const colors = {
      card: "bg-purple-100 text-purple-700",
      bank_transfer: "bg-blue-100 text-blue-700",
      mobile_money: "bg-green-100 text-green-700",
      cash: "bg-gray-100 text-gray-700",
    };
    return colors[method];
  };

  const totalTransactions = transactions.filter(
    (t) => t.status === "completed"
  ).length;
  const totalRevenue = transactions
    .filter(
      (t) =>
        (t.type === "payment" || t.type === "deposit") &&
        t.status === "completed"
    )
    .reduce((sum, txn) => sum + txn.amount, 0);
  const pendingAmount = transactions
    .filter((t) => t.status === "pending")
    .reduce((sum, txn) => sum + txn.amount, 0);

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
        <Card className="shadow-soft h-30" style={{ animationDelay: "0.1s" }}>
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
                  ${totalRevenue.toFixed(2)}
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
                  ${pendingAmount.toFixed(2)}
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
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by ID, reference, customer name..."
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
                        {getTypeIcon(txn.type)}
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
                              ${txn.amount.toFixed(2)}
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
                          {txn.customerEmail && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span>{txn.customerEmail}</span>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <Badge
                            className={getMethodBadge(txn.method)}
                            variant="outline"
                          >
                            <CreditCard className="w-3 h-3 mr-1" />
                            {txn.method.replace("_", " ")}
                          </Badge>
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

                        {txn.status === "pending" && (
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline">
                              View Details
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
