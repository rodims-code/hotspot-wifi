import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { QrCode, Wifi, Copy, CheckCircle } from 'lucide-react';

export function QRCodeGenerator() {
  const [wifiConfig, setWifiConfig] = useState({
    ssid: 'WiFi-Hotspot-Manager',
    password: 'hotspot123',
    security: 'WPA'
  });
  const [qrData, setQrData] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Format WiFi QR code data
    const wifiString = `WIFI:T:${wifiConfig.security};S:${wifiConfig.ssid};P:${wifiConfig.password};H:false;;`;
    setQrData(wifiString);
  }, [wifiConfig]);

  const generateQRCode = (data: string) => {
    // Simulation d'un QR code avec un pattern de carrés
    const size = 200;
    const cellSize = 8;
    const cells = size / cellSize;
    
    return (
      <div 
        className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg"
        style={{ width: size + 32, height: size + 32 }}
      >
        <div 
          className="grid gap-0"
          style={{ 
            gridTemplateColumns: `repeat(${cells}, 1fr)`,
            width: size,
            height: size
          }}
        >
          {Array.from({ length: cells * cells }).map((_, index) => {
            // Pattern simple pour simuler un QR code
            const row = Math.floor(index / cells);
            const col = index % cells;
            const isBlack = (row + col + data.length) % 3 === 0 || 
                           (row < 7 && col < 7) || 
                           (row < 7 && col >= cells - 7) || 
                           (row >= cells - 7 && col < 7) ||
                           (row % 2 === 0 && col % 2 === 0 && data.charCodeAt(index % data.length) % 2 === 0);
            
            return (
              <div
                key={index}
                className={`${isBlack ? 'bg-black' : 'bg-white'}`}
                style={{ width: cellSize, height: cellSize }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Configuration WiFi */}
      <div className="space-y-3">
        <div>
          <Label htmlFor="ssid">Nom du réseau (SSID)</Label>
          <Input
            id="ssid"
            value={wifiConfig.ssid}
            onChange={(e) => setWifiConfig(prev => ({ ...prev, ssid: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            value={wifiConfig.password}
            onChange={(e) => setWifiConfig(prev => ({ ...prev, password: e.target.value }))}
          />
        </div>
      </div>

      {/* QR Code */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              {generateQRCode(qrData)}
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium flex items-center justify-center gap-2">
                <QrCode className="w-4 h-4" />
                Scannez pour vous connecter
              </h3>
              <p className="text-sm text-gray-600">
                Scannez ce QR code avec votre téléphone pour vous connecter automatiquement au WiFi
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={copyToClipboard}
                className="w-full"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Copié!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copier les données WiFi
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <div className="text-xs text-gray-600 space-y-1">
        <p><strong>Instructions:</strong></p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Ouvrez l'appareil photo de votre téléphone</li>
          <li>Pointez vers le QR code</li>
          <li>Tapez sur la notification pour vous connecter</li>
          <li>Entrez votre nom d'utilisateur si demandé</li>
        </ul>
      </div>
    </div>
  );
}