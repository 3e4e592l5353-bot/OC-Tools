// ===== 默认数据结构 =====
const DEFAULT_DATA = {
    characters: [],
    timelines: [],
    relations: [],
    items: [],
    entities: [],
    nextId: 1
};

// ===== 加载数据 =====
function loadData() {
    try {
        const raw = localStorage.getItem('ocData');
        if (raw) {
            const parsed = JSON.parse(raw);
            // 合并默认字段，防止新增字段报错
            return { ...DEFAULT_DATA, ...parsed };
        }
    } catch (e) {
        console.warn('数据加载失败，使用默认数据', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

// ===== 保存数据 =====
function saveData(data) {
    localStorage.setItem('ocData', JSON.stringify(data));
    // 触发自动保存状态更新
    const status = document.getElementById('auto-save-status');
    if (status) {
        status.textContent = '✅ 已自动保存';
        status.style.color = '#4ade80';
        clearTimeout(window.saveTimeout);
        window.saveTimeout = setTimeout(() => {
            status.textContent = '💾 已保存';
        }, 1500);
    }
}

// ===== 生成新ID =====
function generateId(data) {
    return data.nextId++;
}

// ===== 暴露全局接口 =====
window.OC = {
    load: loadData,
    save: saveData,
    generateId: generateId,
    defaults: DEFAULT_DATA
};
