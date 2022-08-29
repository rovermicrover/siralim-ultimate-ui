const { create } = require('xmlbuilder2');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function run(){
  const [,,apiUrl,uiUrl] = process.argv;

  const dataEndpoint = `${apiUrl}/creatures`;

  const { data: { data: creatures } } = await axios.get(dataEndpoint, { params: { size: 2000 }});

  const obj = {
    urlset: {
      '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      url: [
        { loc: `${uiUrl}/creatures` },
        { loc: `${uiUrl}/traits` },
        { loc: `${uiUrl}/perks` },
        { loc: `${uiUrl}/spells` },
        { loc: `${uiUrl}/status-effects` },
        ...creatures.map(({ slug }) => ({ loc: `${uiUrl}/creatures/${slug}` }))
      ]
    }
  };

  const doc = create({ version: '1.0' }, obj);

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), doc.end({ prettyPrint: true }));
}

run();