"use client";

import { useState, useEffect } from "react";
import { subscribeSiteContent, SiteContent, DEFAULT_CONTENT } from "@/lib/cms";

export function useSiteContent() {
    const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeSiteContent((data) => {
            setContent(data);
            setIsLoading(false);
        });
        
        return () => unsubscribe();
    }, []);

    return { content, isLoading };
}
