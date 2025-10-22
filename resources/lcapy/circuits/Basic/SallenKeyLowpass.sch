---
id: skl0
name: Sallen–Key Low-pass (Butterworth, unity)
controls: {}
---
RIN IN N1 10000; right
R2 N1 N_OANONINV 10000; right
C2 N_OANONINV 0 10e-9; down
W1 N1 N3; up
C1 N3 N4 20e-9; right

;; For debug only
;A4 N4; l_=N4, yoffset=0.5
;A5 N5; l_=N5, yoffset=0.5

W3 N4 N_OAINV; down
W4 N5 OUT; down

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
E OUT 0 opamp N_OANONINV N_OAINV Ro=1e-10 Ac=1e-10 Ad=631000; right, mirror, scale=0.5

;; Feedback time. Does a resistor fix the math domain error? No it does not. Flailing here.
WFEEDBACK N4 N5 ; right

RL OUT 0 10e5; down
