export function filter (collection, searchVal, field = 'name', sub = 'items') {
    const patt = RegExp('^' + searchVal , 'i');
    return collection.filter(item=>patt.test(item[field]) || (item[sub] || []).filter(i=>patt.test(i[field])).length > 0)
}

export function validateByFieldDynamic (getCollectionCallback, field) {
    return (value) => {
      const collection = getCollectionCallback()
      return !collection.find(i=>i[field] === value)
    }
}

  export function validatePresenceOf (value) {
    if(Array.isArray(value)) {
      return value.length > 0;
    } else {
      return value !== '' && value !== undefined
    }
}

export function generateQueryParams (params) {
    if(!params) return '';
    const str = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return str ? '?' + str : '';
}