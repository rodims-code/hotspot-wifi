import os

def start_hotspot(ssid: str, password: str):
    """Crée et démarre un hotspot WiFi sous Windows."""
    os.system(f'netsh wlan set hostednetwork mode=allow ssid={ssid} key={password}')
    os.system('netsh wlan start hostednetwork')
    print(f"Hotspot '{ssid}' activé avec succès !")

def stop_hotspot():
    """Arrête le hotspot WiFi."""
    os.system('netsh wlan stop hostednetwork')
    print("Hotspot désactivé.")

if __name__ == "__main__":
    ssid = "MonHotspot"
    password = "motdepassewifi"
    action = input("Voulez-vous démarrer ou arrêter le hotspot ? (start/stop) : ")
    
    if action.lower() == "start":
        start_hotspot(ssid, password)
    elif action.lower() == "stop":
        stop_hotspot()
    else:
        print("Commande invalide.")
