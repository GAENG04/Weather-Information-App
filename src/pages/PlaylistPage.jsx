import React, { useState } from 'react'; 
import { useParams, Link } from 'react-router-dom';

const youtubeData = {
  sunny: {
    title: "☀️ 햇살 좋은 날 듣는 상큼한 K-POP",
    description: "창문 열고 드라이브 할 때 딱! 기분 좋아지는 한국 노래 모음.",
    videos: [
      { id: "WyiIGEHQP8A", title: "Red Flavor (빨간 맛)", channel: "Red Velvet (레드벨벳)" },
      { id: "11cta61wi0g", title: "Hype Boy", channel: "NewJeans (뉴진스)" },
      { id: "VNWWsX4WGTs", title: "Time of Our Life (한 페이지가 될 수 있게)", channel: "DAY6 (데이식스)" },
      { id: "J-wFp43XOrA", title: "VERY NICE (아주 NICE)", channel: "SEVENTEEN (세븐틴)" },
      { id: "c7rCyll5AeY", title: "CHEER UP", channel: "TWICE (트와이스)" },
      { id: "RmuL-BPFi2Q", title: "Weekend", channel: "TAEYEON (태연)" }
    ]
  },
  cloudy: {
    title: "☁️ 흐린 날엔 감성적인 인디 음악",
    description: "구름 낀 하늘과 잘 어울리는 차분하고 센치한 노래들.",
    videos: [
      { id: "BzYnNdJhZQw", title: "Through the Night (밤편지)", channel: "IU (아이유)" },
      { id: "2Nkf9BqpxHE", title: "Me After You (너를 만나)", channel: "Paul Kim (폴킴)" },
      { id: "V3wzco7_2AE", title: "Phonecert (폰서트)", channel: "10CM" },
      { id: "mAKsZ26SabQ", title: "How can I love the heartbreak...", channel: "AKMU (악뮤)" },
      { id: "Gk1iJP891SM", title: "for lovers who hesitate (주저하는 연인들을 위해)", channel: "Jannabi (잔나비)" },
      { id: "AJw0lGf-JZ8", title: "HAPPEN (헤픈 우연)", channel: "Heize (헤이즈)" }
    ]
  },
  rainy: {
    title: "☔ 비 오는 날 생각나는 노래",
    description: "빗소리와 함께 듣기 좋은 촉촉한 감성 발라드.",
    videos: [
      { id: "afxLaQiLu-o", title: "You, Clouds, Rain (비도 오고 그래서)", channel: "Heize (헤이즈)" },
      { id: "TqI72pjjQHg", title: "Umbrella (우산)", channel: "Younha (윤하)" },
      { id: "TRa8D0z1vMQ", title: "On Rainy Days (비가 오는 날엔)", channel: "BEAST (비스트)" },
      { id: "0G3835388Z0", title: "Rain (비)", channel: "Paul Kim (폴킴)" },
      { id: "7G29j-j_Dqg", title: "Rain and You (비와 당신)", channel: "Lee Mujin (이무진)" },
      { id: "ImJZlbSa3eE", title: "Rain Drop", channel: "IU (아이유)" }
    ]
  },
  snowy: {
    title: "❄️ 눈 내리는 겨울, 설레는 캐럴",
    description: "하얀 눈과 함께 듣는 따뜻하고 몽글몽글한 겨울 시즌 송.",
    videos: [
      { id: "M7TZ165xQ6E", title: "The First Snow (첫 눈)", channel: "EXO (엑소)" },
      { id: "6GC8JF2FOgA", title: "I will go to you like the first snow (첫눈처럼 너에게 가겠다)", channel: "Ailee (에일리)" },
      { id: "nA-J_a43tPk", title: "Merry Christmas Ahead (미리 메리 크리스마스)", channel: "IU (아이유)" },
      { id: "zi_6oaQyckM", title: "Merry & Happy", channel: "TWICE (트와이스)" },
      { id: "sr3JaQ3h7YA", title: "Snow Flower (눈의 꽃)", channel: "Park Hyo Shin (박효신)" },
      { id: "gLpWc95x76w", title: "Must Have Love", channel: "SG Wannabe & BEG" }
    ]
  },
  'summer-pop': {
    title: "🔥 무더위를 날려줄 썸머 K-POP",
    description: "듣기만 해도 시원해지는 청량한 여름 댄스곡 모음!",
    videos: [
      { id: "9txzvu6eQuw", title: "Touch My Body", channel: "SISTAR (씨스타)" },
      { id: "XA2YEHn-A8Q", title: "Alcohol-Free", channel: "TWICE (트와이스)" },
      { id: "WMweEpGlu_U", title: "Butter", channel: "BTS (방탄소년단)" },
      { id: "3cZrxpK2EAQ", title: "Rollin' (롤린)", channel: "Brave Girls (브레이브걸스)" },
      { id: "7HDeem-Ja38", title: "Queencard (퀸카)", channel: "(G)I-DLE (여자아이들)" },
      { id: "ArmDp-zijuc", title: "Super Shy", channel: "NewJeans (뉴진스)" }
    ]
  },
  'winter-mood': {
    title: "🧣 추운 겨울, 마음을 녹이는 발라드",
    description: "시린 마음을 따뜻하게 감싸주는 겨울 감성 보컬 곡들.",
    videos: [
      { id: "9iixk7rFjA0", title: "Every Moment of You (너의 모든 순간)", channel: "Sung Si Kyung (성시경)" },
      { id: "qDk54iW57kI", title: "Gift (선물)", channel: "MeloMance (멜로망스)" },
      { id: "q3tW01S_6yE", title: "Let's Go See The Stars (별 보러 가자)", channel: "Jukjae (적재)" },
      { id: "3H85SIUCY_I", title: "All about you (그대라는 시)", channel: "TAEYEON (태연)" },
      { id: "4HgkZqS6jCQ", title: "The Snowman (눈사람)", channel: "Jung Seung Hwan (정승환)" },
      { id: "5iSlfF8TQ9k", title: "Breathe (한숨)", channel: "Lee Hi (이하이)" }
    ]
  },
  default: {
    title: "🎶 오늘의 추천 K-POP",
    description: "날씨와 상관없이 언제 들어도 좋은 한국 인기곡들입니다.",
    videos: [
      { id: "gdZLi9oWNZg", title: "Dynamite", channel: "BTS (방탄소년단)" },
      { id: "dZSd7_r7Y1w", title: "Love Lee", channel: "AKMU (악뮤)" },
      { id: "QfQUjE8KfbI", title: "Fighting (파이팅 해야지)", channel: "BSS (부석순)" },
      { id: "K9_VFxzCuQ0", title: "Pink Venom", channel: "BLACKPINK" },
      { id: "0-q1KafFCLU", title: "Love Dive", channel: "IVE (아이브)" },
      { id: "pG6iaOMV46I", title: "Any Song (아무노래)", channel: "ZICO (지코)" }
    ]
  }
};

function PlaylistPage() {
  const { weatherType } = useParams();
  const data = youtubeData[weatherType] || youtubeData.default;

  // 🌟 검색어 상태 관리
  const [keyword, setKeyword] = useState('');

  // 🌟 검색 기능 함수
  const handleSearch = (e) => {
    e.preventDefault(); // 새로고침 방지
    if (keyword.trim()) {
      // 유튜브 검색 결과 페이지로 이동 (새 탭)
      window.open(`https://www.youtube.com/results?search_query=${keyword}`, '_blank');
    }
  };

  return (
    <div className="playlist-page">
      <header className="playlist-header">
        <Link to="/" className="back-button">← 돌아가기</Link>
        <h1 className="chart-main-title">{data.title}</h1>
        <p className="chart-description">{data.description}</p>
        
        {/* 🌟 검색창 추가 */}
        <form onSubmit={handleSearch} className="search-bar-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="듣고 싶은 노래 검색..." 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="search-button">🔍</button>
        </form>

      </header>

      {/* 차트 리스트 */}
      <div className="music-chart-list">
        {data.videos.map((video, index) => (
          <a 
            key={video.id} 
            href={`https://www.youtube.com/watch?v=${video.id}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="chart-item"
          >
            <div className="chart-rank">{index + 1}</div>
            <div className="chart-thumbnail-wrapper">
              <img 
                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                alt={video.title} 
                className="chart-thumbnail"
              />
            </div>
            <div className="chart-info">
              <h3 className="chart-song-title">{video.title}</h3>
              <span className="chart-artist-name">{video.channel}</span>
            </div>
            <div className="chart-play-icon">▶</div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default PlaylistPage;