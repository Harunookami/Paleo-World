import * as fs from "node:fs";
import * as path from "node:path";
import * as process from "node:process";
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import postcss from "postcss";

const DEFAULT_GLOBS_PATTERN: Array<string> = [
    "./**/*.{html,ejs,ts,tsx,js,jsx}",
];

const { TW_INPUT: inputCSS, TW_OUTPUT: outputCSS } = process.env;
const ignoredPaths = new Set(["node_modules", ".git"]); // Ignorados por padrão
const ignoredPatterns: string[] = []; // Padrões dinâmicos do .gitignore

// Lê e processa o `.gitignore`
function loadGitIgnore() {
    const gitignorePath = path.resolve(".gitignore");
    if (!fs.existsSync(gitignorePath)) return;

    const gitignoreContent = fs.readFileSync(gitignorePath, "utf8");
    gitignoreContent
        .split("\n")
        .map(line => line.trim())
        .filter(line => line && !line.startsWith("#")) // Ignora linhas vazias e comentários
        .forEach(line => {
            if (line.includes("*") || line.includes("/")) {
                ignoredPatterns.push(line); // Adiciona padrões dinâmicos
            } else {
                ignoredPaths.add(line); // Adiciona caminhos diretos
            }
        });
}

// Carregar .gitignore no início
loadGitIgnore();

function hasEnvConfigs(): boolean {
    return Boolean(inputCSS && outputCSS);
}

function extractExtensionsFromGlobPattern(globPattern: string): string[] {
    const match = globPattern.match(/\{([^\}]+)\}/);
    return match ? match[1].split(",").map(ext => ext.trim()) : [];
}

// Verifica dinamicamente se um caminho deve ser ignorado
function isIgnored(filePath: string): boolean {
    const relativePath = path.relative(process.cwd(), filePath);

    // Ignora caminhos exatos
    if (ignoredPaths.has(relativePath) || ignoredPaths.has(filePath)) {
        return true;
    }

    // Verifica padrões dinâmicos
    return ignoredPatterns.some(pattern => {
        if (pattern.startsWith("/")) {
            return relativePath.startsWith(pattern.slice(1)); // Ignorar paths absolutos no .gitignore
        }
        if (pattern.endsWith("/")) {
            return relativePath.startsWith(pattern); // Ignorar diretórios inteiros
        }
        if (pattern.includes("*")) {
            const regex = new RegExp(pattern.replace(/\*/g, ".*")); // Converte "*" para regex
            return regex.test(relativePath);
        }
        return false;
    });
}

async function processCSS() {
    if (!inputCSS || !outputCSS || !fs.existsSync(inputCSS)) {
        console.error(`CSS input file not found: ${inputCSS}`);
        return;
    }

    try {
        const css = await fs.promises.readFile(inputCSS, "utf8");
        if (!css) {
            console.log("Empty CSS file");
            return;
        }

        const result = await postcss([autoprefixer, tailwindcss()])
            .process(css, { from: inputCSS, to: outputCSS });

        await fs.promises.writeFile(outputCSS, result.css);
        if (result.map) {
            await fs.promises.writeFile(outputCSS + ".map", result.map.toString());
        }
        // console.log(`CSS compiled to "${outputCSS}"`);
        console.log(new Date().toLocaleTimeString(), `CSS Compiled`)
    } catch (error) {
        console.error("Tailwind Error:", error);
    }
}

// Debounce usando um Map para múltiplos arquivos
const watchTimeouts = new Map<string, NodeJS.Timeout>();

function watchWithDebounce(filePath: string, callback: () => void, delay = 100) {
    if (watchTimeouts.has(filePath)) {
        clearTimeout(watchTimeouts.get(filePath)!);
    }
    watchTimeouts.set(
        filePath,
        setTimeout(() => {
            callback();
            watchTimeouts.delete(filePath);
        }, delay)
    );
}

// Resolve arquivos de um padrão glob, agora ignorando arquivos/diretórios dinamicamente
function resolveFiles(dir: string, extensions: string[], fileList: string[] = []) {
    if (isIgnored(dir)) return fileList; // Evita entrar em diretórios ignorados

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        if (isIgnored(filePath)) continue; // Ignora arquivos específicos

        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            resolveFiles(filePath, extensions, fileList);
        } else if (extensions.some(ext => file.endsWith(ext))) {
            fileList.push(filePath);
        }
    }

    return fileList;
}

// Agora a função evita ler arquivos/diretórios ignorados antes de fazer qualquer processamento
function watchContentFiles(contentPaths: Array<string> = DEFAULT_GLOBS_PATTERN) {
    const filesToWatch = new Set<string>();

    contentPaths.forEach(pattern => {
        const [baseDir] = pattern.split("/**"); // Obtém apenas o diretório base
        const extensions = extractExtensionsFromGlobPattern(pattern);

        if (!fs.existsSync(baseDir) || isIgnored(baseDir)) return; // Ignora diretórios excluídos

        const resolvedFiles = resolveFiles(baseDir, extensions);
        resolvedFiles.forEach(file => {
            if (!isIgnored(file)) {
                filesToWatch.add(file);
            }
        });
    });

    filesToWatch.forEach(file => {
        fs.watch(file, () => watchWithDebounce(file, processCSS));
    });
}

// Executar apenas no modo de desenvolvimento
if (process.env.NODE_ENV === "development" && hasEnvConfigs()) {
    processCSS();
    watchContentFiles();
}
