const fs = require('fs');
const file = 'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\home.html';
let content = fs.readFileSync(file, 'utf8');

const loadDynamicOffersStr = `async function loadDynamicOffers() {
      const container = document.getElementById("dynamicOffersContainer");
      if(!container) return;
      try {
          const { data, error } = await supabaseClient
              .from('offers')
              .select('*')
              .order('created_at', { ascending: false });
          if(error) throw error;
          
          if(!data || data.length === 0) {
              container.innerHTML = '<div class="col-span-3 text-gray-500 py-10">No active offers running currently.</div>';
              return;
          }
          
          let html = '';
          data.forEach(offer => {
             // Link sanitization directly from DB Category
             let link = '#';
             if (offer.category === 'economy') link = 'economy.html';
             else if (offer.category === 'luxury') link = 'luxury.html';
             else if (offer.category === 'electric') link = 'electric.html';

             html += \`
             <div class="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group cursor-pointer flex flex-col" onclick="window.location.href='\${link}'">
               
               <!-- Top Image Section -->
               <div class="relative w-full overflow-hidden flex-shrink-0" style="height: 240px;">
                 <img src="\${offer.image_url}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105">
                 
                 <!-- Top Left Discount Badge -->
                 <div class="absolute top-4 left-4 bg-white bg-opacity-95 px-4 py-2 rounded-xl text-left shadow-lg flex items-center gap-1 border border-white border-opacity-60">
                   <span class="text-xl font-black text-gray-900">\${offer.discount || offer.discount_percent || 0}%</span>
                   <span class="text-xs font-bold tracking-widest uppercase text-gray-500 mt-1">Off</span>
                 </div>
               </div>
               
               <!-- Bottom Content Section -->
               <div class="p-6 flex flex-col flex-grow relative bg-white z-10 text-center md:text-left">
                 <p class="text-xs font-bold tracking-widest mb-2 uppercase" style="color: #d4af37;">\${offer.category || 'Special Offer'}</p>
                 <h3 class="text-2xl font-bold mb-3 text-gray-900 leading-tight" style="font-family:'Cinzel', serif;">\${offer.title}</h3>
                 <p class="text-sm text-gray-500 mb-6 font-light flex-grow" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">\${offer.description || 'Premium selection for your next journey'}</p>
                 
                 <!-- Bottom Explore Button Row -->
                 <div class="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
                    <span class="font-bold text-sm tracking-wide text-gray-800 transition-colors">Explore \${(offer.category || 'Now').charAt(0).toUpperCase() + (offer.category || 'Now').slice(1)}</span>
                    <div class="w-10 h-10 rounded-full text-white flex items-center justify-center shadow-md transform group-hover:translate-x-2 transition-all duration-300" style="background-color: #0c1824;">
                      <i class="fa-solid fa-arrow-right text-sm"></i>
                    </div>
                 </div>
               </div>

             </div>\`;
          });
          container.innerHTML = html;
      } catch (err) {
          console.error("Error loading offers:", err);
          container.innerHTML = '<div class="col-span-3 text-red-500 py-10">Failed to load offers.</div>';
      }
  }`;

const loadDynamicFleetStr = `async function loadDynamicFleet() {
      const container = document.getElementById("dynamicFleetContainer");
      if(!container) return;
      try {
          const { data, error } = await supabaseClient
              .from('cars')
              .select('*')
              .order('created_at', { ascending: false })
              .limit(8);
          if(error) throw error;
          
          if(!data || data.length === 0) {
              container.innerHTML = '<div class="col-span-4 text-center text-gray-500 py-10">No cars available.</div>';
              return;
          }
          
          let html = '';
          data.forEach(car => {
             html += \`
             <div class="bg-white rounded-3xl shadow-md p-5 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group cursor-pointer relative">
                 <div class="h-48 rounded-2xl overflow-hidden mb-5 bg-gray-50 flex items-center justify-center relative">
                     <img src="\${car.image_url}" alt="\${car.name}" class="object-cover h-full w-full transform group-hover:scale-110 transition-transform duration-700 ease-out">
                     <div class="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white border-opacity-20" style="background-color: rgba(0,0,0,0.8);">\${car.category || 'Premium'}</div>
                 </div>
                 <h3 class="font-bold text-xl text-gray-900 tracking-tight mb-1">\${car.name}</h3>
                 <p class="text-xs text-gray-500 mb-4 uppercase tracking-widest font-semibold">\${car.brand || 'Luxury'} • \${car.fuel_type || 'Petrol'}</p>
                 <div class="flex justify-between items-end mt-auto pt-4 border-t border-gray-100">
                     <div class="flex flex-col">
                       <span class="text-xs text-gray-400 font-bold tracking-wider uppercase mb-1">Starting from</span>
                       <span class="text-green-600 font-extrabold text-xl leading-none">₹\${car.rent_per_hour}<span class="text-xs font-bold text-gray-400 ml-1">/hr</span></span>
                     </div>
                     <button onclick="localStorage.setItem('selectedCarId', '\${car.id}'); localStorage.setItem('selectedCarName', '\${car.name.replace(/'/g, "\\\\\\'")}'); localStorage.setItem('selectedCarPrice', '\${car.rent_per_hour}'); localStorage.setItem('selectedCarImage', '\${car.image_url}'); window.location.href='booking.html';" 
                        class="px-5 py-2.5 text-white rounded-xl font-bold shadow-lg transform hover:-translate-y-1 transition duration-300 text-sm" style="background-color: #0c1824;">
                        Book Now
                     </button>
                 </div>
             </div>\`;
          });
          container.innerHTML = html;
      } catch (err) {
          console.error("Error loading fleet:", err);
          container.innerHTML = '<div class="col-span-4 text-center text-red-500 py-10">Failed to load fleet.</div>';
      }
  }`;

// Wipe both old functions completely safely
content = content.replace(/async function loadDynamicOffers\(\) \{[\s\S]*?async function loadDynamicFleet\(\) \{[\s\S]*?loadDynamicFleet\(\);/m, 
  loadDynamicOffersStr + '\n\n  ' + loadDynamicFleetStr + '\n\n  loadDynamicOffers();\n  loadDynamicFleet();');

fs.writeFileSync(file, content, 'utf8');
console.log("Safely retrofitted all JIT attributes into v2.2 CDN spec.");
