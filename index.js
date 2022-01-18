"use strict"
const PORT = process.env.PORT || 8888
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express();

const news = [
    {
        name: 'google news',
        address: 'https://news.google.com/topstories?hl=en-US&gl=US&ceid=US:en',
        base:'https://news.google.com'
    },
    {
        name: 'yahoo news',
        address: 'https://news.yahoo.com/',
        base: 'https://news.yahoo.com'
    },
    {
        name: 'huffington post',
        address: 'https://www.huffpost.com/',
        base: 'https://www.huffpost.com'
    },
    {
        name: 'cnn',
        address: 'https://www.cnn.com/',
        base: 'https://www.cnn.com'
    },
    {
        name: 'the guardian',
        address: 'https://www.theguardian.com/us',
        base: 'https://www.theguardian.com'
    },
    {
        name: 'usa today',
        address: 'https://www.usatoday.com/',
        base: 'https://www.usatoday.com'
    },
    {
        name: 'business insider',
        address: 'https://www.businessinsider.com/',
        base: 'https://www.businessinsider.com'
    },
    {
        name: 'bbc',
        address: 'https://www.bbc.com/',
        base: 'https://www.bbc.com'
    },
    {
        name: 'vice',
        address: 'https://www.vice.com/',
        base: 'https://www.vice.com'
    },
    {
        name: 'the new york post',
        address: 'https://nypost.com/',
        base: 'https://nypost.com'
    },
    {
        name: 'vox',
        address: 'https://www.vox.com/',
        base: 'https://www.vox.com'
    },
    {
        name: 'the atlantic',
        address: 'https://www.theatlantic.com/',
        base: 'https://www.theatlantic.com'
    },
    {
        name: 'the times of india',
        address: 'https://timesofindia.indiatimes.com/us',
        base: 'https://timesofindia.indiatimes.com'
    },
    {
        name: 'china daily',
        address: 'http://global.chinadaily.com.cn/',
        base: 'http://global.chinadaily.com.cn'
    },
    {
        name: 'the hindu',
        address: 'https://www.thehindu.com/',
        base: 'https://www.thehindu.com'
    },
    {
        name: 'the south china morning post',
        address: 'https://www.scmp.com/',
        base: 'https://www.scmp.com'
    },
    {
        name: 'al jazeera',
        address: 'https://www.aljazeera.com',
        base: 'https://www.aljazeera.com'
    },
    {
        name: 'NDTV world news',
        address: 'https://www.ndtv.com/world-news',
        base: 'https://www.ndtv.com/world-news'
    },
    {
        name: 'reuters',
        address: 'https://www.reuters.com/world/',
        base: 'https://www.reuters.com/world'
    },
    {
        name: 'npr',
        address: 'https://www.npr.org/sections/world/',
        base: 'https://www.npr.org/sections/world'
    },
    {
        name: 'DW News',
        address: 'https://www.dw.com/en/top-stories/s-9097',
        base: 'https://www.dw.com/en/top-stories/s-9097'
    },
    {
        name: 'Sputnik',
        address: 'https://sputniknews.com/world/',
        base: 'https://sputniknews.com/world'
    },
    {
        name: 'CBC',
        address: 'https://www.cbc.ca/news/world',
        base: 'https://www.cbc.ca/news/world'
    },
    {
        name: 'abc australia',
        address: 'https://www.abc.net.au/news/world/',
        base: 'https://www.abc.net.au/news/world'
    },
    {
        name: 'euronews',
        address: 'https://www.euronews.com/news/international',
        base: 'https://www.euronews.com/news/'
    },
    {
        name: 'daily mirror',
        address: 'https://www.mirror.co.uk/news/world-news/',
        base: 'https://www.mirror.co.uk/news/world-news'
    },
    {
        name: 'The Sydney Morning Herald',
        address: 'https://www.smh.com.au/world',
        base: 'https://www.smh.com.au/world'
    },
    {
        name: 'france 24',
        address: 'https://www.france24.com/en/',
        base: 'https://www.france24.com/en'
    },
    {
        name: 'the sun',
        address: 'https://www.thesun.co.uk/news/worldnews/',
        base: 'https://www.thesun.co.uk/news/worldnews'
    },
    {
        name: 'quint daily',
        address: 'https://quintdaily.com/',
        base: 'https://quintdaily.com'
    },
    {
        name: 'news blaze',
        address: 'https://newsblaze.com/',
        base: 'https://newsblaze.com'
    },
    {
        name: 'small wars journal blog',
        address: 'https://smallwarsjournal.com/blog/recent',
        base: 'https://smallwarsjournal.com/blog/recent'
    },
    {
        name: 'ifp news',
        address: 'https://ifpnews.com/',
        base: 'https://ifpnews.com'
    },
    {
        name: '247 News Around the World',
        address: 'https://247newsaroundtheworld.com/',
        base: 'https://247newsaroundtheworld.com'
    },
    {
        name: 'Radarr Africa',
        address: 'https://radarr.africa/',
        base: 'https://radarr.africa'
    },
]

news.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $(`a:contains('vaccine')`, html).each(function() {
                let title = $(this).text().trim()

                let  url = $(this).attr('href')

                url = url.replace(/\s+/g, '')

                if (url.startsWith("/")||url.startsWith(".")) {
                    url = newspaper.base + url
                }

                if (url.startsWith("/")||url.startsWith(".")) {
                    url = "could not load base url"
                }

                articles.push({
                    title,
                    url: url,
                    source_website: newspaper.name
                })
            })
        })
})

const articles = []

app.get('/news',(req,res) => {
    res.json(articles)
})

app.listen(PORT, () => console.log('server running on PORT ' + PORT))
