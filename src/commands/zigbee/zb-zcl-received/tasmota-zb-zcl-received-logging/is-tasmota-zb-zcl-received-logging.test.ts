import { describe, expect, it } from 'vitest';
import { isTasmotaZbZCLReceivedLogging } from './is-tasmota-zb-zcl-received-logging.ts';

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

describe('isTasmotaZbZCLReceivedLogging', () => {
  it('accepts a ZbZCLReceived logging message', () => {
    expect(isTasmotaZbZCLReceivedLogging({ ZbZCLReceived: VALID_ZB_ZCL_RECEIVED })).toBe(true);
  });

  it('rejects a message with a missing or invalid ZbZCLReceived', () => {
    expect(isTasmotaZbZCLReceivedLogging({})).toBe(false);
    expect(isTasmotaZbZCLReceivedLogging({ ZbZCLReceived: null })).toBe(false);
    expect(isTasmotaZbZCLReceivedLogging({ ZbZCLReceived: 'frame' })).toBe(false);
  });

  it('rejects any other input', () => {
    expect(isTasmotaZbZCLReceivedLogging(null)).toBe(false);
    expect(isTasmotaZbZCLReceivedLogging('ZbZCLReceived')).toBe(false);
    expect(isTasmotaZbZCLReceivedLogging({ ZbSend: 'Done' })).toBe(false);
  });
});
