// ===== 当前数据 =====
let appData = OC.load();

// ===== 渲染所有页面 =====
function renderAll() {
    renderOCList();
    renderTimelineList();
    renderRelationList();
    renderItemList();
    renderEntityList();
    updateStats();
}

// ===== 页面切换 =====
function switchPage(pageName) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelector(`#page-${pageName}`)?.classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.nav-btn[data-page="${pageName}"]`)?.classList.add('active');
}

// ===== 更新统计 =====
function updateStats() {
    document.getElementById('stat-oc').textContent = appData.characters.length;
    document.getElementById('stat-timeline').textContent = appData.timelines.length;
    document.getElementById('stat-relation').textContent = appData.relations.length;
    document.getElementById('stat-item').textContent = appData.items.length;
}

// ===== 渲染各列表（骨架，等你告诉我字段再填） =====
function renderOCList() {
    const container = document.getElementById('oc-list');
    if (!container) return;
    // TODO: 等你告诉我OC要显示哪些信息
}

function renderTimelineList() { /* TODO */ }
function renderRelationList() { /* TODO */ }
function renderItemList() { /* TODO */ }
function renderEntityList() { /* TODO */ }

// ===== 页面初始化 =====
document.addEventListener('DOMContentLoaded', function() {
    // 导航按钮点击事件
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchPage(this.dataset.page);
        });
    });

    // 添加按钮事件（TODO: 具体功能等你定）
    document.getElementById('addOCBtn').addEventListener('click', function() {
        alert('添加OC功能待实现');
    });
    // ... 其他添加按钮同理

    // 导入导出
    document.getElementById('exportBtn').addEventListener('click', exportData);
    document.getElementById('importBtn').addEventListener('click', importData);

    // 渲染
    renderAll();
});

// ===== 导出JSON =====
function exportData() {
    const json = JSON.stringify(appData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `OC宇宙_${new Date().toISOString().slice(0,10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
}

// ===== 导入JSON =====
function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
            try {
                const imported = JSON.parse(ev.target.result);
                appData = { ...OC.defaults, ...imported };
                OC.save(appData);
                renderAll();
                alert('✅ 导入成功！');
            } catch (err) {
                alert('❌ JSON格式有误，请检查文件');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}
