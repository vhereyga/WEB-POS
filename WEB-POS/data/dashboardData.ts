export interface HourlySalesData {
  time: string;
  sales: number;
  orders: number;
}

export interface TransactionItem {
  id: string;
  timestamp: string;
  amount: string;
  status: "Succeed" | "Pending" | "Failed";
}

export interface PopularProductItem {
  id: string;
  name: string;
  stock: number;
  category?: string;
  image?: string;
}

export interface StockEventItem {
  timestamp: string;
  name: string;
  event: "In" | "Out";
  quantity?: number;
}

export interface NavItem {
  name: string;
  iconName: string;
  path?: string;
  badge?: string;
  section?: "main" | "inventory" | "system";
  disabled?: boolean;
}

export const MAIN_MENU_ITEMS: NavItem[] = [
  {
    name: "Dashboard",
    iconName: "LayoutDashboard",
    section: "main",
    path: "/",
    disabled: false,
  },
  {
    name: "Cashier",
    iconName: "Store",
    section: "main",
    disabled: true,
  },
  {
    name: "Transaction",
    iconName: "ReceiptText",
    section: "main",
    disabled: true,
  },
];

export const INVENTORY_MENU_ITEMS: NavItem[] = [
  {
    name: "Master Item",
    iconName: "PackageCheck",
    section: "inventory",
    disabled: true,
  },
  {
    name: "Category",
    iconName: "Layers",
    section: "inventory",
    disabled: true,
  },
  {
    name: "Brand",
    iconName: "Tag",
    section: "inventory",
    disabled: true,
  },
  {
    name: "Units",
    iconName: "Scale",
    section: "inventory",
    disabled: true,
  },
  {
    name: "Master Price",
    iconName: "DollarSign",
    section: "inventory",
    disabled: true,
  },
  {
    name: "Purchase Order",
    iconName: "ShoppingBag",
    section: "inventory",
    disabled: true,
  },
  {
    name: "Supplier",
    iconName: "Truck",
    section: "inventory",
    disabled: true,
  },
  {
    name: "Receipt",
    iconName: "FileSpreadsheet",
    section: "inventory",
    disabled: true,
  },
  {
    name: "Report",
    iconName: "BarChart3",
    section: "system",
    disabled: true,
  },
  {
    name: "User Manager",
    iconName: "Users",
    section: "system",
    disabled: true,
  },
];

export const HOURLY_SALES_DATA: Record<string, HourlySalesData[]> = {
  "2024": [
    { time: "00:00", sales: 85, orders: 3 },
    { time: "02:00", sales: 40, orders: 1 },
    { time: "04:00", sales: 30, orders: 1 },
    { time: "06:00", sales: 120, orders: 5 },
    { time: "08:00", sales: 380, orders: 14 },
    { time: "10:00", sales: 620, orders: 22 },
    { time: "12:00", sales: 890, orders: 35 },
    { time: "14:00", sales: 540, orders: 19 },
    { time: "16:00", sales: 780, orders: 28 },
    { time: "18:00", sales: 950, orders: 38 },
    { time: "20:00", sales: 680, orders: 24 },
    { time: "22:00", sales: 320, orders: 11 },
  ],
  "2023": [
    { time: "00:00", sales: 60, orders: 2 },
    { time: "02:00", sales: 25, orders: 1 },
    { time: "04:00", sales: 20, orders: 1 },
    { time: "06:00", sales: 90, orders: 4 },
    { time: "08:00", sales: 290, orders: 10 },
    { time: "10:00", sales: 480, orders: 18 },
    { time: "12:00", sales: 710, orders: 26 },
    { time: "14:00", sales: 430, orders: 15 },
    { time: "16:00", sales: 620, orders: 21 },
    { time: "18:00", sales: 810, orders: 30 },
    { time: "20:00", sales: 510, orders: 17 },
    { time: "22:00", sales: 240, orders: 8 },
  ],
  "2025": [
    { time: "00:00", sales: 110, orders: 4 },
    { time: "02:00", sales: 55, orders: 2 },
    { time: "04:00", sales: 45, orders: 2 },
    { time: "06:00", sales: 160, orders: 7 },
    { time: "08:00", sales: 490, orders: 18 },
    { time: "10:00", sales: 820, orders: 30 },
    { time: "12:00", sales: 1150, orders: 42 },
    { time: "14:00", sales: 710, orders: 25 },
    { time: "16:00", sales: 990, orders: 34 },
    { time: "18:00", sales: 1240, orders: 48 },
    { time: "20:00", sales: 890, orders: 31 },
    { time: "22:00", sales: 410, orders: 15 },
  ],
};

export const SALES_TOTALS: Record<string, string> = {
  "2024": "$2,420.22",
  "2023": "$1,980.50",
  "2025": "$3,115.80",
};

export const LATEST_TRANSACTIONS: TransactionItem[] = [
  {
    id: "T21.0331",
    timestamp: "Today - 12:45",
    amount: "$50,000",
    status: "Succeed",
  },
  {
    id: "T21.0330",
    timestamp: "Today - 11:20",
    amount: "$12,400",
    status: "Succeed",
  },
  {
    id: "T21.0329",
    timestamp: "Today - 09:15",
    amount: "$8,650",
    status: "Succeed",
  },
  {
    id: "T21.0328",
    timestamp: "Today - 08:30",
    amount: "$24,500",
    status: "Succeed",
  },
  {
    id: "T21.0327",
    timestamp: "Yesterday - 17:10",
    amount: "$15,200",
    status: "Succeed",
  },
  {
    id: "T21.0326",
    timestamp: "Yesterday - 15:40",
    amount: "$6,800",
    status: "Succeed",
  },
];

export const POPULAR_PRODUCTS: PopularProductItem[] = [
  {
    id: "PZ.31547",
    name: "Rhinotomy machine x250",
    stock: 14,
    category: "Medical Tech",
  },
  {
    id: "PZ.31721",
    name: "Laptop Asus x249",
    stock: 14,
    category: "Electronics",
  },
  {
    id: "PZ.28491",
    name: "Digital Thermometer Pro",
    stock: 28,
    category: "Healthcare",
  },
  {
    id: "PZ.19482",
    name: "Surgical Gloves (Box 100)",
    stock: 52,
    category: "Consumables",
  },
  {
    id: "PZ.55120",
    name: "Medical Monitor 4K HD",
    stock: 8,
    category: "Displays",
  },
  {
    id: "PZ.44810",
    name: "Sterilizer UV-C Chamber",
    stock: 19,
    category: "Sanitation",
  },
];

export const STOCK_EVENTS: StockEventItem[] = [
  {
    timestamp: "Today - 13:10",
    name: "Rhinotomy machine x250",
    event: "In",
    quantity: 5,
  },
  {
    timestamp: "Today - 11:45",
    name: "Laptop Asus x249",
    event: "Out",
    quantity: 2,
  },
  {
    timestamp: "Today - 09:30",
    name: "Surgical Mask N95 Pro",
    event: "In",
    quantity: 50,
  },
  {
    timestamp: "Yesterday - 16:00",
    name: "Alcohol 70% 1L Dispenser",
    event: "Out",
    quantity: 12,
  },
  {
    timestamp: "Yesterday - 14:15",
    name: "Medical Monitor 4K HD",
    event: "In",
    quantity: 4,
  },
  {
    timestamp: "Yesterday - 10:20",
    name: "Digital Thermometer Pro",
    event: "Out",
    quantity: 8,
  },
];

export const USER_PROFILE = {
  name: "vhereyga putra pradana",
  role: "Administrator",
  initials: "VP",
  email: "vhereygapro@gmail.com",
};
