
function genId(context, events, done) {
  context.vars['id'] = Math.random() * (10000001 - 1) + 1; // set the "query" variable for the virtual user
  context.vars['helpful'] = Math.random() * (800 - 1) + 1;
  return done();
}

module.exports = { genId };
