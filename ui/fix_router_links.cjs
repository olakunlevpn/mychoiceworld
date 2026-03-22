const fs = require('fs');
const path = require('path');

const dirs = [
    path.join(__dirname, 'src', 'pages'),
    path.join(__dirname, 'src', 'components')
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
    for (const file of files) {
        let content = fs.readFileSync(path.join(dir, file), 'utf8');
        let modified = false;

        // 1. Add Link import if not present
        if (!content.includes("Link } from 'react-router-dom'")) {
            content = content.replace(/import\s+\{\s*Fragment/g, "import { Link } from 'react-router-dom'\nimport { Fragment");
            // If Fragment wasn't imported (like in Layout.tsx where we might have imports)
            if (!content.includes("Link } from 'react-router-dom'")) {
                content = "import { Link } from 'react-router-dom'\n" + content;
            }
            modified = true;
        }

        // 2. Replace <a ... href="..." ...> with <Link ... to="..." ...>
        // Only if it doesn't look like an external link or fragment like `#top`
        const aHrefStaticRegex = /<a\b([^>]*?)href=(["'])([^"']*)(["'])([^>]*)>/g;
        if (aHrefStaticRegex.test(content)) {
            content = content.replace(aHrefStaticRegex, (match, before, quote1, url, quote2, after) => {
                let toUrl = url === '#' ? '/product' : url;
                // Specific manual overrides for static links if we identify them
                if (after.includes('items in cart')) toUrl = '/cart'; // Cart link
                if (before.includes('group -m-2') && after.includes('ShoppingBagIcon')) toUrl = '/cart';
                
                return `<Link ${before}to=${quote1}${toUrl}${quote2}${after}>`;
            });
            modified = true;
        }

        // 3. Replace <a ... href={...} ...> with <Link ... to={...} ...>
        const aHrefDynamicRegex = /<a\b([^>]*?)href=\{([^}]+)\}([^>]*)>/g;
        if (aHrefDynamicRegex.test(content)) {
            content = content.replace(aHrefDynamicRegex, "<Link $1to={$2}$3>");
            modified = true;
        }

        // 4. Replace </a> with </Link>
        if (modified && content.includes('</a>')) {
            content = content.replace(/<\/a>/g, "</Link>");
            modified = true;
        }

        // 5. Replace href: '#' in mock data objects to href: '/product' generally.
        // We can do '/category' for category items, etc.
        if (content.match(/href:\s*['"]#['"]/)) {
            content = content.replace(/href:\s*['"]#['"]/g, "href: '/product'");
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(path.join(dir, file), content);
            console.log(`Updated links in ${file}`);
        }
    }
});
