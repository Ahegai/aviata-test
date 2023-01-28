type TPrice = {
  currency: string,
  amount: string,
  price_raw: number,
}

type TBaggageOptions = {
  unit: string
  value: number
}

type TServices = {
  full_description: string
  alt_text: string
  code: string
  description: string
  title: string
  default: string
  solution: string
  value: string
  icon: string
}

type TSegments = {
  origin: string
  airport_dest: string
  arr_time_iso: string
  dep_terminal: string
  dep_time_iso: string
  carrier_name: string
  stop_locations: Array<object>
  dest_code: string
  airport_dest_terminal: string
  equipment: string
  flight_num: string
  stops: number
  airport_origin: string
  cabin: string
  dep_time: string
  dest: string
  origin_code: string
  baggage_options: Array<TBaggageOptions>
  arr_time: string
  plane: string
  services: TServices
  fare_basis_code: string
  airport_origin_terminal: string
  arr_terminal: string
  carrier: string
  fare_seats: number
}

type TItineraries = {
  dep_date: string
  hash: string
  dir_index: number
  price: TPrice
  layovers: Array<number>
  arr_date: string
  allowed_offers: Array<Object>
  carrier_name: string
  is_meta: boolean
  segments: Array<TSegments>
  stops: number
  carrier: string
  refundable: boolean
  traveltime: number
}

type TPriceDetails = {
  base_raw: number
  modifiers: string
  modifiers_raw: number
  taxes: string
  base: string
  taxes_raw: number
}

type TFlight = {
  itineraries: Array<Array<TItineraries>>
  price_details: TPriceDetails
  price: string
  currency: string
  bonus_usage: boolean
  services: object
  price_raw: number
  validating_carrier: string
  id: string
  has_meta: boolean
  has_offers: boolean
  best_time: number
  bonus_accrual: boolean
  bonus_accrual_details: null | number
  bonus_usage_details: null | number
  provider: string
  refundable: boolean
  provider_class: string
}

export type { TFlight }