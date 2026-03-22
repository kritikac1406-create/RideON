const fs = require('fs');

const file = 'c:\\\\Users\\\\ADMIN\\\\OneDrive\\\\Desktop\\\\RideON\\\\booking.html';
if (!fs.existsSync(file)) {
    console.error("booking.html not found");
    process.exit(1);
}
let content = fs.readFileSync(file, 'utf8');

const loadCarOld = `async function loadCar() {
  const { data, error } = await supabase.from("cars").select("*").eq("id", carId).single();
  if (error || !data) { alert("Failed to load car"); return; }
  carData = data;
  document.getElementById("carImg").src = data.image_url;
  document.getElementById("carName").textContent = data.name;
  document.getElementById("carPrice").textContent = \\\`₹\\$\\{data.rent_per_hour\\} / hour\\\`;
  document.getElementById("plateWrap").innerHTML = \\\`<span class="number-plate">\\$\\{data.brand\\}</span>\\\`;
}
loadCar();`;

const loadCarNew = `async function loadCar() {
  const { data, error } = await supabase.from("cars").select("*").eq("id", carId).single();
  if (error || !data) { alert("Failed to load car"); return; }
  carData = data;
  document.getElementById("carImg").src = data.image_url;
  document.getElementById("carName").textContent = data.name;
  document.getElementById("carPrice").textContent = \\\`₹\\$\\{data.rent_per_hour\\} / hour\\\`;
  document.getElementById("plateWrap").innerHTML = \\\`<span class="number-plate">\\$\\{data.brand\\}</span>\\\`;
  
  loadOffer(); // Fetch active discounts immediately after car matrix is populated
}
loadCar();

let activeOffer = null;
async function loadOffer() {
  if (!carData || !carData.category) return;
  const { data, error } = await supabase.from("offers").select("*").eq("category", carData.category.toLowerCase()).limit(1);
  if (data && data.length > 0) {
      activeOffer = data[0];
      calculateTotal(); // Trigger automatic re-calculation upon successful discount retrieval
  }
}`;

const calcOld = `function calculateTotal() {
  const pickupTime = document.getElementById("pickupTime").value;
  const dropTime   = document.getElementById("dropTime").value;
  if (!carData || !pickupTime || !dropTime || !selectedPickupDate || !selectedDropDate) return;

  const start = new Date(\\\`\\$\\{selectedPickupDate\\}T\\$\\{pickupTime\\}\\\`);
  const end   = new Date(\\\`\\$\\{selectedDropDate\\}T\\$\\{dropTime\\}\\\`);

  if (end <= start) { document.getElementById("totalAmount").textContent = "₹0"; return; }
  const hours = Math.ceil((end - start) / (1000 * 60 * 60));
  document.getElementById("totalAmount").textContent = \\\`₹\\$\\{hours * carData.rent_per_hour\\}\\\`;
}`;

const calcNew = `function calculateTotal() {
  const pickupTime = document.getElementById("pickupTime").value;
  const dropTime   = document.getElementById("dropTime").value;
  if (!carData || !pickupTime || !dropTime || !selectedPickupDate || !selectedDropDate) return;

  const start = new Date(\\\`\\$\\{selectedPickupDate\\}T\\$\\{pickupTime\\}\\\`);
  const end   = new Date(\\\`\\$\\{selectedDropDate\\}T\\$\\{dropTime\\}\\\`);

  if (end <= start) { document.getElementById("totalAmount").textContent = "₹0"; return; }
  const hours = Math.ceil((end - start) / (1000 * 60 * 60));
  let baseTotal = hours * carData.rent_per_hour;
  
  // Automatically strip out legacy DOM overlays upon recalculation
  const existingDiscount = document.getElementById("activeDiscountBadge");
  if (existingDiscount) existingDiscount.remove();

  if (activeOffer) {
      const discountPercent = activeOffer.discount || activeOffer.discount_percent || 0;
      if (discountPercent > 0) {
          const discountAmt = (baseTotal * discountPercent) / 100;
          baseTotal = baseTotal - discountAmt;
          
          // Inject sleek discount alert directly above the Primary Output node!
          const amtContainer = document.getElementById("totalAmount").parentElement;
          const badge = document.createElement("div");
          badge.id = "activeDiscountBadge";
          badge.className = "text-green-700 font-bold uppercase tracking-widest text-[10px] mb-2 mt-1 flex items-center justify-center gap-1.5 bg-green-100/80 px-3 py-1.5 rounded-lg border border-green-200 shadow-sm w-max transform hover:scale-105 transition-transform";
          badge.innerHTML = \\\`<svg class="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg> \\$\\{activeOffer.title || discountPercent + '% OFF'\\} (-\\₹\\$\\{Math.round(discountAmt)\\})\`;
          amtContainer.insertBefore(badge, document.getElementById("totalAmount"));
      }
  }

  document.getElementById("totalAmount").textContent = \\\`₹\\$\\{Math.round(baseTotal)\\}\\\`;
}`;

content = content.replace(loadCarOld, loadCarNew);
content = content.replace(calcOld, calcNew);

fs.writeFileSync(file, content, 'utf8');
console.log("Deployed Live Discount Algorithms to booking.html");
