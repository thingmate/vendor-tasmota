import { type TasmotaLogging } from '../tasmota-logging.ts';

/**
 * Matches a Tasmota log line as published to `stat/<device>/LOGGING`:
 * `HH:MM:SS(.mmm)? CODE: message`.
 *
 * The millisecond part is optional: older firmware versions omit it.
 */
const LOGGING_REGEX = /^(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))? (\w+):?(?: (.*))?$/;

/**
 * Converts a string input into a `TasmotaLogging` object.
 *
 * @param input - A Tasmota log line, as published to `stat/<device>/LOGGING`.
 * @returns The parsed `TasmotaLogging`.
 * @throws When `input` does not match the expected log line format.
 */
export function parseTasmotaLogging(input: string): TasmotaLogging {
  const match: RegExpExecArray | null = LOGGING_REGEX.exec(input);

  if (match === null) {
    throw new Error(`Malformed LOGGING: ${input}`);
  }

  return {
    time: {
      hour: Number(match[1]),
      minute: Number(match[2]),
      second: Number(match[3]),
      millisecond: match[4] === undefined ? 0 : Number(match[4]),
    },
    code: match[5],
    message: match[6] ?? '',
  };
}
