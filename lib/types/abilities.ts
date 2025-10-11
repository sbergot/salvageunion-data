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
 * Pilot abilities and skills in Salvage Union
 */
export type SalvageUnionAbilities = {
  /**
   * Unique identifier for the entry
   */
  id: string;
  /**
   * Ability name
   */
  name:
    | "Engineering Expertise"
    | "Talk Shop"
    | "Mech Acquisition"
    | "Mass Field Maintenance"
    | "If I cut this wire..."
    | "Mass Field Repair"
    | "Jury Rig"
    | "Mech-Gyver"
    | "Auto-Turret"
    | "Union Engineer"
    | "This one goes to 11..."
    | "Mass Energy Recharge"
    | "Tip Top Shape"
    | "The Full Works"
    | "Hacking Kit"
    | "System and Software Hacker"
    | "Denial of Service Attack"
    | "Well actually..."
    | "Techno Babble"
    | "Holo Companion"
    | "Bionic Senses"
    | "Bionic Arms"
    | "Bionic Legs"
    | "Trojan Horse"
    | "Counter-Hacking"
    | "Worm"
    | "Network Takeover"
    | "Spyware"
    | "Squeeze it in"
    | "Expert Salvager"
    | "Emergency Salvage Drop"
    | "Read a Person"
    | "Let’s Make a Deal"
    | "No Job Too Big"
    | "Folk Song"
    | "Behemoth"
    | "Valiant Speech"
    | "Beefcake"
    | "Mechapult Master"
    | "Can’t Stop, Won’t Stop"
    | "Master Salvager"
    | "Hauling All Day"
    | "Gather Intelligence"
    | "Tail"
    | "Survey Drone"
    | "Silver Tongue"
    | "Forked Tongue"
    | "Persona"
    | "You Shot First"
    | "Spotter"
    | "Custom Sniper Rifle"
    | "Flashback"
    | "Camo Suit"
    | "Wingsuit"
    | "Wasteland Celebrity"
    | "Teleport Beacon"
    | "Charge"
    | "Overpower"
    | "Duel"
    | "Wastelander Rapport"
    | "Resourceful"
    | "Custom Missile Launcher"
    | "Provoke"
    | "Tactical Retreat"
    | "Counterattack"
    | "Critical Strike"
    | "Defy Death"
    | "Whirlwind Strike"
    | "Omega Strike"
    | "Steel Pact"
    | "Glanded Stims"
    | "Modular Face Implant"
    | "Bionic Endoskeleton"
    | "Meld Form"
    | "Ascension"
    | "Field Fabrication"
    | "Miniaturised EMP"
    | "Chassis Modder"
    | "System Miniaturisation"
    | "Droned Mech Conversion"
    | "Mecha Companion"
    | "Snipe"
    | "Infiltration"
    | "Mecha Packmaster"
    | "One with the Wastelands"
    | "Black Market"
    | "Pray I don’t alter the deal further..."
    | "Hidden Stash"
    | "Knife Missile"
    | "Stealth Field Generator"
    | "Union Representative"
    | "Union Call"
    | "Recruit"
    | "VIP Beacon"
    | "Inspirational Union Leader";
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
   * The source book or expansion for this content
   */
  source: "core";
  /**
   * Level in the ability tree
   */
  level: number;
  /**
   * Description of the ability
   */
  description?: string;
  /**
   * Mechanical effect of the ability
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
  traits?: Traits;
  /**
   * Page number in the source book
   */
  page: number;
}[];
