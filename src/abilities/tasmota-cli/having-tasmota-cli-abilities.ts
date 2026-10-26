import type { HavingCommandAbilities } from '@thingmate/abilities';

/**
 * Arguments of a Tasmota CLI command: a single string payload.
 */
export type TasmotaCliArguments = readonly [payload: string];

/**
 * An object having the abilities of a Tasmota CLI command.
 */
export type HavingTasmotaCliAbilities = HavingCommandAbilities<TasmotaCliArguments>;
