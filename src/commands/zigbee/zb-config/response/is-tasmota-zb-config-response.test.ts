import { describe, expect, it } from 'vitest';
import { isTasmotaZbConfigResponse } from './is-tasmota-zb-config-response.ts';

const VALID_ZB_CONFIG = {
  Channel: 11,
  PanID: '0x1A63',
  ExtPanID: '0x0123456789ABCDEF',
  KeyL: '0x0F0D0B0907050301',
  KeyH: '0x0D0C0A0806040200',
  TxRadio: 20,
};

describe('isTasmotaZbConfigResponse', () => {
  it('accepts a ZbConfig response with a valid configuration', () => {
    expect(isTasmotaZbConfigResponse({ ZbConfig: VALID_ZB_CONFIG })).toBe(true);
  });

  it('rejects a response with a missing or invalid ZbConfig', () => {
    expect(isTasmotaZbConfigResponse({})).toBe(false);
    expect(isTasmotaZbConfigResponse({ ZbConfig: null })).toBe(false);
    expect(isTasmotaZbConfigResponse({ ZbConfig: { ...VALID_ZB_CONFIG, Channel: 10 } })).toBe(
      false,
    );
  });

  it('rejects any other input', () => {
    expect(isTasmotaZbConfigResponse(null)).toBe(false);
    expect(isTasmotaZbConfigResponse('ZbConfig')).toBe(false);
    expect(isTasmotaZbConfigResponse({ ZbSend: 'Done' })).toBe(false);
  });
});
