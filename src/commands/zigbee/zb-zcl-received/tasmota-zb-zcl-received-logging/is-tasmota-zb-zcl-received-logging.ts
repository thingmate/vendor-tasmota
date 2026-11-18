import { isObject } from '@xstd/is-type';
import { isTasmotaZbZCLReceived } from '../tasmota-zb-zcl-received/is-tasmota-zb-zcl-received.ts';
import type { TasmotaZbZCLReceivedLogging } from './tasmota-zb-zcl-received-logging.ts';

/**
 * Checks whether an input is a `TasmotaZbZCLReceivedLogging` (a `ZbZCLReceived` Tasmota logging
 * message).
 *
 * @param input - The value to check.
 * @returns `true` when the input is a `TasmotaZbZCLReceivedLogging`.
 */
export function isTasmotaZbZCLReceivedLogging(
  input: unknown,
): input is TasmotaZbZCLReceivedLogging {
  return (
    isObject(input) && isTasmotaZbZCLReceived((input as { ZbZCLReceived?: unknown }).ZbZCLReceived)
  );
}
