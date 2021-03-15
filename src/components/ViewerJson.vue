<template>
<div class="text-formated-container">
  <div class="collapse-container">
    <el-button class="collapse-btn" type="text" @click="toggleCollapse">{{ $t('message.' + collapseText) }}</el-button>
  </div>
  <JsonViewer
    v-if='show'
    v-model="newContent"
    :showBtns="!1"
    @json-change="updateContent"
    >
  </JsonViewer>
</div>
</template>

<script type="text/javascript">
import JsonViewer from 'vue-json-editor'

export default {
  data() {
    return {
      show: true,
      previousDeep: 3,
      collapseText: 'collapse_all'
    };
  },
  components: {JsonViewer},
  props: ['content'],
  computed: {
    newContent() {
      try {
        // change bigint to string
        let JSONbig = require('json-bigint')({storeAsString: true});
        let jsonSolved = JSONbig.stringify(JSONbig.parse(this.content.toString()));

        return JSON.parse(jsonSolved);
      } catch (e) {
        return this.$t('message.json_format_failed');
      }
    },
  },
  methods: {
    toggleCollapse() {
      this.previousDeep = this.previousDeep ? 0 : Infinity;
      this.collapseText = this.previousDeep ? 'collapse_all' : 'expand_all';

      // reload json tree
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },

    updateContent(value) {
      let newContent, _value= JSON.stringify(value); 
      newContent = this.contentVisible ? Buffer.from(_value) : this.$util.xToBuffer(_value);
      this.$emit('updateContent', newContent);
    }
  },
}
</script>
