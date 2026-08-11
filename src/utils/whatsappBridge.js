/**
 * WhatsApp & Telegram Emergency Alert Link Generator
 */

export function generateWhatsAppAlertUrl({ alertId, user, vehicle, location, transcript }) {
  const trackingUrl = `https://surakshaone.app/track/${alertId}`;
  const message = `🚨 *EMERGENCY SOS ALERT - SURAKSHAONE* 🚨\n\n` +
    `*Commuter:* ${user}\n` +
    `*Vehicle:* ${vehicle}\n` +
    `*Last GPS Position:* ${location[0]}, ${location[1]}\n` +
    `*Incident:* ${transcript}\n\n` +
    `📍 *Track Live GPS & Ambient Telemetry:* ${trackingUrl}\n` +
    `📞 *Direct Police Dispatch (112) Engaged.*`;

  const encodedMsg = encodeURIComponent(message);
  return {
    whatsappWebUrl: `https://api.whatsapp.com/send?text=${encodedMsg}`,
    telegramUrl: `https://t.me/share/url?url=${encodeURIComponent(trackingUrl)}&text=${encodedMsg}`,
    trackingUrl,
    rawText: message
  };
}
