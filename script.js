function startCountdown() {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
    return;
  }

  let target = new Date();
  target.setDate(target.getDate() + 4);
  target.setHours(target.getHours() + 13);
  target.setMinutes(target.getMinutes() + 34);
  target.setSeconds(target.getSeconds() + 56);

  function update() {
    let now = new Date();
    let diff = target - now;

    if (diff < 0) {
      daysEl.innerHTML = "00";
      hoursEl.innerHTML = "00";
      minutesEl.innerHTML = "00";
      secondsEl.innerHTML = "00";
      return;
    }

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff % 86400000) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % 3600000) / (1000 * 60));
    let seconds = Math.floor((diff % 60000) / 1000);

    daysEl.innerHTML = String(days).padStart(2, "0");
    hoursEl.innerHTML = String(hours).padStart(2, "0");
    minutesEl.innerHTML = String(minutes).padStart(2, "0");
    secondsEl.innerHTML = String(seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

startCountdown();
console.log("Ecommerce website loaded successfully");

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function() {
  const filterGroups = document.querySelectorAll(".filter-group");

  filterGroups.forEach((group) => {
    const header = group.querySelector(".filter-header");
    const content = group.querySelector(".filter-content");

    if (!header || !content) return;

    const arrow = header.querySelector(".filter-arrow");

    content.style.display = "block";

    if (arrow) {
      arrow.style.transform = "rotate(180deg)";
    }

    header.addEventListener("click", function() {
      const isHidden = content.style.display === "none";

      content.style.display = isHidden ? "block" : "none";

      if (arrow) {
        arrow.style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
      }
    });
  });
});

const btn = document.getElementById("pageBtn");
const menu = document.getElementById("pageMenu");
const options = document.querySelectorAll(".page-option");

let selected = "10";
if (btn && menu) {
  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
}

options.forEach((opt) => {
  opt.addEventListener("click", () => {
    selected = opt.dataset.value;

    document.querySelectorAll(".tick").forEach((t) => t.classList.add("hidden"));

    opt.querySelector(".tick").classList.remove("hidden");

    menu.classList.add("hidden");
  });
});

document.addEventListener("click", (e) => {
  if (btn && menu && !btn.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.add("hidden");
  }
});

const toggleBtn = document.getElementById("toggleViewBtn");
const listView = document.getElementById("listView");
const gridView = document.getElementById("gridView");

let isGrid = false;

if (toggleBtn && listView && gridView) {
  toggleBtn.addEventListener("click", () => {
    isGrid = !isGrid;

    if (isGrid) {
      listView.classList.add("hidden");
      gridView.classList.remove("hidden");
    } else {
      gridView.classList.add("hidden");
      listView.classList.remove("hidden");
    }
  });
}

// ================= SELECTED FILTERS DISPLAY =================
const topBar = document.querySelector(".bg-white.rounded-lg.border.p-3.mb-4");

if (topBar) {
  const selectedFiltersDiv = document.createElement("div");
  selectedFiltersDiv.className = "p-3 mb-4 hidden";
  selectedFiltersDiv.id = "selectedFiltersBar";
  selectedFiltersDiv.innerHTML = `
    <div class="flex flex-wrap items-center gap-2">
      <div id="selectedFiltersList" class="flex flex-wrap gap-2"></div>
      <button id="clearAllFiltersBtn" class="text-blue-500 text-sm hover:text-red-700 ml-auto">Clear all filters</button>
    </div>
  `;
  topBar.insertAdjacentElement("afterend", selectedFiltersDiv);
}

let selectedFilters = {
  brands: [],
  features: [],
  condition: null,
  rating: null,
  minPrice: null,
  maxPrice: null,
};

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str).replace(/[&<>]/g, function(m) {
    if (m === "&") return "&amp;";
    if (m === "<") return "&lt;";
    if (m === ">") return "&gt;";
    return m;
  });
}

function updateSelectedFiltersDisplay() {
  const container = document.getElementById("selectedFiltersList");
  const bar = document.getElementById("selectedFiltersBar");
  if (!container) return;

  container.innerHTML = "";
  let hasFilters = false;

  selectedFilters.brands.forEach((brand) => {
    hasFilters = true;
    container.innerHTML += `<div class="bg-white border border-blue-400 rounded-md px-3 py-1 text-sm flex items-center gap-2">
      <span>${escapeHtml(brand)}</span>
      <button class="text-gray-400 hover:text-red-500 remove-filter" data-type="brand" data-value="${escapeHtml(brand)}">×</button>
    </div>`;
  });

  selectedFilters.features.forEach((feature) => {
    hasFilters = true;
    container.innerHTML += `<div class="bg-white border border-blue-400 rounded-md px-3 py-1 text-sm flex items-center gap-2">
      <span>${escapeHtml(feature)}</span>
      <button class="text-gray-400 hover:text-red-500 remove-filter" data-type="feature" data-value="${escapeHtml(feature)}">×</button>
    </div>`;
  });

  if (selectedFilters.condition) {
    hasFilters = true;
    container.innerHTML += `<div class="bg-white border border-blue-400 rounded-md px-3 py-1 text-sm flex items-center gap-2">
      <span>${escapeHtml(selectedFilters.condition)}</span>
      <button class="text-gray-400 hover:text-red-500 remove-filter" data-type="condition" data-value="${escapeHtml(selectedFilters.condition)}">×</button>
    </div>`;
  }

  if (selectedFilters.rating) {
    hasFilters = true;
    container.innerHTML += `<div class="bg-white border border-blue-400 rounded-md px-3 py-1 text-sm flex items-center gap-2">
      <span>${escapeHtml(selectedFilters.rating)}</span>
      <button class="text-gray-400 hover:text-red-500 remove-filter" data-type="rating" data-value="${escapeHtml(selectedFilters.rating)}">×</button>
    </div>`;
  }

  if (selectedFilters.minPrice !== null || selectedFilters.maxPrice !== null) {
    hasFilters = true;
    const maxVal = document.getElementById("maxSlider") ? document.getElementById("maxSlider").max : 999999;
    container.innerHTML += `
      <div class="bg-white border border-blue-400 rounded-md px-3 py-1 text-sm flex items-center gap-2">
        <span>Price: $${selectedFilters.minPrice ?? 0} - $${selectedFilters.maxPrice ?? maxVal}</span>
        <button class="text-gray-400 hover:text-red-500 remove-filter" data-type="price">×</button>
      </div>
    `;
  }

  if (bar) bar.classList.toggle("hidden", !hasFilters);
}

const selectedFiltersList = document.getElementById("selectedFiltersList");

if (selectedFiltersList) {
  selectedFiltersList.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".remove-filter");

    if (removeBtn) {
      e.stopPropagation();
      const type = removeBtn.dataset.type;
      const value = removeBtn.dataset.value;
      removeFilter(type, value);
    }
  });
}

function removeFilter(type, value) {
  const minSlider = document.getElementById("minSlider");
  const maxSlider = document.getElementById("maxSlider");
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");
  const maxValue = maxSlider ? parseInt(maxSlider.max) : 999999;

  switch (type) {
    case "brand":
      selectedFilters.brands = selectedFilters.brands.filter((b) => b !== value);
      const brandCheckbox = document.querySelector(`.filter-group input[type="checkbox"][value="${value}"]`);
      if (brandCheckbox) brandCheckbox.checked = false;
      break;
    case "feature":
      selectedFilters.features = selectedFilters.features.filter((f) => f !== value);
      const featureCheckbox = document.querySelector(`.filter-group input[type="checkbox"][value="${value}"]`);
      if (featureCheckbox) featureCheckbox.checked = false;
      break;
    case "condition":
      selectedFilters.condition = null;
      const conditionRadio = document.querySelector(`.filter-group input[type="radio"][value="${value}"]`);
      if (conditionRadio) conditionRadio.checked = false;
      break;
    case "rating":
      selectedFilters.rating = null;
      const ratingCheckbox = document.querySelector(`.filter-group input[type="checkbox"][value="${value}"]`);
      if (ratingCheckbox) ratingCheckbox.checked = false;
      break;
    case "price":
      selectedFilters.minPrice = null;
      selectedFilters.maxPrice = null;
      if (minSlider) minSlider.value = 0;
      if (maxSlider) maxSlider.value = maxValue;
      if (minPrice) minPrice.value = 0;
      if (maxPrice) maxPrice.value = maxValue;
      if (typeof updateSlider === "function") updateSlider();
      break;
  }
  updateSelectedFiltersDisplay();
  showAllProducts();
}

function showAllProducts() {
  const productCards = document.querySelectorAll("#listView > div, #gridView > div");
  productCards.forEach((card) => {
    card.style.display = "";
  });

  const countSpan = document.querySelector(".text-gray-700.text-sm .font-bold");
  if (countSpan) countSpan.innerText = "12,911";
}

function clearAllFilters() {
  const minSlider = document.getElementById("minSlider");
  const maxSlider = document.getElementById("maxSlider");
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");
  const maxValue = maxSlider ? parseInt(maxSlider.max) : 999999;

  selectedFilters = {
    brands: [],
    features: [],
    condition: null,
    rating: null,
    minPrice: null,
    maxPrice: null,
  };
  
  if (minSlider) minSlider.value = 0;
  if (maxSlider) maxSlider.value = maxValue;
  if (minPrice) minPrice.value = 0;
  if (maxPrice) maxPrice.value = maxValue;

  if (typeof updateSlider === "function") updateSlider();

  document.querySelectorAll('.filter-group input[type="checkbox"]').forEach((cb) => {
    cb.checked = false;
  });

  document.querySelectorAll('.filter-group input[type="radio"]').forEach((radio) => {
    radio.checked = false;
  });

  updateSelectedFiltersDisplay();
  showAllProducts();
}

document.querySelectorAll('.filter-group input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    const label = e.target.parentElement.innerText.trim();
    const parentUl = e.target.closest("ul");
    const section = parentUl?.closest(".filter-group")?.querySelector("h3")?.innerText;

    if (section === "Brands") {
      if (e.target.checked) {
        selectedFilters.brands.push(label);
      } else {
        selectedFilters.brands = selectedFilters.brands.filter((b) => b !== label);
      }
    } else if (section === "Ratings") {
      if (e.target.checked) {
        selectedFilters.rating = label;
        parentUl.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
          if (cb !== e.target) cb.checked = false;
        });
      } else {
        selectedFilters.rating = null;
      }
    } else if (section === "Features") {
      if (e.target.checked) {
        selectedFilters.features.push(label);
      } else {
        selectedFilters.features = selectedFilters.features.filter((f) => f !== label);
      }
    }
    updateSelectedFiltersDisplay();
  });
});

document.querySelectorAll('.filter-group input[type="radio"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    if (e.target.checked) {
      const label = e.target.parentElement.innerText.trim();
      const parentUl = e.target.closest("ul");
      const section = parentUl?.closest(".filter-group")?.querySelector("h3")?.innerText;

      if (section === "Condition") {
        selectedFilters.condition = label;
      }
    }
    updateSelectedFiltersDisplay();
  });
});

// Price Slider
const minSlider = document.getElementById("minSlider");
const maxSlider = document.getElementById("maxSlider");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const sliderTrack = document.getElementById("sliderTrack");

if (!minSlider || !maxSlider || !minPrice || !maxPrice || !sliderTrack) {
  console.log("Price slider not found on this page");
} else {
  const maxValue = parseInt(maxSlider.max);

  function updateSlider() {
    let minVal = parseInt(minSlider.value);
    let maxVal = parseInt(maxSlider.value);

    if (minVal > maxVal - 1) {
      minVal = maxVal - 1;
      minSlider.value = minVal;
    }

    if (maxVal < minVal + 1) {
      maxVal = minVal + 1;
      maxSlider.value = maxVal;
    }

    minPrice.value = minVal;
    maxPrice.value = maxVal;

    const left = (minVal / maxValue) * 100;
    const right = (maxVal / maxValue) * 100;

    sliderTrack.style.left = `${left}%`;
    sliderTrack.style.width = `${right - left}%`;
  }

  minSlider.addEventListener("input", updateSlider);
  maxSlider.addEventListener("input", updateSlider);

  minPrice.addEventListener("input", () => {
    minSlider.value = minPrice.value || 0;
    updateSlider();
  });

  maxPrice.addEventListener("input", () => {
    maxSlider.value = maxPrice.value || maxValue;
    updateSlider();
  });

  document.getElementById("applyPrice")?.addEventListener("click", () => {
    selectedFilters.minPrice = Number(minPrice.value);
    selectedFilters.maxPrice = Number(maxPrice.value);
    updateSelectedFiltersDisplay();
  });

  updateSlider();
}

const clearAllFiltersBtn = document.getElementById("clearAllFiltersBtn");
if (clearAllFiltersBtn) {
  clearAllFiltersBtn.addEventListener("click", () => {
    clearAllFilters();
  });
}

document.querySelectorAll(".filter-group ul li").forEach((li) => {
  const checkbox = li.querySelector("input");
  if (checkbox && !checkbox.hasAttribute("value")) {
    const text = li.innerText.trim();
    checkbox.setAttribute("value", text);
  }
});

document.querySelectorAll('.filter-group input[type="radio"]').forEach((radio) => {
  const parent = radio.parentElement;
  const text = parent.innerText.trim();
  radio.setAttribute("value", text);
});

// ================= WISHLIST FUNCTIONALITY FOR PRODUCT GRID =================
// BLUE OUTLINE HEART (NOT FILLED) - CORRECT VERSION
const outlineHeartSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#3b82f6" stroke-width="1.5">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
</svg>`;

// RED FILLED HEART
const filledHeartSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#ef4444" stroke="#ef4444" stroke-width="1">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
</svg>`;

function updateWishlistButton(button, isWished) {
  button.innerHTML = isWished ? filledHeartSVG : outlineHeartSVG;
}

function wishlistClickHandler(e) {
  e.stopPropagation();
  const button = e.currentTarget;
  const isWished = button.classList.contains("wished");

  if (isWished) {
    button.classList.remove("wished");
    updateWishlistButton(button, false);
  } else {
    button.classList.add("wished");
    updateWishlistButton(button, true);
  }
}

function initializeWishlist() {
  const allButtons = document.querySelectorAll("#listView .border.rounded-lg.border-gray-200.w-10.h-10, #gridView .border.rounded-lg.border-gray-200.w-10.h-10");
  allButtons.forEach((button) => {
    button.classList.remove("wished");
    updateWishlistButton(button, false);
    button.removeEventListener("click", wishlistClickHandler);
    button.addEventListener("click", wishlistClickHandler);
  });
}

initializeWishlist();

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    setTimeout(initializeWishlist, 50);
  });
}

// ================= WISHLIST FOR PRODUCT DETAIL PAGE =================
// BLUE OUTLINE HEART (NOT FILLED)
const outlineHeart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#3b82f6" stroke-width="1.5">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
</svg>`;

// RED FILLED HEART
const filledHeart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="#ef4444" stroke="#ef4444" stroke-width="1">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
</svg>`;

const wishlistBtn = document.getElementById("wishlist_btn");
const wishlistContent = document.getElementById("wishlist_content");

if (wishlistBtn && wishlistContent) {
  let isWishlisted = false;
  wishlistBtn.addEventListener("click", (e) => {
    e.preventDefault();
    isWishlisted = !isWishlisted;
    wishlistContent.innerHTML = `${isWishlisted ? filledHeart : outlineHeart}<span>${isWishlisted ? "Saved to wishlist" : "Save for later"}</span>`;
  });
}

function changeImage(element) {
  const mainImage = document.getElementById("mainImage");
  if (mainImage) {
    mainImage.src = element.src;
  }
  document.querySelectorAll(".thumb").forEach((img) => {
    img.classList.remove("border-blue-500", "border-2");
    img.classList.add("border");
  });
  element.classList.remove("border");
  element.classList.add("border-blue-500", "border-2");
}

// ================= CART PAGE FUNCTIONS =================
const cartItems = document.querySelectorAll(".cart-item");
const discount = 60;
const tax = 14;

function updateCart() {
  let subtotal = 0;

  document.querySelectorAll(".cart-item").forEach(item => {
    const qtySelect = item.querySelector(".qty-select");
    const totalElement = item.querySelector(".item-total");

    if (!qtySelect || !totalElement) return;

    const price = parseFloat(item.dataset.price || 0);
    const qty = parseInt(qtySelect.value || 1);
    const itemTotal = price * qty;

    totalElement.textContent = itemTotal.toFixed(2);
    subtotal += itemTotal;
  });

  const subtotalEl = document.getElementById("subtotal");
  const grandTotalEl = document.getElementById("grandTotal");
  const cartCountEl = document.getElementById("cartCount");

  if (subtotalEl) subtotalEl.textContent = "$" + subtotal.toFixed(2);
  if (grandTotalEl) grandTotalEl.textContent = "$" + (subtotal - discount + tax).toFixed(2);
  if (cartCountEl) cartCountEl.textContent = document.querySelectorAll(".cart-item").length;
}

if (cartItems.length > 0) {
  document.querySelectorAll(".qty-select").forEach(select => {
    select.addEventListener("change", updateCart);
  });

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      this.closest(".cart-item").remove();
      updateCart();
    });
  });

  const rbtn = document.querySelector(".remove-all-btn");
  if (rbtn) {
    rbtn.addEventListener("click", function() {
      document.querySelectorAll(".cart-item").forEach(item => item.remove());
      updateCart();
    });
  }

  updateCart();
}

// ================= ADD TO CART SNACKBAR =================
document.addEventListener("DOMContentLoaded", () => {
  const snackbar = document.getElementById("snackbar");
  if (!snackbar) return;

  let timeout;

  document.body.addEventListener("click", (e) => {
    const button = e.target.closest(".move-to-cart");
    if (!button) return;

    if (timeout) clearTimeout(timeout);

    snackbar.classList.remove("translate-y-20", "opacity-0");
    snackbar.classList.add("translate-y-0", "opacity-100");

    timeout = setTimeout(() => {
      snackbar.classList.remove("translate-y-0", "opacity-100");
      snackbar.classList.add("translate-y-20", "opacity-0");
    }, 2500);
  });
});