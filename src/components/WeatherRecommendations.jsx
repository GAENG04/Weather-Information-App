import React from 'react';

function WeatherRecommendations({ temperature, weatherCondition, windSpeed }) {
  
  // 1. 기온별 메인 옷차림 추천
  let mainAdvice = '';
  let emoji = '';
  let imageSrc = '';

  // ⚠️ 중요: 경로에서 'public'을 빼고 '/images/...'로 적어야 합니다.
  if (temperature <= 0) {
    mainAdvice = '영하권 날씨! 아주 두꺼운 패딩, 목도리, 장갑 등 방한용품이 필수입니다.';
    emoji = '🥶';
    imageSrc = '/images/cold.png'; 
  } else if (temperature > 0 && temperature <= 5) {
    mainAdvice = '추운 날씨예요. 두꺼운 코트나 패딩, 히트텍, 기모바지를 입으세요.';
    emoji = '🧣';
    imageSrc = '/images/coat.png';
  } else if (temperature > 5 && temperature <= 10) {
    mainAdvice = '쌀쌀해요. 트렌치코트, 야상, 가벼운 패딩을 걸치고 니트를 겹쳐 입으세요.';
    emoji = '🧥';
    imageSrc = '/images/autumn.png';
  } else if (temperature > 10 && temperature <= 15) {
    mainAdvice = '서늘한 날씨입니다. 자켓, 가디건, 스웨터, 맨투맨이 딱 좋아요.';
    emoji = '🍂';
    imageSrc = '/images/cardigan.png';
  } else if (temperature > 15 && temperature <= 20) {
    mainAdvice = '활동하기 쾌적해요! 얇은 니트, 가디건, 긴팔 티셔츠, 면바지를 추천해요.';
    emoji = '👕';
    imageSrc = '/images/tshirt.png';
  } else if (temperature > 20 && temperature <= 23) {
    mainAdvice = '포근한 날씨네요. 얇은 셔츠, 반팔에 얇은 가디건, 슬랙스가 좋아요.';
    emoji = '☀️';
    imageSrc = '/images/spring.png';
  } else if (temperature > 23 && temperature <= 27) {
    mainAdvice = '조금 더워요. 반팔, 반바지, 얇은 셔츠, 원피스로 시원하게 입으세요.';
    emoji = '🌞';
    imageSrc = '/images/earlysummer.png';
  } else {
    mainAdvice = '푹푹 찌는 무더위! 민소매, 반바지, 린넨 소재 등 최대한 시원하게!';
    emoji = '🔥';
    imageSrc = '/images/summer.png';
  }

  // 2. 추가 팁 로직
  const extraTips = [];
  const w = weatherCondition ? weatherCondition.toLowerCase() : '';
  
  if (w.includes('비') || w.includes('rain') || w.includes('shower')) {
    extraTips.push('☔ 비가 오니 우산과 방수되는 신발을 챙기세요.');
  }
  if (w.includes('눈') || w.includes('snow')) {
    extraTips.push('🌨️ 눈이 오니 미끄럼 방지 신발을 신으세요.');
  }
  if ((windSpeed || 0) >= 8) {
    extraTips.push('💨 바람이 강하게 불어요! 바람막이나 윈드브레이커를 추천해요.');
  }

  return (
    <div className="weather-recommendations card" style={styles.card}>
      <h3 style={styles.header}>{emoji} 오늘의 옷차림 추천</h3>
      
      {/* 🌟 텍스트와 이미지를 감싸는 컨테이너 (이 부분이 빠져 있었습니다) */}
      <div style={styles.contentContainer}>
        
        {/* 왼쪽: 텍스트 영역 */}
        <div style={styles.textContainer}>
          <p style={styles.mainText}>{mainAdvice}</p>
          
          {extraTips.length > 0 && (
            <ul style={styles.tipList}>
              {extraTips.map((tip, index) => (
                <li key={index} style={styles.tipItem}>{tip}</li>
              ))}
            </ul>
          )}
        </div>

        {/* 오른쪽: 이미지 영역 (이 부분이 빠져 있었습니다) */}
        {imageSrc && (
          <div style={styles.imageContainer}>
            <img src={imageSrc} alt="추천 옷차림" style={styles.outfitImage} />
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    marginTop: '20px',
    borderLeft: '6px solid #ff9800'
  },
  header: {
    margin: '0 0 15px 0',
    color: '#333',
    fontSize: '1.2rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px'
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'space-between', 
    gap: '20px' 
  },
  textContainer: {
    flex: 1, 
  },
  mainText: {
    fontSize: '1.05rem',
    lineHeight: '1.5',
    color: '#444',
    marginBottom: '10px',
    margin: 0
  },
  tipList: {
    marginTop: '15px',
    paddingLeft: '0', 
    listStyle: 'none', 
    backgroundColor: '#f5f5f5',
    padding: '10px 15px',
    borderRadius: '8px'
  },
  tipItem: {
    color: '#00796b',
    fontWeight: 'bold',
    marginBottom: '4px',
    fontSize: '0.9rem'
  },
  imageContainer: {
    flexShrink: 0, 
  },
  outfitImage: {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
    borderRadius: '8px',
    backgroundColor: '#fff3e0'
  }
};

export default WeatherRecommendations;