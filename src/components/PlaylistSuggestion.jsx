import React from 'react';
// 1. react-router-dom의 Link 컴포넌트를 가져옵니다.
import { Link } from 'react-router-dom';

function PlaylistSuggestion({ weatherCondition, temperature }) {
  let suggestion = {
    title: '오늘의 추천 플레이리스트',
    description: '날씨에 따라 어울리는 음악을 들어보세요!',
    emoji: '🎶',
    // 💡 Link 컴포넌트가 이동할 경로(URL)를 지정합니다.
    routePath: '/playlist/default' 
  };

  switch (weatherCondition) {
    case '맑음':
    case '구름조금':
      suggestion = {
        title: '☀️ 햇살 가득한 날의 플레이리스트',
        description: '기분 좋은 햇살 아래 걷거나 드라이브할 때 어울리는 상쾌하고 밝은 음악들.',
        emoji: '🌞',
        routePath: '/playlist/sunny' 
      };
      break;
    case '흐림':
    case '구름많음':
      suggestion = {
        title: '☁️ 흐린 날 감성 플레이리스트',
        description: '창 밖 풍경을 보며 차분하게 듣기 좋은 인디 또는 어쿠스틱 음악.',
        emoji: '🌫️',
        routePath: '/playlist/cloudy' 
      };
      break;
    case '비':
    case '소나기':
      suggestion = {
        title: '☔ 비 오는 날 재즈 & 발라드',
        description: '빗소리와 함께 마음을 차분하게 해주는 감성적인 재즈, 발라드.',
        emoji: '🌧️',
        routePath: '/playlist/rainy' 
      };
      break;
    case '눈':
      suggestion = {
        title: '❄️ 눈 오는 날 포근한 플레이리스트',
        description: '따뜻한 차 한 잔과 함께 듣기 좋은 따뜻하고 부드러운 음악들.',
        emoji: '🌨️',
        routePath: '/playlist/snowy' 
      };
      break;
    default:
      if (temperature >= 28) {
        suggestion.routePath = '/playlist/summer-pop';
        suggestion.title = '🔥 무더위를 날려줄 시원한 팝!';
        suggestion.description = '시원한 에어컨 아래 듣기 좋은 신나는 댄스곡이나 청량한 팝.';
        suggestion.emoji = '🧊';
      } else if (temperature <= 5) {
        suggestion.routePath = '/playlist/winter-mood';
        suggestion.title = '🧣 추운 날 몸을 녹이는 따뜻한 음악';
        suggestion.description = '따뜻한 분위기의 어쿠스틱이나 클래식, 또는 잔잔한 보컬 곡들.';
        suggestion.emoji = '☕';
      }
      break;
  }

  return (
    <div className="playlist-suggestion card">
      <h3>{suggestion.emoji} {suggestion.title}</h3>
      <p>{suggestion.description}</p>
      
      {/* 2. Link 컴포넌트를 사용하여 지정된 경로로 이동합니다. */}
      <Link to={suggestion.routePath} className="playlist-link-button">
        플레이리스트 보러가기
      </Link>
    </div>
  );
}

export default PlaylistSuggestion;