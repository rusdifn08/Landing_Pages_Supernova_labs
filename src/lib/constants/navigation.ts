/**
 * Daftar section yang muncul di navbar + scrollspy.
 */
export const NAV_SECTIONS = [
  { label: "Difference", id: "difference" },
  { label: "Product", id: "products" },
  { label: "ROI", id: "roi" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
] as const;

export type NavSectionId = (typeof NAV_SECTIONS)[number]["id"];
