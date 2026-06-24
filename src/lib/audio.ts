/**
 * Web Audio API Engine for the Digital Invitation
 * Synthesizes realistic interaction sound effects and traditional ambient drone
 * without external asset dependencies, ensuring 100% reliable offline operation.
 */

let audioCtx: AudioContext | null = null;
let tanpuraInterval: NodeJS.Timeout | null = null;
let tanpuraNodes: { oscillators: OscillatorNode[]; gainNode: GainNode }[] = [];
let pianoInterval: NodeJS.Timeout | null = null;
let bgAudio: HTMLAudioElement | null = null;
let isTanpuraRunning = false;
let isPianoRunning = false;

// Initialize Audio Context lazily on user interaction
export function isAudioSupported() {
  if (typeof window === 'undefined') return false;

  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  return typeof AudioContextClass !== 'undefined';
}

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }

  if (!audioCtx) {
    try {
      audioCtx = new AudioContextClass();
    } catch {
      return null;
    }
  }

  if (audioCtx.state === 'suspended') {
    void audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a realistic wax seal cracking/crunching sound
 */
export function playSealCrack() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. High frequency crackle (noise)
    const bufferSize = ctx.sampleRate * 0.12; // 0.12 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1200, now);
    noiseFilter.Q.setValueAtTime(3, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // 2. Low-frequency impact thump
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.6, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    // Start both
    noiseNode.start(now);
    osc.start(now);

    noiseNode.stop(now + 0.2);
    osc.stop(now + 0.2);
  } catch (error) {
    console.error('Failed to play seal crack sound:', error);
  }
}

/**
 * Play a magical, shimmering gold dust chime arpeggio
 */
export function playGoldDustChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // We will play a cascading series of 6 bell tones
    const freqs = [987.77, 1174.66, 1318.51, 1567.98, 1975.53, 2349.32]; // B5, D6, E6, G6, B6, D7 (Pentatonic shimmer)
    
    freqs.forEach((freq, idx) => {
      const toneTime = now + idx * 0.05; // 50ms delay between notes
      
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, toneTime);
      
      // Add a subtle frequency modulation for bell-like vibrato
      const mod = ctx.createOscillator();
      mod.type = 'sine';
      mod.frequency.setValueAtTime(12, toneTime); // 12Hz vibrato
      const modGain = ctx.createGain();
      modGain.gain.setValueAtTime(5, toneTime); // Pitch variance of 5Hz
      
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, toneTime);
      gainNode.gain.linearRampToValueAtTime(0.15, toneTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, toneTime + 0.6); // Ring out for 600ms

      mod.connect(modGain);
      modGain.connect(osc.frequency);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      mod.start(toneTime);
      osc.start(toneTime);
      
      mod.stop(toneTime + 0.8);
      osc.stop(toneTime + 0.8);
    });
  } catch (error) {
    console.error('Failed to play chime sound:', error);
  }
}

/**
 * Pluck a single synthetic Tanpura string
 */
function pluckTanpuraString(freq: number, startTime: number, volume: number) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    // Main tone (sawtooth with rich harmonics, low pass filtered)
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, startTime);
    // Subtle detuning to create that chorus beating texture
    osc.detune.setValueAtTime((Math.random() * 2 - 1) * 6, startTime);

    // Sub oscillator for deep drone body
    const subOsc = ctx.createOscillator();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq / 2, startTime);
    subOsc.detune.setValueAtTime((Math.random() * 2 - 1) * 3, startTime);

    // Pluck filter envelope (starts bright, filters out high frequencies slowly)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, startTime);
    filter.frequency.exponentialRampToValueAtTime(150, startTime + 2.5);
    filter.Q.setValueAtTime(1.5, startTime);

    // Gain envelope (exponential decay over 3.5 seconds)
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(volume * 0.12, startTime + 0.05); // quick attack
    gainNode.gain.exponentialRampToValueAtTime(volume * 0.02, startTime + 1.2);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + 3.8); // slow decay

    // Connect
    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(startTime);
    subOsc.start(startTime);
    
    osc.stop(startTime + 4.0);
    subOsc.stop(startTime + 4.0);

    // Save references to stop immediately if needed
    tanpuraNodes.push({ oscillators: [osc, subOsc], gainNode });
  } catch (e) {
    console.error('Error plucking Tanpura string:', e);
  }
}

/**
 * Starts a realistic synthesized Tanpura loop.
 * Plays the traditional 4-string pattern: Pa - Sa - Sa - Sa (fifth, octave, octave, root)
 * Example in C scale: G3 - C4 - C4 - C3
 */
export function startTanpuraDrone() {
  if (isTanpuraRunning || !isAudioSupported()) return;
  isTanpuraRunning = true;
  
  try {
    const ctx = getAudioContext();
    if (!ctx) {
      isTanpuraRunning = false;
      return;
    }
    
    const rootFreq = 130.81; // C3
    const fifthFreq = 196.00; // G3
    const octaveFreq = 261.63; // C4

    const playPattern = () => {
      const now = ctx.currentTime;
      // String pluck order with spacing of 1.0 second between plucks
      pluckTanpuraString(fifthFreq, now, 0.9);         // Pa (G3) at 0s
      pluckTanpuraString(octaveFreq, now + 1.0, 0.75); // Sa (C4) at 1s
      pluckTanpuraString(octaveFreq, now + 2.0, 0.75); // Sa (C4) at 2s
      pluckTanpuraString(rootFreq, now + 3.0, 1.0);    // Sa (C3) at 3s
    };

    // Initial play
    playPattern();

    // Loop pattern every 4.5 seconds to overlay strings nicely
    tanpuraInterval = setInterval(playPattern, 4500);
  } catch (error) {
    console.error('Failed to start Tanpura drone:', error);
  }
}

/**
 * Stops the synthesized Tanpura drone
 */
export function stopTanpuraDrone() {
  isTanpuraRunning = false;
  if (tanpuraInterval) {
    clearInterval(tanpuraInterval);
    tanpuraInterval = null;
  }
  
  tanpuraNodes.forEach(({ oscillators, gainNode }) => {
    try {
      oscillators.forEach(osc => osc.disconnect());
      gainNode.disconnect();
    } catch (e) {}
  });
  tanpuraNodes = [];
}

/**
 * Starts a gentle piano-style background loop for a calm, peaceful atmosphere.
 */
export function startGentlePianoBackground() {
  if (isPianoRunning || !isAudioSupported()) return;
  isPianoRunning = true;

  try {
    const ctx = getAudioContext();
    if (!ctx) {
      isPianoRunning = false;
      return;
    }
    const notes = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63];

    const playPattern = () => {
      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.18);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.0001, now + idx * 0.18);
        gainNode.gain.linearRampToValueAtTime(0.025, now + idx * 0.18 + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.18 + 0.55);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now + idx * 0.18);
        osc.stop(now + idx * 0.18 + 0.6);
      });
    };

    playPattern();
    pianoInterval = setInterval(playPattern, 3800);
  } catch (error) {
    console.error('Failed to start gentle piano background:', error);
  }
}

/**
 * Stops the gentle piano background loop.
 */
export function stopGentlePianoBackground() {
  isPianoRunning = false;
  if (pianoInterval) {
    clearInterval(pianoInterval);
    pianoInterval = null;
  }
}

/**
 * Start background music (MP3 stream) with a gentle piano fallback.
 */
export function startBackgroundMusic(url: string = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3') {
  if (typeof window === 'undefined' || !isAudioSupported()) return;

  // Stop any existing background music first
  stopBackgroundMusic();

  // Users can put their own `bg-music.mp3` in the `public/audio/` directory.
  const sourceUrl = '/audio/bg-music.mp3';

  bgAudio = new Audio();
  bgAudio.src = sourceUrl;
  bgAudio.loop = true;
  bgAudio.volume = 0.25;

  const playPromise = bgAudio.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log('Background MP3 music started successfully.');
      })
      .catch((error) => {
        console.warn('Custom MP3 failed to load or play. Falling back to a gentle piano loop.', error);
        startGentlePianoBackground();
      });
  }

  bgAudio.addEventListener('error', () => {
    console.warn('Local background MP3 not found. Falling back to a gentle piano loop.');
    if (url && url !== sourceUrl) {
      if (bgAudio) {
        bgAudio.src = url;
        bgAudio.play().catch(() => {
          startGentlePianoBackground();
        });
      }
    } else {
      startGentlePianoBackground();
    }
  });
}

/**
 * Stop all background music and ambient loops.
 */
export function stopBackgroundMusic() {
  if (bgAudio) {
    try {
      bgAudio.pause();
      bgAudio = null;
    } catch (e) {}
  }
  stopGentlePianoBackground();
  stopTanpuraDrone();
}
