// This file tells Next.js to render its children (the page.jsx)
// without trying to pre-build it as a static page.
// This is necessary for dynamic routes that rely on client-side data.

export default function ProductDetailLayout({ children }) {
  return <>{children}</>;
}