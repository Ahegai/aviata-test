import { defineStore } from 'pinia'
import results from "@/assets/results.json"
import type { TFlight } from "@/DTO/flight"

interface IState {
  airlines: {
    [key: string]: string
  }
  flights: Array<TFlight>
  filtered: Array<TFlight>
}
interface IData {
  airlines: {
    [key: string]: string
  }
  flights: Array<TFlight>
}
type TListFilter = {
  optionList: Array<number>
  aviaList: Array<string>
}

export const flightStore = defineStore('flights', {
  state: (): IState => {
    return {
      airlines: {},
      flights: [],
      filtered: [],
    }
  },
  actions: {
    getState(): IData {
      return {
        airlines: this.airlines, 
        flights: this.flights
      }
    },
    getFilteredState(): Array<TFlight> {
      return this.filtered
    },
    setState() {
      this.flights = results.flights
      this.airlines = results.airlines
      this.filtered = results.flights
    },
    setThroughFilter() {
      return this.filtered.filter((x) => x.itineraries[0][0].stops === 0 ? 1 : 0)
    },
    setBaggageFilter() {
      return this.filtered.filter((x) => Object.values(x.services)[0].value !== "0 PC" ? 1 : 0)
    },
    setRefundableFilter() {
      return this.filtered.filter((x) => x.refundable === true ? 1 : 0)
    },
    setAviaFilter(list: Array<string>) {
      return this.flights.filter((x: TFlight) => list.includes(x.itineraries[0][0].carrier_name.toLocaleLowerCase()))
    },
    setFilteredState(list: TListFilter) {
      if (list.aviaList.length > 0) {
        this.filtered = this.setAviaFilter(list.aviaList)
      }
      if (list.optionList.includes(1)) {
        this.filtered = this.setThroughFilter()
      }
      if (list.optionList.includes(2)) {
        this.filtered = this.setBaggageFilter()
      }
      if (list.optionList.includes(3)) {
        this.filtered = this.setRefundableFilter()
      }
      // this.filtered = this.setAviaFilter(list.aviaList)
    },
  }
})