import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Clock, Wifi, AlertCircle } from 'lucide-react';

interface ConnectionTimerProps {
  connectionStatus: 'connected' | 'waiting';
  connectionTime: number;
  waitTime: number;
  maxConnectionTime: number;
  maxWaitTime: number;
}

export function ConnectionTimer({
  connectionStatus,
  connectionTime,
  waitTime,
  maxConnectionTime,
  maxWaitTime
}: ConnectionTimerProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCircularProgress = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    const circumference = 2 * Math.PI * 45; // rayon de 45
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return { circumference, strokeDashoffset, percentage };
  };

  if (connectionStatus === 'connected') {
    const { circumference, strokeDashoffset, percentage } = getCircularProgress(connectionTime, maxConnectionTime);
    
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Wifi className="w-5 h-5" />
            Session de connexion active
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-8">
            {/* Timer circulaire */}
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-green-200"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="text-green-600 transition-all duration-1000 ease-in-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-mono font-bold text-green-700">
                  {formatTime(maxConnectionTime - connectionTime)}
                </div>
                <div className="text-xs text-green-600">restant</div>
              </div>
            </div>

            {/* Informations */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-green-700 mb-2">Temps de connexion</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Utilisé:</span>
                    <span className="font-mono">{formatTime(connectionTime)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total:</span>
                    <span className="font-mono">{formatTime(maxConnectionTime)}</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              </div>
              
              <div className="text-sm text-green-600 bg-green-100 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5" />
                  <div>
                    <p className="font-medium">Profitez de votre connexion!</p>
                    <p>Vous serez automatiquement déconnecté à la fin du timer.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (connectionStatus === 'waiting') {
    const { circumference, strokeDashoffset, percentage } = getCircularProgress(maxWaitTime - waitTime, maxWaitTime);
    
    return (
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <AlertCircle className="w-5 h-5" />
            Période d'attente active
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-8">
            {/* Timer circulaire */}
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-orange-200"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="text-orange-600 transition-all duration-1000 ease-in-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-mono font-bold text-orange-700">
                  {formatTime(waitTime)}
                </div>
                <div className="text-xs text-orange-600">attente</div>
              </div>
            </div>

            {/* Informations */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-orange-700 mb-2">Temps d'attente</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Écoulé:</span>
                    <span className="font-mono">{formatTime(maxWaitTime - waitTime)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total:</span>
                    <span className="font-mono">{formatTime(maxWaitTime)}</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              </div>
              
              <div className="text-sm text-orange-600 bg-orange-100 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5" />
                  <div>
                    <p className="font-medium">Veuillez patienter</p>
                    <p>Vous pourrez vous reconnecter une fois le délai écoulé.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}