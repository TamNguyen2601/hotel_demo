// ============================================================
// HOTEL DATA - Mộc Chàm Retreat & Restaurant
// ============================================================

export const HOTEL_INFO = {
  name: 'Mộc Chàm',
  fullName: 'Mộc Chàm Retreat & Restaurant',
  tagline: 'Nghỉ dưỡng giữa lòng núi rừng Cao Bằng',
  address: 'Xã Đàm Thủy, tỉnh Cao Bằng',
  phone: '0868 111 126',
  email: 'info@moccham.vn',
};

// ============================================================
// ROOMS DATA
// ============================================================

const ROOM_AMENITIES_PREMIUM = [
  'Giường King size cao cấp',
  'Phòng tắm Jacuzzi riêng',
  'Ban công view núi',
  'TV 65 inch 4K',
  'Minibar sang trọng',
  'Dịch vụ phòng 24/7',
  'WiFi tốc độ cao',
  'Két an toàn điện tử',
  'Điều hòa 2 chiều',
  'Máy pha cà phê Nespresso',
  'Bộ đồ dùng vệ sinh cao cấp',
  'Chăm sóc quản gia riêng',
];

const ROOM_AMENITIES_DOUBLE = [
  '02 Giường đôi Queen size',
  'Phòng tắm bồn tắm',
  'Cửa sổ view thành phố',
  'TV 55 inch Full HD',
  'Minibar',
  'Dịch vụ phòng',
  'WiFi tốc độ cao',
  'Két an toàn điện tử',
  'Điều hòa 2 chiều',
  'Ấm đun nước & Trà/Cà phê',
  'Bộ đồ dùng vệ sinh',
];

const ROOM_AMENITIES_SINGLE = [
  '02 Giường đơn (1,2m × 2m)',
  'Phòng tắm vòi hoa sen',
  'Ban công thoáng mát',
  'Bàn làm việc nhỏ gọn',
  'TV 43 inch Full HD',
  'WiFi tốc độ cao',
  'Két an toàn điện tử',
  'Điều hòa 2 chiều',
  'Ấm đun nước & Trà/Cà phê',
  'Bộ đồ dùng vệ sinh',
];

// Premium Rooms - Floor 2 (201-208)
// Size cycles: 28, 29, 30, 28, 29, 30, 28, 29
const PREMIUM_SIZES = [28, 29, 30, 28, 29, 30, 28, 29];
export const PREMIUM_ROOMS = Array.from({ length: 8 }, (_, i) => ({
  id: `room-2${String(i + 1).padStart(2, '0')}`,
  number: `2${String(i + 1).padStart(2, '0')}`,
  floor: 2,
  type: 'premium',
  typeName: 'Phòng Cao Cấp',
  price: 1274000,
  priceWeekend: 1329000,
  size: PREMIUM_SIZES[i],
  maxGuests: 2,
  bedType: 'King size',
  description: `Phòng cao cấp ${200 + i + 1} mang đến trải nghiệm nghỉ dưỡng đẳng cấp 5 sao với nội thất sang trọng được thiết kế tinh tế, lấy cảm hứng từ văn hóa bản địa Cao Bằng. Phòng rộng ${PREMIUM_SIZES[i]}m² với ban công hướng ra núi rừng hùng vĩ, bồn tắm Jacuzzi riêng và dịch vụ quản gia tận tâm 24/7.`,
  shortDesc: `Diện tích ${PREMIUM_SIZES[i]}m²\nBan công view núi\nJacuzzi\nQuản gia riêng`,
  amenities: ROOM_AMENITIES_PREMIUM,
  images: [
    `https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80`,
    `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80`,
    `https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80`,
    `https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80`,
    `https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80`,
  ],
  thumbnail: `https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80`,
  available: true,
}));

// Standard Double Rooms - Floor 3 (301-311)
// Size alternates: 23, 24, 23, 24...
export const DOUBLE_ROOMS = Array.from({ length: 11 }, (_, i) => ({
  id: `room-3${String(i + 1).padStart(2, '0')}`,
  number: `3${String(i + 1).padStart(2, '0')}`,
  floor: 3,
  type: 'double',
  typeName: 'Phòng Đôi Tiêu Chuẩn',
  price: 879000,
  priceWeekend: 923000,
  size: i % 2 === 0 ? 23 : 24,
  maxGuests: 2,
  bedType: 'Queen size',
  description: `Phòng đôi tiêu chuẩn ${300 + i + 1} là lựa chọn hoàn hảo cho các cặp đôi hoặc bạn bè muốn khám phá vẻ đẹp Cao Bằng. Phòng ${i % 2 === 0 ? 23 : 24}m² được thiết kế ấm cúng với màu sắc tươi sáng, nội thất gỗ tự nhiên mang phong cách núi rừng hiện đại. Phòng tắm bồn tắm là điểm nhấn đặc biệt cho kỳ nghỉ của bạn.`,
  shortDesc: `Diện tích ${i % 2 === 0 ? 23 : 24}m²\nGiường Queen size\nBồn tắm\nView thành phố`,
  amenities: ROOM_AMENITIES_DOUBLE,
  images: [
    `https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80`,
    `https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800&q=80`,
    `https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80`,
    `https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80`,
  ],
  thumbnail: `https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&q=80`,
  available: true,
}));

// Standard Single Rooms - Floor 4 (401-411)
// Size cycles: 22, 23, 24, 22, 23, 24...
const SINGLE_SIZES = [22, 23, 24, 22, 23, 24, 22, 23, 24, 22, 23];
export const SINGLE_ROOMS = Array.from({ length: 11 }, (_, i) => ({
  id: `room-4${String(i + 1).padStart(2, '0')}`,
  number: `4${String(i + 1).padStart(2, '0')}`,
  floor: 4,
  type: 'single',
  typeName: 'Phòng Đơn Tiêu Chuẩn',
  price: 879000,
  priceWeekend: 923000,
  size: SINGLE_SIZES[i],
  maxGuests: 2,
  bedType: '2 giường đơn',
  description: `Phòng đơn tiêu chuẩn ${400 + i + 1} (${SINGLE_SIZES[i]}m²) chuyên phục vụ khách đi theo cặp bạn bè, đồng nghiệp hoặc khách đoàn công tác. Phòng bố trí 02 giường đơn (1,2m × 2m/giường), thiết kế tối ưu không gian linh hoạt, có bàn làm việc nhỏ gọn và ban công thoáng mát. Vệ sinh khép kín, trang bị đầy đủ tiện nghi thiết yếu.`,
  shortDesc: `Diện tích ${SINGLE_SIZES[i]}m²\n2 giường đơn\nBan công\nBàn làm việc`,
  amenities: ROOM_AMENITIES_SINGLE,
  images: [
    `https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80`,
    `https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80`,
    `https://images.unsplash.com/photo-1495433324511-bf8e92934d90?w=800&q=80`,
  ],
  thumbnail: `https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&q=80`,
  available: true,
}));

export const ALL_ROOMS = [...PREMIUM_ROOMS, ...DOUBLE_ROOMS, ...SINGLE_ROOMS];

// ============================================================
// MENU DATA - Nhà Hàng Mộc Chàm (theo menu thực tế)
// ============================================================

// SET ĐẶC BIỆT
export const MENU_SETS = [
  {
    id: 'set-1',
    name: 'Set 1: "Khám Phá Cao Bằng"',
    subtitle: 'Dành cho 2-3 người',
    originalPrice: 650000,
    price: 580000,
    items: [
      'Salad rau củ quả sốt chanh leo (1 đĩa)',
      'Mẹt lạp xưởng & Bò gác bếp lai rai (Size vừa)',
      'Khâu nhục tộc Tày (1 đĩa)',
      'Cơm trắng Hạt Ngọc Cao Bằng (1 niêu)',
      'Rau dạ hiến xào tỏi (1 đĩa)',
      'Canh miến dong Phia Đén hầm xương (1 bát)',
      'Thạch đen Thạch An sương sa (2 bát)',
    ],
    image: '/foods/set-1.jpg',
  },
  {
    id: 'set-2',
    name: 'Set 2: "Tuyệt Đỉnh Bản Giốc"',
    subtitle: 'Dành cho 6 người',
    originalPrice: 1345000,
    price: 1190000,
    items: [
      'Bánh áp chao chảo nóng (1 đĩa)',
      'Súp gà đồi nấu nấm hương Phia Đén (Size lớn)',
      'Mẹt lạp xưởng & Bò gác bếp lai rai (Size lớn)',
      'Vịt quay 7 vị Cao Bằng (Nửa con)',
      'Khâu nhục tộc Tày (2 đĩa)',
      'Rau dạ hiến xào thịt bò (2 đĩa)',
      'Cơm trắng hạt ngọc (2 niêu đất)',
      'Tráng miệng: Thạch đen Thạch An (6 bát)',
    ],
    image: '/foods/set-2.jpg',
  },
];

// MÓN KHAI VỊ
export const MENU_STARTERS = [
  {
    id: 'kv-1',
    name: 'Salad sốt rau củ sốt chanh leo',
    price: 65000,
    image: '/foods/salad-chanh-leo.jpg',
    category: 'Món khai vị',
  },
  {
    id: 'kv-2',
    name: 'Súp gà đồi nấu nấm hương phia đén',
    price: 85000,
    image: '/foods/sup-ga-doi.jpg',
    category: 'Món khai vị',
  },
  {
    id: 'kv-3',
    name: 'Bánh áp chao nóng',
    price: 80000,
    image: '/foods/banh-ap-chao.jpg',
    category: 'Món khai vị',
  },
  {
    id: 'kv-4',
    name: 'Phở chua Cao Bằng',
    price: 75000,
    image: '/foods/pho-chua.jpg',
    category: 'Món khai vị',
  },
];

// MÓN CHÍNH
export const MENU_MAINS = [
  {
    id: 'mc-1',
    name: 'Mẹt lạp xườn và bò gác bếp',
    price: 320000,
    image: '/foods/met-lap-xuong.jpg',
    category: 'Món chính',
  },
  {
    id: 'mc-2',
    name: 'Vịt quay 7 vị nửa con',
    price: 240000,
    image: '/foods/vit-quay-7-vi.jpg',
    category: 'Món chính',
  },
  {
    id: 'mc-3',
    name: 'Vịt quay 7 vị nguyên con',
    price: 460000,
    image: '/foods/vit-quay-7-vi.jpg',
    category: 'Món chính',
  },
  {
    id: 'mc-4',
    name: 'Khâu nhục tộc Tày',
    price: 190000,
    image: '/foods/khau-nhuc.jpg',
    category: 'Món chính',
  },
];

// RAU & TINH BỘT
export const MENU_VEGS = [
  {
    id: 'rau-1',
    name: 'Rau dạ hiến xào tỏi',
    price: 90000,
    image: '/foods/rau-da-hien-xao-toi.jpg',
    category: 'Rau & Tinh bột',
  },
  {
    id: 'rau-2',
    name: 'Rau dạ hiến xào bò',
    price: 145000,
    image: '/foods/rau-da-hien-xao-bo.jpg',
    category: 'Rau & Tinh bột',
  },
  {
    id: 'rau-3',
    name: 'Cơm rang lạp xườn',
    price: 125000,
    image: '/foods/com-rang-lap-xuong.png',
    category: 'Rau & Tinh bột',
  },
];

// CƠM & CANH
export const MENU_RICE = [
  {
    id: 'com-1',
    name: 'Cơm trắng Hạt Ngọc',
    price: 30000,
    image: '/foods/com-trang-hat-ngoc.jpg',
    category: 'Cơm & Canh',
  },
  {
    id: 'com-2',
    name: 'Canh miến dong Phia Đén nấm hương',
    price: 75000,
    image: '/foods/canh-mien-dong.jpg',
    category: 'Cơm & Canh',
  },
];

// TRÁNG MIỆNG
export const MENU_DESSERTS = [
  {
    id: 'tm-1',
    name: 'Thạch đen Thạch An',
    price: 35000,
    image: '/foods/thach-den-thach-an.jpg',
    category: 'Tráng miệng',
  },
  {
    id: 'tm-2',
    name: 'Bánh trôi tàu',
    price: 35000,
    image: '/foods/banh-troi-tau.jpg',
    category: 'Tráng miệng',
  },
];

// ĐỒ UỐNG
export const MENU_DRINKS_FREE = [
  { id: 'free-1', name: 'Trà lá vối', note: 'Miễn phí' },
];

export const MENU_DRINKS_PAID = [
  { id: 'drink-1', name: 'Nước lọc đóng chai', price: 15000 },
  { id: 'drink-2', name: 'Coca', price: 25000 },
  { id: 'drink-3', name: 'Nước ép/Sinh tố mận', price: 35000 },
  { id: 'drink-4', name: 'Nước chanh leo đá / dâu tằm đá', price: 45000 },
  { id: 'drink-5', name: 'Rượu ngô men lá Khau Nàng', price: 120000 },
];

// Legacy export (for BookingModal compatibility)
export const MENU_ITEMS = [
  ...MENU_STARTERS,
  ...MENU_MAINS,
  ...MENU_VEGS,
  ...MENU_RICE,
  ...MENU_DESSERTS,
];

// ============================================================
// CAO BANG ATTRACTIONS
// ============================================================

export const CAO_BANG_ATTRACTIONS = [
  {
    id: 'attr-1',
    name: 'Thác Bản Giốc',
    description: 'Thác nước đẹp nhất Việt Nam và lớn thứ 4 thế giới tại đường biên giới Việt - Trung. Dòng thác hùng vĩ trắng xóa đổ xuống từ độ cao 30m, tạo nên khung cảnh tuyệt mỹ.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    distance: '90 km từ trung tâm',
  },
  {
    id: 'attr-2',
    name: 'Hồ Thang Hen',
    description: 'Quần thể 36 hồ nước xanh biếc nằm giữa rừng nguyên sinh và núi đá vôi hùng vĩ. Vẻ đẹp hoang sơ, nguyên thủy của hồ Thang Hen khiến du khách như lạc vào chốn thần tiên.',
    image: '/cao-bang-hero.jpg',
    distance: '25 km từ trung tâm',
  },
  {
    id: 'attr-3',
    name: 'Núi Mắt Thần (Non Nước)',
    description: 'Ngọn núi đá vôi với lỗ thủng tự nhiên hình tròn như con mắt khổng lồ nhìn ra trời xanh - biểu tượng của Cao Bằng. Từ đây phóng tầm mắt ra khung cảnh sông hồ bao la.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
    distance: '60 km từ trung tâm',
  },
  {
    id: 'attr-4',
    name: 'Động Ngườm Ngao',
    description: 'Hang động đá vôi dài hơn 2.144m với những nhũ đá kỳ bí muôn hình vạn trạng. Ánh đèn chiếu sáng tô điểm thêm vẻ huyền ảo cho chốn tiên cảnh dưới lòng đất.',
    image: '/nguom-ngao.jpg',
    distance: '95 km từ trung tâm',
  },
  {
    id: 'attr-5',
    name: 'Khu Di Tích Pác Bó',
    description: 'Khu di tích lịch sử thiêng liêng - nơi Chủ tịch Hồ Chí Minh sống và làm việc những năm đầu kháng chiến. Suối Lê-nin, núi Các-Mác và hang Pác Bó là điểm đến không thể bỏ qua.',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
    distance: '55 km từ trung tâm',
  },
  {
    id: 'attr-6',
    name: 'Chợ Phiên Vùng Cao',
    description: 'Những phiên chợ văn hóa đặc sắc của đồng bào dân tộc thiểu số Tày, Nùng, Mông... Nơi giao thương và gặp gỡ, trưng bày các sản phẩm thổ cẩm, ẩm thực truyền thống.',
    image: '/cho-phien.jpg',
    distance: 'Nhiều địa điểm',
  },
];

// ============================================================
// SPA / WELLNESS DATA (formerly Sauna)
// ============================================================

export const SPA_FEATURES = [
  {
    icon: '🌿',
    title: 'Thảo Dược Người Dao / Tày',
    description: 'Sử dụng bài thuốc lá cổ truyền của người Dao và người Tày Cao Bằng. 04 bồn ngâm thảo dược được pha chế theo bí quyết dân gian, giúp lưu thông khí huyết và phục hồi năng lượng.',
  },
  {
    icon: '☁️',
    title: 'Phòng Xông Hơi View Mây',
    description: 'Phòng xông hơi thảo dược với tầm nhìn toàn cảnh mây trời và núi non hùng vĩ vùng biên giới. Trải nghiệm thư giãn tuyệt đối kết hợp thiên nhiên và liệu pháp truyền thống.',
  },
  {
    icon: '✨',
    title: 'Liệu Trình Toàn Diện',
    description: 'Gói spa hoàn chỉnh: ngâm lá thuốc, xông hơi thảo dược và massage phục hồi. Phục hồi năng lượng hoàn toàn sau chuyến khám phá Cao Bằng.',
  },
];

export const SPA_PACKAGES = [
  {
    id: 'spa-basic',
    name: 'Gói Thư Giãn',
    duration: '60 phút',
    price: 299000,
    includes: ['Ngâm lá thuốc 30 phút', 'Tắm muối khoáng 30 phút'],
  },
  {
    id: 'spa-standard',
    name: 'Gói Phục Hồi',
    duration: '90 phút',
    price: 499000,
    includes: ['Ngâm lá thuốc 45 phút', 'Xông hơi thảo dược', 'Massage vai gáy 30 phút'],
  },
  {
    id: 'spa-premium',
    name: 'Gói Toàn Diện',
    duration: '120 phút',
    price: 789000,
    includes: ['Ngâm lá thuốc 45 phút', 'Xông hơi thảo dược view mây', 'Massage toàn thân 60 phút', 'Đắp mặt nạ bùn núi'],
    recommended: true,
  },
];
