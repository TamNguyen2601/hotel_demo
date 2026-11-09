import React, { useState, useEffect, useCallback } from 'react';
import './index.css';
import './responsive.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import FoodPage from './pages/FoodPage';
import SpaPage from './pages/SpaPage';
import ExplorePage from './pages/ExplorePage';

// Map URL path → page name và ngược lại
const PATH_TO_PAGE = {
  '/': 'home',
  '/phong': 'rooms',
  '/do-an': 'food',
  '/suc-khoe': 'spa',
  '/kham-pha': 'explore',
};

const PAGE_TO_PATH = {
  home: '/',
  rooms: '/phong',
  food: '/do-an',
  spa: '/suc-khoe',
  explore: '/kham-pha',
  'room-detail': '/phong/chi-tiet',
};

// Đọc state từ URL hiện tại khi khởi động
const getInitialState = () => {
  const path = window.location.pathname;
  const pageName = PATH_TO_PAGE[path] || (path.startsWith('/phong/') ? 'room-detail' : 'home');
  const params = {};
  if (path === '/phong') {
    const sp = new URLSearchParams(window.location.search);
    params.filter = sp.get('filter') || 'all';
  }
  return { name: pageName, params };
};

function App() {
  const [page, setPage] = useState(getInitialState);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookedRoomIds, setBookedRoomIds] = useState(new Set());

  const handleBookingConfirmed = (roomId) => {
    setBookedRoomIds(prev => new Set([...prev, roomId]));
  };

  // Scroll to top khi đổi trang
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page.name, selectedRoom]);

  // Đẩy URL mới vào history
  const pushHistory = useCallback((pageName, params = {}) => {
    let path = PAGE_TO_PATH[pageName] || '/';
    let search = '';
    if (pageName === 'rooms' && params.filter && params.filter !== 'all') {
      search = `?filter=${params.filter}`;
    }
    const url = path + search;
    // Chỉ push nếu URL thực sự thay đổi
    if (window.location.pathname + window.location.search !== url) {
      window.history.pushState({ pageName, params }, '', url);
    }
  }, []);

  // Hàm navigate chính — cập nhật state + URL
  const navigate = useCallback((pageName, params = {}) => {
    setPage({ name: pageName, params });
    if (pageName !== 'room-detail') setSelectedRoom(null);
    pushHistory(pageName, params);
  }, [pushHistory]);

  // Lắng nghe nút Back/Forward của trình duyệt
  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state && e.state.pageName) {
        const { pageName, params } = e.state;
        setPage({ name: pageName, params: params || {} });
        if (pageName !== 'room-detail') setSelectedRoom(null);
      } else {
        // Fallback: đọc lại từ URL
        const path = window.location.pathname;
        const pageName = PATH_TO_PAGE[path] || 'home';
        const params = {};
        if (path === '/phong') {
          const sp = new URLSearchParams(window.location.search);
          params.filter = sp.get('filter') || 'all';
        }
        setPage({ name: pageName, params });
        setSelectedRoom(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Khởi tạo history state cho trang đầu tiên (để popstate hoạt động ngay từ đầu)
  useEffect(() => {
    const initialPage = getInitialState();
    window.history.replaceState(
      { pageName: initialPage.name, params: initialPage.params },
      '',
      window.location.pathname + window.location.search
    );
  }, []);

  const handleViewRoomDetail = (room) => {
    setSelectedRoom(room);
    setPage({ name: 'room-detail', params: {} });
    window.history.pushState(
      { pageName: 'room-detail', params: { roomId: room.id } },
      '',
      `/phong/${room.number}`
    );
  };

  const handleBackFromDetail = () => {
    // Dùng browser back thay vì navigate thủ công
    window.history.back();
  };

  const renderPage = () => {
    switch (page.name) {
      case 'home':
        return <HomePage onNavigate={navigate} />;

      case 'rooms':
        return (
          <RoomsPage
            initialFilter={page.params?.filter || 'all'}
            onViewDetail={handleViewRoomDetail}
            bookedRoomIds={bookedRoomIds}
            onBookingConfirmed={handleBookingConfirmed}
            onNavigate={navigate}
          />
        );

      case 'room-detail':
        return selectedRoom ? (
          <RoomDetailPage
            room={selectedRoom}
            isBooked={bookedRoomIds.has(selectedRoom.id)}
            onBack={handleBackFromDetail}
            onNavigateToRooms={() => navigate('rooms', { filter: 'all' })}
            onBookingConfirmed={handleBookingConfirmed}
            onNavigate={navigate}
          />
        ) : (
          // Nếu room bị mất (ví dụ refresh trang chi tiết), về trang phòng
          <RoomsPage
            initialFilter="all"
            onViewDetail={handleViewRoomDetail}
            bookedRoomIds={bookedRoomIds}
            onBookingConfirmed={handleBookingConfirmed}
            onNavigate={navigate}
          />
        );

      case 'food':
        return <FoodPage />;

      case 'spa':
        return <SpaPage onNavigate={navigate} />;

      case 'explore':
        return <ExplorePage onNavigate={navigate} />;

      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="app">
      <Navbar currentPage={page.name} onNavigate={navigate} />
      <main style={{ minHeight: '100vh' }}>
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
