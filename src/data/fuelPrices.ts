export const stations = [
  "Opet", "Shell", "BP", "Petrol Ofisi", "TotalEnergies", "Aytemiz", "Türkiye Petrolleri", "Kadoil", "Sunpet", "M Oil", "Alpet", "Bpet"
];

export const fuelTypes = [
  "Kurşunsuz 95 (Benzin)", "Motorin (Dizel)", "Otogaz (LPG)"
];

// Mock prices in TL (Antalya averages)
export const fallbackFuelPrices: Record<string, Record<string, number>> = {
  "Opet": {
    "Kurşunsuz 95 (Benzin)": 44.50,
    "Motorin (Dizel)": 44.00,
    "Otogaz (LPG)": 23.50
  },
  "Shell": {
    "Kurşunsuz 95 (Benzin)": 44.60,
    "Motorin (Dizel)": 44.10,
    "Otogaz (LPG)": 23.60
  },
  "BP": {
    "Kurşunsuz 95 (Benzin)": 44.45,
    "Motorin (Dizel)": 43.95,
    "Otogaz (LPG)": 23.40
  },
  "Petrol Ofisi": {
    "Kurşunsuz 95 (Benzin)": 44.40,
    "Motorin (Dizel)": 43.90,
    "Otogaz (LPG)": 23.35
  },
  "TotalEnergies": {
    "Kurşunsuz 95 (Benzin)": 44.45,
    "Motorin (Dizel)": 43.95,
    "Otogaz (LPG)": 23.45
  },
  "Aytemiz": {
    "Kurşunsuz 95 (Benzin)": 44.30,
    "Motorin (Dizel)": 43.80,
    "Otogaz (LPG)": 23.20
  },
  "Türkiye Petrolleri": {
    "Kurşunsuz 95 (Benzin)": 44.25,
    "Motorin (Dizel)": 43.75,
    "Otogaz (LPG)": 23.15
  },
  "Kadoil": {
    "Kurşunsuz 95 (Benzin)": 44.15,
    "Motorin (Dizel)": 43.65,
    "Otogaz (LPG)": 23.05
  },
  "Sunpet": {
    "Kurşunsuz 95 (Benzin)": 44.20,
    "Motorin (Dizel)": 43.70,
    "Otogaz (LPG)": 23.10
  },
  "M Oil": {
    "Kurşunsuz 95 (Benzin)": 44.10,
    "Motorin (Dizel)": 43.60,
    "Otogaz (LPG)": 23.00
  },
  "Alpet": {
    "Kurşunsuz 95 (Benzin)": 44.15,
    "Motorin (Dizel)": 43.65,
    "Otogaz (LPG)": 23.05
  },
  "Bpet": {
    "Kurşunsuz 95 (Benzin)": 44.05,
    "Motorin (Dizel)": 43.55,
    "Otogaz (LPG)": 22.95
  }
};
