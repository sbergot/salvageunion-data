# Salvage Union Data ORM

Type-safe query interface for Salvage Union game data, built on top of JSON Schema.

## Features

- ✅ **Type-safe** - Generated TypeScript types from JSON Schema
- ✅ **Simple API** - Intuitive query methods
- ✅ **Lightweight** - No database, just JSON files
- ✅ **Extensible** - Easy to add custom query methods
- ✅ **Validated** - All data validated against JSON Schema

## Installation

```bash
npm install
npm run generate:types  # Generate TypeScript types from schemas
```

## Quick Start

```typescript
import { Equipment, Chassis, Abilities } from './lib/index.js';

// Find equipment by name
const medkit = Equipment.findByName('Medkit');

// Get all Tech Level 3 equipment
const t3Equipment = Equipment.findByTechLevel(3);

// Find chassis with high structure points
const tankyChassis = Chassis.findByMinStructurePoints(20);

// Get all Level 1 abilities
const level1Abilities = Abilities.findByLevel(1);
```

## Available Models

### Equipment

```typescript
import { Equipment } from './lib/index.js';

// Basic queries
Equipment.all()                          // Get all equipment
Equipment.count()                        // Count items
Equipment.findById('uuid')               // Find by ID
Equipment.findByName('Medkit')           // Find by exact name
Equipment.searchByName('armor')          // Search by partial name

// Specialized queries
Equipment.findByTechLevel(3)             // Find by tech level
Equipment.findBySalvageValue(5)          // Find by salvage value
Equipment.findByTrait('armor')           // Find by trait type
Equipment.findByActivationCost(2)        // Find by AP cost

// Convenience methods
Equipment.getArmor()                     // Get all armor
Equipment.getWeapons()                   // Get all weapons
Equipment.getWithActions()               // Get items with actions

// Utility methods
Equipment.random()                       // Get random item
Equipment.randomMany(3)                  // Get 3 random items
Equipment.first()                        // Get first item
Equipment.last()                         // Get last item
```

### Chassis

```typescript
import { Chassis } from './lib/index.js';

// Basic queries
Chassis.all()
Chassis.findById('uuid')
Chassis.findByName('Atlas')

// Specialized queries
Chassis.findByTechLevel(2)
Chassis.findBySalvageValue(10)
Chassis.findByMinStructurePoints(20)
Chassis.findByMinSystemSlots(4)
Chassis.findByMinModuleSlots(3)
Chassis.findByMinCargoCap(5)

// Convenience methods
Chassis.getRecommended()                 // Get recommended chassis
```

### Abilities

```typescript
import { Abilities } from './lib/index.js';

// Basic queries
Abilities.all()
Abilities.findById('uuid')
Abilities.findByName('Scavenge')

// Specialized queries
Abilities.findByLevel(1)
Abilities.findByType('core')
Abilities.findByClass('Hauler')
Abilities.findByTrait('melee')

// Convenience methods
Abilities.getCoreAbilities()
Abilities.getLegendaryAbilities()
```

## Advanced Queries

All models inherit from `BaseModel` which provides powerful query methods:

```typescript
// Custom filters with where()
const expensiveEquipment = Equipment.where(e => 
  (e.salvageValue ?? 0) > 5
);

// Combine multiple conditions
const advancedArmor = Equipment.where(e =>
  e.traits?.some(t => t.type === 'armor') &&
  (e.techLevel ?? 0) >= 3
);

// Map over results
const names = Equipment.findByTechLevel(3).map(e => e.name);

// Check conditions
const hasExplosives = Equipment.some(e =>
  e.traits?.some(t => t.type === 'explosive')
);

const allHaveNames = Equipment.every(e => e.name.length > 0);
```

## Creating Custom Models

You can create your own model classes for other data types:

```typescript
import { BaseModel } from './lib/BaseModel.js';
import { Systems } from './lib/types/systems.js';
import systemsData from '../data/systems.json' assert { type: 'json' };
import systemsSchema from '../schemas/systems.schema.json' assert { type: 'json' };

export class SystemsModel extends BaseModel<Systems> {
  constructor() {
    super(systemsData as Systems[], systemsSchema);
  }

  // Add custom query methods
  findByTechLevel(level: number): Systems[] {
    return this.where(s => s.techLevel === level);
  }

  findWeaponSystems(): Systems[] {
    return this.where(s => 
      s.traits?.some(t => 
        ['ballistic', 'energy', 'missile'].includes(t.type)
      ) ?? false
    );
  }
}

// Export pre-instantiated model
export const Systems = new SystemsModel();
```

## Type Safety

All models are fully typed using TypeScript interfaces generated from JSON Schema:

```typescript
import type { Equipment } from './lib/types/equipment.js';

const item: Equipment = Equipment.findById('some-uuid')!;

// TypeScript knows all the properties
console.log(item.name);           // string
console.log(item.techLevel);      // number | undefined
console.log(item.salvageValue);   // number | undefined
console.log(item.traits);         // Traits[] | undefined
```

## API Reference

### BaseModel<T>

All models extend `BaseModel<T>` which provides:

#### Query Methods
- `all(): T[]` - Get all items
- `count(): number` - Get count of items
- `find(predicate): T | undefined` - Find single item
- `where(predicate): T[]` - Find all matching items
- `findById(id): T | undefined` - Find by ID
- `findByName(name): T | undefined` - Find by exact name
- `searchByName(query): T[]` - Search by partial name
- `findBySource(source): T[]` - Find by source

#### Utility Methods
- `first(): T | undefined` - Get first item
- `last(): T | undefined` - Get last item
- `random(): T | undefined` - Get random item
- `randomMany(count): T[]` - Get random items

#### Functional Methods
- `map<U>(fn): U[]` - Map over items
- `some(predicate): boolean` - Check if any match
- `every(predicate): boolean` - Check if all match

#### Schema Access
- `getSchema(): any` - Get JSON Schema

## Examples

See `examples/orm-usage.ts` for comprehensive examples:

```bash
npm run example
```

## Regenerating Types

When schemas change, regenerate TypeScript types:

```bash
npm run generate:types
```

This will update all files in `lib/types/` based on the JSON schemas.

## License

ISC

