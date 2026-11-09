import { isObject } from '@xstd/is-type';
import { isTasmotaTasmotaZbConfig } from '../is-tasmota-tasmota-zb-config.ts';
import type { TasmotaZbConfigResponse } from './tasmota-zb-config-response.ts';

/**
 * Checks whether an input is a `TasmotaZbConfigResponse` (a `ZbConfig` response).
 *
 * @param input - The value to check.
 * @returns `true` when the input is a `TasmotaZbConfigResponse`.
 */
export function isTasmotaZbConfigResponse(input: unknown): input is TasmotaZbConfigResponse {
  return isObject(input) && isTasmotaTasmotaZbConfig((input as { ZbConfig?: unknown }).ZbConfig);
}
