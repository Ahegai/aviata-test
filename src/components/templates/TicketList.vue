<template>
  <section class="list">
    <div class="list_filter">
      <Filter :filters="filterOptions" @submit="setOption" @clear="clearOption"></Filter>
      <Filter :filters="filterCarrier" @submit="setAvia" @clear="clearAvia"></Filter>
      <button class="list_filter-clear" @click="clearAll">Сбросить все фильтры</button>
    </div>
    <div class="list_ticket">
      <AviaTicket 
        v-for="flight in flights.flights" 
        :key="flight.id" :flight="flight" 
        :airlines="flights.airlines"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { flightStore } from "@/stores/flight";
import AviaTicket from '../organisms/AviaTicket.vue';
import Filter from '../organisms/Filter.vue';

const store = flightStore()

store.setState()
const flights = ref(store.getState())
const filterOptions = ref([
  { id: 1, text: "Только прямые", state: false },
  { id: 2, text: "Только с багажом", state: false },
  { id: 3, text: "Только возвратные", state: false },
])
const filterCarrier = ref(Object.values(flights.value.airlines).map((x: string, i: number) => {
  return {
    id: i + 2,
    text: x,
    state: false,
  }
}))
filterCarrier.value.unshift({ id: 1, text: "Все",state: true })
const filterList = {
  optionList: [] as Array<number>,
  aviaList: [] as Array<string>
}

const setOption = (index: number) => {
  filterOptions.value[index].state = !filterOptions.value[index].state
  filterList.optionList = filterOptions.value.filter((x) => x.state === true).map((x) => x.id)
  callFilter()
}
const setAvia = (index: number) => {
  filterCarrier.value[index].state = !filterCarrier.value[index].state
  filterList.aviaList = filterCarrier.value.filter((x) => x.state === true).map((x) => x.text.toLocaleLowerCase())
  if (index != 0) filterCarrier.value[0].state = false
  else { 
    clearAvia()
    return
  }
  callFilter()
  if (filterList.aviaList.length === 0) filterCarrier.value[0].state = true
}
const clearOption = () => {
  filterOptions.value.forEach((x) => x.state = false)
  filterList.optionList = []
  callFilter()
}
const clearAvia = () => {
  filterCarrier.value.forEach((x) => x.state = false)
  filterCarrier.value[0].state = true
  filterList.aviaList = []
  callFilter()
}
const clearAll = () => {
  clearOption()
  clearAvia()
}
const callFilter = () => {
  store.setFilteredState(filterList)
  flights.value.flights = store.getFilteredState()
  store.setState()
}
</script>
<style lang="scss" scoped>
.list {
  display: grid;
  grid-template-columns: 3fr auto;
  gap: 20px;
  &_filter {
    &-clear {
      color: #7284E4;
      outline: none;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
      border-bottom: 1px dashed #7284E4;
      padding-bottom: 3px;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
    }
  }
  @media screen and (max-width: 780px) {
    grid-template-columns: auto;
    &_filter {
      margin: 0 auto;
      width: 100%;
    }
  }
}
</style>
