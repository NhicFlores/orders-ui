import { rankItem } from "@tanstack/match-sorter-utils";
import { FilterFn } from "@tanstack/react-table";

// FilterFn<Order> was causing a type error 
// also tried FilterFnOptions<Order> but that was also causing a type error
export const fuzzyOrderFilter:FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);

    addMeta({ itemRank });

    return itemRank.passed;
}