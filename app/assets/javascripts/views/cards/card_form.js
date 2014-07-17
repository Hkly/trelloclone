TrelloClone.Views.CardForm = Backbone.View.extend({
  formTemplate: JST['cards/form'],
  linkTemplate: JST['cards/form_link'],

  initialize: function () {
    this.formShowing = false;
  },

  events: {
    'click a': 'showForm',
    'submit' : 'createCard',
    'click .close': 'hideForm',
    'keydown textarea': 'maybeCreateCard'
  },

  createCard: function (event) {
    event.preventDefault();
    this.collection.create({
      title: this.$('textarea').val(),
      list_id: this.collection.list.id
    }, { wait: true });
    this.$('textarea').val('');
    this.$('textarea').focus();
  },

  hideForm: function () {
    this.formShowing = false;
    this.render();
  },

  maybeCreateCard: function (event) {
    if(event.keyCode === 13) {
      this.createCard(event);
    }
  },

  render: function () {
    var content;
    if(this.formShowing) {
      content = this.formTemplate();
    } else {
      content = this.linkTemplate();
    }

    this.$el.html(content);
    this.delegateEvents();
    return this;
  },

  showForm: function (event) {
    event.preventDefault();
    this.formShowing = true;
    this.render();
  }
});
