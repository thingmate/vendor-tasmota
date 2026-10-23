import { CommandAbilities } from '@thingmate/abilities';
import type {
  HavingTasmotaCliAbilities,
  TasmotaCliArguments,
} from './having-tasmota-cli-abilities.ts';

export class TasmotaCliAbilities
  extends CommandAbilities<TasmotaCliArguments>
  implements HavingTasmotaCliAbilities {}
