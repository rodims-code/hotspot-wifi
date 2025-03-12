# README - Gestion Hotspot WiFi avec QR Code et Restrictions de Connexion

## Description
Ce projet est une application qui permet de gérer un hotspot WiFi en Python, en générant un code QR pour faciliter la connexion des utilisateurs. Il applique des restrictions de connexion : chaque utilisateur peut se connecter pendant 1 heure, puis doit attendre 30 minutes avant de pouvoir se reconnecter. Un message et un chronomètre informent l'utilisateur du temps d'attente.

## Technologies utilisées
- **Back-end** : Python avec Flask, Django (Django REST Framework pour l'API)
- **Front-end** : React avec Tailwind CSS
- **Base de données** : PostgreSQL
- **Génération QR Code** : `qrcode` (bibliothèque Python)
- **Gestion du Hotspot** : `netsh` (sous Windows) ou `hostapd` (sous Linux)
- **Gestion des sessions utilisateurs** : JWT pour l'authentification

## Fonctionnalités
- Création d'un hotspot WiFi
- Génération d'un code QR pour la connexion
- Gestion des sessions utilisateur (limitation à 1 heure)
- Période d'attente de 30 minutes après expiration de la session
- Interface web pour le suivi des connexions
- Journalisation des connexions avec adresse MAC et durée d'utilisation

## Installation
### Prérequis
- Python 3.10+
- Node.js & npm (pour le front-end React)
- PostgreSQL
- Bibliothèques Python nécessaires (voir `requirements.txt`)
- Droits administrateur (pour gérer le réseau)

### Étapes
1. **Cloner le projet**
   ```sh
   git clone https://github.com/ton-projet.git
   cd ton-projet
   ```
2. **Installer les dépendances Python**
   ```sh
   pip install -r backend/requirements.txt
   ```
3. **Lancer le back-end Django**
   ```sh
   cd backend
   python manage.py migrate
   python manage.py runserver
   ```
4. **Lancer le front-end React**
   ```sh
   cd frontend
   npm install
   npm start
   ```

## Utilisation
1. Démarrer le serveur Django
2. Ouvrir le front-end React
3. Scanner le QR Code généré pour se connecter au WiFi
4. Suivre le statut de la connexion via l'interface web

## Auteurs
Projet développé par rodims-code.

## License
MIT License.

