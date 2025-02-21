import {ApiProps} from "@/types/yordam-api-types";
import axios from "axios";
import {HttpProxyAgent} from "http-proxy-agent";
import * as cheerio from "cheerio";

export default async function searchBook({ query, page, firstRequest, proxy }: ApiProps) {
    const res = await axios.get(
        `https://yordam.harran.edu.tr/yordam/?p=${
            page ?? 1
        }&q=${query}&alan=tum_txt`,
        proxy ? { httpAgent: new HttpProxyAgent(proxy) } : {}
    );

    firstRequest = firstRequest ?? false;

    if (res.status === 200) {
        if (firstRequest) {
            // find max page in pagination.
            const $ = cheerio.load(await res.data);
            return $(".pagination").first().find("li").eq(3).text();
        }
        return await res.data;
    }

    throw new Error(`Reponse status code = ${res.status}`);
}