// Function to format time duration
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
}

// Initialize results page
window.addEventListener('DOMContentLoaded', () => {
    const testData = JSON.parse(sessionStorage.getItem('testResults'));
    if (!testData || !testData.type || !['big-five', 'mbti', 'eq', 'sjt'].includes(testData.type)) {
        window.location.href = '/dashboard.html';
        return;
    }

    const timeSpent = Math.round((new Date(testData.endTime) - new Date(testData.startTime)) / 1000);
    const insights = testData.insights || {};

    const insightsSection = document.getElementById('insightsSection');
    insightsSection.innerHTML = `
        <h2 class="text-2xl font-bold mb-6">${insights.category || 'Personality Assessment'}</h2>
        
        <div class="insights-list space-y-4">
            ${insights.insights ? insights.insights.map(insight => 
                `<div class="insight-item p-4 bg-opacity-5 rounded-lg">
                    <p class="text-lg">${insight}</p>
                </div>`
            ).join('') : ''}
        </div>

        ${insights.recommendations ? `
            <div class="recommendations-list mt-8">
                <h3 class="text-xl font-semibold mb-4">Career Recommendations</h3>
                ${insights.recommendations.map(rec => 
                    `<div class="recommendation-item p-4">
                        <p class="text-lg">${rec}</p>
                    </div>`
                ).join('')}
            </div>
        ` : ''}

        <div class="mt-6 text-sm text-gray-600">
            Time taken: ${formatTime(timeSpent)}
        </div>
    `;
});
