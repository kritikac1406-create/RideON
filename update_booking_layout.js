const fs = require('fs');

const file = 'c:\\\\Users\\\\ADMIN\\\\OneDrive\\\\Desktop\\\\RideON\\\\booking.html';
if (!fs.existsSync(file)) {
    console.error("booking.html not found");
    process.exit(1);
}
let content = fs.readFileSync(file, 'utf8');

const startAnchor = '<!-- Car preview -->';
const endAnchor = '<div id="toast"';

const startIndex = content.indexOf(startAnchor);
const endIndex = content.indexOf(endAnchor, startIndex);

if (startIndex === -1 || endIndex === -1) {
    console.error("Anchors not found");
    process.exit(1);
}

const newLayout = `<!-- Premium Split Layout Module -->
  <main class="max-w-[1400px] mx-auto px-4 lg:px-8 py-10 flex flex-col lg:flex-row gap-10">

    <!-- LEFT: Car Overview (Sticky) -->
    <aside class="w-full lg:w-[400px] flex flex-col gap-6 flex-shrink-0">
      <div class="sticky top-28 bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col transition-all duration-300">
        
        <!-- Image Area -->
        <div class="w-full bg-gray-50 flex items-center justify-center p-6 relative" style="height: 240px;">
           <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100/30"></div>
           <img id="carImg" class="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] transform transition duration-500 hover:scale-105" alt="car image" onerror="this.style.display='none'">
        </div>

        <!-- Details Area -->
        <div class="p-8">
           <h2 id="carName" class="text-[28px] font-black text-gray-900 tracking-tight" style="font-family: 'Cinzel', serif; line-height: 1.1;"></h2>
           <div id="plateWrap" class="mt-3"></div>
           
           <div class="w-full h-px bg-gray-100 my-6"></div>
           
           <div class="flex justify-between items-center mb-6">
              <span class="text-gray-500 font-bold tracking-widest uppercase text-xs">Hourly Rate</span>
              <p id="carPrice" class="text-xl font-black text-gray-900"></p>
           </div>
           
           <div class="bg-gradient-to-br from-[#EEF4FF] to-[#F8FAFF] rounded-2xl p-6 border border-[#D1E0FF] flex flex-col shadow-inner">
              <span class="text-[#114b72] font-black uppercase tracking-[0.15em] text-[10px] mb-2 opacity-80">Estimated Total</span>
              <span id="totalAmount" class="text-[42px] font-black text-[#114b72] leading-none drop-shadow-sm">₹0</span>
           </div>
        </div>
      </div>
    </aside>

    <!-- RIGHT: Booking Form -->
    <section class="w-full flex-grow">
      <div class="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-8 lg:p-12">
        
        <div class="mb-10 flex flex-col justify-start border-b border-gray-100 pb-6">
          <h2 class="text-3xl font-black text-gray-900 tracking-tight mb-2">Finalize Reservation</h2>
          <p class="text-gray-500 font-medium">Verify your details and routing coordinates below.</p>
        </div>

        <form id="bookingForm" class="space-y-8">
           
           <!-- Grid for Personal Info -->
           <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block mb-2 font-black text-gray-700 text-xs uppercase tracking-widest">Full Name <span class="text-red-500">*</span></label>
                <input id="fullName" type="text" required class="w-full border-2 border-gray-100 bg-gray-50/50 p-4 rounded-xl focus:border-[#114b72] focus:bg-white focus:ring-4 focus:ring-[#114b72]/10 transition-all font-semibold outline-none">
              </div>

              <div>
                <label class="block mb-2 font-black text-gray-700 text-xs uppercase tracking-widest">Email Address <span class="text-red-500">*</span></label>
                <input id="email" type="email" required class="w-full border-2 border-gray-100 bg-gray-50/50 p-4 rounded-xl focus:border-[#114b72] focus:bg-white focus:ring-4 focus:ring-[#114b72]/10 transition-all font-semibold outline-none">
              </div>

              <div>
                <label class="block mb-2 font-black text-gray-700 text-xs uppercase tracking-widest">Phone Number <span class="text-red-500">*</span></label>
                <input id="phone" type="tel" pattern="[0-9]{10}" required placeholder="10 Digits" class="w-full border-2 border-gray-100 bg-gray-50/50 p-4 rounded-xl focus:border-[#114b72] focus:bg-white focus:ring-4 focus:ring-[#114b72]/10 transition-all font-semibold outline-none placeholder-gray-300">
              </div>

              <div>
                <label class="block mb-2 font-black text-gray-700 text-xs uppercase tracking-widest">Driving License <span class="text-red-500">*</span></label>
                <input id="licenseNumber" type="text" required placeholder="MH12 3456789" pattern="[A-Z]{2}[0-9]{2} [0-9]{7}" class="w-full border-2 border-gray-100 bg-gray-50/50 p-4 rounded-xl focus:border-[#114b72] focus:bg-white focus:ring-4 focus:ring-[#114b72]/10 transition-all font-semibold outline-none placeholder-gray-300">
                <p class="text-[11px] text-gray-400 mt-2 font-bold uppercase tracking-wide">Format required: <span class="text-gray-600">AA00 0000000</span></p>
              </div>
           </div>

           <div class="w-full h-px bg-gray-100 my-8"></div>

           <!-- Timing Grid -->
           <div class="mb-4">
              <h3 class="text-xl font-black text-gray-900 mb-6 tracking-tight">Schedule Window</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                 <div class="hidden md:block absolute top-[50%] left-[calc(50%-15px)] w-[30px] h-[3px] bg-gray-200 z-0"></div>

                 <div class="bg-green-50/30 border-2 border-green-100 p-6 rounded-2xl relative z-10 transition-colors hover:border-green-300">
                    <label class="block mb-3 font-black text-green-800 text-xs uppercase tracking-widest flex items-center gap-2"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"></path></svg> Pickup Time</label>
                    <input type="time" id="pickupTime" required class="w-full bg-transparent border-b-2 border-green-200 outline-none p-2 focus:border-green-600 transition-all font-black text-[22px] text-green-900 cursor-pointer">
                 </div>

                 <div class="bg-blue-50/30 border-2 border-blue-100 p-6 rounded-2xl relative z-10 transition-colors hover:border-blue-300">
                    <label class="block mb-3 font-black text-blue-800 text-xs uppercase tracking-widest flex items-center gap-2"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"></path></svg> Drop Time</label>
                    <input type="time" id="dropTime" required class="w-full bg-transparent border-b-2 border-blue-200 outline-none p-2 focus:border-blue-600 transition-all font-black text-[22px] text-blue-900 cursor-pointer">
                 </div>
              </div>
           </div>

           <div class="w-full h-px bg-gray-100 my-8"></div>

           <!-- Navigation Grid -->
           <div>
              <h3 class="text-xl font-black text-gray-900 mb-6 tracking-tight">Routing Protocol</h3>
              
              <div class="space-y-6">
                 <!-- PICKUP -->
                 <div class="relative">
                   <label class="block mb-2 font-black text-gray-700 text-xs uppercase tracking-widest">📍 Origin Address <span class="text-red-500">*</span></label>
                   <div class="autocomplete-wrapper relative group">
                     <input id="pickupInput" type="text" class="w-full border-2 border-gray-100 bg-gray-50/50 p-4 pl-12 rounded-xl focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10 transition-all font-semibold outline-none" placeholder="Search delivery node in Mumbai..." autocomplete="off"/>
                     <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xl filter drop-shadow-sm group-focus-within:scale-110 transition-transform">🟢</span>
                     <ul id="pickupSuggestions" class="suggestions-list mt-2 border-none shadow-2xl rounded-xl overflow-hidden ring-1 ring-gray-100"></ul>
                   </div>
                   <div id="pickupBadge" class="hidden mt-3">
                     <span class="inline-flex items-center gap-1.5 bg-green-100 text-green-900 px-4 py-2 rounded-lg font-black text-[10px] tracking-widest uppercase shadow-sm border border-green-200"><span class="text-sm leading-none pt-[1px] font-normal">✔</span> <span id="pickupShort" class="pt-[1px]"></span></span>
                   </div>
                 </div>

                 <!-- DROP -->
                 <div class="relative">
                   <label class="block mb-2 font-black text-gray-700 text-xs uppercase tracking-widest">🏁 Destination Address <span class="text-red-500">*</span></label>
                   <div class="autocomplete-wrapper relative group">
                     <input id="dropInput" type="text" class="w-full border-2 border-gray-100 bg-gray-50/50 p-4 pl-12 rounded-xl focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all font-semibold outline-none" placeholder="Search dropoff node in Mumbai..." autocomplete="off"/>
                     <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xl filter drop-shadow-sm group-focus-within:scale-110 transition-transform">🔵</span>
                     <ul id="dropSuggestions" class="suggestions-list mt-2 border-none shadow-2xl rounded-xl overflow-hidden ring-1 ring-gray-100"></ul>
                   </div>
                   <div id="dropBadge" class="hidden mt-3">
                     <span class="inline-flex items-center gap-1.5 bg-blue-100 text-blue-900 px-4 py-2 rounded-lg font-black text-[10px] tracking-widest uppercase shadow-sm border border-blue-200"><span class="text-sm leading-none pt-[1px] font-normal">✔</span> <span id="dropShort" class="pt-[1px]"></span></span>
                   </div>
                 </div>
              </div>

              <!-- Map Controller -->
              <div class="mt-8 bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-inner">
                 <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
                    <p id="mapModeLabel" class="text-sm font-black text-gray-400 uppercase tracking-widest w-full">GPS Target: <span id="mapModeText" class="text-green-700 bg-green-100 border border-green-200 px-3 py-1 rounded-md ml-1 shadow-sm transition-colors duration-300">Pickup</span></p>
                    <div class="flex gap-2 w-full justify-end">
                       <button type="button" id="btnPickupMap" onclick="setSelecting('pickup')" class="px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest border border-green-600 text-green-700 bg-white hover:bg-green-600 hover:text-white shadow transition-all whitespace-nowrap">
                         Locate Pickup
                       </button>
                       <button type="button" id="btnDropMap" onclick="setSelecting('drop')" class="px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest border border-blue-600 text-blue-700 bg-white hover:bg-blue-600 hover:text-white shadow transition-all whitespace-nowrap">
                         Locate Drop
                       </button>
                    </div>
                 </div>
                 <div id="map" class="w-full rounded-xl overflow-hidden shadow-md border-2 border-white ring-1 ring-gray-200"></div>
              </div>
           </div>

           <!-- Hidden fields -->
           <input id="pickupLat" type="hidden">
           <input id="pickupLng" type="hidden">
           <input id="pickupAddress" type="hidden" required>
           <input id="dropAddress" type="hidden" required>

           <div class="w-full h-px bg-gray-100 my-8"></div>

           <!-- Verification Grid -->
           <h3 class="text-xl font-black text-gray-900 mb-6 tracking-tight">Security & Verification</h3>
           
           <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Upload PDF -->
              <div class="bg-gray-50/50 border-2 border-dashed border-gray-300 p-8 rounded-2xl relative hover:border-[#114b72] hover:bg-[#114b72]/5 transition-all group overflow-hidden">
                 <div class="flex flex-col items-center justify-center text-center h-full relative z-10">
                    <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                       <svg class="w-6 h-6 text-[#114b72]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    </div>
                    <label for="identityProof" class="cursor-pointer font-black text-gray-900 text-sm mb-1 uppercase tracking-widest">Identity File <span class="text-red-500">*</span></label>
                    <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Aadhar / PAN / License</p>
                    <span class="text-[10px] font-black tracking-widest text-[#114b72] bg-[#114b72]/10 px-2 py-0.5 rounded">.PDF ONLY</span>
                    <input type="file" id="identityProof" accept="application/pdf" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
                 </div>
                 <!-- Success Override Overlay -->
                 <div id="pdfSuccess" class="absolute inset-0 bg-[#114b72] text-white flex flex-col items-center justify-center hidden z-20">
                    <svg class="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                    <span class="font-black text-xs tracking-widest uppercase">Verified File Valid</span>
                 </div>
              </div>

              <!-- Camera Capture -->
              <div class="bg-gray-50/50 border border-gray-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                 <h3 class="font-black text-gray-900 text-sm uppercase tracking-widest mb-4">Facial Bio-Match <span class="text-red-500">*</span></h3>
                 <div class="relative w-full max-w-[200px] aspect-[4/4] bg-gray-900 rounded-full overflow-hidden shadow-inner mb-6 ring-4 ring-white">
                     <video id="video" autoplay playsinline class="w-full h-full object-cover transform scale-x-[-1]"></video>
                     <img id="photoPreview" class="absolute inset-0 w-full h-full object-cover z-10 transform scale-x-[-1]" style="display:none;" />
                 </div>
                 <canvas id="canvas" class="hidden"></canvas>
                 <button type="button" id="captureBtn" class="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl transition-all hover:scale-105 active:scale-95 z-10 focus:ring-4 focus:ring-gray-300">Run Identity Script</button>
                 
                 <!-- Success Override Overlay -->
                 <div id="photoSuccess" class="absolute inset-0 bg-[#114b72] text-white flex flex-col items-center justify-center hidden z-20">
                    <div class="relative w-[140px] aspect-[4/4] rounded-full overflow-hidden border-4 border-white shadow-xl mb-4">
                       <img id="photoPreviewSuccess" class="w-full h-full object-cover transform scale-x-[-1]" />
                    </div>
                    <span class="font-black text-xs tracking-widest uppercase">Biometrics Locked</span>
                 </div>
              </div>
           </div>

           <!-- Submission Layer -->
           <div class="pt-8">
              <button type="submit" class="w-full bg-[#114b72] hover:bg-[#0c3653] text-white py-6 rounded-2xl font-black text-xl tracking-[0.2em] uppercase shadow-[0_12px_24px_rgba(17,75,114,0.3)] hover:shadow-[0_16px_32px_rgba(17,75,114,0.4)] transition-all hover:-translate-y-1">
                 Process Ride Request
              </button>
           </div>

        </form>
      </div>
    </section>

  </main>

  <!-- Script Override to copy photo to the new success div -->
  <script>
     // Polling loop to sync image to the beautiful success overlay
     setInterval(() => {
        const pSuccess = document.getElementById('photoSuccess');
        const pOriginal = document.getElementById('photoPreview');
        const pNew = document.getElementById('photoPreviewSuccess');
        if (pSuccess && !pSuccess.classList.contains('hidden') && pOriginal && pOriginal.src) {
            pNew.src = pOriginal.src;
        }
     }, 500);
  </script>
  `;

content = content.substring(0, startIndex) + newLayout + "\\n" + content.substring(endIndex);

fs.writeFileSync(file, content, 'utf8');
console.log("Deployed Premium UX Redesign to booking.html");
