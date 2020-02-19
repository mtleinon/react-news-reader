// fetchWithTimeout implementation copied from blog:
// https://davidwalsh.name/fetch-timeout

// function fetchWithTimeout(url, options, timeout) {
//   return new Promise((resolve, reject) => {
//     // Set timeout timer
//     let timer = setTimeout(
//       () => reject(new Error('Request timed out')),
//       timeout
//     );

//     fetch(url, options).then(
//       response => resolve(response),
//       err => reject(err)
//     ).finally(() => clearTimeout(timer));
//   })
// }


// Caller handles the thrown error
export async function fetchJson(query) {
  // const replyInJson = await fetchWithTimeout(
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