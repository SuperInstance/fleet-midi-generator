# fleet-midi-generator 🧠

> *Transformer-based music generation from agent state tokens*

Trains and serves local symbolic music transformers. Every agent state is a token in the sequence. Based on midigenai reference architecture.

## Architecture

```
agent state sequence → transformer → MIDI continuation → I2I bottle
```

## Related
- [fleet-midi-tokenizer](https://github.com/SuperInstance/fleet-midi-tokenizer)
- [fleet-midi-text2midi](https://github.com/SuperInstance/fleet-midi-text2midi)
