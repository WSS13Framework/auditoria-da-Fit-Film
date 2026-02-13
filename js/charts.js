Chart.defaults.color = '#8890a8';
Chart.defaults.borderColor = '#1e2235';
Chart.defaults.font.family = "'Inter', sans-serif";

const BRAND = {
    magenta: '#e91e8c', magentaAlpha: 'rgba(233,30,140,0.7)', magentaFill: 'rgba(233,30,140,0.12)',
    cyan: '#00bcd4', cyanAlpha: 'rgba(0,188,212,0.7)', cyanFill: 'rgba(0,188,212,0.12)',
    yellow: '#fdd835', yellowAlpha: 'rgba(253,216,53,0.7)', yellowFill: 'rgba(253,216,53,0.12)',
    green: '#4caf50', greenAlpha: 'rgba(76,175,80,0.7)', greenFill: 'rgba(76,175,80,0.12)',
    red: '#f44336', redAlpha: 'rgba(244,67,54,0.7)', redFill: 'rgba(244,67,54,0.12)',
    orange: '#ff9800', orangeAlpha: 'rgba(255,152,0,0.7)',
    gridColor: 'rgba(30,34,53,0.6)'
};

let chartEvolution, chartComposition, chartOntime, chartDefaultRate, chartReceivables, chartClients;

function fmt(v) { return 'R$ ' + (v/1000).toFixed(0) + 'k'; }

function initCharts() {
    createEvolutionChart();
    createCompositionChart();
    createOntimeChart();
    createDefaultRateChart();
    createReceivablesChart();
    createClientsChart();
}

function getFilteredData() {
    const f = document.getElementById('chart-year-filter');
    const filter = f ? f.value : 'all';
    if (filter === 'all') return AUDIT_DATA.mensal;
    return AUDIT_DATA.mensal.filter(d => d.ano === parseInt(filter));
}

function createEvolutionChart() {
    const data = getFilteredData();
    const ctx = document.getElementById('chart-evolution');
    if (!ctx) return;
    if (chartEvolution) chartEvolution.destroy();
    chartEvolution = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.label),
            datasets: [
                { label: 'Recebido', data: data.map(d => d.recebido), backgroundColor: BRAND.cyanAlpha, borderRadius: 5, order: 2 },
                { label: 'Vencido', data: data.map(d => d.vencido), backgroundColor: BRAND.redAlpha, borderRadius: 5, order: 2 },
                { label: 'Inadimplencia %', data: data.map(d => d.inadimplencia), type: 'line', borderColor: BRAND.yellow, backgroundColor: BRAND.yellowFill, pointBackgroundColor: BRAND.yellow, pointRadius: 4, pointHoverRadius: 6, tension: 0.3, yAxisID: 'y1', fill: true, order: 1, borderWidth: 2.5 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { position: 'top', labels: { usePointStyle: true, padding: 18, font: { size: 11, weight: '500' } } },
                tooltip: { backgroundColor: '#12151f', borderColor: '#2a2f45', borderWidth: 1, padding: 14, titleFont: { weight: '600' }, callbacks: { label: function(c) { if (c.dataset.yAxisID === 'y1') return c.dataset.label + ': ' + c.parsed.y.toFixed(1) + '%'; return c.dataset.label + ': ' + fmt(c.parsed.y); } } }
            },
            scales: {
                y: { ticks: { callback: v => fmt(v) }, grid: { color: BRAND.gridColor } },
                y1: { position: 'right', ticks: { callback: v => v + '%' }, grid: { display: false }, min: 0, max: 50 },
                x: { grid: { display: false }, ticks: { font: { size: 10 } } }
            }
        }
    });
}

function createCompositionChart() {
    const ctx = document.getElementById('chart-composition');
    if (!ctx) return;
    if (chartComposition) chartComposition.destroy();
    const k = AUDIT_DATA.kpis;
    chartComposition = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Recebido Em Dia', 'Recebido Atrasado', 'A Vencer', 'Vencido'],
            datasets: [{ data: [k.totalEmDia, k.totalAtrasado, k.totalAVencer, k.totalVencido], backgroundColor: [BRAND.green, BRAND.yellow, BRAND.cyan, BRAND.red], borderWidth: 0, hoverOffset: 10 }]
        },
        options: {
            responsive: true, maintainAspectRatio: false, cutout: '68%',
            plugins: {
                legend: { position: 'bottom', labels: { usePointStyle: true, padding: 14, font: { size: 11, weight: '500' } } },
                tooltip: { callbacks: { label: function(c) { const t = c.dataset.data.reduce((a, b) => a + b, 0); return c.label + ': R$ ' + (c.parsed / 1e6).toFixed(1) + 'M (' + ((c.parsed / t) * 100).toFixed(1) + '%)'; } } }
            }
        }
    });
}

function createOntimeChart() {
    const data = AUDIT_DATA.mensal;
    const ctx = document.getElementById('chart-ontime');
    if (!ctx) return;
    if (chartOntime) chartOntime.destroy();
    chartOntime = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.label),
            datasets: [
                { label: 'Em Dia', data: data.map(d => d.emdia), backgroundColor: BRAND.greenAlpha, borderRadius: 4 },
                { label: 'Atrasado', data: data.map(d => d.atrasado), backgroundColor: BRAND.orangeAlpha, borderRadius: 4 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { usePointStyle: true, padding: 14, font: { size: 11, weight: '500' } } },
                tooltip: { callbacks: { label: c => c.dataset.label + ': ' + fmt(c.parsed.y) } }
            },
            scales: {
                x: { stacked: true, grid: { display: false }, ticks: { font: { size: 9 } } },
                y: { stacked: true, ticks: { callback: v => fmt(v) }, grid: { color: BRAND.gridColor } }
            }
        }
    });
}

function createDefaultRateChart() {
    const data = AUDIT_DATA.mensal;
    const ctx = document.getElementById('chart-default-rate');
    if (!ctx) return;
    if (chartDefaultRate) chartDefaultRate.destroy();
    chartDefaultRate = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.label),
            datasets: [
                { label: 'Taxa Inadimplencia', data: data.map(d => d.inadimplencia), borderColor: BRAND.magenta, backgroundColor: BRAND.magentaFill, fill: true, tension: 0.3, pointRadius: 3, pointHoverRadius: 6, pointBackgroundColor: data.map(d => d.inadimplencia > 25 ? BRAND.red : BRAND.magenta), borderWidth: 2.5 },
                { label: 'Limite Aceitavel (5%)', data: data.map(() => 5), borderColor: BRAND.green, borderDash: [6, 4], pointRadius: 0, fill: false, borderWidth: 2 },
                { label: 'Media (22,33%)', data: data.map(() => 22.33), borderColor: BRAND.yellow, borderDash: [6, 4], pointRadius: 0, fill: false, borderWidth: 2 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { usePointStyle: true, padding: 14, font: { size: 11, weight: '500' } } },
                tooltip: { callbacks: { label: c => c.dataset.label + ': ' + c.parsed.y.toFixed(1) + '%' } }
            },
            scales: {
                y: { ticks: { callback: v => v + '%' }, grid: { color: BRAND.gridColor }, min: 0, max: 50 },
                x: { grid: { display: false }, ticks: { font: { size: 9 } } }
            }
        }
    });
}

function createReceivablesChart() {
    const data = AUDIT_DATA.mensal;
    const ctx = document.getElementById('chart-receivables');
    if (!ctx) return;
    if (chartReceivables) chartReceivables.destroy();
    chartReceivables = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.label),
            datasets: [
                { label: 'Recebido', data: data.map(d => d.recebido), backgroundColor: BRAND.magentaAlpha, borderRadius: 4 },
                { label: 'A Vencer', data: data.map(d => d.avencer), backgroundColor: BRAND.cyanAlpha, borderRadius: 4 },
                { label: 'Vencido', data: data.map(d => d.vencido), backgroundColor: BRAND.redAlpha, borderRadius: 4 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { usePointStyle: true, padding: 14, font: { size: 11, weight: '500' } } },
                tooltip: { callbacks: { label: c => c.dataset.label + ': ' + fmt(c.parsed.y) } }
            },
            scales: {
                x: { grid: { display: false }, ticks: { font: { size: 9 } } },
                y: { ticks: { callback: v => fmt(v) }, grid: { color: BRAND.gridColor } }
            }
        }
    });
}

function createClientsChart() {
    const ctx = document.getElementById('chart-clients');
    if (!ctx) return;
    if (chartClients) chartClients.destroy();
    const mp = AUDIT_DATA.meiosPagamento;
    chartClients = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Boleto', 'PIX', 'Transferencia', 'Duplicata', 'Cheque'],
            datasets: [{ data: [mp.boleto, mp.pix, mp.transferencia, mp.duplicata, mp.cheque], backgroundColor: [BRAND.magenta, BRAND.cyan, BRAND.green, BRAND.yellow, '#8890a8'], borderWidth: 0, hoverOffset: 8 }]
        },
        options: {
            responsive: true, maintainAspectRatio: false, cutout: '62%',
            plugins: {
                legend: { position: 'bottom', labels: { usePointStyle: true, padding: 12, font: { size: 11, weight: '500' } } },
                tooltip: { callbacks: { label: function(c) { const t = c.dataset.data.reduce((a, b) => a + b, 0); return c.label + ': ' + c.parsed + ' (' + ((c.parsed / t) * 100).toFixed(1) + '%)'; } } }
            }
        }
    });
}

function updateCharts() { createEvolutionChart(); }
