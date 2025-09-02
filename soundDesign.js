

// button //
export function activateButtonSound() {

    if (typeof audioCtx === 'undefined') {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        window.audioCtx = new AudioContext();
    }
    
    if (window.audioCtx) {
        const oscillator = window.audioCtx.createOscillator();
        const gainNode = window.audioCtx.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(200, window.audioCtx.currentTime);
        oscillator.frequency.setValueAtTime(150, window.audioCtx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, window.audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioCtx.currentTime + 0.2);
        
        oscillator.connect(gainNode);
        gainNode.connect(window.audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(window.audioCtx.currentTime + 0.2);
    }
}


// snake moving audiosound
export function snakeMovingAudiosound() {

    if (typeof audioCtx === 'undefined') {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          window.audioCtx = new AudioContext();
        }
        
        if (window.audioCtx) {
          const oscillator = window.audioCtx.createOscillator();
          const gainNode = window.audioCtx.createGain();
          
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(100, window.audioCtx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(300, window.audioCtx.currentTime + 0.1);
          
          gainNode.gain.setValueAtTime(0.05, window.audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioCtx.currentTime + 0.1);
          
          oscillator.connect(gainNode);
          gainNode.connect(window.audioCtx.destination);
          
          oscillator.start();
          oscillator.stop(window.audioCtx.currentTime + 0.1);
    }
}


// snake eating audiosound
export function snakeEatingAudiosound() {

    if (typeof audioCtx === 'undefined') {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          window.audioCtx = new AudioContext();
        }
        
        if (window.audioCtx) {
          const oscillator = window.audioCtx.createOscillator();
          const gainNode = window.audioCtx.createGain();
          
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(500, window.audioCtx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(700, window.audioCtx.currentTime + 0.1);
          
          gainNode.gain.setValueAtTime(0.01, window.audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioCtx.currentTime + 0.1);
          
          oscillator.connect(gainNode);
          gainNode.connect(window.audioCtx.destination);
          
          oscillator.start();
          oscillator.stop(window.audioCtx.currentTime + 0.1);
    }
}
    

// game over audiosound
export function gameOverAudiosound() {

    if (typeof audioCtx === 'undefined') {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          window.audioCtx = new AudioContext();
        }
        
        if (window.audioCtx) {
          const oscillator = window.audioCtx.createOscillator();
          const gainNode = window.audioCtx.createGain();
          
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(1000, window.audioCtx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(100, window.audioCtx.currentTime + 0.1);
          
          gainNode.gain.setValueAtTime(0.05, window.audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioCtx.currentTime + 0.1);
          
          oscillator.connect(gainNode);
          gainNode.connect(window.audioCtx.destination);
          
          oscillator.start();
          oscillator.stop(window.audioCtx.currentTime + 0.1);
    }
}