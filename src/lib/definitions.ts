export interface Reservation {
  id: string;
  client_name: string;
  date: string;
  slot: number;
  reason: string;
  status: string;
  user_id: string;
  location: Location;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  capacity: number;
  business_id: string;
}

export interface Business {
  id: string;
  name: string;
  email: string;
  description: string;
  phone_number: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  email: string;
}

export interface FormError {
  name?: string;
  msg?: string;
}
