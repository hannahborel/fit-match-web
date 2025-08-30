import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Make all API routes public so they can handle auth errors themselves
  publicRoutes: ["/api(.*)"],
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Include API routes but make them public
    "/(api|trpc)(.*)",
  ],
};
