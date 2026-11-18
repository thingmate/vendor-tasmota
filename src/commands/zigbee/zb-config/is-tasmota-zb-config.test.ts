import { describe, expect, it } from 'vitest';
import { isTasmotaZbConfig } from './is-tasmota-zb-config.ts';

describe('isTasmotaZbConfig', () => {
  it('accepts a valid Zigbee configuration', () => {
    expect(
      isTasmotaZbConfig({
        Channel: 11,
        PanID: '0x1A63',
        ExtPanID: '0x0123456789ABCDEF',
        KeyL: '0x0F0D0B0907050301',
        KeyH: '0x0D0C0A0806040200',
        TxRadio: 20,
      }),
    ).toBe(true);
  });

  it('rejects a non-object input', () => {
    expect(isTasmotaZbConfig(null)).toBe(false);
    expect(isTasmotaZbConfig('ZbConfig')).toBe(false);
  });

  it('rejects an out-of-range channel', () => {
    expect(
      isTasmotaZbConfig({
        Channel: 10,
        PanID: '0x1A63',
        ExtPanID: '0x0123456789ABCDEF',
        KeyL: '0x0F0D0B0907050301',
        KeyH: '0x0D0C0A0806040200',
        TxRadio: 20,
      }),
    ).toBe(false);
    expect(
      isTasmotaZbConfig({
        Channel: 27,
        PanID: '0x1A63',
        ExtPanID: '0x0123456789ABCDEF',
        KeyL: '0x0F0D0B0907050301',
        KeyH: '0x0D0C0A0806040200',
        TxRadio: 20,
      }),
    ).toBe(false);
  });

  it('rejects a misformatted PAN id', () => {
    const base = {
      Channel: 11,
      ExtPanID: '0x0123456789ABCDEF',
      KeyL: '0x0F0D0B0907050301',
      KeyH: '0x0D0C0A0806040200',
      TxRadio: 20,
    };
    expect(isTasmotaZbConfig({ ...base, PanID: '0x1a63' })).toBe(false); // lowercase
    expect(isTasmotaZbConfig({ ...base, PanID: '1A63' })).toBe(false); // no `0x` prefix
    expect(isTasmotaZbConfig({ ...base, PanID: '0x1A6' })).toBe(false); // wrong digit count
  });

  it('rejects a misformatted extended PAN id', () => {
    expect(
      isTasmotaZbConfig({
        Channel: 11,
        PanID: '0x1A63',
        ExtPanID: '0x0123456789ABC',
        KeyL: '0x0F0D0B0907050301',
        KeyH: '0x0D0C0A0806040200',
        TxRadio: 20,
      }),
    ).toBe(false);
  });

  it('rejects a misformatted network key', () => {
    expect(
      isTasmotaZbConfig({
        Channel: 11,
        PanID: '0x1A63',
        ExtPanID: '0x0123456789ABCDEF',
        KeyL: '0x0F0D0B090705030G',
        KeyH: '0x0D0C0A0806040200',
        TxRadio: 20,
      }),
    ).toBe(false);
  });

  it('rejects an out-of-range transmit power', () => {
    expect(
      isTasmotaZbConfig({
        Channel: 11,
        PanID: '0x1A63',
        ExtPanID: '0x0123456789ABCDEF',
        KeyL: '0x0F0D0B0907050301',
        KeyH: '0x0D0C0A0806040200',
        TxRadio: 0,
      }),
    ).toBe(false);
  });
});
