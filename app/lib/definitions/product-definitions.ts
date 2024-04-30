
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
    view_type: "clear | low e | reflective | patterned"; // each of these have follow up specifications - maybe a 'glass specifications' object? 
    measurements: string;
  }