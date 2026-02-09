---
id: Canarat95
name: Canarat (1995 index card circuit, revised 2026)
controls:
  RT: Linear

description: Maybe this was the original 1995 mod topology! Unlikely these were the values though. I recall there being a parallel path for the highs somewhere in the circuit, and going in parallal with the two resistors rings a bell - and works. Increasing C9 deepens the mid scoop and lowers the freq, decreasing C9 flattens and raises the freq. Increasing C99 flattens the mid scoop and lowers the freq, decreasing deepens the scoop and raises the freq. Reducing RT (eg to 25k or lower) boosts overall volume but especially the treble.

---

;; In my original schematic,
;; C13 was a redundant coupling cap of 10nf.
;; I found that cut too much lows and should just be omitted.
;; I've re-used the name C13 here for the parallel treble cap.

R_T IN 5 50e3; right, variable, *
R9 5 3 10e3; right
C9 3 0 27e-9; down
R12 3 4 10e3; right

W1 5 6; up
C13 6 7 11e-9; right
W2 7 4; down

;; Added this to reduce "fizz", adjust to taste.
C14 4 0 3.3e-9; down

;; C10 is just the existing coupling cap to the output buffer,
;; we can ignore it for tone shaping purposes - it has marginal rolloff at 10Hz
;; C10 4 OUT 22e-9; right
WOUT 4 OUT; right
RL OUT 0 1e6; down
