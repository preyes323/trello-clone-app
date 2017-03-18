const App = {
  setupTemplates() {
    Handlebars.partials = Handlebars.templates;
    Handlebars.registerHelper('lowerCase', function(name) {
      return name.toLowerCase();
    });
  },

  loadUserBoards() {
    $.ajax({
      url: `/boards/user/${this.user.id}`,
      method: 'GET',
      dataType: 'json',
      success(json) {
        App.boards = new Boards(json);
        App.boardsView = new BoardsView({ collection: App.boards });
        App.boardsView.renderPersonal();
      },
    });
  },

  init(user) {
    this.setupTemplates();
    this.user = new User(user);
    this.navView = new Nav({ model: this.user});
    this.navView.render();
    // this.loadUserBoards();
  },
};

// for sorting
const starred = document.getElementById('boards-starred');
const sortableStarred = new Sortable(starred, {
  group: 'boards',
  animation: 150,
  draggable: '.board',
  onSort(e) {
    $(e.to).find('li').each((idx, el) => {
      let msg = $(el).find('a')[0].text;
      msg += `; old: ${$(el).data('id')}`;
      msg += `; new: ${idx + 1}`;
      console.log(msg);
    });
  },
});

const personal = document.getElementById('boards-personal');
const sortablePersonal = new Sortable(personal, {
  group: 'boards',
  animation: 150,
  draggable: '.board',
  onSort(e) {
    console.log('hello');
  },
});
// end for sorting
