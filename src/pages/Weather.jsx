import { useEffect, useState, useRef } from "react";
import { getByCity, getByCoords } from "../services/weather.js";
import WeatherCard from "../components/WeatherCard.jsx";
import WeatherRecommendations from "../components/WeatherRecommendations";
import UmbrellaReminder from "../components/UmbrellaReminder";
import PlaylistSuggestion from "../components/PlaylistSuggestion";
import FoodRecommendation from "../components/FoodRecommendation";
import "../App.css"; // CSS 스타일 적용

export default function Weather() {
  const [city, setCity] = useState("");
  const [units, setUnits] = useState("metric");
  const [data, setData] = useState(null);
  
  // 1. 상태 관리
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // 2. 캐시 저장소 & 마지막 검색 기록 (중복 요청 방지 및 단위 변환용)
  const cache = useRef({}); 
  const lastRef = useRef(null);

  // 🌟 통합 날씨 검색 함수 (캐시 + 로딩 + 에러 처리)
  const fetchWithCache = async (searchType, arg1, arg2) => {
    // 3. 중복 방지: 이미 로딩 중이면 요청 무시
    if (loading) return;

    setLoading(true);
    setErr(null);

    // 캐시 키 생성 (예: "city_seoul_metric", "coords_37.5_127.0_metric")
    const cacheKey = `${searchType}_${arg1}_${arg2 || ''}_${units}`;

    try {
      // 4. 캐시 확인: 이미 저장된 데이터가 있으면 API 요청 안 함
      if (cache.current[cacheKey]) {
        console.log(`⚡ 캐시된 데이터 사용: ${cacheKey}`);
        setData(cache.current[cacheKey]);
        // 마지막 검색 기록 업데이트 (단위 변환용)
        lastRef.current = { type: searchType, arg1, arg2 };
        setLoading(false);
        return;
      }

      // API 요청 실행
      let res;
      if (searchType === 'city') {
        res = await getByCity(arg1, { units, lang: "kr" });
      } else {
        res = await getByCoords(arg1, arg2, { units, lang: "kr" });
      }

      // 데이터 저장 (캐싱)
      cache.current[cacheKey] = res;
      setData(res);
      lastRef.current = { type: searchType, arg1, arg2 };

    } catch (e) {
      setErr(e);
      // 에러 시 기존 데이터 유지할지, 지울지 선택 (여기선 유지)
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    fetchWithCache('city', city.trim());
  };

  const onMyLocation = () => {
    if (!navigator.geolocation) {
      setErr(new Error("이 브라우저는 위치 정보를 지원하지 않습니다."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWithCache('coords', pos.coords.latitude, pos.coords.longitude);
      },
      () => setErr(new Error("위치 권한을 허용해주세요.")),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // 단위 전환 시 자동 재조회
  useEffect(() => {
    const src = lastRef.current;
    if (!src) return;
    // 단위가 바뀌면 캐시 키가 달라지므로 다시 fetchWithCache 호출
    fetchWithCache(src.type, src.arg1, src.arg2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  // 날씨 상태 변환 함수
  const getKoreanWeatherCondition = (weatherMain) => {
    if (!weatherMain) return '맑음';
    const w = weatherMain.toLowerCase();
    if (w.includes('rain') || w.includes('drizzle') || w.includes('thunderstorm')) return '비';
    if (w.includes('snow')) return '눈';
    if (w.includes('cloud')) return '흐림';
    return '맑음';
  };

  return (
    <div className="weather-container">
      <h1 className="app-title">🌤️ WEATHER INFORMATION APP</h1>
      
      <form onSubmit={onSubmit} className="search-form">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="도시명 입력 (예: Seoul)"
          className="search-input"
          disabled={loading} // 5. 로딩 중 입력 방지
        />
        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? "..." : "검색"}
        </button>
        <button type="button" onClick={onMyLocation} className="location-btn" disabled={loading}>
          📍 내 위치
        </button>
        
        {/* 단위 선택 버튼 */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
          <label>
            <input
              type="radio"
              name="unit"
              value="metric"
              checked={units === "metric"}
              onChange={() => setUnits("metric")}
              disabled={loading}
            />
            °C
          </label>
          <label>
            <input
              type="radio"
              name="unit"
              value="imperial"
              checked={units === "imperial"}
              onChange={() => setUnits("imperial")}
              disabled={loading}
            />
            °F
          </label>
        </div>
      </form>

      {/* 6. 에러 메시지 (흔들리는 애니메이션 적용됨) */}
      {err && (
        <div className="error-message">
          ⚠️ {err.message === "404" ? "도시를 찾을 수 없습니다." : "날씨 정보를 가져오는데 실패했습니다."}
        </div>
      )}

      {/* 7. 로딩 스피너 */}
      {loading && (
        <div className="loading-spinner-container">
          <div className="spinner"></div>
          <p>날씨 정보를 불러오는 중입니다...</p>
        </div>
      )}

      {/* 초기 안내 문구 */}
      {!loading && !err && !data && (
        <div style={{ textAlign: "center", marginTop: 50, color: "#666" }}>
          <p>도시를 검색하거나 '내 위치' 버튼을 눌러 날씨를 확인하세요.</p>
        </div>
      )}

      {/* 데이터 표시 (페이드인 효과) */}
      {!loading && data && (
        <div className="content-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <WeatherCard data={data} />

          {(() => {
            const currentTemp = data.main.temp;
            const weatherMain = data.weather[0].main; 
            const koreanCondition = getKoreanWeatherCondition(weatherMain);
            
            return (
              <>
                <WeatherRecommendations 
                  temperature={currentTemp} 
                  weatherCondition={koreanCondition} 
                  windSpeed={data.wind.speed}
                />
                <UmbrellaReminder 
                  weatherCondition={koreanCondition} 
                  precipitationProbability={0}
                />
                <PlaylistSuggestion 
                  weatherCondition={koreanCondition} 
                  temperature={currentTemp} 
                />
                <FoodRecommendation 
                  weatherCondition={koreanCondition}
                  temperature={currentTemp}
                />
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}