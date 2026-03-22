const fs = require('fs');

const targetFiles = [
    'c:\\\\Users\\\\ADMIN\\\\OneDrive\\\\Desktop\\\\RideON\\\\economy.html',
    'c:\\\\Users\\\\ADMIN\\\\OneDrive\\\\Desktop\\\\RideON\\\\luxury.html',
    'c:\\\\Users\\\\ADMIN\\\\OneDrive\\\\Desktop\\\\RideON\\\\electric.html'
];

targetFiles.forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');

    // Protect the newly restored grid layout by locking the grid's intrinsic min-width calculation to 0, completely destroying grid-column blowout.
    const searchString = `class="car-card bg-white rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col group relative transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-4 w-full h-full"`;
    const replaceString = `class="car-card min-w-0 bg-white rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col group relative transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-4 w-full h-full"`;
    
    content = content.replace(searchString, replaceString);

    fs.writeFileSync(f, content, 'utf8');
    console.log("Reinforced Grid Column Stability on " + f);
});
