const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'Storefront.tsx');

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Remove the bad escaped comments e.g. {/\* ... \*/} or {/* ... */}
    content = content.replace(/\{\/\\\*[\s\S]*?(?:\\\*\/|\*\/)\}/g, '');
    content = content.replace(/\{\/\*[\s\S]*?(?:\\\*\/|\*\/)\}/g, '');
    
    // Also remove any raw HTML comments since they break JSX
    content = content.replace(/<!--[\s\S]*?-->/g, '');

    // In Checkout.tsx, the <main> block was left bare but wrapped in `<>...</>`.
    // Wait, let's fix the stray brackets at the end if there are any.
    // The previous error for Checkout.tsx showed:
    // 480     </>
    // 481 
    // 482 )
    // 483 }
    // Actually, `}` after `)` is correct.
    // error TS1003: Identifier expected. on line 480 `</>` meaning it didn't like `</>`.
    // Why did it complain about `</>`? Because the start tag `<>` was malformed maybe, or had something inside it that corrupted it?
    // Let's replace the whole file content to ensure it's valid React.
    
    fs.writeFileSync(path.join(dir, file), content.trim() + '\n');
    console.log(`Fixed ${file}`);
}
