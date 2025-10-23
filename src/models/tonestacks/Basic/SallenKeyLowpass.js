import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class SallenKeyLowpass extends BaseTonestack {
  static definition() {
    return {
      id: 'skl0',
      name: 'Sallen–Key Low-pass (Butterworth, unity)',
      description: 'RFREQ1 and RFREQ2 are typically one dual-ganged pot. For butterworth response (12dB/octave and no resonant peak), set C1 to twice C2. For higher Q, increase that ratio.',
      schematic: 'SallenKeyLowpass',
      components: {
        RFREQ1: 500e3,
        RFREQ2: 500e3,
        RL: 1e6,
        C1: 4.3e-9,
        C2: 2.2e-9,
        E: 631e3,
        E_Ac: 100e-12,
        E_Ro: 100e-12,
      },
      controls: {
        RFREQ1: {
          taper: Tapers.LogC,
          role: PotRole.VR,
          reverse: true,
        },
        RFREQ2: {
          taper: Tapers.LogC,
          role: PotRole.VR,
          reverse: true,
        },
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { RFREQ1, RFREQ2, RL, C1, C2, E, E_Ac, E_Ro } = this.extractCoefficientVariables(controlValues);

    const b0 = 2*E*RL + E_Ac*RL;
    const b1 = 2*C1*E_Ro*RL;
    const b2 = 2*C1*C2*E_Ro*RFREQ2*RL;

    const a0 = 2*E*RL - E_Ac*RL + 2*E_Ro + 2*RL;
    const a1 = -2*C1*E_Ac*RFREQ1*RL + 2*C1*E_Ro*RFREQ1 + 2*C1*E_Ro*RL + 2*C1*RFREQ1*RL + 2*C2*E*RFREQ1*RL + 2*C2*E*RFREQ2*RL - C2*E_Ac*RFREQ1*RL - C2*E_Ac*RFREQ2*RL + 2*C2*E_Ro*RFREQ1 + 2*C2*E_Ro*RFREQ2 + 2*C2*RFREQ1*RL + 2*C2*RFREQ2*RL;
    const a2 = 2*C1*C2*E*RFREQ1*RFREQ2*RL - C1*C2*E_Ac*RFREQ1*RFREQ2*RL + 2*C1*C2*E_Ro*RFREQ1*RFREQ2 + 2*C1*C2*E_Ro*RFREQ1*RL + 2*C1*C2*E_Ro*RFREQ2*RL + 2*C1*C2*RFREQ1*RFREQ2*RL;

    return [
      [b0, b1, b2],
      [a0, a1, a2]
    ];
  }
}