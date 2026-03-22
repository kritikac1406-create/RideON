const fs = require('fs');

const targetFiles = [
    'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\economy.html',
    'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\luxury.html',
    'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\electric.html'
];

const newCardTemplate = `
      container.innerHTML = "";
      data.forEach(car => {
          container.innerHTML += \`
          <div class="car-card bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl p-5 w-full flex-grow" style="min-width: 300px; max-width: 420px; box-sizing: border-box;"
               data-name="\${car.name || ''}" 
               data-brand="\${car.brand || ''}" 
               data-fuel="\${car.fuel_type || ''}" 
               data-transmission="\${car.transmission || ''}" 
               data-price="\${car.rent_per_hour || 0}">

             <!-- Image Box -->
             <div class="w-full relative overflow-hidden group-hover:opacity-95 transition-opacity mb-4 bg-transparent border-none flex items-end justify-center" style="height: 180px;">
                <img src="\${car.image_url}" class="w-full h-full object-contain relative z-10 transform group-hover:scale-105 transition-transform duration-500 ease-out p-1" style="object-position: center bottom;" onerror="this.src='https://via.placeholder.com/400x200?text=No+Image'">
             </div>

             <!-- Car Name -->
             <h3 class="text-xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight w-full" style="font-family: 'Cinzel', serif;">\${car.name}</h3>

             <!-- Specs Row -->
             <div class="flex flex-wrap items-center gap-3 mb-6">
                <!-- Fuel -->
                <div class="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 flex-shrink-0">
                   <div class="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600 shadow-sm flex-shrink-0">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                   </div>
                   <span class="font-bold uppercase tracking-wider" style="font-size: 11px;">\${car.fuel_type || 'Petrol'}</span>
                </div>
                
                <!-- Transmission -->
                <div class="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 flex-shrink-0">
                   <div class="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100 text-purple-600 shadow-sm flex-shrink-0">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287-.947c.886.539 2.042.06 2.287.947 1.561-.379 2.6-1.561 2.978 0a1.532 1.532 0 01-2.287-.947c1.372.836-.734-2.942-2.106-2.106a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 012.287.947zM10 13a3 3 0 100-6 3 3 0 000 6z"></path></svg>
                   </div>
                   <span class="font-bold uppercase tracking-wider" style="font-size: 11px;">\${car.transmission || 'Auto'}</span>
                </div>
             </div>

             <!-- Locked Bottom Wrapper (Pushes everything below strictly to the bottom line regardless of Title lengths) -->
             <div class="mt-auto w-full pt-4">
                 <!-- Divider -->
                 <div class="w-full h-px bg-gray-100 mb-5"></div>

                 <!-- Bottom Row -->
                 <div class="flex justify-between items-center w-full">
                    <p class="text-[26px] font-black leading-none uppercase text-[#114b72] flex items-baseline tracking-tight">
                       ₹\${car.rent_per_hour}<span class="font-bold text-gray-400 ml-1.5 tracking-widest text-[#888]" style="font-size: 12px;"> / hr</span>
                    </p>

                    <button onclick="initiateBooking('\${car.id}', '\${car.name.replace(/'/g, "&apos;")}', '\${car.rent_per_hour}', '\${car.image_url}')" 
                       class="px-7 py-3 rounded-lg font-black uppercase tracking-[0.1em] transition-all text-white shadow hover:shadow-xl hover:-translate-y-1 flex-shrink-0" 
                       style="background-color: #114b72; font-size: 12px;">
                       Book
                    </button>
                 </div>
             </div>
          </div>\`;
      });
`;

targetFiles.forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');

    // 1. Inject the rigid HTML Template
    const startAnchor = 'container.innerHTML = "";';
    const endAnchor = 'if (window.applyFilters) window.applyFilters();';
    
    // Safely extract boundaries across varied regex destruction footprints
    const startIndex = content.indexOf(startAnchor);
    const endIndex = content.indexOf(endAnchor, startIndex);
    
    if (startIndex !== -1 && endIndex !== -1) {
        content = content.substring(0, startIndex + startAnchor.length) + "\\n" + newCardTemplate + "\\n      " + content.substring(endIndex);
    }
    
    // 2. Patch the Grid Layout natively into Flex-Wrap
    // Overriding the flawed nested strict grid that forced empty tracks
    const flexOverride = `class="flex flex-wrap items-stretch justify-start w-full gap-8 pb-12 w-full" style="align-content: flex-start"`;
    content = content.replace(/class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[^"]+"/g, flexOverride);
    content = content.replace(/class="grid grid-cols-3 gap-[^"]+"/g, flexOverride);

    fs.writeFileSync(f, content, 'utf8');
    console.log("Deployed V12 Vertical Bounding Box Patch to " + f);
});
