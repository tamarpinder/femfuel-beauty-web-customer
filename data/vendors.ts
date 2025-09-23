import { Vendor } from "@/types/vendor";
import { unasBasicVendors } from "./vendors/unas-basic";
import { unasLuxuryVendors } from "./vendors/unas-luxury";
import { maquillajeVendors } from "./vendors/maquillaje";
import { peinadosVendors } from "./vendors/peinados";
import { pestanasVendors } from "./vendors/pestanas";
import { spaVendors } from "./vendors/spa";
import { mixedVendors } from "./vendors/mixed";

export const mockVendors: Vendor[] = [
  ...unasBasicVendors,
  ...unasLuxuryVendors,
  ...maquillajeVendors,
  ...peinadosVendors,
  ...pestanasVendors,
  ...spaVendors,
  ...mixedVendors
];