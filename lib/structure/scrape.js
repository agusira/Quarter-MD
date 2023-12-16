import fetch from 'node-fetch';
import axios from 'axios'
import cheerio from 'cheerio'
// import yt from 'ytdl-core'
// import yts from './yt-search'

export class Acytoo {
	static url = 'https://chat.acytoo.com';
	static working = true;
	static supports_gpt_35_turbo = true;
	static async *createAsyncGenerator(model, messages, proxy = null, kwargs) {
		const headers = _createHeader();
		const payload = _createPayload(messages, kwargs);
		const response = await fetch(this.url + '/api/completions', {
			method: 'POST',
			headers,
			body: JSON.stringify(payload),
			proxy: proxy,
		});
		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
		}
		for await (const chunk of response.body) {
			if (chunk) {
				yield chunk.toString();
			}
		}
	}
}
function _createHeader() {
	return {
		'accept': '*/*',
		'content-type': 'application/json',
	};
};
function _createPayload(messages, { temperature = 0.5 } = {}) {
	return {
		'key': '',
		'model': 'gpt-3.5-turbo',
		'messages': messages,
		'temperature': temperature,
		'password': '',
	};
};



export function otakudesu(judul) {
	return new Promise(async (resolve, reject) => {
		axios.get('https://otakudesu.cam/?s=' + judul + '&post_type=anime')
			.then(({ data }) => {
				const $ = cheerio.load(data)
				const result = {};
				let limk = $('#venkonten > div > div.venser > div > div > ul > li:nth-child(1) > h2 > a').attr('href')
				axios.get(limk).then(({ data }) => {
					const $$ = cheerio.load(data)
					result.message = 'KirBotz'
					result.img = $$('#venkonten > div.venser > div.fotoanime').find('img').attr('src')
					$$('#venkonten > div.venser > div.fotoanime > div.infozin > div').each(function(a, b) {
						result.judul = $$(b).find('p:nth-child(1)').text().replace('Judul: ', '')
						result.jepang = $$(b).find('p:nth-child(2)').text().replace('Japanese: ', '')
						result.rate = $$(b).find('p:nth-child(3)').text().replace('Skor: ', '')
						result.produser = $$(b).find('p:nth-child(4)').text().replace('Produser: ', '')
						result.tipe = $$(b).find('p:nth-child(5)').text().replace('Tipe: ', '')
						result.status = $$(b).find('p:nth-child(6)').text().replace('Status: ', '')
						result.episode = $$(b).find('p:nth-child(7)').text().replace('Total Episode: ', '')
						result.durasi = $$(b).find('p:nth-child(8)').text().replace('Durasi: ', '')
						result.rilis = $$(b).find('p:nth-child(9)').text().replace('Tanggal Rilis: ', '')
						result.studio = $$(b).find('p:nth-child(10)').text().replace('Studio: ', '')
						result.genre = $$(b).find('p:nth-child(11)').text().replace('Genre: ', '')
						result.desc = $$('#venkonten > div.venser > div.fotoanime > div.sinopc').text().replace('.', '\n') + $$(b).find('div.sinopc > p:nth-child(2)').text()
						result.batch = $$('#venkonten > div.venser > div:nth-child(10) > ul > li > span:nth-child(1) > a').attr('href')
					})
					const lim = $$('#venkonten > div.venser > div:nth-child(10) > ul > li > span:nth-child(1) > a').attr('href')
					axios.get(lim).then(({ data }) => {
						const $$$ = cheerio.load(data)
						result.batchSD = $$$('#venkonten > div:nth-child(6) > ul > li:nth-child(1) > a:nth-child(3)').attr('href')
						result.batchHD = $$$('#venkonten > div:nth-child(6) > ul > li:nth-child(3) > a:nth-child(3)').attr('href')
						// resolve(result)
					})
					resolve(result)
				})
			})
			.catch(reject)
	})
}


