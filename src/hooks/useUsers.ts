import { useEffect, useState } from "react";

export type ApiUser = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export function useUsers() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => {
        if (!r.ok) throw new Error("Network error");
        return r.json();
      })
      .then((data) => {
        if (!mounted) return;
        setUsers(data);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return { users, loading, error };
}
