import type { TasmotaLogging } from '../tasmota-logging.ts';

/**
 * Matches the `message` of an `MQT` Tasmota log line holding a `RESULT` MQTT publication:
 * `stat/<device>/RESULT = <json>`.
 */
const MQTT_RESULT_REGEX = /^stat\/\w+\/RESULT\s*=\s*(.*)$/;

/**
 * Attempts to parse the `code` and `message` of a `TasmotaLogging` as the JSON payload of a
 * `RESULT` MQTT message.
 *
 * @param logging - The `code` and `message` of a `TasmotaLogging`.
 * @returns The JSON payload, or `null` when the logging is not a `RESULT` MQTT publication.
 */
export function parseTasmotaLoggingAsTasmotaResult({
  code,
  message,
}: Pick<TasmotaLogging, 'code' | 'message'>): string | null {
  if (code === 'MQT') {
    const match: RegExpExecArray | null = MQTT_RESULT_REGEX.exec(message);

    return match ? match[1] : null;
  }
  return null;
}
