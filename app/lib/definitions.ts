// definitions for data
// describes the shape of the data, and what data type each property should accept 

export type Order = {
  id: string;
  customer_id: string;
  order_name: string;
  product_id: string;
  quantity: number;
  price: number;
  date: string;
  status: "pending" | "draft" | "shipped" | "processing";
};
//quote: nullable field or status - 

export type OrderKeys = keyof Order;

//this object is used to verify the data requested from db on edit forms
export type OrderForm = {
  id: string;
  customer_id: string;
  order_name: string;
  product_id: string;
  quantity: number;
  price: number;
  status: "pending" | "draft" | "shipped" | "processing";
};

export type OrderItem = {
  id: string;
  code: string;
  description: string;
};
//code: (preliminary) calculated value based on abbreviations for the materials that make up the product 
//parsable for UI to be able to switch from abbreviated to expanded views 

//consider creating a product class here for out different products to extend 
export type Product = {
  id: string; 
  name: string;
  category: "standard glass | store front price book | store front estimating";
  prod_type: Product_Type;
};

interface Product_Type {
  name: string;
  strength: string;
}

export type ShowerDoor = {
  glass_strength: "1/8 | 5/32 | 3/16 | 1/4 | 5/16 | 3/8 | 1/2 | 5/8";//do all glass products have the same options? /
  view_type: "clear | low i | reflective | patterned"; // each of these have follow up specifications - maybe a 'glass specifications' object? 
  measurements: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

//PROFILE PAGE INFO  

export type Client_Customer = {
  id: string;
  name: string;//can be person or company
  email: string;
  account_num: string;//accounting handles these
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

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

