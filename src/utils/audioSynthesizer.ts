/**
 * Web Audio API procedural sound synthesizer for realistic mechanical printer effects:
 * - Stepper motor whirring
 * - Paper slide / sheet ejection whoosh
 * - Mechanical printhead clicks & carriage return
 * 100% self-contained, zero external network assets.
 */

class PrinterAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private noiseBuffer: AudioBuffer | null = null;
  private lastPlayTime: number = 0;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.createNoiseBuffer();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private createNoiseBuffer() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.5; // 0.5 seconds of noise
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    this.noiseBuffer = buffer;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Sound of a paper sheet being pushed through the rollers and dropping onto the stack
   */
  public playPaperEject(speedMultiplier: number = 1) {
    if (this.isMuted) return;
    const now = Date.now();
    // Throttle sound triggers when printing at hyper speeds
    const throttle = Math.max(70, 280 / Math.sqrt(speedMultiplier));
    if (now - this.lastPlayTime < throttle) return;
    this.lastPlayTime = now;

    try {
      this.initContext();
      if (!this.ctx || !this.noiseBuffer) return;

      const t = this.ctx.currentTime;

      // 1. Paper sliding whoosh (filtered white noise)
      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = this.noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, t);
      filter.frequency.exponentialRampToValueAtTime(600, t + 0.12);
      filter.Q.setValueAtTime(2.5, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noiseSource.start(t);
      noiseSource.stop(t + 0.15);

      // 2. Stepper motor / roller click
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(70, t + 0.06);

      oscGain.gain.setValueAtTime(0.08, t);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.07);
    } catch {
      // Audio autoplay policy catch
    }
  }

  /**
   * Mechanical button click
   */
  public playButtonClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(220, t + 0.04);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.05);
    } catch {
      // safe fallback
    }
  }

  /**
   * Fanfare chime when a milestone is reached
   */
  public playMilestoneChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      chord.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.06);
        gain.gain.setValueAtTime(0.1, t + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 0.5);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t + idx * 0.06);
        osc.stop(t + idx * 0.06 + 0.6);
      });
    } catch {
      // safe fallback
    }
  }
}

export const printerAudio = new PrinterAudioEngine();
