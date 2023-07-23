import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(req: NextRequestWithAuth) {
        const pathname: string = req.nextUrl.pathname;

        // Manage route protection
        const sensitiveRoutes: string[] = ["/main-menu"];
        const isAccessingSensitiveRoute = sensitiveRoutes.some(
            (route: string) => pathname.startsWith(route)
        );
        const isAuth: boolean = !!(await getToken({ req }));
        const isLoginPage: boolean = pathname.startsWith("/login");

        if (isLoginPage) {
            if (isAuth)
                return NextResponse.redirect(new URL("/main-menu", req.url));

            return NextResponse.next();
        }

        if (!isAuth && isAccessingSensitiveRoute)
            return NextResponse.redirect(new URL("/login", req.url));

        if (pathname === "/")
            return NextResponse.redirect(new URL("/main-menu", req.url));
    },
    {
        callbacks: {
            async authorized() {
                return true;
            },
        },
    }
);

export const config = {
    matchter: ["/", "/login", "/main-menu/:path*"],
};
