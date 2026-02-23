import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class Canarat95 extends BaseTonestack {
  static definition() {
    return {
      id: 'Canarat95',
      name: 'Canarat (1995, revised 2026)',
      description: 'Maybe this was the original 1995 mod topology! Unlikely these were the values though. The cap in parallal with the two resistors rings a bell - and works. Increasing C9 deepens the mid scoop and lowers the freq, decreasing C9 flattens and raises the freq. Increasing C13 flattens the mid scoop and lowers the freq, decreasing deepens the scoop and raises the freq. Reducing RT (eg to 25k or lower) boosts overall volume but especially the treble.',
      schematic: 'Canarat95',
      components: {
        R12: 10e3,
        R9: 10e3,
        RT: 100e3,
        RL: 1e6,
        C13: 47e-9,
        C14: 1e-9,
        C9: 10e-9,
      },
      controls: {
        RT: {
          taper: Tapers.LogC,
          role: PotRole.VR,
          reverse: true,
        },
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { R12, R9, RT, RL, C13, C14, C9 } = this.extractCoefficientVariables(controlValues);

    const b0 = RL;
    const b1 = C13*R12*RL + C13*R9*RL;
    const b2 = C13*C9*R12*R9*RL;

    const a0 = R12 + R9 + RL + RT;
    const a1 = C13*R12*RL + C13*R12*RT + C13*R9*RL + C13*R9*RT + C14*R12*RL + C14*R9*RL + C14*RL*RT + C9*R12*R9 + C9*R12*RT + C9*R9*RL + C9*RL*RT;
    const a2 = C13*C14*R12*RL*RT + C13*C14*R9*RL*RT + C13*C9*R12*R9*RL + C13*C9*R12*R9*RT + C13*C9*R12*RL*RT + C13*C9*R9*RL*RT + C14*C9*R12*R9*RL + C14*C9*R12*RL*RT;
    const a3 = C13*C14*C9*R12*R9*RL*RT;

    return [
      [b0, b1, b2],
      [a0, a1, a2, a3]
    ];
  }
}