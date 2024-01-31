export type ShippingDetails = {
    name: string;
    email: string;
    address: string;
    city: string;
    country: string;
    zip: string;
    type: 'free' | 'standard' | 'express';
};