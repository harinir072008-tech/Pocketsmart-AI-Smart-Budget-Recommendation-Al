import React from "react";

const products = [
  { name: "Gold-Plated Temple Necklace", price: "₹1,499", rating: "4.4", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80", reason: "Great for wedding and traditional outfits", search: "gold plated temple necklace" },
  { name: "Kundan Choker Set", price: "₹1,899", rating: "4.5", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80", reason: "Works well with party and festive looks", search: "kundan choker set" },
  { name: "Pearl Earrings", price: "₹699", rating: "4.3", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80", reason: "Simple matching option for elegant outfits", search: "pearl earrings women" },
  { name: "Antique Jhumka Earrings", price: "₹899", rating: "4.6", image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=600&q=80", reason: "Traditional style for festivals and functions", search: "antique jhumka earrings" }
];

export default function JewelryRecommendations({ budget, occasion, style }) {
  return (
    <section style={{ marginTop: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div><h2 style={{ margin: 0 }}>💎 Jewellery Recommendations</h2><p style={{ margin: "6px 0 0", color: "#666" }}>Shopping-style references based on your budget and occasion.</p></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 18 }}>
        {products.map((p) => (
          <article key={p.name} style={{ background: "white", border: "1px solid #e7dce7", borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 20px rgba(0,0,0,.07)" }}>
            <img src={p.image} alt={p.name} style={{ width: "100%", height: 190, objectFit: "cover" }} />
            <div style={{ padding: 15 }}>
              <div style={{ color: "#f59e0b", fontSize: 13 }}>★ {p.rating}</div>
              <h3 style={{ margin: "7px 0", fontSize: 16 }}>{p.name}</h3>
              <strong style={{ fontSize: 19 }}>{p.price}</strong>
              <p style={{ color: "#666", fontSize: 13, lineHeight: 1.45 }}>{p.reason}</p>
              <a href={`https://www.amazon.in/s?k=${encodeURIComponent(p.search)}`} target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", textDecoration: "none", background: "#111827", color: "white", padding: "10px", borderRadius: 9, fontWeight: 700 }}>View Reference →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
