// Traducciones para diferentes idiomas
const translations = {
    es: {
        title: "🔐 Traductor Atbash",
        subtitle: "Convierte texto a criptograma Atbash y viceversa",
        inputLabel: "Texto original:",
        inputPlaceholder: "Escribe el texto que deseas cifrar o descifrar aquí...",
        outputLabel: "Resultado:",
        outputPlaceholder: "El resultado aparecerá aquí...",
        encodeBtn: "→ Cifrar a Atbash →",
        decodeBtn: "← Descifrar de Atbash ←",
        clearBtn: "Limpiar",
        copyBtn: "📋 Copiar resultado",
        copiedBtn: "✓ Copiado!",
        infoTitle: "ℹ️ ¿Qué es Atbash?",
        infoDescription: "Atbash es un método de cifrado por sustitución donde cada letra se reemplaza por su equivalente en el alfabeto invertido:",
        noteLabel: "Nota:",
        noteText: "Atbash es simétrico, por lo que cifrar y descifrar funcionan de la misma manera. Los números y símbolos no se modifican.",
        footerText: "Creado con ❤️ para traducir texto a Atbash",
        noTextToCopy: "No hay texto para copiar"
    },
    en: {
        title: "🔐 Atbash Translator",
        subtitle: "Convert text to Atbash cipher and vice versa",
        inputLabel: "Original text:",
        inputPlaceholder: "Type the text you want to encrypt or decrypt here...",
        outputLabel: "Result:",
        outputPlaceholder: "The result will appear here...",
        encodeBtn: "→ Encode to Atbash →",
        decodeBtn: "← Decode from Atbash ←",
        clearBtn: "Clear",
        copyBtn: "📋 Copy result",
        copiedBtn: "✓ Copied!",
        infoTitle: "ℹ️ What is Atbash?",
        infoDescription: "Atbash is a substitution cipher method where each letter is replaced by its equivalent in the inverted alphabet:",
        noteLabel: "Note:",
        noteText: "Atbash is symmetric, so encryption and decryption work the same way. Numbers and symbols are not modified.",
        footerText: "Created with ❤️ to translate text to Atbash",
        noTextToCopy: "No text to copy"
    },
    pt: {
        title: "🔐 Tradutor Atbash",
        subtitle: "Converta texto para cifra Atbash e vice-versa",
        inputLabel: "Texto original:",
        inputPlaceholder: "Digite o texto que deseja criptografar ou descriptografar aqui...",
        outputLabel: "Resultado:",
        outputPlaceholder: "O resultado aparecerá aqui...",
        encodeBtn: "→ Criptografar para Atbash →",
        decodeBtn: "← Descriptografar de Atbash ←",
        clearBtn: "Limpar",
        copyBtn: "📋 Copiar resultado",
        copiedBtn: "✓ Copiado!",
        infoTitle: "ℹ️ O que é Atbash?",
        infoDescription: "Atbash é um método de cifra de substituição onde cada letra é substituída por seu equivalente no alfabeto invertido:",
        noteLabel: "Nota:",
        noteText: "Atbash é simétrico, então criptografar e descriptografar funcionam da mesma maneira. Números e símbolos não são modificados.",
        footerText: "Criado com ❤️ para traduzir texto para Atbash",
        noTextToCopy: "Não há texto para copiar"
    }
};

// Idioma actual (por defecto español, o el guardado en localStorage)
// Validar que el idioma guardado exista, si no, usar español
const savedLanguage = localStorage.getItem('atbash-language');
const validLanguages = ['es', 'en', 'pt'];
let currentLanguage = (savedLanguage && validLanguages.includes(savedLanguage)) ? savedLanguage : 'es';

// Si el idioma guardado no es válido o no existe, actualizar localStorage
if (!savedLanguage || !validLanguages.includes(savedLanguage)) {
    localStorage.setItem('atbash-language', 'es');
}

// Función para cambiar el idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('atbash-language', lang);
    document.documentElement.lang = lang;
    
    const t = translations[lang];
    
    // Actualizar todos los textos
    document.getElementById('title').textContent = t.title;
    document.getElementById('subtitle').textContent = t.subtitle;
    document.getElementById('input-label').textContent = t.inputLabel;
    document.getElementById('output-label').textContent = t.outputLabel;
    document.getElementById('encode-btn').textContent = t.encodeBtn;
    document.getElementById('decode-btn').textContent = t.decodeBtn;
    document.getElementById('clear-btn').textContent = t.clearBtn;
    document.getElementById('copy-btn').textContent = t.copyBtn;
    document.getElementById('info-title').textContent = t.infoTitle;
    document.getElementById('info-description').textContent = t.infoDescription;
    document.getElementById('note-label').textContent = t.noteLabel;
    document.getElementById('note-text').textContent = t.noteText;
    document.getElementById('footer-text').textContent = t.footerText;
    
    // Actualizar placeholders
    document.getElementById('input-text').placeholder = t.inputPlaceholder;
    document.getElementById('output-text').placeholder = t.outputPlaceholder;
    
    // Actualizar título de la página
    document.title = t.title;
}

// Función para cifrar/descifrar texto usando Atbash
function atbash(text) {
    return text
        .split('')
        .map(char => {
            // Manejar letras minúsculas (a-z)
            if (char >= 'a' && char <= 'z') {
                // a=97, z=122 en ASCII
                // Para invertir: 'a' + ('z' - char) = 'a' + (122 - codigo)
                // O más simple: 'a'.charCodeAt(0) + 'z'.charCodeAt(0) - char.charCodeAt(0)
                return String.fromCharCode('a'.charCodeAt(0) + 'z'.charCodeAt(0) - char.charCodeAt(0));
            }
            // Manejar letras mayúsculas (A-Z)
            else if (char >= 'A' && char <= 'Z') {
                // A=65, Z=90 en ASCII
                return String.fromCharCode('A'.charCodeAt(0) + 'Z'.charCodeAt(0) - char.charCodeAt(0));
            }
            // Mantener números, espacios y símbolos sin cambios
            else {
                return char;
            }
        })
        .join('');
}

// Configurar el idioma al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const encodeBtn = document.getElementById('encode-btn');
    const decodeBtn = document.getElementById('decode-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const languageSelect = document.getElementById('language-select');
    
    // Configurar idioma inicial
    languageSelect.value = currentLanguage;
    changeLanguage(currentLanguage);
    
    // Event listener para el cambio de idioma
    languageSelect.addEventListener('change', (e) => {
        changeLanguage(e.target.value);
    });
    
    // Función para cifrar
    encodeBtn.addEventListener('click', () => {
        const text = inputText.value;
        if (text.trim() === '') {
            outputText.value = '';
            return;
        }
        outputText.value = atbash(text);
    });
    
    // Función para descifrar (Atbash es simétrico, así que funciona igual)
    decodeBtn.addEventListener('click', () => {
        const text = inputText.value;
        if (text.trim() === '') {
            outputText.value = '';
            return;
        }
        outputText.value = atbash(text);
    });
    
    // Función para limpiar
    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        outputText.value = '';
        inputText.focus();
    });
    
    // Función para copiar resultado
    copyBtn.addEventListener('click', () => {
        if (outputText.value.trim() === '') {
            alert(translations[currentLanguage].noTextToCopy);
            return;
        }
        
        outputText.select();
        outputText.setSelectionRange(0, 99999); // Para móviles
        
        try {
            document.execCommand('copy');
            copyBtn.textContent = translations[currentLanguage].copiedBtn;
            copyBtn.style.background = '#45a049';
            
            setTimeout(() => {
                copyBtn.textContent = translations[currentLanguage].copyBtn;
                copyBtn.style.background = '#4caf50';
            }, 2000);
        } catch (err) {
            // Fallback para navegadores modernos
            navigator.clipboard.writeText(outputText.value).then(() => {
                copyBtn.textContent = translations[currentLanguage].copiedBtn;
                copyBtn.style.background = '#45a049';
                
                setTimeout(() => {
                    copyBtn.textContent = translations[currentLanguage].copyBtn;
                    copyBtn.style.background = '#4caf50';
                }, 2000);
            });
        }
    });
    
    // Permitir cifrado/descifrado con Enter (Ctrl+Enter o Shift+Enter)
    inputText.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.shiftKey) && e.key === 'Enter') {
            encodeBtn.click();
        }
    });
    
    // Auto-focus en el campo de entrada al cargar
    inputText.focus();
});

