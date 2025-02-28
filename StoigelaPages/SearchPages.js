
// Array of content on your website
const websiteContent = [
  { title: "Home", url: "../../index.html", description: "Welcome to the homepage of our website." },
  { title: "Home: How can minerals keep us healthy?", url: "../../index.html#Home1", description: "" },
  { title: "Home: Are all mineral supplements created equal?", url: "../../index.html#Home2", description: "" },

  { title: "About Us", url: "AboutUs.html", description: "Learn more about our team and mission." },
  { title: "About Us: Our goal", url: "AboutUs.html#About1", description: "Learn more about our team's goal." },

  { title: "Products", url: "Products.html", description: "Read about our Products." },

  { title: "Contact", url: "Contact.html", description: "Get in touch with us via email." },

  { title: "Research", url: "Research.html", description: "" },


  { title: "Topical", url: "Topical.html", description: "Find out more about Zoilevium Topical" },
  { title: "Immune Support", url: "Immune Support.html", description: "Find out more about Zoilevium Immune Support" },
  { title: "PureGut", url: "PureGut.html", description: "Find out more about Zoilevium PureGut" },
  { title: "References", url: "References.html", description: "" },
  { title: "Testimonials", url: "TestimonialsTopical.html", description: "" }
];

function searchWebsite() {
  const query = document.getElementById('search-box').value.toLowerCase();
  const resultsDiv = document.getElementById('search-results');
  resultsDiv.innerHTML = ''; // Clear previous results

  if (query.length > 0) {
    const filteredResults = websiteContent.filter(item => 
      item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
    );

    if (filteredResults.length > 0) {
      const resultsTitle = document.createElement('div');
      resultsTitle.classList.add('results-title');
      resultsTitle.textContent = 'Pages';
      resultsDiv.appendChild(resultsTitle);

      filteredResults.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        resultDiv.innerHTML = `<a href="${result.url}">${result.title}</a><p>${result.description}</p>`;
        resultsDiv.appendChild(resultDiv);
      });
    } else {
      resultsDiv.innerHTML = '<p>No results found</p>';
    }
  }
}
