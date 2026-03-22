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
          <div class="car-card bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl p-4"
               data-name="\${car.name || ''}" 
               data-brand="\${car.brand || ''}" 
               data-fuel="\${car.fuel_type || ''}" 
               data-transmission="\${car.transmission || ''}" 
               data-price="\${car.rent_per_hour || 0}"
               data-availablefrom="\${car.availablefrom || car.available_from || ''}"
               data-availableto="\${car.availableto || car.available_to || ''}">

             <!-- Image Box -->
             <div class="w-full relative overflow-hidden group-hover:opacity-95 transition-opacity mb-4 bg-transparent border-none" style="height: 176px;">
                <img src="\${car.image_url}" class="w-full h-full object-contain relative z-10 transform group-hover:scale-105 transition-transform duration-500 ease-out p-1" onerror="this.src='https://via.placeholder.com/400x200?text=No+Image'">
             </div>

             <!-- Car Name -->
             <h3 class="text-xl font-extrabold text-gray-900 mb-4 tracking-tight" style="font-family: 'Cinzel', serif;">\${car.name}</h3>

             <!-- Specs Row -->
             <div class="flex flex-wrap items-center gap-3 mb-5">
                <!-- Fuel -->
                <div class="flex items-center gap-1.5 text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                   <div class="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600 shadow-sm">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                   </div>
                   <span class="font-bold uppercase tracking-wider" style="font-size: 10px;">\${car.fuel_type || 'Petrol'}</span>
                </div>
                
                <!-- Transmission -->
                <div class="flex items-center gap-1.5 text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                   <div class="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100 text-purple-600 shadow-sm">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287-.947c.886.539 2.042.06 2.287.947 1.561-.379 2.6-1.561 2.978 0a1.532 1.532 0 01-2.287-.947c1.372.836-.734-2.942-2.106-2.106a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 012.287.947zM10 13a3 3 0 100-6 3 3 0 000 6z"></path></svg>
                   </div>
                   <span class="font-bold uppercase tracking-wider" style="font-size: 10px;">\${car.transmission || 'Auto'}</span>
                </div>
             </div>

             <!-- Divider -->
             <div class="w-full h-px bg-gray-100 mb-5"></div>

             <!-- Bottom Row -->
             <div class="flex justify-between items-center mt-auto">
                <div class="flex flex-col flex-grow">
                   <p class="text-2xl font-black leading-none" style="color: #114b72;">
                      ₹\${car.rent_per_hour}<span class="font-bold text-gray-400 ml-1 tracking-wider uppercase" style="font-size: 11px;">/ hr</span>
                   </p>
                </div>

                <button onclick="initiateBooking('\${car.id}', '\${car.name.replace(/'/g, "&apos;")}', '\${car.rent_per_hour}', '\${car.image_url}')" 
                   class="px-6 py-2.5 rounded-lg font-black uppercase tracking-widest transition-all text-white shadow-md hover:shadow-lg hover:-translate-y-0.5" 
                   style="background-color: #114b72; font-size: 11px;">
                   Book
                </button>
             </div>
          </div>\`;
      });
`;

targetFiles.forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');

    const startAnchor = 'container.innerHTML = "";';
    const endAnchor = 'if (window.applyFilters)';
    
    if (content.includes(startAnchor) && content.includes(endAnchor)) {
        const p1 = content.split(startAnchor)[0];
        const p2 = content.split(endAnchor)[1];
        content = p1 + newCardTemplate + "      " + endAnchor + p2;
        fs.writeFileSync(f, content, 'utf8');
        console.log("Deployed V9 Patch Minimal UI to " + f);
    }
});
