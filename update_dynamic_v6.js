const fs = require('fs');
const file = 'c:\\Users\\ADMIN\\OneDrive\\Desktop\\RideON\\home.html';
let content = fs.readFileSync(file, 'utf8');

const staticFleetStr = `
  async function loadDynamicFleet() {
      const container = document.getElementById("dynamicFleetContainer");
      if(!container) return;
      
      // Override grid template to exactly 3 cols
      container.className = "max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 text-left";

      const html = \`
          <!-- Category 1: Economy -->
          <div class="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl group flex flex-col cursor-pointer" onclick="window.location.href='economy.html'">
              <div class="relative w-full overflow-hidden bg-gray-100" style="height: 280px;">
                  <img src="eco/ECONOMY1.jpg" alt="Economy Cars" class="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-110">
                  <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 opacity-90 transition-opacity duration-500 group-hover:opacity-100">
                      <h3 class="text-4xl font-bold drop-shadow-lg tracking-wide text-white transform transition-transform duration-500 group-hover:-translate-y-1" style="font-family:'Cinzel', serif;">Economy</h3>
                      <p class="text-xs font-bold tracking-[0.2em] uppercase mt-2 transform transition-transform duration-500 group-hover:-translate-y-1 opacity-90" style="color: #d4af37;">Smart • Efficient</p>
                  </div>
              </div>
              <div class="p-8 flex flex-col flex-grow bg-white relative z-10">
                  <p class="text-gray-500 mb-8 text-[15px] flex-grow leading-relaxed">Affordable, reliable, and comfortable vehicles perfectly suited for daily commutes and budget-friendly road trips.</p>
                  <a href="economy.html" class="w-full py-4 rounded-xl text-white font-bold text-center shadow-md transform transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl flex items-center justify-center gap-3" style="background-color: #0c1824;">
                      Book Economy <i class="fa-solid fa-arrow-right"></i>
                  </a>
              </div>
          </div>

          <!-- Category 2: Luxury -->
          <div class="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl group flex flex-col cursor-pointer" onclick="window.location.href='luxury.html'">
              <div class="relative w-full overflow-hidden bg-gray-100" style="height: 280px;">
                  <img src="lux/bmw3.jpeg" alt="Luxury Cars" class="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-110">
                  <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 opacity-90 transition-opacity duration-500 group-hover:opacity-100">
                      <h3 class="text-4xl font-bold drop-shadow-lg tracking-wide text-white transform transition-transform duration-500 group-hover:-translate-y-1" style="font-family:'Cinzel', serif;">Luxury</h3>
                      <p class="text-xs font-bold tracking-[0.2em] uppercase mt-2 transform transition-transform duration-500 group-hover:-translate-y-1 opacity-90" style="color: #d4af37;">Premium • Elegant</p>
                  </div>
              </div>
              <div class="p-8 flex flex-col flex-grow bg-white relative z-10">
                  <p class="text-gray-500 mb-8 text-[15px] flex-grow leading-relaxed">Experience ultimate comfort and status with our hand-picked selection of high-end luxury vehicles and premium sedans.</p>
                  <a href="luxury.html" class="w-full py-4 rounded-xl text-white font-bold text-center shadow-md transform transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl flex items-center justify-center gap-3" style="background-color: #0c1824;">
                      Book Luxury <i class="fa-solid fa-arrow-right"></i>
                  </a>
              </div>
          </div>

          <!-- Category 3: Electric -->
          <div class="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl group flex flex-col cursor-pointer" onclick="window.location.href='electric.html'">
              <div class="relative w-full overflow-hidden bg-gray-100" style="height: 280px;">
                  <img src="ecar/EV.jpg" alt="Electric Cars" class="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-110">
                  <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 opacity-90 transition-opacity duration-500 group-hover:opacity-100">
                      <h3 class="text-4xl font-bold drop-shadow-lg tracking-wide text-white transform transition-transform duration-500 group-hover:-translate-y-1" style="font-family:'Cinzel', serif;">Electric</h3>
                      <p class="text-xs font-bold tracking-[0.2em] uppercase mt-2 transform transition-transform duration-500 group-hover:-translate-y-1 opacity-90" style="color: #d4af37;">Green • Silent</p>
                  </div>
              </div>
              <div class="p-8 flex flex-col flex-grow bg-white relative z-10">
                  <p class="text-gray-500 mb-8 text-[15px] flex-grow leading-relaxed">Embrace the future of driving with ultra-silent, incredibly fast, and zero-emission electric vehicles.</p>
                  <a href="electric.html" class="w-full py-4 rounded-xl text-white font-bold text-center shadow-md transform transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl flex items-center justify-center gap-3" style="background-color: #0c1824;">
                      Book Electric <i class="fa-solid fa-arrow-right"></i>
                  </a>
              </div>
          </div>
      \`;
      
      container.innerHTML = html;
  }`;

content = content.replace(/async function loadDynamicFleet\(\) \{[\s\S]*?container\.innerHTML = html;\n      \} catch \(err\) \{[\s\S]*?\}\n  \}/m, staticFleetStr);

fs.writeFileSync(file, content, 'utf8');
console.log("Fleet Template rebuilt to strict 3-card category layout.");
