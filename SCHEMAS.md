# JSON Schema Documentation

This document provides an overview of the JSON schemas used in this repository.

## 📋 Table of Contents

- [Schema Organization](#schema-organization)
- [Shared Schemas](#shared-schemas)
- [Data File Schemas](#data-file-schemas)
- [Common Patterns](#common-patterns)
- [Validation](#validation)

## 🗂️ Schema Organization

All schemas follow **JSON Schema Draft 07** specification and are organized into:

### Shared Schemas (`schemas/shared/`)

Reusable definitions used across multiple data files:

- **`common.schema.json`** - Common types and structures
  - `entry` - Basic entry with name, description, source, page
  - `activationCost` - Ability point costs (integer or "Variable")
  - `damage` - Damage types (HP/SP) and amounts
  - `traits` - Special properties and modifiers
  - `rollTable` - D20 roll outcome tables
  - `techLevel`, `salvageValue`, `hitPoints`, `structurePoints`

- **`enums.schema.json`** - Enumerated values
  - `source` - Data sources (core, etc.)
  - `range` - Combat ranges (Close, Medium, Long)
  - `actionType` - Action types (Turn Action, Reaction, Passive, etc.)
  - `tree` - Ability tree names
  - `class` - Character class names
  - `ability` - Ability names

- **`objects.schema.json`** - Complex object definitions
  - `system` - Mech systems/modules (requires `page`)
  - `embeddedSystem` - Inline systems (no `page` required)
  - `action` - Actions, abilities, and attacks
  - `stats` - Mech/chassis statistics

### Individual Schemas (`schemas/*.schema.json`)

Each data file has its own schema that references shared definitions.

## 🔑 Shared Schemas

### Common Types

#### Entry
Basic entry structure used by keywords and traits:
```json
{
  "name": "string (required)",
  "description": "string",
  "source": "enum (required)",
  "page": "integer (required)"
}
```

#### Activation Cost
```json
{
  "activationCost": 1  // or 2, 3, etc.
  // OR
  "activationCost": "Variable"  // for XAP costs
}
```

#### Damage
```json
{
  "damage": {
    "type": "HP" | "SP",
    "amount": 4
  }
  // OR
  "damage": "2d20" | "X SP"  // variable formulas
}
```

#### Traits
```json
{
  "traits": [
    { "type": "melee" },
    { "type": "explosive", "amount": 2 },
    { "type": "multi-attack", "amount": 3 }
  ]
}
```

#### Roll Table
```json
{
  "rollTable": {
    "type": "standard",
    "1": "Critical failure outcome",
    "2-5": "Low outcome",
    "6-10": "Moderate outcome",
    "11-19": "High success outcome",
    "20": "Critical success outcome"
  }
}
```

## 📄 Data File Schemas

### Abilities (`abilities.schema.json`)
**Required fields:** `name`, `tree`, `source`, `level`, `page`

Pilot abilities with activation costs, effects, and roll tables.

### Classes (`classes.schema.json`)
**Required fields:** `name`, `source`, `type`, `page`

Character classes (core and hybrid) with ability trees and legendary abilities.

### Equipment (`equipment.schema.json`)
**Required fields:** `name`, `source`, `page`

Pilot equipment with tech levels, traits, and actions.

### Systems & Modules (`systems.schema.json`, `modules.schema.json`)
**Required fields:** `name`, `page`

Mech systems and modules using the shared `system` definition.

### Chassis (`chassis.schema.json`)
**Required fields:** `name`, `source`, `page`

Mech chassis with stats and built-in abilities.

### Bio-Titans (`bio-titans.schema.json`)
**Required fields:** `name`, `source`, `structurePoints`, `page`

Massive bio-engineered creatures with special abilities.

### Creatures (`creatures.schema.json`)
**Required fields:** `name`, `source`, `hitPoints`, `page`

Wasteland creatures and wildlife.

### NPCs (`npcs.schema.json`)
**Required fields:** `name`, `source`, `hitPoints`, `page`

Non-player characters and people.

### Drones (`drones.schema.json`)
**Required fields:** `name`, `source`, `structurePoints`, `page`

Autonomous drones with embedded systems.

### Vehicles (`vehicles.schema.json`)
**Required fields:** `name`, `source`, `structurePoints`, `page`

Conventional vehicles with embedded systems.

### Squads (`squads.schema.json`)
**Required fields:** `name`, `source`, `page`

NPC squads and groups (requires either `hitPoints` or `structurePoints`).

### Meld (`meld.schema.json`)
**Required fields:** `name`, `source`, `page`

Meld-infected creatures (requires either `hitPoints` or `structurePoints`).

### Crawlers (`crawlers.schema.json`)
**Required fields:** `name`, `source`, `page`

Union Crawler types with special abilities.

### Tables (`tables.schema.json`)
**Required fields:** `name`, `source`, `page`

Game tables with roll outcomes.

### Keywords (`keywords.schema.json`)
Uses shared `entry` definition.

### Traits (`traits.schema.json`)
Uses shared `entry` definition.

### Ability Tree Requirements (`ability-tree-requirements.schema.json`)
**Required fields:** `tree`, `requirement`, `page`

Prerequisites for accessing ability trees.

## 🎯 Common Patterns

### Page References
**All data entries must include a `page` property** referencing the source material:
```json
{
  "name": "Example Item",
  "page": 123
}
```

### Source Attribution
All entries must specify their source:
```json
{
  "source": "core"  // Currently only "core" is used
}
```

### Embedded vs Standalone Systems
- **Standalone systems** (in `systems.json`, `modules.json`): Require `page` property
- **Embedded systems** (in drones, vehicles): Do NOT require `page` property

```json
// Standalone system
{
  "name": "Assault Cannon",
  "page": 103,
  ...
}

// Embedded system (in a drone)
{
  "systems": [
    {
      "name": "Hover Locomotion System"
      // No page required
    }
  ]
}
```

## ✅ Validation

### Running Validation
```bash
npm run validate
```

### What Gets Validated
- All required fields are present
- Field types match schema definitions
- Enum values are valid
- Nested objects follow their schemas
- Page numbers are positive integers

### Common Validation Errors
1. **Missing required field**: Add the missing property
2. **Invalid enum value**: Check `shared/enums.schema.json` for valid values
3. **Wrong type**: Ensure numbers are numbers, strings are strings, etc.
4. **Missing page reference**: All entries must have a `page` property

## 🔧 Extending Schemas

### Adding a New Data Type
1. Create a new schema file in `schemas/`
2. Reference shared definitions where appropriate
3. Add schema mapping to `.vscode/settings.json`
4. Update validation tool in `tools/validateAll.ts`
5. Document in this file

### Adding a New Shared Definition
1. Add to appropriate shared schema (`common`, `enums`, or `objects`)
2. Use `$ref` to reference it from individual schemas
3. Document in this file

### Best Practices
- ✅ Use shared definitions for common patterns
- ✅ Make `page` required for all top-level entries
- ✅ Use descriptive property names
- ✅ Include descriptions for all properties
- ✅ Use `additionalProperties: false` to catch typos
- ✅ Use enums for fixed value sets
- ✅ Document complex structures with examples

