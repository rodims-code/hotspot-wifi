import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { QRCodeGenerator } from './QRCodeGenerator';
import { ConnectionTimer } from './ConnectionTimer';
import { Wifi, Clock, Users, Shield } from 'lucide-react';

type ConnectionStatus = 'disconnected' | 'connected' | 'waiting' | 'restricted';

export function UserConnectionPanel() {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [username, setUsername] = useState('');
  const [connectionTime, setConnectionTime] = useState(0); // en secondes
  const [waitTime, setWaitTime] = useState(0); // en secondes
  const [maxConnectionTime] = useState(3600); // 1 heure en secondes
  const [maxWaitTime] = useState(1800); // 30 minutes en secondes

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (connectionStatus === 'connected' && connectionTime < maxConnectionTime) {
      interval = setInterval(() => {
        setConnectionTime(prev => {
          if (prev >= maxConnectionTime - 1) {
            setConnectionStatus('waiting');
            setWaitTime(maxWaitTime);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (connectionStatus === 'waiting' && waitTime > 0) {
      interval = setInterval(() => {
        setWaitTime(prev => {
          if (prev <= 1) {
            setConnectionStatus('disconnected');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [connectionStatus, connectionTime, waitTime, maxConnectionTime, maxWaitTime]);

  const handleConnect = () => {
    if (username.trim()) {
      setConnectionStatus('connected');
      setConnectionTime(0);
    }
  };

  const handleDisconnect = () => {
    setConnectionStatus('disconnected');
    setConnectionTime(0);
    setWaitTime(0);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'green';
      case 'waiting': return 'orange';
      case 'restricted': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Connecté';
      case 'waiting': return 'Période d\'attente';
      case 'restricted': return 'Accès restreint';
      default: return 'Déconnecté';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Statut de connexion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="w-5 h-5" />
            Statut de connexion WiFi
            <Badge 
              variant={connectionStatus === 'connected' ? 'default' : 'secondary'}
              className={`ml-auto ${
                connectionStatus === 'connected' ? 'bg-green-500' : 
                connectionStatus === 'waiting' ? 'bg-orange-500' :
                'bg-gray-500'
              }`}
            >
              {getStatusText()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
              connectionStatus === 'connected' ? 'bg-green-100 text-green-600' :
              connectionStatus === 'waiting' ? 'bg-orange-100 text-orange-600' :
              'bg-gray-100 text-gray-600'
            }`}>
              <Wifi className="w-8 h-8" />
            </div>
            <p className="text-gray-600">
              {connectionStatus === 'disconnected' && "Entrez votre nom d'utilisateur pour vous connecter au WiFi"}
              {connectionStatus === 'connected' && `Connecté en tant que ${username}`}
              {connectionStatus === 'waiting' && "Vous devez attendre avant de pouvoir vous reconnecter"}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panneau de connexion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Connexion utilisateur
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Entrez votre nom d'utilisateur"
                disabled={connectionStatus !== 'disconnected'}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleConnect}
                disabled={!username.trim() || connectionStatus !== 'disconnected'}
                className="flex-1"
              >
                Se connecter
              </Button>
              <Button 
                variant="outline"
                onClick={handleDisconnect}
                disabled={connectionStatus === 'disconnected'}
              >
                Déconnecter
              </Button>
            </div>

            {connectionStatus === 'connected' && (
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Temps de connexion</span>
                  <span className="font-mono">{formatTime(connectionTime)}</span>
                </div>
                <Progress 
                  value={(connectionTime / maxConnectionTime) * 100} 
                  className="h-2"
                />
                <div className="text-xs text-gray-500 text-center">
                  {formatTime(maxConnectionTime - connectionTime)} restant
                </div>
              </div>
            )}

            {connectionStatus === 'waiting' && (
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Temps d'attente</span>
                  <span className="font-mono text-orange-600">{formatTime(waitTime)}</span>
                </div>
                <Progress 
                  value={((maxWaitTime - waitTime) / maxWaitTime) * 100} 
                  className="h-2"
                />
                <div className="text-xs text-gray-500 text-center">
                  Vous pourrez vous reconnecter dans {formatTime(waitTime)}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* QR Code */}
        <Card>
          <CardHeader>
            <CardTitle>Code QR pour connexion rapide</CardTitle>
          </CardHeader>
          <CardContent>
            <QRCodeGenerator />
          </CardContent>
        </Card>
      </div>

      {/* Informations sur les restrictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Règles de connexion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-medium mb-1">Durée de connexion</h3>
              <p className="text-sm text-gray-600">1 heure maximum par session</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <h3 className="font-medium mb-1">Période d'attente</h3>
              <p className="text-sm text-gray-600">30 minutes avant reconnexion</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Wifi className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-medium mb-1">Connexion automatique</h3>
              <p className="text-sm text-gray-600">Utilisez le QR code pour vous connecter</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timer de connexion */}
      {(connectionStatus === 'connected' || connectionStatus === 'waiting') && (
        <ConnectionTimer 
          connectionStatus={connectionStatus}
          connectionTime={connectionTime}
          waitTime={waitTime}
          maxConnectionTime={maxConnectionTime}
          maxWaitTime={maxWaitTime}
        />
      )}
    </div>
  );
}