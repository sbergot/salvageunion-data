# Contributing to Salvage Union Data

Thank you for your interest in contributing to the Salvage Union Data repository! This guide will help you add or update game data while maintaining quality and consistency.

## 🚀 Quick Start

1. **Fork and clone** the repository
2. **Install dependencies**: `npm install`
3. **Make your changes** to the appropriate JSON file(s)
4. **Validate**: `npm run validate`
5. **Format**: `npm run format`
6. **Submit a pull request**

## 📋 Contribution Guidelines

### Data Quality Standards

All contributions must meet these requirements:

#### ✅ Required for All Entries
- **Page reference**: Every entry must include a `page` property
- **Source attribution**: Must specify `source` (currently "core")
- **Accurate data**: Must match the source material word-for-word
- **Schema compliance**: Must pass validation (`npm run validate`)

#### ✅ Formatting
- Use 2-space indentation
- Run `npm run format` before committing
- Follow existing data structure patterns

#### ✅ Completeness
- Include all relevant properties from the source
- Don't omit optional fields if they have values
- Include descriptions and effect text verbatim

### Adding New Data

#### Step 1: Find the Right File

| Data Type | File | Schema |
|-----------|------|--------|
| Pilot Abilities | `data/abilities.json` | `schemas/abilities.schema.json` |
| Character Classes | `data/classes.json` | `schemas/classes.schema.json` |
| Pilot Equipment | `data/equipment.json` | `schemas/equipment.schema.json` |
| Mech Systems | `data/systems.json` | `schemas/systems.schema.json` |
| Mech Modules | `data/modules.json` | `schemas/modules.schema.json` |
| Mech Chassis | `data/chassis.json` | `schemas/chassis.schema.json` |
| Bio-Titans | `data/bio-titans.json` | `schemas/bio-titans.schema.json` |
| Creatures | `data/creatures.json` | `schemas/creatures.schema.json` |
| NPCs | `data/npcs.json` | `schemas/npcs.schema.json` |
| Drones | `data/drones.json` | `schemas/drones.schema.json` |
| Vehicles | `data/vehicles.json` | `schemas/vehicles.schema.json` |
| Squads | `data/squads.json` | `schemas/squads.schema.json` |
| Meld | `data/meld.json` | `schemas/meld.schema.json` |
| Crawlers | `data/crawlers.json` | `schemas/crawlers.schema.json` |
| Tables | `data/tables.json` | `schemas/tables.schema.json` |
| Keywords | `data/keywords.json` | `schemas/keywords.schema.json` |
| Traits | `data/traits.json` | `schemas/traits.schema.json` |

#### Step 2: Follow the Schema

Each data type has specific required fields. Check the schema file or use VSCode's IntelliSense for guidance.

**Example: Adding an Ability**
```json
{
  "name": "Ability Name",
  "tree": "Engineering",
  "source": "core",
  "level": 1,
  "description": "Lore description from the book",
  "effect": "Mechanical effect description",
  "activationCost": 1,
  "actionType": "Turn Action",
  "range": "Close",
  "page": 28
}
```

#### Step 3: Include Page References

**CRITICAL**: Every entry must include the page number from the source book.

```json
{
  "name": "Example Item",
  "page": 123  // ← Required!
}
```

#### Step 4: Use Correct Enumerations

Many fields use specific enumerated values. Check `schemas/shared/enums.schema.json` for valid options:

**Common Enums:**
- `source`: `"core"`
- `range`: `"Close"`, `"Medium"`, `"Long"`
- `actionType`: `"Turn Action"`, `"Reaction"`, `"Passive"`, `"Free Action"`
- `tree`: `"Engineering"`, `"Hacking"`, `"Hauling"`, etc.

#### Step 5: Format Activation Costs

**Important**: Activation costs should be numbers only (not "AP" suffix):
- ✅ `"activationCost": 1`
- ✅ `"activationCost": 2`
- ✅ `"activationCost": "Variable"` (for XAP costs)
- ❌ `"activationCost": "1 AP"`

#### Step 6: Structure Traits Correctly

Traits can be simple or have numeric values:

```json
{
  "traits": [
    { "type": "melee" },
    { "type": "ballistic" },
    { "type": "explosive", "amount": 2 },
    { "type": "multi-attack", "amount": 3 }
  ]
}
```

#### Step 7: Include Roll Tables

For abilities with roll outcomes, include the full roll table:

```json
{
  "rollTable": {
    "type": "standard",
    "1": "Critical failure outcome text",
    "2-5": "Low outcome text",
    "6-10": "Moderate outcome text",
    "11-19": "High success outcome text",
    "20": "Critical success outcome text"
  }
}
```

### Validation and Testing

#### Before Submitting

1. **Validate your changes**:
   ```bash
   npm run validate
   ```
   
2. **Format your code**:
   ```bash
   npm run format
   ```

3. **Check for common issues**:
   - Missing page references
   - Typos in enum values
   - Incorrect data types
   - Missing required fields

#### Using VSCode

If you're using VSCode, you'll get:
- ✅ Real-time validation errors
- ✅ IntelliSense autocomplete
- ✅ Hover documentation
- ✅ Format on save

### Common Mistakes to Avoid

❌ **Don't:**
- Omit page references
- Use "AP" suffix in activation costs
- Manually format JSON (use `npm run format`)
- Copy data without verifying against source
- Add data without schema validation

✅ **Do:**
- Include page numbers for everything
- Use numeric activation costs (or "Variable")
- Run validation before committing
- Match source material exactly
- Follow existing patterns

### Pull Request Process

1. **Create a descriptive PR title**:
   - ✅ "Add Ranger abilities from pages 66-69"
   - ✅ "Fix activation costs in Hacker tree"
   - ❌ "Update data"

2. **Describe your changes**:
   - What data was added/modified
   - Page references verified
   - Any special considerations

3. **Ensure CI passes**:
   - Validation must pass
   - No formatting issues

4. **Respond to feedback**:
   - Address review comments
   - Update as needed

## 🐛 Reporting Issues

### Data Errors

If you find incorrect data:
1. Note the specific entry and file
2. Provide the correct information
3. Include page reference
4. Submit an issue or PR

### Schema Issues

If you find schema problems:
1. Describe the issue
2. Provide example data
3. Suggest a solution if possible

## 📚 Resources

- **Schema Documentation**: See `SCHEMAS.md`
- **README**: See `Readme.md`
- **Salvage Union**: [Leyline Press](https://leyline.press/)

## 🙏 Thank You!

Your contributions help make this dataset more complete and accurate for the entire Salvage Union community!

