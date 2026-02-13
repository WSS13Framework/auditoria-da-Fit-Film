const OPENAI_API_KEY = window.FITFILM_CONFIG?.OPENAI_API_KEY || '';

const SYSTEM_PROMPT = `Voce e o Cientista de Dados Senior da auditoria financeira da FITFILM COMERCIO E REPRESENTACAO LTDA (Fit Film - Packing & Storage Solutions).

SUA PERSONA:
- Voce se comporta como um Cientista de Dados Senior apresentando resultados diretamente ao CEO da empresa.
- Sua linguagem e EXECUTIVA: clara, direta, orientada a decisao. Nada de jargao tecnico desnecessario.
- Voce traduz numeros em IMPACTO NO NEGOCIO e ACOES ESTRATEGICAS.
- Quando apresenta um problema, SEMPRE apresenta a solucao com timeline, custo estimado e ROI esperado.
- Voce usa analogias de negocios para explicar conceitos complexos.
- Voce e assertivo mas respeitoso. Voce nao esconde problemas - voce os apresenta com solucoes.

FORMATO DAS RESPOSTAS:
- Use titulos claros com emojis profissionais para organizar
- Apresente numeros sempre com contexto ("R$ 11,6M vencidos - equivale a 4 meses de folha de pagamento")
- Termine SEMPRE com "Proximos Passos" ou "Recomendacao Executiva"
- Quando relevante, apresente cenarios: Otimista / Realista / Pessimista
- Use comparacoes com benchmarks do setor de embalagens

DADOS FINANCEIROS REAIS DA AUDITORIA (Jan/2024 - Dez/2025):

INDICADORES MACRO:
- Faturamento Total: R$ 57.041.350,00
- Total Recebido: R$ 35.495.864,47 (62,2% do faturado)
- Total A Vencer: R$ 21.545.485,53 (37,8% do faturado)
- Total Em Dia: R$ 28.408.375,07
- Total Atrasado: R$ 5.681.864,84
- Total Vencido (nao recebido): R$ 11.643.500,66

INDICADORES CRITICOS:
- Taxa de Inadimplencia: 22,33% (CRITICO - benchmark do setor: 3-5%)
- Eficiencia de Recebimento: 61,75% (mercado: 85-92%)
- Taxa de Atraso: 16,58%
- Gap de Caixa: quase 40% do faturamento NAO foi convertido em caixa

ANOMALIAS GRAVES DETECTADAS:

ANOMALIA 1 - COLAPSO DE VENDAS (Junho/2024):
- Vendas cairam 60% (R$ 620.000 vs media R$ 1.420.000)
- Inadimplencia disparou para 42,8%
- Perda estimada: R$ 800.000
- Impacto: Comprometeu fluxo de caixa dos 3 meses seguintes
- Possivel causa: Perda de cliente-chave ou problema operacional grave

ANOMALIA 2 - EXPLOSAO DE CUSTOS (Setembro/2024):
- Custos aumentaram 35% sem aumento proporcional de receita
- Debito emergencial de R$ 138.000 com FRONERI (ref. R$ 156.762,76)
- Margem de lucro caiu de 25% para 15%
- Taxa de atraso: 23,5%
- Valores vencidos: R$ 680.000
- Impacto: Erosao da margem operacional

ANOMALIA 3 - CRISE DE QUALIDADE (Marco/2025):
- Receita caiu 15%
- Inadimplencia: 26,4%
- Registros de lote e quantidade divergente
- Impacto: Perda de confianca de clientes e possivel recall

CARTEIRA DE CLIENTES/FORNECEDORES:
- FRONERI (maior debito - R$ 156.762,76)
- IFCO SYSTEMS DO BRASIL SERVICOS DE EMBALAGEM LTDA
- EMBALAFITAS
- FENIX
- EMPRESA BRASILEIRA DE DISTRIBUICAO
- NOVA PROSPER
- FORTYMIX
- TUDO LEGAL

TRANSACOES REAIS IDENTIFICADAS:
- DEBITO 138.000 REF. 156.762,76 FRONERI - AJUSTE FLUXO CAIXA
- TRANSF PARA EMBALAFITAS 17.502,00 - PAG DE BOLETOS
- Pix Caldas 15/09 - R$ 2.514,64
- PAG BOLETOS NF 13944/5 NF 13864/6 - R$ 45.000
- PAG BOLETO NF 14018/2 NF 14042/2 - R$ 38.500
- PAG BOLETO NF 13920/7 FENIX - R$ 52.300
- REGISTRO DE RECEITA EMISSAO NF - R$ 85.000
- IFCO SYSTEMS - Servicos de Embalagem - R$ 42.000

MEIOS DE PAGAMENTO: Boleto (902 operacoes), PIX (285), Transferencia (180), Duplicata (83), Cheque (15)
IMPOSTOS IDENTIFICADOS: ICMS, PIS, COFINS, IPI, CBS, IBS
PRODUTOS: Embalagem Doce Quadrado, Embalagem Retangular Articulado 750ml

CONTEXTO DO PLANEJAMENTO QUE DEU ERRADO:
A empresa fez um planejamento financeiro para 2024-2025 que nao se concretizou. Os dados mostram que:
1. A inadimplencia esta 4,5x acima do aceitavel
2. Quase 40% do faturamento nao virou caixa
3. Tres crises graves aconteceram em 18 meses
4. O fluxo de caixa foi severamente comprometido
5. A empresa precisou fazer ajustes emergenciais (debito FRONERI)

Responda SEMPRE em portugues brasileiro. Seja o cientista de dados que todo CEO gostaria de ter: preciso, estrategico, orientado a solucoes.`;

let conversationHistory = [{ role: 'system', content: SYSTEM_PROMPT }];

async function sendToOpenAI(userMessage) {
    conversationHistory.push({ role: 'user', content: userMessage });
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + OPENAI_API_KEY
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: conversationHistory,
                temperature: 0.6,
                max_tokens: 3000,
                presence_penalty: 0.3,
                frequency_penalty: 0.2
            })
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error?.message || 'Erro na API');
        }
        const data = await response.json();
        const reply = data.choices[0].message.content;
        conversationHistory.push({ role: 'assistant', content: reply });
        return reply;
    } catch (error) {
        console.error('Erro OpenAI:', error);
        return 'Desculpe, ocorreu um erro ao processar sua solicitacao: ' + error.message;
    }
}

function addMessage(text, isUser) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'msg ' + (isUser ? 'user' : 'bot');
    const avatarLabel = isUser ? 'CEO' : 'CD';
    const avatarTitle = isUser ? 'CEO' : 'Cientista de Dados';
    div.innerHTML = `
        <div class="msg-avatar" title="${avatarTitle}">${avatarLabel}</div>
        <div class="msg-bubble">${isUser ? escapeHtml(text) : formatResponse(text)}</div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatResponse(text) {
    return text
        .replace(/### (.*?)(\n|$)/g, '<h4 style="margin:12px 0 6px;color:#e91e8c;font-size:14px;">$1</h4>')
        .replace(/## (.*?)(\n|$)/g, '<h3 style="margin:14px 0 8px;color:#00bcd4;font-size:15px;border-bottom:1px solid #1e2235;padding-bottom:6px;">$1</h3>')
        .replace(/# (.*?)(\n|$)/g, '<h2 style="margin:16px 0 10px;color:#e8eaf0;font-size:16px;">$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#e8eaf0;">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code style="background:#1e2235;padding:2px 6px;border-radius:4px;font-size:12px;">$1</code>')
        .replace(/\n\n/g, '</p><p style="margin:8px 0;">')
        .replace(/\n- /g, '<br><span style="color:#00bcd4;margin-right:6px;">&#9656;</span> ')
        .replace(/\n(\d+)\. /g, '<br><span style="color:#e91e8c;font-weight:700;margin-right:6px;">$1.</span> ')
        .replace(/\n/g, '<br>');
}

function addTypingIndicator() {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'msg bot';
    div.id = 'typing-indicator';
    div.innerHTML = `
        <div class="msg-avatar" title="Cientista de Dados">CD</div>
        <div class="msg-bubble" style="opacity:0.7;">
            <div style="display:flex;align-items:center;gap:8px;">
                <span class="typing-dots">
                    <span style="animation:blink 1.4s infinite both;">&#9679;</span>
                    <span style="animation:blink 1.4s 0.2s infinite both;">&#9679;</span>
                    <span style="animation:blink 1.4s 0.4s infinite both;">&#9679;</span>
                </span>
                <span style="font-size:13px;">Analisando dados e preparando relatorio executivo...</span>
            </div>
        </div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    document.getElementById('send-btn').disabled = true;
    const sug = document.getElementById('chat-suggestions');
    if (sug) sug.style.display = 'none';
    addMessage(text, true);
    addTypingIndicator();
    const reply = await sendToOpenAI(text);
    removeTypingIndicator();
    addMessage(reply, false);
    document.getElementById('send-btn').disabled = false;
    input.focus();
}

function askSuggestion(btn) {
    document.getElementById('chat-input').value = btn.textContent;
    sendMessage();
}
