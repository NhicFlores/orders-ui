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
  tiner: string[];
  edgework: string[];
  note: string;
}

//glass type determines treament and price
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

export type GlassType = {
  id: string;
  name: string;
  definition: string;
  shape_types?: Shape[];
  thickness_types?: Thickness[];
  tint_types?: Tint[];
  options_types?: Options[];
};

export const glassTypes: GlassType[] = [
  {
    id: "1",
    name: "Tempered Glass",
    definition:
      "This product is used most often for shelves, some fireplaces and table tops. Tempered glass breaks into many small pieces when broken and usually never cracks.",
    shape_types: [],
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "2",
    name: "Insulated Unit/Dual Pane",
    definition:
      "This product consists of two panes of tempered glass separated by a spacer. The space between the two panes of glass is filled with air. These are most often used in residential window applications.",
    shape_types: [],
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "3",
    name: "Mirror",
    definition:
      "This product is used to replace any mirror. Mirrors are not tempered and if broken will break into large shards.",
    shape_types: [],
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "4",
    name: "Laminate/Safety Glass",
    definition:
      "This product is often used in doors and windows for security to resist burglar intrusion or if accidentally broken to keep a safeguard on the door and window until replaced. This as well makes a good sound barrier for single pane glass applications. This type of safety glass holds together when shattered.",
    shape_types: [],
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "5",
    name: "Tempered Laminate",
    definition:
      "This is a unique product that provides the surface strength and durability of tempered glass and the security of laminated glass. Tempered Laminated Glass, if broken, will break into small pieces yet be held together. This is often used in overhead and panel applications.",
    shape_types: [],
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "6",
    name: "Ceramic Glass",
    definition:
      "These products are made to withstand very high temperatures and are often used in woodstoves, gas stoves, ovens, halogen lamps, and laboratories. Ceramic glasses do not shatter. If broken, the piece will crack into large shards.",
    shape_types: [],
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "7",
    name: "Fire Rated Glass",
    definition:
      "This product is used for applications ranging from openings such as windows, side lites, and transoms, to doors, storefronts and glass walls where fire protective glass and fire resistive glass is required by code.",
    shape_types: [],
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "8",
    name: "Shower Doors/Panels",
    definition:
      'These products are made with 3/8” or 1/2" Tempered Glass with a selection of hardware such as hinges and handles as well as options such as bright guard to keep your glass looking like new for years.',
    shape_types: [],
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "9",
    name: "Annealed Glass",
    definition:
      'Often used in small pieces. This product is not considered a safety glass. Annealed glass does not shatter into small pieces. If broken, the piece will crack into large shards. Maximum Annealed Glass Size: 29-15/16" x 47-15/16". For pieces larger than this please select Tempered Glass.',
    shape_types: [],
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
];

export type Shape = {
  id: string;
  shape_name: string;
  required_dimensions?: Dimensions[];
  thickness_types?: Thickness[];
  tint_types?: Tint[];
  options_types?: Options[];
};

export const shapeTypes: Shape[] = [
  {
    id: "1",
    shape_name: "Square/Rectangle",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "2",
    shape_name: "Single Slope Rectangle",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "3",
    shape_name: "Circle",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "4",
    shape_name: "House",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "5",
    shape_name: "Arch",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "6",
    shape_name: "Arch-Top",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "7",
    shape_name: "Arch Top & Bottom",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "8",
    shape_name: "Arch Side",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "9",
    shape_name: "Rounded Corner(s)",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "10",
    shape_name: "Clipped Corner(s)",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "11",
    shape_name: "Pentagon",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "12",
    shape_name: "Hexagon",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "13",
    shape_name: "Octagon",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "14",
    shape_name: "Ellipse",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "15",
    shape_name: "Racetrack Oval",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "16",
    shape_name: "Quarter Round",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "17",
    shape_name: "Quarter Round with Notch",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "18",
    shape_name: "Half-Circle",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "19",
    shape_name: "Half-Circle with Notch",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "20",
    shape_name: "Trapezoid",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "21",
    shape_name: "Parallelogram",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "22",
    shape_name: "Right Triangle",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "23",
    shape_name: "Triangle",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "24",
    shape_name: "Quad Arch",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
  {
    id: "25",
    shape_name: "Irregular/Any Other Shape",
    thickness_types: [],
    tint_types: [],
    options_types: [],
  },
];

export type Dimensions = {
  id: string;
  width_inches: number;
  width_fraction_of_inches: number;
  height_inches: number;
  height_fraction_of_inches: number;
  thickness_types?: Thickness[];
  tint_types?: Tint[];
  options_types?: Options[];
};

export const inchRange: number[] = Array.from(
  { length: 96 },
  (_, i) => i + 1
);

export const fractionRange: string[] = [
  "1 / 16",
  "1 / 8",
  "3 / 16",
  "1 / 4",
  "5 / 16",
  "3 / 8",
  "7 / 16",
  "1 / 2",
  "9 / 16",
  "5 / 8",
  "11 / 16",
  "3 / 4",
  "13 / 16",
  "7 / 8",
  "15 / 16",
];

export type Thickness = {
  id: string;
  thickness: number;
  tint_types?: Tint[];
  options_types?: Options[];
};

export const thicknessTypes: Thickness[] = [
  { id: "1", thickness: 1 / 8 },
  { id: "2", thickness: 5 / 32 },
  { id: "3", thickness: 3 / 16 },
  { id: "4", thickness: 1 / 4 },
  { id: "5", thickness: 3 / 8 },
  { id: "6", thickness: 1 / 2 },
];

export type Tint = {
  id: string;
  tint: string;
  options_types?: Options[];
};

export const tintTypes: Tint[] = [
  { id: "1", tint: "Clear" },
  { id: "2", tint: "Solex" },
  { id: "3", tint: "Bronze" },
  { id: "4", tint: "Light Gray" },
  { id: "5", tint: "Dark Gray" },
  { id: "6", tint: "Satin Etch" },
  { id: "7", tint: "P-516" },
  { id: "8", tint: "Mistlite" },
  { id: "9", tint: "Low-E" },
  { id: "10", tint: "Frosted Glue Chip" },
];

export type Options = {
  id: string;
  add_tempered_logo: boolean;
  add_holes: boolean;
};

export const optionsTypes: Options[] = [
  { id: "1", add_tempered_logo: true, add_holes: false },
  { id: "2", add_tempered_logo: false, add_holes: true },
  { id: "3", add_tempered_logo: true, add_holes: true },
  { id: "4", add_tempered_logo: false, add_holes: false },
];
