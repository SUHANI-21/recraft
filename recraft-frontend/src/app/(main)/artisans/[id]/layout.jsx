// This file's only job is to tell Next.js that this is a fully dynamic route.
// It allows the page.jsx component inside to handle its own data fetching
// and rendering without being pre-built as a static page.

export default function ArtisanStorefrontLayout({ children }) {
  // It simply renders the page component that is passed in as a child.
  return <>{children}</>;
}