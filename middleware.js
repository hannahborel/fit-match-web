import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Make specific API routes public that don't need auth
  publicRoutes: ["/api(.*)"],
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
