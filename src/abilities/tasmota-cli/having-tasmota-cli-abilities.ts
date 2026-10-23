import type { HavingCommandAbilities } from '@thingmate/abilities';

export type TasmotaCliArguments = readonly [payload: string];

export interface HavingTasmotaCliAbilities extends HavingCommandAbilities<TasmotaCliArguments> {}
