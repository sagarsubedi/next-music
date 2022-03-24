import { NextResponse } from "next/server";

// this will fire before any of the other pages are requested
// to protect the pages
const signedinPages = ['/', '/playlist', '/library']

export default function middleware(req) {
    if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
        const token = req.cookies.TRAX_ACCESS_TOKEN;

        if (!token) {
            return NextResponse.redirect('/signin');
        }
    }
}