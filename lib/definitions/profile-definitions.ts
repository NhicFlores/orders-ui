//PROFILE PAGE INFO

export type UserProfile = {
  id: number;
  user_id: string; //this is the user id
  first_name: string;
  last_name: string;
  company?: string;
  account_num: string; //accounting handles these - do users need access to this
  //or is this only on the admin side
  phone_num: string;
  //billing_info: Billing_Info[];
  //shipping_info: ShippingInfo[];
};

//could have a check for if phone number
export type BillingInfo = {
  id: number;
  user_id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  payment_method: string;
  purchase_order: string;
  primary_contact_name: string;
  primary_contact_email: string;
  primary_contact_phone: string;
  fax_num: string;
  is_primary: boolean;
  is_active: boolean;
};

export type ShippingInfo = {
  id: number;
  user_id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  is_job_site: boolean;
  note?: string;
};

export interface Address {
  street: string;
  apt_num?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

//there's a notes section - for clients this will be part of the order - unless a reusable note is needed to keep them from re-writing the same info
//on admin side - you can create a note attached to an entity by it's id - customer id, order id etc
//END OF PROFILE INFO
