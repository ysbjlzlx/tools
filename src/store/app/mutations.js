export default {
  expand(state) {
    state.nav.expand = true;
  },
  shrink(state) {
    state.nav.expand = false;
  },
  switch(state) {
    state.nav.expand = !state.nav.expand;
    console.log(state.nav.expand);
  },
};
