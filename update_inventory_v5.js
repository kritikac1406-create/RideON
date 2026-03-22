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
          <div class="car-card bg-[#0a1017] rounded-[32px] overflow-hidden shadow-2xl border flex flex-col group relative transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]" 
               style="border-color: #1f2937;"
               data-name="\${car.name}" 
               data-brand="\${car.brand}" 
               data-fuel="\${car.fuel_type}" 
               data-transmission="\${car.transmission}" 
               data-price="\${car.rent_per_hour}">

             <!-- TOP IMAGE SECTION -->
             <div class="w-full relative p-6 flex flex-col items-center justify-center border-b" style="height: 260px; background-color: #ffffff; border-color: #f3f4f6;">
                
                <div class="absolute top-5 right-5 bg-[#0a1017] text-white px-5 py-2.5 rounded-2xl text-sm font-black shadow-lg border z-20" style="border-color: #1f2937;">
                   ₹\${car.rent_per_hour} <span class="text-gray-400 font-bold text-[10px] tracking-widest uppercase ml-1">/hr</span>
                </div>

                 <div class="absolute top-5 left-5 z-20">
                   <span class="text-black px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase shadow-md" style="background: linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%);">
                     \${car.rent_per_hour < 1000 ? 'Best Value' : 'Premium'}
                   </span>
                </div>

                <img src="\${car.image_url}" class="w-full h-full object-contain relative z-10 transform group-hover:scale-105 transition-transform duration-700 ease-in-out" onerror="this.src='https://via.placeholder.com/400x200?text=No+Image'">
             </div>

             <!-- BOTTOM CONTENT SECTION -->
             <div class="p-8 flex flex-col flex-grow relative bg-[#0a1017]">
                <h3 class="text-3xl font-black text-white mb-2 tracking-tight" style="font-family: 'Inter', sans-serif;">\${car.name}</h3>
                <p class="text-xs font-bold tracking-[0.2em] text-[#d4af37] uppercase mb-8">\${car.brand || 'Luxury Class'}</p>

                <div class="grid grid-cols-2 gap-4 mb-8">
                   <div class="flex items-center gap-3 p-3 rounded-xl border" style="background: #131b26; border-color: #1f2937;">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-[#d4af37]" style="background: #1c2736;">
                         <i class="fa-solid fa-gears text-sm"></i>
                      </div>
                      <span class="text-[11px] font-black text-gray-300 uppercase tracking-wider">\${car.transmission || 'Auto'}</span>
                   </div>
                   <div class="flex items-center gap-3 p-3 rounded-xl border" style="background: #131b26; border-color: #1f2937;">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-[#d4af37]" style="background: #1c2736;">
                         <i class="fa-solid fa-gas-pump text-sm"></i>
                      </div>
                      <span class="text-[11px] font-black text-gray-300 uppercase tracking-wider">\${car.fuel_type || 'Petrol'}</span>
                   </div>
                   <div class="flex items-center gap-3 p-3 rounded-xl border" style="background: #131b26; border-color: #1f2937;">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-[#d4af37]" style="background: #1c2736;">
                         <i class="fa-solid fa-user text-sm"></i>
                      </div>
                      <span class="text-[11px] font-black text-gray-300 uppercase tracking-wider">\${car.fuel_type === 'CNG' ? '4 Seats' : '5 Seats'}</span>
                   </div>
                   <div class="flex items-center gap-3 p-3 rounded-xl border" style="background: #131b26; border-color: #1f2937;">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-[#d4af37]" style="background: #1c2736;">
                         <i class="fa-solid fa-gauge-high text-sm"></i>
                      </div>
                      <span class="text-[11px] font-black text-gray-300 uppercase tracking-wider">Unltd KM</span>
                   </div>
                </div>

                <button onclick="initiateBooking('\${car.id}', '\${car.name}', '\${car.rent_per_hour}', '\${car.image_url}')" 
                   class="w-full mt-auto py-5 rounded-xl font-black tracking-[0.2em] uppercase text-xs transition-all duration-300 text-black shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center justify-center gap-3" 
                   style="background: linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%);">
                   Select Vehicle <i class="fa-solid fa-arrow-right text-lg"></i>
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
        console.log("Deployed Split UI to " + f);
    }
});
