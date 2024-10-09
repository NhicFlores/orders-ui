export type Product = {
  id: string;
  type: string;
  image_url: string;
  alt: string;
  description: string;
  config_options: any;
  // unit price, eventually need to work in unit of measure
  // price: number;
  // unit:
  date_created: string;
  date_updated: string;
};

export const productsArray: Product[] = [
  {
    id: "3fabd70d-7bc3-4658-afa0-15197f1affe3",
    type: "Tempered Glass",
    image_url: "https://via.placeholder.com/150",
    alt: "alt image description",
    description: "description for Tempered Glass",
    config_options: {
      shape: "",
      dimensions: "",
      thickness: "",
      tint: "",
      edgework: "",
      misc: "",
    },
    date_created: "8/15/2024, 12:59:17 PM",
    date_updated: "9/29/2024, 8:09:47 PM",
  },
  {
    id: "3894d0ee-6655-4c6a-a86a-78e6421c7ab8",
    type: "Insulated Unit/Dual Pane",
    image_url: "https://via.placeholder.com/150",
    alt: "alt image description",
    description: "description for Insulated Unit/Dual Pane",
    config_options: {
      shape: "",
      dimensions: "",
      thickness: "",
      tint: "",
      misc: "",
      spacer: "",
    },
    date_created: "11/5/2023, 8:08:19 PM",
    date_updated: "9/12/2024, 5:04:23 PM",
  },
  {
    id: "dd9a8408-02ad-4171-9af6-e8a3f4751578",
    type: "Laminate/Safety Glass",
    image_url: "https://via.placeholder.com/150",
    alt: "alt image description",
    description: "description for Laminate/Safety Glass",
    config_options: {
      shape: "",
      dimensions: "",
      thickness: "",
      tint: "",
      misc: "",
      edgework: "",
      lami_layer: "",
    },
    date_created: "11/7/2023, 12:48:27 AM",
    date_updated: "9/22/2024, 3:31:29 AM",
  },
  {
    id: "97b6ae17-f7d7-43c8-a15d-35a8d2ca52c6",
    type: "Tempered Laminate",
    image_url: "https://via.placeholder.com/150",
    alt: "alt image description",
    description: "description for Tempered Laminate",
    config_options: {
      shape: "",
      dimensions: "",
      thickness: "",
      tint: "",
      edgework: "",
      misc: "",
    },
    date_created: "7/24/2024, 9:29:47 PM",
    date_updated: "9/10/2024, 3:42:20 AM",
  },
  {
    id: "81de5b70-8763-48a1-9ee4-365fd2f498a6",
    type: "Shower Doors/Panels",
    image_url: "https://via.placeholder.com/150",
    alt: "alt image description",
    description: "description for Shower Doors/Panels",
    config_options: {
      shape: "",
      dimensions: "",
      thickness: "",
      tint: "",
      fabrication: "",
      misc: "",
    },
    date_created: "2/4/2024, 2:24:18 AM",
    date_updated: "9/10/2024, 2:59:46 AM",
  },
  {
    id: "8091c8a3-42be-4db2-ad2e-6ae8d7eb4e0b",
    type: "Annealed Glass",
    image_url: "https://via.placeholder.com/150",
    alt: "alt image description",
    description: "description for Annealed Glass",
    config_options: {
      shape: "",
      dimensions: "",
      thickness: "",
      tint: "",
      fabrication: "",
      misc: "",
    },
    date_created: "6/19/2023, 10:43:29 PM",
    date_updated: "9/13/2024, 10:35:08 AM",
  },
];
