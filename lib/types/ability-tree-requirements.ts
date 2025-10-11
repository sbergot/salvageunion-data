/**
 * Requirements for ability trees in Salvage Union
 */
export type SalvageUnionAbilityTreeRequirements = {
  /**
   * Unique identifier for the entry
   */
  id: string;
  /**
   * Ability tree name
   */
  tree:
    | "Mechanical Knowledge"
    | "Mech-Tech"
    | "Forging"
    | "Advanced Engineer"
    | "Legendary Engineer"
    | "Hacking"
    | "Electronics"
    | "Augmentation"
    | "Advanced Hacking"
    | "Legendary Hacker"
    | "Salvaging"
    | "Trading"
    | "Leadership"
    | "Advanced Hauler"
    | "Legendary Hauler"
    | "Recon"
    | "Sleuth"
    | "Sniper"
    | "Advanced Scout"
    | "Legendary Scout"
    | "Gladitorial Combat"
    | "Survivalist"
    | "Tactical Warfare"
    | "Advanced Soldier"
    | "Legendary Soldier"
    | "Cyborg"
    | "Legendary Cyborg"
    | "Fabricator"
    | "Legendary Fabricator"
    | "Ranger"
    | "Legendary Ranger"
    | "Smuggler"
    | "Legendary Smuggler"
    | "Union Rep"
    | "Legendary Union Rep";
  /**
   * List of ability tree names required to access this tree
   */
  requirement: (
    | "Mechanical Knowledge"
    | "Mech-Tech"
    | "Forging"
    | "Advanced Engineer"
    | "Legendary Engineer"
    | "Hacking"
    | "Electronics"
    | "Augmentation"
    | "Advanced Hacking"
    | "Legendary Hacker"
    | "Salvaging"
    | "Trading"
    | "Leadership"
    | "Advanced Hauler"
    | "Legendary Hauler"
    | "Recon"
    | "Sleuth"
    | "Sniper"
    | "Advanced Scout"
    | "Legendary Scout"
    | "Gladitorial Combat"
    | "Survivalist"
    | "Tactical Warfare"
    | "Advanced Soldier"
    | "Legendary Soldier"
    | "Cyborg"
    | "Legendary Cyborg"
    | "Fabricator"
    | "Legendary Fabricator"
    | "Ranger"
    | "Legendary Ranger"
    | "Smuggler"
    | "Legendary Smuggler"
    | "Union Rep"
    | "Legendary Union Rep"
  )[];
  /**
   * Page number in the source book
   */
  page: number;
}[];
