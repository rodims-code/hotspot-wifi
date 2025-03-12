import subprocess
import config

def start_hotspot():
    try:
        subprocess.run(["netsh", "wlan", "set", "hostednetwork", "mode=allow"], check=True)
        subprocess.run(["netsh", "wlan", "set", "hostednetwork", f"ssid={config.SSID}"], check=True)
        subprocess.run(["netsh", "wlan", "set", "hostednetwork", f"key={config.PASSWORD}"], check=True)
        subprocess.run(["netsh", "wlan", "start", "hostednetwork"], check=True)
        return True
    except subprocess.CalledProcessError:
        return False
