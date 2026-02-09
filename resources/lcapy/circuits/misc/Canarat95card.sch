---
id: Canarat95card
name: Canarat (1995 as per index card)
controls:
  RT: LogA

description: Circuit as drawn on the incorrect index card.

---

;; In my original schematic,
;; C13 was a redundant coupling cap of 10nf.
;; I found that cut too much lows and should just be omitted.
;; I've re-used the name C13 here for the parallel treble cap.

C13 IN 1 10e-9; right
R_T 1 3 100e3; right, variable, *
R9 3 4 10e3; right
C9 4 0 22e-9; down
R12 4 5 10e3; right
;; C10 is just the existing coupling cap to the output buffer,
;; probably ignorable
C10 5 OUT 22e-9; right
RL OUT 0 1e6; down
