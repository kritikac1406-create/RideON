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
          <div class="car-card bg-white rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col group relative transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] p-5"
               data-name="\${car.name}" 
               data-brand="\${car.brand}" 
               data-fuel="\${car.fuel_type}" 
               data-transmission="\${car.transmission}" 
               data-price="\${car.rent_per_hour}">

             <!-- 1. Small Container with Car Picture -->
             <div class="w-full h-44 bg-gray-50 rounded-[16px] flex items-center justify-center p-4 mb-6 relative overflow-hidden group-hover:bg-gray-100/50 transition-colors border border-gray-100">
                <img src="\${car.image_url}" class="w-full h-full object-contain relative z-10 transform group-hover:scale-110 transition-transform duration-500 ease-out" onerror="this.src='https://via.placeholder.com/400x200?text=No+Image'">
                
                <!-- Tiny Brand Badge -->
                <div class="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase text-gray-500 shadow-sm border border-gray-100 z-20">
                   \${car.brand || 'Class'}
                </div>
             </div>

             <!-- 2. Car Name -->
             <h3 class="text-2xl font-black text-gray-900 mb-5 tracking-tight leading-tight">\${car.name}</h3>

             <!-- 3. Fuel & Gear Row -->
             <div class="flex items-center gap-5 mb-6">
                <!-- Petrol/CNG -->
                <div class="flex items-center gap-2 text-gray-700">
                   <div class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                      <i class="fa-solid fa-gas-pump text-xs"></i>
                   </div>
                   <span class="text-xs font-bold uppercase tracking-wide">\${car.fuel_type || 'Petrol'}</span>
                </div>
                
                <!-- Transmission -->
                <div class="flex items-center gap-2 text-gray-700">
                   <div class="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
                      <i class="fa-solid fa-gears text-xs"></i>
                   </div>
                   <span class="text-xs font-bold uppercase tracking-wide">\${car.transmission || 'Auto'}</span>
                </div>
             </div>

             <!-- Divider -->
             <div class="w-full h-px bg-gray-100 mb-6"></div>

             <!-- 4 & 5. Bottom Row: Left (Price & KM) / Right (Button) -->
             <div class="flex justify-between items-end mt-auto gap-4">
                
                <!-- Left Side: Price & KM -->
                <div class="flex flex-col">
                   <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5"><i class="fa-solid fa-road mr-1.5 text-gray-300"></i>Unlimited KM</p>
                   <p class="text-[28px] font-black text-[#114b72] leading-none">
                      ₹\${car.rent_per_hour}<span class="text-sm font-bold text-gray-400 ml-1">/ hr</span>
                   </p>
                </div>

                <!-- Right Side: Book Button -->
                <button onclick="initiateBooking('\${car.id}', '\${car.name}', '\${car.rent_per_hour}', '\${car.image_url}')" 
                   class="px-6 py-3.5 rounded-xl font-black uppercase text-xs tracking-wider transition-all duration-300 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-[#0a2336] flex-shrink-0" 
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
        console.log("Deployed Minimal Bright UI to " + f);
    }
});
