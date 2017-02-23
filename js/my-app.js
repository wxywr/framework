// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// 加载flag
var loading = false;
 
// 上次加载的序号
var lastIndex = $$('.list-block li').length;
 
// 最多可加载的条目
var maxItems = 60;
 
// 每次加载添加多少条目
var itemsPerLoad = 20;
 
// 注册'infinite'事件处理函数
$$('.infinite-scroll').on('infinite', function () {
 
  // 如果正在加载，则退出
  if (loading) return;
 
  // 设置flag
  loading = true;
 
  // 模拟1s的加载过程
  setTimeout(function () {
    // 重置加载flag
    loading = false;
 
    if (lastIndex >= maxItems) {
      // 加载完毕，则注销无限加载事件，以防不必要的加载
      myApp.detachInfiniteScroll($$('.infinite-scroll'));
      // 删除加载提示符
      $$('.infinite-scroll-preloader').remove();
      return;
    }
 
    // 生成新条目的HTML
    var html = '';
    for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
      html += '<li class="item-content"><div class="item-inner"><div class="item-title">Item ' + i + '</div></div></li>';
    }
 
    // 添加新条目
    $$('.list-block ul').append(html);
 
    // 更新最后加载的序号
    lastIndex = $$('.list-block li').length;
  }, 1000);
}); 

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();    
    });
});

// 会话flag
var conversationStarted = false;
 
// Init Messages
var myMessages = myApp.messages('.messages', {
  autoLayout:true
});
 
// Init Messagebar
var myMessagebar = myApp.messagebar('.messagebar');
 
// Handle message
$$('.messagebar .link').on('click', function () {
  // Message text
  var messageText = myMessagebar.value().trim();
  // Exit if empy message
  if (messageText.length === 0) return;
 
  // Empty messagebar
  myMessagebar.clear()
 
  // 随机消息类型
  var messageType = (['sent', 'received'])[Math.round(Math.random())];
 
  // 接收的消息的头像和名称
  var avatar, name;
  if(messageType === 'received') {
    avatar = 'http://lorempixel.com/output/people-q-c-100-100-9.jpg';
    name = 'Kate';
  }
  // Add message
  myMessages.addMessage({
    // Message text
    text: messageText,
    // 随机消息类型
    type: messageType,
    // 头像和名称
    avatar: avatar,
    name: name,
    // 日期
    day: !conversationStarted ? 'Today' : false,
    time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  })
 
  // 更新会话flag
  conversationStarted = true;
});    

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}