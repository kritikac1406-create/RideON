const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const routingLink = `href="javascript:void(0)" onclick="window.location.href = localStorage.getItem('userRole') === 'admin' ? 'admin-home.html' : 'home.html'"`;

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let original = content;

  // 1. If it's the logo inside an <a> tag
  // Use [^]*? to match across newlines lazily
  content = content.replace(/<a\s+href="[^"]*"([^>]*)>\s*(<div[^>]*>\s*)?Ride<span class="text-gray-600">ON<\/span>(\s*<\/div>)?\s*(<span[^>]*>ADMIN PANEL<\/span>)?\s*<\/a>/g, `<a ${routingLink}$1>$2Ride<span class="text-gray-600">ON</span>$3$4</a>`);

  // 2. If it's the logo inside a <div> tag but NOT inside an <a> tag! (like in booking.html)
  // Look for: <div class="..." style="...">\s*Ride<span class="text-gray-600">ON</span>\s*</div>
  if (!content.includes(routingLink)) {
    content = content.replace(/(<div[^>]*>\s*Ride<span class="text-gray-600">ON<\/span>\s*<\/div>)/g, `<a ${routingLink}>$1</a>`);
  }

  // 3. Patch log.html to set local storage
  if (file === 'log.html') {
    if (!content.includes("localStorage.setItem('userRole', role)")) {
      content = content.replace(/const role\s*=\s*data\.user\.user_metadata\.role\s*\|\|\s*"user"/, `const role=data.user.user_metadata.role||"user"\nlocalStorage.setItem('userRole', role)`);
    }
  }

  // 4. Patch adminLogout and normal logout to clear localstorage
  if (content.includes("await supabaseClient.auth.signOut()")) {
     if(!content.includes("localStorage.removeItem('userRole')")) {
         content = content.replace(/await supabaseClient\.auth\.signOut\(\);?/, `await supabaseClient.auth.signOut();\nlocalStorage.removeItem('userRole');`);
     }
  }

  if (content !== original) {
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Patched ${file}`);
  }
}
