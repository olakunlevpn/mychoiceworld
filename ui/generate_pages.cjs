const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const outputDir = path.join(__dirname, 'src', 'pages');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.md'));

for (const file of files) {
    let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
    
    // We want the imports and declarations before the main Component (which is usually `export default function Example() {`)
    // Let's just strip everything matching <header.../header> and <footer.../footer>
    
    // Wait, the easiest way to give them all the same layout:
    // Extract everything inside `<main...` to `</main>`.
    // We already have the layout in App.tsx! But we need the data (like products, reviews) to be rendered.
    // Let's just create individual pages without the header/footer.
    
    // 1. Remove <header>...</header> and <Dialog>...</Dialog> and <footer>...</footer> from the component
    // Actually, Dialog is the mobile menu, we remove that too.
    const safeName = file.replace(/ Pages?\.md/i, '').replace(/ /g, '');
    let newContent = content.replace(/export default function Example\(\) {/g, `export default function ${safeName}() {`);
    
    // Naively remove header, footer, Dialog
    let result = newContent.replace(/<Dialog[\s\S]*?<\/Dialog>/g, '');
    result = result.replace(/<header[\s\S]*?<\/header>/g, '');
    result = result.replace(/<footer[\s\S]*?<\/footer>/g, '');
    
    // It's usually wrapped in <div className="bg-white"> or <div className="bg-gray-50">
    // To avoid issues with orphaned variables used in Header/Footer (like navigation, open state), we will just leave the variables.
    
    fs.writeFileSync(path.join(outputDir, `${safeName}.tsx`), result);
    console.log(`Generated ${safeName} correctly without header/footer`);
}
