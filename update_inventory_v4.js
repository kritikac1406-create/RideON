const fs = require('fs');

const targetFiles = [
    'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\economy.html',
    'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\luxury.html',
    'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\electric.html'
];

const newCardTemplate = `
          <div class="car-card bg-[#0a1017] rounded-3xl overflow-hidden shadow-xl border flex flex-col group relative transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl" 
               style="border-color: #1f2937;"
               data-name="\${car.name}" 
               data-brand="\${car.brand}" 
               data-fuel="\${car.fuel_type}" 
               data-transmission="\${car.transmission}" 
               data-price="\${car.rent_per_hour}">

             <!-- TOP IMAGE SECTION -->
             <div class="w-full bg-white relative p-6 flex flex-col items-center justify-center" style="height: 240px;">
                <!-- Glowing background behind car -->
                <div class="absolute inset-0" style="background: radial-gradient(circle, #ffffff 0%, #f3f4f6 100%);"></div>
                
                <!-- Floating Price Badge -->
                <div class="absolute top-4 right-4 bg-[#0a1017] text-white px-4 py-2 rounded-xl text-sm font-black shadow-md border z-20" style="border-color: #1f2937;">
                   ₹\${car.rent_per_hour} <span class="text-gray-400 font-bold text-[10px] tracking-widest uppercase">/hr</span>
                </div>

                <!-- Left Premium Badge -->
                 <div class="absolute top-4 left-4 z-20">
                   <span class="text-black px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase shadow-md" style="background: linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%);">
                     \${car.rent_per_hour < 1000 ? 'Best Value' : 'Premium'}
                   </span>
                </div>

                <!-- Car Image -->
                <img src="\${car.image_url}" class="w-full h-full object-contain relative z-10 transform group-hover:scale-110 transition-transform duration-700 ease-in-out" onerror="this.src='https://via.placeholder.com/400x200?text=No+Image'">
             </div>

             <!-- BOTTOM CONTENT SECTION -->
             <div class="p-6 flex flex-col flex-grow relative">
                <!-- Title -->
                <h3 class="text-2xl font-black text-white mb-1 tracking-tight" style="font-family: 'Inter', sans-serif;">\${car.name}</h3>
                <p class="text-[11px] font-bold tracking-widest text-[#d4af37] uppercase mb-6">\${car.brand || 'Luxury Class'}</p>

                <!-- Grid of Specs -->
                <div class="grid grid-cols-2 gap-3 mb-8">
                   <!-- Spec 1 -->
                   <div class="flex items-center gap-3 p-2.5 rounded-xl border" style="background: #131b26; border-color: #1f2937;">
                      <div class="w-7 h-7 rounded-full flex items-center justify-center text-[#d4af37]" style="background: #1c2736;">
                         <i class="fa-solid fa-gears text-[11px]"></i>
                      </div>
                      <span class="text-[10px] font-black text-gray-300 uppercase tracking-wider">\${car.transmission || 'Auto'}</span>
                   </div>
                   <!-- Spec 2 -->
                   <div class="flex items-center gap-3 p-2.5 rounded-xl border" style="background: #131b26; border-color: #1f2937;">
                      <div class="w-7 h-7 rounded-full flex items-center justify-center text-[#d4af37]" style="background: #1c2736;">
                         <i class="fa-solid fa-gas-pump text-[11px]"></i>
                      </div>
                      <span class="text-[10px] font-black text-gray-300 uppercase tracking-wider">\${car.fuel_type || 'Petrol'}</span>
                   </div>
                   <!-- Spec 3 -->
                   <div class="flex items-center gap-3 p-2.5 rounded-xl border" style="background: #131b26; border-color: #1f2937;">
                      <div class="w-7 h-7 rounded-full flex items-center justify-center text-[#d4af37]" style="background: #1c2736;">
                         <i class="fa-solid fa-user text-[11px]"></i>
                      </div>
                      <span class="text-[10px] font-black text-gray-300 uppercase tracking-wider">\${car.fuel_type === 'CNG' ? '4 Seats' : '5 Seats'}</span>
                   </div>
                   <!-- Spec 4 -->
                   <div class="flex items-center gap-3 p-2.5 rounded-xl border" style="background: #131b26; border-color: #1f2937;">
                      <div class="w-7 h-7 rounded-full flex items-center justify-center text-[#d4af37]" style="background: #1c2736;">
                         <i class="fa-solid fa-gauge-high text-[11px]"></i>
                      </div>
                      <span class="text-[10px] font-black text-gray-300 uppercase tracking-wider">Unltd KM</span>
                   </div>
                </div>

                <!-- Action Button -->
                <button onclick="initiateBooking('\${car.id}', '\${car.name.replace(/'/g, '&apos;')}', '\${car.rent_per_hour}', '\${car.image_url}')" 
                   class="w-full mt-auto py-4 rounded-xl font-bold tracking-widest uppercase text-xs transition-all duration-300 text-black shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2" 
                   style="background: linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%);">
                   Confirm Booking <i class="fa-solid fa-arrow-right"></i>
                </button>
             </div>
          </div>
`;

const fontAwesomeCDN = \`\\n<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">\\n\`;

targetFiles.forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');
    
    // Inject FontAwesome if missing
    if (!content.includes('font-awesome')) {
        content = content.replace('</head>', fontAwesomeCDN + '</head>');
        console.log("Injected FontAwesome CDN into " + f);
    }
    
    // Pattern to catch the specific dynamic loader array pushing html into container
    const pattern = /container\.innerHTML \+\= \`[\s\S]*?<\/div>\`;/g;
    
    let modified = false;
    if (content.match(pattern)) {
        content = content.replace(pattern, "container.innerHTML += `" + newCardTemplate + "`;");
        modified = true;
    }
    
    // Also strip the old inline .car-card CSS so it doesn't conflict with our utility classes
    const oldCssPattern = /\.car-card\{[^}]+\}/g;
    if (content.match(oldCssPattern)) {
        content = content.replace(oldCssPattern, '/* removed old css */');
    }

    if (modified) {
        fs.writeFileSync(f, content, 'utf8');
        console.log("Two-Tone Premium Design deployed to: " + f);
    } else {
        console.log("Regex failed to match template structure in " + f);
    }
});
