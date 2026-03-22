const fs = require('fs');

['economy.html', 'luxury.html', 'electric.html'].forEach(file => {
    const f = 'c:\\\\Users\\\\ADMIN\\\\OneDrive\\\\Desktop\\\\RideON\\\\' + file;
    if (fs.existsSync(f)) {
        let content = fs.readFileSync(f, 'utf8');
        
        // Wipe all literal '\n' sequences maliciously injected by the V12 compiler error
        content = content.replace(/\\n/g, '');
        
        // Also wipe empty duplicate lines if they exist, to keep code clean
        content = content.replace(/container\.innerHTML = "";\\s+container\.innerHTML = "";/g, 'container.innerHTML = "";');

        fs.writeFileSync(f, content);
        console.log("Successfully Purged Fatal Syntax Nodes in " + f);
    }
});
