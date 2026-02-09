import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class Canarat2000 extends BaseTonestack {
  static definition() {
    return {
      id: 'Canarat2000',
      name: 'Canarat (mystery mod circa 2000)',
      description: 'what was this even supposed to be?',
      schematic: 'Canarat2000',
      components: {
        R13: 10e3,
        R7: 10e3,
        RT: 100e3,
        RL: 1e6,
        C14: 10e-9,
        C8: 3.3e-9,
        C9: 22e-9,
      },
      controls: {
        RT: {
          taper: Tapers.LogA,
          role: PotRole.VR,
          reverse: true,
        },
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { R13, R7, RT, RL, C14, C8, C9 } = this.extractCoefficientVariables(controlValues);

    const b0 = 0;
    const b1 = C9*RL;
    const b2 = C14*C9*R13*RL + C14*C9*R7*RL + C14*C9*RL*RT;
    const b3 = C14*C8*C9*R13*R7*RL;

    const a0 = 1;
    const a1 = C14*R13 + C14*R7 + C14*RT + C8*R7 + C9*R13 + C9*R7 + C9*RL;
    const a2 = C14*C8*R13*R7 + C14*C8*R7*RT + C14*C9*R13*RL + C14*C9*R13*RT + C14*C9*R7*RL + C14*C9*R7*RT + C14*C9*RL*RT + C8*C9*R13*R7 + C8*C9*R7*RL;
    const a3 = C14*C8*C9*R13*R7*RL + C14*C8*C9*R13*R7*RT + C14*C8*C9*R7*RL*RT;

    return [
      [b0, b1, b2, b3],
      [a0, a1, a2, a3]
    ];
  }
}