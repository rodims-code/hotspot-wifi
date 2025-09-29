import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

const logs = [
  {
    id: 1,
    deviceName: 'Weng-MBP',
    macAddress: '2E:57:56:5A:85:37',
    ipAddress: '37.26.77.113',
    deviceType: 'Laptop',
    logTime: '3h ago',
    dataUsage: '12.97Gb',
    status: 'active'
  },
  {
    id: 2,
    deviceName: 'Fijte-MBP',
    macAddress: '0D:6A:7D:BF:A2:8A',
    ipAddress: '10.10.17.89',
    deviceType: 'DESKTOP COM',
    logTime: '5m ago',
    dataUsage: '312.43Mb',
    status: 'active'
  },
  {
    id: 3,
    deviceName: 'iPhone-12',
    macAddress: '4A:8B:2C:1F:9E:5D',
    ipAddress: '192.168.1.45',
    deviceType: 'Mobile',
    logTime: '15m ago',
    dataUsage: '89.2Mb',
    status: 'disconnected'
  },
  {
    id: 4,
    deviceName: 'Samsung-Tab',
    macAddress: '6C:3E:7A:2B:8F:4D',
    ipAddress: '192.168.1.67',
    deviceType: 'Tablet',
    logTime: '1h ago',
    dataUsage: '156.7Mb',
    status: 'waiting'
  }
];

export function SystemLogs() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Logs système</CardTitle>
          <Button variant="ghost" size="sm" className="text-blue-600">
            voir plus
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs text-gray-500 pb-2 font-medium">Nom de l'appareil</th>
                <th className="text-left text-xs text-gray-500 pb-2 font-medium">Adresse Mac</th>
                <th className="text-left text-xs text-gray-500 pb-2 font-medium">Adresse IP</th>
                <th className="text-left text-xs text-gray-500 pb-2 font-medium">Type d'appareil</th>
                <th className="text-left text-xs text-gray-500 pb-2 font-medium">Heure du log</th>
                <th className="text-left text-xs text-gray-500 pb-2 font-medium">Utilisation des données</th>
                <th className="text-left text-xs text-gray-500 pb-2 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 text-sm font-medium">{log.deviceName}</td>
                  <td className="py-3 text-sm text-gray-600 font-mono">{log.macAddress}</td>
                  <td className="py-3 text-sm text-gray-600 font-mono">{log.ipAddress}</td>
                  <td className="py-3 text-sm text-gray-600">{log.deviceType}</td>
                  <td className="py-3 text-sm text-gray-600">{log.logTime}</td>
                  <td className="py-3 text-sm text-gray-600">{log.dataUsage}</td>
                  <td className="py-3">
                    <Badge 
                      variant={
                        log.status === 'active' ? 'default' : 
                        log.status === 'waiting' ? 'secondary' : 
                        'outline'
                      }
                      className={
                        log.status === 'active' ? 'bg-green-500 hover:bg-green-600' :
                        log.status === 'waiting' ? 'bg-orange-500 hover:bg-orange-600' :
                        'bg-gray-500 hover:bg-gray-600'
                      }
                    >
                      {log.status === 'active' ? 'Connecté' :
                       log.status === 'waiting' ? 'En attente' : 
                       'Déconnecté'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}