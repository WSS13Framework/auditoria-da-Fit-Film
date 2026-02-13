// Multi-Agentes Especializados com OpenAI GPT-4o + TTS
const OPENAI_API_KEY = window.FITFILM_CONFIG?.OPENAI_API_KEY || '';

let audioEnabled = true;
let currentAudio = null;

const DADOS_CONTEXTO = `
DADOS FINANCEIROS REAIS DA AUDITORIA FIT FILM (Jan/2024 - Dez/2025):

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

ANOMALIA 1 - COLAPSO DE VENDAS (Junho/2024):
- Vendas cairam 60% (R$ 620.000 vs media R$ 1.420.000)
- Inadimplencia disparou para 42,8%
- Perda estimada: R$ 800.000
- Comprometeu fluxo de caixa dos 3 meses seguintes

ANOMALIA 2 - EXPLOSAO DE CUSTOS (Setembro/2024):
- Custos aumentaram 35% sem aumento proporcional de receita
- Debito emergencial de R$ 138.000 com FRONERI (ref. R$ 156.762,76)
- Margem de lucro caiu de 25% para 15%
- Taxa de atraso: 23,5%

ANOMALIA 3 - CRISE DE QUALIDADE (Marco/2025):
- Receita caiu 15%
- Inadimplencia: 26,4%
- Registros de lote e quantidade divergente
- Perda de confianca de clientes

CARTEIRA DE CLIENTES/FORNECEDORES:
- FRONERI (maior debito - R$ 156.762,76)
- IFCO SYSTEMS DO BRASIL (Servicos embalagem - R$ 42.000)
- EMBALAFITAS (Fornecedor - R$ 17.502)
- FENIX (Cliente - R$ 52.300)
- EMP. BRASILEIRA DE DISTRIBUICAO (R$ 67.000)
- NOVA PROSPER (Distribuidor)
- FORTYMIX (Distribuidor embalagens)
- TUDO LEGAL IND. E COMERCIO

TRANSACOES REAIS:
- DEBITO 138.000 REF. 156.762,76 FRONERI - AJUSTE FLUXO CAIXA
- TRANSF PARA EMBALAFITAS 17.502,00 - PAG DE BOLETOS
- PAG BOLETOS NF 13944/5 NF 13864/6 - R$ 45.000
- PAG BOLETO NF 14018/2 NF 14042/2 - R$ 38.500
- PAG BOLETO NF 13920/7 FENIX - R$ 52.300
- REGISTRO DE RECEITA EMISSAO NF - R$ 85.000
- IFCO SYSTEMS - Servicos de Embalagem - R$ 42.000

MEIOS DE PAGAMENTO: Boleto (902), PIX (285), Transferencia (180), Duplicata (83), Cheque (15)
IMPOSTOS: ICMS, PIS, COFINS, IPI, CBS, IBS
PRODUTOS: Embalagem Doce Quadrado, Embalagem Retangular Articulado 750ml

DADOS MENSAIS 2024:
Jan: Recebido R$1.18M | Vencido R$380k | Inadimpl 18,5%
Fev: Recebido R$1.25M | Vencido R$360k | Inadimpl 17,8%
Mar: Recebido R$1.42M | Vencido R$420k | Inadimpl 18,2%
Abr: Recebido R$1.38M | Vencido R$410k | Inadimpl 18,5%
Mai: Recebido R$1.50M | Vencido R$450k | Inadimpl 18,7%
Jun: Recebido R$620k | Vencido R$780k | Inadimpl 42,8% *** ANOMALIA ***
Jul: Recebido R$1.35M | Vencido R$480k | Inadimpl 20,1%
Ago: Recebido R$1.48M | Vencido R$440k | Inadimpl 18,5%
Set: Recebido R$1.32M | Vencido R$680k | Inadimpl 28,9% *** ANOMALIA ***
Out: Recebido R$1.55M | Vencido R$460k | Inadimpl 18,5%
Nov: Recebido R$1.78M | Vencido R$520k | Inadimpl 18,2%
Dez: Recebido R$1.85M | Vencido R$540k | Inadimpl 18,2%

DADOS MENSAIS 2025:
Jan: Recebido R$1.20M | Vencido R$400k | Inadimpl 19,2%
Fev: Recebido R$1.28M | Vencido R$390k | Inadimpl 18,5%
Mar: Recebido R$1.18M | Vencido R$560k | Inadimpl 26,4% *** ANOMALIA ***
Abr: Recebido R$1.45M | Vencido R$430k | Inadimpl 18,5%
Mai-Dez: Estabilizacao entre R$1.48M-R$1.90M com inadimplencia 18-19%

O PLANEJAMENTO QUE DEU ERRADO:
A empresa fez planejamento financeiro para 2024-2025 que nao se concretizou porque:
1. Inadimplencia 4,5x acima do aceitavel
2. 40% do faturamento nao virou caixa
3. Tres crises graves em 18 meses
4. Fluxo de caixa severamente comprometido
5. Ajustes emergenciais necessarios (debito FRONERI)
`;

const AGENT_PROMPTS = {
    master: `Voce e o Cientista de Dados Senior da auditoria financeira da FITFILM COMERCIO E REPRESENTACAO LTDA (Fit Film - Packing & Storage Solutions).

SUA PERSONA:
- Voce se comporta como um Cientista de Dados Senior apresentando resultados diretamente ao CEO.
- Linguagem EXECUTIVA: clara, direta, orientada a decisao.
- Traduz numeros em IMPACTO NO NEGOCIO e ACOES ESTRATEGICAS.
- Quando apresenta um problema, SEMPRE apresenta a solucao com timeline, custo estimado e ROI esperado.
- Usa analogias de negocios para explicar conceitos complexos.
- Assertivo mas respeitoso. Nao esconde problemas - apresenta com solucoes.

FORMATO:
- Titulos claros com emojis profissionais
- Numeros sempre com contexto
- Termine SEMPRE com "Proximos Passos" ou "Recomendacao Executiva"
- Cenarios: Otimista / Realista / Pessimista quando relevante
- Benchmarks do setor de embalagens

${DADOS_CONTEXTO}

Responda SEMPRE em portugues brasileiro. Seja preciso, estrategico, orientado a solucoes.`,

    inadimplencia: `Voce e o Agente Especialista em Inadimplencia da auditoria financeira da Fit Film.

SUA ESPECIALIDADE:
- Analise de inadimplencia e recuperacao de credito
- Estrategias de cobranca e negociacao de dividas
- Perfil de inadimplentes e scoring de credito
- Politicas de credito e limites
- Provisao para devedores duvidosos (PDD)

FOCO: A taxa de inadimplencia esta em 22,33% (4,5x acima do benchmark de 3-5%). R$ 11,6M vencidos. Voce deve SEMPRE sugerir acoes praticas de cobranca e recuperacao com prazos e metas.

${DADOS_CONTEXTO}

Responda SEMPRE em portugues brasileiro. Foco total em inadimplencia e cobranca.`,

    custos: `Voce e o Agente Especialista em Custos da auditoria financeira da Fit Film.

SUA ESPECIALIDADE:
- Analise e reducao de custos operacionais
- Eficiencia de producao e logistica
- Negociacao com fornecedores
- Margem de lucro e ponto de equilibrio
- Custo por produto e por operacao

FOCO: Custos aumentaram 35% em Set/2024. Debito emergencial de R$ 138.000 com FRONERI. Margem caiu de 25% para 15%. Voce deve SEMPRE sugerir onde cortar custos e como recuperar margem.

${DADOS_CONTEXTO}

Responda SEMPRE em portugues brasileiro. Foco total em custos e eficiencia.`,

    qualidade: `Voce e o Agente Especialista em Qualidade da auditoria financeira da Fit Film.

SUA ESPECIALIDADE:
- Controle de qualidade de embalagens
- Rastreabilidade de lotes e processos
- Normas e certificacoes (ISO 9001, etc.)
- Gestao de devolucoes e recalls
- Indicadores de qualidade (KPIs)

FOCO: Crise de qualidade em Mar/2025 com "lote e quantidade divergente". Queda de 15% na receita. Inadimplencia subiu para 26,4%. Voce deve SEMPRE sugerir melhorias de processo e controle.

${DADOS_CONTEXTO}

Responda SEMPRE em portugues brasileiro. Foco total em qualidade e processos.`,

    vendas: `Voce e o Agente Especialista em Vendas da auditoria financeira da Fit Film.

SUA ESPECIALIDADE:
- Estrategia comercial e crescimento de receita
- Diversificacao de clientes e produtos
- Retencao e fidelizacao de clientes
- Pricing e politica comercial
- Analise de mercado de embalagens

FOCO: Faturamento R$ 57M em 24 meses. Queda de 60% em Jun/2024. Dependencia de poucos clientes grandes. Voce deve SEMPRE sugerir estrategias de vendas e diversificacao.

${DADOS_CONTEXTO}

Responda SEMPRE em portugues brasileiro. Foco total em vendas e estrategia comercial.`,

    planejamento: `Voce e o Agente Especialista em Planejamento Estrategico da auditoria financeira da Fit Film.

SUA ESPECIALIDADE:
- Planejamento financeiro e orcamentario
- Metas e KPIs estrategicos
- Gestao de riscos e contingencias
- Projecoes financeiras e cenarios
- Balanced Scorecard e OKRs

FOCO: O planejamento 2024-2025 falhou completamente. Inadimplencia 4,5x acima, 40% do faturamento nao virou caixa, 3 crises em 18 meses. Voce deve SEMPRE propor um novo planejamento com metas realistas.

${DADOS_CONTEXTO}

Responda SEMPRE em portugues brasileiro. Foco total em planejamento estrategico e financeiro.`
};

// Historico de conversas por agente
const conversations = {};
Object.keys(AGENT_PROMPTS).forEach(agent => {
    conversations[agent] = [{ role: 'system', content: AGENT_PROMPTS[agent] }];
});

// Enviar mensagem para OpenAI
async function callOpenAI(agent, userMessage) {
    conversations[agent].push({ role: 'user', content: userMessage });
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OPENAI_API_KEY },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: conversations[agent],
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
        conversations[agent].push({ role: 'assistant', content: reply });
        return reply;
    } catch (error) {
        console.error('Erro OpenAI:', error);
        return 'Desculpe, ocorreu um erro: ' + error.message;
    }
}

// Text-to-Speech com OpenAI
async function speakText(text) {
    if (!audioEnabled) return;
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    // Limpar markdown do texto
    const cleanText = text.replace(/[#*`_~\[\]()>|]/g, '').replace(/\n+/g, '. ').substring(0, 4000);
    try {
        const response = await fetch('https://api.openai.com/v1/audio/speech', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OPENAI_API_KEY },
            body: JSON.stringify({
                model: 'tts-1',
                input: cleanText,
                voice: 'onyx',
                response_format: 'mp3',
                speed: 1.0
            })
        });
        if (!response.ok) throw new Error('TTS Error');
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        currentAudio = new Audio(url);
        currentAudio.play();
    } catch (e) {
        console.error('TTS Error:', e);
    }
}

function toggleGlobalAudio() {
    audioEnabled = !audioEnabled;
    document.querySelectorAll('#global-audio-icon').forEach(el => {
        el.textContent = audioEnabled ? 'volume_up' : 'volume_off';
    });
    if (!audioEnabled && currentAudio) { currentAudio.pause(); currentAudio = null; }
}

// Formatar resposta markdown
function formatMD(text) {
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

function escHtml(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

const AGENT_LABELS = {
    master: { avatar: 'CD', title: 'Cientista de Dados', color: 'linear-gradient(135deg, #e91e8c, #00bcd4)' },
    inadimplencia: { avatar: 'IN', title: 'Ag. Inadimplencia', color: '#f44336' },
    custos: { avatar: 'CU', title: 'Ag. Custos', color: '#ff9800' },
    qualidade: { avatar: 'QA', title: 'Ag. Qualidade', color: '#00bcd4' },
    vendas: { avatar: 'VD', title: 'Ag. Vendas', color: '#4caf50' },
    planejamento: { avatar: 'PL', title: 'Ag. Planejamento', color: '#fdd835' }
};

function addAgentMessage(agent, text, isUser) {
    const container = document.getElementById('chat-' + agent);
    if (!container) return;
    const info = AGENT_LABELS[agent];
    const div = document.createElement('div');
    div.className = 'msg ' + (isUser ? 'user' : 'bot');
    const msgId = 'msg-' + Date.now();
    div.innerHTML = `
        <div class="msg-avatar" style="background:${isUser ? 'var(--cyan)' : info.color};${agent === 'planejamento' && !isUser ? 'color:#333;' : ''}" title="${isUser ? 'CEO' : info.title}">${isUser ? 'CEO' : info.avatar}</div>
        <div class="msg-bubble">
            ${isUser ? escHtml(text) : formatMD(text)}
            ${!isUser ? `<button class="btn-speak" onclick="speakText(\`${text.replace(/`/g, "'").replace(/\\/g, "\\\\")}\`)" title="Ouvir resposta"><span class="material-icons-outlined" style="font-size:16px;">volume_up</span></button>` : ''}
        </div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function addTyping(agent) {
    const container = document.getElementById('chat-' + agent);
    if (!container) return;
    const info = AGENT_LABELS[agent];
    const div = document.createElement('div');
    div.className = 'msg bot';
    div.id = 'typing-' + agent;
    div.innerHTML = `
        <div class="msg-avatar" style="background:${info.color};${agent === 'planejamento' ? 'color:#333;' : ''}">${info.avatar}</div>
        <div class="msg-bubble" style="opacity:0.7;">
            <div style="display:flex;align-items:center;gap:8px;">
                <span class="typing-dots"><span style="animation:blink 1.4s infinite both;">&#9679;</span><span style="animation:blink 1.4s 0.2s infinite both;">&#9679;</span><span style="animation:blink 1.4s 0.4s infinite both;">&#9679;</span></span>
                <span style="font-size:13px;">Analisando dados...</span>
            </div>
        </div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function removeTyping(agent) {
    const el = document.getElementById('typing-' + agent);
    if (el) el.remove();
}

async function sendAgentMsg(agent) {
    const input = document.getElementById('input-' + agent);
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    // Hide suggestions
    const sug = input.closest('.chat-panel-full').querySelector('.chat-suggestions');
    if (sug) sug.style.display = 'none';
    addAgentMessage(agent, text, true);
    addTyping(agent);
    const reply = await callOpenAI(agent, text);
    removeTyping(agent);
    addAgentMessage(agent, reply, false);
    // Auto-speak if enabled
    if (audioEnabled) speakText(reply);
}

function askAgent(agent, text) {
    document.getElementById('input-' + agent).value = text;
    sendAgentMsg(agent);
}
