//common formatting functions

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateStringToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatDateToLocal = (
  dateValue: Date,
  locale: string = "en-US"
) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(dateValue);
};

export function getSchemaName() {
  return "dev-schema"; // TODO NOTE: UNDO
  // return "prod-orders"; 
  // return process.env.NODE_ENV === "production"
  //   ? process.env.PROD_SCHEMA!
  //   : process.env.DEV_SCHEMA!;
}

export const FlipCoin = () => {
  return Math.random() > 0.5;
};

export function LogData(data: {
  fileName: string;
  functionName: string;
  params: any;
}) {
  console.log("------------ LOGGING DATA ------------");
  console.log(data);
  console.log("------------ END OF LOG ------------");
}

export function consoleLogSpacer() {
  console.log("");
  console.log("----------------------------------------");
  console.log("");
}
