async function checkEndpoint(url) {
  try {
    const res = await fetch(url);
    console.log(`\n--- Status for ${url} ---`);
    console.log(`Status: ${res.status} ${res.statusText}`);
    const text = await res.text();
    if (res.status !== 200) {
      console.log('Body snippet:', text.substring(0, 500)); // Log first 500 chars of error
    } else {
      console.log('Body snippet:', text.substring(0, 100));
    }
  } catch (err) {
    console.error(`Failed to fetch ${url}:`, err.message);
  }
}

async function main() {
  await checkEndpoint('http://localhost:3000/robots.txt');
  await checkEndpoint('http://localhost:3000/sitemap.xml');
  await checkEndpoint('http://localhost:3000/');
}

main();
