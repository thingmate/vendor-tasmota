import { isObject } from '@xstd/is-type';
import type { TasmotaZbConfig } from './tasmota-zb-config.ts';

/**
 * Checks whether an input is a `TasmotaZbConfig`.
 *
 * @param input - The value to check.
 * @returns `true` when the input is a `TasmotaZbConfig`.
 */
export function isTasmotaTasmotaZbConfig(input: unknown): input is TasmotaZbConfig {
  if (!isObject(input)) {
    return false;
  }

  const config = input as TasmotaZbConfig;

  return (
    isNumberInRange(config.Channel, 11, 26) &&
    is0xHexString(config.PanID, 4) && // hex 2B
    is0xHexString(config.ExtPanID, 16) && // hex 8B
    is0xHexString(config.KeyL, 16) && // hex 8B
    is0xHexString(config.KeyH, 16) && // hex 8B
    isNumberInRange(config.TxRadio, 1, 21)
  );
}

/**
 * Checks whether a value is a number in the given inclusive range.
 */
function isNumberInRange(input: unknown, min: number, max: number): boolean {
  return typeof input === 'number' && input >= min && input <= max;
}

/**
 * Checks whether a value is an `0x`-prefixed hex string of exactly `digitCount` hex digits (ex: `'0x1A63'` for 4 digits).
 */
function is0xHexString(input: unknown, digitCount: number): input is string {
  return typeof input === 'string' && input.length === digitCount + 2 && /^0x[\dA-F]+$/.test(input);
}
