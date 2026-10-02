const fmt = n => n.toLocaleString("fr-FR") + " " + CONFIG.devise;
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const enfants = id => CATEGORIES.filter(c => c.parent === id);
const idsDe = id => [id, ...enfants(id).map(c => c.id)];

// Correspondance entre les noms saisis dans admin.html et les identifiants du site
const ID_CATEGORIES = { "Ensembles 3 pièces": "3-pieces", "Ensembles 2 pièces": "2-pieces", "Tee-shirts": "tee-shirts" };
const ID_CHAUSSURES = { "Baskets": "baskets", "Chaussures soignées": "soignees", "Sandales": "sandales" };

async function chargerProduits() {
  const url = `${CONFIG.supabaseUrl}/rest/v1/products?select=*&order=created_at.desc,id.asc`;
  const res = await fetch(url, { headers: { apikey: CONFIG.supabaseKey } });
  if (!res.ok) throw new Error("Chargement impossible");
  const lignes = await res.json();
  return lignes.map(r => ({
    cat: r.category === "Chaussures" ? (ID_CHAUSSURES[r.subcategory] || "chaussures") : ID_CATEGORIES[r.category],
    nom: r.name,
    prix: r.price,
    image: r.image_url
  }));
}

function lienWhatsApp(p) {
  const img = new URL(p.image, location.href).href;
  const msg = `Bonjour, je veux commander ce produit :\n${p.nom}\nPrix : ${fmt(p.prix)}\nImage : ${img}`;
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
}

function carteProduit(p) {
  return `<article class="produit">
    <div class="photo"><img src="${esc(p.image)}" alt="${esc(p.nom)}" loading="lazy"></div>
    <div class="infos"><h3>${esc(p.nom)}</h3><p class="prix">${fmt(p.prix)}</p>
    <a class="btn" href="${lienWhatsApp(p)}" target="_blank" rel="noopener">Commander sur WhatsApp</a></div>
  </article>`;
}

function carteCategorie(c) {
  const first = PRODUITS.find(p => idsDe(c.id).includes(p.cat));
  return `<a class="cat" href="categorie.html?cat=${c.id}">
    <div class="photo">${first ? `<img src="${esc(first.image)}" alt="" loading="lazy">` : ""}</div>
    <h3>${c.nom}</h3><p>${c.desc}</p></a>`;
}

const pages = [["index.html", "Accueil"], ["categories.html", "Catégories"], ["a-propos.html", "À propos"], ["contact.html", "Contact"]];
const courant = location.pathname.split("/").pop() || "index.html";
const actif = f => (f === courant || (courant === "categorie.html" && f === "categories.html")) ? ' aria-current="page"' : "";

document.getElementById("header").innerHTML = `<div class="wrap bar">
  <a class="logo" href="index.html">${CONFIG.nom}</a>
  <button class="menu" aria-label="Menu" onclick="document.body.classList.toggle('open')">Menu</button>
  <nav>${pages.map(([f, n]) => `<a href="${f}"${actif(f)}>${n}</a>`).join("")}</nav></div>`;

document.getElementById("footer").innerHTML = `<div class="wrap foot">
  <p>${CONFIG.nom} - ${CONFIG.adresse}</p>
  <a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener">Nous écrire sur WhatsApp</a></div>`;

document.querySelectorAll("[data-wa]").forEach(a => {
  a.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Bonjour, j'ai une question.")}`;
  a.target = "_blank"; a.rel = "noopener";
});

async function afficher() {
  const grilleCats = document.getElementById("liste-categories");
  const grilleProd = document.getElementById("liste-produits");
  if (!grilleCats && !grilleProd) return; // pages sans produits (contact, a propos)

  if (grilleProd) grilleProd.innerHTML = "<p>Chargement des produits...</p>";

  let erreur = false;
  try {
    PRODUITS = await chargerProduits();
  } catch (e) {
    erreur = true;
  }

  if (grilleCats) grilleCats.innerHTML = CATEGORIES.filter(c => !c.parent).map(carteCategorie).join("");

  if (grilleProd) {
    const id = new URLSearchParams(location.search).get("cat");
    const c = CATEGORIES.find(x => x.id === id);
    if (!c) {
      grilleProd.innerHTML = "<p>Catégorie introuvable. <a href='categories.html'>Voir les catégories</a></p>";
      return;
    }
    document.title = c.nom + " - " + CONFIG.nom;
    document.getElementById("titre-cat").textContent = c.nom;
    document.getElementById("desc-cat").textContent = c.desc;
    const onglets = document.getElementById("autres");
    const parent = CATEGORIES.find(x => x.id === c.parent);
    if (parent) onglets.insertAdjacentHTML("beforebegin", `<p class="sous" style="margin-bottom:14px"><a href="categorie.html?cat=${parent.id}">Retour : ${parent.nom}</a></p>`);
    onglets.innerHTML = CATEGORIES.filter(x => x.parent === c.parent)
      .map(x => `<a href="categorie.html?cat=${x.id}"${x.id === id ? ' aria-current="page"' : ""}>${x.nom}</a>`).join("");

    const sous = enfants(id);
    if (sous.length) grilleProd.innerHTML = sous.map(carteCategorie).join("");
    else if (erreur) grilleProd.innerHTML = "<p>Impossible de charger les produits pour le moment. Réessayez dans un instant.</p>";
    else {
      const liste = PRODUITS.filter(p => p.cat === id);
      grilleProd.innerHTML = liste.length ? liste.map(carteProduit).join("") : "<p>Aucun produit pour le moment.</p>";
    }
  }
}

afficher();