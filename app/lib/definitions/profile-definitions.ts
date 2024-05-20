//PROFILE PAGE INFO  

export type UserProfile = {
    id: string;//this is the user id 
    name: string;//can be person or company
    account_num: string;//accounting handles these - do users need access to this 
    //or is this only on the admin side 
    phone_num: string;
    billing_info: Billing_Info;
    shipping_info: ShippingInfo;
  };
  //since we repeat the name, email, phone number pattern, is it worth it to create a contact info object 
  //customer would still need a name since it can be a company or a person 
  //might end up creating a company and person type to use in the pricing model
  export interface Billing_Info {
    billing_addr_prim: Address;
    billing_addr_sec?: Address;
    payment_method: string;
    purchase_order: string;
    additional_info: string;
    primary_contact_name: string;
    primary_contact_email: string;
    phone_num: string;
    alt_phone_num: string;
    fax_num: string;
  }
  
  export interface ShippingInfo {
    delivery_addr: Address;
    is_job_site: boolean;
  }
  
  export interface Address {
    city: string;
    state: string;
    zip: string;
    county: string;
    country: string;
  }
  
  //there's a notes section - for clients this will be part of the order - unless a resuable note is needed to keep them from re-writing the same info 
  //on admin side - you can create a note attached to an entity by it's id - customer id, order id etc 
  //END OF PROFILE INFO 