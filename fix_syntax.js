const fs = require('fs');

['economy.html', 'luxury.html', 'electric.html'].forEach(file => {
    const f = 'c:\\\\Users\\\\ADMIN\\\\OneDrive\\\\Desktop\\\\RideON\\\\' + file;
    if (fs.existsSync(f)) {
        let content = fs.readFileSync(f, 'utf8');
        
        // Remove the corrupted newline and duplicate clear statement
        content = content.replace('container.innerHTML = "";\\\\n', '');
        
        // Fix the corrupted newline before the applyFilters check
        content = content.replace('\\\\n      if (window.applyFilters)', '\\n      if (window.applyFilters)');

        fs.writeFileSync(f, content);
        console.log("Fixed SyntaxError in " + f);
    }
});
