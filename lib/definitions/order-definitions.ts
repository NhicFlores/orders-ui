import { StaticImageData } from "next/image";
import { ShippingInfo } from "./profile-definitions";

export enum OrderStatus {
  Pending = "pending",
  Draft = "draft",
  Shipped = "shipped",
  Processing = "processing",
  Quote = "quote",
}

export type Order = {
  user_id: string;
  entered_by?: string;
  order_name: string;
  billing_info_id: string; //billing info id
  shipping_info: ShippingInfo; //this will be stringified before being sent to the server
  status: OrderStatus;
};

export type OrderItem = {
  order_id: string;
  type: string;
  shape: string;
  dimensions: string;
  thickness: string;
  tint: string;
  fabrication_options?: string;
  misc_options?: string;
  note: string;
  quantity: number;
};

export type OrderItemDB = OrderItem & {
  id: string;
};

export type CustomerOrderTable = Order & {
  id: string;
  order_items: OrderItem[];
  date: string;
};

export type AdminOrderTable = Order & {
  id: string;
  customer_name?: string;
  order_items: OrderItem[];
  date: string;
};

//NOTE TEST TYPES
export type TestOrder = {
  order_name: string;
  order_items: TestConfig[];
  status: string;
};

export type TestConfig = {
  glass_type: string;
  glass_shape: string;
  glass_dimensions: string;
  glass_thickness: string;
  glass_tint: string;
  fabrication_options: string;
  glass_options: string;
  quantity?: number;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  imageSrc: StaticImageData;
  alt: string;
  category?: string;
  sub_category?: string;
  price?: number;
};
// NOTE TODO: update types to be GlassType = Product & {shape_types: Shape[]}
export type GlassType = Product & {
  shape_types?: Shape[];
  thickness_options?: Thickness[];
  tint_types?: Tint[];
  misc_options?: MiscOptions[];
};

export type Shape = Product & {
  required_dimensions?: Dimension[];
  thickness_options?: Thickness[];
  tint_types?: Tint[];
  misc_options?: MiscOptions[];
};

export type Tint = Product & {
  misc_options?: MiscOptions[];
};

export type Dimension = {
  label: string;
  wholeNumber: string;
  fraction: string;
};

export type Thickness = {
  id?: string;
  thickness?: number;
  tint_types?: Tint[];
  misc_options?: MiscOptions[];
};

export type FabricationOptions = {
  id?: string;
  add_holes?: boolean;
  add_cutouts?: boolean;
  add_notches?: boolean;
  add_mitered_edges?: boolean;
  add_flat_polish?: boolean;
  add_pencil_polish?: boolean;
  add_bevel_edge?: boolean;
  add_tempering?: boolean;
  add_heat_strengthening?: boolean;
  add_laminating?: boolean;
};

export type MiscOptions = {
  id?: string;
  add_tempered_logo?: boolean;
};

export type GlassConfiguration = {
  glass_type: GlassType;
  glass_shape: Shape;
  glass_dimensions: Dimension[];
  glass_thickness: Thickness;
  glass_tint: Tint;
  fabrication_options?: FabricationOptions;
  glass_options: MiscOptions;
  quantity?: number;
};

// -------------------------------------------------------------

//any shapes that don't have these, will define their own dimensions interface
// every shape can define its own dimensions - we still need standardized dimension names and definitions
// export type RequiredDimensions = {
//   radius?: {label: string, value: string};
//   offset?: {label: string, value: string};
//   edge_length?: {label: string, value: string};
//   base?: {label: string, value: string};
//   height?: {label: string, value: string};
//   sub_height?: {label: string, value: string};
//   left_sub_height?: {label: string, value: string};
//   right_sub_height?: {label: string, value: string};
//   top?: {label: string, value: string};
//   left_projection?: {label: string, value: string};
//   right_projection?: {label: string, value: string};
// }

// export type Dimensions = {
//   id: string;
//   width_inches: number;
//   width_fraction_of_inches: number;
//   height_inches: number;
//   height_fraction_of_inches: number;
//   thickness_options?: Thickness[];
//   tint_types?: Tint[];
//   options_types?: MiscOptions[];
// };

// -------------------------------------------------------------

//specification_string: (preliminary) calculated value based on abbreviations for the materials that make up the product
//parsable for UI to be able to switch from abbreviated to expanded views

// //consider creating a product class here for our different products to extend
// //what information would admin enter when adding a new product to inventory
// export type GlassInventoryProduct = {
//   id: string; //UUID generated on backend
//   vendor?: string; //or vendor?
//   brand?: string;
//   part_number: string;
//   type: string;
//   stock_price: number;
//   mark_up: number;
//   //retail price autopopulated on form - calcd from stock_price * mark_up
//   retail_price: number; //if they edit this; mark_up is updated to reflect
//   //ex. they type in 25% - retail price seems too high/or too low for product
//   //so they adjust the retail price, then the mark_up percentage field is updated
//   //is there a different mark_up depending on product? is 1/4 clear the same price
//   //for shower doors and windows?
//   dimensions: string;
//   thickness: string; //for validation these should probably be numbers
//   //this is an unusual size - did you mean to enter ""?
//   prod_type: Product_Type;
//   inventory_quantity: number;
// };

// type Treatment = {
//   tempering: string;
//   price: number;
//   loss: number;
//   labor: number;
// };

// interface Product_Type {
//   name: string;
//   strength: string;
// }

// //annealed, tempered, heat strengthened, laminated
// interface Process_Type {}

// //front end values
// //customer chooses Shower Door and the next pages are populated with
// //shower door dimensions, glass types, treatment types
// //but before they can select any of these - we need to check if it is in stock
// export type ShowerDoor = {
//   glass_strength: "1/8 | 5/32 | 3/16 | 1/4 | 5/16 | 3/8 | 1/2 | 5/8"; //do all glass products have the same options? /
//   view_type: "clear | low e | reflective | patterned"; // each of these have follow up specifications - maybe a 'glass specifications' object?
//   dimensions: string;
//   category: string; //test: may not be useful
//   //concatenated string from: dimension + type + tint + treatment
//   specification_string: string; //used for order item description
// };
// //is category necessary on a product? maybe so it'll show up on the right pages
// //category: "standard glass | store front price book | store front estimating";

//glass type determines treatment and price
//shape has a pricing factor
//

// export type retail_product = {};

// export const process = ["annealed", "tempered", "heat-strengthened"];

// export const laminated = ["0.030", "0.060", "0.090"];

// export const sizes = [
//   "1/8",
//   "5/32",
//   "3/16",
//   "1/4",
//   "5/16",
//   "3/8",
//   "1/2",
//   "5/8",
// ];

// export const colors = ["clear", "bronze", "green", "grey", "satin"];

// product page
// selectable cards - name - description
