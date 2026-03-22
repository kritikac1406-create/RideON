const fs = require('fs');
const file = 'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\home.html';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/<script id="dynamic-loader">[\s\S]*?<\/script>/, "");
// Remove any stray old function
content = content.replace(/<script>\s*async function loadDynamicOffers\(\)[\s\S]*?<\/script>/g, "");

const jsPayload = `
<script id="dynamic-loader">
  async function loadDynamicOffers() {
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
             <div class="relative w-full aspect-square rounded-[2rem] overflow-hidden offer-card transform transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] group cursor-pointer" onclick="window.location.href='\${link}'">
               
               <img src="\${offer.image_url}" class="w-full h-full object-cover transition-transform duration-[2s] ease-in-out group-hover:scale-110">
               <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
               
               <!-- Glassmorphism Badge -->
               <div class="absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl text-left text-white shadow-xl transform transition-transform duration-500 group-hover:scale-105 group-hover:bg-white/20">
                 <p class="text-xs font-bold tracking-[0.2em] opacity-80 mb-1">UP TO</p>
                 <p class="text-5xl font-black drop-shadow-2xl">\${offer.discount || offer.discount_percent || 0}%</p>
                 <p class="text-[10px] font-bold tracking-widest opacity-80 mt-1">DISCOUNT</p>
               </div>
               
               <!-- Content Area -->
               <div class="absolute bottom-8 left-8 right-8 text-left text-white z-20 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                 <h3 class="text-3xl font-bold mb-2 tracking-wide drop-shadow-lg" style="font-family:'Cinzel', serif;">\${offer.title}</h3>
                 <p class="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2 mb-6">\${offer.description || 'Premium selection for your next journey'}</p>
                 
                 <!-- Animated Button -->
                 <div class="inline-flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-bold shadow-2xl transform transition-transform hover:scale-105">
                    <span>Explore \${(offer.category || 'Now').charAt(0).toUpperCase() + (offer.category || 'Now').slice(1)}</span>
                    <i class="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                 </div>
               </div>

             </div>\`;
          });
          container.innerHTML = html;
      } catch (err) {
          console.error("Error loading offers:", err);
          container.innerHTML = '<div class="col-span-3 text-red-500 py-10">Failed to load offers.</div>';
      }
  }

  async function loadDynamicFleet() {
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
             <div class="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-5 flex flex-col justify-between hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 border border-gray-100/50 group">
                 <div class="h-48 rounded-2xl overflow-hidden mb-5 bg-gray-50 flex items-center justify-center relative">
                     <img src="\${car.image_url}" alt="\${car.name}" class="object-cover h-full w-full group-hover:scale-110 transition-transform duration-[1.5s] ease-out">
                     <div class="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10">\${car.category || 'Premium'}</div>
                 </div>
                 <h3 class="font-bold text-xl text-gray-900 tracking-tight mb-1">\${car.name}</h3>
                 <p class="text-xs text-gray-500 mb-4 uppercase tracking-widest font-semibold">\${car.brand || 'Luxury'} <span class="mx-1">•</span> \${car.fuel_type || 'Petrol'}</p>
                 <div class="flex justify-between items-end mt-auto pt-4 border-t border-gray-100">
                     <div class="flex flex-col">
                       <span class="text-[10px] text-gray-400 font-bold tracking-wider uppercase mb-1">Starting from</span>
                       <span class="text-green-600 font-black text-xl leading-none">₹\${car.rent_per_hour}<span class="text-xs font-bold text-gray-400 ml-1">/hr</span></span>
                     </div>
                     <button onclick="localStorage.setItem('selectedCarId', '\${car.id}'); localStorage.setItem('selectedCarName', '\${car.name.replace(/'/g, "\\\\\\'")}'); localStorage.setItem('selectedCarPrice', '\${car.rent_per_hour}'); localStorage.setItem('selectedCarImage', '\${car.image_url}'); window.location.href='booking.html';" 
                        class="px-5 py-2.5 bg-black text-white rounded-xl font-bold hover:bg-gray-800 shadow-xl shadow-black/20 transform hover:-translate-y-1 transition duration-300 text-sm">
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
  }

  loadDynamicOffers();
  loadDynamicFleet();
</script>`;

content = content.replace("</body>", jsPayload + "\n</body>");
fs.writeFileSync(file, content, 'utf8');
console.log("Successfully appended custom JS loader");
