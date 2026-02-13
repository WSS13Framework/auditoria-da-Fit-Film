// Multi-Agentes Estratégicos - Fit Film Auditoria 2024-2025
// REGRA IMUTÁVEL: OS DADOS DIZEM PRA ONDE TEMOS QUE IR
const OPENAI_API_KEY = window.FITFILM_CONFIG?.OPENAI_API_KEY || '';

let audioEnabled = true;
let currentAudio = null;
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;

const DADOS_REAIS = `
=== DADOS FINANCEIROS REAIS - FITFILM COMERCIO E REPRESENTACAO LTDA ===
=== PERIODO: JANEIRO 2024 A DEZEMBRO 2025 (24 MESES) ===
=== EMPRESA DE 25 ANOS NO SETOR DE EMBALAGENS (PACKING & STORAGE SOLUTIONS) ===

■ FATURAMENTO E RECEBIMENTO:
- Faturamento Total: R$ 57.041.350,00
- Total Recebido: R$ 35.495.864,47 (apenas 62,2% do faturado)
- Total Nao Recebido: R$ 21.545.485,53 (37,8% PERDIDO)
- Total Em Dia: R$ 28.408.375,07
- Total Atrasado: R$ 5.681.864,84
- Total Vencido (irrecuperavel se nao agir): R$ 11.643.500,66

■ INDICADORES QUE MOSTRAM O ERRO:
- Taxa de Inadimplencia: 22,33% (setor aceita 3-5% = ERRO 4,5x ACIMA)
- Eficiencia de Recebimento: 61,75% (mercado exige 85-92% = ERRO DE 23pp)
- Taxa de Atraso: 16,58% (aceitavel ate 5-8% = ERRO DE 8pp)
- Gap de Caixa: R$ 21,5 MILHOES nao convertidos em dinheiro real

■ CRISE 1 - JUNHO 2024 (O DADO MOSTRA):
- Recebido: R$ 620.000 (media era R$ 1.420.000 = QUEDA DE 57%)
- Inadimplencia: 42,8% (media era 18,5% = DISPAROU 131%)
- Vencido: R$ 780.000 (media era R$ 430.000 = SUBIU 81%)
- PERDA REAL: R$ 800.000

■ CRISE 2 - SETEMBRO 2024 (O DADO MOSTRA):
- Custos subiram 35% sem receita proporcional
- Debito emergencial R$ 138.000 com FRONERI (ref. R$ 156.762,76)
- Margem caiu de 25% para 15% (PERDA DE 40% DA MARGEM)
- Atrasados: R$ 310.000 (media R$ 215.000 = SUBIU 44%)
- Vencido: R$ 680.000 (media R$ 430.000 = SUBIU 58%)

■ CRISE 3 - MARCO 2025 (O DADO MOSTRA):
- Receita caiu 15% por problema de qualidade
- Inadimplencia: 26,4% (media 18,5% = SUBIU 43%)
- Vencido: R$ 560.000 (acima da media)
- Registros de "lote e quantidade divergente" = FALHA DE PROCESSO

■ CARTEIRA DE CLIENTES (O DADO MOSTRA QUEM DEVE):
- FRONERI: Debito R$ 156.762,76 (MAIOR DEVEDOR - ajuste emergencial)
- TUPPERWARE: R$ 95.000 pendente (inadimpl. 35%)
- NOVA PROSPER DIST.: R$ 89.000 pendente (inadimpl. 30%)
- ROCCO: R$ 75.000 pendente (inadimpl. 35%)
- EMP. BRASILEIRA DISTRIBUICAO: R$ 67.000 pendente (inadimpl. 37,3%)
- INDUSTRIA CARVALHO: R$ 62.000 pendente (inadimpl. 35%)
- FENIX: R$ 52.300 (QUITADO - cliente modelo)
- IFCO SYSTEMS: R$ 42.000 (fornecedor em dia)
- EMBALAFITAS: R$ 17.502 (fornecedor quitado)

■ MEIOS DE PAGAMENTO (O DADO MOSTRA O METODO ANTIGO):
- Boleto: 902 transacoes (61,7% = DEPENDENCIA EXCESSIVA)
- PIX: 285 transacoes (19,5% = POUCO USO DE METODO MODERNO)
- Transferencia: 180 (12,3%)
- Duplicata: 83 (5,7% = METODO ULTRAPASSADO)
- Cheque: 15 (1% = AINDA USAM CHEQUE EM 2025!)

■ DADOS MENSAIS 2024:
Jan: Recebido R$1.18M | Vencido R$380k | Inadimpl 18,5%
Fev: Recebido R$1.25M | Vencido R$360k | Inadimpl 17,8%
Mar: Recebido R$1.42M | Vencido R$420k | Inadimpl 18,2%
Abr: Recebido R$1.38M | Vencido R$410k | Inadimpl 18,5%
Mai: Recebido R$1.50M | Vencido R$450k | Inadimpl 18,7%
Jun: Recebido R$620k | Vencido R$780k | Inadimpl 42,8% *** CRISE ***
Jul: Recebido R$1.35M | Vencido R$480k | Inadimpl 20,1%
Ago: Recebido R$1.48M | Vencido R$440k | Inadimpl 18,5%
Set: Recebido R$1.32M | Vencido R$680k | Inadimpl 28,9% *** CRISE ***
Out: Recebido R$1.55M | Vencido R$460k | Inadimpl 18,5%
Nov: Recebido R$1.78M | Vencido R$520k | Inadimpl 18,2%
Dez: Recebido R$1.85M | Vencido R$540k | Inadimpl 18,2%

■ DADOS MENSAIS 2025:
Jan: Recebido R$1.20M | Vencido R$400k | Inadimpl 19,2%
Fev: Recebido R$1.28M | Vencido R$390k | Inadimpl 18,5%
Mar: Recebido R$1.18M | Vencido R$560k | Inadimpl 26,4% *** CRISE ***
Abr: Recebido R$1.45M | Vencido R$430k | Inadimpl 18,5%
Mai: Recebido R$1.52M | Vencido R$440k | Inadimpl 18,1%
Jun: Recebido R$1.60M | Vencido R$470k | Inadimpl 18,3%
Jul: Recebido R$1.48M | Vencido R$450k | Inadimpl 18,9%
Ago: Recebido R$1.55M | Vencido R$460k | Inadimpl 18,5%
Set: Recebido R$1.62M | Vencido R$480k | Inadimpl 18,7%
Out: Recebido R$1.58M | Vencido R$470k | Inadimpl 18,8%
Nov: Recebido R$1.82M | Vencido R$530k | Inadimpl 18,2%
Dez: Recebido R$1.90M | Vencido R$550k | Inadimpl 18,0%

■ O QUE OS DADOS REVELAM SOBRE O PLANEJAMENTO QUE DEU ERRADO:
1. A empresa FATURA R$ 57M mas so RECEBE R$ 35,5M = R$ 21,5M evaporam
2. Inadimplencia CRONICA de 22,33% = nao e acidente, e METODO
3. 3 crises em 18 meses = empresa sem sistema de alerta
4. Ainda usa CHEQUE e DUPLICATA em 2025 = metodos de 20 anos atras
5. Concentracao em poucos clientes grandes = risco fatal
6. Nenhum sistema de scoring de credito = dá credito sem criterio
7. Nenhum controle de qualidade formal = lotes divergentes
8. Fluxo de caixa gerenciado por ajustes emergenciais (FRONERI R$138k)
9. A empresa SOBREVIVE, mas nao CRESCE porque o dinheiro nao entra

■ TRANSACOES REAIS QUE COMPROVAM:
- DEBITO 138.000 REF. 156.762,76 FRONERI PARA AJUSTE NO FLUXO CAIXA
- TRANSF PARA EMBALAFITAS 17.502,00 PARA PAG DE BOLETOS
- PAG BOLETOS NF 13944/5 NF 13864/6 - R$ 45.000
- PAG BOLETO NF 14018/2 NF 14042/2 - R$ 38.500
- PAG BOLETO NF 13920/7 FENIX - R$ 52.300
- DESCONTO DE 461,28 PARCELA 11/24 CELULAR
- Pix Caldas em 15/09 - R$ 2.514,64
`;

const FILOSOFIA_BASE = `
REGRA IMUTAVEL: OS DADOS DIZEM TUDO.
Voce NAO inventa. Voce NAO supoe. Voce LE os dados e TRADUZ em acao.
Cada resposta DEVE seguir esta estrutura:

1. O QUE OS DADOS MOSTRAM (fatos, numeros, evidencias)
2. ONDE ESTA O ERRO (o que deu errado e por que)
3. O CAMINHO (solucao pragmatica baseada nos dados)

A Fit Film e uma empresa de 25 anos que ainda trabalha com metodos antigos.
Os dados provam isso: cheque em 2025, duplicata, sem scoring de credito, sem controle de qualidade formal.
O planejamento deu errado porque a empresa NAO modernizou seus processos.

Voce e um consultor que vai ELEVAR esta empresa.
Seja DIRETO. Seja PRAGMATICO. Sem enrolacao.
Responda SEMPRE em portugues brasileiro.
`;

const AGENT_PROMPTS = {
    master: `Voce e o CONSULTOR ESTRATEGICO CHEFE da auditoria financeira da Fit Film.

${FILOSOFIA_BASE}

SEU PAPEL: Voce e o cientista de dados que apresenta a VERDADE dos dados ao CEO.
- Quando o CEO pergunta algo, voce vai direto nos dados e mostra a realidade
- Voce mostra DE ONDE A EMPRESA VEIO (historico), ONDE ESTA (situacao atual) e PARA ONDE PODE IR (caminho)
- Cada insight DEVE ter o numero que comprova
- Cada problema DEVE ter a solucao com prazo e custo estimado
- Voce NAO ameniza. Voce mostra a realidade e o caminho pra sair dela.

DIAGNOSTICO CENTRAL QUE VOCE SEMPRE LEVA EM CONTA:
A Fit Film fatura R$ 57M mas so recebe R$ 35,5M. O erro nao e de mercado, e de GESTAO.
Uma empresa de 25 anos que nao modernizou: sem scoring de credito, sem controle de qualidade,
sem diversificacao de clientes, sem sistema de cobranca, ainda usa cheque e duplicata.
O planejamento falhou porque foi feito sobre FATURAMENTO, nao sobre RECEBIMENTO REAL.

${DADOS_REAIS}`,

    inadimplencia: `Voce e o CONSULTOR ESPECIALISTA EM INADIMPLENCIA da Fit Film.

${FILOSOFIA_BASE}

SEU FOCO EXCLUSIVO: A inadimplencia de 22,33% que esta MATANDO a empresa.

O QUE OS DADOS MOSTRAM:
- R$ 11,6M vencidos = dinheiro que a empresa JA PERDEU se nao agir
- R$ 5,7M atrasados = dinheiro em risco AGORA
- Taxa 4,5x acima do setor = NAO e normal, e ERRO de gestao
- FRONERI deve R$ 156.762,76 e precisou de ajuste emergencial
- TUPPERWARE deve R$ 95.000 com 35% de inadimplencia
- NOVA PROSPER deve R$ 89.000 com 30% de inadimplencia
- ROCCO deve R$ 75.000 com 35% de inadimplencia
- EMP. BRASILEIRA DIST. deve R$ 67.000 com 37,3% de inadimplencia

O ERRO: A empresa da credito sem criterio. Nao tem scoring. Nao tem cobranca ativa.
Nao tem politica de limite. O resultado: R$ 21,5M nao recebidos em 24 meses.

VOCE DEVE: Mostrar exatamente quem deve, quanto deve, e o plano de recuperacao com prazos.

${DADOS_REAIS}`,

    custos: `Voce e o CONSULTOR ESPECIALISTA EM CUSTOS da Fit Film.

${FILOSOFIA_BASE}

SEU FOCO EXCLUSIVO: Os custos que explodiram e a margem que despencou.

O QUE OS DADOS MOSTRAM:
- Set/2024: Custos subiram 35% sem receita proporcional
- Margem caiu de 25% para 15% = PERDA DE 40% DA RENTABILIDADE
- Debito emergencial de R$ 138.000 com FRONERI = fluxo de caixa no limite
- Boleto e o meio mais usado (902 transacoes) = custo bancario alto
- Ainda usa cheque (15 transacoes) e duplicata (83) = metodos caros e lentos
- IFCO SYSTEMS cobra R$ 42.000 por servicos de embalagem
- EMBALAFITAS recebeu R$ 17.502 para pagamento de boletos

O ERRO: A empresa nao controla custos. Nao tem orcamento mensal com teto.
Nao negocia com fornecedores. Nao diversifica base de fornecedores.
Usa metodos de pagamento caros (boleto, duplicata, cheque) em vez de PIX e transferencia.

VOCE DEVE: Mostrar onde cortar custos, como recuperar margem, e quanto a empresa economiza com cada acao.

${DADOS_REAIS}`,

    qualidade: `Voce e o CONSULTOR ESPECIALISTA EM QUALIDADE da Fit Film.

${FILOSOFIA_BASE}

SEU FOCO EXCLUSIVO: A crise de qualidade que custou receita e reputacao.

O QUE OS DADOS MOSTRAM:
- Mar/2025: Receita caiu 15% por problema de qualidade
- Inadimplencia subiu para 26,4% (clientes insatisfeitos nao pagam)
- Registros de "lote e quantidade divergente" no sistema
- Vencido subiu para R$ 560.000 (acima da media de R$ 430.000)
- Produtos: Embalagem Doce Quadrado, Embalagem Retangular Articulado 750ml
- Empresa de 25 anos SEM certificacao ISO ou controle formal

O ERRO: Uma empresa de embalagens de 25 anos sem controle de qualidade formal.
Sem rastreabilidade de lotes. Sem auditoria de processo. Sem ISO 9001.
O resultado: lotes divergentes, clientes insatisfeitos, receita perdida.

VOCE DEVE: Mostrar o impacto real da falta de qualidade e o plano de implementacao de controle com prazos e custos.

${DADOS_REAIS}`,

    vendas: `Voce e o CONSULTOR ESPECIALISTA EM VENDAS da Fit Film.

${FILOSOFIA_BASE}

SEU FOCO EXCLUSIVO: A estrategia comercial que precisa ser modernizada.

O QUE OS DADOS MOSTRAM:
- Faturamento R$ 57M em 24 meses (media R$ 2,37M/mes)
- Jun/2024: Vendas cairam 57% (R$ 620k vs media R$ 1,42M)
- Concentracao perigosa: poucos clientes grandes (FRONERI, TUPPERWARE, NOVA PROSPER)
- FENIX e o unico cliente modelo (R$ 52.300 quitado)
- 902 boletos = vendas dependem de um unico metodo de cobranca
- Apenas 285 PIX = pouca adocao de metodos modernos
- Produtos limitados: Doce Quadrado, Retangular Articulado 750ml

O ERRO: Empresa de 25 anos com carteira concentrada em poucos clientes.
Quando um cliente grande para de comprar (Jun/2024), a receita despenca 57%.
Nao tem pipeline de vendas. Nao tem diversificacao. Nao tem estrategia de retencao.

VOCE DEVE: Mostrar como diversificar a carteira, criar pipeline previsivel, e modernizar a estrategia comercial.

${DADOS_REAIS}`,

    planejamento: `Voce e o CONSULTOR ESPECIALISTA EM PLANEJAMENTO ESTRATEGICO da Fit Film.

${FILOSOFIA_BASE}

SEU FOCO EXCLUSIVO: O planejamento que deu errado e como fazer o novo.

O QUE OS DADOS MOSTRAM:
- O planejamento foi feito sobre FATURAMENTO (R$ 57M), nao sobre RECEBIMENTO (R$ 35,5M)
- Diferenca: R$ 21,5M que o planejamento CONTAVA mas NAO EXISTIAM
- 3 crises em 18 meses sem plano de contingencia
- Inadimplencia cronica de 22,33% = o planejamento ignorou isso
- Empresa sem sistema de alerta precoce
- Sem orcamento mensal com teto de gastos
- Sem metas de recebimento (so metas de faturamento)
- Ajustes emergenciais (FRONERI R$ 138k) = apagar incendio, nao planejar

O ERRO FATAL DO PLANEJAMENTO:
Planejar com base em FATURAMENTO e nao em RECEBIMENTO REAL.
A empresa achou que ia ter R$ 57M mas so teve R$ 35,5M.
Isso e como planejar uma viagem de 1000km com combustivel pra 620km.

VOCE DEVE: Mostrar EXATAMENTE onde o planejamento errou (com numeros) e propor o novo planejamento
baseado em RECEBIMENTO REAL, com metas mensais, sistema de alerta e plano de contingencia.

DE ONDE VIEMOS → ONDE ESTAMOS → PARA ONDE VAMOS

${DADOS_REAIS}`
};

// Historico de conversas por agente
const conversations = {};
Object.keys(AGENT_PROMPTS).forEach(agent => {
    conversations[agent] = [{ role: 'system', content: AGENT_PROMPTS[agent] }];
});

// ========== OPENAI CHAT ==========
async function callOpenAI(agent, userMessage) {
    conversations[agent].push({ role: 'user', content: userMessage });
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OPENAI_API_KEY },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: conversations[agent],
                temperature: 0.4,
                max_tokens: 4000,
                presence_penalty: 0.2,
                frequency_penalty: 0.1
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
        return 'Erro ao processar: ' + error.message;
    }
}

// ========== TEXT-TO-SPEECH (FALAR RESPOSTAS) ==========
async function speakText(text) {
    if (!audioEnabled) return;
    stopAudio();
    const cleanText = text.replace(/[#*`_~\[\]()>|■▸●]/g, '').replace(/\n+/g, '. ').substring(0, 4000);
    try {
        const response = await fetch('https://api.openai.com/v1/audio/speech', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OPENAI_API_KEY },
            body: JSON.stringify({ model: 'tts-1-hd', input: cleanText, voice: 'onyx', response_format: 'mp3', speed: 1.0 })
        });
        if (!response.ok) throw new Error('TTS Error');
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        currentAudio = new Audio(url);
        currentAudio.onended = () => { currentAudio = null; updateSpeakButtons(false); };
        currentAudio.play();
        updateSpeakButtons(true);
    } catch (e) {
        console.error('TTS Error:', e);
        speakWithBrowser(cleanText);
    }
}

function speakWithBrowser(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text.substring(0, 2000));
        utterance.lang = 'pt-BR';
        utterance.rate = 1.0;
        const voices = window.speechSynthesis.getVoices();
        const ptVoice = voices.find(v => v.lang.startsWith('pt'));
        if (ptVoice) utterance.voice = ptVoice;
        utterance.onend = () => updateSpeakButtons(false);
        window.speechSynthesis.speak(utterance);
        updateSpeakButtons(true);
    }
}

function stopAudio() {
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    updateSpeakButtons(false);
}

function updateSpeakButtons(playing) {
    document.querySelectorAll('.btn-speak').forEach(btn => btn.classList.toggle('playing', playing));
}

function toggleGlobalAudio() {
    audioEnabled = !audioEnabled;
    const icon = document.getElementById('global-audio-icon');
    if (icon) icon.textContent = audioEnabled ? 'volume_up' : 'volume_off';
    const label = document.getElementById('global-audio-label');
    if (label) label.textContent = audioEnabled ? 'Áudio Ativo' : 'Áudio Desligado';
    if (!audioEnabled) stopAudio();
}

// ========== SPEECH-TO-TEXT (OUVIR CEO FALAR) ==========
async function startRecording(agent) {
    if (isRecording) { stopRecording(agent); return; }
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: { channelCount: 1, sampleRate: 16000, echoCancellation: true, noiseSuppression: true }
        });
        audioChunks = [];
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
        mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunks.push(e.data); };
        mediaRecorder.onstop = async () => {
            stream.getTracks().forEach(t => t.stop());
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            if (audioBlob.size < 1000) { showMicStatus(agent, 'Áudio muito curto.', 'error'); return; }
            showMicStatus(agent, 'Transcrevendo...', 'processing');
            try {
                const formData = new FormData();
                formData.append('file', audioBlob, 'audio.webm');
                formData.append('model', 'whisper-1');
                formData.append('language', 'pt');
                formData.append('response_format', 'json');
                const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + OPENAI_API_KEY },
                    body: formData
                });
                if (!response.ok) throw new Error('Whisper Error');
                const data = await response.json();
                const transcription = data.text?.trim();
                if (transcription) {
                    const input = document.getElementById('input-' + agent);
                    if (input) { input.value = transcription; showMicStatus(agent, 'Transcrito! Enviando...', 'success'); setTimeout(() => { sendAgentMsg(agent); hideMicStatus(agent); }, 500); }
                } else { showMicStatus(agent, 'Não entendi. Tente novamente.', 'error'); setTimeout(() => hideMicStatus(agent), 3000); }
            } catch (e) { showMicStatus(agent, 'Erro: ' + e.message, 'error'); setTimeout(() => hideMicStatus(agent), 3000); }
        };
        mediaRecorder.start(250);
        isRecording = true;
        updateMicButton(agent, true);
        showMicStatus(agent, 'Gravando... Fale agora!', 'recording');
    } catch (e) { showMicStatus(agent, 'Erro ao acessar microfone.', 'error'); setTimeout(() => hideMicStatus(agent), 3000); }
}

function stopRecording(agent) {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    isRecording = false;
    updateMicButton(agent, false);
}

function updateMicButton(agent, recording) {
    const btn = document.getElementById('mic-' + agent);
    if (!btn) return;
    if (recording) { btn.classList.add('recording'); btn.innerHTML = '<span class="material-icons-outlined" style="font-size:20px;color:#f44336;">stop</span>'; }
    else { btn.classList.remove('recording'); btn.innerHTML = '<span class="material-icons-outlined" style="font-size:20px;">mic</span>'; }
}

function showMicStatus(agent, text, type) {
    let el = document.getElementById('mic-status-' + agent);
    if (!el) {
        const inputArea = document.getElementById('input-' + agent)?.parentElement;
        if (!inputArea) return;
        el = document.createElement('div');
        el.id = 'mic-status-' + agent;
        el.style.cssText = 'padding:6px 12px;border-radius:6px;font-size:12px;font-weight:600;margin-bottom:6px;display:flex;align-items:center;gap:6px;';
        inputArea.parentElement.insertBefore(el, inputArea);
    }
    const colors = { recording: { bg: '#f4433620', color: '#f44336', icon: 'fiber_manual_record' }, processing: { bg: '#ff980020', color: '#ff9800', icon: 'hourglass_empty' }, success: { bg: '#4caf5020', color: '#4caf50', icon: 'check_circle' }, error: { bg: '#f4433620', color: '#f44336', icon: 'error' } };
    const c = colors[type] || colors.processing;
    el.style.background = c.bg; el.style.color = c.color;
    el.innerHTML = `<span class="material-icons-outlined" style="font-size:16px;${type==='recording'?'animation:blink 1s infinite;':''}">${c.icon}</span> ${text}`;
    el.style.display = 'flex';
}

function hideMicStatus(agent) { const el = document.getElementById('mic-status-' + agent); if (el) el.style.display = 'none'; }

// ========== UI HELPERS ==========
const AGENT_LABELS = {
    master: { avatar: 'CE', title: 'Consultor Estratégico', color: 'linear-gradient(135deg, #e91e8c, #00bcd4)' },
    inadimplencia: { avatar: 'IN', title: 'Consultor Inadimplência', color: '#f44336' },
    custos: { avatar: 'CU', title: 'Consultor Custos', color: '#ff9800' },
    qualidade: { avatar: 'QA', title: 'Consultor Qualidade', color: '#00bcd4' },
    vendas: { avatar: 'VD', title: 'Consultor Vendas', color: '#4caf50' },
    planejamento: { avatar: 'PL', title: 'Consultor Planejamento', color: '#fdd835' }
};

function escHtml(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

function formatMD(text) {
    return text
        .replace(/#### (.*?)(\n|$)/g, '<h5 style="margin:10px 0 4px;color:#e91e8c;font-size:13px;">$1</h5>')
        .replace(/### (.*?)(\n|$)/g, '<h4 style="margin:12px 0 6px;color:#e91e8c;font-size:14px;">$1</h4>')
        .replace(/## (.*?)(\n|$)/g, '<h3 style="margin:14px 0 8px;color:#00bcd4;font-size:15px;border-bottom:1px solid #1e2235;padding-bottom:6px;">$1</h3>')
        .replace(/# (.*?)(\n|$)/g, '<h2 style="margin:16px 0 10px;color:#e8eaf0;font-size:16px;">$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#e8eaf0;">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code style="background:#1e2235;padding:2px 6px;border-radius:4px;font-size:12px;">$1</code>')
        .replace(/\n\n/g, '</p><p style="margin:8px 0;">')
        .replace(/\n- /g, '<br><span style="color:#00bcd4;margin-right:6px;">▸</span> ')
        .replace(/\n(\d+)\. /g, '<br><span style="color:#e91e8c;font-weight:700;margin-right:6px;">$1.</span> ')
        .replace(/\n/g, '<br>');
}

function addAgentMessage(agent, text, isUser) {
    const container = document.getElementById('chat-' + agent);
    if (!container) return;
    const info = AGENT_LABELS[agent];
    const div = document.createElement('div');
    div.className = 'msg ' + (isUser ? 'user' : 'bot');
    div.innerHTML = `
        <div class="msg-avatar" style="background:${isUser ? 'var(--cyan)' : info.color};${agent === 'planejamento' && !isUser ? 'color:#333;' : ''}" title="${isUser ? 'CEO' : info.title}">${isUser ? 'CEO' : info.avatar}</div>
        <div class="msg-bubble">
            ${isUser ? escHtml(text) : formatMD(text)}
            ${!isUser ? `<div class="msg-actions">
                <button class="btn-speak" onclick="speakText(this.closest('.msg-bubble').textContent)" title="Ouvir resposta"><span class="material-icons-outlined" style="font-size:16px;">volume_up</span> Ouvir</button>
                <button class="btn-speak" onclick="stopAudio()" title="Parar áudio"><span class="material-icons-outlined" style="font-size:16px;">stop</span> Parar</button>
            </div>` : ''}
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
    div.className = 'msg bot'; div.id = 'typing-' + agent;
    div.innerHTML = `
        <div class="msg-avatar" style="background:${info.color};${agent === 'planejamento' ? 'color:#333;' : ''}">${info.avatar}</div>
        <div class="msg-bubble" style="opacity:0.7;"><div style="display:flex;align-items:center;gap:8px;"><span class="typing-dots"><span style="animation:blink 1.4s infinite both;">●</span><span style="animation:blink 1.4s 0.2s infinite both;">●</span><span style="animation:blink 1.4s 0.4s infinite both;">●</span></span><span style="font-size:13px;">Analisando dados reais...</span></div></div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function removeTyping(agent) { const el = document.getElementById('typing-' + agent); if (el) el.remove(); }

async function sendAgentMsg(agent) {
    const input = document.getElementById('input-' + agent);
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    const sug = input.closest('.chat-panel-full')?.querySelector('.chat-suggestions');
    if (sug) sug.style.display = 'none';
    addAgentMessage(agent, text, true);
    addTyping(agent);
    const reply = await callOpenAI(agent, text);
    removeTyping(agent);
    addAgentMessage(agent, reply, false);
    if (audioEnabled) speakText(reply);
}

function askAgent(agent, text) {
    const input = document.getElementById('input-' + agent);
    if (input) input.value = text;
    sendAgentMsg(agent);
}
