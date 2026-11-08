// ============================================================
// HOTEL DATA - Mộc Chàm Retreat & Restaurant
// ============================================================

export const HOTEL_INFO = {
  name: 'Mộc Chàm',
  fullName: 'Mộc Chàm Retreat & Restaurant',
  tagline: 'Nghỉ dưỡng đẳng cấp giữa lòng Cao Bằng',
  address: '123 Đường Trần Hưng Đạo, TP. Cao Bằng, tỉnh Cao Bằng',
  phone: '0263 123 4567',
  email: 'info@moccham.vn',
  stars: 5,
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
  'Giường đôi Queen size',
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
  'Giường đơn tiêu chuẩn',
  'Phòng tắm vòi hoa sen',
  'Cửa sổ thoáng mát',
  'TV 43 inch Full HD',
  'WiFi tốc độ cao',
  'Két an toàn điện tử',
  'Điều hòa 2 chiều',
  'Ấm đun nước & Trà/Cà phê',
  'Bộ đồ dùng vệ sinh',
];

// Premium Rooms - Floor 2 (201-208)
export const PREMIUM_ROOMS = Array.from({ length: 8 }, (_, i) => ({
  id: `room-2${String(i + 1).padStart(2, '0')}`,
  number: `2${String(i + 1).padStart(2, '0')}`,
  floor: 2,
  type: 'premium',
  typeName: 'Phòng Cao Cấp',
  price: 2800000 + i * 100000,
  priceWeekend: 3200000 + i * 100000,
  size: 45 + i * 2,
  maxGuests: 2,
  bedType: 'King size',
  description: `Phòng cao cấp ${200 + i + 1} mang đến trải nghiệm nghỉ dưỡng đẳng cấp 5 sao với nội thất sang trọng được thiết kế tinh tế, lấy cảm hứng từ văn hóa bản địa Cao Bằng. Từ ban công phòng, du khách có thể chiêm ngưỡng toàn cảnh núi rừng hùng vĩ và dòng sông Bằng thơ mộng chảy qua thành phố.`,
  shortDesc: 'Sang trọng với ban công view núi, bồn tắm Jacuzzi, dịch vụ quản gia riêng.',
  amenities: ROOM_AMENITIES_PREMIUM,
  images: [
    `https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80`,
    `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80`,
    `https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80`,
    `https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80`,
    `https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80`,
  ],
  thumbnail: `https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80`,
  available: i !== 2 && i !== 5,
}));

// Standard Double Rooms - Floor 3 (301-311)
export const DOUBLE_ROOMS = Array.from({ length: 11 }, (_, i) => ({
  id: `room-3${String(i + 1).padStart(2, '0')}`,
  number: `3${String(i + 1).padStart(2, '0')}`,
  floor: 3,
  type: 'double',
  typeName: 'Phòng Đôi Tiêu Chuẩn',
  price: 1500000 + i * 50000,
  priceWeekend: 1800000 + i * 50000,
  size: 28 + i,
  maxGuests: 2,
  bedType: 'Queen size',
  description: `Phòng đôi tiêu chuẩn ${300 + i + 1} là lựa chọn hoàn hảo cho các cặp đôi hoặc bạn bè muốn khám phá vẻ đẹp Cao Bằng. Phòng được thiết kế ấm cúng với màu sắc tươi sáng, nội thất gỗ tự nhiên mang phong cách núi rừng hiện đại. Phòng tắm rộng rãi với bồn tắm là điểm nhấn đặc biệt cho kỳ nghỉ của bạn.`,
  shortDesc: 'Phòng đôi ấm cúng với bồn tắm, view thành phố, lý tưởng cho cặp đôi.',
  amenities: ROOM_AMENITIES_DOUBLE,
  images: [
    `https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80`,
    `https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800&q=80`,
    `https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80`,
    `https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80`,
  ],
  thumbnail: `https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&q=80`,
  available: i !== 1 && i !== 7,
}));

// Standard Single Rooms - Floor 4 (401-411)
export const SINGLE_ROOMS = Array.from({ length: 11 }, (_, i) => ({
  id: `room-4${String(i + 1).padStart(2, '0')}`,
  number: `4${String(i + 1).padStart(2, '0')}`,
  floor: 4,
  type: 'single',
  typeName: 'Phòng Đơn Tiêu Chuẩn',
  price: 900000 + i * 30000,
  priceWeekend: 1100000 + i * 30000,
  size: 20 + i,
  maxGuests: 1,
  bedType: 'Single',
  description: `Phòng đơn tiêu chuẩn ${400 + i + 1} là không gian nghỉ ngơi lý tưởng cho du khách đơn thân hoặc khách công tác. Với thiết kế thông minh tối ưu không gian, phòng đầy đủ tiện nghi cần thiết giúp bạn có giấc ngủ ngon sau một ngày khám phá danh lam thắng cảnh Cao Bằng.`,
  shortDesc: 'Phòng đơn tiện nghi, thoải mái cho du khách đơn thân hoặc khách công tác.',
  amenities: ROOM_AMENITIES_SINGLE,
  images: [
    `https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80`,
    `https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80`,
    `https://images.unsplash.com/photo-1495433324511-bf8e92934d90?w=800&q=80`,
  ],
  thumbnail: `https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&q=80`,
  available: i !== 3 && i !== 9,
}));

export const ALL_ROOMS = [...PREMIUM_ROOMS, ...DOUBLE_ROOMS, ...SINGLE_ROOMS];

// ============================================================
// MENU DATA
// ============================================================

export const MENU_ITEMS = [
  {
    id: 'food-1',
    name: 'Lợn Quay Cao Bằng',
    category: 'Món chính',
    price: 320000,
    description: 'Lợn quay đặc sản Cao Bằng với lớp da giòn vàng óng, thịt mềm thơm ngậy được ướp theo bí quyết gia truyền của người Nùng. Món ăn không thể thiếu trong mỗi dịp lễ tết.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&q=80',
    tag: 'Đặc sản',
  },
  {
    id: 'food-2',
    name: 'Bánh Áp Chao',
    category: 'Món khai vị',
    price: 65000,
    description: 'Bánh áp chao - bánh rán giòn truyền thống của người Tày Cao Bằng. Nhân đậu xanh thơm bùi, lớp vỏ vàng giòn rụm, chấm cùng nước mắm ớt tươi.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    tag: 'Truyền thống',
  },
  {
    id: 'food-3',
    name: 'Khau Nhục Cao Bằng',
    category: 'Món chính',
    price: 180000,
    description: 'Thịt ba chỉ hầm mềm tan trong miệng với hỗn hợp gia vị đặc trưng: tương hoisin, ngũ vị hương và rau tương. Món ăn cầu kỳ, mất nhiều giờ chế biến.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80',
    tag: 'Đặc sản',
  },
  {
    id: 'food-4',
    name: 'Phở Chua Cao Bằng',
    category: 'Món bún phở',
    price: 75000,
    description: 'Phở chua - món ăn độc đáo chỉ có ở Cao Bằng với sợi phở gạo dai mềm, thịt vịt quay, dạ dày, lòng... chan nước sốt chua ngọt đậm đà.',
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80',
    tag: 'Đặc sản',
  },
  {
    id: 'food-5',
    name: 'Cá Trắm Nướng Than',
    category: 'Món hải sản',
    price: 250000,
    description: 'Cá trắm tươi từ hồ Thang Hen nuôi thả tự nhiên, nướng trên than hoa, ướp sả gừng và mắc khén - loại gia vị đặc trưng vùng núi Tây Bắc.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80',
    tag: 'Tươi sống',
  },
  {
    id: 'food-6',
    name: 'Rau Dớn Xào Tỏi',
    category: 'Món rau',
    price: 55000,
    description: 'Rau dớn - loại rau rừng đặc trưng của vùng núi Cao Bằng, xào tỏi thơm phức. Giàu vitamin, thanh mát, là món ăn kèm không thể thiếu.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
    tag: 'Đặc sản rừng',
  },
  {
    id: 'food-7',
    name: 'Lẩu Vịt Nấu Chao',
    category: 'Lẩu',
    price: 380000,
    description: 'Lẩu vịt với nước dùng đậm đà từ chao đỏ, kết hợp sả, gừng, và các loại rau đặc trưng. Phù hợp cho nhóm 2-3 người, ấm lòng trong tiết trời Cao Bằng se lạnh.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80',
    tag: 'Nhóm',
  },
  {
    id: 'food-8',
    name: 'Xôi Trắng Nướng Lá Dong',
    category: 'Món tráng miệng',
    price: 45000,
    description: 'Xôi nếp nương trắng ngần gói trong lá dong xanh mướt, nướng trên bếp than. Chấm muối vừng hoặc ăn kèm thịt kho - hương vị tuổi thơ khó quên.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80',
    tag: 'Truyền thống',
  },
  {
    id: 'food-9',
    name: 'Gà Đồi Cao Bằng Hấp Hành',
    category: 'Món chính',
    price: 290000,
    description: 'Gà đồi thả rông Cao Bằng, thịt chắc ngọt tự nhiên, hấp cùng hành lá và gừng tươi. Ăn kèm xôi nếp hoặc cơm trắng, chấm muối tiêu chanh.',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c8?w=400&q=80',
    tag: 'Đặc sản',
  },
  {
    id: 'food-10',
    name: 'Chè Lam Cao Bằng',
    category: 'Món tráng miệng',
    price: 35000,
    description: 'Chè lam - bánh truyền thống làm từ bột nếp, mạch nha, lạc rang và gừng. Vị ngọt thanh, dẻo thơm, là đặc sản mang về làm quà số một của Cao Bằng.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80',
    tag: 'Quà tặng',
  },
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
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1513623935135-c896b59073c1?w=600&q=80',
    distance: 'Nhiều địa điểm',
  },
];

// ============================================================
// SAUNA DATA
// ============================================================

export const SAUNA_FEATURES = [
  {
    icon: '🌿',
    title: 'Thảo Dược Núi Rừng',
    description: 'Sử dụng các loại thảo dược quý hiếm được thu hái từ rừng núi Cao Bằng: lá thuốc người Tày, gừng rừng, sả núi, ngải cứu rừng... kết hợp theo bí quyết dân gian cổ truyền.',
  },
  {
    icon: '💧',
    title: 'Nước Suối Khoáng',
    description: 'Nguồn nước khoáng thiên nhiên từ mạch ngầm núi đá vôi Cao Bằng, giàu khoáng chất có lợi cho da và sức khỏe. Nhiệt độ ổn định 38-42°C tối ưu cho quá trình thư giãn.',
  },
  {
    icon: '🏔️',
    title: 'Không Gian Núi Rừng',
    description: 'Khu xông hơi được thiết kế mở hướng ra thiên nhiên núi rừng Cao Bằng, tạo cảm giác hòa mình vào đất trời. Âm thanh tiếng suối chảy và tiếng chim hót giúp tâm trí thư thái hoàn toàn.',
  },
  {
    icon: '✨',
    title: 'Liệu Pháp Toàn Thân',
    description: 'Gói liệu trình hoàn chỉnh bao gồm: xông thảo dược, massage toàn thân, tắm muối khoáng và đắp mặt nạ bùn núi. Phục hồi năng lượng và làn da sau những ngày khám phá.',
  },
];

export const SAUNA_PACKAGES = [
  {
    id: 'sauna-basic',
    name: 'Gói Thư Giãn',
    duration: '60 phút',
    price: 350000,
    includes: ['Xông thảo dược 30 phút', 'Tắm muối khoáng', 'Trà thảo dược'],
  },
  {
    id: 'sauna-standard',
    name: 'Gói Phục Hồi',
    duration: '90 phút',
    price: 550000,
    includes: ['Xông thảo dược 45 phút', 'Massage vai gáy 30 phút', 'Tắm muối khoáng', 'Trà thảo dược & bánh ngọt'],
  },
  {
    id: 'sauna-premium',
    name: 'Gói Toàn Diện',
    duration: '120 phút',
    price: 850000,
    includes: ['Xông thảo dược 45 phút', 'Massage toàn thân 60 phút', 'Đắp mặt nạ bùn núi', 'Tắm muối khoáng', 'Trà thảo dược & bánh ngọt cao cấp'],
    recommended: true,
  },
];

