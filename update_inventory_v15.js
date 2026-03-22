const fs = require('fs');

const targetFiles = [
    'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\economy.html',
    'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\luxury.html',
    'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\electric.html'
];

targetFiles.forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');

    // 1. Revert Container back to strict Grid layout
    const flexOverridePattern = /class="flex flex-wrap items-stretch justify-start w-full gap-8 pb-12 w-full" style="align-content: flex-start"/g;
    const gridRestore = `class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1"`;
    content = content.replace(flexOverridePattern, gridRestore);

    // 2. Eradicate literal flex-grow and rigid min-width limits from the car cards, allowing standard CSS Grid rendering
    const cardPattern = /<div class="car-card bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl p-5 w-full flex-grow" style="min-width: 300px; max-width: 420px; box-sizing: border-box;"/g;
    const cleanCard = `<div class="car-card bg-white rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col group relative transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-4 w-full h-full"`;
    content = content.replace(cardPattern, cleanCard);

    fs.writeFileSync(f, content, 'utf8');
    console.log("Restored strict grid matrices in " + f);
});
