import React, { useState } from 'react';
import { motion } from 'motion/react';
import { carMakes, carModels, getYears } from '../data/cars';
import { Vehicle } from '../types';
import { ChevronRight, Car } from 'lucide-react';

interface VehicleSetupProps {
  onComplete: (vehicle: Vehicle) => void;
}

export default function VehicleSetup({ onComplete }: VehicleSetupProps) {
  const [step, setStep] = useState(1);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number | null>(null);

  const handleMakeSelect = (selectedMake: string) => {
    setMake(selectedMake);
    setStep(2);
  };

  const handleModelSelect = (selectedModel: string) => {
    setModel(selectedModel);
    setStep(3);
  };

  const handleYearSelect = (selectedYear: number) => {
    setYear(selectedYear);
    onComplete({ 
      id: Date.now().toString(),
      make, 
      model, 
      year: selectedYear 
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-indigo-600 text-white p-6 pt-12 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <Car className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Aracınızı Ekleyin</h1>
        </div>
        <p className="text-indigo-100 text-sm">
          {step === 1 && "Lütfen aracınızın markasını seçin."}
          {step === 2 && `${make} - Lütfen model seçin.`}
          {step === 3 && `${make} ${model} - Lütfen üretim yılını seçin.`}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-2 gap-3"
          >
            {carMakes.map((m) => (
              <button
                key={m}
                onClick={() => handleMakeSelect(m)}
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:border-indigo-300 hover:shadow-md transition-all text-left"
              >
                <span className="font-medium text-slate-800">{m}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 gap-3"
          >
            <button
              onClick={() => setStep(1)}
              className="text-indigo-600 text-sm font-medium mb-2 w-fit"
            >
              ← Marka Seçimine Dön
            </button>
            {carModels[make]?.map((m) => (
              <button
                key={m}
                onClick={() => handleModelSelect(m)}
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:border-indigo-300 hover:shadow-md transition-all text-left"
              >
                <span className="font-medium text-slate-800">{m}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-3 gap-3"
          >
            <div className="col-span-3">
              <button
                onClick={() => setStep(2)}
                className="text-indigo-600 text-sm font-medium mb-2 w-fit"
              >
                ← Model Seçimine Dön
              </button>
            </div>
            {getYears().map((y) => (
              <button
                key={y}
                onClick={() => handleYearSelect(y)}
                className="bg-white py-3 rounded-xl shadow-sm border border-slate-100 text-center hover:border-indigo-300 hover:shadow-md transition-all font-medium text-slate-800"
              >
                {y}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
