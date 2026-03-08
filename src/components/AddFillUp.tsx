import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { stations, fuelTypes } from '../data/fuelPrices';
import { FillUp } from '../types';
import { X, MapPin, Droplet, Calculator, CheckCircle, Flame, Wind, Fuel } from 'lucide-react';
import { FuelPricesData } from '../services/fuelService';

interface AddFillUpProps {
  vehicleId: string;
  fuelPrices: FuelPricesData;
  onSave: (fillUp: FillUp) => void;
  onCancel: () => void;
}

export default function AddFillUp({ vehicleId, fuelPrices, onSave, onCancel }: AddFillUpProps) {
  const [station, setStation] = useState(stations[0]);
  const [fuelType, setFuelType] = useState(fuelTypes[0]);
  const [liters, setLiters] = useState<string>('');
  const [pricePerLiter, setPricePerLiter] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // Update price per liter when station or fuel type changes
    const price = fuelPrices[station]?.[fuelType] || 0;
    setPricePerLiter(price);
  }, [station, fuelType, fuelPrices]);

  useEffect(() => {
    // Calculate total cost when liters or price changes
    const l = parseFloat(liters);
    if (!isNaN(l) && l > 0) {
      setTotalCost(l * pricePerLiter);
    } else {
      setTotalCost(0);
    }
  }, [liters, pricePerLiter]);

  const handleSave = () => {
    const l = parseFloat(liters);
    if (isNaN(l) || l <= 0) {
      alert("Lütfen geçerli bir litre miktarı girin.");
      return;
    }

    const newFillUp: FillUp = {
      id: Date.now().toString(),
      vehicleId,
      date: new Date().toISOString(),
      station,
      fuelType,
      liters: l,
      pricePerLiter,
      totalCost
    };

    onSave(newFillUp);
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
        <h2 className="text-lg font-bold text-slate-800">Yakıt Alımı Ekle</h2>
        <button onClick={onCancel} className="p-2 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors">
          <X className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Station Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-500" />
            İstasyon
          </label>
          <div className="grid grid-cols-2 gap-3">
            {stations.map(s => {
              const isSelected = station === s;
              return (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={s}
                  onClick={() => setStation(s)}
                  className={`p-3 rounded-xl border text-sm font-medium flex items-center justify-between transition-colors ${
                    isSelected 
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                  }`}
                >
                  {s}
                  {isSelected && <CheckCircle className="w-4 h-4 text-indigo-600" />}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Fuel Type Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Fuel className="w-4 h-4 text-indigo-500" />
            Yakıt Tipi
          </label>
          <div className="grid grid-cols-3 gap-3">
            {fuelTypes.map(f => {
              const isSelected = fuelType === f;
              return (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  key={f}
                  onClick={() => setFuelType(f)}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center transition-colors ${
                    isSelected 
                      ? 'bg-indigo-50 border-indigo-500 shadow-sm' 
                      : 'bg-white border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  {f.includes('Benzin') && <Flame className={`w-7 h-7 mb-2 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />}
                  {f.includes('Dizel') && <Droplet className={`w-7 h-7 mb-2 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />}
                  {f.includes('LPG') && <Wind className={`w-7 h-7 mb-2 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />}
                  <span className={`text-xs font-bold ${isSelected ? 'text-indigo-700' : 'text-slate-600'}`}>
                    {f.split(' ')[0]}
                  </span>
                  <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-indigo-500' : 'text-slate-400'}`}>
                    {f.includes('Benzin') ? '(Benzin)' : f.includes('Dizel') ? '(Dizel)' : '(LPG)'}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Liters Input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-indigo-500" />
            Miktar (Litre)
          </label>
          <div className="relative">
            <input
              type="number"
              value={liters}
              onChange={(e) => setLiters(e.target.value)}
              placeholder="Örn: 45.5"
              step="0.01"
              min="0"
              className="w-full p-4 rounded-xl border border-slate-200 bg-white text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">L</span>
          </div>
        </div>

        {/* Summary Card */}
        <motion.div 
          layout
          className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-100 mt-6 shadow-sm"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-indigo-800/70">Birim Fiyat</span>
            <span className="font-semibold text-indigo-900">₺{pricePerLiter.toFixed(2)} / L</span>
          </div>
          <div className="flex justify-between items-end pt-3 border-t border-indigo-200/50">
            <span className="text-sm font-bold text-indigo-900">Toplam Tutar</span>
            <motion.span 
              key={totalCost}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-black text-indigo-600 tracking-tight"
            >
              ₺{totalCost.toFixed(2)}
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-white border-t border-slate-100">
        <button
          onClick={handleSave}
          disabled={!liters || parseFloat(liters) <= 0}
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Kaydet
        </button>
      </div>
    </motion.div>
  );
}
