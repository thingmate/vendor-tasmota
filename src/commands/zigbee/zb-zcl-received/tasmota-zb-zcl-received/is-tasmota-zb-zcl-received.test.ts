import { describe, expect, it } from 'vitest';
import { isTasmotaZbZCLReceived } from './is-tasmota-zb-zcl-received.ts';

const VALID_ZB_ZCL_RECEIVED = {
  groupid: 0,
  clusterid: '0x0006',
  srcaddr: '0x2916',
  srcendpoint: 1,
  dstendpoint: 1,
  wasbroadcast: 0,
  LinkQuality: 120,
  securityuse: 0,
  seqnumber: 84,
  fc: '0x18',
  frametype: 1,
  direction: 0,
  disableresp: 0,
  manuf: '0x115F',
  transact: 3,
  cmdid: '0x0A',
  payload: '0A0B00',
};

describe('isTasmotaZbZCLReceived', () => {
  it('accepts a received Zigbee ZCL frame', () => {
    expect(isTasmotaZbZCLReceived(VALID_ZB_ZCL_RECEIVED)).toBe(true);
  });

  it('rejects an incomplete frame', () => {
    const { payload, ...incomplete } = VALID_ZB_ZCL_RECEIVED;
    expect(isTasmotaZbZCLReceived(incomplete)).toBe(false);
  });

  it('rejects an old firmware payload publishing the cluster id as a number', () => {
    expect(isTasmotaZbZCLReceived({ ...VALID_ZB_ZCL_RECEIVED, clusterid: 6 })).toBe(false);
  });

  it('rejects out-of-range or mistyped flag fields', () => {
    expect(isTasmotaZbZCLReceived({ ...VALID_ZB_ZCL_RECEIVED, wasbroadcast: 2 })).toBe(false);
    expect(isTasmotaZbZCLReceived({ ...VALID_ZB_ZCL_RECEIVED, securityuse: 2 })).toBe(false);
    expect(isTasmotaZbZCLReceived({ ...VALID_ZB_ZCL_RECEIVED, frametype: '1' })).toBe(false);
  });

  it('rejects mistyped hex string fields', () => {
    expect(isTasmotaZbZCLReceived({ ...VALID_ZB_ZCL_RECEIVED, fc: 0x18 })).toBe(false);
    expect(isTasmotaZbZCLReceived({ ...VALID_ZB_ZCL_RECEIVED, cmdid: 10 })).toBe(false);
    expect(isTasmotaZbZCLReceived({ ...VALID_ZB_ZCL_RECEIVED, payload: 0x0a0b00 })).toBe(false);
  });

  it('rejects any other input', () => {
    expect(isTasmotaZbZCLReceived(null)).toBe(false);
    expect(isTasmotaZbZCLReceived('ZbZCLReceived')).toBe(false);
  });
});
