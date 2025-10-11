# Salvage Union Data

A comprehensive, schema-validated JSON dataset for the **Salvage Union** tabletop RPG, published by [Leyline Press](https://leyline.press/).

## 📚 Overview

This repository contains structured game data with full JSON Schema validation, including:

- **95 Pilot Abilities** across 11 classes
- **99 Mech Systems** and **61 Modules**
- **30 Mech Chassis** with complete stats
- **44 Pilot Equipment** items
- **11 Character Classes** (6 core + 5 hybrid)
- **NPCs, Creatures, Bio-Titans, Meld, Vehicles, Drones**
- **Game Tables, Keywords, and Traits**

All data entries include **page references** to the source material for easy verification.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Validation

Validate all data files against their schemas:

```bash
npm run validate
```

### Format

Auto-format all JSON files:

```bash
npm run format
```

## 📁 Repository Structure

```
salvageunion-data/
├── data/                    # JSON data files
│   ├── abilities.json       # Pilot abilities (95 items)
│   ├── classes.json         # Character classes (11 items)
│   ├── equipment.json       # Pilot equipment (44 items)
│   ├── systems.json         # Mech systems (99 items)
│   ├── modules.json         # Mech modules (61 items)
│   ├── chassis.json         # Mech chassis (30 items)
│   ├── bio-titans.json      # Bio-Titan creatures (6 items)
│   ├── creatures.json       # Wasteland creatures (6 items)
│   ├── npcs.json            # NPCs and people (6 items)
│   ├── meld.json            # Meld entities (5 items)
│   ├── drones.json          # Autonomous drones (9 items)
│   ├── vehicles.json        # Conventional vehicles (7 items)
│   ├── squads.json          # NPC squads (9 items)
│   ├── crawlers.json        # Union Crawler types (5 items)
│   ├── tables.json          # Game tables (14 items)
│   ├── keywords.json        # Game keywords (73 items)
│   ├── traits.json          # Traits and properties (43 items)
│   └── ability-tree-requirements.json  # Ability prerequisites (20 items)
│
├── schemas/                 # JSON Schema definitions
│   ├── shared/              # Shared schema definitions
│   │   ├── common.schema.json    # Common types (damage, traits, etc.)
│   │   ├── enums.schema.json     # Enumerations (sources, ranges, etc.)
│   │   └── objects.schema.json   # Complex objects (systems, actions, etc.)
│   └── *.schema.json        # Individual data file schemas
│
└── tools/                   # Utility scripts
    ├── validateAll.ts       # Schema validation tool
    ├── format.ts            # JSON formatting tool
    ├── parsePdf.ts          # PDF parsing tool
    └── searchPdf.ts         # PDF search tool
```

## 🔧 Development

### VSCode Integration

This repository includes VSCode settings for:

- ✅ **Automatic schema validation** while editing
- ✅ **IntelliSense** with autocomplete for all data files
- ✅ **Format on save** for consistent formatting
- ✅ **Inline error detection** for schema violations

### Adding New Data

1. Add your data to the appropriate JSON file in `data/`
2. Ensure it includes a `page` property referencing the source material
3. Run `npm run validate` to check schema compliance
4. Run `npm run format` to auto-format

### Schema Structure

All schemas follow JSON Schema Draft 07 and include:

- **Required fields**: All data entries must have `name`, `source`, and `page`
- **Type safety**: Strict typing for all properties
- **Shared definitions**: Common types defined in `schemas/shared/`
- **Documentation**: Descriptions for all properties

## 📖 Data Format Examples

### Ability Example

```json
{
  "name": "Jury Rig",
  "tree": "Engineering",
  "source": "core",
  "level": 1,
  "description": "You can repair Mechs in the field...",
  "effect": "Restore 2 SP to a target Mech in Range...",
  "activationCost": 1,
  "actionType": "Turn Action",
  "range": "Close",
  "page": 28
}
```

### System Example

```json
{
  "name": "Assault Cannon",
  "source": "core",
  "techLevel": 2,
  "slotsRequired": 2,
  "salvageValue": 2,
  "range": "Medium",
  "damage": { "type": "SP", "amount": 4 },
  "traits": [{ "type": "ballistic" }, { "type": "multi-attack", "amount": 2 }],
  "page": 103
}
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Ensure all data includes page references
2. Validate changes with `npm run validate`
3. Format code with `npm run format`
4. Follow existing data structure patterns

## 📜 License

ISC License

## 🙏 Credits

This data was originally copied from [wfreinhart/salvage-union-tracker](https://github.com/wfreinhart/salvage-union-tracker) and later forked from [sbergot/salvageunion-data](https://github.com/sbergot/salvageunion-data).

**Salvage Union** is published by [Leyline Press](https://leyline.press/).
