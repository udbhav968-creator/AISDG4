"""
SurakshaOne AI Python Microservice Server
"""
import http.server
import socketserver
import json
from risk_model import model

PORT = 8000

class AIServerHandler(http.server.SimpleHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_GET(self):
        if self.path == '/health':
            self._set_headers(200)
            self.wfile.write(json.dumps({"status": "UP", "engine": "Python AI Risk Engine"}).encode())
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode())

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        body = json.loads(post_data.decode('utf-8')) if post_data else {}

        if self.path == '/predict-risk':
            score = model.predict_safety_score(
                body.get('lighting', 80),
                body.get('crowd', 'medium'),
                body.get('police_dist_m', 500),
                body.get('open_stores', 5)
            )
            self._set_headers(200)
            self.wfile.write(json.dumps({"success": True, "predicted_safety_score": score}).encode())
        
        elif self.path == '/detect-anomaly':
            result = model.detect_trajectory_anomaly(
                body.get('lat', 28.5910),
                body.get('lon', 77.1960),
                body.get('expected_path', [[28.6105, 77.2185]])
            )
            self._set_headers(200)
            self.wfile.write(json.dumps({"success": True, "anomaly_data": result}).encode())

        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Unknown AI Endpoint"}).encode())

if __name__ == "__main__":
    print(f"🤖 [Python AI Engine] Microservice running on http://localhost:{PORT}")
    with socketserver.TCPServer(("", PORT), AIServerHandler) as httpd:
        httpd.serve_forever()
