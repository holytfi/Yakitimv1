import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import VehicleSetup from './components/VehicleSetup';
import Dashboard from './components/Dashboard';
import AddFillUp from './components/AddFillUp';
import Settings from './components/Settings';
import SplashScreen from './components/SplashScreen';
import Onboarding from './components/Onboarding';
import { Vehicle, FillUp, UserSettings } from './types';
import { fetchCurrentFuelPrices, FuelPricesData } from './services/fuelService';
import { fallbackFuelPrices } from './data/fuelPrices';

const defaultSettings: UserSettings = {
  remindFillUp: false,
  remindDays: 7,
  notifyPriceChange: false,
  priceChangeThreshold: 5,
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('yakit_takip_onboarding_complete');
  });
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const stored = localStorage.getItem('yakit_takip_vehicles');
    if (stored) return JSON.parse(stored);
    
    // Migration for old single vehicle data
    const oldVehicle = localStorage.getItem('yakit_takip_vehicle');
    if (oldVehicle) {
      const v = JSON.parse(oldVehicle);
      return [{ ...v, id: v.id || 'legacy-1' }];
    }
    return [];
  });

  const [activeVehicleId, setActiveVehicleId] = useState<string | null>(() => {
    const stored = localStorage.getItem('yakit_takip_active_vehicle_id');
    if (stored) return stored;
    return vehicles.length > 0 ? vehicles[0].id : null;
  });
  
  const [fillUps, setFillUps] = useState<FillUp[]>(() => {
    const stored = localStorage.getItem('yakit_takip_fillups');
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    
    // Migration for old fillups without vehicleId
    const firstVehicleId = vehicles.length > 0 ? vehicles[0].id : 'legacy-1';
    return parsed.map((f: any) => ({
      ...f,
      vehicleId: f.vehicleId || firstVehicleId
    }));
  });

  const [fuelPrices, setFuelPrices] = useState<FuelPricesData>(() => {
    const stored = localStorage.getItem('yakit_takip_prices');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge stored prices with fallback to ensure new stations are included
      return { ...fallbackFuelPrices, ...parsed };
    }
    return fallbackFuelPrices;
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    const stored = localStorage.getItem('yakit_takip_settings');
    return stored ? JSON.parse(stored) : defaultSettings;
  });
  
  const [isAddingFillUp, setIsAddingFillUp] = useState(false);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUpdatingPrices, setIsUpdatingPrices] = useState(false);

  const activeVehicle = vehicles.find(v => v.id === activeVehicleId) || null;

  useEffect(() => {
    const checkAndUpdatePrices = async () => {
      const lastUpdate = localStorage.getItem('yakit_takip_prices_last_update');
      const now = Date.now();
      const ONE_DAY = 24 * 60 * 60 * 1000;

      if (!lastUpdate || now - parseInt(lastUpdate, 10) > ONE_DAY) {
        setIsUpdatingPrices(true);
        try {
          const newPrices = await fetchCurrentFuelPrices();
          setFuelPrices(newPrices);
          localStorage.setItem('yakit_takip_prices', JSON.stringify(newPrices));
          localStorage.setItem('yakit_takip_prices_last_update', now.toString());
        } catch (error) {
          console.error("Failed to fetch fuel prices:", error);
        } finally {
          setIsUpdatingPrices(false);
        }
      }
    };

    checkAndUpdatePrices();
  }, [settings.notifyPriceChange, settings.priceChangeThreshold]);

  // Save vehicles to localStorage
  useEffect(() => {
    localStorage.setItem('yakit_takip_vehicles', JSON.stringify(vehicles));
    if (vehicles.length === 0) {
      localStorage.removeItem('yakit_takip_active_vehicle_id');
    }
  }, [vehicles]);

  // Save active vehicle ID
  useEffect(() => {
    if (activeVehicleId) {
      localStorage.setItem('yakit_takip_active_vehicle_id', activeVehicleId);
    } else {
      localStorage.removeItem('yakit_takip_active_vehicle_id');
    }
  }, [activeVehicleId]);

  // Save fillUps to localStorage
  useEffect(() => {
    localStorage.setItem('yakit_takip_fillups', JSON.stringify(fillUps));
  }, [fillUps]);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('yakit_takip_settings', JSON.stringify(settings));
  }, [settings]);

  const handleVehicleComplete = (v: Vehicle) => {
    setVehicles(prev => [...prev, v]);
    setActiveVehicleId(v.id);
    setIsAddingVehicle(false);
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    const newVehicles = vehicles.filter(v => v.id !== vehicleId);
    const newFillUps = fillUps.filter(f => f.vehicleId !== vehicleId);
    
    setVehicles(newVehicles);
    setFillUps(newFillUps);
    
    if (activeVehicleId === vehicleId) {
      if (newVehicles.length > 0) {
        setActiveVehicleId(newVehicles[0].id);
      } else {
        setActiveVehicleId(null);
      }
    }
  };

  const handleUpdateVehicle = (updatedVehicle: Vehicle) => {
    setVehicles(prev => prev.map(v => v.id === updatedVehicle.id ? updatedVehicle : v));
  };

  const handleSaveFillUp = (fillUp: FillUp) => {
    setFillUps(prev => [...prev, fillUp]);
    setIsAddingFillUp(false);
  };

  const handleSaveSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    setIsSettingsOpen(false);
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('yakit_takip_onboarding_complete', 'true');
    setShowOnboarding(false);
  };

  return (
    <div className="font-sans antialiased text-slate-900 max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && showOnboarding ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <>
          {isUpdatingPrices && (
            <div className="bg-indigo-500 text-white text-xs text-center py-1 font-medium">
              Güncel yakıt fiyatları kontrol ediliyor...
            </div>
          )}
          
          {(!activeVehicle || isAddingVehicle) ? (
            <VehicleSetup onComplete={handleVehicleComplete} />
          ) : (
            <Dashboard 
              activeVehicle={activeVehicle} 
              allVehicles={vehicles}
              fillUps={fillUps} 
              settings={settings}
              onAddFillUp={() => setIsAddingFillUp(true)} 
              onOpenSettings={() => setIsSettingsOpen(true)}
              onSwitchVehicle={(id) => setActiveVehicleId(id)}
              onUpdateVehicle={handleUpdateVehicle}
            />
          )}

          <AnimatePresence>
            {isAddingFillUp && activeVehicle && (
              <AddFillUp 
                vehicleId={activeVehicle.id}
                fuelPrices={fuelPrices}
                onSave={handleSaveFillUp} 
                onCancel={() => setIsAddingFillUp(false)} 
              />
            )}
            {isSettingsOpen && (
              <Settings 
                settings={settings}
                allVehicles={vehicles}
                onDeleteVehicle={handleDeleteVehicle}
                onAddNewVehicle={() => {
                  setIsAddingVehicle(true);
                  setIsSettingsOpen(false);
                }}
                onSave={handleSaveSettings}
                onClose={() => setIsSettingsOpen(false)}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
