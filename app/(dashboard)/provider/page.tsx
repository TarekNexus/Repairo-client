/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loader from "@/components/dashboard/Loader";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { ShoppingCart, UserCheck, UserMinus } from "lucide-react";

import { getAllOrders } from "@/action/order/getAllOrders";
import { getAllservicesByProvider } from "@/action/provider/getAllservicesByProvider";

export default function SellerDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [ordersChartData, setOrdersChartData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalServices: 0,
    PENDING: 0,
    ACCEPTED: 0,
    ON_THE_WAY: 0,
    COMPLETED: 0,
    CANCELED: 0,
  
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const ordersRes = await getAllOrders();
      const servicesRes = await getAllservicesByProvider();

      const orders = ordersRes?.data || ordersRes || [];
      const services = servicesRes?.data || servicesRes || [];

      const statusCounts: Record<string, number> = {};
  

      orders.forEach((order: any) => {
        // Booking status count
        const bookingStatus = (order.bookingStatus || "UNKNOWN").trim().toUpperCase();
        statusCounts[bookingStatus] = (statusCounts[bookingStatus] || 0) + 1;

      });

      // Prepare orders chart data
      const ordersByDate: Record<string, number> = {};
      orders.forEach((order: any) => {
        if (!order.createdAt) return;
        const date = new Date(order.createdAt).toISOString().slice(0, 10);
        ordersByDate[date] = (ordersByDate[date] || 0) + 1;
      });

      const chartData = Object.keys(ordersByDate)
        .map(date => ({ date, orders: ordersByDate[date] }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setOrdersChartData(chartData);

      setStats({
        totalOrders: orders.length,
        totalServices: services.length,
        PENDING: statusCounts["PENDING"] || 0,
        ACCEPTED: statusCounts["ACCEPTED"] || 0,
        ON_THE_WAY: statusCounts["ON_THE_WAY"] || 0,
        COMPLETED: statusCounts["COMPLETED"] || 0,
        CANCELED: statusCounts["CANCELED"] || 0,
     
      });
    } catch (error) {
      console.error("Failed to fetch seller stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  const statsCards = [
    { title: "Total Orders", value: stats.totalOrders, icon: <ShoppingCart size={24} color="#a855f7" /> },
    { title: "Pending Orders", value: stats.PENDING, icon: <UserCheck size={24} color="#facc15" /> },
    { title: "Accepted Orders", value: stats.ACCEPTED, icon: <UserCheck size={24} color="#3b82f6" /> },
    { title: "On The Way", value: stats.ON_THE_WAY, icon: <UserMinus size={24} color="#8b5cf6" /> },
    { title: "Completed Orders", value: stats.COMPLETED, icon: <UserCheck size={24} color="#16a34a" /> },
    { title: "Cancelled Orders", value: stats.CANCELED, icon: <ShoppingCart size={24} color="#ef4444" /> },

  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full space-y-6">
      <h1 className="text-3xl font-bold text-[#5ce1e6] font-satoshi">Provider Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((card) => (
          <Card
            key={card.title}
            className="border-2 border-[#5ce1e6] shadow-md hover:shadow-lg transition"
          >
            <CardHeader className="flex items-center gap-4">
              {card.icon}
              <CardTitle className="text-lg font-satoshi font-semibold">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold font-satoshi text-[#5ce1e6]">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          className="bg-[#5ce1e6] hover:bg-[#ff6f1f] font-satoshi w-full"
          onClick={() => router.push("/provider/orders")}
        >
          View Orders
        </Button>

        <Button
          className="bg-[#5ce1e6] hover:bg-[#ff6f1f] font-satoshi w-full"
          onClick={() => router.push("/provider/services")}
        >
          Manage Services
        </Button>
      </div>

      {/* Orders Chart */}
      <div className="bg-white shadow-md rounded-xl p-2 md:p-5 border">
        <h2 className="text-2xl lg:text-3xl font-satoshi font-bold text-[#5ce1e6] mb-4">
          Orders Overview
        </h2>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={ordersChartData}>
            <defs>
              <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5ce1e6" stopOpacity={0.9} />
                <stop offset="50%" stopColor="#FFB38A" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#FFE5D6" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#5ce1e6"
              strokeWidth={3}
              fill="url(#ordersGradient)"
              dot={{ r: 4, fill: "#5ce1e6" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}