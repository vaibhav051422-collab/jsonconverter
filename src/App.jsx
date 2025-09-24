import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';

// --- HELPER FUNCTIONS (CORE LOGIC) ---
function generateTypeScriptInterfaces(jsonObject, rootInterfaceName = 'RootObject') {
    let interfaces = '';
    const knownInterfaces = new Map();

    function capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    function inferType(value, key) {
        if (value === null) return 'any';
        switch (typeof value) {
            case 'string':
                return 'string';
            case 'number':
                return 'number';
            case 'boolean':
                return 'boolean';
            case 'object':
                if (Array.isArray(value)) {
                    if (value.length === 0) return 'any[]';
                    const arrayType = inferType(value[0], key);
                    return `${arrayType}[]`;
                }
                const interfaceName = capitalize(key);
                if (!knownInterfaces.has(JSON.stringify(value))) {
                    knownInterfaces.set(JSON.stringify(value), interfaceName);
                    interfaces += generateInterface(value, interfaceName);
                }
                return interfaceName;
            default:
                return 'any';
        }
    }

    function generateInterface(obj, name) {
        let interfaceString = `interface ${name} {\n`;
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const type = inferType(obj[key], key);
                interfaceString += `  ${key}: ${type};\n`;
            }
        }
        interfaceString += '}\n\n';
        return interfaceString;
    }

    interfaces += generateInterface(jsonObject, rootInterfaceName);
    return interfaces.trim();
}


// --- LANDING PAGE COMPONENT ---
const faqs = [ { question: "Is my data secure?", answer: "Absolutely. The entire conversion process happens in your browser. Your JSON data is never sent to our servers, so your information remains completely private and secure." }, { question: "Is this tool completely free to use?", answer: "Yes. This tool is 100% free with no usage limits. It's a resource built for the developer community." }, { question: "How does it handle complex, nested JSON?", answer: "The tool is designed to be recursive. It intelligently 'walks' through your entire JSON structure, no matter how deeply nested, and generates separate, clean interfaces for each nested object to keep your code organized." } ];

function LandingPage({ onNavigate }) {
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
            <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
                <header className="text-center mb-12 md:mb-20">
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-4">
                        Generate Code from JSON.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        Stop manually writing types. Paste your JSON data and get clean,
                        accurate, and ready-to-use code instantly.
                    </p>
                </header>

                <main className="text-center mb-20 md:mb-24">
                    <button
                        onClick={() => onNavigate('converter')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg text-xl transition-transform transform hover:scale-105 inline-block"
                    >
                        Get Started
                    </button>
                </main>

                <section className="max-w-4xl mx-auto mb-20 md:mb-24">
                    <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg">
                                <button
                                    className="w-full flex justify-between items-center text-left p-4"
                                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                >
                                    <h3 className="text-lg font-semibold text-gray-200">{faq.question}</h3>
                                    <ChevronDown
                                        className={`transform transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {openFaqIndex === index && (
                                    <div className="p-4 pt-0">
                                        <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="text-center text-gray-500 border-t border-gray-800 pt-8 mt-20">
                    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                        <p>Made with ❤️ in Delhi.</p>
                        <div className="flex items-center gap-6 text-gray-400">
                            <a href="mailto:vaibhavpandey0509@gmail.com" className="hover:text-blue-400 transition-colors">
                                vaibhavpandey0509@gmail.com
                            </a>
                            <span className="text-gray-600">|</span>
                            <a href="tel:+919236454423" className="hover:text-blue-400 transition-colors">
                                +91 9236454423
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

// --- CONVERTER PAGE COMPONENT ---
function ConverterPage({ onNavigate }) {
    const [jsonInput, setJsonInput] = useState(JSON.stringify({
        "id": 1,
        "user": "sample_user",
        "profile": { "followers": 150, "isVerified": true },
        "posts": ["hello", "world"]
    }, null, 2));
    const [schemaOutput, setSchemaOutput] = useState('');
    const [error, setError] = useState('');
    const [copyText, setCopyText] = useState('Copy');

    const handleCopy = () => {
        if (!schemaOutput || error) return;
        navigator.clipboard.writeText(schemaOutput);
        setCopyText('Copied!');
        setTimeout(() => setCopyText('Copy'), 2000);
    };

    useEffect(() => {
        if (!jsonInput.trim()) {
            setError('');
            setSchemaOutput('');
            return;
        }
        try {
            const parsedJson = JSON.parse(jsonInput);
            const result = generateTypeScriptInterfaces(parsedJson);
            setSchemaOutput(result);
            setError('');
        } catch (e) {
            setError('Invalid JSON: ' + e.message);
            setSchemaOutput('');
        }
    }, [jsonInput]);

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen font-sans flex flex-col p-4">
            <header className="w-full max-w-7xl mx-auto mb-6">
                <button 
                    onClick={() => onNavigate('landing')}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Home
                </button>
            </header>
            <main className="w-full max-w-7xl mx-auto flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                    {/* Input Panel */}
                    <div className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700 flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
                            <h3 className="text-lg font-semibold text-gray-300">JSON Input</h3>
                        </div>
                        <textarea
                            className="w-full p-4 font-mono text-sm bg-transparent border-0 focus:ring-0 resize-none flex-grow"
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                            placeholder="Paste your JSON here..."
                        />
                    </div>
                    {/* Output Panel */}
                    <div className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700 flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
                            <h3 className="text-lg font-semibold text-gray-300">TypeScript Output</h3>
                            <button
                                onClick={handleCopy}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!schemaOutput || !!error}
                            >
                                {copyText}
                            </button>
                        </div>
                        <textarea
                            className={`w-full p-4 font-mono text-sm bg-transparent border-0 resize-none flex-grow ${error ? 'text-red-400' : 'text-gray-200'}`}
                            value={error || schemaOutput}
                            readOnly
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}


// --- MAIN APP COMPONENT (Handles Navigation) ---
export default function App() {
    const [page, setPage] = useState('landing'); // 'landing' or 'converter'

    return (
        <div>
            {page === 'landing' && <LandingPage onNavigate={setPage} />}
            {page === 'converter' && <ConverterPage onNavigate={setPage} />}
        </div>
    );
}