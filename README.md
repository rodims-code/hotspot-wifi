# Gestion de Hotspot WiFi avec QR Code et Limitation de Connexion

Ce projet permet de créer un hotspot WiFi sous Windows, de générer un QR Code pour une connexion facile et de limiter le temps de connexion des utilisateurs.

## Fonctionnalités

- Création d'un hotspot WiFi sous Windows.
- Génération d'un QR Code pour simplifier la connexion.
- Gestion du temps de connexion des utilisateurs (1h autorisée, 30 min de blocage).
- Surveillance des connexions en utilisant `arp -a`.
- Affichage d'un message et d'un chrono pour informer l'utilisateur du temps d'attente via une interface web Flask.

---
## Structure 

```bash
 /hotspot_project
 │── hotspot.py         # Création et gestion du WiFi
 │── qr_code.py         # Génération du QR Code
 │── user_manager.py    # Gestion du temps d'accès
 │── web_interface.py   # Interface Flask pour afficher les infos
 │── main.py            # Lancement global du projet
 │── requirements.txt   # Liste des dépendances
 │── README.md          # Explication du projet
```
---

## 1. Prérequis

- **Windows 11**
- **Python 3.x** installé
- Bibliothèques Python requises :
  ```bash
  pip install qrcode[pil] flask
  ```

---

## 2. Création du Hotspot WiFi sous Windows

### **Méthode 1 : Via les paramètres**

1. Aller dans **Paramètres** > **Réseau et Internet** > **Point d'accès sans fil mobile**.
2. Activer **"Partager ma connexion Internet"**.
3. Configurer le **nom du réseau (SSID)** et le **mot de passe**.

### **Méthode 2 : Via PowerShell**

Ouvrir PowerShell en mode administrateur et exécuter :

```powershell
netsh wlan set hostednetwork mode=allow ssid=MonHotspot key=motdepassewifi
netsh wlan start hostednetwork
```

Pour arrêter le hotspot :

```powershell
netsh wlan stop hostednetwork
```

---

## 3. Génération d'un QR Code pour le WiFi

Créer un QR Code pour simplifier la connexion :

```python
import qrcode

wifi_ssid = "MonHotspot"
wifi_password = "motdepassewifi"
wifi_config = f"WIFI:T:WPA;S:{wifi_ssid};P:{wifi_password};;"

qr = qrcode.make(wifi_config)
qr.save("wifi_qr.png")

print("QR Code généré : wifi_qr.png")
```

---

## 4. Surveillance des Connexions et Gestion du Temps

Script pour récupérer les appareils connectés et gérer leur accès :

```python
import time
import os

connected_users = {}  # {MAC: Temps restant}

def get_connected_devices():
    """Récupère les appareils connectés."""
    devices = os.popen("arp -a").read()
    mac_addresses = []
    
    for line in devices.split("\n"):
        parts = line.split()
        if len(parts) >= 3 and ":" in parts[0]:
            mac_addresses.append(parts[0])
    
    return mac_addresses

def manage_users():
    """Gère les connexions et déconnexions."""
    global connected_users
    while True:
        current_devices = get_connected_devices()
        
        for mac in current_devices:
            if mac not in connected_users:
                connected_users[mac] = 3600  # 1h de connexion
        
        for mac in list(connected_users.keys()):
            if connected_users[mac] > 0:
                connected_users[mac] -= 60
            else:
                print(f"L'utilisateur {mac} est bloqué pour 30 min.")
                connected_users[mac] = -1800  # 30 min de blocage
        
        time.sleep(60)

if __name__ == "__main__":
    manage_users()
```

---

## 5. Interface Web Flask pour l'Affichage du Chrono

Affichage du temps restant pour un utilisateur bloqué :

```python
from flask import Flask, render_template_string
import time

app = Flask(__name__)
blocked_users = {"00:11:22:33:44:55": time.time() + 1800}  # 30 minutes de blocage

@app.route("/")
def index():
    user_mac = "00:11:22:33:44:55"
    if user_mac in blocked_users:
        time_left = int(blocked_users[user_mac] - time.time())
        if time_left > 0:
            return f"Vous devez attendre encore {time_left // 60} min {time_left % 60} sec avant de vous reconnecter."
        else:
            del blocked_users[user_mac]
            return "Vous pouvez vous reconnecter."
    return "Connexion autorisée."

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
```

---

## 6. Lancer le Projet

1. **Activer le hotspot** :
   ```powershell
   netsh wlan start hostednetwork
   ```
2. **Générer le QR Code** :
   ```bash
   python generate_qr.py
   ```
3. **Lancer le gestionnaire de connexion** :
   ```bash
   python manage_users.py
   ```
4. **Démarrer l'interface web** :
   ```bash
   python app.py
   ```

---

## 7. Résumé des Fonctionnalités

✅ Création d'un hotspot WiFi sous Windows.
✅ Génération d'un QR Code pour la connexion.
✅ Gestion du temps d'accès (1h, puis 30 min d'attente).
✅ Surveillance des connexions via `arp -a`.
✅ Interface Web Flask pour informer les utilisateurs.

---

## 8. Améliorations Possibles

🔹 Ajouter une base de données pour stocker les utilisateurs.
🔹 Intégrer une authentification pour une meilleure gestion.
🔹 Créer une interface graphique pour gérer facilement les paramètres.

---

🚀 **Projet prêt à être testé !**

