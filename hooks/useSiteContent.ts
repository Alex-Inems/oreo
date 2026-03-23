"use client";

import { useState, useEffect } from "react";
import { getSiteContent, SiteContent, DEFAULT_CONTENT } from "@/lib/cms";

export function useSiteContent() {
    const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await getSiteContent();
            setContent(data);
            setIsLoading(false);
        }
        load();
    }, []);

    return { content, isLoading };
}
