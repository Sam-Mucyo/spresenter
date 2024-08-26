document.addEventListener('DOMContentLoaded', () => {
    const lyricsInput = document.getElementById('lyrics-input');
    const submitButton = document.getElementById('submit-lyrics');
    const inputContainer = document.querySelector('.input-container');
    const lyricsContainer = document.querySelector('.lyrics-container');
    let activeIndex = 0;

    const createLyricsChunks = (lyrics) => {
        const lines = lyrics.split('\n').filter(line => line.trim() !== '');
        lines.forEach((line, index) => {
            const chunkDiv = document.createElement('div');
            chunkDiv.classList.add('lyrics-chunk');
            chunkDiv.textContent = line;
            lyricsContainer.appendChild(chunkDiv);
        });
        updateVisibleChunks();
    };

    const updateVisibleChunks = () => {
        const chunks = document.querySelectorAll('.lyrics-chunk');
        chunks.forEach((chunk, index) => {
            chunk.classList.remove('active', 'previous', 'next');
            chunk.style.display = 'none';
            if (index < activeIndex && index > activeIndex - 3) {
                chunk.classList.add('previous');
                chunk.style.display = 'block';
            } else if (index === activeIndex) {
                chunk.classList.add('active');
                chunk.style.display = 'block';
            } else if (index > activeIndex && index < activeIndex + 3) {
                chunk.classList.add('next');
                chunk.style.display = 'block';
            }
        });
    };

    const handleKeydown = (event) => {
        const chunks = document.querySelectorAll('.lyrics-chunk');
        if (event.key === 'ArrowDown' || event.key === 'j') {
            if (activeIndex < chunks.length - 1) {
                activeIndex++;
                updateVisibleChunks();
            }
        } else if (event.key === 'ArrowUp' || event.key === 'k') {
            if (activeIndex > 0) {
                activeIndex--;
                updateVisibleChunks();
            }
        }
    };

    submitButton.addEventListener('click', () => {
        lyricsContainer.innerHTML = '';  // Clear previous lyrics if any
        const lyrics = lyricsInput.value;
        createLyricsChunks(lyrics);
        lyricsContainer.style.display = 'flex';  // Show the lyrics container
        inputContainer.style.display = 'none';  // Hide the input container
    });

    document.addEventListener('keydown', handleKeydown);
});
