import Ember from 'ember';
import { stringStartsWith } from './../../util';

const { get } = Ember;

export default {
  serialize(model) {
    return model && get(model, 'value');
  },

  deserialize(label, list) {
    if (list) {
      return list.findBy('value', label);
    } else {
      return label;
    }
  },

  validate(string, list) {
    if (list) {
      return list.any(function(item) {
        return this.serialize(item) === string;
      }, this);
    } else {
      return string;
    }
  },

  getHints(string, list) {
    if (list && list.length) {

      return list.filter((item) => {
        if (item.label !== undefined) {
          return stringStartsWith(item.label, string) || stringStartsWith(item.value, string);
        }
      }).uniq().sortBy('value.length');

    }
    return [];
  }
};
