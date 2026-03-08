import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Vehicle, FillUp, UserSettings } from '../types';
import { Car, Plus, Droplet, Calendar, MapPin, CreditCard, Settings as SettingsIcon, BellRing, ChevronDown, Check, Trash2 } from 'lucide-react';

interface DashboardProps {
  activeVehicle: Vehicle;
  allVehicles: Vehicle[];
  fillUps: FillUp[];
  settings: UserSettings;
  onAddFillUp: () => void;
  onOpenSettings: () => void;
  onSwitchVehicle: (vehicleId: string) => void;
  onUpdateVehicle: (vehicle: Vehicle) => void;
}

export default function Dashboard({ 
  activeVehicle, 
  allVehicles, 
  fillUps, 
  settings, 
  onAddFillUp, 
  onOpenSettings,
  onSwitchVehicle,
  onUpdateVehicle
}: DashboardProps) {
  const [isVehicleMenuOpen, setIsVehicleMenuOpen] = useState(false);
  const [isEditingMileage, setIsEditingMileage] = useState(false);
  const [tempMileage, setTempMileage] = useState(activeVehicle.mileage?.toString() || '');

  React.useEffect(() => {
    setTempMileage(activeVehicle.mileage?.toString() || '');
    setIsEditingMileage(false);
  }, [activeVehicle.id, activeVehicle.mileage]);
  
  const activeFillUps = fillUps.filter(f => f.vehicleId === activeVehicle.id);
  const totalSpent = activeFillUps.reduce((sum, f) => sum + f.totalCost, 0);
  const totalLiters = activeFillUps.reduce((sum, f) => sum + f.liters, 0);

  // Check if we need to show a reminder
  const showReminder = () => {
    if (!settings.remindFillUp || activeFillUps.length === 0) return false;
    
    const lastFillUpDate = new Date(activeFillUps[activeFillUps.length - 1].date).getTime();
    const now = Date.now();
    const daysSinceLastFillUp = (now - lastFillUpDate) / (1000 * 60 * 60 * 24);
    
    return daysSinceLastFillUp >= settings.remindDays;
  };

  const handleSaveMileage = () => {
    const newMileage = parseInt(tempMileage, 10);
    if (!isNaN(newMileage)) {
      onUpdateVehicle({ ...activeVehicle, mileage: newMileage });
    }
    setIsEditingMileage(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative pb-24">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-6 pt-12 shadow-md rounded-b-3xl relative z-20">
        <div className="flex justify-between items-start mb-6 gap-4">
          <div className="relative flex-1 min-w-0">
            <p className="text-indigo-200 text-xs font-medium uppercase tracking-wider mb-1">Aktif Araç</p>
            <button 
              onClick={() => setIsVehicleMenuOpen(!isVehicleMenuOpen)}
              className="flex items-center gap-2 text-left group w-full"
            >
              <h1 className="text-2xl font-bold flex items-center gap-2 truncate">
                <Car className="w-6 h-6 shrink-0" />
                <span className="truncate">{activeVehicle.make} {activeVehicle.model}</span>
              </h1>
              <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isVehicleMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            <p className="text-indigo-100 mt-1 text-sm">{activeVehicle.year}</p>

            {/* Vehicle Switcher Dropdown */}
            <AnimatePresence>
              {isVehicleMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setIsVehicleMenuOpen(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-40"
                  >
                    <div className="p-2 space-y-1">
                      {allVehicles.map(v => (
                        <button
                          key={v.id}
                          onClick={() => {
                            onSwitchVehicle(v.id);
                            setIsVehicleMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                            v.id === activeVehicle.id 
                              ? 'bg-indigo-50 text-indigo-700' 
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Car className={`w-4 h-4 ${v.id === activeVehicle.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                            <div className="text-left">
                              <p className="text-sm font-bold">{v.make} {v.model}</p>
                              <p className="text-[10px] opacity-70">{v.year}</p>
                            </div>
                          </div>
                          {v.id === activeVehicle.id && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex flex-col gap-2 items-end shrink-0">
            <button 
              onClick={onOpenSettings}
              className="p-3 bg-indigo-700/50 hover:bg-indigo-700 rounded-full transition-colors shadow-sm"
            >
              <SettingsIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
            <p className="text-indigo-200 text-xs mb-1">Toplam Harcama</p>
            <p className="text-xl font-bold">₺{totalSpent.toFixed(2)}</p>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
            <p className="text-indigo-200 text-xs mb-1">Toplam Yakıt</p>
            <p className="text-xl font-bold">{totalLiters.toFixed(2)} L</p>
          </div>
          <div className="col-span-2 bg-white/10 p-4 rounded-2xl backdrop-blur-sm flex items-center justify-between">
            <div>
              <p className="text-indigo-200 text-xs mb-1">Güncel Kilometre</p>
              {isEditingMileage ? (
                <div className="flex items-center gap-2 mt-1">
                  <input 
                    type="number" 
                    value={tempMileage}
                    onChange={(e) => setTempMileage(e.target.value)}
                    className="bg-white/20 text-white placeholder-indigo-200 px-3 py-1 rounded-lg outline-none focus:ring-2 focus:ring-white/50 w-32 font-bold"
                    placeholder="Örn: 120000"
                    autoFocus
                  />
                  <span className="text-sm font-medium">km</span>
                </div>
              ) : (
                <p className="text-xl font-bold">
                  {activeVehicle.mileage ? `${activeVehicle.mileage.toLocaleString('tr-TR')} km` : 'Belirtilmedi'}
                </p>
              )}
            </div>
            {isEditingMileage ? (
              <button 
                onClick={handleSaveMileage}
                className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors shadow-sm"
              >
                Kaydet
              </button>
            ) : (
              <button 
                onClick={() => {
                  setTempMileage(activeVehicle.mileage?.toString() || '');
                  setIsEditingMileage(true);
                }}
                className="bg-indigo-700/50 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Güncelle
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 mt-2">
        {showReminder() && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-4 flex items-start gap-3 shadow-sm"
          >
            <div className="bg-amber-100 p-2 rounded-full shrink-0">
              <BellRing className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="text-amber-800 font-semibold text-sm">Yakıt Alım Zamanı!</h4>
              <p className="text-amber-700/80 text-xs mt-1">
                Son yakıt alımınızın üzerinden {settings.remindDays} günden fazla zaman geçti. Yakıt almayı unutmayın.
              </p>
            </div>
          </motion.div>
        )}

        <h2 className="text-lg font-semibold text-slate-800 mb-4 px-1">Son Alımlar</h2>
        
        {activeFillUps.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Droplet className="w-8 h-8 text-indigo-500" />
            </div>
            <h3 className="text-slate-700 font-medium mb-2">Henüz yakıt alımı eklenmedi</h3>
            <p className="text-slate-500 text-sm">Sağ alt köşedeki butona tıklayarak ilk yakıt alımınızı ekleyin.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeFillUps.slice().reverse().map((fillUp) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={fillUp.id} 
                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{fillUp.station}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(fillUp.date).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-800">₺{fillUp.totalCost.toFixed(2)}</p>
                    <p className="text-xs text-slate-500">{fillUp.liters} L</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                    {fillUp.fuelType}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <CreditCard className="w-3 h-3" />
                    ₺{fillUp.pricePerLiter.toFixed(2)} / L
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={onAddFillUp}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg shadow-indigo-200 flex items-center justify-center hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all z-10"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
