import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class OpAmpBandpass extends BaseTonestack {
  static definition() {
    return {
      id: 'opampbandpass',
      name: 'Basic Active Bandpass',
      description: 'Simple tuning of a non-inverting op amp gain stage. At unity gain, frequency response is flat. C2 forms an integrator / shelving lowpass filter, and C1 forms a differentiator / shelving highpass filter. When C2 is small, it\'s a compensation capacitor whose job is to prevent oscillation. If desired, lower values can be used to also reduce treble, eg harshness in high-gain circuits. If C1 is large, it can decouple any op amp bias from ground and remove subsonics. But at high gain, smaller values are often used to also tighten the lows and/or make distortion less fuzzy.',
      schematic: 'OpAmpBandpass',
      components: {
        R1: 10e3,
        RFB: 50e3,
        RL: 1e6,
        C1: 47e-9,
        C2: 100e-12,
        E: 631e3,
        E_Ac: 100e-12,
        E_Ro: 100e-12,
      },
      controls: {
        RFB: {
          taper: Tapers.Linear,
          role: PotRole.VR,
        },
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { R1, RFB, RL, C1, C2, E, E_Ac, E_Ro } = this.extractCoefficientVariables(controlValues);

    const b0 = 2*E*RL + E_Ac*RL;
    const b1 = 2*C1*E*R1*RL + 2*C1*E*RFB*RL + C1*E_Ac*R1*RL + C1*E_Ac*RFB*RL + 2*C2*E*RFB*RL + C2*E_Ac*RFB*RL;
    const b2 = 2*C1*C2*E*R1*RFB*RL + C1*C2*E_Ac*R1*RFB*RL;

    const a0 = 2*E*RL - E_Ac*RL + 2*E_Ro + 2*RL;
    const a1 = 2*C1*E*R1*RL - C1*E_Ac*R1*RL + 2*C1*E_Ro*R1 + 2*C1*E_Ro*RFB + 2*C1*E_Ro*RL + 2*C1*R1*RL + 2*C1*RFB*RL + 2*C2*E*RFB*RL - C2*E_Ac*RFB*RL + 2*C2*E_Ro*RFB + 2*C2*RFB*RL;
    const a2 = 2*C1*C2*E*R1*RFB*RL - C1*C2*E_Ac*R1*RFB*RL + 2*C1*C2*E_Ro*R1*RFB + 2*C1*C2*E_Ro*RFB*RL + 2*C1*C2*R1*RFB*RL;

    return [
      [b0, b1, b2],
      [a0, a1, a2]
    ];
  }
}