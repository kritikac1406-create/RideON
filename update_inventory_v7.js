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
          <div class="car-card bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col group relative transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-4"
               data-name="\${car.name}" 
               data-brand="\${car.brand}" 
               data-fuel="\${car.fuel_type}" 
               data-transmission="\${car.transmission}" 
               data-price="\${car.rent_per_hour}">

             <!-- Image Box -->
             <div class="w-full h-44 relative overflow-hidden group-hover:opacity-90 transition-opacity mb-4 bg-transparent border-none">
                <img src="\${car.image_url}" class="w-full h-full object-contain relative z-10 transform group-hover:scale-105 transition-transform duration-500 ease-out p-1" onerror="this.src='https://via.placeholder.com/400x200?text=No+Image'">
             </div>

             <!-- Car Name -->
             <h3 class="text-xl font-extrabold text-gray-900 mb-4 tracking-tight" style="font-family: 'Cinzel', serif;">\${car.name}</h3>

             <!-- Specs Row -->
             <div class="flex items-center gap-4 mb-5">
                <!-- Fuel -->
                <div class="flex items-center gap-1.5 text-gray-700">
                   <div class="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600 shadow-sm">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                   </div>
                   <span class="text-[10px] font-bold uppercase tracking-widest">\${car.fuel_type || 'Petrol'}</span>
                </div>
                
                <!-- Transmission -->
                <div class="flex items-center gap-1.5 text-gray-700">
                   <div class="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100 text-purple-600 shadow-sm">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                   </div>
                   <span class="text-[10px] font-bold uppercase tracking-widest">\${car.transmission || 'Auto'}</span>
                </div>
                
                <!-- KM -->
                <div class="flex items-center gap-1.5 text-gray-700">
                   <div class="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center border border-green-100 text-green-600 shadow-sm">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                   </div>
                   <span class="text-[10px] font-bold uppercase tracking-widest">Unltd KM</span>
                </div>
             </div>

             <!-- Divider -->
             <div class="w-full h-px bg-gray-100 mb-5"></div>

             <!-- Bottom Row -->
             <div class="flex justify-between items-center mt-auto">
                <p class="text-2xl font-black text-[#114b72] leading-none">
                   ₹\${car.rent_per_hour}<span class="text-[11px] font-bold text-gray-400 ml-1 tracking-wider uppercase">/ hr</span>
                </p>

                <button onclick="initiateBooking('\${car.id}', '\${car.name}', '\${car.rent_per_hour}', '\${car.image_url}')" 
                   class="px-6 py-2.5 rounded-lg font-black uppercase text-[10px] tracking-widest transition-all duration-300 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5" 
                   style="background-color: #114b72;">
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
        console.log("Deployed Pure Minimal UI to " + f);
    }
});
