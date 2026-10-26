import { CommandAbilities } from '@thingmate/abilities';
import type {
  HavingTasmotaCliAbilities,
  TasmotaCliArguments,
} from './having-tasmota-cli-abilities.ts';

/**
 * The abilities of a Tasmota CLI command: sending a string payload to the device, and observing
 * the log lines published by the device.
 */
export class TasmotaCliAbilities
  extends CommandAbilities<TasmotaCliArguments>
  implements HavingTasmotaCliAbilities {}
