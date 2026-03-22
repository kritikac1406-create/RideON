const fs = require('fs');
let c = fs.readFileSync('home.html', 'utf8');

c = c.replace(/<script id="dynamic-loader">[\s\S]*?<\/script>/m, (match) => {
    let m = match;
    m = m.replace(/object-contain/g, 'object-cover');
    m = m.replace(/height: 280px/g, 'height: 190px');
    m = m.replace(/height: 240px/g, 'height: 190px');
    return m;
});

fs.writeFileSync('home.html', c);
console.log('Aspect ratio fixed.');
