/**
 * Traits and special properties in Salvage Union
 */
export type SalvageUnionTraits = Entry[];

/**
 * Basic entry with name, description, source, and page reference
 */
export interface Entry {
  /**
   * Unique identifier for the entry
   */
  id: string;
  /**
   * Name of the entry
   */
  name: string;
  /**
   * Description of the entry
   */
  description?: string;
  /**
   * The source book or expansion for this content
   */
  source: "core";
  /**
   * Page number in the source book
   */
  page: number;
}
