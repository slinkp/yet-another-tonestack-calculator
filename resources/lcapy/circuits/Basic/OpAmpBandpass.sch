---
id: opampbandpass
name: Basic Active Bandpass
controls:
  RFB: LogA
  RATTEN: Linear

description: Simple tuning of a non-inverting op amp gain stage. At unity gain, frequency response is flat. C2 forms an integrator / shelving lowpass filter, and C1 forms a differentiator / shelving highpass filter. When C2 is small, it\'s a compensation capacitor whose job is to prevent oscillation. If desired, lower values can be used to also reduce treble, eg harshness in high-gain circuits. If C1 is large, it can decouple any op amp bias from ground and remove subsonics. But at high gain, smaller values are often used to also tighten the lows and/or make distortion less fuzzy.

---

W_IN IN N_OANONINV; right

;; NEW FEEDBACK
W_FBLEFTTOC2 N_OAINV N_FBC2L; down
W_FBLEFTTOR N_FBC2L N_FBRL; down

;; HIGHPASS
;; Good demo: 10e3
;; Claw sharpener: 1e3 maybe 2e3
R1 N_FBRL N100 1e3; down

;; claw sharpener default of <= 3/28: 10e-9 (10n)
;; better demo: 470e-9 (470n)
;; Full range:
;; 4700e-9 aka 4.7uF is good for full range? at max boost, flat down to 40hz,
;; and about 3dB down at 30Hz.
;; Or 6800e-9
;; 10uF or 10e-6 would be ~ 2dB down at 20Hz.
C1 N100 0 6800e-9; down

;; Control the highpass shelf??
R88 N100 0 47e3; left

;; Defining opamps in lcapy for simulation is confusing AF for a novice:
;; there's mentions of them scattered in various places,
;; but what you really want for simulation purposes is
;; the opamp section here: https://lcapy.readthedocs.io/en/latest/netlists.html#component-specification
;; The spec format is: Ename Np Nm opamp Nip Nim Ad Ac Ro
;; and note that the value params can be named for readability.
;; And, for reasons I do not understand, in this netlist (but apparently not others in YATS
;; that use op-amps), you cannot use the default output resistance Ro=0
;; nor common-mode gain Ac=0, so we set them very small.
;; Unclear what default Ad (differential or open-loop gain) is, but
;; i'm using "typical" value from TL071 data sheet of 118dB = approx 630,957
E N_OAOUT 0 opamp N_OANONINV N_OAINV Ro=1e-10 Ac=1e-10 Ad=631000; right, scale=0.75

W_FBRIGHTTOC2 N_OAOUT N_FBC2R; down
W_FBRIGHTTOR N_FBC2R N_FBRR; down

R_FB N_FBRL N_FBRR 50e3 ; right, variable

;; LOWPASS in FB loop
;; claw sharpener default as of <= 3/28: 33e-10 aka 3.3nF
;; Demo default 100e-12
C2 N_FBC2L N_FB99 47e-9; right
;; LOWPASS STOP-BAND SHELF CONTROL
R99 N_FB99 N_FBC2R 47e2; right

;; TODO there must be a way to control connection length without extra wires?

W_ATTEN N_OAOUT N_ATTEN; right

RVATTEN N_ATTEN 0 N_ATTENOUT 100e3; down

W_OUT N_ATTENOUT OUT; right

RL OUT 0 10e5; down
