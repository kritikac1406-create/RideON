const fs = require('fs');

const targetFiles = [
    'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\economy.html',
    'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\luxury.html',
    'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\electric.html'
];

const eventBindings = `
// Ensure the updated filter is available globally for the DOM listeners
window.applyFilters = applyFilters;

// REBIND EVENT LISTENERS Wiped out during V8 Patches
(function bindFilters() {
    const searchInp = document.getElementById("searchInput");
    if (searchInp) searchInp.addEventListener("input", applyFilters);

    const prcRng = document.getElementById("priceRange");
    const prcLbl = document.getElementById("priceLabel");
    if (prcRng) prcRng.addEventListener("input", () => {
        if (prcLbl) prcLbl.textContent = "₹" + prcRng.value;
        applyFilters();
    });

    const pkpInp = document.getElementById("filterPickupDate");
    if (pkpInp) pkpInp.addEventListener("change", applyFilters);

    const drpInp = document.getElementById("filterDropDate");
    if (drpInp) drpInp.addEventListener("change", applyFilters);

    document.querySelectorAll(".brandFilter").forEach(cb => cb.addEventListener("change", applyFilters));
    document.querySelectorAll(".fuelFilter").forEach(cb => cb.addEventListener("change", applyFilters));
    document.querySelectorAll(".transFilter").forEach(cb => cb.addEventListener("change", applyFilters));
})();
`;

targetFiles.forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');

    const anchor = 'window.applyFilters = applyFilters;';
    
    if (content.includes(anchor) && !content.includes('REBIND EVENT LISTENERS Wiped out during V8 Patches')) {
        content = content.replace(anchor, eventBindings);
        fs.writeFileSync(f, content, 'utf8');
        console.log("Restored missing DOM Listeners globally across " + f);
    }
});
