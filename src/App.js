import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Weather from "./pages/Weather.jsx";
import WeatherRecommendations from './components/WeatherRecommendations'; 
import UmbrellaReminder from './components/UmbrellaReminder'; 
import PlaylistSuggestion from './components/PlaylistSuggestion'; 
import PlaylistPage from './pages/PlaylistPage'; 
import FoodRecommendation from "./components/FoodRecommendation.jsx";

export default function App() {
  return (
    <BrowserRouter basename="/">
      <header style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
        {/* Weather 페이지 NavLink */}
        <NavLink
          to="/"
          style={({ isActive }) => ({
            marginRight: "12px",
            color: isActive ? "dodgerblue" : "black",
            textDecoration: "none", // 링크 밑줄 제거
            fontWeight: isActive ? "bold" : "normal", // 활성화된 링크 강조
          })}
        >
          날씨 정보
        </NavLink>
        
        {/* Playlist 페이지 NavLink (예시: 모든 플레이리스트를 보여주는 페이지가 있다면) */}
        <NavLink
          to="/playlist"
          style={({ isActive }) => ({
            marginRight: "12px",
            color: isActive ? "dodgerblue" : "black",
            textDecoration: "none",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          플레이리스트
        </NavLink>
      </header>

      <main style={{ padding: 16 }}>
        <Routes>
          {/* 1. 기본 경로 및 /weather 경로에서 Weather 컴포넌트 렌더링 */}
          <Route path="/" element={<Weather />} />
          <Route path="/weather" element={<Weather />} />
          
          {/* 2. 플레이리스트 페이지 라우트 추가 */}
          {/* /playlist 경로에 접근하면 PlaylistPage 렌더링 */}
          <Route path="/playlist" element={<PlaylistPage />} />
          
          {/* 3. 날씨 유형별 플레이리스트 상세 라우트 추가 (URL 파라미터 사용) */}
          {/* 예시 URL: /playlist/sunny, /playlist/rainy */}
          <Route path="/playlist/:weatherType" element={<PlaylistPage />} />
          
          {/* 4. 404 - Page Not Found */}
          <Route path="*" element={<p>404 - 페이지를 찾을 수 없습니다.</p>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}