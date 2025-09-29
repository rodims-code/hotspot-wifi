import React, { useState, useEffect } from 'react';
import { WiFiDashboard } from './components/WiFiDashboard';
import { UserConnectionPanel } from './components/UserConnectionPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">W</span>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">WiFi Hotspot Manager</h1>
                <p className="text-gray-600">Gérez, surveillez et sécurisez votre réseau sans effort</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">20 June, 2024</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-medium">55 MTN</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="dashboard">Dashboard Admin</TabsTrigger>
            <TabsTrigger value="connection">Connexion WiFi</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-6">
            <WiFiDashboard />
          </TabsContent>
          
          <TabsContent value="connection" className="mt-6">
            <UserConnectionPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}