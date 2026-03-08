export const carMakes = [
  "Alfa Romeo", "Audi", "BMW", "Chery", "Chevrolet", "Citroen", "Dacia", "Fiat", "Ford", "Geely", "Honda", "Hyundai",
  "Kia", "Lada", "Mazda", "Mercedes-Benz", "Mitsubishi", "Nissan", "Opel", "Peugeot", "Renault",
  "Seat", "Skoda", "Subaru", "Suzuki", "Tofaş", "Toyota", "Volkswagen", "Volvo"
];

export const carModels: Record<string, string[]> = {
  "Alfa Romeo": ["Giulietta", "Tonale", "Stelvio", "159", "156"],
  "Audi": ["A3", "A4", "A5", "A6", "Q2", "Q3", "Q5", "Q7"],
  "BMW": ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "X1", "X3", "X5"],
  "Chery": ["Tiggo 8 Pro", "Tiggo 7 Pro", "Omoda 5", "Tiggo 4 Pro", "Tiggo 3", "Alia", "Chance", "Kimo", "Niche"],
  "Chevrolet": ["Cruze", "Aveo", "Captiva", "Lacetti", "Kalos", "Spark", "Trax", "Epica"],
  "Citroen": ["C3", "C4", "C5 Aircross", "Berlingo", "C-Elysee", "Nemo", "C3 Aircross"],
  "Dacia": ["Sandero", "Duster", "Logan", "Spring", "Jogger", "Lodgy", "Dokker"],
  "Fiat": ["Egea", "Panda", "500", "Fiorino", "Doblo", "Linea", "Albea", "Punto", "Tempra", "Tipo", "Uno"],
  "Ford": ["Fiesta", "Focus", "Puma", "Kuga", "Tourneo", "Transit", "Courier", "Mondeo", "Escort", "C-Max"],
  "Geely": ["Echo", "Emgrand", "Familia", "FC", "MK"],
  "Honda": ["Civic", "City", "CR-V", "HR-V", "Accord", "Jazz"],
  "Hyundai": ["i10", "i20", "Tucson", "Elantra", "Bayon", "Accent", "Accent Era", "Accent Blue", "Getz", "i30"],
  "Kia": ["Picanto", "Rio", "Ceed", "Sportage", "Stonic", "Cerato", "Bongo"],
  "Lada": ["Vega", "Niva", "Samara", "Kalina", "Priora"],
  "Mazda": ["3", "6", "CX-5", "CX-3", "2", "RX-8"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "GLA", "GLB", "GLC", "Vito", "Sprinter"],
  "Mitsubishi": ["L200", "Lancer", "ASX", "Space Star", "Colt", "Outlander"],
  "Nissan": ["Micra", "Juke", "Qashqai", "X-Trail", "Navara", "Note", "Almera"],
  "Opel": ["Corsa", "Astra", "Crossland", "Mokka", "Grandland", "Vectra", "Insignia", "Combo", "Zafira"],
  "Peugeot": ["208", "308", "2008", "3008", "5008", "206", "207", "301", "Partner", "Rifter"],
  "Renault": ["Clio", "Megane", "Captur", "Kadjar", "Taliant", "Symbol", "Fluence", "Toros", "R9", "R12", "R19", "Kangoo", "Austral"],
  "Seat": ["Leon", "Ibiza", "Arona", "Ateca", "Tarraco", "Toledo"],
  "Skoda": ["Fabia", "Scala", "Octavia", "Kamiq", "Karoq", "Superb", "Kodiaq"],
  "Subaru": ["XV", "Forester", "Impreza", "Outback", "Levorg"],
  "Suzuki": ["Swift", "Vitara", "Jimny", "S-Cross", "Alto"],
  "Tofaş": ["Şahin", "Doğan", "Kartal", "Serçe"],
  "Toyota": ["Corolla", "Yaris", "C-HR", "RAV4", "Hilux", "Auris", "Avensis", "Proace City"],
  "Volkswagen": ["Polo", "Golf", "Passat", "T-Roc", "Tiguan", "Jetta", "Caddy", "Transporter", "Bora", "Amarok", "Taigo"],
  "Volvo": ["XC40", "XC60", "XC90", "S60", "V60", "S90", "V40", "S40"]
};

export const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= 1980; i--) {
    years.push(i);
  }
  return years;
};
