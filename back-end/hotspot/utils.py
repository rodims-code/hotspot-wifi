import platform
import subprocess
import shlex
import os
from tempfile import NamedTemporaryFile

def start_hotspot_platform(ssid: str, password: str):
    system = platform.system().lower()
    if system == "windows":
        return start_hotspot_windows(ssid, password)
    elif system == "linux":
        return start_hotspot_linux(ssid, password)
    else:
        raise NotImplementedError(f"OS {system} non supporté")

def stop_hotspot_platform():
    system = platform.system().lower()
    if system == "windows":
        subprocess.run(['netsh', 'wlan', 'stop', 'hostednetwork'], check=False)
    elif system == "linux":
        # kill hostapd process simple approach
        subprocess.run(['pkill', '-f', 'hostapd'], check=False)

def start_hotspot_windows(ssid, password):
    cmd1 = ['netsh', 'wlan', 'set', 'hostednetwork', f'ssid={ssid}', f'key={password}']
    cmd2 = ['netsh', 'wlan', 'start', 'hostednetwork']
    subprocess.run(cmd1, check=True)
    subprocess.run(cmd2, check=True)
    return "started (windows)"

def start_hotspot_linux(ssid, password, interface="wlan0", channel=6):
    # génère un hostapd.conf temporaire et lance hostapd
    conf = f"""
interface={interface}
driver=nl80211
ssid={ssid}
hw_mode=g
channel={channel}
wmm_enabled=1
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_passphrase={password}
wpa_key_mgmt=WPA-PSK
rsn_pairwise=CCMP
    """.strip()

    tf = NamedTemporaryFile(mode="w", delete=False, prefix="hostapd_", suffix=".conf")
    tf.write(conf)
    tf.close()
    # lancer hostapd en background (nécessite privilèges root)
    subprocess.Popen(['hostapd', tf.name])
    return tf.name
