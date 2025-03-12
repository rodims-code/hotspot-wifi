import wifi_manager
import qr_generator
import web_interface
import config
import threading

def start_hotspot():
    if wifi_manager.start_hotspot():
        print(f"Hotspot '{config.SSID}' activé avec succès !")
        qr_generator.generate_qr(config.SSID, config.PASSWORD)
        print("QR Code généré : wifi_qr.png")
    else:
        print("Échec de l'activation du hotspot.")

def start_web_interface():
    web_interface.app.run(host='0.0.0.0', port=5000, debug=False)

if __name__ == "__main__":
    start_hotspot()
    threading.Thread(target=start_web_interface).start()