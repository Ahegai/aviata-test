<template>
  <button v-if="type != 'icon'" :class="['button', type, color]" @click="emit('click')">
    {{ text }}
  </button>
  <button v-else class="button icon" @click="emit('click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
type TTypes = "primary" | "chip" | "icon"
type TColor = "green" | "cyan"

interface IProps {
  text?: string
  type?: TTypes
  color?: TColor
};

const props = withDefaults(defineProps<IProps>(), {
  text: "",
  type: "primary",
  color: "green",
});

const emit = defineEmits(["click"]);
</script>

<style lang="scss" scoped>
.button {
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
}

.primary {
  padding: 8px 70px;
  font-size: 18px;
  line-height: 25px;
  font-weight: 700;
  display: flex;
  justify-content: center;
}

.chip {
  border-radius: 2px;
  padding: 3px 8px;
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  &::before {
    content: "+ "
  }
}

.cyan {
  background-color: #EAF0FA;
  color: #5763B3;

}

.green {
  background-color: #55BB06;
  border-radius: 4px;
  color: white;
  transition: 0.2s ease-in;
  &:hover {
    background-color: rgba(64,166,27,1);
  }
}
</style>
