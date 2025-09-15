<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMainStore } from '@/stores/main';
import { ICON_CDN_URL } from "../config";
import plug from "@/assets/plug.svg";

interface Props {
  symbol: string;
  size: string;
}

const props = defineProps<Props>();
const store = useMainStore();

const formattedSymbol = ref('');
const srcLink = ref('');

const sizeClasses: Record<string, string> = {
  small: 'icon-small',
  medium: 'icon-medium'
};

const setAltImg = (e: Event) => {
  const target = e.target as HTMLImageElement;
  if (target.src !== plug) { 
    target.src = plug;
  }
};

onMounted(() => {
  const icons = store.icons;
  const cryptoIconsLink = 'https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.17.2/svg/color';
  
  formattedSymbol.value = props.symbol.replace(/[0-9]/g, '');
  
  if(icons.includes(props.symbol.toUpperCase())) {
   srcLink.value = `${ICON_CDN_URL}/${props.symbol.toUpperCase()}-INV.svg`;
   return;
  }
  
  srcLink.value = `${cryptoIconsLink}/${formattedSymbol.value.toLowerCase()}.svg`;
});
</script>

<template>
    <img :src="srcLink"
         :key="formattedSymbol"
         :alt="formattedSymbol"
         :class="sizeClasses[size]"
         @error="setAltImg"
    />
</template>

<style scoped>
.icon-small {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-bottom: 4px;
  margin-right: 4px;
}
.icon-medium {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-bottom: 12px;
  margin-right: 8px;
}
.icon svg {
  height: auto;
  width: auto;
  display: inline-block;
}

.icon svg g .white{
  fill: #fff !important;
  stroke: #fff !important;
}
</style>