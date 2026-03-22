const fs = require('fs');

const targetFiles = [
    'c:\\\\Users\\\\ADMIN\\\\OneDrive\\\\Desktop\\\\RideON\\\\economy.html',
    'c:\\\\Users\\\\ADMIN\\\\OneDrive\\\\Desktop\\\\RideON\\\\luxury.html',
    'c:\\\\Users\\\\ADMIN\\\\OneDrive\\\\Desktop\\\\RideON\\\\electric.html'
];

targetFiles.forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');

    // Override the Flexbox stretching algorithm by forcing the filter panel to align to the top of the flex container 
    // and inherently wrap tightly to its own checkbox content instead of inheriting the main container's grid-height.
    content = content.replace(/<aside class="filter-panel">/g, '<aside class="filter-panel self-start" style="align-self: flex-start; height: max-content;">');

    fs.writeFileSync(f, content, 'utf8');
    console.log("Patched filter panel white-space stretch strictly to max-content on " + f);
});
