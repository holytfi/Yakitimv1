import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Droplet, Car } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2.5 seconds splash screen
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-indigo-600 text-white"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="relative mb-6">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <Car className="w-16 h-16 text-white" />
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
            className="absolute -top-2 -right-2 bg-amber-400 p-1.5 rounded-full"
          >
            <Droplet className="w-5 h-5 text-indigo-900 fill-current" />
          </motion.div>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-4xl font-bold tracking-tight"
        >
          Yakıtım
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-indigo-200 mt-3 text-sm font-medium tracking-wide"
        >
          Akıllı Yakıt Takip Asistanı
        </motion.p>
      </motion.div>
      
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        className="absolute bottom-12 w-32 h-1 bg-indigo-400/50 rounded-full overflow-hidden"
      >
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut", repeat: Infinity }}
          className="w-full h-full bg-white rounded-full"
        />
      </motion.div>
    </motion.div>
  );
}
