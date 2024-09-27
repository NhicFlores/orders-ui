export type GlassInventoryItem = {
    id: string;
    name: string;
    description: string;
    thickness: string[];
    shapes: string[];
    tint: string[];
    compatible_products: string[];
    quantity_available: number;
    // supplier_id: string;
    quantity_incoming: quantityIncoming; // jsonb
    date_created: string;
    date_updated: string;
    updated_by: string;
  };
  
  interface quantityIncoming {
    quantity_incoming: number;
    order_id: string;
    supplier_id: string;
    expected_arrival: string;
  }