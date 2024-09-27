import { sql } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { productsArray } from "../seed-data/products";
import { glassInventoryArray } from "../seed-data/glass-inventory";

export async function SeedProducts() {
  console.log("seeding products ...");

  try {
    await db.transaction(async (trx) => {
      for (const product of productsArray) {
        const serializedConfigOptions = JSON.stringify(product.config_options);
        await trx.execute(
          sql`INSERT INTO "prod-orders".products 
                    (id, 
                    type, 
                    "image_url", 
                    alt, 
                    description, 
                    "config_options", 
                    "date_created", 
                    "date_updated")
            VALUES (${product.id},
                    ${product.type},
                    ${product.image_url},
                    ${product.alt},
                    ${product.description},
                    ${serializedConfigOptions},
                    ${product.date_created},
                    ${product.date_updated})`
        );
      }
      console.log("Products seeded successfully");
    });
  } catch (error) {
    console.error(error);
  }
}

export async function SeedGlassInventory() {
  console.log("seeding glass inventory ...");

  try {
    await db.transaction(async (trx) => {
      for (const item of glassInventoryArray) {
        const serializedThickness = JSON.stringify(item.thickness);
        const serializedShapes = JSON.stringify(item.shapes);
        const serializedTint = JSON.stringify(item.tint);
        const serializedCompatibleProducts = JSON.stringify(
          item.compatible_products
        );
        const serializedQuantityIncoming = JSON.stringify(
          item.quantity_incoming
        );
        await trx.execute(
          sql`INSERT INTO "prod-orders".glass_inventory_item 
                    (id, 
                     name, 
                     description, 
                     thickness, 
                     shapes, 
                     tint, 
                     compatible_products, 
                     quantity_available, 
                     quantity_incoming, 
                     date_created, 
                     date_updated, 
                     updated_by)
            VALUES (${item.id},
                    ${item.name},
                    ${item.description},
                    ${serializedThickness},
                    ${serializedShapes},
                    ${serializedTint},
                    ${serializedCompatibleProducts},
                    ${item.quantity_available},
                    ${serializedQuantityIncoming},
                    ${item.date_created},
                    ${item.date_updated},
                    ${item.updated_by})`
        );
      }
      console.log("Glass inventory seeded successfully");
    });
  } catch (error) {
    console.error(error);
  }
}
