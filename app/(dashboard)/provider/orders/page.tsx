"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Loader from "@/components/dashboard/Loader";
import { getAllOrders } from "@/action/order/getAllOrders";
import { updateOrderStatus } from "@/action/order/updateOrderStatus";

// Order Status type
type OrderStatus =
  | "PENDING"
  | "ACCEPTED"
  | "ON_THE_WAY"
  | "COMPLETED"
  | "CANCELLED";

// Badge color helper
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-200 text-yellow-800";
    case "ACCEPTED":
      return "bg-blue-200 text-blue-800";
    case "ON_THE_WAY":
      return "bg-purple-200 text-purple-800";
    case "COMPLETED":
      return "bg-green-200 text-green-800";
    case "CANCELLED":
      return "bg-red-200 text-red-800";
    case "PAID":
      return "bg-green-100 text-green-800 font-semibold";
    case "UNPAID":
      return "bg-red-100 text-red-800 font-semibold";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

// Types
type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
};
type Customer = { id: string; name: string; email: string };
type Payment = {
  id: string;
  amount: number;
  method: string;
  status: string;
} | null;

type Order = {
  id: string;
  customerId: string;
  serviceId: string;
  providerId: string;
  date: string;
  address: string;
  phone: string;
  bookingStatus: OrderStatus;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  service: Service;
  customer: Customer;
  payment: Payment;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch using server action
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders(); // ✅ server action
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders ❌");
    } finally {
      setLoading(false);
    }
  };

  // Update status using server action
  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      const updated = await updateOrderStatus(orderId, status); // ✅ server action
      if (updated?.bookingStatus) {
        toast.success("Order updated successfully ✅");
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId
              ? { ...o, bookingStatus: updated.bookingStatus }
              : o,
          ),
        );
      } else {
        toast.error("Failed to update order ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order ❌");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-60">
        <Loader />
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="lg:text-3xl text-2xl font-bold text-[#5ce1e6] mb-4">
        Orders Management
      </h1>

      <div className="w-full overflow-x-auto rounded-lg">
        <Table className="w-full whitespace-nowrap border">
          <TableHeader>
            <TableRow className="bg-[#5ce1e6] text-white">
              <TableHead>No</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Booking Status</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.id.slice(0, 8)}...</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell className="truncate max-w-40" title={order.address}>
                  {order.address}
                </TableCell>
                <TableCell>
                  <Select
                    value={order.bookingStatus}
                    onValueChange={(val: OrderStatus) =>
                      handleStatusChange(order.id, val)
                    }
                    disabled={updatingId === order.id}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="ACCEPTED">ACCEPTED</SelectItem>
                      <SelectItem value="ON_THE_WAY">ON_THE_WAY</SelectItem>
                      <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                      <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${getStatusBadgeColor(
                      order.payment?.status || "UNPAID",
                    )}`}
                  >
                    {order.payment?.status || "UNPAID"}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    className="bg-[#5ce1e6]"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 p-4 flex items-start sm:items-center justify-center bg-black/50 overflow-y-auto">
          <div className="bg-white w-[85vw] sm:w-150 max-h-[90vh] shadow-lg flex flex-col">
            <div className="px-4 py-2 flex justify-end">
              <button onClick={() => setSelectedOrder(null)}>✕</button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              <h2 className="text-lg font-semibold text-center">
                Order Details
              </h2>

              <p>
                <span className="font-medium">Order ID:</span>{" "}
                {selectedOrder.id}
              </p>
              <p>
                <span className="font-medium">Booking Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full ${getStatusBadgeColor(selectedOrder.bookingStatus)}`}
                >
                  {selectedOrder.bookingStatus}
                </span>
              </p>
              <p>
                <span className="font-medium">Payment Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full ${getStatusBadgeColor(selectedOrder.payment?.status || "UNPAID")}`}
                >
                  {selectedOrder.payment?.status || "UNPAID"}
                </span>
              </p>

              <div className="border-t pt-2">
                <h3 className="font-semibold">Customer Info</h3>
                <p>Name: {selectedOrder.customer.name}</p>
                <p>Phone: {selectedOrder.phone}</p>
                <p>Address: {selectedOrder.address}</p>
              </div>

              <div className="border-t pt-2">
                <h3 className="font-semibold">Service Info</h3>
                <p>Title: {selectedOrder.service.title}</p>
                <p>Description: {selectedOrder.service.description}</p>
                <p>Price: ${selectedOrder.service.price}</p>
              </div>

              <div className="border-t pt-2">
                <h3 className="font-semibold">Payment Info</h3>
                <p>Amount: ${selectedOrder.payment?.amount || 0}</p>
                <p>Method: {selectedOrder.payment?.method || "N/A"}</p>
                <p>Status: {selectedOrder.payment?.status || "UNPAID"}</p>
              </div>
            </div>

            <div className="px-4 py-4 flex justify-end border-t">
              <Button onClick={() => setSelectedOrder(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
