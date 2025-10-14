---
id: skl0
name: Sallen–Key Low-pass (Butterworth, unity)
controls: {}
---
RIN IN N 10000; right
R2 N OUT 10000; right
C1 N 0 20e-9; down
C2 OUT 0 10e-9; down
RL OUT 0 100e3; down
W N OA1P; right
E1 OA1O 0 opamp OA1P OA1N; right=0.6, scale=0.6, l=OA1
W OA1O OUT; right=0.1
W OA1O OA1O_; down=0.4
W OA1O_ OA1N_; left
W OA1N_ OA1N; up=0.4
