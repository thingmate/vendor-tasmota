import { describe, expect, it } from 'vitest';
import { parseTasmotaLogging } from './parse-tasmota-logging.ts';

describe('parseTasmotaLogging', () => {
  it('parses a log line with milliseconds', () => {
    expect(
      parseTasmotaLogging('12:34:56.789 MQT: stat/tasmota_XXXXXX/RESULT = {"ZbSend":"Done"}'),
    ).toEqual({
      time: { hour: 12, minute: 34, second: 56, millisecond: 789 },
      code: 'MQT',
      message: 'stat/tasmota_XXXXXX/RESULT = {"ZbSend":"Done"}',
    });
  });

  it('parses a log line without milliseconds (older firmware)', () => {
    expect(parseTasmotaLogging('12:34:56 ZIG: {"ZbZCLReceived":{}}')).toEqual({
      time: { hour: 12, minute: 34, second: 56, millisecond: 0 },
      code: 'ZIG',
      message: '{"ZbZCLReceived":{}}',
    });
  });

  it('parses a log line with a heap suffix in the timestamp (SetOption130, ESP32)', () => {
    expect(
      parseTasmotaLogging(
        '14:30:16.749-172/38 MQT: stat/tasmota_XXXXXX/RESULT = {"ZbSend":"Done"}',
      ),
    ).toEqual({
      time: { hour: 14, minute: 30, second: 16, millisecond: 749 },
      code: 'MQT',
      message: 'stat/tasmota_XXXXXX/RESULT = {"ZbSend":"Done"}',
    });
  });

  it('parses a log line with a heap-only suffix in the timestamp (SetOption130, ESP8266)', () => {
    expect(
      parseTasmotaLogging('13:45:21.999-123 MQT: stat/tasmota_XXXXXX/RESULT = {"ZbSend":"Done"}'),
    ).toEqual({
      time: { hour: 13, minute: 45, second: 21, millisecond: 999 },
      code: 'MQT',
      message: 'stat/tasmota_XXXXXX/RESULT = {"ZbSend":"Done"}',
    });
  });

  it('throws on a malformed log line', () => {
    expect(() => parseTasmotaLogging('not a log line')).toThrow(/^Malformed LOGGING: /);
  });
});
