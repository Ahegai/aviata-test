<template>
  <article class="filter">
    <div class="filter_header">
      <h3 class="filter_header-heading">Опции тарифа</h3>
      <ButtonCMP id="clear" type="icon" color="cyan" @click="emit('clear')">
        <CloseIcon></CloseIcon>
      </ButtonCMP>
    </div>
    <div class="filter_body">
      <CheckBox 
        v-for="(checkbox, i) in filters" 
        :key="checkbox.id"
        :text="checkbox.text" 
        :id="checkbox.id"
        :state="checkbox.state"
        @submit="emit('submit', i)"
      />
    </div>
  </article>
</template>
<script setup lang="ts">
import ButtonCMP from '../atoms/ButtonCMP.vue';
import CheckBox from '../atoms/CheckBox.vue';
import CloseIcon from '@/assets/icons/close-filter.svg?component';

type TFilter = {
  id: number
  text: string
  state: boolean
}

interface IProps {
  filters: Array<TFilter>
}

const props = defineProps<IProps>()

const emit = defineEmits(["submit", "clear"])
</script>
<style lang="scss" scoped>
.filter {
  background: #F5F5F5;
  border-radius: 4px;
  padding: 12px;
  width: 240px;
  margin-bottom: 12px;
  &_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
    &-heading {
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
      color: #202123;
    }
  }
  @media screen and (max-width: 780px) {
    width: 100%;
    &_header {
      padding-bottom: 12px;
    }
    &_body {
      max-height: 320px;
      overflow-y: auto;
    }
  }
}
#clear {
  transition: 0.3s ease-in;
  & svg {
    fill: #B9B9B9;
  }
  &:hover {
    & svg {
      fill: #7284E4;
    }
  }
}
</style>