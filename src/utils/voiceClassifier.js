/**
 * AI Edge Voice & Distress Classification Engine
 */

export const DISTRESS_KEYWORDS = ['help', 'bachao', 'stop', 'save me', 'police', 'chhodo', 'emergency'];

export function analyzeAudioStream(transcript = '') {
  const lower = transcript.toLowerCase();
  const matchedKeywords = DISTRESS_KEYWORDS.filter(word => lower.includes(word));
  
  return {
    isDistress: matchedKeywords.length > 0,
    confidence: matchedKeywords.length > 0 ? Math.min(0.75 + (matchedKeywords.length * 0.1, 0.99)) : 0.05,
    matchedKeywords,
    alertLevel: matchedKeywords.length > 1 ? 'CRITICAL' : matchedKeywords.length === 1 ? 'HIGH' : 'NORMAL'
  };
}

export function detectDecibelSpike(audioLevelDb) {
  // Screaming threshold > 82 dB
  return {
    isScream: audioLevelDb > 82,
    db: audioLevelDb,
    severity: audioLevelDb > 95 ? 'CRITICAL_SCREAM' : audioLevelDb > 82 ? 'HIGH_SHOUT' : 'NORMAL'
  };
}
