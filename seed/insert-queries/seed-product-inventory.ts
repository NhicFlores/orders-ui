import { sql } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { InventoryProductTable } from "@/drizzle/schema";
import { getSchemaName, FlipCoin } from "@/lib/utils";
import { inventoryProductSeed } from "../data/inventory-products";
import { inventoryGlassSeed } from "../data/inventory-glass";

export async function seedProducts() {
  console.log("seeding products ...");

  try {
    await db.transaction(async (trx) => {
      for (const product of inventoryProductSeed) {
        const serializedConfigOptions = JSON.stringify(product.config_options);
        await trx.execute(
          sql`INSERT INTO "${sql.raw(getSchemaName())}".inventory_products 
                    (type, 
                    "image_url", 
                    alt, 
                    description, 
                    "config_options", 
                    "date_created", 
                    "date_updated",
                    "updated_by")
            VALUES (${product.type},
                    ${product.image_url},
                    ${product.alt},
                    ${product.description},
                    ${serializedConfigOptions},
                    ${product.date_created},
                    ${product.date_updated},
                    ${product.updated_by})`
        );
      }
      console.log(
        `${inventoryProductSeed.length} Products seeded successfully`
      );
    });
  } catch (error) {
    console.error(error);
  }
}

export async function seedGlassInventory() {
  const productIds = await db
    .select({ product_id: InventoryProductTable.product_id })
    .from(InventoryProductTable);
  // console.log("Product IDs: ", productIds);
  // const userIds = await GetUserIds();
  // console.log("User IDs: ", userIds);
  // console.log("");
  try {
    console.log("seeding glass inventory ...");
    await db.transaction(async (trx) => {
      for (const item of inventoryGlassSeed) {
        const serializedThickness = JSON.stringify(item.thickness);
        const serializedShapes = JSON.stringify(item.shapes);
        const serializedTint = JSON.stringify(item.tint);
        let compatibleProducts: string[] = [];
        for (const product of productIds) {
          if (FlipCoin()) {
            compatibleProducts.push(product.product_id);
          }
        }
        if (compatibleProducts.length === 0) {
          compatibleProducts.push(productIds[0].product_id);
          compatibleProducts.push(productIds[1].product_id);
        }
        // console.log("Compatible Products: ", compatibleProducts);
        const serializedCompatibleProducts = JSON.stringify(compatibleProducts);
        const serializedQuantityIncoming = JSON.stringify(
          item.quantity_incoming
        );
        // console.log("serialized compatible products", serializedCompatibleProducts);

        await trx.execute(
          sql`INSERT INTO "${sql.raw(getSchemaName())}".inventory_glass_item 
                      (name, 
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
              VALUES (${item.name},
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
      console.log(
        `${inventoryGlassSeed.length} Glass Inventory seeded successfully`
      );
    });
  } catch (error) {
    console.error(error);
  }
}
