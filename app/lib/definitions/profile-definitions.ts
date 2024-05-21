//PROFILE PAGE INFO  

export type UserProfile = {
    id: string;
    user_id: string;//this is the user id 
    company?: string;
    account_num: string;//accounting handles these - do users need access to this 
    //or is this only on the admin side 
    phone_num: string;
    //billing_info: Billing_Info[];
    //shipping_info: ShippingInfo[];
  };

  //could have a check for if phone number
  export type BillingInfo = {
    billing_addr_prim: Address;
    billing_addr_sec?: Address;
    payment_method: string;
    purchase_order: string;
    primary_contact_name: string;
    primary_contact_email: string;
    phone_num: string;
    alt_phone_num?: string;
    fax_num?: string;
  }
  
  export type ShippingInfo = {
    delivery_addr: Address;
    is_job_site: boolean;
    note: string;
  }
  
  export interface Address {
    city: string;
    state: string;
    zip: string;
    county?: string;
    country: string;
  }
  
  //there's a notes section - for clients this will be part of the order - unless a reusable note is needed to keep them from re-writing the same info 
  //on admin side - you can create a note attached to an entity by it's id - customer id, order id etc 
  //END OF PROFILE INFO 