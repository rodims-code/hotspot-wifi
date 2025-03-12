import qrcode

def generate_qr(ssid, password):
    wifi_config = f"WIFI:T:WPA;S:{ssid};P:{password};;"
    qr = qrcode.make(wifi_config)
    qr.save("static/wifi_qr.png")