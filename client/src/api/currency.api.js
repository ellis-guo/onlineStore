const API_KEY = "50ead66521cda0a6b57ca02b";
const BASE_URL = "https://v6.exchangerate-api.com/v6";

export const getExchangeRates = async () => {
  try {
    const response = await fetch(`${BASE_URL}/${API_KEY}/latest/CAD`);
    const data = await response.json();

    if (data.result === "success") {
      return data.conversion_rates;
    } else {
      throw new Error("Failed to fetch exchange rates");
    }
  } catch (error) {
    console.error("Currency API error:", error);
    throw error;
  }
};
