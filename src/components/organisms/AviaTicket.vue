<template>
  <article class="ticket">
    <div class="ticket_body">
      <FlightInfo :flight="flight" :airline="airline"></FlightInfo>
      <div class="ticket_body-footer">
        <a class="ticket_body-footer__link" href="vk.com">Детали перелета</a>
        <a class="ticket_body-footer__link" href="vk.com">Условия тарифа</a>
        <span class="ticket_body-footer__refund"><img :src="refundable.icon"/> {{ refundable.text }}</span>
      </div>
    </div>
    <div class="ticket_footer">
      <p class="ticket_footer-price">{{ flight.price }}</p>
      <ButtonCMP class="ticket_footer-select" text="Выбрать"></ButtonCMP>
      <p class="ticket_footer-caption">Цена за всех пассажиров</p>
      <div class="ticket_footer-baggage">
        <span class="ticket_footer-baggage__not">{{ baggage }}</span>
        <ButtonCMP class="ticket_footer-baggage__add" type="chip" color="cyan" text="Добавить багаж"></ButtonCMP>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ButtonCMP from '../atoms/ButtonCMP.vue';
import FlightInfo from '../molecules/FlightInfo.vue';
import type { TFlight } from "@/DTO/flight"

interface IProps {
  airlines: {
    [key: string]: string
  }
  flight: TFlight
}

type TRefundable = {
  text: string
  icon: string
}

const props = defineProps<IProps>()

const baggage = computed((): string => {
  return Object.values(props.flight.services)[0].value
})

const refundable = computed((): TRefundable => {
  return props.flight.refundable === true ? {
    text: "возвратный",
    icon: "src/assets/icons/refundable.svg"
  } : {
    text: "невозвратный",
    icon: "src/assets/icons/non-refundable.svg"
  }
})

const airline = computed((): string => {
  let carrier = props.flight.itineraries[0][0].carrier
  return props.airlines[carrier as keyof typeof props.airlines]
})
</script>

<style lang="scss" scoped>
.ticket {
  display: flex;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  margin-bottom: 12px;
  &_body {
    width: 50vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    padding: 40px 40px 20px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    &-footer {
      display: flex;
      justify-content: flex-start;
      gap: 20px;
      &__link {
        color: #7284E4;
        text-decoration: none;
        border-bottom: 1px dashed;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
      }
      &__refund {
        display: flex;
        align-items: center;
        gap: 4px;
        font-family: Arial, Helvetica, sans-serif;
        color: #707276;
        font-size: 12px;
        line-height: 14px;
        margin-left: 20px;
      }
    }
  }

  &_footer {
    padding: 18px 20px;
    background-color: #F5F5F5;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 4px;
    &-price {
      font-size: 24px;
      line-height: 28px;
      text-align: center;
      margin-bottom: 13px;
      color: #202123;
      font-family: Arial, Helvetica, sans-serif;
    }
    &-select {
      width: 200px;
    }
    &-caption {
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #707276;
      margin: 8px 0 12px;
    }
    &-baggage {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
      &__not {
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #202123;
      }
    }
  }

  @media screen and (max-width: 780px) {
    flex-direction: column;
    &_body {
      width: 100%;
      flex-direction: column;
      padding: 18px;
      &-footer {
        display: none;
      }
    }
    &_footer {
      padding: 16px;
      &-caption {
        margin: 8px 0 0;
      }
      &-baggage {
        display: none;
      }
    }
  }
}
</style>