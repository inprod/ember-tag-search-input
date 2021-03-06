import Ember from 'ember';
import layout from './template';

const { get, observer, on, run, computed } = Ember;

export default Ember.Component.extend({
  classNames: ['hint-menu-container'],
  layout: layout,

  cursor: -1,

  initComponent: on('didInsertElement', function() {
    run.schedule('afterRender', this, function() {
      let el = this.$('.datetimepicker-container')
        .datetimepicker({
          inline: true,
          sideBySide: true,
          useCurrent: false,
          date: get(this, 'token.model')
        })
        .on('dp.change', run.bind(this, 'onDateChange'));
        this._picker = el.data("DateTimePicker");
    });
  }),

  setPickerDate: observer('token.model', function() {
    run.schedule('afterRender', this, function() {
      if (this._picker) {
        this._picker.date(get(this, 'token.model'));
      }
    });
  }),

  cursorLocationType: computed('cursor', 'token.length', function() {
    let cursor = get(this, 'cursor');
    let keyLength = get(this, 'token.modifier.length');
    if (cursor > keyLength) {
      if (cursor < (keyLength + 5)) {
        return 'year';
      } else if (cursor < (keyLength + 8)) {
        return 'month';
      } else if (cursor < (keyLength + 11)) {
        return 'day';
      } else if (cursor < (keyLength + 14)) {
        return 'hour';
      } else if (cursor < (keyLength + 17)) {
        return 'minute';
      }
    }
  }),

  goUp: observer('upClicked', function() {
    let date = get(this, 'token.model');
    let cursorLocationType = get(this, 'cursorLocationType');
    if (date && cursorLocationType) {
      date.add(1, cursorLocationType);
      run.next(this, function() {
        this.attrs.changeTokenModel(get(this, 'token'), date);
        this.propertyDidChange('token.model');
      });
    }
  }),

  goDown: observer('downClicked', function() {
    let date = get(this, 'token.model');
    let cursorLocationType = get(this, 'cursorLocationType');
    if (date && cursorLocationType) {
      date.subtract(1, cursorLocationType);
      run.next(this, function() {
        this.attrs.changeTokenModel(get(this, 'token'), date);
        this.propertyDidChange('token.model');
      });
    }
  }),

  onDateChange({date}) {
    let tokenDate = get(this, 'token.model');
    if (date && !date.isSame(tokenDate)) {
      let isTimeChanged = !tokenDate ?
        false : (date.hours() !== tokenDate.hours()) || (date.minutes() !== tokenDate.minutes());
      this.attrs.changeTokenModel(get(this, 'token'), date, !isTimeChanged);
    }
  },

  tearDown: on('willDestroyElement', function() {
    this._picker.destroy();
  })

});
