const App = {
  setupTemplates() {
    Handlebars.partials = Handlebars.templates;
    Handlebars.registerHelper('lowerCase', function(name) {
      return name.toLowerCase();
    });

    this.boardSearchTemplate = Handlebars.templates.boardsSearch;
    this.profileTemplate = Handlebars.templates.profile;
    this.createNewBoardTemplate = Handlebars.templates.create;
    this.notificationsTemplate = Handlebars.templates.boardsNotification;
  },

  loadUserBoards() {
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
    $('.pop-up').remove();
    this.$main.append(this.notificationsTemplate());
  },

  bindEvents() {
    this.$main = $('main.app');
    this.$nav = $('nav.app-layout');
    this.on('showBoardSearch', this.showBoardSearch.bind(this));
    this.on('showDashboard', this.loadUserBoards.bind(this));
    this.on('showProfilePopup', this.profilePopup.bind(this));
    this.on('createNewBoard', this.boardPopup.bind(this));
    this.on('showNotifications', this.notificationsPopup.bind(this));
    this.listenTo(this.boards, 'add', this.loadUserBoards.bind(this));

    $(document).on('click', 'main.app', function(e) {
      if ($('.pop-up').is(':visible') && (e.target.nodeName === 'MAIN' || e.target.nodeName === 'UL')) {
        if ($('#boards-search').is(':visible')) {
          history.back();
        } else {
          $('.pop-up').remove();
        }
      }
    });

    $(document).on('click', 'nav', function(e) {
      if ($('.pop-up').is(':visible') && e.target.nodeName === 'NAV') {
        if ($('#boards-search').is(':visible')) {
          history.back();
        } else {
          $('.pop-up').remove();
        }
      }
    });

    this.$main.on('click', '.icon-close', function(e) {
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

  init(user) {
    _.extend(this, Backbone.Events);
    this.setupTemplates();
    this.user = new User(user);
    this.navView = new Nav({ model: this.user});
    this.navView.render();
    this.boards = new Boards;
    this.boardsView = new BoardsView({ collection: this.boards });
    this.bindEvents();
    this.router = new Router;
    this.setupRouter();
  },
};

// // for sorting
// const starred = document.getElementById('boards-starred');
// const sortableStarred = new Sortable(starred, {
//   group: 'boards',
//   animation: 150,
//   draggable: '.board',
//   onSort(e) {
//     $(e.to).find('li').each((idx, el) => {
//       let msg = $(el).find('a')[0].text;
//       msg += `; old: ${$(el).data('id')}`;
//       msg += `; new: ${idx + 1}`;
//       console.log(msg);
//     });
//   },
// });

// const personal = document.getElementById('boards-personal');
// const sortablePersonal = new Sortable(personal, {
//   group: 'boards',
//   animation: 150,
//   draggable: '.board',
//   onSort(e) {
//     console.log('hello');
//   },
// });
// // end for sorting
