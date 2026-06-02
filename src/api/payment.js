import api from "./axios";

export const createCheckoutSession = (data) => api.post("/payment/create-checkout-session", data);
