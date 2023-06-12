---
nav: "SyncUpdateResult"
note: "This file is autogenerated from TypeScript definitions. Make edits to the comments in the TypeScript file and then run `make docs` to regenerate this file."
search:
  boost: 0.1
---
# Interface: SyncUpdateResult<K, L, SchemaT\>

[core](../modules/core.md).SyncUpdateResult

Type definition for the batched result returned by a sync table update function.

## Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `L` | extends `string` |
| `SchemaT` | extends [`ObjectSchemaDefinition`](core.ObjectSchemaDefinition.md)<`K`, `L`\> |

## Properties

### result

• **result**: [`SyncUpdateSingleResult`](../types/core.SyncUpdateSingleResult.md)<`K`, `L`, `SchemaT`\>[]

The individual update results. Every incoming update should have a corresponding result, in the same order.