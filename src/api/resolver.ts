interface IResolve {
  data: any | null,
  error: Error | null
}

export default async function resolve(url: string) : Promise<IResolve> {
  const resolved = {
    data: null,
    error: null,
  };

  try {
    const res = await fetch(url);
    resolved.data = await res.json();
  } catch (e) {
    resolved.error = e;
  }

  return resolved;
}
