<template>
    <div class="columns">
        <div class="column">
            <label>
                <input class="" type="checkbox" :checked="watching" @change="emitChange"/>
                <i></i>
                <span>Watching</span>
            </label>
        </div>
        <div class="column">
            <label>
                <input class="" type="checkbox" :checked="completed" @change="emitChange"/>
                <i></i>
                <span>Completed</span>
            </label>
        </div>
        <div class="column">
            <label>
                <input class="" type="checkbox" :checked="dropped" @change="emitChange"/>
                <i></i>
                <span>Dropped</span>
            </label>
        </div>
        <div class="column">
            <label>
                <input class="" type="checkbox" :checked="hold" @change="emitChange"/>
                <i></i>
                <span>On Hold</span>
            </label>
        </div>
        <div class="column">
            <label>
                <input class="" type="checkbox" :checked="ptw" @change="emitChange"/>
                <i></i>
                <span>Plan To Watch</span>
            </label>
        </div>
    </div>
</template>

<script>
export default {
	data () {
		return {
			watching: false,
			completed: true,
			dropped: false,
			hold: false,
			ptw: false,
		};
	},
	methods: {
		emitChange () {
			this.$emit('change', {
				status: {
					watching: this.watching,
					completed: this.completed,
					dropped: this.dropped,
					hold: this.hold,
					ptw: this.ptw,
				},
			});
		},
	},
};
</script>

<style lang="scss">
label {
  > input {
    display: none;
  }

  span {
    color: #6A759B;
  }

  i {
    display: inline-block;
    width: 40px;
    height: 20px;
    border-radius: 20px;
    vertical-align: middle;
    transition: .25s .09s;
    position: relative;
    margin-right: 3px;
    background: #deeff7;
    &:after {
      content: " ";
      display: block;
      width: 15px;
      height: 15px;
      top: 2px;
      left: 2px;
      border-radius: 50%;
      background: #fff;
      position: absolute;
      box-shadow: 1px 2px 4px 0 rgba(#000, .4);
      transition: .15s;
    }
  }

  // Checked-state
  > input:checked + i {
    background: #1094fb;
  }

  > input:checked + i + span {
  color: #29316b;
  }

  > input:checked + i:after {
    transform: translateX(20px);
  }
}
</style>
