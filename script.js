// Global variables to maintain simulation state
let frames = []; // Array to hold current pages in memory
let maxFrames = 3; // Number of physical frames available
let pageTrace = []; // Array of page references to process
let currentStep = 0; // Current position in page trace
let pageFaults = 0; // Counter for page faults
let algorithm = 'lru'; // Current algorithm (lru or optimal)
let accessHistory = []; // Track access order for LRU

// Initialize the simulator
function init() {
    // Get values from input fields
    maxFrames = parseInt(document.getElementById('frames').value);
    let traceInput = document.getElementById('pageTrace').value;
    algorithm = document.getElementById('algorithm').value;
    
    // Parse the comma-separated page trace
    pageTrace = traceInput.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
    
    // Reset all state variables
    frames = [];
    currentStep = 0;
    pageFaults = 0;
    accessHistory = [];
    
    // Clear the log and update display
    document.getElementById('log').innerHTML = '';
    updateDisplay();
    updateStatus('Initialized. Ready to run simulation.');
}

// Run one step of the simulation
function runStep() {
    // Initialize if starting fresh
    if (currentStep === 0 && frames.length === 0) {
        init();
    }
    
    // Check if we've finished processing all pages
    if (currentStep >= pageTrace.length) {
        updateStatus('Simulation complete!');
        return;
    }
    
    // Get the current page reference
    let page = pageTrace[currentStep];
    let isPageFault = false;
    
    // Check if page is already in memory (page hit)
    let pageIndex = frames.indexOf(page);
    
    if (pageIndex !== -1) {
        // Page hit - page is already in memory
        updateLog(`Step ${currentStep + 1}: Page ${page} - HIT`, 'hit');
        
        // Update access history for LRU
        if (algorithm === 'lru') {
            // Remove page from its current position and add to end (most recent)
            accessHistory = accessHistory.filter(p => p !== page);
            accessHistory.push(page);
        }
    } else {
        // Page fault - page not in memory
        isPageFault = true;
        pageFaults++;
        
        if (frames.length < maxFrames) {
            // We have empty frames, just add the page
            frames.push(page);
            updateLog(`Step ${currentStep + 1}: Page ${page} - FAULT (loaded into frame ${frames.length - 1})`, 'fault');
        } else {
            // Memory is full, need to replace a page
            let victimIndex = -1;
            
            if (algorithm === 'lru') {
                // LRU: Replace the least recently used page
                victimIndex = findLRUVictim();
            } else if (algorithm === 'optimal') {
                // Optimal: Replace page that won't be used for longest time
                victimIndex = findOptimalVictim();
            }
            
            let victimPage = frames[victimIndex];
            frames[victimIndex] = page;
            updateLog(`Step ${currentStep + 1}: Page ${page} - FAULT (replaced page ${victimPage})`, 'fault');
        }
        
        // Add to access history for LRU
        if (algorithm === 'lru') {
            accessHistory.push(page);
        }
    }
    
    // Move to next step and update display
    currentStep++;
    updateDisplay();
    updateStatus(`Processed page ${page} - ${isPageFault ? 'FAULT' : 'HIT'}`);
}

// Find victim page using LRU algorithm
function findLRUVictim() {
    // The least recently used page is the one that appears earliest in accessHistory
    for (let i = 0; i < accessHistory.length; i++) {
        let page = accessHistory[i];
        let frameIndex = frames.indexOf(page);
        if (frameIndex !== -1) {
            return frameIndex;
        }
    }
    return 0; // Fallback (shouldn't happen)
}

// Find victim page using Optimal algorithm
function findOptimalVictim() {
    // Look at future references and find page that won't be used for longest time
    let farthest = -1;
    let victimIndex = 0;
    
    for (let i = 0; i < frames.length; i++) {
        let page = frames[i];
        let nextUse = -1;
        
        // Find when this page will be used next
        for (let j = currentStep + 1; j < pageTrace.length; j++) {
            if (pageTrace[j] === page) {
                nextUse = j;
                break;
            }
        }
        
        // If page is never used again, it's the best victim
        if (nextUse === -1) {
            return i;
        }
        
        // Track which page has farthest next use
        if (nextUse > farthest) {
            farthest = nextUse;
            victimIndex = i;
        }
    }
    
    return victimIndex;
}

// Run the entire simulation at once
function runFull() {
    init();
    
    // Run all steps
    while (currentStep < pageTrace.length) {
        runStep();
    }
}

// Reset the simulation
function reset() {
    frames = [];
    currentStep = 0;
    pageFaults = 0;
    accessHistory = [];
    document.getElementById('log').innerHTML = '';
    updateDisplay();
    updateStatus('Reset complete. Ready to run simulation.');
}

// Update the memory table display
function updateDisplay() {
    let memoryDiv = document.getElementById('memoryTable');
    memoryDiv.innerHTML = '';
    
    // Create frame boxes
    for (let i = 0; i < maxFrames; i++) {
        let frameDiv = document.createElement('div');
        frameDiv.className = 'frame';
        
        if (i < frames.length) {
            frameDiv.textContent = frames[i];
            frameDiv.className = 'frame hit';
        } else {
            frameDiv.textContent = '-';
            frameDiv.className = 'frame empty';
        }
        
        memoryDiv.appendChild(frameDiv);
    }
    
    // Update page fault counter
    document.getElementById('pageFaultCount').textContent = `Page Faults: ${pageFaults}`;
}

// Update status message
function updateStatus(message) {
    document.getElementById('status').textContent = message;
}

// Add entry to simulation log
function updateLog(message, type) {
    let logDiv = document.getElementById('log');
    let entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = message;
    logDiv.appendChild(entry);
    
    // Auto-scroll to bottom
    logDiv.scrollTop = logDiv.scrollHeight;
}

// Initialize on page load
window.onload = function() {
    updateStatus('Enter parameters and click Run Step or Run Full to begin.');
    updateDisplay();
};