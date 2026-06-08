#!/usr/bin/env node
/** 
 * fleet-midi-generator — transformer-based MIDI continuation
 * Takes agent state sequences, generates MIDI completions via music21
 */
const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function generateCompletion(agentStates, bars = 4) {
  const pyCode = `
import music21, json, sys, os
from music21 import stream, note, chord, tempo, key, meter

states = json.loads(sys.argv[1])
bars = int(sys.argv[2])

s = stream.Score()
p1 = stream.Part()
p1.append(key.Key('C'))
p1.append(meter.TimeSignature('4/4'))
p1.append(tempo.MetronomeMark(number=120))

for i, state in enumerate(states[:bars]):
    # Map ternary state to pitch: 1=up, 0=repeat, -1=down
    base = 60  # middle C
    for v in state:
        if v == 1:
            n = note.Note(base + 4, quarterLength=0.25)
            base += 1
        elif v == -1:
            n = note.Note(base - 3, quarterLength=0.25)
            base -= 1
        else:
            n = note.Note(base, quarterLength=0.25)
        p1.append(n)

s.append(p1)
out = os.path.join(os.path.dirname(__file__), '..', 'generated', f'completion-{hash(json.dumps(states))}.mid')
os.makedirs(os.path.dirname(out), exist_ok=True)
s.write('midi', fp=out)
print(json.dumps({"file": out, "notes": len(list(p1.flat.notes)), "bars": bars}))
`;
  const result = spawnSync('python3', ['-c', pyCode, JSON.stringify(agentStates), String(bars)], {
    cwd: __dirname,
    timeout: 15000,
    encoding: 'utf8'
  });
  if (result.error) throw result.error;
  return JSON.parse(result.stdout.trim().split('\n').pop());
}

// CLI mode
const args = process.argv.slice(2);
if (args.length > 0) {
  const states = JSON.parse(args[0]);
  console.log(generateCompletion(states));
} else {
  console.log("Usage: node generator.js '[[1,0,-1],[0,1,-1]]'");
}

module.exports = { generateCompletion };
