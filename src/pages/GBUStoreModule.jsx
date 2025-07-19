import { useState } from "react";
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
  User,
} from "lucide-react";
import StatsCard from "../components/Statscard"; 

// Custom UI Components
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg border border-gray-200 ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 border-b border-transparent ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-600 mt-1 ${className}`}>{children}</p>
);

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "default",
  size = "default",
  className = "cursor-pointer",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"; // Added transition

  const variants = {
    default: "bg-black text-white hover:bg-black/80 focus:ring-black hover:shadow-md hover:scale-[1.02]", // Added shadow and scale
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-black hover:shadow-sm hover:scale-[1.02]", // Added shadow and scale
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500 hover:scale-[1.02]", // Added scale
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 hover:shadow-md hover:scale-[1.02]", // Added shadow and scale
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    outline: "border border-gray-300 text-gray-700",
    secondary: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

const Input = ({ placeholder, value, onChange, className = "", type = "text" }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${className}`}
  />
);

// New Tabs UI Components (React Context based)
import * as React from "react";

const TabsContext = React.createContext();

const Tabs = ({ defaultValue, value: propValue, onValueChange, children, ...props }) => {
  const [localValue, setLocalValue] = React.useState(defaultValue);
  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : localValue;

  const handleValueChange = (newValue) => {
    if (!isControlled) setLocalValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className="w-full" {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`w-full flex h-[48px] items-center justify-between rounded-xl bg-[#f1f5f9] p-1 ${className}`}
      role="tablist"
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { parentProps: props });
        }
        return child;
      })}
    </div>
  );
});
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(
  ({ className = "", value, parentProps, children, ...props }, ref) => {
    const { value: contextValue, onValueChange } = React.useContext(TabsContext);
    const isActive = value === contextValue;

    const handleClick = () => {
      onValueChange(value);
    };

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        onClick={handleClick}
        className={`flex-1 h-8px inline-flex items-center justify-center rounded-md p-1 text-muted-foreground grid w-full grid-cols-4 focus:outline-none cursor-pointer
         ${isActive
            ? "bg-white text-black shadow-sm"
            : "text-muted-foreground hover:text-foreground"
          } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(
  ({ className = "", value, children, ...props }, ref) => {
    const { value: contextValue } = React.useContext(TabsContext);
    const isActive = value === contextValue;

    return isActive ? (
      <div
        ref={ref}
        role="tabpanel"
        className={`mt-4 px-4 sm:px-8 ${className}`}
        {...props}
      >
        {children}
      </div>
    ) : null;
  }
);
TabsContent.displayName = "TabsContent";


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
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
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
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen">
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

      {/* Quick Stats - Using StatsCard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Active Stores"
          value={12}
          icon={Store}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <StatsCard
          title="Cart Items"
          value={cart.length}
          icon={ShoppingCart}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <StatsCard
          title="Cart Total"
          value={`₹${getTotalAmount()}`}
          icon={CreditCard}
          color="text-purple-600"
          bgColor="bg-purple-100"
        />
        <StatsCard
          title="Available Riders"
          value={riders.filter(rider => rider.available).length}
          icon={Truck}
          color="text-orange-600"
          bgColor="bg-orange-100"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="products"
          >
            Products
          </TabsTrigger>
          <TabsTrigger
            value="cart"
          >
            Cart ({cart.length})
          </TabsTrigger>
          <TabsTrigger
            value="orders"
          >
            Orders
          </TabsTrigger>
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