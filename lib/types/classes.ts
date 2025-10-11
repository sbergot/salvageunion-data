/**
 * Character classes in Salvage Union
 */
export type SalvageUnionClasses = (
  | {
      /**
       * Unique identifier for the entry
       */
      id: string;
      /**
       * Character class name
       */
      name:
        | "Engineer"
        | "Hacker"
        | "Hauler"
        | "Salvager"
        | "Scout"
        | "Soldier"
        | "Fabricator"
        | "Cyborg"
        | "Union Rep"
        | "Smuggler"
        | "Ranger";
      /**
       * The source book or expansion for this content
       */
      source: "core";
      /**
       * Indicates this is a core class
       */
      type: "core";
      /**
       * Description of the class
       */
      description?: string;
      /**
       * Core ability trees for this class
       */
      coreAbilities?: (
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
       * Hybrid classes that can be formed with this class
       */
      hybridClasses?: (
        | "Engineer"
        | "Hacker"
        | "Hauler"
        | "Salvager"
        | "Scout"
        | "Soldier"
        | "Fabricator"
        | "Cyborg"
        | "Union Rep"
        | "Smuggler"
        | "Ranger"
      )[];
      /**
       * Ability tree name
       */
      advancedAbilities?:
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
       * Legendary abilities for this class
       */
      legendaryAbilities?: (
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
        | "Inspirational Union Leader"
      )[];
      /**
       * Page number in the source book
       */
      page: number;
    }
  | {
      /**
       * Unique identifier for the entry
       */
      id: string;
      /**
       * Character class name
       */
      name:
        | "Engineer"
        | "Hacker"
        | "Hauler"
        | "Salvager"
        | "Scout"
        | "Soldier"
        | "Fabricator"
        | "Cyborg"
        | "Union Rep"
        | "Smuggler"
        | "Ranger";
      /**
       * Indicates this is a hybrid class
       */
      type: "hybrid";
      /**
       * Description of the class
       */
      description?: string;
      /**
       * The source book or expansion for this content
       */
      source: "core";
      /**
       * Core classes that form this hybrid
       */
      coreClasses?: (
        | "Engineer"
        | "Hacker"
        | "Hauler"
        | "Salvager"
        | "Scout"
        | "Soldier"
        | "Fabricator"
        | "Cyborg"
        | "Union Rep"
        | "Smuggler"
        | "Ranger"
      )[];
      /**
       * Core ability trees for this hybrid class
       */
      coreAbilities?: (
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
       * Ability tree name
       */
      advancedAbilities?:
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
       * Legendary abilities for this hybrid class
       */
      legendaryAbilities?: (
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
        | "Inspirational Union Leader"
      )[];
      /**
       * Page number in the source book
       */
      page: number;
    }
)[];
