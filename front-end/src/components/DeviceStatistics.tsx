import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const usageData = [
  { day: 'Lun', upload: 40, download: 65 },
  { day: 'Mar', upload: 35, download: 55 },
  { day: 'Mer', upload: 45, download: 70 },
  { day: 'Jeu', upload: 30, download: 50 },
];

export function DeviceStatistics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques des appareils</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Graphique d'utilisation */}
          <div>
            <h4 className="text-sm font-medium mb-3">Utilisation sur le temps</h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis hide />
                  <Bar dataKey="upload" fill="#f97316" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="download" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Upload</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Download</span>
              </div>
            </div>
          </div>

          {/* Informations sur les appareils */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Appareils connectés</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Weng-MBP</div>
                <div className="font-medium">2E:57:56:5A:85:37</div>
                <div className="text-xs text-gray-400">Laptop • 3h ago</div>
              </div>
              <div>
                <div className="text-gray-500">Fijte-MBP</div>
                <div className="font-medium">0D:6A:7D:BF:A2:8A</div>
                <div className="text-xs text-gray-400">Desktop • 5m ago</div>
              </div>
            </div>
          </div>

          {/* Statistiques réseau */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Réseau</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Version matériel</div>
                <div className="font-medium">MF293NHWS.2</div>
              </div>
              <div>
                <div className="text-gray-500">WAN MAC</div>
                <div className="font-medium">40:3e:34:01:8F:5D</div>
              </div>
              <div>
                <div className="text-gray-500">Durée de connexion</div>
                <div className="font-medium">1d 10h 43m 17s</div>
              </div>
              <div>
                <div className="text-gray-500">LAN IP</div>
                <div className="font-medium">192.168.0.3</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}