#!/usr/bin/env node
/** 
 * fleet-midi-generator — transformer-based MIDI continuation
 * Takes agent state sequences, generates MIDI completions via music21
 */
const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Find correct Python with music21
function findPython() {
  const candidates = ['python3.10', 'python3.12', 'python3.11', 'python3', 'python'];
  for (const c of candidates) {
    try {
      const r = spawnSync(c, ['-c', 'import music21; print(1)'], {timeout:3000, encoding:'utf8'});
      if (r.stdout.trim() === '1') return c;
    } catch(_) {}
  }
  return 'python3';
}

function generateCompletion(agentStates, bars = 4) {
  const py = findPython();
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
    base = 60
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
out = os.path.join('${__dirname.replace(/'/g, "'\\''")}', '..', 'generated', f'completion-{abs(hash(json.dumps(states)))}.mid')
os.makedirs(os.path.dirname(out), exist_ok=True)
s.write('midi', fp=out)
print(json.dumps({"file": out, "notes": len(list(p1.flat.notes)), "bars": bars}))
`;
  const result = spawnSync(py, ['-c', pyCode, JSON.stringify(agentStates), String(bars)], {
    cwd: __dirname,
    timeout: 15000,
    encoding: 'utf8'
  });
  if (result.error) throw result.error;
  const lines = result.stdout.trim().split('\n').filter(l => l.startsWith('{'));
  if (lines.length === 0) throw new Error(`No JSON output. stderr: ${result.stderr}`);
  return JSON.parse(lines[lines.length - 1]);
}

// CLI mode
const args = process.argv.slice(2);
if (args.length > 0) {
  try {
    const states = JSON.parse(args[0]);
    console.log(JSON.stringify(generateCompletion(states)));
  } catch(e) {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  }
} else {
  console.log("Usage: node generator.js '[[1,0,-1],[0,1,-1]]'");
}

module.exports = { generateCompletion };
