import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { NetworkChart } from './NetworkChart';
import { DeviceStatistics } from './DeviceStatistics';
import { SystemLogs } from './SystemLogs';
import { Wifi, Shield, Users, Settings } from 'lucide-react';

export function WiFiDashboard() {
  return (
    <div className="space-y-6">
      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Vitesse Internet */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Vitesse Internet actuelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative w-24 h-24 mx-auto">
                <div className="w-24 h-24 rounded-full border-8 border-gray-200 relative">
                  <div className="absolute inset-0 rounded-full border-8 border-orange-500 border-t-transparent transform rotate-45"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-semibold">21.53</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">↑ Vitesse upload</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vitesse de téléchargement */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Vitesse de téléchargement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative w-24 h-24 mx-auto">
                <div className="w-24 h-24 rounded-full border-8 border-gray-200 relative">
                  <div className="absolute inset-0 rounded-full border-8 border-blue-500 border-t-transparent transform rotate-90"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-semibold">45.53</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">↓ Vitesse download</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Utilisation des données */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600">Données totales utilisées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-semibold">120GB</div>
                <div className="text-xs text-gray-500">Utilisation actuelle des données</div>
              </div>
              <Progress value={24} className="h-2" />
              <div className="text-center text-xs text-gray-500">24%</div>
              <div className="text-center">
                <div className="text-sm font-medium">500GB</div>
                <div className="text-xs text-gray-500">Limite totale de données</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vitesse moyenne */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600">Vitesse moyenne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-lg font-semibold">38 <span className="text-sm">Mbps</span></div>
                <div className="text-xs text-gray-500">Vitesse upload</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">18.4 <span className="text-sm">Mbps</span></div>
                <div className="text-xs text-gray-500">Vitesse download</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Paramètres WiFi et Performance réseau */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Paramètres WiFi */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Paramètres WiFi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Mode WiFi</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Contrôle parental</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span>Mode invité</span>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Performance réseau */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance réseau</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">24 Heures</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <NetworkChart />
          </CardContent>
        </Card>
      </div>

      {/* Statistiques des appareils et infos système */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DeviceStatistics />
        
        <Card>
          <CardHeader>
            <CardTitle>Informations système</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">IMEI</div>
                <div className="font-medium">864920294002234</div>
              </div>
              <div>
                <div className="text-gray-500">Version firmware</div>
                <div className="font-medium">V12.03.01.69.MTN</div>
              </div>
              <div>
                <div className="text-gray-500">Numéro carte SIM</div>
                <div className="font-medium">+123 456 7890</div>
              </div>
              <div>
                <div className="text-gray-500">WAN IP</div>
                <div className="font-medium">10.103.156.34</div>
              </div>
              <div>
                <div className="text-gray-500">Nombre max accès</div>
                <div className="font-medium">5</div>
              </div>
              <div>
                <div className="text-gray-500">Serveur DNS préféré</div>
                <div className="font-medium">105.32.195.32</div>
              </div>
              <div>
                <div className="text-gray-500">Force du signal</div>
                <div className="font-medium">-72 dBM</div>
              </div>
              <div>
                <div className="text-gray-500">Type de connexion</div>
                <div className="font-medium">PPeE</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logs système */}
      <SystemLogs />
    </div>
  );
}