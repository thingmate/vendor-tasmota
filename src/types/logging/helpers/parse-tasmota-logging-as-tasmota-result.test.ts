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

  it('returns null for another code', () => {
    expect(parseTasmotaLoggingAsTasmotaResult({ code: 'ZIG', message: 'anything' })).toBeNull();
  });
});
