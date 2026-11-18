import { describe, expect, it } from 'vitest';
import { parseTasmotaLoggingAsTasmotaZbZCLReceivedLogging } from './parse-tasmota-logging-as-tasmota-zb-zcl-received-logging.ts';

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

describe('parseTasmotaLoggingAsTasmotaZbZCLReceivedLogging', () => {
  it('extracts the received frame from a ZIG log line', () => {
    expect(
      parseTasmotaLoggingAsTasmotaZbZCLReceivedLogging({
        code: 'ZIG',
        message: JSON.stringify({ ZbZCLReceived: VALID_ZB_ZCL_RECEIVED }),
      }),
    ).toEqual({ ZbZCLReceived: VALID_ZB_ZCL_RECEIVED });
  });

  it('returns null for another code', () => {
    expect(
      parseTasmotaLoggingAsTasmotaZbZCLReceivedLogging({
        code: 'MQT',
        message: JSON.stringify({ ZbZCLReceived: VALID_ZB_ZCL_RECEIVED }),
      }),
    ).toBeNull();
  });

  it('returns null for a malformed message', () => {
    expect(
      parseTasmotaLoggingAsTasmotaZbZCLReceivedLogging({ code: 'ZIG', message: 'not json' }),
    ).toBeNull();
  });

  it('returns null for an unexpected JSON payload', () => {
    expect(
      parseTasmotaLoggingAsTasmotaZbZCLReceivedLogging({
        code: 'ZIG',
        message: '{"ZbSend":"Done"}',
      }),
    ).toBeNull();
  });
});
