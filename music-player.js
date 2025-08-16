class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('audioPlayer');
        this.playBtn = document.getElementById('playBtn');
        this.playIcon = document.getElementById('playIcon');
        this.progressFill = document.getElementById('progressFill');
        this.progressHandle = document.getElementById('progressHandle');
        this.progressBar = document.querySelector('.progress-bar');
        this.currentTimeDisplay = document.getElementById('currentTime');
        this.totalTimeDisplay = document.getElementById('totalTime');
        this.loveRain = document.getElementById('loveRain');
        
        this.isPlaying = false;
        this.isDragging = false;
        this.rainInterval = null;
        this.particleCounter = 0;
        
        this.initializeEventListeners();
        this.updateTimeDisplay();
    }
    
    initializeEventListeners() {
        // Play/Pause button
        this.playBtn.addEventListener('click', () => {
            console.log('Play button clicked');
            this.togglePlay();
        });
        
        // Progress bar click
        this.progressBar.addEventListener('click', (e) => this.seekTo(e));
        
        // Progress bar drag
        this.progressHandle.addEventListener('mousedown', () => this.startDragging());
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.stopDragging());
        
        // Audio events
        this.audio.addEventListener('loadedmetadata', () => this.updateTimeDisplay());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.onSongEnd());
        this.audio.addEventListener('error', (e) => console.error('Audio error:', e));
        
        // Control buttons - only the ones that exist in HTML
        const skipBackBtn = document.getElementById('skipBackBtn');
        const skipForwardBtn = document.getElementById('skipForwardBtn');
        
        if (skipBackBtn) {
            skipBackBtn.addEventListener('click', () => {
                console.log('Skip back button clicked');
                this.skipBack();
            });
        } else {
            console.error('Skip back button not found');
        }
        
        if (skipForwardBtn) {
            skipForwardBtn.addEventListener('click', () => {
                console.log('Skip forward button clicked');
                this.skipForward();
            });
        } else {
            console.error('Skip forward button not found');
        }
        
        // Volume control
        const volumeSlider = document.getElementById('volumeSlider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                const volume = e.target.value / 100;
                this.audio.volume = volume;
                console.log('Volume changed to:', volume);
            });
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        this.audio.play();
        this.isPlaying = true;
        this.playIcon.textContent = '⏸';
        this.playBtn.classList.add('playing');
        this.showLoveRain(); // Show love rain when playing
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.playIcon.textContent = '▶';
        this.playBtn.classList.remove('playing');
       
    }
    
    showLoveRain() {
        if (this.loveRain) {
            this.loveRain.style.display = 'block';
            this.loveRain.style.opacity = '0';
            
            // Initial explosion effect
            this.createExplosion();
            
            // Start continuous rain
            this.startContinuousRain();
            
            setTimeout(() => {
                this.loveRain.style.transition = 'opacity 0.3s ease';
                this.loveRain.style.opacity = '1';
            }, 10);
        }
    }
    
    createExplosion() {
        // Create initial explosion particles
        for (let i = 0; i < 10; i++) {
            this.createParticle(true); // true = explosion particle
        }
    }
    
    startContinuousRain() {
        // Stop any existing interval
        if (this.rainInterval) {
            clearInterval(this.rainInterval);
        }
        
        // Create new particles every 800ms
        this.rainInterval = setInterval(() => {
            if (this.isPlaying) {
                this.createParticle(false); // false = rain particle
            }
        }, 800);
    }
    
    createParticle(isExplosion) {
        const particle = document.createElement('div');
        particle.className = 'love-particle';
        particle.innerHTML = this.getRandomLoveEmoji();
        
        // Set random color
        const colors = ['#ff6b35', '#ff4444', '#ff8c42', '#ff6b35', '#ff4444'];
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        if (isExplosion) {
            // Explosion particle
            particle.style.animation = 'explosiveSpread 5s ease-out forwards';
            this.setParticleDirection(particle, this.particleCounter % 10);
            this.particleCounter++;
        } else {
            // Rain particle - random position from top
            const randomX = (Math.random() - 0.5) * 800; // -400 to 400px
            particle.style.left = `calc(50% + ${randomX}px)`;
            particle.style.top = '-50px';
            particle.style.animation = 'continuousRain 3s linear forwards';
        }
        
        this.loveRain.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, isExplosion ? 5000 : 3000);
    }
    

    
    setParticleDirection(particle, index) {
        const spreadDirections = [
            { x: 0, y: -400 },      // North
            { x: 283, y: -283 },    // Northeast
            { x: 400, y: 0 },       // East
            { x: 283, y: 283 },     // Southeast
            { x: 0, y: 400 },       // South
            { x: -283, y: 283 },    // Southwest
            { x: -400, y: 0 },      // West
            { x: -283, y: -283 },   // Northwest
            { x: 200, y: -200 },    // Mid-Northeast
            { x: -200, y: 200 }     // Mid-Southwest
        ];
        
        if (index < spreadDirections.length) {
            const direction = spreadDirections[index];
            particle.style.setProperty('--spread-x', `${direction.x}px`);
            particle.style.setProperty('--spread-y', `${direction.y}px`);
        }
        
        // Random delay for staggered effect
        const randomDelay = Math.random() * 0.3;
        particle.style.animationDelay = `${randomDelay}s`;
    }
    
    hideLoveRain() {
        if (this.loveRain) {
            this.loveRain.style.transition = 'opacity 0.5s ease';
            this.loveRain.style.opacity = '0';
            setTimeout(() => {
                this.loveRain.style.display = 'none';
            }, 500);
        }
    }
    
    seekTo(e) {
        if (this.isDragging) return;
        
        const rect = this.progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = (clickX / rect.width) * 100;
        
        this.seekToPercentage(percentage);
    }
    
    seekToPercentage(percentage) {
        const time = (percentage / 100) * this.audio.duration;
        this.audio.currentTime = time;
    }
    
    startDragging() {
        this.isDragging = true;
        document.body.style.cursor = 'grabbing';
    }
    
    drag(e) {
        if (!this.isDragging) return;
        
        const rect = this.progressBar.getBoundingClientRect();
        const dragX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = (dragX / rect.width) * 100;
        
        this.seekToPercentage(percentage);
    }
    
    stopDragging() {
        this.isDragging = false;
        document.body.style.cursor = 'default';
    }
    
    updateProgress() {
        if (this.audio.duration) {
            const percentage = (this.audio.currentTime / this.audio.duration) * 100;
            this.progressFill.style.width = percentage + '%';
            this.progressHandle.style.left = percentage + '%';
        }
        
        this.updateTimeDisplay();
    }
    
    updateTimeDisplay() {
        if (this.audio.duration) {
            this.currentTimeDisplay.textContent = this.formatTime(this.audio.currentTime);
            this.totalTimeDisplay.textContent = this.formatTime(this.audio.duration);
        }
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    rewind() {
        this.audio.currentTime = Math.max(0, this.audio.currentTime - 10);
    }
    
    skipBack() {
        console.log('Skip back function called');
        if (this.audio && this.audio.duration) {
            const newTime = Math.max(0, this.audio.currentTime - 60);
            console.log(`Skipping from ${this.audio.currentTime}s to ${newTime}s`);
            this.audio.currentTime = newTime;
        } else {
            console.log('Audio not ready yet');
        }
    }
    
    skipForward() {
        console.log('Skip forward function called');
        if (this.audio && this.audio.duration) {
            const newTime = Math.min(this.audio.duration, this.audio.currentTime + 60);
            console.log(`Skipping from ${this.audio.currentTime}s to ${newTime}s`);
            this.audio.currentTime = newTime;
        } else {
            console.log('Audio not ready yet');
        }
    }
    
    fastForward() {
        this.audio.currentTime = Math.min(this.audio.duration, this.audio.currentTime + 10);
    }
    
    onSongEnd() {
        this.isPlaying = false;
        this.playIcon.textContent = '▶';
        this.playBtn.classList.remove('playing');
        this.progressFill.style.width = '0%';
        this.progressHandle.style.left = '0%';
        this.stopContinuousRain(); // Stop continuous rain when song ends
        this.hideLoveRain();
        this.updateTimeDisplay();
    }
    
    handleKeyboard(e) {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePlay();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.skipBack(); // Mundur 1 menit
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.skipForward(); // Maju 1 menit
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.audio.volume = Math.min(1, this.audio.volume + 0.1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.audio.volume = Math.max(0, this.audio.volume - 0.1);
                break;
        }
    }
}

// Initialize music player when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if all required elements exist
    const requiredElements = [
        'audioPlayer',
        'playBtn', 
        'playIcon',
        'progressFill',
        'progressHandle',
        'skipBackBtn',
        'skipForwardBtn'
    ];
    
    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    
    if (missingElements.length > 0) {
        console.error('Missing elements:', missingElements);
        return;
    }
    
    console.log('All elements found, initializing music player...');
    
    try {
        const player = new MusicPlayer();
        console.log('Music player initialized successfully');
        
        // Add loading animation
        const albumArt = document.querySelector('.album-art');
        if (albumArt) {
            albumArt.style.opacity = '0';
            albumArt.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                albumArt.style.transition = 'all 0.5s ease';
                albumArt.style.opacity = '1';
                albumArt.style.transform = 'scale(1)';
            }, 100);
        }
        
        // Add hover effects for control buttons
        const controlBtns = document.querySelectorAll('.control-btn');
        controlBtns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'scale(1.1)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'scale(1)';
            });
        });
        
    } catch (error) {
        console.error('Error initializing music player:', error);
    }
});

// Add smooth scrolling for navigation arrows
document.querySelectorAll('.arrow-icon').forEach(arrow => {
    arrow.addEventListener('click', () => {
        // You can add navigation logic here
        console.log('Navigation arrow clicked');
    });
}); 