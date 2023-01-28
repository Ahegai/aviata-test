<template>
  <div class="flight">
    <div class="flight_company">
      <p class="flight_company-info">
        <img class="flight_company-info__image" :src="`https://aviata.kz/static/airline-logos/80x80/${flight.itineraries[0][0].carrier}.png`"/>
        <span class="flight_company-info__text">{{ airline }}</span>
      </p>
      <span class="flight_company-baggage">{{ baggage }}</span>
    </div>
    <div class="flight_info">
      <div class="flight_date">
        <p class="flight_date-day">{{ dep_date.date }}</p>
        <p class="flight_date-time">{{  dep_date.time }}</p>
      </div>
      <div class="flight_timeline">
        <div class="flight_timeline-divider">
          <span class="flight_timeline-divider__text">{{ flight.itineraries[0][0].segments[0].origin_code }}</span>
          <span class="flight_timeline-divider__text">{{ travel_time }}</span>
          <span class="flight_timeline-divider__text">{{ flight.itineraries[0][0].segments[0].dest_code }}</span>
          <span v-if="flight.itineraries[0][0].stops > 0" class="circle"></span>
        </div>
        <p v-if="flight.itineraries[0][0].segments[1]" class="flight_timeline-through">через {{ flight.itineraries[0][0].segments[1].origin }}, {{ stop_time }}</p>
      </div>
      <div class="flight_date">
        <p class="flight_date-day">{{ arr_date.date }} <span v-if="flight.itineraries[0][0].stops > 0" class="flight_date-day__stops">+{{ flight.itineraries[0][0].stops }}</span></p>
        <p class="flight_date-time">{{  arr_date.time }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TFlight } from "@/DTO/flight"
import { dateFormatter, timeFormatter, stopDifferent } from "@/plugins/dateFormatter"
import { ref, computed } from "vue"

interface IProps {
  airline: string
  flight: TFlight
}

const props = defineProps<IProps>()

const arr_date = ref(dateFormatter(props.flight.itineraries[0][0].arr_date))
const dep_date = ref(dateFormatter(props.flight.itineraries[0][0].dep_date))
const travel_time = ref(timeFormatter(props.flight.itineraries[0][0].traveltime)) 
const stop_time = props.flight.itineraries[0][0].segments[1] 
  ? ref(stopDifferent(props.flight.itineraries[0][0].segments[1].arr_time_iso, props.flight.itineraries[0][0].segments[1].dep_time_iso)) 
  : ""

const baggage = computed((): string => {
  return Object.values(props.flight.services)[0].value
})
</script>
<style lang="scss" scoped>
.circle {
  width: 5px;
  height: 5px;
  border: 1px solid #B9B9B9;
  border-radius: 5px;
  position: absolute;
  bottom: -3px;
  background: white;
  right: 50%;
}
.flight {
  display: grid;
  grid-template-columns: 0.7fr 3fr;

  &_company {
    display: flex;
    align-items: center;
    width: 100%;
    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      &__image {
        width: 15px;
      }
      &__text {
        font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        color: #202123;
      }
    }
    &-baggage {
      display: none;
    }
  }
  &_info {
    display: flex;
    margin-left: 20px;
  }
  &_date {
    color: #202123;
    margin: 0 30px;
    &-day {
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      &__stops {
        font-weight: 600;
        font-size: 10px;
        line-height: 14px;
        color: #FF3724;
      }
    }
    &-time {
      font-weight: 600;
      font-size: 24px;
      line-height: 33px;
    }
  }
  &_timeline {
    width: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &-divider {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 45px;
      border-bottom: 1px solid #B9B9B9;
      padding-bottom: 5px;
      position: relative;
      &__text {
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        &:nth-child(1) {
          font-weight: 400;
          font-size: 10px;
          line-height: 12px;
          color: #B9B9B9;
        }
        &:nth-child(3) {
          font-weight: 400;
          font-size: 10px;
          line-height: 12px;
          color: #B9B9B9;
        }
      }
      &::before {
        content: "";
        left: 0;
        @extend .circle;
      }
      &::after {
        content: "";
        right: 0;
        @extend .circle;
      }
    }
    &-through {
      color: #FF9900;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      margin-top: 5px;
    }
  }

  @media screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    gap: 28px;
    &_company {
      display: flex;
      justify-content: space-between;
      &-baggage {
        display: inline-block;
      }
    }
    &_info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas:
        "a a a"
        "b b b";
      margin: 0;
    }
    &_date {
      margin: 0;
      &:nth-last-child(1) {
        text-align: end;
      }
    }
    &_timeline {
      grid-area: b;
      margin-top: 30px;
      width: 100%;
      &-divider {
        width: 100%;
        padding-bottom: 20px;
      }
      &-through {
        margin-top: 20px;
        margin-bottom: 10px;
      }
    }
  }

  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
