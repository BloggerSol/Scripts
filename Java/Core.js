(function() {
  var shop = document.getElementById('Shop');
  if (!shop || !window.services) return;

  var groups = Object.keys(services);
  var type = shop.getAttribute('data-type') || 'unknown';

  // Filter Section
  var html = '<div class="Filter">';
  html += '<input type="text" id="search" class="Search" placeholder="Search Service..." oninput="filter()">';
  html += '<select id="filter" class="Group" onchange="filter()"><option value="all">All Groups</option>';
  groups.forEach(function(g) { html += '<option value="' + g + '">' + g + '</option>'; });
  html += '</select>';
  html += '<label class="Check"><input type="checkbox" id="hot" onchange="filter()"> Show Only Hot Products</label>';
  html += '</div>';

  // Content
  var content = shop.getAttribute('content');
  if (content) html += '<p>' + content + '</p>';

  // Tables
  html += '<div id="data">';
  groups.forEach(function(g) {
    html += '<table class="Table" data-group="' + g + '">';
    html += '<thead><tr>';
    html += '<th class="Name">' + g + '</th>';
    html += '<th class="Delivery">DELIVERY</th>';
    html += '<th class="Price">PRICE</th>';
    html += '</tr></thead><tbody>';

    services[g].forEach(function(s) {
      html += '<tr class="Row">';
      html += '<td class="Name">' + s.Name + '<span class="Sub">' + s.Delivery + '</span></td>';
      html += '<td class="Delivery">' + s.Delivery + '</td>';
      html += '<td class="Price"><span class="Currency">Rs</span> ' + s.Price + '</td>';
      html += '</tr>';
    });
    html += '</tbody></table>';
  });
  html += '</div>';

  shop.innerHTML = html;

  // Attach Events
  groups.forEach(function(g) {
    var tbody = shop.querySelectorAll('tbody')[groups.indexOf(g)];
    var rows = tbody.getElementsByClassName('Row');
    for (var i = 0; i < rows.length; i++) {
      var s = services[g][i];
      rows[i].setAttribute('data-hot', s.Hot ? '1' : '0');
      rows[i].onclick = function() {
        localStorage.setItem('service', this.querySelector('.Name').innerText);
        localStorage.setItem('delivery', this.querySelector('.Delivery').innerText);
        localStorage.setItem('price', this.querySelector('.Price').innerText);
        localStorage.setItem('type', type);
        window.location.href = '/p/checkout.html';
      };
    }
  });
})();

// Filter
function filter() {
  var s = document.getElementById('search').value.toLowerCase();
  var g = document.getElementById('filter').value;
  var hot = document.getElementById('hot').checked;
  var tables = document.getElementById('data').getElementsByTagName('table');

  for (var i = 0; i < tables.length; i++) {
    var group = tables[i].getAttribute('data-group');
    var rows = tables[i].getElementsByClassName('Row');
    var visible = false;

    for (var j = 0; j < rows.length; j++) {
      var match = rows[j].innerText.toLowerCase().indexOf(s) > -1;
      var groupOk = g === 'all' || g === group;
      var hotOk = !hot || rows[j].getAttribute('data-hot') === '1';

      if (match && groupOk && hotOk) {
        rows[j].style.display = '';
        visible = true;
      } else {
        rows[j].style.display = 'none';
      }
    }
    tables[i].style.display = visible ? '' : 'none';
  }
}