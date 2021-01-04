const isDev = process.env.NODE_ENV !== "production";

export default async function getRepos(language: string, time: number) {
  const endpoint = !isDev ? "" : "http://localhost:2999";

  console.log({ language, time });

  const res = await fetch(
    `${endpoint}/api/repos?language=${language}&time=${time || "7"}`
  );

  const data = await res.json();
  const repos = await data.items;

  return repos;
}
