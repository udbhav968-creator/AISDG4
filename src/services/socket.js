import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnectionAttempts: 5
});

export function subscribeToTelemetry(callback) {
  if (!socket.connected) socket.connect();

  socket.on('telemetry_update', (data) => {
    callback(data);
  });
}

export function subscribeToSOSAlerts(callback) {
  if (!socket.connected) socket.connect();

  socket.on('emergency_sos_alert', (alert) => {
    callback(alert);
  });
}
