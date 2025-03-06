// Function to fetch the search data from the JSON file and search it
async function fetchSearchData() {
    try {
        const response = await fetch('search-data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching search data:', error);
        return [];
    }
}

// Function to handle the search functionality
async function searchWebsite() {
    const query = document.getElementById('search-box').value.toLowerCase();
    const resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (query.length === 0) return; // Don't search if input is empty

    const searchData = await fetchSearchData();

    if (searchData.length === 0) {
        resultsDiv.innerHTML = '<p>No data available to search</p>';
        return;
    }

    let foundMatches = searchData.filter(item => 
        (item.title && item.title.toLowerCase().includes(query)) || 
        (item.content && item.content.toLowerCase().includes(query))
    );

    const MAX_RESULTS = 20;  // Set a limit to the number of results to display
    foundMatches = foundMatches.slice(0, MAX_RESULTS);

    if (foundMatches.length > 0) {
        foundMatches.forEach((item) => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result');

            // Highlight the title and content preview
            const highlightedTitle = highlightText(item.title || 'Untitled', query);
            const highlightedContent = highlightContentPreview(item.content || '', query);

            // Create a link to navigate to the page with query parameter
            resultDiv.innerHTML = `
                <a href="${item.url}?searchQuery=${encodeURIComponent(query)}">${highlightedTitle}</a>
                <p>${highlightedContent}</p>
            `;
            resultsDiv.appendChild(resultDiv);
        });
    } else {
        resultsDiv.innerHTML = '<p>No results found</p>';
    }
}

// Function to highlight the search query in the text
function highlightText(text, query) {
    const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const regex = new RegExp(escapedQuery, 'gi');
    return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
}

// Function to create a preview of the content with highlighted matches
function highlightContentPreview(content, query) {
    const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const regex = new RegExp(escapedQuery, 'gi');
    const match = regex.exec(content);
    if (!match) return content.slice(0, 200) + '...';
    
    const startIndex = Math.max(match.index - 50, 0);
    const endIndex = Math.min(match.index + match[0].length + 50, content.length);
    return content.slice(startIndex, endIndex).replace(regex, (match) => `<span class="highlight">${match}</span>`) + '...';
}

// Function to handle scrolling to the matched content on the target page
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('searchQuery');
    const matchID = window.location.hash.substr(1); // Get the matched result ID

    if (query && matchID) {
        // Wait for the page to load before scrolling
        setTimeout(() => {
            const matchElement = document.getElementById(matchID);
            if (matchElement) {
                matchElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                matchElement.style.backgroundColor = 'yellow'; // Highlight the match
                setTimeout(() => matchElement.style.backgroundColor = '', 2000); // Remove highlight after 2 seconds
            }
        }, 100);
    }
};
