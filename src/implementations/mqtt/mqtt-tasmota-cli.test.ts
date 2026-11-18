import { AsyncFunction } from '@xstd/async-function';
import { ListenerResource } from '@xstd/listener-resource';
import type {
  HavingMqttResourceAbilities,
  MqttPublishPacket,
  MqttResourcePublishArguments,
  MqttResourcePublishPayload,
  MqttResourceSubscribeArguments,
} from '@xstd/mqtt-resource';
import { ObservableAsyncFunction } from '@xstd/observable-async-function';
import { describe, expect, it } from 'vitest';
import { MqttTasmotaCli } from './mqtt-tasmota-cli.ts';

interface RecordedPublication {
  readonly topic: string;
  readonly payload: MqttResourcePublishPayload;
}

interface MqttStub {
  readonly mqtt: Pick<HavingMqttResourceAbilities, 'publish' | 'subscribe'>;
  readonly publications: RecordedPublication[];
  readonly subscribedTopics: string[];
  getEmitPacket(): ((packet: MqttPublishPacket) => void) | undefined;
}

function createMqttStub(): MqttStub {
  const publications: RecordedPublication[] = [];
  const subscribedTopics: string[] = [];
  let emitPacket: ((packet: MqttPublishPacket) => void) | undefined;

  return {
    publications,
    subscribedTopics,
    getEmitPacket: () => emitPacket,
    mqtt: {
      publish: new AsyncFunction<MqttResourcePublishArguments, void>(
        async (
          _signal: AbortSignal,
          topic: string,
          payload: MqttResourcePublishPayload,
        ): Promise<void> => {
          publications.push({ topic, payload });
        },
      ),
      subscribe: new ObservableAsyncFunction<MqttPublishPacket, MqttResourceSubscribeArguments>(
        async (
          _signal: AbortSignal,
          topic: string,
        ): Promise<ListenerResource<MqttPublishPacket>> => {
          subscribedTopics.push(topic);
          return new ListenerResource<MqttPublishPacket>(
            (emit: (packet: MqttPublishPacket) => void): void => {
              emitPacket = emit;
            },
          );
        },
      ),
    },
  };
}

describe('MqttTasmotaCli', () => {
  it('publishes the payload to cmnd/<deviceId>/json', async () => {
    const { mqtt, publications } = createMqttStub();
    const cli = new MqttTasmotaCli({ mqtt, deviceId: 'mydevice' });

    const payload = '{"ZbSend":{"Device":"0x1234","Send":{"Power":1}}}';
    await cli.send.call(new AbortController().signal, payload);

    expect(publications).toEqual([{ topic: 'cmnd/mydevice/json', payload }]);
  });

  it('observes the log lines published to stat/<deviceId>/LOGGING, decoded as strings', async () => {
    const { mqtt, subscribedTopics, getEmitPacket } = createMqttStub();
    const cli = new MqttTasmotaCli({ mqtt, deviceId: 'mydevice' });

    const controller: AbortController = new AbortController();
    const linePromise = cli.observe.first(controller.signal);

    // let the subscription establish: the establishment chain only involves microtasks
    await new Promise((resolve: (value: undefined) => void) => setTimeout(resolve, 0));

    expect(subscribedTopics).toEqual(['stat/mydevice/LOGGING']);

    getEmitPacket()!({
      topic: 'stat/mydevice/LOGGING',
      payload: new TextEncoder().encode(
        '12:34:56.789 MQT: stat/mydevice/RESULT = {"ZbSend":"Done"}',
      ),
      qos: 0,
      retain: false,
    });

    const [line]: readonly [string] = await linePromise;
    expect(line).toBe('12:34:56.789 MQT: stat/mydevice/RESULT = {"ZbSend":"Done"}');
  });
});
