import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, TrendingUp, Save, Clock, Car, Trash2, Plus } from 'lucide-react';
import { UserSettings, Vehicle } from '../types';

interface SettingsProps {
  settings: UserSettings;
  allVehicles: Vehicle[];
  onDeleteVehicle: (id: string) => void;
  onAddNewVehicle: () => void;
  onSave: (settings: UserSettings) => void;
  onClose: () => void;
}

export default function Settings({ settings, allVehicles, onDeleteVehicle, onAddNewVehicle, onSave, onClose }: SettingsProps) {
  const [localSettings, setLocalSettings] = useState<UserSettings>(settings);
  const [deletingVehicleId, setDeletingVehicleId] = useState<string | null>(null);

  const handleToggle = (key: keyof UserSettings) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleChange = (key: keyof UserSettings, value: number) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    onSave(localSettings);
  };

  const confirmDelete = (id: string) => {
    onDeleteVehicle(id);
    setDeletingVehicleId(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-white z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Bell className="w-5 h-5 text-indigo-500" />
          Ayarlar ve Yönetim
        </h2>
        <button onClick={onClose} className="p-2 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors">
          <X className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Vehicle Management Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Araçlarım</h3>
            <button 
              onClick={onAddNewVehicle}
              className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full transition-colors"
            >
              <Plus className="w-3 h-3" />
              Yeni Araç Ekle
            </button>
          </div>
          <div className="space-y-3">
            {allVehicles.map(v => (
              <div 
                key={v.id}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100">
                      <Car className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{v.make} {v.model}</p>
                      <p className="text-xs text-slate-500">{v.year}</p>
                    </div>
                  </div>
                  
                  {deletingVehicleId !== v.id ? (
                    <button 
                      onClick={() => setDeletingVehicleId(v.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setDeletingVehicleId(null)}
                        className="text-[10px] font-bold text-slate-500 bg-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-300 transition-colors"
                      >
                        İptal
                      </button>
                      <button 
                        onClick={() => confirmDelete(v.id)}
                        className="text-[10px] font-bold text-white bg-rose-500 px-3 py-1.5 rounded-lg hover:bg-rose-600 transition-colors shadow-sm"
                      >
                        Sil
                      </button>
                    </div>
                  )}
                </div>
                
                {deletingVehicleId === v.id && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-[10px] text-rose-500 font-medium bg-rose-50 p-2 rounded-lg border border-rose-100"
                  >
                    ⚠️ Bu aracı ve tüm yakıt verilerini silmek istediğinize emin misiniz?
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-slate-100" />

        {/* Notification Settings Section */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider px-1">Bildirim Tercihleri</h3>
          
          {/* Fill-up Reminder */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Yakıt Alım Hatırlatıcısı</h3>
                  <p className="text-xs text-slate-500">Düzenli yakıt almayı unutmayın</p>
                </div>
              </div>
              <button 
                onClick={() => handleToggle('remindFillUp')}
                className={`w-12 h-6 rounded-full transition-colors relative ${localSettings.remindFillUp ? 'bg-indigo-500' : 'bg-slate-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${localSettings.remindFillUp ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <div className={`overflow-hidden transition-all ${localSettings.remindFillUp ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <label className="text-sm font-medium text-slate-700 flex items-center justify-between">
                <span>Kaç günde bir hatırlatılsın?</span>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    min="1" 
                    max="90"
                    value={localSettings.remindDays}
                    onChange={(e) => handleChange('remindDays', parseInt(e.target.value) || 7)}
                    className="w-16 p-2 text-center rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <span className="text-sm text-slate-500">Gün</span>
                </div>
              </label>
            </div>
          </div>

          {/* Price Change Notification */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-rose-100 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Fiyat Değişimi Uyarısı</h3>
                  <p className="text-xs text-slate-500">Fiyatlar değiştiğinde haber ver</p>
                </div>
              </div>
              <button 
                onClick={() => handleToggle('notifyPriceChange')}
                className={`w-12 h-6 rounded-full transition-colors relative ${localSettings.notifyPriceChange ? 'bg-rose-500' : 'bg-slate-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${localSettings.notifyPriceChange ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <div className={`overflow-hidden transition-all ${localSettings.notifyPriceChange ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <label className="text-sm font-medium text-slate-700 flex items-center justify-between">
                <span>Değişim eşiği (%)</span>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    min="1" 
                    max="50"
                    value={localSettings.priceChangeThreshold}
                    onChange={(e) => handleChange('priceChangeThreshold', parseInt(e.target.value) || 5)}
                    className="w-16 p-2 text-center rounded-lg border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                  <span className="text-sm text-slate-500">%</span>
                </div>
              </label>
              <p className="text-[10px] text-slate-400 mt-2 leading-tight">
                * Fiyatlar bu orandan fazla arttığında veya azaldığında uygulama içinde bildirim gösterilir.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-white border-t border-slate-100">
        <button
          onClick={handleSave}
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-md hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          Ayarları Kaydet
        </button>
      </div>
    </motion.div>
  );
}
