// Categories — exactly as requested by the user
export const categories = [
  { id: 1, name: 'Mobile Phones',   icon: '📱', gradient: 'from-blue-500 to-cyan-400',   color: '#3B82F6' },
  { id: 2, name: 'TV',              icon: '📺', gradient: 'from-slate-700 to-slate-500',  color: '#475569' },
  { id: 3, name: 'Laptop',          icon: '💻', gradient: 'from-indigo-500 to-blue-400',  color: '#6366F1' },
  { id: 4, name: 'Neckband',        icon: '🎵', gradient: 'from-purple-500 to-violet-400',color: '#A855F7' },
  { id: 5, name: 'Earphones',       icon: '🎧', gradient: 'from-teal-500 to-cyan-400',    color: '#14B8A6' },
]

export const brands = [
  { id: 1, name: 'Apple',    tagline: 'Think Different',       bg: 'from-slate-800 to-slate-600', logo: '🍎' },
  { id: 2, name: 'Samsung',  tagline: "Do What You Can't",     bg: 'from-blue-800 to-blue-600',   logo: '🔵' },
  { id: 3, name: 'Motorola', tagline: 'Hello Moto',            bg: 'from-gray-800 to-gray-600',   logo: '〽️' },
  { id: 4, name: 'POCO',     tagline: 'Flagship Killer',       bg: 'from-yellow-700 to-yellow-500',logo: '⚡' },
]

export const heroBanners = [
  {
    id: 1,
    title: 'Bulk iPhone Deals',
    subtitle: 'B2B Ecommerce',
    desc: 'Order in bulk & save more. Apple, Samsung, Motorola & more.',
    cta: 'Shop Bulk',
    bg: 'from-[#0F172A] via-[#1e3a5f] to-[#2D9DBB]',
    accent: '#2D9DBB',
    emoji: '📱💻',
    badge: 'BULK PRICING',
  },
  {
    id: 2,
    title: 'Latest Smartphones',
    subtitle: 'iPhone 16 Series',
    desc: 'Apple iPhone 16, 16 Plus, 16 Pro & 17 Pro — all in stock.',
    cta: 'Shop iPhones',
    bg: 'from-[#1a1a2e] via-[#16213e] to-[#0f3460]',
    accent: '#4db8d4',
    emoji: '🍎📱',
    badge: 'BRAND NEW / SEALED',
  },
  {
    id: 3,
    title: 'Android Flash Sale',
    subtitle: 'POCO · Samsung · Motorola',
    desc: 'Best 5G Android phones for bulk corporate procurement.',
    cta: 'Browse Android',
    bg: 'from-[#1a0533] via-[#3d1069] to-[#6d28d9]',
    accent: '#a78bfa',
    emoji: '🤖⚡',
    badge: 'WHOLESALE RATES',
  },
]

// Specific Unsplash photo IDs — all smartphones / electronics
const PHONE_IMGS = {
  // Apple iPhones
  'APL-001': '1511707171634-5f897ff02aa9', // iPhone black on white
  'APL-002': '1567581935884-3349723552ca', // iPhone in hand
  'APL-003': '1592750475338-74b7b21085ab', // iPhone Plus side
  'APL-004': '1632661674596-df8be070a5c5', // iPhone pink/coloured
  'APL-005': '1580910051074-3eb694886505', // iPhone Pro titanium
  'APL-006': '1601944179066-29786cb9d32a', // iPhone 16e front
  'APL-007': '1574920162082-b872afd2054a', // iPhone white
  'APL-008': '1612531385149-0c25e4d0b5ea', // iPhone 15 blue
  'APL-009': '1559771576-6ec17b0fc432',    // iPhone pink
  'APL-010': '1556656793-08538906a9f8',    // iPhone 17 pro silver
  // Android
  'AND-001': '1598327105666-5b89351aff97', // POCO blue
  'AND-002': '1574944985070-8f3ebc6b79d2', // POCO black
  'AND-003': '1610945415295-d9bbf067e59c', // Samsung Galaxy blue
  'AND-004': '1565849904461-04a58ad377e0', // POCO black
  'AND-005': '1584473457409-ae5c91d211ff', // Motorola blue
  'AND-006': '1603891128711-11b4b03bb138', // Motorola edge
  'AND-007': '1591337676887-a217a8b4b5c3', // Redmi blue
  'AND-008': '1620288627223-53302f4e8c74', // Samsung S25 navy
  'AND-009': '1628815113969-0487917e8b76', // OPPO purple
  'AND-010': '1631281957716-eb8f1f72a9df', // Realme blue
  // Mixed
  'OTH-001': '1585386959604-600af1e57ed3', // iPhone 13 white
  'OTH-002': '1553179584-8f5c56d78f38',    // iPhone 15 Pro titanium
  'OTH-003': '1610945415295-d9bbf067e59c', // Samsung S25 FE navy
  'OTH-004': '1505740420928-5e560c06d30e', // OnePlus earphones neckband
  'OTH-005': '1496181133206-80ce9b88a853', // MacBook laptop
  'OTH-006': '1584473457409-ae5c91d211ff', // Motorola amazonite
  'OTH-007': '1574944985070-8f3ebc6b79d2', // Vivo gold
  'OTH-008': '1598327105666-5b89351aff97', // POCO black
  'OTH-009': '1511707171634-5f897ff02aa9', // iPhone 17 black
  'OTH-010': '1610945415295-d9bbf067e59c', // Samsung M17e violet
}
const img = (sku) => {
  const id = PHONE_IMGS[sku]
  return id
    ? `https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&q=80`
    : `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&q=80`
}

// All 30 products from the Excel file with realistic INR B2B prices
export const products = [
  // ─── APPLE IPHONES ───────────────────────────────────────────────
  {
    id: 1, sku: 'APL-001',
    name: 'Apple iPhone 16 128GB Black',
    brand: 'Apple', category: 'Mobile Phones', subcategory: 'iPhone 16',
    desc: '6.1" OLED · A18 chip · 48MP dual camera · USB-C · Apple Intelligence',
    features: 'A18 Chip | 6.1" Super Retina XDR OLED | 48MP Dual Camera | Camera Control | Action Button | USB-C | Face ID | Apple Intelligence | MagSafe | IP68',
    ram: '8 GB', storage: '128 GB', color: 'Black', condition: 'Brand New / Sealed',
    price: 75900, mrp: 84900, discount: 11, rating: 4.9, reviews: 28940,
    image: img('APL-001'), badge: 'Best Seller', delivery: '2–3 Days', stock: 50, isTrending: true, isNew: false,
    minOrder: 5,
  },
  {
    id: 2, sku: 'APL-002',
    name: 'Apple iPhone 16 128GB White',
    brand: 'Apple', category: 'Mobile Phones', subcategory: 'iPhone 16',
    desc: '6.1" OLED · A18 chip · 48MP dual camera · MagSafe · Apple Intelligence',
    features: 'A18 Chip | 6.1" OLED | 48MP Dual Camera | Camera Control | Action Button | USB-C | MagSafe | Face ID | IP68',
    ram: '8 GB', storage: '128 GB', color: 'White', condition: 'Brand New / Sealed',
    price: 75900, mrp: 84900, discount: 11, rating: 4.8, reviews: 19210,
    image: img('APL-002'), badge: 'Popular', delivery: '2–3 Days', stock: 45, isTrending: true, isNew: false,
    minOrder: 5,
  },
  {
    id: 3, sku: 'APL-003',
    name: 'Apple iPhone 16 Plus 128GB Black',
    brand: 'Apple', category: 'Mobile Phones', subcategory: 'iPhone 16 Plus',
    desc: '6.7" OLED · A18 chip · Extended battery · 48MP dual camera',
    features: 'A18 Chip | 6.7" OLED | 48MP Dual Camera | Extended Battery | Camera Control | Action Button | MagSafe | USB-C | IP68',
    ram: '8 GB', storage: '128 GB', color: 'Black', condition: 'Brand New / Sealed',
    price: 89900, mrp: 99900, discount: 10, rating: 4.8, reviews: 12400,
    image: img('APL-003'), badge: 'Big Screen', delivery: '2–3 Days', stock: 30, isTrending: false, isNew: false,
    minOrder: 5,
  },
  {
    id: 4, sku: 'APL-004',
    name: 'Apple iPhone 16 Plus 256GB Pink',
    brand: 'Apple', category: 'Mobile Phones', subcategory: 'iPhone 16 Plus',
    desc: '6.7" OLED · A18 chip · 256GB · 48MP camera · MagSafe',
    features: 'A18 Chip | 6.7" OLED | 256GB Storage | 48MP Dual Camera | Action Button | MagSafe | USB-C | Face ID | IP68',
    ram: '8 GB', storage: '256 GB', color: 'Pink', condition: 'Brand New / Sealed',
    price: 99900, mrp: 109900, discount: 9, rating: 4.7, reviews: 8760,
    image: img('APL-004'), badge: 'New Color', delivery: '2–3 Days', stock: 20, isTrending: false, isNew: false,
    minOrder: 5,
  },
  {
    id: 5, sku: 'APL-005',
    name: 'Apple iPhone 16 Pro 256GB Black',
    brand: 'Apple', category: 'Mobile Phones', subcategory: 'iPhone 16 Pro',
    desc: 'A18 Pro · 6.3" ProMotion OLED · 48MP triple camera · Titanium · USB 3',
    features: 'A18 Pro Chip | 6.3" ProMotion OLED | 48MP Triple Camera | 5× Optical Zoom | Titanium Frame | Camera Control | USB 3 | MagSafe | IP68',
    ram: '8 GB', storage: '256 GB', color: 'Black Titanium', condition: 'Brand New / Sealed',
    price: 119900, mrp: 134900, discount: 11, rating: 4.9, reviews: 21300,
    image: img('APL-005'), badge: 'Pro Pick', delivery: '2–3 Days', stock: 25, isTrending: true, isNew: false,
    minOrder: 3,
  },
  {
    id: 6, sku: 'APL-006',
    name: 'Apple iPhone 16e 128GB Black',
    brand: 'Apple', category: 'Mobile Phones', subcategory: 'iPhone 16e',
    desc: 'A18 chip · 6.1" OLED · 48MP camera · Apple Intelligence · Affordable',
    features: 'A18 Chip | Apple C1 Modem | 6.1" OLED | 48MP Camera | Action Button | USB-C | Face ID | Apple Intelligence | IP68',
    ram: '8 GB', storage: '128 GB', color: 'Black', condition: 'Brand New / Sealed',
    price: 59900, mrp: 69900, discount: 14, rating: 4.7, reviews: 15200,
    image: img('APL-006'), badge: 'Best Value', delivery: '2–3 Days', stock: 60, isTrending: true, isNew: true,
    minOrder: 10,
  },
  {
    id: 7, sku: 'APL-007',
    name: 'Apple iPhone 16e 256GB White',
    brand: 'Apple', category: 'Mobile Phones', subcategory: 'iPhone 16e',
    desc: 'A18 chip · 256GB · 6.1" OLED · Apple C1 modem · USB-C',
    features: 'A18 Chip | Apple C1 Modem | 256GB | 48MP Camera | Action Button | USB-C | Apple Intelligence | IP68',
    ram: '8 GB', storage: '256 GB', color: 'White', condition: 'Brand New / Sealed',
    price: 69900, mrp: 79900, discount: 13, rating: 4.7, reviews: 9870,
    image: img('APL-007'), badge: 'More Storage', delivery: '2–3 Days', stock: 40, isTrending: false, isNew: true,
    minOrder: 10,
  },
  {
    id: 8, sku: 'APL-008',
    name: 'Apple iPhone 15 128GB Blue',
    brand: 'Apple', category: 'Mobile Phones', subcategory: 'iPhone 15',
    desc: 'Dynamic Island · 48MP camera · A16 Bionic · USB-C · 6.1" OLED',
    features: 'A16 Bionic | 6.1" OLED | Dynamic Island | 48MP Camera | USB-C | Face ID | MagSafe | IP68',
    ram: '6 GB', storage: '128 GB', color: 'Blue', condition: 'Brand New / Sealed',
    price: 64900, mrp: 79900, discount: 19, rating: 4.8, reviews: 34200,
    image: img('APL-008'), badge: 'Bulk Deal', delivery: '2–3 Days', stock: 80, isTrending: false, isNew: false,
    minOrder: 10,
  },
  {
    id: 9, sku: 'APL-009',
    name: 'Apple iPhone 15 128GB Pink',
    brand: 'Apple', category: 'Mobile Phones', subcategory: 'iPhone 15',
    desc: 'Dynamic Island · Colour-infused glass · A16 Bionic · 48MP · USB-C',
    features: 'A16 Bionic | 6.1" OLED | Dynamic Island | 48MP Camera | Colour-Infused Glass | USB-C | MagSafe | IP68',
    ram: '6 GB', storage: '128 GB', color: 'Pink', condition: 'Brand New / Sealed',
    price: 64900, mrp: 79900, discount: 19, rating: 4.7, reviews: 22800,
    image: img('APL-009'), badge: 'Clearance', delivery: '2–3 Days', stock: 70, isTrending: false, isNew: false,
    minOrder: 10,
  },
  {
    id: 10, sku: 'APL-010',
    name: 'Apple iPhone 17 Pro 256GB Silver',
    brand: 'Apple', category: 'Mobile Phones', subcategory: 'iPhone 17 Pro',
    desc: 'A19 Pro · ProMotion 120Hz · Advanced pro camera · Titanium · iOS 26',
    features: 'A19 Pro Chip | 6.3" ProMotion 120Hz OLED | Advanced Pro Camera | Titanium Frame | USB 3 | Apple Intelligence | MagSafe | IP68',
    ram: '12 GB', storage: '256 GB', color: 'Silver', condition: 'Brand New / Sealed',
    price: 134900, mrp: 149900, discount: 10, rating: 5.0, reviews: 4800,
    image: img('APL-010'), badge: '🔥 Latest', delivery: '3–5 Days', stock: 15, isTrending: true, isNew: true,
    minOrder: 2,
  },

  // ─── ANDROID ─────────────────────────────────────────────────────
  {
    id: 11, sku: 'AND-001',
    name: 'POCO M7 Plus 5G 8/128GB Aqua Blue',
    brand: 'POCO (Xiaomi)', category: 'Mobile Phones', subcategory: 'POCO M7 Plus',
    desc: 'Snapdragon 6s Gen 3 · 6.67" 120Hz AMOLED · 50MP · 5000mAh · 45W',
    features: 'Snapdragon 6s Gen 3 | 6.67" 120Hz AMOLED | 50MP Triple Camera | 5000mAh | 45W Fast Charge | 5G | 8GB RAM',
    ram: '8 GB', storage: '128 GB', color: 'Aqua Blue', condition: 'Brand New / Sealed',
    price: 17999, mrp: 22999, discount: 22, rating: 4.5, reviews: 18700,
    image: img('AND-001'), badge: 'Value Pick', delivery: '2–3 Days', stock: 100, isTrending: true, isNew: true,
    minOrder: 20,
  },
  {
    id: 12, sku: 'AND-002',
    name: 'POCO C85 5G 6/128GB Power Black',
    brand: 'POCO (Xiaomi)', category: 'Mobile Phones', subcategory: 'POCO C85',
    desc: 'Dimensity 6300 · 6.9" display · 6000mAh battery · 50MP camera · 5G',
    features: 'Dimensity 6300 | 6.9" HD+ Display | 6000mAh Battery | 50MP Camera | 5G | Side Fingerprint | 6GB RAM',
    ram: '6 GB', storage: '128 GB', color: 'Power Black', condition: 'Brand New / Sealed',
    price: 10999, mrp: 13999, discount: 21, rating: 4.3, reviews: 12400,
    image: img('AND-002'), badge: 'Budget 5G', delivery: '2–3 Days', stock: 150, isTrending: false, isNew: true,
    minOrder: 20,
  },
  {
    id: 13, sku: 'AND-003',
    name: 'Samsung Galaxy F70E 6/128GB Blue',
    brand: 'Samsung', category: 'Mobile Phones', subcategory: 'Galaxy F70E',
    desc: '6GB RAM · 128GB · Large display · 50MP camera · OneUI · 5G',
    features: '6GB RAM | 128GB Storage | Large Display | Multi-Camera System | Long Battery | OneUI | 5G',
    ram: '6 GB', storage: '128 GB', color: 'Blue', condition: 'Brand New / Sealed',
    price: 19999, mrp: 25999, discount: 23, rating: 4.4, reviews: 8900,
    image: img('AND-003'), badge: 'Samsung', delivery: '2–3 Days', stock: 80, isTrending: false, isNew: true,
    minOrder: 10,
  },
  {
    id: 14, sku: 'AND-004',
    name: 'POCO C85X 5G 4/128GB Power Black',
    brand: 'POCO (Xiaomi)', category: 'Mobile Phones', subcategory: 'POCO C85X',
    desc: 'Affordable 5G · 4GB RAM · 128GB · Large battery · HyperOS',
    features: '5G Connectivity | 4GB RAM | 128GB Storage | Large Battery | 50MP Camera | HyperOS | USB-C',
    ram: '4 GB', storage: '128 GB', color: 'Power Black', condition: 'Brand New / Sealed',
    price: 9499, mrp: 12999, discount: 27, rating: 4.2, reviews: 9200,
    image: img('AND-004'), badge: 'Entry 5G', delivery: '2–3 Days', stock: 200, isTrending: false, isNew: true,
    minOrder: 25,
  },
  {
    id: 15, sku: 'AND-005',
    name: 'Motorola Edge 60 Fusion 8/128GB Mykonos Blue',
    brand: 'Motorola', category: 'Mobile Phones', subcategory: 'Edge 60 Fusion',
    desc: 'pOLED display · Dimensity 7300 · 50MP OIS · 5000mAh · 68W TurboPower',
    features: 'Dimensity 7300 | pOLED Display | 120Hz | 50MP OIS Camera | 5000mAh | 68W TurboPower | 5G | 8GB RAM',
    ram: '8 GB', storage: '128 GB', color: 'Mykonos Blue', condition: 'Brand New / Sealed',
    price: 21999, mrp: 28999, discount: 24, rating: 4.6, reviews: 11200,
    image: img('AND-005'), badge: 'pOLED', delivery: '2–3 Days', stock: 60, isTrending: true, isNew: true,
    minOrder: 10,
  },
  {
    id: 16, sku: 'AND-006',
    name: 'Motorola Edge 70 Fusion 8/256GB Blue Surf',
    brand: 'Motorola', category: 'Mobile Phones', subcategory: 'Edge 70 Fusion',
    desc: 'Upgraded pOLED 120Hz · 256GB · 50MP OIS · 68W TurboPower · Dolby Vision',
    features: 'pOLED 120Hz | 256GB Storage | 50MP OIS Camera | 68W TurboPower | 5G | 8GB RAM | Dolby Atmos',
    ram: '8 GB', storage: '256 GB', color: 'Blue Surf', condition: 'Brand New / Sealed',
    price: 26999, mrp: 33999, discount: 21, rating: 4.6, reviews: 7800,
    image: img('AND-006'), badge: 'Top Spec', delivery: '2–3 Days', stock: 45, isTrending: true, isNew: true,
    minOrder: 10,
  },
  {
    id: 17, sku: 'AND-007',
    name: 'Redmi A7 Pro 4/128GB Blue',
    brand: 'Xiaomi (Redmi)', category: 'Mobile Phones', subcategory: 'Redmi A7 Pro',
    desc: '50MP camera · 128GB · Large display · 5000mAh · Entry-level powerhouse',
    features: '50MP Camera | 128GB Storage | Large Battery | Big Display | 4GB RAM | USB-C | Fingerprint',
    ram: '4 GB', storage: '128 GB', color: 'Blue', condition: 'Brand New / Sealed',
    price: 8499, mrp: 11999, discount: 29, rating: 4.1, reviews: 16400,
    image: img('AND-007'), badge: 'Budget', delivery: '2–3 Days', stock: 250, isTrending: false, isNew: true,
    minOrder: 25,
  },
  {
    id: 18, sku: 'AND-008',
    name: 'Samsung Galaxy S25 Plus 12/256GB Navy',
    brand: 'Samsung', category: 'Mobile Phones', subcategory: 'Galaxy S25 Plus',
    desc: 'Snapdragon 8 Elite · Galaxy AI · 200MP · 6.7" AMOLED 2X 120Hz',
    features: 'Snapdragon 8 Elite | 12GB RAM | 200MP Triple Camera | 6.7" AMOLED 2X 120Hz | Galaxy AI | 5G | USB 3.2 | IP68',
    ram: '12 GB', storage: '256 GB', color: 'Navy', condition: 'Brand New / Sealed',
    price: 94999, mrp: 109999, discount: 14, rating: 4.9, reviews: 9800,
    image: img('AND-008'), badge: 'Galaxy AI', delivery: '2–3 Days', stock: 20, isTrending: true, isNew: true,
    minOrder: 3,
  },
  {
    id: 19, sku: 'AND-009',
    name: 'OPPO K13 5G 8/128GB Purple',
    brand: 'OPPO', category: 'Mobile Phones', subcategory: 'OPPO K13',
    desc: '5G · 8GB RAM · 64MP camera · SUPERVOOC fast charge · ColorOS',
    features: '5G | 8GB RAM | 64MP Camera | Fast Charging | 6.7" Display | ColorOS | Fingerprint | USB-C',
    ram: '8 GB', storage: '128 GB', color: 'Purple', condition: 'Brand New / Sealed',
    price: 22999, mrp: 29999, discount: 23, rating: 4.4, reviews: 6700,
    image: img('AND-009'), badge: 'Stylish', delivery: '2–3 Days', stock: 70, isTrending: false, isNew: true,
    minOrder: 10,
  },
  {
    id: 20, sku: 'AND-010',
    name: 'Realme P4 Lite 5G 4/128GB Blue',
    brand: 'Realme', category: 'Mobile Phones', subcategory: 'Realme P4 Lite',
    desc: '5G for everyone · 50MP camera · 5000mAh · 45W fast charge',
    features: '5G | 50MP Camera | Large Battery | Smooth Display | 128GB Storage | Fast Charge | Fingerprint',
    ram: '4 GB', storage: '128 GB', color: 'Blue', condition: 'Brand New / Sealed',
    price: 11999, mrp: 15999, discount: 25, rating: 4.3, reviews: 14200,
    image: img('AND-010'), badge: '5G Entry', delivery: '2–3 Days', stock: 180, isTrending: false, isNew: true,
    minOrder: 20,
  },

  // ─── MIXED / ADDITIONAL ──────────────────────────────────────────
  {
    id: 21, sku: 'OTH-001',
    name: 'Apple iPhone 13 128GB White',
    brand: 'Apple', category: 'Mobile Phones', subcategory: 'iPhone 13',
    desc: 'A15 Bionic · Dual 12MP · Cinematic Mode · 5G · MagSafe',
    features: 'A15 Bionic | 6.1" OLED | Dual 12MP Camera | Cinematic Mode | 5G | MagSafe | Face ID | IP68',
    ram: '4 GB', storage: '128 GB', color: 'White', condition: 'Brand New / Sealed',
    price: 49900, mrp: 69900, discount: 29, rating: 4.7, reviews: 52000,
    image: img('OTH-001'), badge: 'Great Value', delivery: '2–3 Days', stock: 100, isTrending: false, isNew: false,
    minOrder: 10,
  },
  {
    id: 22, sku: 'OTH-002',
    name: 'iPhone 15 Pro 1TB Blue Titanium',
    brand: 'Apple', category: 'Mobile Phones', subcategory: 'iPhone 15 Pro',
    desc: 'A17 Pro · Titanium · 1TB · 5× zoom · 48MP · USB 3 · Action Button',
    features: 'A17 Pro | Titanium Frame | 1TB Storage | 5× Optical Zoom | 48MP Main | USB 3 | ProRes Video | Action Button | IP68',
    ram: '8 GB', storage: '1 TB', color: 'Blue Titanium', condition: 'Brand New / Sealed',
    price: 154900, mrp: 179900, discount: 14, rating: 4.9, reviews: 3800,
    image: img('OTH-002'), badge: 'Max Storage', delivery: '3–5 Days', stock: 8, isTrending: false, isNew: false,
    minOrder: 2,
  },
  {
    id: 23, sku: 'OTH-003',
    name: 'Samsung Galaxy S25 FE 8/128GB Navy',
    brand: 'Samsung', category: 'Mobile Phones', subcategory: 'Galaxy S25 FE',
    desc: 'Fan Edition flagship · Galaxy AI · AMOLED · Triple camera · 5G',
    features: 'Flagship Processor | 8GB RAM | AMOLED Display | Triple Camera | Galaxy AI | 5G | IP68 | USB-C',
    ram: '8 GB', storage: '128 GB', color: 'Navy', condition: 'Brand New / Sealed',
    price: 59999, mrp: 74999, discount: 20, rating: 4.6, reviews: 5400,
    image: img('OTH-003'), badge: 'Fan Edition', delivery: '2–3 Days', stock: 35, isTrending: true, isNew: true,
    minOrder: 5,
  },
  {
    id: 24, sku: 'OTH-004',
    name: 'OnePlus Bullets Wireless Z3 Midnight',
    brand: 'OnePlus', category: 'Earphones', subcategory: 'Neckband',
    desc: '12.4mm drivers · 28hr battery · Warp Charge · IP55 · Magnetic quick switch',
    features: '12.4mm Drivers | 28hr Battery | Warp Charge | Magnetic Quick Switch | IP55 | Bluetooth 5.3 | Bass Boost',
    ram: 'N/A', storage: 'N/A', color: 'Midnight Black', condition: 'Brand New / Sealed',
    price: 1799, mrp: 2999, discount: 40, rating: 4.5, reviews: 34200,
    image: img('OTH-004'), badge: '28hr Battery', delivery: '1–2 Days', stock: 300, isTrending: true, isNew: true,
    minOrder: 50,
  },
  {
    id: 25, sku: 'OTH-005',
    name: 'MacBook Neo A18 Pro 8/256GB Indigo',
    brand: 'Apple', category: 'Laptop', subcategory: 'MacBook',
    desc: 'Apple A18 Pro · 8GB RAM · 256GB SSD · Liquid Retina · All-day battery',
    features: 'A18 Pro Chip | 8GB RAM | 256GB SSD | Liquid Retina Display | All-Day Battery | macOS | USB-C / MagSafe',
    ram: '8 GB', storage: '256 GB', color: 'Indigo', condition: 'Brand New / Sealed',
    price: 104900, mrp: 119900, discount: 13, rating: 4.9, reviews: 6200,
    image: img('OTH-005'), badge: 'MacBook', delivery: '3–5 Days', stock: 20, isTrending: true, isNew: true,
    minOrder: 3,
  },
  {
    id: 26, sku: 'OTH-006',
    name: 'Motorola Edge 60 Fusion 12/256GB Amazonite',
    brand: 'Motorola', category: 'Mobile Phones', subcategory: 'Edge 60 Fusion',
    desc: 'pOLED · 12GB RAM · 256GB · Dolby Vision · 50MP OIS · 68W TurboPower',
    features: 'Dimensity 7300 | 12GB RAM | 256GB | pOLED 120Hz Dolby Vision | 50MP OIS | 68W TurboPower | 5G | IP68',
    ram: '12 GB', storage: '256 GB', color: 'Amazonite', condition: 'Brand New / Sealed',
    price: 28999, mrp: 36999, discount: 22, rating: 4.7, reviews: 4900,
    image: img('OTH-006'), badge: 'Top RAM', delivery: '2–3 Days', stock: 35, isTrending: false, isNew: true,
    minOrder: 5,
  },
  {
    id: 27, sku: 'OTH-007',
    name: 'Vivo T4 Lite 5G 4/128GB Gold',
    brand: 'Vivo', category: 'Mobile Phones', subcategory: 'Vivo T4 Lite',
    desc: 'Slim 5G design · Gold finish · 128GB · 5000mAh · 44W fast charge',
    features: '5G | 4GB RAM | 128GB Storage | Large Battery | Fast Charge | Slim Design | Fingerprint | Funtouch OS',
    ram: '4 GB', storage: '128 GB', color: 'Gold', condition: 'Brand New / Sealed',
    price: 12999, mrp: 17999, discount: 28, rating: 4.2, reviews: 7600,
    image: img('OTH-007'), badge: 'Slim 5G', delivery: '2–3 Days', stock: 120, isTrending: false, isNew: true,
    minOrder: 20,
  },
  {
    id: 28, sku: 'OTH-008',
    name: 'POCO C71 6/128GB Black',
    brand: 'POCO (Xiaomi)', category: 'Mobile Phones', subcategory: 'POCO C71',
    desc: '6GB RAM · 128GB · Large display · 5000mAh battery · HyperOS',
    features: '6GB RAM | 128GB Storage | Large Display | Big Battery | HyperOS | Fingerprint | USB-C',
    ram: '6 GB', storage: '128 GB', color: 'Black', condition: 'Brand New / Sealed',
    price: 7999, mrp: 10999, discount: 27, rating: 4.1, reviews: 9800,
    image: img('OTH-008'), badge: 'Ultra Budget', delivery: '2–3 Days', stock: 300, isTrending: false, isNew: true,
    minOrder: 30,
  },
  {
    id: 29, sku: 'OTH-009',
    name: 'Apple iPhone 17 256GB Black',
    brand: 'Apple', category: 'Mobile Phones', subcategory: 'iPhone 17',
    desc: 'A19 chip · 120Hz ProMotion · 18MP Center Stage · Anti-reflective · iOS 26',
    features: 'A19 Chip | 120Hz ProMotion OLED | 18MP Center Stage Front Camera | Anti-Reflective Display | Apple Intelligence | MagSafe | USB-C | IP68',
    ram: '8 GB', storage: '256 GB', color: 'Black', condition: 'Brand New / Sealed',
    price: 89900, mrp: 99900, discount: 10, rating: 4.9, reviews: 2400,
    image: img('OTH-009'), badge: '🆕 iOS 26', delivery: '3–5 Days', stock: 18, isTrending: true, isNew: true,
    minOrder: 3,
  },
  {
    id: 30, sku: 'OTH-010',
    name: 'Samsung Galaxy M17e 5G 6/128GB Violet',
    brand: 'Samsung', category: 'Mobile Phones', subcategory: 'Galaxy M17e',
    desc: '5G battery monster · AMOLED · 6GB RAM · 25W charging · OneUI',
    features: '5G | 6GB RAM | 128GB | AMOLED Display | Large Battery | 25W Charging | OneUI | Side Fingerprint',
    ram: '6 GB', storage: '128 GB', color: 'Violet', condition: 'Brand New / Sealed',
    price: 17999, mrp: 22999, discount: 22, rating: 4.4, reviews: 11300,
    image: img('OTH-010'), badge: 'Battery King', delivery: '2–3 Days', stock: 90, isTrending: false, isNew: true,
    minOrder: 10,
  },
]

// Derived lists
export const dealProducts    = products.filter(p => p.discount >= 20).slice(0, 8)
export const trendingProducts = products.filter(p => p.isTrending)
export const newArrivals     = products.filter(p => p.isNew)
export const flashSaleProducts = products.filter(p => p.discount >= 27).slice(0, 6)
