export default {
  state: {
    expand: true,
  },
  mutations: {
    expand(state) {
      state.expand = true;
    },
    shrink(state) {
      state.expand = false;
    },
    switch(state){
      state.expand = !state.expand
      console.log(state.expand)
    }
  },
};
