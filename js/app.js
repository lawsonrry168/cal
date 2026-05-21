const VitaApp = {
  CART_KEY: "vitapure_cart",

  getCart() {
    try {
      return JSON.parse(localStorage.getItem(this.CART_KEY)) || [];
    } catch {
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    this.updateCartBadge();
  },

  getProduct(id) {
    return VITA_DATA.products.find((p) => p.id === Number(id));
  },

  formatPrice(n) {
    return `NT$ ${n.toLocaleString("zh-TW")}`;
  },

  updateCartBadge() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;
    const cart = this.getCart();
    const total = cart.reduce((s, i) => s + i.qty, 0);
    badge.textContent = total;
    badge.style.display = total > 0 ? "grid" : "none";
  },

  addToCart(productId, qty = 1) {
    const product = this.getProduct(productId);
    if (!product) return;
    const cart = this.getCart();
    const existing = cart.find((i) => i.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: product.id, qty });
    }
    this.saveCart(cart);
    this.showToast(`已將「${product.name}」加入購物車`);
  },

  showToast(msg) {
    let toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("show"), 2800);
  },

  initHeader() {
    const toggle = document.getElementById("menu-toggle");
    const mobileNav = document.getElementById("nav-mobile");
    if (toggle && mobileNav) {
      toggle.addEventListener("click", () => mobileNav.classList.toggle("open"));
    }
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav]").forEach((el) => {
      const href = el.getAttribute("href");
      if (href === path || (path === "" && href === "index.html")) {
        el.classList.add("active");
      }
    });
    this.updateCartBadge();
  },

  renderProductCard(product) {
    const tag = product.tag
      ? `<span class="product-tag">${product.tag}</span>`
      : "";
    const oldPrice = product.originalPrice
      ? `<span class="price-old">${this.formatPrice(product.originalPrice)}</span>`
      : "";
    return `
      <article class="card product-card" data-id="${product.id}">
        <a href="product.html?id=${product.id}">
          <div class="product-img">${product.emoji}${tag}</div>
        </a>
        <div class="card-body">
          <a href="product.html?id=${product.id}"><h3>${product.name}</h3></a>
          <p class="product-meta">${product.desc.slice(0, 40)}…</p>
          <div class="product-price">
            <span class="price-current">${this.formatPrice(product.price)}</span>
            ${oldPrice}
          </div>
          <div class="product-actions">
            <a href="product.html?id=${product.id}" class="btn btn-outline btn-sm">詳情</a>
            <button class="btn btn-primary btn-sm" data-add-cart="${product.id}">加入購物車</button>
          </div>
        </div>
      </article>`;
  },

  bindAddToCart(container = document) {
    container.querySelectorAll("[data-add-cart]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.addToCart(Number(btn.dataset.addCart));
      });
    });
  },

  initFAQ() {
    document.querySelectorAll(".faq-question").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const wasOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
        if (!wasOpen) item.classList.add("open");
      });
    });
  },
};

document.addEventListener("DOMContentLoaded", () => VitaApp.initHeader());
