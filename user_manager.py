import time
import threading

class UserManager:
    def __init__(self):
        """Gestion des utilisateurs et des temps d'accès."""
        self.active_users = {}  # Dictionnaire {adresse_mac: timestamp_fin_session}

    def can_connect(self, mac_address: str) -> bool:
        """Vérifie si un utilisateur peut se connecter."""
        current_time = time.time()
        if mac_address in self.active_users:
            end_time = self.active_users[mac_address]
            if current_time < end_time:
                remaining = int(end_time - current_time)
                print(f"Accès refusé ! Attendez encore {remaining // 60} min {remaining % 60} sec.")
                return False
        return True

    def start_session(self, mac_address: str):
        """Démarre une session de 1h pour un utilisateur."""
        session_duration = 3600  # 1 heure en secondes
        self.active_users[mac_address] = time.time() + session_duration
        print(f"Connexion autorisée pour {mac_address} (1h)")
        
        # Lancer un thread pour gérer la fin de session
        threading.Thread(target=self.end_session, args=(mac_address,), daemon=True).start()

    def end_session(self, mac_address: str):
        """Met fin à la session après 1h et impose 30 min d'attente."""
        time.sleep(3600)  # Attendre 1h
        self.active_users[mac_address] = time.time() + 1800  # Ajouter 30 min de restriction
        print(f"Session terminée pour {mac_address}, attente de 30 min avant reconnexion.")

if __name__ == "__main__":
    user_manager = UserManager()
    test_mac = "AA:BB:CC:DD:EE:FF"
    
    if user_manager.can_connect(test_mac):
        user_manager.start_session(test_mac)
