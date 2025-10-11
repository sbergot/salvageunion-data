/**
 * Special traits and properties of items, systems, or abilities
 */
export type Traits = (
  | {
      /**
       * Type of trait that requires a numeric value
       */
      type: "uses" | "explosive" | "burn" | "hot" | "multi-attack" | "personnel capacity";
      /**
       * Numeric value for the trait
       */
      amount: number;
    }
  | {
      /**
       * Type of trait that doesn't require a numeric value
       */
      type:
        | "pilot equipment"
        | "hacking"
        | "melee"
        | "armor"
        | "rigging"
        | "ballistic"
        | "unwieldy"
        | "silent"
        | "communicator"
        | "salvaging"
        | "energy"
        | "heavy"
        | "shield"
        | "hover"
        | "anti-organic"
        | "overheat"
        | "climbing"
        | "missile"
        | "deadly"
        | "deadly (creatures only)"
        | "flashy"
        | "scanner"
        | "heat spike"
        | "optics"
        | "targeter"
        | "hot (x)"
        | "guided"
        | "jamming"
        | "pinning"
        | "escape"
        | "wield"
        | "anti-shielding"
        | "ion"
        | "amphibious"
        | "explosive (1d20)"
        | "heat hpike"
        | "hot (1d20)"
        | "wheeled"
        | "meld infection"
        | "irradiated"
        | "fast"
        | "immobile"
        | "poison"
        | "burrower"
        | "fly"
        | "load";
    }
)[];
/**
 * Crawler vehicles in Salvage Union
 */
export type SalvageUnionCrawlers = {
  /**
   * Unique identifier for the entry
   */
  id: string;
  /**
   * Name of the crawler
   */
  name: string;
  /**
   * The source book or expansion for this content
   */
  source: "core";
  /**
   * Description of the crawler
   */
  description?: string;
  /**
   * Special abilities of this crawler
   */
  abilities?: Action[];
  /**
   * Page number in the source book
   */
  page: number;
}[];

/**
 * An action, ability, or attack that can be performed
 */
export interface Action {
  /**
   * Name of the action
   */
  name: string;
  /**
   * The source book or expansion for this content
   */
  source?: "core";
  /**
   * Description of what the action does
   */
  description?: string;
  /**
   * Mechanical effect of the action
   */
  effect?: string;
  /**
   * Cost in ability points to activate an ability
   */
  activationCost?: number | "Variable";
  /**
   * Range bands for abilities and weapons
   */
  range?: "Close" | "Medium" | "Long" | "Far" | "Close/Long";
  /**
   * Type of action required to use an ability
   */
  actionType?: "Passive" | "Free" | "Reaction" | "Turn" | "Short" | "Long" | "DownTime";
  traits?: Traits;
  /**
   * Damage dealt by an attack or ability
   */
  damage?:
    | {
        /**
         * Type of damage (Hit Points or Structure Points)
         */
        type: "HP" | "SP";
        /**
         * Amount of damage dealt
         */
        amount: number;
      }
    | ("2d20" | "X SP");
  stats?: Stats;
  /**
   * List of options or choices for this action
   */
  options?: (
    | string
    | {
        /**
         * Display label for the option
         */
        label: string;
        /**
         * Value or effect of the option
         */
        value: string;
      }
  )[];
  /**
   * Roll table for random outcomes based on d20 rolls
   */
  rollTable?:
    | {
        /**
         * Critical failure outcome
         */
        "1"?: string;
        /**
         * Critical success outcome
         */
        "20"?: string;
        type: "standard";
        /**
         * High success outcome
         */
        "11-19"?: string;
        /**
         * Moderate outcome
         */
        "6-10"?: string;
        /**
         * Low outcome
         */
        "2-5"?: string;
      }
    | {
        /**
         * Critical failure outcome
         */
        "1"?: string;
        type: "standard2";
        /**
         * Critical success outcome
         */
        "19-20"?: string;
        /**
         * High success outcome
         */
        "11-18"?: string;
        /**
         * Moderate outcome
         */
        "6-10"?: string;
        /**
         * Low outcome
         */
        "2-5"?: string;
      }
    | {
        "1"?: string;
        "2"?: string;
        "3"?: string;
        "4"?: string;
        "5"?: string;
        "6"?: string;
        "7"?: string;
        "8"?: string;
        "9"?: string;
        "10"?: string;
        "11"?: string;
        "12"?: string;
        "13"?: string;
        "14"?: string;
        "15"?: string;
        "16"?: string;
        "17"?: string;
        "18"?: string;
        "19"?: string;
        "20"?: string;
        type: "full";
      };
  /**
   * Page number in the source book
   */
  page?: number;
}
/**
 * Statistics for mechs, chassis, and vehicles
 */
export interface Stats {
  /**
   * Structure points (durability)
   */
  structure_pts?: number;
  /**
   * Energy points (power capacity)
   */
  energy_pts?: number;
  /**
   * Heat capacity
   */
  heat_cap?: number;
  /**
   * Number of system slots
   */
  system_slots?: number;
  /**
   * Number of module slots
   */
  module_slots?: number;
  /**
   * Cargo capacity
   */
  cargo_cap?: number;
  /**
   * Technology level
   */
  tech_level?: number;
  /**
   * Salvage value in scrap
   */
  salvage_value?: number;
  /**
   * Additional notes
   */
  notes?: string;
}
