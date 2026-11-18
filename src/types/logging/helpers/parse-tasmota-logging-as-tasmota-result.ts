import type { TasmotaLogging } from '../tasmota-logging.ts';

/**
 * Matches the `message` of an `MQT` Tasmota log line holding a command-response MQTT publication:
 * `stat/<device>/<sub-topic> = {json}`.
 *
 * The sub-topic is `RESULT` (default configuration), `STATUS<n>`, or the uppercased command name
 * when the device has `SetOption4` enabled (ex: `ZBSEND`). Publications without a JSON object
 * payload (ex: `stat/<device>/POWER1 = ON`) and non-`stat` publications are not matched.
 *
 * Assumes the Tasmota default full topic (`%prefix%/%topic%/`).
 */
const MQTT_RESULT_REGEX = /^stat\/[^/\s]+\/[A-Z][A-Z0-9_]*\s*=\s*(\{.*)$/;

/**
 * Attempts to parse the `code` and `message` of a `TasmotaLogging` as the JSON payload of a
 * command-response MQTT message.
 *
 * @param logging - The `code` and `message` of a `TasmotaLogging`.
 * @returns The JSON payload, or `null` when the logging is not a command-response MQTT
 *          publication.
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
