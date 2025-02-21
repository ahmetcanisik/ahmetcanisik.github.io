"use client";

import { useEffect, useState } from "react";

export default function ListFetched() {
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/fetch-test")
            .then((res) => res.json())
            .then((json) => setData(json.maxPage));
    }, []);

    return <div>harran library max page is {data ?? "loading result..."}</div>;
}