import { supabase } from "@/src/lib/supabase";

type Review = {
  id: number;
  reviewer_name: string;
  rating: number;
  review_text: string;
  created_at: string;
};

export default async function ReviewsPage() {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Fehler beim Laden</h1>
        <p>{error.message}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: "bold", marginBottom: 24 }}>
        Reviews
      </h1>

      <div style={{ display: "grid", gap: 16 }}>
        {reviews?.map((review: Review) => (
          <div
            key={review.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div style={{ marginBottom: 8, fontWeight: "bold" }}>
              {review.reviewer_name} · {review.rating}★
            </div>
            <p style={{ marginBottom: 8 }}>{review.review_text}</p>
            <small>{new Date(review.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </main>
  );
}
