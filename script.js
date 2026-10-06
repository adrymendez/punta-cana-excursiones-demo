"use strict";

const CONFIG = {
  businessName: "Caribe Excursiones",
  // REEMPLAZAR POR EL WHATSAPP REAL DEL NEGOCIO
  whatsapp: "18090000000",
  currency: "USD",
  currencySymbol: "US$",
  demoMode: true
};

// localStorage se utiliza solo en esta versión demostrativa; posteriormente será reemplazado por una base de datos real.
const STORAGE_KEY = "caribe_excursions_bookings";
const defaultBookings = [];

const excursions = [
  {
    id: 1,
    name: "Isla Saona",
    location: "Bayahibe",
    destination: "Punta Cana",
    category: "Islas",
    priceAdult: 75,
    priceChild: 40,
    duration: "Día completo",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    description: "Un día completo para disfrutar de playas blancas, aguas turquesas y un recorrido inolvidable por una de las islas más bellas del Caribe.",
    includes: ["Transporte redondo", "Almuerzo", "Snorkel", "Muelle privado"],
    recommendations: ["Llevar bloqueador solar", "Usar traje de baño", "Toma agua para mantenerse hidratado"],
    schedule: "08:30 AM - 06:30 PM"
  },
  {
    id: 2,
    name: "Buggy Adventure Macao",
    location: "Macao",
    destination: "Macao",
    category: "Buggy",
    priceAdult: 95,
    priceChild: 50,
    duration: "4 horas",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    description: "Aventura off-road con recorridos por caminos rurales, paisajes tropicales y playas con una experiencia intensa y llena de adrenalina.",
    includes: ["Buggy", "Guía local", "Botella de agua", "Protección básica"],
    recommendations: ["Usa ropa cómoda", "Trae gafas de sol", "Evita llevar objetos frágiles"],
    schedule: "09:00 AM - 01:00 PM"
  },
  {
    id: 3,
    name: "Catamarán Punta Cana",
    location: "Bávaro",
    destination: "Bávaro",
    category: "Catamarán",
    priceAdult: 89,
    priceChild: 45,
    duration: "5 horas",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80",
    description: "Navega por cristalinas aguas de Bávaro, disfruta de snorkel, relajación en la playa, música y un ambiente tropical ideal para familias y parejas.",
    includes: ["Catamarán", "Snorkel", "Servicio de bar", "Traslado"],
    recommendations: ["Trae bloqueador", "Lleva zapatos de playa", "Aplica protector solar antes de salir"],
    schedule: "10:00 AM - 03:00 PM"
  },
  {
    id: 4,
    name: "Scape Park Cap Cana",
    location: "Cap Cana",
    destination: "Cap Cana",
    category: "Aventura",
    priceAdult: 110,
    priceChild: 65,
    duration: "Día completo",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80",
    description: "Experiencia enfocada en aventura, naturaleza y belleza del paisaje tropical con actividades para adultos y niños.",
    includes: ["Acceso a áreas de aventura", "Guía", "Traslado", "Refrigerios"],
    recommendations: ["Usa zapatos cerrados", "Lleva toalla", "Trae repuesto de ropa"],
    schedule: "08:00 AM - 05:00 PM"
  },
  {
    id: 5,
    name: "Monkeyland",
    location: "Santo Domingo",
    destination: "Punta Cana",
    category: "Familiar",
    priceAdult: 70,
    priceChild: 35,
    duration: "3 horas",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
    description: "Un recorrido divertido y educativo en medio de la naturaleza con animales y actividades familiares ideales para disfrutar en grupo.",
    includes: ["Entrada", "Guía", "Visita guiada", "Traslado"],
    recommendations: ["Lleva cámara", "Usa ropa ligera", "Trae repelente"],
    schedule: "11:00 AM - 02:00 PM"
  },
  {
    id: 6,
    name: "Safari Cultural",
    location: "Punta Cana",
    destination: "Punta Cana",
    category: "Cultural",
    priceAdult: 82,
    priceChild: 42,
    duration: "5 horas",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    description: "Recorrido cultural y natural para conocer la historia, los pueblos y la riqueza del paisaje dominicano con un enfoque auténtico.",
    includes: ["Traslado", "Guía local", "Degustación", "Parada cultural"],
    recommendations: ["Trae cámara", "Lleva calzado cómodo", "Consulta con el guía"],
    schedule: "09:30 AM - 02:30 PM"
  },
  {
    id: 7,
    name: "Paseo a Caballo Macao",
    location: "Macao",
    destination: "Macao",
    category: "Cultural",
    priceAdult: 68,
    priceChild: 30,
    duration: "2 horas",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=80",
    description: "Recorre paisajes tropicales, caminos rurales y playas con una experiencia relajante y auténtica para toda la familia.",
    includes: ["Caballo", "Guía", "Botella de agua", "Traslado"],
    recommendations: ["Usa ropa cómoda", "Lleva sombrero", "No olvides protector solar"],
    schedule: "08:00 AM - 10:00 AM"
  },
  {
    id: 8,
    name: "Snorkeling Adventure",
    location: "Punta Cana",
    destination: "Punta Cana",
    category: "Acuática",
    priceAdult: 76,
    priceChild: 38,
    duration: "3 horas",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70b5?auto=format&fit=crop&w=1200&q=80",
    description: "Explora arrecifes tropicales y aguas claras con una experiencia de snorkel guiada y de bajo riesgo para familias y grupos.",
    includes: ["Equipo de snorkel", "Guía", "Transporte", "Refrigerios"],
    recommendations: ["Trae traje de baño", "Usa repelente sin perfume", "Lleva toalla"],
    schedule: "12:00 PM - 03:00 PM"
  },
  {
    id: 9,
    name: "Santo Domingo City Tour",
    location: "Santo Domingo",
    destination: "Punta Cana",
    category: "Cultural",
    priceAdult: 88,
    priceChild: 48,
    duration: "Día completo",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    description: "Descubre la riqueza histórica y cultural de la capital dominicana con paradas emblemáticas, gastronomía y una experiencia urbana llena de identidad.",
    includes: ["Traslado", "Guía", "Paradas históricas", "Refrigerio"],
    recommendations: ["Lleva calzado cómodo", "Trae cámara", "Consulta horarios"],
    schedule: "08:30 AM - 05:30 PM"
  },
  {
    id: 10,
    name: "Isla Catalina",
    location: "Punta Cana",
    destination: "Punta Cana",
    category: "Islas",
    priceAdult: 92,
    priceChild: 49,
    duration: "Día completo",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
    description: "Un día perfecto entre aguas cristalinas, arena blanca, relajación en la playa y deportes acuáticos de gran valor.",
    includes: ["Traslado", "Barco", "Snorkel", "Almuerzo"],
    recommendations: ["Llevar sombrero", "No olvides bloqueador", "Usa zapatillas de playa"],
    schedule: "09:00 AM - 04:00 PM"
  },
  {
    id: 11,
    name: "Parasailing Punta Cana",
    location: "Bávaro",
    destination: "Bávaro",
    category: "Acuática",
    priceAdult: 105,
    priceChild: 55,
    duration: "1 hora",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80",
    description: "Vive una sensación única sobrevolando la costa y disfrutando de vistas panorámicas de Punta Cana desde una altura espectacular.",
    includes: ["Equipo de parasailing", "Guía", "Seguridad", "Traslado"],
    recommendations: ["Usa sandalias", "Trae repelente", "Llevar gorra"],
    schedule: "10:30 AM - 12:30 PM"
  },
  {
    id: 12,
    name: "Party Boat Punta Cana",
    location: "Bávaro",
    destination: "Bávaro",
    category: "Playa",
    priceAdult: 79,
    priceChild: 39,
    duration: "4 horas",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80",
    description: "Una experiencia vibrante para disfrutar de música, bebidas, vistas y momentos inolvidables en el mar con un ambiente divertido.",
    includes: ["Barco", "Música", "Bar", "Traslado"],
    recommendations: ["Lleva bloqueador", "Usa ropa de playa", "Mantén agua contigo"],
    schedule: "02:00 PM - 06:00 PM"
  }
];

const destinations = [
  { name: "Punta Cana", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80" },
  { name: "Bávaro", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=900&q=80" },
  { name: "Cap Cana", image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80" },
  { name: "Macao", image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=900&q=80" },
  { name: "Uvero Alto", image: "https://images.unsplash.com/photo-1544551763-46a013bb70b5?auto=format&fit=crop&w=900&q=80" },
  { name: "Bayahibe", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80" }
];

const testimonials = [
  {
    name: "Carlos M.",
    country: "Estados Unidos",
    rating: 5,
    comment: "Excelente experiencia. Todo estuvo muy bien organizado."
  },
  {
    name: "Sofía R.",
    country: "Canadá",
    rating: 5,
    comment: "La excursión fue impecable, el personal amable y la playa espectacular."
  },
  {
    name: "Mateo L.",
    country: "España",
    rating: 5,
    comment: "Muy buena atención y una reserva fácil desde el celular. Lo recomiendo totalmente."
  }
];

const state = {
  activeCategory: "Todos",
  selectedExcursionId: null,
  currentBookingInfo: null,
  lastGeneratedCode: 1000
};

function formatPrice(value) {
  return `${CONFIG.currencySymbol}${Number(value).toFixed(0)}`;
}

function formatDate(dateValue) {
  if (!dateValue) return "-";
  const date = new Date(dateValue + "T12:00:00");
  return new Intl.DateTimeFormat("es-DO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
}

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getBookings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [...defaultBookings];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [...defaultBookings];
  } catch (error) {
    console.error("Error reading bookings from localStorage:", error);
    return [...defaultBookings];
  }
}

function saveBookings(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

function configureWhatsAppLinks() {
  const links = document.querySelectorAll("[data-whatsapp-link]");
  links.forEach((link) => {
    const href = `https://wa.me/${CONFIG.whatsapp}`;
    link.setAttribute("href", href);
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function setMinDateForInputs() {
  const inputDateEls = document.querySelectorAll('input[type="date"]');
  inputDateEls.forEach((input) => {
    if (!input.dataset.minSet) {
      input.min = getLocalDateString();
      input.dataset.minSet = "true";
    }
  });
}

function getFilteredExcursions() {
  const searchDestination = document.getElementById("searchDestination");
  const searchCategory = document.getElementById("searchCategory");
  const searchDate = document.getElementById("searchDate");

  const destinationValue = searchDestination ? searchDestination.value : "";
  const categoryValue = searchCategory ? searchCategory.value : "";

  let filtered = [...excursions];

  if (state.activeCategory && state.activeCategory !== "Todos") {
    filtered = filtered.filter((item) => item.category === state.activeCategory);
  }

  if (destinationValue) {
    filtered = filtered.filter((item) => item.destination === destinationValue || item.location === destinationValue);
  }

  if (categoryValue) {
    filtered = filtered.filter((item) => item.category === categoryValue);
  }

  if (searchDate && searchDate.value) {
    filtered = filtered.filter((item) => item.destination || item.location);
  }

  return filtered;
}

function renderExcursions() {
  const grid = document.getElementById("excursionGrid");
  if (!grid) return;

  const filtered = getFilteredExcursions();

  if (!filtered.length) {
    grid.innerHTML = '<div class="empty-state">No encontramos excursiones con los filtros actuales. Prueba otra búsqueda.</div>';
    return;
  }

  grid.innerHTML = filtered
    .map(
      (excursion) => `
        <article class="excursion-card" aria-label="${excursion.name}">
          <div class="card-image">
            <img src="${excursion.image}" alt="${excursion.name}" loading="lazy" />
          </div>
          <div class="card-content">
            <div class="card-topline">
              <span class="location-tag"><i class="fa-solid fa-location-dot"></i> ${excursion.location}</span>
              <span class="category-tag">${excursion.category}</span>
            </div>
            <h3>${excursion.name}</h3>
            <div class="meta-row">
              <span>⭐ ${excursion.rating}</span>
              <span>⏱ ${excursion.duration}</span>
            </div>
            <div class="price-wrap">
              <div>
                <div class="price-label">Desde</div>
                <div class="price-amount">${formatPrice(excursion.priceAdult)}</div>
              </div>
            </div>
            <div class="card-actions">
              <button class="btn btn-secondary details-btn" type="button" data-excursion-id="${excursion.id}">Ver detalles</button>
              <button class="btn btn-primary reserve-btn" type="button" data-excursion-id="${excursion.id}">Reservar</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  grid.querySelectorAll(".details-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const excursionId = Number(event.currentTarget.dataset.excursionId);
      openExcursionModal(excursionId);
    });
  });

  grid.querySelectorAll(".reserve-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const excursionId = Number(event.currentTarget.dataset.excursionId);
      openBookingModal(excursionId);
    });
  });
}

function renderDestinations() {
  const container = document.getElementById("destinationGrid");
  if (!container) return;

  container.innerHTML = destinations
    .map(
      (destination) => `
        <article class="destination-card" aria-label="${destination.name}">
          <img src="${destination.image}" alt="${destination.name}" loading="lazy" />
          <div class="destination-overlay">
            <span>${destination.name}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderTestimonials() {
  const container = document.getElementById("testimonialGrid");
  if (!container) return;

  container.innerHTML = testimonials
    .map(
      (testimonial) => `
        <article class="testimonial-card">
          <div class="rating" aria-label="Puntuación ${testimonial.rating} de 5 estrellas">${"★".repeat(testimonial.rating)}</div>
          <blockquote>“${testimonial.comment}”</blockquote>
          <div class="testimonial-author">— ${testimonial.name}</div>
          <div class="testimonial-country">${testimonial.country}</div>
        </article>
      `
    )
    .join("");
}

function renderBookings() {
  const bookingsGrid = document.getElementById("bookingGrid");
  const bookingsModal = document.getElementById("bookingsModalList");
  if (!bookingsGrid && !bookingsModal) return;

  const bookings = getBookings();

  const listMarkup = bookings.length
    ? bookings
        .slice()
        .reverse()
        .map(
          (booking) => `
            <article class="booking-item">
              <div class="booking-code">${booking.code}</div>
              <p><strong>Excursión:</strong> ${booking.excursionName}</p>
              <p><strong>Fecha:</strong> ${formatDate(booking.date)}</p>
              <p><strong>Personas:</strong> ${booking.adults} adultos / ${booking.children} niños</p>
              <p><strong>Total:</strong> ${formatPrice(booking.total)}</p>
              <span class="status-badge status-${booking.status.toLowerCase()}">${booking.status}</span>
            </article>
          `
        )
        .join("")
    : '<div class="empty-state">Aún no tienes reservas. Explora nuestras excursiones y guarda tu próxima aventura.</div>';

  if (bookingsGrid) {
    bookingsGrid.innerHTML = listMarkup;
  }

  if (bookingsModal) {
    bookingsModal.innerHTML = listMarkup;
  }
}

function generateBookingCode() {
  const bookings = getBookings();
  const latest = bookings.reduce((max, booking) => {
    const codeNumber = Number(String(booking.code).replace(/\D/g, "")) || 0;
    return Math.max(max, codeNumber);
  }, 1000);

  return `PC-${latest + 1}`;
}

function setActiveCategory(category) {
  state.activeCategory = category;
  document.querySelectorAll(".category-btn").forEach((button) => {
    const buttonMatch = button.dataset.category === category;
    button.classList.toggle("active", buttonMatch);
  });
  renderExcursions();
}

function openExcursionModal(excursionId) {
  const excursion = excursions.find((item) => item.id === excursionId);
  if (!excursion) return;

  state.selectedExcursionId = excursion.id;
  const modal = document.getElementById("detailsModal");
  const body = document.getElementById("detailsModalBody");
  if (!modal || !body) return;

  body.innerHTML = `
    <div class="details-content">
      <div class="details-image">
        <img src="${excursion.image}" alt="${excursion.name}" loading="lazy" />
      </div>
      <div class="details-summary">
        <div>
          <span class="eyebrow eyebrow-strong">Excursión</span>
          <h2 id="detailsTitle">${excursion.name}</h2>
        </div>
        <div class="details-meta">
          <span><i class="fa-solid fa-location-dot"></i> ${excursion.location}</span>
          <span><i class="fa-solid fa-clock"></i> ${excursion.duration}</span>
          <span><i class="fa-solid fa-calendar-days"></i> ${excursion.schedule}</span>
        </div>
        <p>${excursion.description}</p>
        <div class="price-box">
          <div>
            <div class="price-label">Precio desde</div>
            <strong>${formatPrice(excursion.priceAdult)}</strong>
          </div>
          <div>
            <div class="price-label">Niño</div>
            <strong>${formatPrice(excursion.priceChild)}</strong>
          </div>
        </div>
        <div>
          <h3>Incluye</h3>
          <ul class="details-list">
            ${excursion.includes.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
        <div>
          <h3>Recomendaciones</h3>
          <ul class="details-recommendations">
            ${excursion.recommendations.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
        <div class="modal-actions">
          <button class="btn btn-secondary" type="button" data-close="detailsModal">Cerrar</button>
          <button class="btn btn-primary reserve-from-details" type="button" data-excursion-id="${excursion.id}">Reservar</button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  const reserveButton = body.querySelector(".reserve-from-details");
  reserveButton?.addEventListener("click", () => {
    modal.classList.remove("active");
    openBookingModal(excursion.id);
  });
}

function openBookingModal(excursionId) {
  const modal = document.getElementById("bookingModal");
  const form = document.getElementById("bookingForm");
  if (!modal || !form) return;

  const excursion = excursions.find((item) => item.id === excursionId) || excursions[0];
  state.currentBookingInfo = excursion;

  const excursionInput = document.getElementById("bookingExcursion");
  const adultInput = document.getElementById("bookingAdults");
  const childInput = document.getElementById("bookingChildren");
  const dateInput = document.getElementById("bookingDate");

  if (excursionInput) excursionInput.value = excursion.name;
  if (adultInput) adultInput.value = 1;
  if (childInput) childInput.value = 0;
  if (dateInput) dateInput.value = getLocalDateString();

  clearFormErrors(form);
  updateBookingSummary();
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function updateBookingSummary() {
  const excursion = state.currentBookingInfo || excursions[0];
  const adults = Number(document.getElementById("bookingAdults")?.value || 0);
  const children = Number(document.getElementById("bookingChildren")?.value || 0);

  const adultTotal = adults * excursion.priceAdult;
  const childTotal = children * excursion.priceChild;
  const subtotal = adultTotal + childTotal;

  const adultPriceLabel = document.getElementById("adultPriceLabel");
  const childPriceLabel = document.getElementById("childPriceLabel");
  const subtotalValue = document.getElementById("subtotalValue");
  const totalValue = document.getElementById("totalValue");

  if (adultPriceLabel) adultPriceLabel.textContent = `${formatPrice(adultTotal)}`;
  if (childPriceLabel) childPriceLabel.textContent = `${formatPrice(childTotal)}`;
  if (subtotalValue) subtotalValue.textContent = `${formatPrice(subtotal)}`;
  if (totalValue) totalValue.textContent = `${formatPrice(subtotal)}`;
}

function validateBookingForm(form) {
  let isValid = true;

  const firstName = form.querySelector("#bookingFirstName");
  const lastName = form.querySelector("#bookingLastName");
  const phone = form.querySelector("#bookingPhone");
  const email = form.querySelector("#bookingEmail");
  const date = form.querySelector("#bookingDate");
  const adults = form.querySelector("#bookingAdults");
  const children = form.querySelector("#bookingChildren");

  const requiredFields = [
    { input: firstName, message: "Nombre obligatorio." },
    { input: phone, message: "Teléfono obligatorio." },
    { input: date, message: "Fecha obligatoria." }
  ];

  requiredFields.forEach(({ input, message }) => {
    if (!input) return;
    const value = (input.value || "").trim();
    const parent = input.closest(".field");
    const errorEl = input.parentElement.querySelector(".field-error");

    if (!value) {
      parent?.classList.add("has-error");
      if (errorEl) errorEl.textContent = message;
      isValid = false;
      return;
    }

    parent?.classList.remove("has-error");
    if (errorEl) errorEl.textContent = "";
  });

  if (date && date.value) {
    const selectedDate = new Date(`${date.value}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const parent = date.closest(".field");
    const errorEl = date.parentElement.querySelector(".field-error");

    if (selectedDate < today) {
      parent?.classList.add("has-error");
      if (errorEl) errorEl.textContent = "No puedes elegir una fecha anterior a hoy.";
      isValid = false;
    }
  }

  if (adults) {
    const adultsValue = Number(adults.value || 0);
    const childrenValue = Number(children?.value || 0);
    const parent = adults.closest(".field");
    const errorEl = adults.parentElement.querySelector(".field-error");

    if (adultsValue < 0 || childrenValue < 0) {
      parent?.classList.add("has-error");
      if (errorEl) errorEl.textContent = "No se permiten cantidades negativas.";
      isValid = false;
    }

    if (adultsValue + childrenValue < 1) {
      parent?.classList.add("has-error");
      if (errorEl) errorEl.textContent = "Mínimo 1 persona por reserva.";
      isValid = false;
    }

    if (adultsValue >= 0 && adultsValue + childrenValue >= 1) {
      parent?.classList.remove("has-error");
      if (errorEl) errorEl.textContent = "";
    }
  }

  if (email && email.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const parent = email.closest(".field");
    const errorEl = email.parentElement.querySelector(".field-error");

    if (!emailRegex.test(email.value.trim())) {
      parent?.classList.add("has-error");
      if (errorEl) errorEl.textContent = "Introduce un correo válido.";
      isValid = false;
    } else {
      parent?.classList.remove("has-error");
      if (errorEl) errorEl.textContent = "";
    }
  }

  if (lastName && lastName.value.trim()) {
    const parent = lastName.closest(".field");
    const errorEl = lastName.parentElement.querySelector(".field-error");
    parent?.classList.remove("has-error");
    if (errorEl) errorEl.textContent = "";
  }

  if (phone && phone.value.trim()) {
    const parent = phone.closest(".field");
    const errorEl = phone.parentElement.querySelector(".field-error");
    parent?.classList.remove("has-error");
    if (errorEl) errorEl.textContent = "";
  }

  return isValid;
}

function clearFormErrors(form) {
  form.querySelectorAll(".field").forEach((field) => {
    field.classList.remove("has-error");
    const errorEl = field.querySelector(".field-error");
    if (errorEl) errorEl.textContent = "";
  });
}

function buildWhatsAppMessage(booking) {
  const clientName = `${booking.firstName} ${booking.lastName}`.trim();
  const lines = [
    "Hola, quiero reservar una excursión.",
    "",
    "EXCURSIÓN:",
    booking.excursionName,
    "",
    "CLIENTE:",
    clientName,
    "",
    "HOTEL:",
    booking.hotel || "No especificado",
    "",
    "FECHA:",
    formatDate(booking.date),
    "",
    "PERSONAS:",
    `${booking.adults} Adultos`,
    `${booking.children} Niños`,
    "",
    "PRECIO:",
    `Adultos: ${formatPrice(booking.adultTotal)}`,
    `Niños: ${formatPrice(booking.childTotal)}`,
    "",
    "TOTAL:",
    formatPrice(booking.total),
    "",
    "TELÉFONO:",
    booking.phone,
    "",
    "Quedo pendiente de confirmación. Gracias."
  ];

  return lines.join("\n");
}

function sendWhatsApp(booking) {
  const message = encodeURIComponent(buildWhatsAppMessage(booking));
  const url = `https://wa.me/${CONFIG.whatsapp}?text=${message}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function saveBooking(bookingData) {
  const bookings = getBookings();
  const booking = {
    ...bookingData,
    status: "Pendiente",
    code: generateBookingCode(),
    createdAt: new Date().toISOString()
  };

  bookings.push(booking);
  saveBookings(bookings);
  renderBookings();
  return booking;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  if (!validateBookingForm(form)) {
    showToast("Revisa los datos del formulario antes de continuar.");
    return;
  }

  const excursion = state.currentBookingInfo || excursions[0];
  const adults = Number(document.getElementById("bookingAdults")?.value || 0);
  const children = Number(document.getElementById("bookingChildren")?.value || 0);
  const adultTotal = adults * excursion.priceAdult;
  const childTotal = children * excursion.priceChild;
  const total = adultTotal + childTotal;

  const bookingData = {
    firstName: document.getElementById("bookingFirstName")?.value.trim() || "",
    lastName: document.getElementById("bookingLastName")?.value.trim() || "",
    phone: document.getElementById("bookingPhone")?.value.trim() || "",
    email: document.getElementById("bookingEmail")?.value.trim() || "",
    hotel: document.getElementById("bookingHotel")?.value.trim() || "",
    room: document.getElementById("bookingRoom")?.value.trim() || "",
    excursionName: excursion.name,
    excursionId: excursion.id,
    date: document.getElementById("bookingDate")?.value || "",
    adults,
    children,
    adultTotal,
    childTotal,
    total,
    status: "Pendiente"
  };

  const savedBooking = saveBooking(bookingData);

  if (savedBooking) {
    document.getElementById("bookingModal").classList.remove("active");
    document.getElementById("bookingModal").setAttribute("aria-hidden", "true");
    showToast("Reserva guardada correctamente.");
    sendWhatsApp(savedBooking);
  }
}

function bindEvents() {
  const form = document.getElementById("searchForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const destinationSelect = document.getElementById("searchDestination");
      const categorySelect = document.getElementById("searchCategory");
      const destination = destinationSelect ? destinationSelect.value : "";
      const category = categorySelect ? categorySelect.value : "";

      state.activeCategory = category || "Todos";
      if (!state.activeCategory || state.activeCategory === "Todos") {
        document.querySelectorAll(".category-btn").forEach((button) => {
          button.classList.toggle("active", button.dataset.category === "Todos");
        });
      }

      renderExcursions();
      if (destination || category) {
        showToast("Se aplicaron los filtros seleccionados.");
      }
    });
  }

  document.querySelectorAll(".category-btn").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveCategory(button.dataset.category || "Todos");
    });
  });

  document.getElementById("openBookingsBtn")?.addEventListener("click", () => {
    openBookingsModal();
  });

  document.getElementById("viewBookingsBtn")?.addEventListener("click", () => {
    openBookingsModal();
  });

  document.getElementById("heroReserveBtn")?.addEventListener("click", () => {
    const firstExcursion = excursions[0];
    openBookingModal(firstExcursion.id);
  });

  document.getElementById("bookingForm")?.addEventListener("submit", handleFormSubmit);

  document.getElementById("bookingAdults")?.addEventListener("input", updateBookingSummary);
  document.getElementById("bookingChildren")?.addEventListener("input", updateBookingSummary);

  document.getElementById("mobileMenuToggle")?.addEventListener("click", () => {
    const nav = document.getElementById("mainNav");
    const toggle = document.getElementById("mobileMenuToggle");
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const modalId = event.currentTarget.dataset.close;
      closeModalById(modalId);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModalById("detailsModal");
      closeModalById("bookingModal");
      closeModalById("bookingsModal");
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement) {
      const modal = target.closest(".modal");
      if (modal && target.classList.contains("modal-backdrop")) {
        closeModalById(modal.id);
      }
    }
  });
}

function closeModalById(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

function openBookingsModal() {
  const modal = document.getElementById("bookingsModal");
  if (!modal) return;
  renderBookings();
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function init() {
  configureWhatsAppLinks();
  setMinDateForInputs();
  renderExcursions();
  renderDestinations();
  renderTestimonials();
  renderBookings();
  bindEvents();
  updateBookingSummary();
}

document.addEventListener("DOMContentLoaded", init);
