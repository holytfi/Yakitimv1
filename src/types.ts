export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage?: number;
}

export interface FillUp {
  id: string;
  vehicleId: string;
  date: string;
  station: string;
  fuelType: string;
  liters: number;
  pricePerLiter: number;
  totalCost: number;
}


export interface UserSettings {
  remindFillUp: boolean;
  remindDays: number;
  notifyPriceChange: boolean;
  priceChangeThreshold: number;
}

