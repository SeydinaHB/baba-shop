// ===== A MODIFIER : ta boutique =====
const CONFIG = {
  nom: "BABA SHOP",
  whatsapp: "221773189329", // ton numero, format international, sans + ni espaces
  devise: "FCFA",
  adresse: "Dakar, Senegal",
  horaires: "Tous les jours, 9h - 20h"
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

// Un produit = une ligne. "cat" = l'id de sa categorie (chaussures : baskets, soignees ou sandales).
// Mets l'image dans le dossier images/
const PRODUITS = [
  { cat: "3-pieces", nom: "Ensemble 3 pièces Modèle 1", prix: 35000, image: "images/3p1.jpeg" },
  { cat: "3-pieces", nom: "Ensemble 3 pièces Modèle 2", prix: 38000, image: "images/3p2.jpeg" },
  { cat: "3-pieces", nom: "Ensemble 3 pièces Modèle 3", prix: 40000, image: "images/3p3.jpeg" },
  { cat: "2-pieces", nom: "Ensemble 2 pièces Modèle 1", prix: 25000, image: "images/2p1.jpeg" },
  { cat: "2-pieces", nom: "Ensemble 2 pièces Modèle 2", prix: 27000, image: "images/2p2.jpeg" },
  { cat: "tee-shirts", nom: "Tee-shirt Modèle 1", prix: 8000, image: "images/ts1.jpeg" },
  { cat: "tee-shirts", nom: "Tee-shirt Modèle 2", prix: 9000, image: "images/ts2.jpeg" },
  { cat: "baskets", nom: "AIR MAX", prix: 20000, image: "images/bk1.jpeg" },
  { cat: "baskets", nom: "NEW BALANCE", prix: 22000, image: "images/bk2.jpeg" },
  { cat: "soignees", nom: "Chaussure soignée Modèle 1", prix: 30000, image: "images/so1.jpeg" },
  { cat: "sandales", nom: "CROCS spiderman", prix: 10000, image: "images/sa1.jpeg" }
];