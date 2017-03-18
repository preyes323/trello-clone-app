const App = {
  init(user) {
    this.user = new User(user);
    this.navView = new Nav({ model: this.user});
    this.navView.render();
  },
};

// for nav view
$('input.search-box').focusin(function() {
  $(this).addClass('focus');
});

$('input.search-box').on('focusout', _.debounce(removeFocus, 100));

function removeFocus() {
  $(this).removeClass('focus');
}
// end nav view

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
