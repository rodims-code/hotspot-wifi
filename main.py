import threading
import hotspot
import qr_code
import web_interface
from user_manager import UserManager

def start_services():
    """Démarre le hotspot, génère le QR Code et lance le serveur web."""
    ssid = "MonHotspot"
    password = "motdepassewifi"

    # Démarrer le hotspot
    hotspot.start_hotspot(ssid, password)

    # Générer le QR Code
    qr_code.generate_qr_code(ssid, password)

    # Lancer le serveur web dans un thread séparé (sans debug mode)
    threading.Thread(
        target=lambda: web_interface.app.run(host="0.0.0.0", port=5000, debug=False, use_reloader=False),
        daemon=True
    ).start()

    print("Tous les services sont en cours d'exécution...")

if __name__ == "__main__":
    start_services()
    user_manager = UserManager()
    while True:
        mac_address = input("Entrez une adresse MAC pour connexion : ")
        if user_manager.can_connect(mac_address):
            user_manager.start_session(mac_address)
