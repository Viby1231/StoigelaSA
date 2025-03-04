// This function will fetch the search data from the JSON file and search it
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

// Function to search the fetched data
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
        foundMatches.forEach((item, index) => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result');

            // Highlight matches in the title and content
            const highlightedTitle = highlightText(item.title || 'Untitled', query);
            const highlightedContent = highlightPreview(item.content || '', query);

            // Create a unique ID for each result (can be used to scroll to the element later)
            const resultID = 'result-' + index;

            // Create links to navigate to the specific page with the query
            resultDiv.innerHTML = `
                <a href="${item.url}?searchQuery=${query}#${resultID}" target="_blank">${highlightedTitle}</a>
                <p id="${resultID}">${highlightedContent}</p>
            `;
            resultsDiv.appendChild(resultDiv);
        });
    } else {
        resultsDiv.innerHTML = '<p>No results found</p>';
    }
}

// Function to highlight the search query in the text
function highlightText(text, query) {
    // Escape the query to handle special characters in regex
    const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const regex = new RegExp(escapedQuery, 'gi');
    
    // Replace matched text with a <span> for styling
    return text.replace(regex, (match) => {
        return `<span class="highlight">${match}</span>`;
    });
}

// Function to create a preview of the content with highlighted matches
function highlightPreview(content, query) {
    // Escape the query to handle special characters in regex
    const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const regex = new RegExp(escapedQuery, 'gi');

    // Search for matches in the content
    const match = regex.exec(content);
    if (!match) return content.slice(0, 200) + '...'; // Return preview of the first 200 characters if no match

    // Get a preview of the surrounding context and highlight the match
    const startIndex = Math.max(match.index - 50, 0);  // Get 50 characters before the match
    const endIndex = Math.min(match.index + match[0].length + 50, content.length);  // Get 50 characters after the match

    // Return the content preview with highlighted match
    return content.slice(startIndex, endIndex).replace(regex, (match) => {
        return `<span class="highlight">${match}</span>`;
    }) + '...';  // Add ellipsis at the end
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
