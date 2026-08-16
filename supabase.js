// ============================================
// SUPABASE CONFIG — Custom Closet
// ============================================
const SUPABASE_URL = 'https://ikbmlzqgydxcglikzrah.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrYm1senFneWR4Y2dsaWt6cmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3ODA4MTIsImV4cCI6MjEwMTM1NjgxMn0.i5SoG1HOgzki_zTkRaEYE1vDGJqa3t8M5IgszjprJgc';

// ── REVIEWS ──
async function sbGetReviews(productId) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/reviews?product_id=eq.${productId}&order=created_at.desc`,
    { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
  );
  if (!res.ok) return [];
  return res.json();
}

async function sbInsertReview(review) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(review)
  });
  return res.ok;
}

// ── ORDERS ──
async function sbInsertOrder(order) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(order)
  });
  return res.ok;
}

async function sbGetOrders() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/orders?order=created_at.desc`,
    { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
  );
  if (!res.ok) return [];
  return res.json();
}

async function sbUpdateOrderStatus(id, status) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  });
  return res.ok;
}

async function sbDeleteOrder(id) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${id}`, {
    method: 'DELETE',
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  return res.ok;
}

// ── CUSTOM ORDER REVIEWS (for homepage showcase) ──
async function sbGetCustomReviews() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/custom_reviews?order=created_at.desc`,
    { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
  );
  if (!res.ok) return [];
  return res.json();
}

async function sbInsertCustomReview(review) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/custom_reviews`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(review)
  });
  return res.ok;
}

async function sbDeleteCustomReview(id) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/custom_reviews?id=eq.${id}`, {
    method: 'DELETE',
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  return res.ok;
}