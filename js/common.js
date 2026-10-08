// Piezas compartidas: navegación, footer con el Puente Pumarejo, fondos y animaciones.
(function () {
  const WHATSAPP = "https://wa.me/570000000000?text=" + encodeURIComponent("¡Hola! Quiero reservar la ruta Puerta de Oro.");

  function nav(active) {
    const el = document.createElement("nav");
    el.className = "nav";
    el.innerHTML = `
      <a class="brand" href="index.html"><span class="dot"></span>Puerta de Oro</a>
      <a class="link ${active === "ruta" ? "active" : ""}" href="ruta.html">La ruta</a>
      <a class="link hide-sm" href="index.html#historia">Historia</a>
      <a class="link hide-sm" href="index.html#dia">El día</a>
      <a class="btn" href="${WHATSAPP}" target="_blank" rel="noopener">Reservar</a>`;
    document.body.prepend(el);
  }

  function footer() {
    const stops = (window.STOPS || []).map((s) => `<a href="parada.html?id=${s.id}">${String(s.n).padStart(2, "0")} · ${s.short}</a>`).join("");
    const el = document.createElement("footer");
    el.className = "footer";
    el.innerHTML = `
      <div class="bridge" style="background-image:url('assets/img/pumarejo2.jpg')"></div>
      <div class="inner wrap">
        <h2 class="giant">Barranquilla<span>de río a mar</span></h2>
        <p class="hand hand-cap">— nos vemos bajo el Puente Pumarejo —</p>
      </div>
      <div class="panel">
        <div class="about">
          <a class="brand" href="index.html"><span class="dot"></span>Puerta de Oro · Tours</a>
          <p>Operador turístico local. Una ruta para entender por qué Barranquilla fue la puerta de entrada de Colombia.</p>
          <a class="btn sun" href="${WHATSAPP}" target="_blank" rel="noopener">Escríbenos por WhatsApp</a>
        </div>
        <div><h4>Las paradas</h4>${stops}</div>
        <div><h4>Explora</h4>
          <a href="ruta.html">Mapa de la ruta</a>
          <a href="index.html#historia">Lo que vas a aprender</a>
          <a href="index.html#dia">Cómo es el día</a>
          <a href="creditos.html">Créditos de fotos</a>
        </div>
        <div><h4>Contacto</h4>
          <a href="#">hola@puertadeoro.co</a>
          <a href="#">+57 300 000 0000</a>
          <a href="#">Instagram</a>
          <a href="#">Barranquilla, Atlántico</a>
        </div>
        <div class="legal">
          <span>© 2026 Puerta de Oro · Tours — prototipo v1</span>
          <span>Foto: Puente Pumarejo, Gaabii98 · CC BY-SA 4.0</span>
        </div>
      </div>`;
    document.body.append(el);
  }

  function backdrop(img) {
    const bg = document.createElement("div");
    bg.className = "backdrop";
    bg.style.backgroundImage = `url('${img}')`;
    const grain = document.createElement("div");
    grain.className = "grain";
    document.body.prepend(grain);
    document.body.prepend(bg);
    // leve parallax del fondo
    addEventListener("scroll", () => {
      bg.style.transform = `translateY(${-Math.min(scrollY * 0.03, 60)}px)`;
    }, { passive: true });
  }

  // Monumentos que aparecen a izquierda/derecha según el avance del scroll.
  // items: [{ img, cap, side: 'left'|'right', top: '20%', from: 0.1, to: 0.35 }]
  function ghosts(items) {
    const box = document.createElement("div");
    box.className = "ghosts";
    box.innerHTML = items.map((g) => `
      <div class="ghost ${g.side}" style="top:${g.top}">
        <div class="frame"><img src="${g.img}" alt=""></div>
        <div class="cap">${g.cap}</div>
      </div>`).join("");
    document.body.prepend(box);
    const els = [...box.children];
    const tick = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? scrollY / max : 0;
      els.forEach((el, i) => {
        const g = items[i];
        const on = p >= g.from && p <= g.to;
        el.classList.toggle("on", on);
        if (on) {
          const local = (p - g.from) / (g.to - g.from); // 0..1
          el.style.translate = `0 ${(0.5 - local) * 80}px`;
        }
      });
    };
    addEventListener("scroll", tick, { passive: true });
    addEventListener("resize", tick);
    tick();
  }

  function reveals() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  window.Site = { nav, footer, backdrop, ghosts, reveals, WHATSAPP };
})();
