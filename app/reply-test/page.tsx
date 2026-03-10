import { createClient } from "@supabase/supabase-js";

type Review = {
  id: number;
  reviewer_name: string;
  rating: number;
  review_text: string;
  created_at: string;
};

export default async function ReplyTestPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Fehler beim Laden</h1>
        <p>{error.message}</p>
      </main>
    );
  }

  const review = reviews?.[0];

  if (!review) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Keine Reviews gefunden</h1>
        <p>In der Tabelle reviews ist noch kein Eintrag vorhanden.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: "bold", marginBottom: 24 }}>
        Reply Test
      </h1>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 16,
          maxWidth: 700,
        }}
      >
        <div style={{ marginBottom: 8, fontWeight: "bold" }}>
          {review.reviewer_name} · {review.rating}★
        </div>
        <p style={{ marginBottom: 8 }}>{review.review_text}</p>
        <small>{new Date(review.created_at).toLocaleString()}</small>
      </div>
    </main>
  );
}
