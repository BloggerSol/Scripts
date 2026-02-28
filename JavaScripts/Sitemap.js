<script>
var labelNames = {
  'Android': 'Android Tools',
  'Dongles': 'Box/Dongles',
  'Flash': 'Flash Tools',
  'FRP': 'FRP Tools',
  'Hardware': 'Hardware Tools',
  'iCloud': 'iCloud Tools'
  'Drivers': 'USB Drivers'
};

function bloggersitemap(data) {
  var entries = data.feed.entry || [];
  var posts = [];

  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var title = entry.title.$t;
    var url = '';

    for (var j = 0; j < entry.link.length; j++) {
      if (entry.link[j].rel === 'alternate') {
        url = entry.link[j].href;
        break;
      }
    }

    if (entry.category) {
      for (var k = 0; k < entry.category.length; k++) {
        var label = entry.category[k].term.split(';')[0];
        posts.push({ title: title, url: url, label: label });
      }
    }
  }

  posts.sort(function(a, b) {
    if (a.label !== b.label) return a.label.localeCompare(b.label);
    return a.title.localeCompare(b.title);
  });

  var html = '';
  var currentLabel = '';

  for (var i = 0; i < posts.length; i++) {
    if (posts[i].label !== currentLabel) {
      if (currentLabel) html += '</div></div>';
      currentLabel = posts[i].label;
      var heading = labelNames[currentLabel] || currentLabel;
      html += '<div class="section"><h2>' + heading + '</h2><div class="grid">';
    }
    html += '<p><a href="' + posts[i].url + '">' + posts[i].title + '</a></p>';
  }

  if (currentLabel) html += '</div></div>';

  document.getElementById('sitemap').innerHTML = html;
}
</script>
<script src="https://www.techmicky.com/feeds/posts/summary?alt=json-in-script&max-results=9999&callback=bloggersitemap"></script>
