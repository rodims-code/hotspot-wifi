from flask import Flask, render_template, jsonify
import time
from user_manager import UserManager

app = Flask(__name__)
user_manager = UserManager()

def get_remaining_time(mac_address):
    """Retourne le temps restant avant la prochaine connexion."""
    current_time = time.time()
    if mac_address in user_manager.active_users:
        end_time = user_manager.active_users[mac_address]
        remaining = max(0, int(end_time - current_time))
        return remaining
    return 0

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/status/<mac_address>")
def status(mac_address):
    remaining_time = get_remaining_time(mac_address)
    return jsonify({"remaining_time": remaining_time})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
