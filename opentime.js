let data = [];  // 将 data 设为全局变量

// 用于显示加载动画
function showLoader() {
  document.getElementById('loader').classList.add('active');
}

// 用于隐藏加载动画
function hideLoader() {
  document.getElementById('loader').classList.remove('active');
}

// 从 time.txt 文件加载数据并填充表格
function fetchData() {
  fetch('time.txt')
    .then(response => {
      if (response.ok) {
        console.log('time.txt successfully loaded');
        return response.json();  // 解析为 JSON 数据
      } else {
        console.error('Failed to load time.txt');
        throw new Error('Failed to load time.txt');
      }
    })
    .then(fetchedData => {
      data = fetchedData;  // 更新全局数据
      console.log('Parsed data:', data);  // 打印解析后的数据
      populateTable(data);  // 填充表格
    })
    .catch(error => console.error(error));  // 捕获并打印错误
}

// 填充表格
function populateTable(data) {
  showLoader();
  const tableBody = document.getElementById('statusTable').getElementsByTagName('tbody')[0];

  // 排序数据（按状态排序：Active > Pending > Close）
  data.sort((a, b) => {
    const stateOrder = { 'Active': 1, 'Pending': 2, 'close': 3 };
    return stateOrder[a.state] - stateOrder[b.state];
  });

  tableBody.innerHTML = "";  // 清空现有的表格内容
  data.forEach(item => {
    const row = document.createElement('tr');
    
    // 创建 ID 列
    const idCell = document.createElement('td');
    idCell.textContent = item.id;
    row.appendChild(idCell);

    // 创建 Hours 列
    const hoursCell = document.createElement('td');
    hoursCell.textContent = item.hours;
    row.appendChild(hoursCell);

    // 创建 Language 列
    const languageCell = document.createElement('td');
    languageCell.textContent = item.language;
    row.appendChild(languageCell);

    // 创建 State 列
    const stateCell = document.createElement('td');
    stateCell.textContent = item.state;

    // 根据状态为单元格添加不同的颜色类
    if (item.state.toLowerCase() === 'active') {
      stateCell.classList.add('state-active');
    } else if (item.state.toLowerCase() === 'pending') {
      stateCell.classList.add('state-pending');
    } else if (item.state.toLowerCase() === 'close') {
      stateCell.classList.add('state-close');
    }

    row.appendChild(stateCell);
    tableBody.appendChild(row);
  });

  hideLoader();  // 隐藏加载动画
}

// 按列排序
function sortTable(columnIndex) {
  const table = document.getElementById('statusTable');
  const rows = Array.from(table.rows).slice(1);  // 排除表头
  const ascending = table.rows[0].cells[columnIndex].classList.toggle('asc');
  
  rows.sort((rowA, rowB) => {
    const cellA = rowA.cells[columnIndex].textContent.trim();
    const cellB = rowB.cells[columnIndex].textContent.trim();

    if (ascending) {
      return cellA.localeCompare(cellB);
    } else {
      return cellB.localeCompare(cellA);
    }
  });

  rows.forEach(row => table.appendChild(row));  // 将排序后的行重新附加到表格中
}

// 搜索过滤
function filterTable() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const stateFilter = document.getElementById('stateFilter').value.toLowerCase();
  
  const filteredData = data.filter(item => {
    const searchMatch = item.id.toLowerCase().includes(searchInput) ||
                        item.hours.toLowerCase().includes(searchInput) ||
                        item.language.toLowerCase().includes(searchInput);
    
    const stateMatch = stateFilter ? item.state.toLowerCase() === stateFilter : true;

    return searchMatch && stateMatch;
  });

  populateFilteredTable(filteredData);  // 根据过滤后的数据填充表格
}

// 根据过滤后的数据填充表格
function populateFilteredTable(filteredData) {
  const tableBody = document.getElementById('statusTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = "";  // 清空现有的表格内容
  filteredData.forEach(item => {
    const row = document.createElement('tr');
    
    // 创建 ID 列
    const idCell = document.createElement('td');
    idCell.textContent = item.id;
    row.appendChild(idCell);

    // 创建 Hours 列
    const hoursCell = document.createElement('td');
    hoursCell.textContent = item.hours;
    row.appendChild(hoursCell);

    // 创建 Language 列
    const languageCell = document.createElement('td');
    languageCell.textContent = item.language;
    row.appendChild(languageCell);

    // 创建 State 列
    const stateCell = document.createElement('td');
    stateCell.textContent = item.state;

    // 根据状态为单元格添加不同的颜色类
    if (item.state.toLowerCase() === 'active') {
      stateCell.classList.add('state-active');
    } else if (item.state.toLowerCase() === 'pending') {
      stateCell.classList.add('state-pending');
    } else if (item.state.toLowerCase() === 'close') {
      stateCell.classList.add('state-close');
    }

    row.appendChild(stateCell);
    tableBody.appendChild(row);
  });
}

// 初始化页面加载时的数据
window.onload = function() {
  fetchData();  // 加载并显示数据
};
