"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Clock,
  MapPin,
  Package,
  User,
  Info,
  Loader2,
  Wallet,
} from "lucide-react";
import Loader from "@/components/Loader";

interface OrderItem {
  item: {
    title: string;
    amount: number;
  };
  quantity: number;
}

interface Order {
  id: string;
  email: string;
  status: string;
  timestamp: string;
  houseStreet: string;
  landmark: string;
  state: string;
  pincode: string;
  items: OrderItem[];
  description?: string;
  paymentMethod: string;
}

const page = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const statusOptions = [
    "Unconfirmed",
    "Rejected",
    "Processing",
    "Dispatched",
    "Delivered",
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      const toastId = toast.loading("Loading orders...");
      try {
        const response = await fetch("/api/user/allOrders");
        toast.dismiss(toastId);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        // console.log(data.orders);
        if (data.orders.length == 0) {
          toast.error("No Orders Placed Yet");
        } else {
          toast.success("Orders loaded successfully!", { id: toastId });
        }
        setOrders(data.orders);
      } catch (error: any) {
        setError(error.message);
        toast.error(`Error: ${error.message}`, { id: toastId });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-10 text-gray-800 text-center">
        My Orders
      </h1>
      <div className="md:grid md:grid-cols-2 gap-8">
        {orders.map((order, index) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 mb-10"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Order #{order.id}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Unconfirmed"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "Rejected"
                      ? "bg-red-100 text-red-800"
                      : order.status === "Dispatched"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "Processing"
                      ? "bg-gray-200 text-gray-800"
                      : order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : ""
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <hr className="my-4" />
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <User className="w-5 h-5 mr-2 text-green-600" />
                  <span className="text-gray-600">{order.email}</span>
                </div>
                <div className="flex items-center mb-1">
                  <Clock className="w-5 h-5 mr-2 text-green-600" />
                  <span className="text-gray-600">
                    {new Date(order.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  <span className="text-gray-600 w-full">{`${order.houseStreet}, ${order.landmark}, ${order.state}, ${order.pincode}`}</span>
                </div>
                <div className="flex items-center">
                  <Wallet className="w-5 h-5 mr-2 text-green-600" />
                  <span className="text-gray-600 w-full">
                    {order.paymentMethod}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Order Items
                </h3>
                <ul className="space-y-2">
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <Package className="w-5 h-5 mr-2 text-green-600" />
                        <span className="text-gray-700">{item.item.title}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-600">
                          Qty: {item.quantity}
                        </span>
                        <span className="ml-4 text-gray-800 font-medium">
                          ₹{item.item.amount * item.quantity}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {order.description && (
                <div className="mt-4 p-3 rounded bg-green-100">
                  <span className="text-gray-700 font-medium flex items-center">
                    <Info className="w-5 h-5 mr-2 text-gray-500" />
                    Note: {order.description}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
