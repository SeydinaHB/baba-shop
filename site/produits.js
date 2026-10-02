// ===== A MODIFIER : ta boutique =====
const CONFIG = {
  nom: "BABA SHOP",
  whatsapp: "221788710815", // numero au format international, sans + ni espaces
  devise: "FCFA",
  adresse: "Dakar, Senegal",
  horaires: "Tous les jours, 9h - 20h",
  supabaseUrl: "https://uqqeajelxdysqpnxlerg.supabase.co",
  supabaseKey: "sb_publishable_cnD_UBIwachCXXeBOIftWQ_enQ7c7pu"
};

// Categorie principale : pas de "parent".
// Sous-categorie : ajoute parent: "id-de-la-categorie-principale".
const CATEGORIES = [
  { id: "3-pieces", nom: "Ensembles 3 pièces", desc: "Trois pièces assorties pour une tenue complète." },
  { id: "2-pieces", nom: "Ensembles 2 pièces", desc: "Le duo simple et élégant, prêt à porter." },
  { id: "tee-shirts", nom: "Tee-shirts", desc: "Coupes soignées pour tous les jours." },
  { id: "chaussures", nom: "Chaussures", desc: "Baskets, chaussures soignées et sandales." },
  { id: "baskets", parent: "chaussures", nom: "Baskets", desc: "Confort et style au quotidien." },
  { id: "soignees", parent: "chaussures", nom: "Chaussures soignées", desc: "Pour les grandes occasions." },
  { id: "sandales", parent: "chaussures", nom: "Sandales", desc: "Légères et pratiques." }
];

// Les produits ne sont plus ecrits ici : ils sont charges depuis Supabase.
// Pour les ajouter, modifier ou supprimer, utiliser la page admin.html.
let PRODUITS = [];