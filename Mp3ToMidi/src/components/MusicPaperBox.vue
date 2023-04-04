// music-paper-box    - 최종 수정 : 23/04/02 18:47 김지용 -

<template>
  <div ref="scoreContainer"/>
</template>

<script>
import axios from 'axios'
import { Midi } from '@tonejs/midi'
import Vex from 'vexflow'

export default {
  name:'MusicPaperBox',
  data() {
    return {
      midiFile: null,
      options: {
        width: 500,
        padding: 20,
      },
    };
  },
  created() {
    axios.get('api/midi/file', { responseType: 'arraybuffer' }) //todo: file지정해야하는데...
      .then(response => {
        this.midiFile = new Midi(response.data)
        this.render();
      })
      .catch(error => {
        console.error(error)
      });
  },
  methods: {
    render() {
      const midiFile = this.midiFile
      const tracks = midiFile.tracks

      // 악보 데이터 생성
      // todo: https://tonejs.github.io/Midi/ https://github.com/Tonejs/Midi 연구필요
      const score = new Midi.Score()
      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i]
        const stave = new Midi.Stave()
        stave.auto_notes = true
        for (let j = 0; j < track.notes.length; j++) {
          const note = track.notes[j];
          stave.addNote({
            keys: [`${note.name}/${note.octave}`],
            duration: note.duration,
            time: note.time,
          });
        }
        score.addStave(stave)
      }

      // VexFlow 악보 렌더링
      const renderer = new Vex.Flow.Renderer(this.$refs.scoreContainer, Vex.Flow.Renderer.Backends.SVG)
      const context = renderer.getContext()
      const vexflowScore = new Vex.Flow.EasyScore()
      const voice = vexflowScore.voice(vexflowScore.notes(score.tracks[0].notes))
      const stave = new Vex.Flow.Stave(
        this.options.padding,
        this.options.padding,
        this.options.width - this.options.padding * 2
      );
      stave.setContext(context).draw()
      voice.draw(context, stave)
    },
  },
}
</script>
