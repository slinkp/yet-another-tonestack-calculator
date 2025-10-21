---
id: skl0
name: Sallen–Key Low-pass (Butterworth, unity)
controls: {}
---
RIN IN N1 10000; right
R2 N1 N2 10000; right
C2 N2 0 10e-9; down
W1 N1 N3; up, l_=W1
C1 N3 N4 20e-9; right

A4 N4; l_=N4, yoffset=0.5
A5 N5; l_=N5, yoffset=0.5

W3 N4 N_OAINV; down, l_=W3
W4 N5 OUT; down, l_=W4
E OUT 0 opamp N2 N_OAINV; right, mirror, scale=0.5, l_=Opamp

;; Feedback time. Does a resistor fix the math domain error? No it does not. Flailing here.
RFEEDBACK N4 N5 1; right, l=feedback

RL OUT 0 10e5; down
