const App = {
  setupTemplates() {
    Handlebars.partials = Handlebars.templates;
    Handlebars.registerHelper('lowerCase', function(name) {
      return name.toLowerCase();
    });

    Handlebars.registerHelper('generateNotification', function(data) {
      const timePassed = moment(data.transactionDate).fromNow();
      let markup = `<img src="${data.profilePic}">`;
      markup += `<span class="notification-${data.type}">`;
      markup += `<span class="author">${data.firstName} ${data.lastName}</span>`;
      switch (data.type) {
      case 'addList':
        markup += ` added ${data.listTitle} List to `;
        break;

      case 'addCard':
        markup += ` added ${data.cardTitle} Card to ${data.listTitle} on `;
        break;

      case 'moveCard':
        markup += ` moved ${data.cardTitle} Card`;
        markup += ` from ${data.listSource} to ${data.listDestination} on `;
        break;

      case 'deleteBoard':
        markup += ' deleted ';
        break;
      }

      if (parseInt(data.boardId, 10) === -1) {
        markup += `<a href="/">${data.boardTitle}</a>`;
      } else {
        markup += `<a href="/boards/${data.boardId}">${data.boardTitle}</a>`;
      }

      markup += '</span>';
      markup += `<span class="ago">${timePassed}</span>`;
      return new Handlebars.SafeString(markup);
    });

    this.boardSearchTemplate = Handlebars.templates.boardsSearch;
    this.profileTemplate = Handlebars.templates.profile;
    this.createNewBoardTemplate = Handlebars.templates.create;
    this.boardListsHeaderTemplate = Handlebars.templates.boardListsHeader;
  },

  loadUserBoards() {
    this.styleForDashboard();
    $.ajax({
      url: `/boards/user/${this.user.id}`,
      method: 'GET',
      dataType: 'json',
      success(json) {
        App.boards.reset(json);
        App.boardsView.renderPersonal();
      },
    });
  },

  setupBoardList(boardId) {
    this.getBoardList(boardId);
    this.styleForBoardList();
    this.renderBoardListHeader(boardId);
  },

  styleForDashboard() {
    this.$main.css({
      'margin-top': '40px',
      width: '86%',
      padding: '40px 7% 0 7%',
      'min-width': '960px',
      background: '#fff',
      color: '#4d4d4d',
    });
    this.$nav.find('.icon-add').css('display', 'inline-block');
  },

  styleForBoardList() {
    this.$main.css({
      background: '#0079BF',
      color: '#fff',
      padding: '10px',
      width: '1600px',
      'margin-top': '85px',
    });
    this.$nav.find('.icon-add').css('display', 'none');
  },

  getBoardList(boardId) {
    this.activeBoardList = boardId;
    $.ajax({
      url: `/boards/lists/${boardId}`,
      method: 'GET',
      dataType: 'json',
      success: this.setupBoardListView.bind(this),
    });
  },


  setupBoardListView(list) {
    this.lists.reset(list);
    this.lists.boardId = this.activeBoardList;
    this.lists.each((list) => {
      list.trigger('getCards');
    });
    this.listsView = new ListsView({ collection: this.lists });
    if (!this.lists.length) {
      this.listsView.renderList();
    }
  },

  showBoardSearch() {
    $('.pop-up').remove();
    this.$main.append(this.boardSearchTemplate({ boards: this.boards.toJSON() }));
  },

  profilePopup() {
    $('.pop-up').remove();
    this.$main.append(this.profileTemplate(this.user.toJSON()));
  },

  boardPopup() {
    $('.pop-up').remove();
    this.$main.append(this.createNewBoardTemplate());
  },

  notificationsPopup() {
    this.notificationsView.render();
  },

  renderBoardListHeader(boardId) {
    this.$main.html(this.boardListsHeaderTemplate({
      boardTitle: this.boards.get(boardId).get('title'),
    }));
  },

  addNewListNotification(list) {
    const notification = {
      notificationData: {
        profilePic: this.user.get('profilePic'),
        type: 'addList',
        listTitle: list.get('title'),
        boardId: list.get('boardId'),
        boardTitle: this.boards.get(list.get('boardId')).get('title'),
        firstName: this.user.get('firstName'),
        lastName: this.user.get('lastName'),
        dateVal: Date.now(),
        transactionDate: new Date(Date.now()),
      },
    };

    $.ajax({
      url: '/notifications',
      method: 'POST',
      data: notification,
      dataType: 'json',
      success: this.addNotification.bind(this),
    });
  },

  addNewCardNotification(card) {
    const listId = card.listId;
    const listTitle = this.lists.get(listId).get('title');
    const boardId = card.boardId;
    const boardTitle = this.boards.get(boardId).get('title');

    const notification = {
      notificationData: {
        profilePic: this.user.get('profilePic'),
        type: 'addCard',
        cardTitle: card.title,
        firstName: this.user.get('firstName'),
        lastName: this.user.get('lastName'),
        dateVal: Date.now(),
        transactionDate: new Date(Date.now()),
        listTitle,
        boardId,
        boardTitle,
      },
    };

    $.ajax({
      url: '/notifications',
      method: 'POST',
      data: notification,
      dataType: 'json',
      success: this.addNotification.bind(this),
    });
  },

  addMoveCardNotification(move) {
    const listSource = move.source;
    const listDestination = move.destination;
    const boardId = move.boardId;
    const boardTitle = move.boardTitle;

    const notification = {
      notificationData: {
        profilePic: this.user.get('profilePic'),
        type: 'moveCard',
        cardTitle: move.title,
        firstName: this.user.get('firstName'),
        lastName: this.user.get('lastName'),
        dateVal: Date.now(),
        transactionDate: new Date(Date.now()),
        listSource,
        listDestination,
        boardId,
        boardTitle,
      },
    };

    $.ajax({
      url: '/notifications',
      method: 'POST',
      data: notification,
      dataType: 'json',
      success: this.addNotification.bind(this),
    });
  },

  addDeleteBoardNotification(board) {
    const boardTitle = board.get('title');
    const boardId = '-1';

    debugger;
    const notification = {
      notificationData: {
        profilePic: this.user.get('profilePic'),
        type: 'deleteBoard',
        firstName: this.user.get('firstName'),
        lastName: this.user.get('lastName'),
        dateVal: Date.now(),
        transactionDate: new Date(Date.now()),
        boardTitle,
        boardId,
      },
    };

    $.ajax({
      url: '/notifications',
      method: 'POST',
      data: notification,
      dataType: 'json',
      success: this.addNotification.bind(this),
    });
  },

  addNotification(notification) {
    this.notifications.add(notification);
  },

  bindEvents() {
    this.$main = $('main.app');
    this.$nav = $('nav.app-layout');
    this.on('showBoardSearch', this.showBoardSearch.bind(this));
    this.on('showDashboard', this.loadUserBoards.bind(this));
    this.on('showProfilePopup', this.profilePopup.bind(this));
    this.on('createNewBoard', this.boardPopup.bind(this));
    this.on('showNotifications', this.notificationsPopup.bind(this));
    this.on('showBoardList', this.setupBoardList.bind(this));
    this.on('addNewCard', this.addNewCardNotification.bind(this));
    this.on('cardMoved', this.addMoveCardNotification.bind(this));
    this.on('boardDeleted', this.addDeleteBoardNotification.bind(this));
    this.listenTo(this.boards, 'add', this.loadUserBoards.bind(this));
    this.listenTo(this.lists, 'add', this.addNewListNotification.bind(this));

    $(document).on('click', 'main.app', function(e) {
      if ($('.pop-up').is(':visible') && (e.target.nodeName === 'MAIN' || e.target.nodeName === 'UL')) {
        $('.pop-up').remove();
      }
    });

    $(document).on('click', 'nav', function(e) {
      if ($('.pop-up').is(':visible') && e.target.nodeName === 'NAV') {
        $('.pop-up').remove();
      }
    });

    this.$main.on('click', '.pop-up .icon-close', function(e) {
      $(e.target).closest('div').remove();
    });
  },

  removePopup() {
    $('.pop-up').remove();
  },

  setupRouter() {
    Backbone.history.start({
      pushState: true,
    });

    $(document).on('click', 'a[href^="/"]', function(e) {
      if (!(e.target.href && e.target.href.match('logout'))) {
        e.preventDefault();
        e.stopPropagation();
        App.router.navigate($(e.currentTarget).attr('href').replace(/^\//, ''), { trigger: true });
      }
    });
  },

  loadNotifications() {
    this.notifications = new Notifications;
    this.notificationsView = new NotificationsView({ collection: this.notifications });
    $.ajax({
      url: '/notifications',
      method: 'GET',
      dataType: 'json',
      success(json) {
        App.notifications.reset(json);
      },
    });
  },

  init(user) {
    _.extend(this, Backbone.Events);
    this.setupTemplates();
    this.user = new User(user);
    this.navView = new Nav({ model: this.user});
    this.navView.render();
    this.boards = new Boards;
    this.lists = new Lists;
    this.boardsView = new BoardsView({ collection: this.boards });
    this.loadNotifications();
    this.bindEvents();
    this.router = new Router;
    this.setupRouter();
  },
};
