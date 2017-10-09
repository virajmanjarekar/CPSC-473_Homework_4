var ds = new App.DataStore();
ds.add('m@bond.com', 'tea');
ds.add('james@bond.com', 'eshpressho');
console.log(ds);
ds.remove('james@bond.com');
console.log(ds);
ds.get('m@bond.com');
ds.get('james@bond.com');
