import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export type FuelPricesData = Record<string, Record<string, number>>;

export async function fetchCurrentFuelPrices(): Promise<FuelPricesData> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Türkiye'deki güncel akaryakıt fiyatlarını (İstanbul Avrupa yakası baz alınarak) Opet, Shell, BP, Petrol Ofisi, TotalEnergies, Aytemiz, Türkiye Petrolleri için araştır. Kurşunsuz 95 (Benzin), Motorin (Dizel) ve Otogaz (LPG) fiyatlarını TL cinsinden bul.",
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          "Opet": { type: Type.OBJECT, properties: { "Kurşunsuz 95 (Benzin)": { type: Type.NUMBER }, "Motorin (Dizel)": { type: Type.NUMBER }, "Otogaz (LPG)": { type: Type.NUMBER } } },
          "Shell": { type: Type.OBJECT, properties: { "Kurşunsuz 95 (Benzin)": { type: Type.NUMBER }, "Motorin (Dizel)": { type: Type.NUMBER }, "Otogaz (LPG)": { type: Type.NUMBER } } },
          "BP": { type: Type.OBJECT, properties: { "Kurşunsuz 95 (Benzin)": { type: Type.NUMBER }, "Motorin (Dizel)": { type: Type.NUMBER }, "Otogaz (LPG)": { type: Type.NUMBER } } },
          "Petrol Ofisi": { type: Type.OBJECT, properties: { "Kurşunsuz 95 (Benzin)": { type: Type.NUMBER }, "Motorin (Dizel)": { type: Type.NUMBER }, "Otogaz (LPG)": { type: Type.NUMBER } } },
          "TotalEnergies": { type: Type.OBJECT, properties: { "Kurşunsuz 95 (Benzin)": { type: Type.NUMBER }, "Motorin (Dizel)": { type: Type.NUMBER }, "Otogaz (LPG)": { type: Type.NUMBER } } },
          "Aytemiz": { type: Type.OBJECT, properties: { "Kurşunsuz 95 (Benzin)": { type: Type.NUMBER }, "Motorin (Dizel)": { type: Type.NUMBER }, "Otogaz (LPG)": { type: Type.NUMBER } } },
          "Türkiye Petrolleri": { type: Type.OBJECT, properties: { "Kurşunsuz 95 (Benzin)": { type: Type.NUMBER }, "Motorin (Dizel)": { type: Type.NUMBER }, "Otogaz (LPG)": { type: Type.NUMBER } } },
        }
      }
    }
  });
  
  if (!response.text) {
    throw new Error("No response from Gemini");
  }
  
  return JSON.parse(response.text);
}
