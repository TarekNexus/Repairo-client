
"use client";

import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { getMyOrders } from "@/action/customer/getMyOrders";
import { cancelOrder } from "@/action/customer/cancelOrder";

interface Customer {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

interface Provider {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string | null;
}

interface Category {
  id: string;
  name: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string | null;
  location: string;
  provider: Provider;
  category: Category;
}

interface Payment {
  id: string;
  amount: number;
  method: string;
  transactionId: string;
  status: string;
}

interface Order {
  id: string;
  bookingStatus: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  address: string;
  phone: string;
  customer: Customer;
  service: Service;
  payment: Payment | null;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelingOrderId, setCancelingOrderId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const brandColor = "#5ce1e6";

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getMyOrders();
      if (res.success) setOrders(res.data);
      else console.error("Failed to fetch orders");
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    setCancelingOrderId(orderId);
    const res = await cancelOrder(orderId);
    setCancelingOrderId(null);

    if (res.success) {
      toast.success("Booking canceled successfully");
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, bookingStatus: "CANCELED" } : order
        )
      );
    } else toast.error("Failed to cancel booking");
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-[#C2F8CB] text-gray-800";
      case "ACCEPTED":
        return "bg-yellow-200 text-yellow-800";
      case "ON_THE_WAY":
        return "bg-blue-200 text-blue-800";
      case "COMPLETED":
        return "bg-green-200 text-green-800";
      case "CANCELED":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const getPaymentBadgeColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-200 text-green-800";
      case "PENDING":
        return "bg-yellow-200 text-yellow-800";
      case "FAILED":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-10 h-10" style={{ color: brandColor }} />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No bookings found.
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <h1 className="lg:text-3xl md:text-3xl text-2xl font-bold text-[#5ce1e6] mb-4">
        My Bookings
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white flex flex-col md:flex-row md:justify-between md:items-center"
          >
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{order.service.title}</h2>
              <p className="text-gray-600 text-sm mb-2">
                Booking Date: {new Date(order.date).toLocaleString()}
              </p>
              <span
                className={`inline-block mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                  order.bookingStatus
                )}`}
              >
                {order.bookingStatus}
              </span>
            </div>

            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setSelectedOrder(order)}
                className="px-4 py-2 rounded text-white font-medium transition"
                style={{ backgroundColor: brandColor }}
              >
                View Details
              </button>

              {order.bookingStatus === "PENDING" && (
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  disabled={cancelingOrderId === order.id}
                  className="px-4 py-2 rounded text-white font-medium transition disabled:opacity-50"
                  style={{ backgroundColor: "#FF4D00" }}
                >
                  {cancelingOrderId === order.id ? "Canceling..." : "Cancel Booking"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Booking Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2
              className="text-2xl font-bold mb-4 text-center md:text-left"
              style={{ color: brandColor }}
            >
              Booking Details
            </h2>

            <p className="mb-2">
              <span className="font-semibold">Booking ID:</span> {selectedOrder.id}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Booking Date:</span>{" "}
              {new Date(selectedOrder.date).toLocaleString()}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded ${getStatusBadgeColor(
                  selectedOrder.bookingStatus
                )}`}
              >
                {selectedOrder.bookingStatus}
              </span>
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Service Details:</h3>
              <p>
                <span className="font-medium">Title:</span> {selectedOrder.service.title}
              </p>
              <p>
                <span className="font-medium">Description:</span>{" "}
                {selectedOrder.service.description}
              </p>
              <p>
                <span className="font-medium">Category:</span>{" "}
                {selectedOrder.service.category.name}
              </p>
              <p>
                <span className="font-medium">Provider:</span>{" "}
                {selectedOrder.service.provider.name}
              </p>
              <p>
                <span className="font-medium">Price:</span> ${selectedOrder.service.price}
              </p>
              {selectedOrder.service.image && (
                <div className="w-32 h-32 relative mt-2">
                  <Image
                    src={selectedOrder.service.image}
                    alt={selectedOrder.service.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </div>

            <div className="mt-4 border-t pt-3 text-sm sm:text-base">
              <h3 className="font-semibold mb-2">Customer & Payment:</h3>
              <p>
                <span className="font-medium">Name:</span> {selectedOrder.customer.name}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {selectedOrder.phone}
              </p>
              <p>
                <span className="font-medium">Address:</span> {selectedOrder.address}
              </p>

              {selectedOrder.payment ? (
                <>
                  <p>
                    <span className="font-medium">Payment Method:</span>{" "}
                    {selectedOrder.payment.method}
                  </p>
                  <p>
                    <span className="font-medium">Payment Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full font-semibold text-sm ${getPaymentBadgeColor(
                        selectedOrder.payment.status
                      )}`}
                    >
                      {selectedOrder.payment.status}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Amount:</span> $
                    {selectedOrder.payment.amount}
                  </p>
                </>
              ) : (
                <p className="text-gray-500 italic">No payment information available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}