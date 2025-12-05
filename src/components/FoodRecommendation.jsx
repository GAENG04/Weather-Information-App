import React from 'react';
// import './App.css'; // (App.js에서 이미 import 했다면 생략 가능)

function FoodRecommendation({ weatherCondition, temperature }) {
  let menu = '';
  let reason = '';
  let emoji = '';

  const w = weatherCondition ? weatherCondition.toLowerCase() : '';

  if (w.includes('비') || w.includes('rain')) {
    menu = '해물파전 & 막걸리 또는 따끈한 우동';
    reason = '빗소리를 들으며 즐기는 고소한 파전이나 뜨끈한 국물이 최고죠!';
    emoji = '🍶';
  } else if (w.includes('눈') || w.includes('snow')) {
    menu = '어묵탕, 군고구마, 붕어빵';
    reason = '하얀 눈을 보며 호호 불어먹는 길거리 간식이 생각나는 날씨예요.';
    emoji = '🍢';
  } else {
    // 기온별 추천
    if (temperature <= 5) {
      menu = '김치찌개, 순대국, 핫초코';
      reason = '몸을 따뜻하게 녹여줄 얼큰한 국물 요리가 필요해요.';
      emoji = '🥘';
    } else if (temperature > 5 && temperature <= 20) {
      menu = '칼국수, 비빔밥, 샌드위치';
      reason = '무난하고 든든한 한 끼! 기분 전환 겸 가벼운 메뉴도 좋아요.';
      emoji = '🍜';
    } else if (temperature > 20 && temperature <= 28) {
      menu = '치킨, 햄버거, 파스타';
      reason = '활동하기 좋은 날씨엔 친구들과 함께 즐기는 메뉴 어때요?';
      emoji = '🍗';
    } else { // 28도 이상
      menu = '냉면, 메밀소바, 아이스 아메리카노, 빙수';
      reason = '더위를 싹 날려버릴 시원한 살얼음 동동 띄운 메뉴가 필수!';
      emoji = '🧊';
    }
  }

  return (
    <div className="food-recommendation">
      <h3>{emoji} 날씨별 추천 메뉴</h3>
      <p className="food-menu-name">{menu}</p>
      <p className="food-reason">{reason}</p>
    </div>
  );
}

export default FoodRecommendation;