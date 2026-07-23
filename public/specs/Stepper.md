# Stepper — implementation specification

Status: ready

Figma: [Stepper section](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=4023-1475&t=2b3pGoo58LPx32e2-4).

The Stepper uses the Figma `Filled` and `Outline` treatments in `Medium` and `Large` sizes. Its component states are `Add`, `Added- Text`, and `Added- Number`; every frame includes the 11px `Customise` helper row. Quantity `0` defaults to Add; a positive quantity defaults to Added- Number. Out-of-stock disables all actions.
