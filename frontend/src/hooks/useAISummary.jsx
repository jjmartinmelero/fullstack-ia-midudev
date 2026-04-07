import { useState } from "react";
const API_URL =
  import.meta.env.VITE_BACKEND_HOST ?? "https://jscamp-api.vercel.app/api";

export function useAISummary(jobId) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateSummary = async () => {
    setLoading(true);
    setError(null);
    setSummary("");

    try {
      const response = await fetch(`${API_URL}/ai/summary/${jobId}`);

      if (!response.ok) {
        throw new Error("Error fetching summary");
      }

      // read stream data
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // every chunk is a text fragment
        const chunk = decoder.decode(value, { stream: true });
        setSummary((prev) => prev + chunk);
      }
    } catch {
      setError("Error generating summary");
    } finally {
      setLoading(false);
    }
  };

  return {
    summary,
    loading,
    error,
    generateSummary,
  };
}
