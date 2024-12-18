import { seedOrderInfo } from "./insert-queries/seed-orders-items";
import { seedProducts, seedGlassInventory } from "./insert-queries/seed-product-inventory";
import { seedUserInfo } from "./insert-queries/seed-users";

export async function seedDatabase() {
  console.log("---- STARTING SEEDING PROCESS ... ----");
//   await seedUserInfo();
//   await seedProducts();
//   await seedGlassInventory();
//   await seedOrderInfo();
}
