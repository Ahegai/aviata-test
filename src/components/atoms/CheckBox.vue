<template>
  <div class="checkbox">
    <input class="checkbox_input" :checked="state" type="checkbox" @input="emit('submit')"/>
    <label class="checkbox_label">{{ text }}</label>
  </div>
</template>
<script setup lang="ts">
interface IProps {
  id: number
  text: string
  state: boolean
}

const props = defineProps<IProps>()

const emit = defineEmits(["submit"])
</script>
<style lang="scss" scoped>
.checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  &_input {
    border-radius: 4px;
    outline: none;
    border: 1px solid #B9B9B9;
    accent-color: #589f58;
  }
  &_label {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #202123;
    margin-left: 12px;
  }
}
</style>
