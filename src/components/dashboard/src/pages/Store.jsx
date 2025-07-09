import React, { useState } from "react";
import { ShoppingCart, Store, Truck, CreditCard, Search, Filter, Heart } from "lucide-react";

const GBUStore = () => {
  const [activeTab, setActiveTab] = useState("products");

  const tabs = ["products", "cart", "orders"];

  const renderTabContent = () => {
    switch (activeTab) {
      case "products":
        return (
          <div className="mt-6">
            <div className="mb-4 flex items-center gap-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border rounded-lg"
              />
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                <Filter className="w-4 h-4" /> Filter
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {['All', 'Food', 'Electronics', 'Stationery', 'Beverages', 'Apparel'].map((cat) => (
                <button key={cat} className="bg-gray-100 text-sm px-4 py-1 rounded-full">{cat}</button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Campus Special Burger",
                  desc: "Delicious beef burger with fresh vegetables",
                  tag: "Food",
                  store: "GBU Cafeteria",
                  time: "10-15 mins",
                  price: 150,
                  original: 200,
                  rating: "4.5 (89 reviews)"
                },
                {
                  title: "Study Lamp - LED",
                  desc: "Adjustable LED study lamp with USB charging",
                  tag: "Electronics",
                  store: "TechHub Store",
                  time: "30-45 mins",
                  price: 899,
                  original: 1200,
                  rating: "4.2 (45 reviews)"
                },
                {
                  title: "Notebook Set (5 pcs)",
                  desc: "High quality notebooks for academic use",
                  tag: "Stationery",
                  store: "Campus Stationers",
                  time: "15-20 mins",
                  price: 250,
                  original: 300,
                  rating: "4.0 (67 reviews)"
                },
              ].map((item, index) => (
                <div key={index} className="border rounded-xl p-4 bg-white">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm font-semibold">{item.title}</div>
                    <Heart className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{item.desc}</p>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-500 mb-2 inline-block">
                    {item.tag}
                  </span>
                  <div className="text-xs text-gray-500 mb-1">{item.rating}</div>
                  <div className="text-xs text-gray-500 mb-1">{item.store}</div>
                  <div className="text-xs text-gray-500 mb-2">{item.time}</div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-green-600 font-bold mr-2">
                        ₹{item.price}
                      </span>
                      <span className="line-through text-gray-400">
                        ₹{item.original}
                      </span>
                    </div>
                    <button className="bg-gray-900 text-white px-3 py-1 rounded text-sm">
                      + Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "cart":
        return (
          <div className="mt-10 text-center text-gray-600">
            <ShoppingCart className="w-10 h-10 mx-auto mb-3 text-gray-400" />
            <p className="font-semibold">Your cart is empty</p>
            <p className="text-sm">Add some products to get started!</p>
          </div>
        );

      case "orders":
        return (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
            <p className="text-sm text-gray-600 mb-4">Track your order history and status</p>
            <div className="bg-white rounded-xl p-4 border">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Order #GBU001</p>
                  <p className="text-sm text-gray-600">Campus Special Burger × 2, Fresh Fruit Juice × 1</p>
                  <p className="text-xs text-gray-400">March 20, 2024</p>
                </div>
                <div className="text-right">
                  <span className="bg-black text-white text-xs px-3 py-1 rounded-full">Delivered</span>
                  <p className="text-sm font-semibold">₹380</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Order #GBU002</p>
                  <p className="text-sm text-gray-600">Study Lamp - LED × 1</p>
                  <p className="text-xs text-gray-400">March 22, 2024</p>
                </div>
                <div className="text-right">
                  <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">In Progress</span>
                  <p className="text-sm font-semibold">₹899</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">GBU Store & Startup Ecosystem</h1>
            <p className="text-sm">Shop from campus stores and student ventures</p>
          </div>
          <div className="bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-bold">
            GBU Wallet: ₹2500
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white rounded-lg shadow-sm p-4 mt-6">
        <div className="text-center">
          <Store className="mx-auto text-blue-500 mb-1" />
          <p className="font-semibold">12</p>
          <p className="text-sm text-gray-600">Active Stores</p>
        </div>
        <div className="text-center">
          <ShoppingCart className="mx-auto text-green-500 mb-1" />
          <p className="font-semibold">0</p>
          <p className="text-sm text-gray-600">Cart Items</p>
        </div>
        <div className="text-center">
          <CreditCard className="mx-auto text-purple-500 mb-1" />
          <p className="font-semibold">₹0</p>
          <p className="text-sm text-gray-600">Cart Total</p>
        </div>
        <div className="text-center">
          <Truck className="mx-auto text-orange-500 mb-1" />
          <p className="font-semibold">3</p>
          <p className="text-sm text-gray-600">Available Riders</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 bg-gray-100 rounded-lg flex justify-around text-sm font-medium text-gray-700 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 py-3 rounded-lg w-full text-center capitalize ${
              activeTab === tab ? "bg-white text-black shadow" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} ({tab === "cart" ? 0 : ""})
          </button>
        ))}
      </div>

      <div className="mt-6">{renderTabContent()}</div>
    </div>
  );
};

export default GBUStore;
