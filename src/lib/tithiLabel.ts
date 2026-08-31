import { tithiNames } from "@ishubhamx/panchangam-js/dist/data/tithis";

/**
 * Sankalpa locative forms keyed by @ishubhamx/panchangam-js `tithiNames` values.
 * @see node_modules/@ishubhamx/panchangam-js/dist/data/tithis.js
 */
const TITHI_LABEL_BY_NAME: Record<string, string> = {
  Prathama: "Pratipadyām",
  Dwitiya: "Dvitīyāyām",
  Tritiya: "Tritīyāyām",
  Chaturthi: "Chaturthyām",
  Panchami: "Pañchamyām",
  Shashthi: "Ṣaṣṭhyām",
  Saptami: "Saptamyām",
  Ashtami: "Aṣṭamyām",
  Navami: "Navamyām",
  Dashami: "Daśamyām",
  Ekadashi: "Ekādaśyām",
  Dwadashi: "Dvādaśyām",
  Trayodashi: "Trayodaśyām",
  Chaturdashi: "Chaturdaśyām",
  Purnima: "Paurṇamāsyām",
  Amavasya: "Amāvāsyām",
};

const PACKAGE_TITHI_NAMES = [...new Set(tithiNames)];
for (const name of PACKAGE_TITHI_NAMES) {
  if (!(name in TITHI_LABEL_BY_NAME)) {
    throw new Error(`Missing tithiLabel mapping for package tithi name: ${name}`);
  }
}

export function tithiLabelFromTithi(tithi: string) {
  return TITHI_LABEL_BY_NAME[tithi] ?? tithi;
}
