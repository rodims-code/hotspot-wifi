import qrcode

def generate_qr_code(ssid: str, password: str, filename: str = "wifi_qr.png"):
    """Génère un QR Code pour la connexion au hotspot WiFi."""
    wifi_config = f"WIFI:T:WPA;S:{ssid};P:{password};;"
    qr = qrcode.make(wifi_config)
    qr.save(filename)
    print(f"QR Code généré : {filename}")

if __name__ == "__main__":
    ssid = "MonHotspot"
    password = "motdepassewifi"
    generate_qr_code(ssid, password)
