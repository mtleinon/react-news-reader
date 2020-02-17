export async function fetchJson(query) {
  const replyInJson = await fetch(
    query, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json'
    },
    credentials: "include"
  });

  return await replyInJson.json();
}