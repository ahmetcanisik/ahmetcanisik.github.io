import searchBook from "@/(server)/(helpers)/search-book";
import {BookType} from "@/types/yordam-api-types";
import * as cheerio from 'cheerio';
import {assignNames} from "@/lib/assign-names";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    console.log();

    const searchWord = searchParams.get("q") ?? "";
    const bookArchive: BookType[] = [];


    const $ = cheerio.load(
        await searchBook({ query: searchWord })
    );

    const books = $("div[data-recordid]");

    books.map((_, book) => {
        let collectInfo: BookType = {
            name: book.attribs["data-eseradi"],
        };

        const bookDetails = $(book).find(
            "div.kutuphane.float-left.text-muted.small"
        );

        bookDetails.map((_, b) => {
            const details = $(b).find("span");

            details.map((_, detail) => {
                const detailName = $(detail).text();
                const detailValue = $(detail).next("b").text();

                assignNames.forEach((names) => {
                    if (names.assign === detailName.toLowerCase()) {
                        collectInfo = {
                            ...collectInfo,
                            [names.name]: detailValue,
                        };
                    }
                });
            });
        });

        bookArchive.push(collectInfo);
    });

    return Response.json(bookArchive);
}
