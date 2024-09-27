
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
    id: "bfc13b28-0295-4ec9-a6d2-435d35c708ef",
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
    date_created: "2/3/2023, 6:07:05 AM",
    date_updated: "9/23/2024, 6:30:00 PM",
  },
  {
    id: "6b0cfe06-0630-470a-b618-166a6a7b2d5f",
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
    date_created: "2/2/2024, 5:37:40 PM",
    date_updated: "9/2/2024, 4:35:13 PM",
  },
  {
    id: "096c9550-509a-4234-91c5-977d271cc905",
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
    date_created: "8/15/2023, 3:35:22 AM",
    date_updated: "9/8/2024, 11:53:37 AM",
  },
  {
    id: "711ff901-7d5c-496b-b98b-3a5bd17ff5c3",
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
    date_created: "11/28/2023, 7:02:50 AM",
    date_updated: "9/16/2024, 8:16:14 AM",
  },
  {
    id: "33549138-e4c6-4be2-8c68-1808f5c19186",
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
    date_created: "12/2/2023, 5:56:26 AM",
    date_updated: "8/29/2024, 10:53:27 AM",
  },
  {
    id: "2025bdbd-bd8a-4dc5-98fd-177eb750db4b",
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
    date_created: "9/22/2024, 12:04:54 PM",
    date_updated: "9/22/2024, 4:24:40 PM",
  },
];
