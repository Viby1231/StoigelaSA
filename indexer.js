const fs = require('fs-extra');  // Required for reading and writing files
const path = require('path');    // Helps work with file paths
const { JSDOM } = require('jsdom');  // Parses HTML files

// Set the folder where your HTML files are stored
const pagesDir = path.join(__dirname, 'StoigelaPages/Pages'); // Adjust this to match your folder structure

// Function to extract text from HTML
function extractText(html) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const title = document.querySelector('title') ? document.querySelector('title').textContent : "Untitled Page";
    const content = Array.from(document.querySelectorAll('p, h1, h2, h3, h4, h5, h6'))  // Get text from paragraphs and headers
                         .map(el => el.textContent)
                         .join(' '); // Combine all content into one string
    return { title, content };
}

// Scan all HTML files in the directory and create the search index
async function createSearchIndex() {
    const files = await fs.readdir(pagesDir);  // Get all files in the directory
    let searchData = [];

    for (const file of files) {
        if (file.endsWith('.html')) {  // Only process HTML files
            const filePath = path.join(pagesDir, file);
            const html = await fs.readFile(filePath, 'utf8');  // Read the HTML content of the file
            const { title, content } = extractText(html);  // Extract title and content
            searchData.push({ title, url: `./StoigelaPages/Pages/${file}`, content });  // Add to the search data
        }
    }

    // Save the search data to a JSON file
    await fs.writeJson(path.join(__dirname, 'search-data.json'), searchData, { spaces: 2 });
    console.log('Search index created!');
}

// Run the indexer function
createSearchIndex();

console.log('Search data has been indexed!');


