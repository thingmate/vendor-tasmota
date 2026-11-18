import { describe, expect, it } from 'vitest';
import { isTasmotaZbSendResponse } from './is-tasmota-zb-send-response.ts';

describe('isTasmotaZbSendResponse', () => {
  it('accepts a successful ZbSend response', () => {
    expect(isTasmotaZbSendResponse({ ZbSend: 'Done' })).toBe(true);
  });

  it('rejects a ZbSend error response', () => {
    expect(isTasmotaZbSendResponse({ ZbSend: { Error: 'unknown device' } })).toBe(false);
  });

  it('rejects any other input', () => {
    expect(isTasmotaZbSendResponse(null)).toBe(false);
    expect(isTasmotaZbSendResponse('Done')).toBe(false);
    expect(isTasmotaZbSendResponse({})).toBe(false);
    expect(isTasmotaZbSendResponse({ ZbConfig: {} })).toBe(false);
  });
});
