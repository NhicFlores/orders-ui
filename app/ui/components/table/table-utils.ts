import { OrderDetails, StatusDetails } from "@/lib/data-model/data-definitions";
import { rankItem } from "@tanstack/match-sorter-utils";
import { FilterFn, Row } from "@tanstack/react-table";

// FilterFn<Order> was causing a type error
// also tried FilterFnOptions<Order> but that was also causing a type error
export const fuzzyOrderFilter: FilterFn<any> = (
  row,
  columnId,
  value,
  addMeta
) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({ itemRank });

  return itemRank.passed;
};

// filterValue is an array of statuses of type { statusValue: string, isVisible: boolean }
// isVisible will be true if the status should be visible in the table
// this function filters out rows that contain a status with a isVisible value of false
export const statusColumnFilter: FilterFn<OrderDetails> = (
  row: Row<OrderDetails>,
  columnId: string,
  filterValue: StatusDetails[],
  addMeta: (meta: any) => void
) => {
  // console.log("---- filterValue ----", filterValue);
  // update this to check the visible property of the status object if the
  // status of the row equals the status value
  return filterValue
    ? filterValue.some((status) => {
        // console.log("---- status ----", status);
        if (status.statusValue === row.original.status) {
          return status.isVisible;
        }
        return false;
      })
    : true;
};
