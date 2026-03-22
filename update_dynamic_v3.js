const fs = require('fs');
const file = 'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\home.html';
let content = fs.readFileSync(file, 'utf8');

// Wipe the old loadDynamicOffers script completely
content = content.replace(/async function loadDynamicOffers\(\) \{[\s\S]*?async function loadDynamicFleet/m, `async function loadDynamicOffers() {
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
             <div class="relative w-full h-[400px] sm:h-[450px] rounded-2xl overflow-hidden offer-card transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] group cursor-pointer" onclick="window.location.href='\${link}'">
               
               <img src="\${offer.image_url}" class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105">
               <div class="absolute inset-0 bg-gradient-to-t from-[#0a2336] via-transparent to-transparent opacity-90 transition-opacity duration-500"></div>
               <div class="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/40 to-transparent"></div>
               
               <!-- Minimalist Badge -->
               <div class="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-left text-black shadow-lg flex items-center gap-2 transform transition-transform border border-white/50">
                 <span class="text-xl font-black text-[#114b72]">\${offer.discount || offer.discount_percent || 0}%</span>
                 <span class="text-[10px] font-bold tracking-widest uppercase text-gray-500">Off</span>
               </div>
               
               <!-- Content Area -->
               <div class="absolute bottom-6 left-6 right-6 text-left text-white z-20">
                 <p class="text-[11px] font-bold tracking-widest text-[#d4af37] mb-1 uppercase drop-shadow-sm">\${offer.category || 'Special Offer'}</p>
                 <h3 class="text-3xl font-bold mb-2 drop-shadow-md leading-tight" style="font-family:'Cinzel', serif;">\${offer.title}</h3>
                 <p class="text-sm text-gray-200 line-clamp-2 mb-5 font-light opacity-90">\${offer.description || 'Premium selection for your next journey'}</p>
                 
                 <!-- Animated Native Link -->
                 <div class="inline-flex items-center gap-2 text-sm font-bold text-white border-b border-transparent group-hover:border-[#d4af37] transition-all duration-300 pb-1 w-max">
                    <span class="tracking-wide">Explore Now</span>
                    <i class="fa-solid fa-arrow-right transform group-hover:translate-x-2 transition-transform text-[#d4af37]"></i>
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

  async function loadDynamicFleet`);

fs.writeFileSync(file, content, 'utf8');
console.log("Offer Template strictly rebuilt.");
