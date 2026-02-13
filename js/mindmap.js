// Mapa Mental Interativo - D3.js Force-Directed Graph
function initMindmap() {
    const container = document.getElementById('mindmap-svg');
    if (!container) return;
    container.innerHTML = '';
    const w = container.clientWidth || 900;
    const h = 600;

    const nodes = [
        { id: 'fitfilm', label: 'FIT FILM', group: 'empresa', r: 38 },
        // Indicadores
        { id: 'inadimplencia', label: 'Inadimplencia\n22,33%', group: 'indicador', r: 28 },
        { id: 'recebimento', label: 'Eficiencia\n61,75%', group: 'indicador', r: 26 },
        { id: 'faturamento', label: 'Faturamento\nR$ 57M', group: 'indicador', r: 26 },
        { id: 'vencido', label: 'Vencido\nR$ 11,6M', group: 'indicador', r: 26 },
        // Anomalias
        { id: 'anomalia1', label: 'Colapso Vendas\nJun/2024\n-60%', group: 'anomalia-critica', r: 30 },
        { id: 'anomalia2', label: 'Explosao Custos\nSet/2024\n+35%', group: 'anomalia-critica', r: 30 },
        { id: 'anomalia3', label: 'Crise Qualidade\nMar/2025\n-15%', group: 'anomalia-alta', r: 28 },
        // Clientes/Fornecedores
        { id: 'froneri', label: 'FRONERI\nR$ 156.762', group: 'cliente', r: 22 },
        { id: 'ifco', label: 'IFCO SYSTEMS\nR$ 42.000', group: 'cliente', r: 20 },
        { id: 'embalafitas', label: 'EMBALAFITAS\nR$ 17.502', group: 'cliente', r: 20 },
        { id: 'fenix', label: 'FENIX\nR$ 52.300', group: 'cliente', r: 20 },
        { id: 'ebd', label: 'EMP. BRAS.\nDISTRIBUICAO', group: 'cliente', r: 18 },
        // Recomendacoes
        { id: 'rec1', label: 'Reestruturar\nCredito', group: 'recomendacao', r: 22 },
        { id: 'rec2', label: 'Cobranca\nAtiva', group: 'recomendacao', r: 22 },
        { id: 'rec3', label: 'Controle\nQualidade', group: 'recomendacao', r: 22 },
        { id: 'rec4', label: 'Diversificar\nReceita', group: 'recomendacao', r: 22 },
        { id: 'rec5', label: 'Reserva\nContingencia', group: 'recomendacao', r: 22 }
    ];

    const links = [
        { source: 'fitfilm', target: 'inadimplencia', strength: 3 },
        { source: 'fitfilm', target: 'recebimento', strength: 3 },
        { source: 'fitfilm', target: 'faturamento', strength: 3 },
        { source: 'fitfilm', target: 'vencido', strength: 3 },
        { source: 'fitfilm', target: 'anomalia1', strength: 2 },
        { source: 'fitfilm', target: 'anomalia2', strength: 2 },
        { source: 'fitfilm', target: 'anomalia3', strength: 2 },
        { source: 'anomalia1', target: 'inadimplencia', strength: 1 },
        { source: 'anomalia2', target: 'froneri', strength: 2 },
        { source: 'anomalia2', target: 'vencido', strength: 1 },
        { source: 'anomalia3', target: 'rec3', strength: 1 },
        { source: 'inadimplencia', target: 'rec1', strength: 1 },
        { source: 'inadimplencia', target: 'rec2', strength: 1 },
        { source: 'vencido', target: 'rec2', strength: 1 },
        { source: 'fitfilm', target: 'froneri', strength: 1 },
        { source: 'fitfilm', target: 'ifco', strength: 1 },
        { source: 'fitfilm', target: 'embalafitas', strength: 1 },
        { source: 'fitfilm', target: 'fenix', strength: 1 },
        { source: 'fitfilm', target: 'ebd', strength: 1 },
        { source: 'faturamento', target: 'rec4', strength: 1 },
        { source: 'recebimento', target: 'rec5', strength: 1 },
        { source: 'anomalia1', target: 'rec4', strength: 1 }
    ];

    const colors = {
        'empresa': '#e91e8c',
        'indicador': '#00bcd4',
        'anomalia-critica': '#f44336',
        'anomalia-alta': '#ff9800',
        'cliente': '#fdd835',
        'recomendacao': '#4caf50'
    };

    const svg = d3.select('#mindmap-svg')
        .append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('viewBox', `0 0 ${w} ${h}`);

    // Defs for glow
    const defs = svg.append('defs');
    const filter = defs.append('filter').attr('id', 'glow');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(d => 120 + (d.strength || 1) * 20))
        .force('charge', d3.forceManyBody().strength(-400))
        .force('center', d3.forceCenter(w / 2, h / 2))
        .force('collision', d3.forceCollide().radius(d => d.r + 15));

    const link = svg.append('g')
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke', '#2a2f45')
        .attr('stroke-width', d => d.strength || 1)
        .attr('stroke-opacity', 0.6);

    const node = svg.append('g')
        .selectAll('g')
        .data(nodes)
        .join('g')
        .call(d3.drag()
            .on('start', (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
            .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
            .on('end', (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; })
        );

    node.append('circle')
        .attr('r', d => d.r)
        .attr('fill', d => colors[d.group] || '#8890a8')
        .attr('fill-opacity', 0.2)
        .attr('stroke', d => colors[d.group] || '#8890a8')
        .attr('stroke-width', 2)
        .style('filter', 'url(#glow)')
        .style('cursor', 'grab');

    node.append('text')
        .attr('text-anchor', 'middle')
        .attr('fill', '#e8eaf0')
        .attr('font-size', d => d.group === 'empresa' ? '11px' : '9px')
        .attr('font-weight', d => d.group === 'empresa' ? '800' : '600')
        .attr('pointer-events', 'none')
        .each(function(d) {
            const lines = d.label.split('\n');
            const el = d3.select(this);
            lines.forEach((line, i) => {
                el.append('tspan')
                    .attr('x', 0)
                    .attr('dy', i === 0 ? `-${(lines.length - 1) * 0.5}em` : '1.1em')
                    .text(line);
            });
        });

    // Tooltip
    node.append('title').text(d => d.label.replace(/\n/g, ' '));

    simulation.on('tick', () => {
        link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
        node.attr('transform', d => `translate(${Math.max(d.r, Math.min(w - d.r, d.x))},${Math.max(d.r, Math.min(h - d.r, d.y))})`);
    });
}

function resetMindmap() {
    initMindmap();
}
