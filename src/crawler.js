const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const LeanResponse = (html) => {
	const $ = cheerio.load(html);

  const at = $('div').filter('.min-width-0').text()
  const span = $('a').filter('.lh-default > a').text();
  const items = at.split('[');

  const response = [];

items.forEach((item) => {
  const title = item.slice(1).trim();

	const index = title.indexOf("\n")
	const novaString = title.slice(0, index);

  if (title) {
    const lines = title.split('\n');
    const chunks = lines.reduce((acc, line, i) => {
      if (i === 3) {
        acc.push({
          tags: [],
        });
      } else if (i > 3) {
        acc[acc.length - 1].tags.push(line);
      }

      return acc;
    }, []);

    response.push({
			title: novaString,
			tag: chunks
		});
  }
});

	response.shift()
	fs.writeFile('./response.json', JSON.stringify(response), (err) => {
		if (err) {
			console.log('Erro ao salvar arquivo:');
		} else {
			console.log('Arquivo salvo com sucesso!');
		}
	});

  return response
};

const SearchNoticies = async (callback) => {
  try {
    const response = await axios({
      url: 'https://github.com/frontendbr/vagas/issues',
      method: 'get',
    });

    const objectReturn = await LeanResponse(response.data);
    return objectReturn;
  } catch (err) {
    callback(err);
  }
};

SearchNoticies((err, response) => {
  if (err) {
    // console.log('error', err);
  } else {
    // console.log('response', response);
  }
});

module.exports = {
  SearchNoticies,
};