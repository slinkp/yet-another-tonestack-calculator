import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class Canarat95 extends BaseTonestack {
  static definition() {
    return {
      id: 'Canarat95',
      name: 'Canarat (1995 index card circuit)',
      description: 'what was I thinking?',
      schematic: 'Canarat95',
      components: {
        R12: 10e3,
        R9: 10e3,
        RT: 100e3,
        RL: 1e6,
        C10: 22e-9,
        C13: 10e-9,
        C9: 22e-9,
        C99: 1e-9,
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
    const { R12, R9, RT, RL, C10, C13, C9, C99 } = this.extractCoefficientVariables(controlValues);

    const b0 = 0;
    const b1 = C10*C13*RL;
    const b2 = C10*C13*C99*RL*RT;

    const a0 = C10 + C13 + C9;
    const a1 = C10*C13*R12 + C10*C13*R9 + C10*C13*RL + C10*C13*RT + C10*C9*R12 + C10*C9*RL + C10*C99*RT + C13*C9*R9 + C13*C9*RT + C13*C99*RT + C9*C99*RT;
    const a2 = C10*C13*C9*R12*R9 + C10*C13*C9*R12*RT + C10*C13*C9*R9*RL + C10*C13*C9*RL*RT + C10*C13*C99*R12*RT + C10*C13*C99*R9*RT + C10*C13*C99*RL*RT + C10*C9*C99*R12*RT + C10*C9*C99*RL*RT + C13*C9*C99*R9*RT;
    const a3 = C10*C13*C9*C99*R12*R9*RT + C10*C13*C9*C99*R9*RL*RT;

    return [
      [b0, b1, b2],
      [a0, a1, a2, a3]
    ];
  }
}