import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Store, 
  ShoppingCart, 
  CreditCard, 
  Truck, 
  Star,
  Search,
  Filter,
  Plus,
  Minus,
  Heart,
  MapPin,
  Clock,
  User
} from "lucide-react";

const GBUStoreModule = ({ user }) => {
  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [walletBalance] = useState(2500);

  // Mock store data
  const products = [
    {
      id: 1,
      name: "Campus Special Burger",
      category: "Food",
      price: 150,
      originalPrice: 200,
      image: "/placeholder.svg",
      rating: 4.5,
      reviews: 89,
      vendor: "GBU Cafeteria",
      delivery: "10-15 mins",
      inStock: true,
      description: "Delicious beef burger with fresh vegetables"
    },
    {
      id: 2,
      name: "Study Lamp - LED",
      category: "Electronics",
      price: 899,
      originalPrice: 1200,
      image: "/placeholder.svg",
      rating: 4.2,
      reviews: 45,
      vendor: "TechHub Store",
      delivery: "30-45 mins",
      inStock: true,
      description: "Adjustable LED study lamp with USB charging"
    },
    {
      id: 3,
      name: "Notebook Set (5 pcs)",
      category: "Stationery",
      price: 250,
      originalPrice: 300,
      image: "/placeholder.svg",
      rating: 4.0,
      reviews: 67,
      vendor: "Campus Stationers",
      delivery: "15-20 mins",
      inStock: true,
      description: "High quality notebooks for academic use"
    },
    {
      id: 4,
      name: "Fresh Fruit Juice",
      category: "Beverages",
      price: 80,
      originalPrice: 100,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 123,
      vendor: "Healthy Corner",
      delivery: "5-10 mins",
      inStock: true,
      description: "Fresh seasonal fruit juice"
    },
    {
      id: 5,
      name: "GBU T-Shirt",
      category: "Apparel",
      price: 599,
      originalPrice: 799,
      image: "/placeholder.svg",
      rating: 4.3,
      reviews: 34,
      vendor: "Campus Merchandise",
      delivery: "1-2 hours",
      inStock: false,
      description: "Official GBU branded t-shirt"
    }
  ];

  const categories = ["All", "Food", "Electronics", "Stationery", "Beverages", "Apparel"];
  
  const riders = [
    { id: 1, name: "Rahul Sharma", rating: 4.8, orders: 245, available: true },
    { id: 2, name: "Priya Singh", rating: 4.6, orders: 189, available: true },
    { id: 3, name: "Amit Kumar", rating: 4.9, orders: 312, available: false }
  ];

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="space-y-6">
    {/* Header */}
<div className="bg-gradient-to-r from-purple-900 to-blue-700 rounded-lg p-6 text-white">
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold mb-2">GBU Store & Startup Ecosystem</h1>
      <p className="text-purple-100">Shop from campus stores and student ventures</p>
    </div>

    {/* Store Logo + Wallet Box */}
    <div className="text-center">
      <div className="bg-white/20 rounded-lg p-4 flex flex-col items-center justify-center text-center">
        <Store className="h-8 w-8 text-white mb-1" />
        <div className="text-sm text-purple-100">GBU Wallet</div>
        <div className="text-lg font-bold">₹{walletBalance}</div>
      </div>
    </div>
  </div>
</div>


      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Store className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-600">12</div>
            <div className="text-sm text-gray-600">Active Stores</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <ShoppingCart className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-600">{cart.length}</div>
            <div className="text-sm text-gray-600">Cart Items</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CreditCard className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-purple-600">₹{getTotalAmount()}</div>
            <div className="text-sm text-gray-600">Cart Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Truck className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-orange-600">3</div>
            <div className="text-sm text-gray-600">Available Riders</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="cart">Cart ({cart.length})</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 flex-wrap">
                {categories.map((category) => (
                  <Badge key={category} variant="outline" className="cursor-pointer hover:bg-blue-50">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{product.vendor}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{product.delivery}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                      )}
                    </div>
                    <Button 
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      size="sm"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cart" className="space-y-6">
          {cart.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Your cart is empty</h3>
                <p className="text-gray-500">Add some products to get started!</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.vendor}</p>
                          <div className="text-lg font-bold text-green-600">₹{item.price}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Checkout Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{getTotalAmount()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span>₹20</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>₹{getTotalAmount() + 20}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm font-medium text-green-800">GBU Wallet Balance</div>
                      <div className="text-lg font-bold text-green-600">₹{walletBalance}</div>
                    </div>
                    
                    <Button className="w-full" size="lg">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay with GBU Wallet
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Available Riders */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Riders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {riders.filter(rider => rider.available).map((rider) => (
                      <div key={rider.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium">{rider.name}</div>
                            <div className="text-sm text-gray-600">{rider.orders} orders delivered</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{rider.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Track your order history and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Order #GBU001</div>
                    <Badge>Delivered</Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Campus Special Burger × 2, Fresh Fruit Juice × 1</div>
                  <div className="flex justify-between text-sm">
                    <span>March 20, 2024</span>
                    <span className="font-medium">₹380</span>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Order #GBU002</div>
                    <Badge variant="secondary">In Progress</Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Study Lamp - LED × 1</div>
                  <div className="flex justify-between text-sm">
                    <span>March 22, 2024</span>
                    <span className="font-medium">₹899</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GBUStoreModule;