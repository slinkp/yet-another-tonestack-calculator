---
id: opampbandpass
name: Basic Active Bandpass
controls:
  RFB: Linear

description: something

---

;; I would make a dual-ganged pot here if I knew how
R_CRAP IN N_OANONINV 1e6; right

;; NEW FEEDBACK
W_FBLEFTTOC2 N_OAINV N_FBC2L; down
W_FBLEFTTOR N_FBC2L N_FBRL; down
R1 N_FBRL N100 10e5; down
C1 N100 0 11e-10; down


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

W_OUT N_OAOUT OUT; right

W_FBRIGHTTOC2 N_OAOUT N_FBC2R; down
W_FBRIGHTTOR N_FBC2R N_FBRR; down

RFB N_FBRL N_FBRR 100e6 ; right, variable, *
C2 N_FBC2L N_FBC2R 11e-10; right

RL OUT 0 10e5; down
