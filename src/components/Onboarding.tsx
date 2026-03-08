import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet, Car, TrendingDown, MapPin, ChevronRight, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    id: 1,
    title: "Yakıtım'a Hoş Geldiniz",
    description: "Araçlarınızın yakıt tüketimini ve masraflarını akıllıca takip edin.",
    icon: <Droplet className="w-16 h-16 text-indigo-500" />,
    color: "bg-indigo-100"
  },
  {
    id: 2,
    title: "Birden Fazla Araç",
    description: "Tüm araçlarınızı tek bir yerden yönetin. Her araç için ayrı yakıt geçmişi tutun.",
    icon: <Car className="w-16 h-16 text-blue-500" />,
    color: "bg-blue-100"
  },
  {
    id: 3,
    title: "Güncel Fiyatlar",
    description: "Bulunduğunuz bölgedeki güncel akaryakıt fiyatlarını anında görün ve karşılaştırın.",
    icon: <MapPin className="w-16 h-16 text-emerald-500" />,
    color: "bg-emerald-100"
  },
  {
    id: 4,
    title: "Kilometre Takibi",
    description: "Aracınızın güncel kilometresini kaydederek ne kadar yol yaptığınızı kolayca analiz edin.",
    icon: <TrendingDown className="w-16 h-16 text-amber-500" />,
    color: "bg-amber-100"
  }
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col items-center text-center w-full max-w-sm"
          >
            <div className={`w-32 h-32 rounded-full ${steps[currentStep].color} flex items-center justify-center mb-8 shadow-inner`}>
              {steps[currentStep].icon}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              {steps[currentStep].title}
            </h2>
            <p className="text-slate-500 leading-relaxed">
              {steps[currentStep].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 pb-12 flex flex-col items-center gap-8">
        {/* Pagination Dots */}
        <div className="flex gap-2">
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="w-full max-w-sm bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all"
        >
          {currentStep === steps.length - 1 ? (
            <>
              Başla <Check className="w-5 h-5" />
            </>
          ) : (
            <>
              İleri <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
