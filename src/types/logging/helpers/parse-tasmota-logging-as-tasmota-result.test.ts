import { describe, expect, it } from 'vitest';
import { parseTasmotaLoggingAsTasmotaResult } from './parse-tasmota-logging-as-tasmota-result.ts';

describe('parseTasmotaLoggingAsTasmotaResult', () => {
  it('extracts the JSON payload of a RESULT publication', () => {
    expect(
      parseTasmotaLoggingAsTasmotaResult({
        code: 'MQT',
        message: 'stat/tasmota_XXXXXX/RESULT = {"ZbSend":"Done"}',
      }),
    ).toBe('{"ZbSend":"Done"}');
  });

  it('extracts the JSON payload of a RESULT publication from a device topic with a hyphen', () => {
    expect(
      parseTasmotaLoggingAsTasmotaResult({
        code: 'MQT',
        message: 'stat/living-room/RESULT = {"ZbSend":"Done"}',
      }),
    ).toBe('{"ZbSend":"Done"}');
  });

  it('returns null for a non-RESULT MQTT message', () => {
    expect(
      parseTasmotaLoggingAsTasmotaResult({
        code: 'MQT',
        message: 'tele/tasmota_XXXXXX/STATE = {"Power":"ON"}',
      }),
    ).toBeNull();
  });

  it('returns null for a non-JSON command state publication', () => {
    expect(
      parseTasmotaLoggingAsTasmotaResult({
        code: 'MQT',
        message: 'stat/tasmota_XXXXXX/POWER1 = ON',
      }),
    ).toBeNull();
  });

  it('extracts the JSON payload of a STATUS command response', () => {
    expect(
      parseTasmotaLoggingAsTasmotaResult({
        code: 'MQT',
        message: 'stat/tasmota_XXXXXX/STATUS5 = {"Status":{"Module":18}}',
      }),
    ).toBe('{"Status":{"Module":18}}');
  });

  it('extracts the JSON payload of a command response published to the command name topic (SetOption4)', () => {
    expect(
      parseTasmotaLoggingAsTasmotaResult({
        code: 'MQT',
        message: 'stat/living-room/ZBSEND = {"ZbSend":"Done"}',
      }),
    ).toBe('{"ZbSend":"Done"}');
  });

  it('returns null for another code', () => {
    expect(parseTasmotaLoggingAsTasmotaResult({ code: 'ZIG', message: 'anything' })).toBeNull();
  });
});
