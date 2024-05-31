import { StaticImageData } from "next/image";

export type OrderItem = {
  id: string;
  description: string;
  quantity: number;
};
//specification_string: (preliminary) calculated value based on abbreviations for the materials that make up the product
//parsable for UI to be able to switch from abbreviated to expanded views

//consider creating a product class here for our different products to extend
//what information would admin enter when adding a new product to inventory
export type GlassInventoryProduct = {
  id: string; //UUID generated on backend
  vendor?: string; //or vendor?
  brand?: string;
  part_number: string;
  type: string;
  stock_price: number;
  mark_up: number;
  //retail price autopopulated on form - calcd from stock_price * mark_up
  retail_price: number; //if they edit this; mark_up is updated to reflect
  //ex. they type in 25% - retail price seems too high/or too low for product
  //so they adjust the retail price, then the mark_up percentage field is updated
  //is there a different mark_up depending on product? is 1/4 clear the same price
  //for shower doors and windows?
  dimensions: string;
  thickness: string; //for validation these should probably be numbers
  //this is an unusual size - did you mean to enter ""?
  prod_type: Product_Type;
  inventory_quantity: number;
};

type Treatment = {
  tempering: string;
  price: number;
  loss: number;
  labor: number;
};

interface Product_Type {
  name: string;
  strength: string;
}

//annealed, tempered, heat strengthened, laminated
interface Process_Type {}

//front end values
//customer chooses Shower Door and the next pages are populated with
//shower door dimensions, glass types, treatment types
//but before they can select any of these - we need to check if it is in stock
export type ShowerDoor = {
  glass_strength: "1/8 | 5/32 | 3/16 | 1/4 | 5/16 | 3/8 | 1/2 | 5/8"; //do all glass products have the same options? /
  view_type: "clear | low e | reflective | patterned"; // each of these have follow up specifications - maybe a 'glass specifications' object?
  dimensions: string;
  category: string; //test: may not be useful
  //concatenated string from: dimension + type + tint + treatment
  specification_string: string; //used for order item description
};
//is category necessary on a product? maybe so it'll show up on the right pages
//category: "standard glass | store front price book | store front estimating";

interface order_item {
  type: string[];
  shape: string[];
  dimensions: number[];
  thickness: number[];
  tint: string[];
  edgework: string[];
  note: string;
}

//glass type determines treatment and price
//shape has a pricing factor
//

export type retail_product = {};

export const process = ["annealed", "tempered", "heat-strengthened"];

export const laminated = ["0.030", "0.060", "0.090"];

export const sizes = [
  "1/8",
  "5/32",
  "3/16",
  "1/4",
  "5/16",
  "3/8",
  "1/2",
  "5/8",
];

export const colors = ["clear", "bronze", "green", "grey", "satin"];

// product page
// slectable cards - name - description

export type Product = {
  id: string;
  name: string;
  description?: string;
  imageSrc: StaticImageData;
  alt: string;
};

export type GlassType = {
  id: string;
  name: string;
  description: string;
  imageSrc: StaticImageData;
  alt: string;
  shape_types?: Shape[];
  thickness_options?: Thickness[];
  tint_types?: Tint[];
  options_types?: MiscOptions[];
};

export type Shape = {
  id: string;
  name: string;
  imageSrc: StaticImageData;
  alt: string;
  required_dimensions?: RequiredDimensions;
  thickness_options?: Thickness[];
  tint_types?: Tint[];
  options_types?: MiscOptions[];
};

export type RequiredDimensions = {
  radius?: {label: string, value: string};
  offset?: {label: string, value: string};
  edge_length?: {label: string, value: string};
  base?: {label: string, value: string};
  height?: {label: string, value: string};
  sub_height?: {label: string, value: string};
  left_sub_height?: {label: string, value: string};
  right_sub_height?: {label: string, value: string};
  top?: {label: string, value: string};
  left_projection?: {label: string, value: string};
  right_projection?: {label: string, value: string};
}

export type Dimensions = {
  id: string;
  width_inches: number;
  width_fraction_of_inches: number;
  height_inches: number;
  height_fraction_of_inches: number;
  thickness_options?: Thickness[];
  tint_types?: Tint[];
  options_types?: MiscOptions[];
};

export type Thickness = {
  id?: string;
  thickness?: number;
  tint_types?: Tint[];
  options_types?: MiscOptions[];
};

export type Tint = {
  id?: string;
  name?: string;
  description?: string;
  imageSrc?: StaticImageData;
  alt?: string;
  options_types?: MiscOptions[];
};

export type MiscOptions = {
  id?: string;
  add_tempered_logo?: boolean;
  add_holes?: boolean;
};
