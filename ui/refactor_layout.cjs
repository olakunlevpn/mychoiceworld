const fs = require('fs');

const appTsx = fs.readFileSync('src/App.tsx', 'utf8');

// The main part of App.tsx starts at <main> and ends at </main>
const mainStart = appTsx.indexOf('<main>');
const mainEnd = appTsx.indexOf('</main>') + '</main>'.length;

const mainContent = appTsx.substring(mainStart, mainEnd);

const beforeMain = appTsx.substring(0, mainStart);
const afterMain = appTsx.substring(mainEnd);

// 1. Create Layout.tsx
let layoutContent = beforeMain.replace(
  "export default function App() {",
  "import { Outlet, Link } from 'react-router-dom';\n\nexport default function Layout() {"
) + "\n        <Outlet />\n" + afterMain;
// Close the missing brackets/tags if needed. Wait, afterMain contains the footer and the closing </div>) }
// We just need to replace it.

fs.writeFileSync('src/components/Layout.tsx', layoutContent);

// 2. Create Storefront.tsx
// It needs the `categories`, `collections` variables which are defined before the App component.
// Let's just grab the whole file and replace the return block with just <main>
let storefrontContent = beforeMain.replace(/export default function App\(\) \{[\s\S]*?return \(/, "export default function Storefront() {\n  return (") 
+ "\n      " + mainContent + "\n  )\n}";

fs.writeFileSync('src/pages/Storefront.tsx', storefrontContent);

// 3. Create App.tsx
const newAppTsx = `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Storefront from './pages/Storefront';
import Product from './pages/Product';
import Category from './pages/Category';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import OrderDetail from './pages/OrderDetail';
import OrderHistory from './pages/OrderHistory';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Storefront />} />
          <Route path="product" element={<Product />} />
          <Route path="category" element={<Category />} />
          <Route path="cart" element={<ShoppingCart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-detail" element={<OrderDetail />} />
          <Route path="orders" element={<OrderHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
`;

fs.writeFileSync('src/App.tsx', newAppTsx);

console.log("Factored out Layout.tsx, Storefront.tsx, and rewrote App.tsx.");
