import { type TasmotaLogging } from '../tasmota-logging.ts';

// date uses rfc9557 => https://datatracker.ietf.org/doc/html/rfc9557
// const TIME_REGEXP = new RegExp('^(\\d{2}):(\\d{2}):(\\d{2})\\.(\\d{3})$', '');
const LOGGING_REGEX = new RegExp('^(\\d{2}):(\\d{2}):(\\d{2})\\.(\\d{3}) (\\w+):? (.*)$', '');

/**
 * Converts a string input into a `TasmotaLogging` object.
 */
export function parseTasmotaLogging(input: string): TasmotaLogging {
  LOGGING_REGEX.lastIndex = 0;
  const match: RegExpExecArray | null = LOGGING_REGEX.exec(input);

  // TODO Temporal.PlainTime.from("12:34:56");

  if (match === null) {
    throw new Error(`Malformed LOGGING: ${input}`);
  }

  return {
    time: {
      hour: Number(match[1]),
      minute: Number(match[2]),
      second: Number(match[3]),
      millisecond: Number(match[4]),
    },
    code: match[5],
    message: match[6],
  };
}
