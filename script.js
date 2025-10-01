let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetDisplay = false;

// Função para adicionar números e operadores ao display
function appendToDisplay(value) {
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    
    // Evita múltiplos pontos decimais
    if (value === '.' && display.value.includes('.')) {
        return;
    }
    
    // Evita múltiplos operadores consecutivos
    if (['+', '-', '*', '/'].includes(value)) {
        if (['+', '-', '*', '/'].includes(display.value.slice(-1))) {
            display.value = display.value.slice(0, -1) + value;
            return;
        }
    }
    
    display.value += value;
}

// Função para limpar o display
function clearDisplay() {
    display.value = '';
    currentInput = '';
    operator = '';
    previousInput = '';
}

// Função para deletar o último caractere
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Função para calcular o resultado
function calculate() {
    try {
        if (display.value === '') {
            return;
        }
        
        // Substitui o símbolo × por * para a avaliação
        let expression = display.value.replace(/×/g, '*');
        
        // Verifica se a expressão é válida
        if (/^[0-9+\-*/.() ]+$/.test(expression)) {
            let result = eval(expression);
            
            // Verifica se o resultado é um número válido
            if (isNaN(result) || !isFinite(result)) {
                display.value = 'Erro';
            } else {
                // Limita o número de casas decimais
                if (result % 1 !== 0) {
                    result = parseFloat(result.toFixed(8));
                }
                display.value = result;
            }
        } else {
            display.value = 'Erro';
        }
        
        shouldResetDisplay = true;
    } catch (error) {
        display.value = 'Erro';
        shouldResetDisplay = true;
    }
}

// Suporte para teclado
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Números e operadores
    if (/[0-9+\-*/.()]/.test(key)) {
        event.preventDefault();
        if (key === '*') {
            appendToDisplay('×');
        } else {
            appendToDisplay(key);
        }
    }
    
    // Enter ou = para calcular
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    
    // Escape ou Delete para limpar
    if (key === 'Escape' || key === 'Delete') {
        event.preventDefault();
        clearDisplay();
    }
    
    // Backspace para deletar último caractere
    if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

// Previne a seleção de texto no display
display.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// Foca no display quando a página carrega
window.addEventListener('load', function() {
    display.focus();
});