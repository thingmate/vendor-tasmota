import { describe, expect, it } from 'vitest';
import { parseTasmotaResultAsTasmotaZbConfigResponse } from './parse-tasmota-result-as-tasmota-zb-config-response.ts';

const VALID_ZB_CONFIG = {
  Channel: 11,
  PanID: '0x1A63',
  ExtPanID: '0x0123456789ABCDEF',
  KeyL: '0x0F0D0B0907050301',
  KeyH: '0x0D0C0A0806040200',
  TxRadio: 20,
};

describe('parseTasmotaResultAsTasmotaZbConfigResponse', () => {
  it('parses a ZbConfig result', () => {
    expect(
      parseTasmotaResultAsTasmotaZbConfigResponse(JSON.stringify({ ZbConfig: VALID_ZB_CONFIG })),
    ).toEqual({
      ZbConfig: VALID_ZB_CONFIG,
    });
  });

  it('returns null for a non-JSON result', () => {
    expect(parseTasmotaResultAsTasmotaZbConfigResponse('not json')).toBeNull();
  });

  it('returns null for another command response', () => {
    expect(parseTasmotaResultAsTasmotaZbConfigResponse('{"ZbSend":"Done"}')).toBeNull();
  });

  it('returns null for an invalid ZbConfig', () => {
    expect(parseTasmotaResultAsTasmotaZbConfigResponse('{"ZbConfig":{"Channel":27}}')).toBeNull();
  });
});
