# Vocabulary Progress Bar Diagnostic Report
**Generated:** March 21, 2026

---

## Executive Summary
Investigation reveals that **Elementary vocabulary has severe data corruption issues**, while **Beginner vocabulary structure is correct**. However, specific progress bar functionality for vocabulary hasn't been located in the practice system.

---

## CRITICAL ISSUES FOUND

### 🔴 ISSUE #1: Elementary/Unit-1.ts has wrong levelId and export name
**File:** [src/data/vocabulary/elementary/unit-1.ts](src/data/vocabulary/elementary/unit-1.ts)

**Problems:**
- **Line 1-2:** Comment says "Beginner Unit 1 vocabulary" (should say Elementary)
- **Line 4-5:** Exports `export const beginnerUnit1` (should be `elementaryUnit1`)
- **Line 6:** Has `id: 'beginner-unit-1'` (should be `elementary-unit-1`)
- **Line 7:** Has `levelId: 'beginner'` (should be `'elementary'`)

**Impact:** This file is a copy-paste of beginner/unit-1.ts with incorrect data. When the index tries to import it as `elementaryUnit1`, it imports `beginnerUnit1` instead, causing data mismatch.

**Evidence:**
```typescript
// WRONG - Line 1-8 of elementary/unit-1.ts
// Beginner Unit 1 vocabulary    ❌ Should say "Elementary"

export const beginnerUnit1: VocabularyUnit = {   ❌ Should be elementaryUnit1
  id: 'beginner-unit-1',                         ❌ Should be 'elementary-unit-1'
  levelId: 'beginner',                           ❌ Should be 'elementary'
  unitId: 'unit-1',                              ✓ Correct
  // ...
```

---

### 🔴 ISSUE #2: Elementary units 6-12 have wrong unitId and duplicated export names
**Files:** 
- [src/data/vocabulary/elementary/unit-6.ts](src/data/vocabulary/elementary/unit-6.ts)
- [src/data/vocabulary/elementary/unit-7.ts](src/data/vocabulary/elementary/unit-7.ts)
- [src/data/vocabulary/elementary/unit-8.ts](src/data/vocabulary/elementary/unit-8.ts)
- [src/data/vocabulary/elementary/unit-9.ts](src/data/vocabulary/elementary/unit-9.ts)
- [src/data/vocabulary/elementary/unit-10.ts](src/data/vocabulary/elementary/unit-10.ts)
- [src/data/vocabulary/elementary/unit-11.ts](src/data/vocabulary/elementary/unit-11.ts)
- [src/data/vocabulary/elementary/unit-12.ts](src/data/vocabulary/elementary/unit-12.ts)

**Problems:** All export the same name `elementaryUnit4` with `unitId: 'unit-4'`
```
unit-6.ts:  export const elementaryUnit4  unitId: 'unit-4'  ❌ Should be unit-6
unit-7.ts:  export const elementaryUnit4  unitId: 'unit-4'  ❌ Should be unit-7
unit-8.ts:  export const elementaryUnit4  unitId: 'unit-4'  ❌ Should be unit-8
unit-9.ts:  export const elementaryUnit4  unitId: 'unit-4'  ❌ Should be unit-9
unit-10.ts: export const elementaryUnit4  unitId: 'unit-4'  ❌ Should be unit-10
unit-11.ts: export const elementaryUnit4  unitId: 'unit-4'  ❌ Should be unit-11
unit-12.ts: export const elementaryUnit4  unitId: 'unit-4'  ❌ Should be unit-12
```

**Impact:** Elementary index.ts tries to import 5 units but the file structure is corrupted. This silently breaks vocabulary loading for elementary level.

---

## STRUCTURAL COMPARISON

### ✅ Beginner Level - CORRECT
**File:** [src/data/vocabulary/beginner/index.ts](src/data/vocabulary/beginner/index.ts)

All 14 units properly named and structured:
```
unit-1.ts: export const beginnerUnit1  levelId: 'beginner'  unitId: 'unit-1'   ✓
unit-2.ts: export const beginnerUnit2  levelId: 'beginner'  unitId: 'unit-2'   ✓
unit-3.ts: export const beginnerUnit3  levelId: 'beginner'  unitId: 'unit-3'   ✓
... (all 14 units follow same correct pattern)
unit-14.ts: export const beginnerUnit14 levelId: 'beginner' unitId: 'unit-14'  ✓
```

### ❌ Elementary Level - CORRUPTED
**File:** [src/data/vocabulary/elementary/index.ts](src/data/vocabulary/elementary/index.ts)

Only 5 units exported but 7 files are corrupted:
```
unit-1.ts:  export const beginnerUnit1    ❌ Wrong export name
unit-2.ts:  export const elementaryUnit2  ✓
unit-3.ts:  export const elementaryUnit3  ✓
unit-4.ts:  export const elementaryUnit4  ✓
unit-5.ts:  export const ??? (not checked)
unit-6.ts to unit-12.ts: export const elementaryUnit4 (duplicated) ❌ Extra files, corrupted names
```

---

## DATA FLOW ANALYSIS

### Vocabulary Loading Path
```
1. Practice page calls: getTopicsByUnit(level, unitId)
   ↓
2. Calls: getVocabularyWords(level, unitId)
   ↓
3. Calls: getVocabularyUnit(level, unitId)
   ↓
4. Searches in: allLevels[levelId].units
   ↓
5. Finds unit where unit.unitId === unitId
   ↓
6. Returns: unit.words array
```

**File:** [src/data/vocabulary/index.ts](src/data/vocabulary/index.ts) (Lines 60-75)

**Issue:** When loading beginner works fine because:
- ✅ levelId matches ('beginner' = 'beginner')
- ✅ unitId matches ('unit-1' = 'unit-1')
- ✅ words array is populated

**When loading elementary, it might still work for units 1-5 if:**
- The mismatches in unit-1 don't prevent import (depends on how default export is handled)
- But units 6-12 won't be imported properly since they're not in the index

---

## PRACTICE PAGE ANALYSIS
**File:** [src/app/vocabulary/[level]/unit/[unitId]/practice/page.tsx](src/app/vocabulary/[level]/unit/[unitId]/practice/page.tsx) (Line 62-90)

The practice page does:
1. Extracts URL params: `level` (e.g., 'beginner') and `unitId` (e.g., 'unit-1')
2. Calls `getTopicsByUnit(level, unitId)` to load words
3. Displays words in a Flashcard component
4. Shows loading state while fetching
5. Shows "No words available" if array is empty (Line 119-133)

**Potential Issue:** If words array is empty and page shows "No words available", this confirms data loading failure.

---

## RECOMMENDATIONS

### Priority 1: Fix Elementary/Unit-1.ts
Replace entire file with correct structure:
```typescript
// Elementary Unit 1 vocabulary
import type { VocabularyUnit } from '../types';

export const elementaryUnit1: VocabularyUnit = {    // Change: beginnerUnit1 → elementaryUnit1
  id: 'elementary-unit-1',                          // Change: beginner-unit-1 → elementary-unit-1
  levelId: 'elementary',                            // Change: beginner → elementary
  unitId: 'unit-1',                                 // Keep: unit-1
  title: 'Unit 1',
  description: 'Elementary Unit 1 vocabulary',      // Change: Beginner → Elementary
  words: [ ... ],
};

export default elementaryUnit1;
```

### Priority 2: Fix Elementary Units 6-12
Each file needs correct export and unitId:
- unit-6.ts: `elementaryUnit6` with `unitId: 'unit-6'`
- unit-7.ts: `elementaryUnit7` with `unitId: 'unit-7'`
- unit-8.ts: `elementaryUnit8` with `unitId: 'unit-8'`
- unit-9.ts: `elementaryUnit9` with `unitId: 'unit-9'`
- unit-10.ts: `elementaryUnit10` with `unitId: 'unit-10'`
- unit-11.ts: `elementaryUnit11` with `unitId: 'unit-11'`
- unit-12.ts: `elementaryUnit12` with `unitId: 'unit-12'`

### Priority 3: Update Elementary Index
Update [src/data/vocabulary/elementary/index.ts](src/data/vocabulary/elementary/index.ts) to import all corrected units:
```typescript
export { default as elementaryUnit1 } from './unit-1';   // Fixed
// ... rest of imports
```

### Priority 4: Investigate "Progress Bar"
**Current finding:** No specific progress bar component found in vocabulary practice.
- Search for where "progress bar" is actually displayed
- Could be referring to completion percentage
- Could be in a different feature (quiz, learning path)
- Need clarification on what "progress bar" means in this context

---

## FILES REQUIRING NO CHANGES
✅ [src/data/vocabulary/beginner/](src/data/vocabulary/beginner/) - All correct
✅ [src/data/vocabulary/index.ts](src/data/vocabulary/index.ts) - Functions are correct
✅ Practice pages - Code logic is sound
✅ Typing system - No type mismatches detected

---

## Verification Steps
After fixes are applied:
1. Check that `getVocabularyUnitsByLevel('elementary')` returns 5 units
2. Check that each unit has the correct `unitId`
3. Load practice page for beginner-unit-1 and verify words appear
4. Load practice page for elementary-unit-1 and verify correct words appear
5. Verify no TypeScript errors: `npm run build`
