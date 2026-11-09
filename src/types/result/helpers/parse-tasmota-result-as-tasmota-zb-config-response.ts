import { isTasmotaZbConfigResponse } from '../../../commands/zigbee/zb-config/response/is-tasmota-zb-config-response.ts';
import type { TasmotaZbConfigResponse } from '../../../commands/zigbee/zb-config/response/tasmota-zb-config-response.ts';

/**
 * Attempts to parse a Tasmota result as a `TasmotaZbConfigResponse`.
 *
 * @param result - A Tasmota result: a JSON string, as extracted from a `RESULT` MQTT message.
 * @returns The parsed `TasmotaZbConfigResponse`, or `null` when the result is not a
 *          `ZbConfig` response.
 */
export function parseTasmotaResultAsTasmotaZbConfigResponse(
  result: string,
): TasmotaZbConfigResponse | null {
  try {
    const data: unknown = JSON.parse(result);

    if (isTasmotaZbConfigResponse(data)) {
      return data;
    }
  } catch (error: unknown) {
    if (!(error instanceof SyntaxError)) {
      throw error;
    }
  }
  return null;
}
