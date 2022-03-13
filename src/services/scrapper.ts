import { get } from "./axios"
import { getHTMLWebsite } from "./puppeteer"
import { logError } from "./logger"

export const getPageWebsite = async (url: string) => {
    try {
        const html = await getHTMLWebsite(url)
        return html 
    } catch (error) {
        logError(error, 'scrapper service')
        throw error
    }
}