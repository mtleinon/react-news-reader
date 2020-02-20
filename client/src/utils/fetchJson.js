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
  if (replyInJson.status !== 200) {
    throw new Error('Internal server error');
  }

  return await replyInJson.json();
}