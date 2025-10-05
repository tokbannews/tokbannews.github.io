// Tips will be loaded from tips.json

// Tool icons will be assigned automatically based on tool type
const toolIcons = ["📥", "⬇️", "💾", "🎬", "📹", "🔗", "🎥", "📲", "🎞️", "🎯"];

function getToolIcon(index) {
    return toolIcons[index % toolIcons.length];
}

// Load and display articles
async function loadArticles() {
    try {
        const response = await fetch('articlelist.json');
        const articles = await response.json();
        
        const articlesContainer = document.getElementById('articles-container');
        const articleCount = document.getElementById('article-count');
        
        // Update count
        articleCount.textContent = `${articles.length} articles`;
        
        // Display articles
        if (articles.length === 0) {
            articlesContainer.innerHTML = '<div class="empty-state">No articles available</div>';
            return;
        }
        
        articles.forEach((article, index) => {
            const articleCard = createArticleCard(article, index);
            articlesContainer.appendChild(articleCard);
        });
        
    } catch (error) {
        console.error('Error loading articles:', error);
        document.getElementById('articles-container').innerHTML = 
            '<div class="empty-state">Error loading articles</div>';
    }
}

// Create article card element
function createArticleCard(article, index) {
    const card = document.createElement('div');
    card.className = 'article-card';
    card.dataset.link = article.link;
    
    card.innerHTML = `
        <button class="copy-icon" aria-label="Copy link" title="Copy link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
                <path d="M3 10.5V3.5C3 2.67157 3.67157 2 4.5 2H10.5" stroke="currentColor" stroke-width="1.5"/>
            </svg>
        </button>
        <div class="article-title">${article.title}</div>
        <div class="article-meta">
            <span class="article-site">${article.site}</span>
            <span class="meta-separator">•</span>
            <span class="article-date">${formatDate(article.date)}</span>
        </div>
    `;
    
    // Open link in new window when clicking card
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.copy-icon')) {
            window.open(article.link, '_blank', 'noopener,noreferrer');
        }
    });
    
    // Copy to clipboard when clicking copy icon
    const copyBtn = card.querySelector('.copy-icon');
    copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        copyToClipboard(article.link);
    });
    
    return card;
}

// Load and display technical tips
async function loadTechnicalTips() {
    try {
        const response = await fetch('tips.json');
        const tips = await response.json();
        
        const tipsContainer = document.getElementById('tips-container');
        
        if (tips.length === 0) {
            tipsContainer.innerHTML = '<div class="empty-state">No tips available</div>';
            return;
        }
        
        tips.forEach(tip => {
            const tipCard = createTipCard(tip);
            tipsContainer.appendChild(tipCard);
        });
        
    } catch (error) {
        console.error('Error loading tips:', error);
        document.getElementById('tips-container').innerHTML = 
            '<div class="empty-state">Error loading tips</div>';
    }
}

// Create tip card element
function createTipCard(tip) {
    const card = document.createElement('div');
    card.className = 'tip-card';
    card.dataset.link = tip.link;
    
    card.innerHTML = `
        <button class="copy-icon" aria-label="Copy link" title="Copy link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
                <path d="M3 10.5V3.5C3 2.67157 3.67157 2 4.5 2H10.5" stroke="currentColor" stroke-width="1.5"/>
            </svg>
        </button>
        <div class="tip-title">${tip.title}</div>
        <div class="tip-meta">
            <span class="tip-site">${tip.site}</span>
        </div>
    `;
    
    // Open link in new window when clicking card
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.copy-icon')) {
            window.open(tip.link, '_blank', 'noopener,noreferrer');
        }
    });
    
    // Copy to clipboard when clicking copy icon
    const copyBtn = card.querySelector('.copy-icon');
    copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        copyToClipboard(tip.link);
    });
    
    return card;
}

// Load and display developer tools
async function loadDeveloperTools() {
    try {
        const response = await fetch('tttools.json');
        const tools = await response.json();
        
        const toolsContainer = document.getElementById('tools-container');
        
        if (tools.length === 0) {
            toolsContainer.innerHTML = '<div class="empty-state">No tools available</div>';
            return;
        }
        
        tools.forEach((tool, index) => {
            const toolWithIcon = {
                name: tool.name,
                description: `TikTok video downloader and backup tool`,
                icon: getToolIcon(index),
                link: tool.url
            };
            const toolCard = createToolCard(toolWithIcon);
            toolsContainer.appendChild(toolCard);
        });
        
    } catch (error) {
        console.error('Error loading tools:', error);
        document.getElementById('tools-container').innerHTML = 
            '<div class="empty-state">Error loading tools</div>';
    }
}

// Create tool card element
function createToolCard(tool) {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.dataset.link = tool.link;
    
    card.innerHTML = `
        <button class="copy-icon" aria-label="Copy link" title="Copy link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
                <path d="M3 10.5V3.5C3 2.67157 3.67157 2 4.5 2H10.5" stroke="currentColor" stroke-width="1.5"/>
            </svg>
        </button>
        <div class="tool-content">
            <div class="tool-name">${tool.name}</div>
            <div class="tool-description">${tool.description}</div>
        </div>
    `;
    
    // Open link in new window when clicking card
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.copy-icon')) {
            window.open(tool.link, '_blank', 'noopener,noreferrer');
        }
    });
    
    // Copy to clipboard when clicking copy icon
    const copyBtn = card.querySelector('.copy-icon');
    copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        copyToClipboard(tool.link);
    });
    
    return card;
}

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast();
    }).catch(err => {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        fallbackCopyToClipboard(text);
    });
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast();
    } catch (err) {
        console.error('Fallback: Failed to copy', err);
    }
    
    document.body.removeChild(textArea);
}

// Show toast notification
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Format date
function formatDate(dateString) {
    if (!dateString || dateString === '2025') return dateString;
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadArticles();
    loadTechnicalTips();
    loadDeveloperTools();
});
