const fs = require('fs');

const file = 'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\home.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Replace static offers block
const offersRegex = /<div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">[\s\S]*?(?=<\/section>\s*(?:<section id="fleet"|<section class="py-16))|(<div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">[\s\S]*?(?=<\/section>\s*<section id="fleet"))/m;
content = content.replace(offersRegex, `
    <div id="dynamicOffersContainer" class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="col-span-3 text-gray-500 py-10">Loading live offers...</div>
    </div>
  `);

// 2. Replace static fleet block
const fleetRegex = /<div class="relative w-full max-w-4xl mx-auto overflow-hidden">[\s\S]*?(?=<\/section>[\s]*<!-- ABOUT -->)/m;
content = content.replace(fleetRegex, `
      <div id="dynamicFleetContainer" class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 text-left">
          <div class="col-span-4 text-center text-gray-500 py-10">Loading latest fleet...</div>
      </div>
    </div>
  `);

content = content.replace(/\s*<!--\s*Leaflet JS \(keep this normal\)\s*-->/g, `
<script>
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
              container.innerHTML = '<div class="col-span-3 text-gray-500">No active offers.</div>';
              return;
          }
          
          let html = '';
          data.forEach(offer => {
             // Link sanitization per user request
             let link = offer.link_url || '#';
             let linkText = "Explore Now";
             if (link.includes('ecopop')) link = 'economy.html';
             if (link.includes('luxpopup')) link = 'luxury.html';
             if (link.includes('elecpopup')) link = 'electric.html';
             if (link === '#') linkText = 'View Offer';

             html += \`
             <div class="relative w-full h-[420px] rounded-xl overflow-hidden offer-card transform transition-transform hover:-translate-y-2">
               <img src="\${offer.image_url}" class="w-full h-full object-cover transition-transform duration-[1.5s] hover:scale-110">
               <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
               
               <div class="absolute top-6 left-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md border border-white border-opacity-50 px-4 py-3 rounded-xl text-left text-white shadow-xl transform transition-transform hover:scale-105">
                 <p class="text-xs font-semibold tracking-wider opacity-90 drop-shadow-md">UP TO</p>
                 <p class="text-4xl font-black drop-shadow-xl">\${offer.discount_percent}%</p>
                 <p class="text-sm font-bold tracking-widest drop-shadow-md">DISCOUNT</p>
               </div>
               
               <div class="absolute bottom-6 left-6 text-left text-white drop-shadow-lg z-20">
                 <h3 class="text-3xl font-extrabold mb-1" style="font-family:'Cinzel', serif;">\${offer.title}</h3>
                 <p class="text-md text-gray-200 mb-4 opacity-90">\${offer.description}</p>
                 <a href="\${link}"
                    class="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full font-bold shadow-[0_10px_20px_rgba(220,38,38,0.4)] hover:shadow-[0_15px_30px_rgba(220,38,38,0.6)] transform hover:-translate-y-1 transition duration-300">
                    \${linkText} <i class="ml-2 fa-solid fa-arrow-right"></i>
                 </a>
               </div>
             </div>\`;
          });
          container.innerHTML = html;
      } catch (err) {
          console.error("Error loading offers:", err);
          container.innerHTML = '<div class="col-span-3 text-red-500">Failed to load offers.</div>';
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
              container.innerHTML = '<div class="col-span-4 text-center text-gray-500">No cars available.</div>';
              return;
          }
          
          let html = '';
          data.forEach(car => {
             html += \`
             <div class="bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-5 flex flex-col justify-between hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition transform duration-300 hover:-translate-y-2 border border-gray-100 relative group overflow-hidden">
                 <div class="h-44 rounded-lg overflow-hidden mb-4 bg-gray-50 flex items-center justify-center relative">
                     <img src="\${car.image_url}" alt="\${car.name}" class="object-cover h-full w-full group-hover:scale-110 transition-transform duration-[1.5s] ease-out">
                     <div class="absolute top-2 right-2 bg-black bg-opacity-80 text-white text-xs font-bold px-2 py-1 rounded border border-gray-600">\${car.category || 'Premium'}</div>
                 </div>
                 <h3 class="font-bold text-xl text-[#33450d] tracking-tight">\${car.name}</h3>
                 <p class="text-[13px] text-gray-400 mb-3 uppercase tracking-wider">\${car.brand || 'Luxury'} • \${car.fuel_type || 'Petrol'}</p>
                 <div class="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                     <div class="flex flex-col">
                       <span class="text-xs text-gray-400">Starting from</span>
                       <span class="text-green-700 font-extrabold text-lg">₹\${car.rent_per_hour}<span class="text-sm font-normal text-gray-500">/hr</span></span>
                     </div>
                     <button onclick="localStorage.setItem('selectedCarId', '\${car.id}'); localStorage.setItem('selectedCarName', '\${car.name.replace(/'/g, "\\\\\\'")}'); localStorage.setItem('selectedCarPrice', '\${car.rent_per_hour}'); localStorage.setItem('selectedCarImage', '\${car.image_url}'); window.location.href='booking.html';" 
                        class="px-5 py-2.5 bg-[#114b72] text-white rounded-lg font-bold shadow-lg shadow-blue-900/30 hover:bg-[#0d3b5a] hover:shadow-blue-900/50 transform hover:-translate-y-1 transition duration-300 text-sm">
                        Book
                     </button>
                 </div>
             </div>\`;
          });
          container.innerHTML = html;
      } catch (err) {
          console.error("Error loading fleet:", err);
          container.innerHTML = '<div class="col-span-4 text-center text-red-500">Failed to load fleet.</div>';
      }
  }

  loadDynamicOffers();
  loadDynamicFleet();
</script>
  <!-- Leaflet JS (keep this normal) -->
`);

fs.writeFileSync(file, content, 'utf8');
console.log("Patched dynamic modules successfully.");
