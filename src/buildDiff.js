import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }

    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }

    if (_.isEqual(data1[key], data2[key])) {
      return { key, type: 'unchanged', value: data1[key] };
    }

    return {
      key,
      type: 'updated',
      oldValue: data1[key],
      newValue: data2[key],
    };
  });
};

export default buildDiff;
