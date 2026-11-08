import React, { useState, useEffect } from 'react';
import './index.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import FoodPage from './pages/FoodPage';
import SaunaPage from './pages/SaunaPage';

function App() {
  const [page, setPage] = useState({ name: 'home', params: {} });
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page.name, selectedRoom]);

  const navigate = (pageName, params = {}) => {
    setPage({ name: pageName, params });
    if (pageName !== 'room-detail') setSelectedRoom(null);
  };

  const handleViewRoomDetail = (room) => {
    setSelectedRoom(room);
    setPage({ name: 'room-detail', params: {} });
  };

  const handleBackFromDetail = () => {
    setPage(prev => ({ name: 'rooms', params: prev.params }));
    setSelectedRoom(null);
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
          />
        );

      case 'room-detail':
        return (
          <RoomDetailPage
            room={selectedRoom}
            onBack={handleBackFromDetail}
            onNavigateToRooms={() => navigate('rooms', { filter: 'all' })}
          />
        );

      case 'food':
        return <FoodPage />;

      case 'sauna':
        return <SaunaPage />;

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
