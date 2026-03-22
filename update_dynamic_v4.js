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
             <div class="bg-white rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-gray-100 transform transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] group cursor-pointer flex flex-col" onclick="window.location.href='\${link}'">
               
               <!-- Top Image Section -->
               <div class="relative w-full h-[240px] bg-gray-50 overflow-hidden flex-shrink-0">
                 <img src="\${offer.image_url}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110">
                 
                 <!-- Top Left Discount Badge -->
                 <div class="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-left shadow-lg flex items-center gap-1 border border-white/60">
                   <span class="text-xl font-black text-[#114b72]">\${offer.discount || offer.discount_percent || 0}%</span>
                   <span class="text-[10px] font-bold tracking-widest uppercase text-gray-500 mt-1">Off</span>
                 </div>
               </div>
               
               <!-- Bottom Content Section -->
               <div class="p-6 flex flex-col flex-grow relative bg-white z-10">
                 <p class="text-[10px] font-bold tracking-widest text-[#d4af37] mb-2 uppercase drop-shadow-sm">\${offer.category || 'Special Offer'}</p>
                 <h3 class="text-2xl font-bold mb-3 text-gray-900 leading-tight" style="font-family:'Cinzel', serif;">\${offer.title}</h3>
                 <p class="text-sm text-gray-500 line-clamp-2 mb-6 font-light flex-grow">\${offer.description || 'Premium selection for your next journey'}</p>
                 
                 <!-- Bottom Explore Button Row -->
                 <div class="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
                    <span class="text-[#114b72] font-bold text-sm tracking-wide group-hover:text-[#0a2336] transition-colors">Explore \${(offer.category || 'Now').charAt(0).toUpperCase() + (offer.category || 'Now').slice(1)}</span>
                    <div class="w-10 h-10 rounded-full bg-[#114b72] text-white flex items-center justify-center shadow-md transform group-hover:translate-x-2 group-hover:bg-[#0a2336] transition-all duration-300">
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

content = content.replace(/async function loadDynamicOffers\(\) \{[\s\S]*?async function loadDynamicFleet/m, loadDynamicOffersStr + '\n\n  async function loadDynamicFleet');

fs.writeFileSync(file, content, 'utf8');
console.log("Offer Template strictly rebuilt to split layout.");
