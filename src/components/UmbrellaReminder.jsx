import React from 'react';


function UmbrellaReminder({ weatherCondition, precipitationProbability }) {
  const needsUmbrella = weatherCondition === '비' || weatherCondition === '소나기' || (precipitationProbability > 40 && weatherCondition !== '맑음'); // 강수확률 40% 이상이면 우산 권유

  return (
    <div className={`umbrella-reminder card ${needsUmbrella ? 'urgent' : ''}`}>
      <h3>{needsUmbrella ? '☔ 우산을 챙기세요!' : '☀️ 우산은 필요 없을 것 같아요.'}</h3>
      {needsUmbrella && (
        <p>
          {weatherCondition === '비' || weatherCondition === '소나기'
            ? `현재 날씨가 "${weatherCondition}"입니다. 나가실 때 우산을 꼭 챙기세요!`
            : `강수 확률이 ${precipitationProbability}%로 예상됩니다. 혹시 모르니 우산을 챙기는 것을 권장합니다.`}
        </p>
      )}
      {!needsUmbrella && (
        <p>오늘은 비 소식이 없어 보입니다. 편하게 외출하세요!</p>
      )}
    </div>
  );
}

export default UmbrellaReminder;