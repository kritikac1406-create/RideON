const fs = require('fs');

const targetFiles = [
    'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\economy.html',
    'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\luxury.html',
    'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\electric.html'
];

const newCardTemplate = `
          <div class="car-card relative group cursor-pointer border" 
               style="background: linear-gradient(180deg, #1f2022 0%, #080808 100%) !important; border-radius: 20px !important; padding: 24px !important; border-color: #2a2a2a !important; box-shadow: 0 15px 35px rgba(0,0,0,0.6) !important; transition: transform 0.3s ease, box-shadow 0.3s ease; overflow: hidden;"
               onmouseover="this.style.transform='translateY(-6px)'; this.style.boxShadow='0 25px 45px rgba(0,0,0,0.8)';"
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 15px 35px rgba(0,0,0,0.6)';"
               data-name="\${car.name}" 
               data-brand="\${car.brand}" 
               data-fuel="\${car.fuel_type}" 
               data-transmission="\${car.transmission}" 
               data-price="\${car.rent_per_hour}">
             
             <!-- Glow Effect -->
             <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#4a4a4a] to-transparent opacity-50"></div>

             <!-- Header Info -->
             <h2 class="font-extrabold text-2xl tracking-wide z-10 relative" style="color: #ffffff; font-family: 'Inter', sans-serif;">\${car.name}</h2>
             <div class="flex gap-2 mt-3 z-10 relative">
                 <span class="text-[9px] font-bold uppercase tracking-[0.1em] border rounded-full px-2.5 py-1" style="color: #a0a0a0; border-color: #444; background: rgba(255,255,255,0.03);">OR SIMILAR \${(car.brand||'Model').toUpperCase()}</span>
                 <span class="text-[9px] font-bold uppercase tracking-[0.1em] border rounded-full px-2.5 py-1" style="color: #d4af37; border-color: #6a581c; background: rgba(212,175,55,0.05);">\${car.rent_per_hour < 1000 ? 'BEST VALUE' : 'PREMIUM CLASS'}</span>
             </div>

             <!-- Vehicle Image perfectly Floating -->
             <div class="relative w-full h-56 my-6 flex items-center justify-center z-10">
                 <!-- Heavy Drop Shadow directly on the transparent car PNG -->
                 <img src="\${car.image_url}" class="w-full h-full object-contain filter" style="filter: drop-shadow(0 30px 20px rgba(0,0,0,0.9)); transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);" onmouseover="this.style.transform='scale(1.08)';" onmouseout="this.style.transform='scale(1)';" onerror="this.style.display='none'">
             </div>

             <!-- Price Section -->
             <div class="flex justify-between items-end mb-6 z-10 relative border-b pb-6" style="border-color: #222;">
                 <div>
                     <p class="text-[32px] font-black leading-none" style="color: #ffffff;">\${car.rent_per_hour}<span class="text-xs font-bold tracking-wider ml-1" style="color: #777;"> INR / HOUR</span></p>
                     <p class="text-[10px] mt-2 font-bold tracking-widest" style="color: #666;">\${car.rent_per_hour * 24} <span class="font-semibold" style="color: #aaa;">INR TOTAL PRICE / DAY</span></p>
                 </div>
                 <p class="text-[9px] font-black tracking-[0.15em] text-right" style="color: #555;">UNLIMITED<br>KM PER RENTAL</p>
             </div>

             <!-- Icons Row -->
             <div class="flex gap-2 mb-6 z-10 relative">
                 <div class="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-black" style="background: #111; color: #aaa; border: 1px solid #222;">
                     <i class="fa-solid fa-user" style="color: #666;"></i> \${car.fuel_type === 'CNG' ? '4' : '5'}
                 </div>
                 <div class="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-black" style="background: #111; color: #aaa; border: 1px solid #222;">
                     <i class="fa-solid fa-door-closed" style="color: #666;"></i> 4
                 </div>
                 <div class="flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-black uppercase whitespace-nowrap overflow-hidden text-ellipsis flex-grow justify-center" style="background: #111; color: #aaa; border: 1px solid #222;">
                     <i class="fa-solid fa-gears" style="color: #666;"></i> \${car.transmission || 'Auto'}
                 </div>
                 <div class="flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-black uppercase flex-grow justify-center" style="background: #111; color: #aaa; border: 1px solid #222;">
                     <i class="fa-solid fa-gas-pump" style="color: #666;"></i> \${(car.fuel_type || 'Petrol').substring(0,3)}
                 </div>
             </div>

             <!-- Booking Button -->
             <button onclick="initiateBooking('\${car.id}', '\${car.name.replace(/'/g, "\\\\'")}', '\${car.rent_per_hour}', '\${car.image_url}')" 
                 class="w-full py-4 rounded-xl font-black transition-all duration-300 text-xs tracking-[0.15em] uppercase shadow-lg hover:shadow-xl" 
                 style="background-color: #ffffff; color: #000000; transition: transform 0.2s; box-shadow: 0 4px 15px rgba(255,255,255,0.1);" 
                 onmouseover="this.style.backgroundColor='#e0e0e0'; this.style.transform='translateY(-2px)';" 
                 onmouseout="this.style.backgroundColor='#ffffff'; this.style.transform='translateY(0)';">
                 Select Vehicle
             </button>
          </div>
`;

targetFiles.forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');
    
    // Pattern to catch the specific dynamic loader array pushing html into container
    const pattern = /container\.innerHTML \+\= \`[\s\S]*?<\/div>\`;/g;
    
    if (content.match(pattern)) {
        content = content.replace(pattern, "container.innerHTML += `" + newCardTemplate + "`;");
        fs.writeFileSync(f, content, 'utf8');
        console.log("Dark Reference UI deployed to: " + f);
    } else {
        console.log("Regex failed to match template structure in " + f);
    }
});
