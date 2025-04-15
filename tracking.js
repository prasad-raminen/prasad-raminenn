document.addEventListener('DOMContentLoaded', function() {
    // ... (keep existing tracking code if needed) ...

    // Text Analysis Functionality
    const analyzeBtn = document.getElementById('analyze-btn');
    const textInput = document.getElementById('text-input');

    if (analyzeBtn && textInput) {
        analyzeBtn.addEventListener('click', analyzeText);
    } else {
        console.error("Error: Could not find Analyze button or text input!");
    }

    function analyzeText() {
        const text = textInput.value.trim();
        
        if (!text) {
            alert('Please enter some text to analyze!');
            return;
        }

        // 1. Basic Statistics
        const letters = text.replace(/[^a-zA-Z]/g, '').length;
        const words = text.split(/\s+/).filter(word => word.length > 0).length;
        const spaces = (text.match(/ /g) || []).length;
        const newlines = (text.match(/\n/g) || []).length;
        const specialSymbols = text.replace(/[a-zA-Z0-9\s]/g, '').length;

        // Display Basic Stats
        document.getElementById('basic-stats-results').innerHTML = `
            <div class="stat-item"><span>Letters:</span> <span>${letters}</span></div>
            <div class="stat-item"><span>Words:</span> <span>${words}</span></div>
            <div class="stat-item"><span>Spaces:</span> <span>${spaces}</span></div>
            <div class="stat-item"><span>Newlines:</span> <span>${newlines}</span></div>
            <div class="stat-item"><span>Special Symbols:</span> <span>${specialSymbols}</span></div>
        `;

        // 2. Pronouns Count
        const pronouns = ['i', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves', 'they', 'them', 'their', 'theirs', 'themselves'];
        const pronounCounts = countOccurrences(text, pronouns);
        displayResults(pronounCounts, 'pronoun-results');

        // 3. Prepositions Count
        const prepositions = ['about', 'above', 'across', 'after', 'against', 'along', 'among', 'around', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'by', 'down', 'during', 'for', 'from', 'in', 'inside', 'into', 'like', 'near', 'of', 'off', 'on', 'out', 'outside', 'over', 'past', 'since', 'through', 'throughout', 'to', 'toward', 'under', 'underneath', 'until', 'up', 'upon', 'with', 'within', 'without'];
        const prepositionCounts = countOccurrences(text, prepositions);
        displayResults(prepositionCounts, 'preposition-results');

        // 4. Articles Count
        const articles = ['a', 'an', 'the'];
        const articleCounts = countOccurrences(text, articles);
        displayResults(articleCounts, 'article-results');
    }

    // Helper: Count word occurrences
    function countOccurrences(text, wordList) {
        const counts = {};
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        
        wordList.forEach(word => {
            counts[word] = 0; // Initialize
        });

        words.forEach(word => {
            if (wordList.includes(word)) {
                counts[word]++;
            }
        });

        return counts;
    }

    // Helper: Display results in HTML
    function displayResults(counts, elementId) {
        const resultsDiv = document.getElementById(elementId);
        let html = '';

        Object.entries(counts)
            .filter(([_, count]) => count > 0)
            .sort((a, b) => b[1] - a[1])
            .forEach(([word, count]) => {
                html += `<div class="stat-item"><span>${word}:</span> <span>${count}</span></div>`;
            });

        resultsDiv.innerHTML = html || '<p>No matches found.</p>';
    }
});