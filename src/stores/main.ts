import { defineStore } from 'pinia'
import { ref } from 'vue'
import fetchInitialData from '@/api/fetchInitialData'
import fetchPoolData from '@/api/fetchPoolData'
import fetchTickers from '@/api/fetchTickers'
import fetchExchangeRates from '@/api/fetchExchangeRates'
import fetchAPY7Days from '@/api/fetchAPY7Days'
import fetchMiningApy from '@/api/fetchMiningApy'
import fetchIconsList from '@/api/fetchIconsList'
import fetchFarmingAPY from '@/api/fetchFarmingAPY'
import type { ITickers } from '@/interfaces/tickers.interface'

export const useMainStore = defineStore('main', () => {
  const initData = ref<any>({})
  const poolsData = ref<any>([])
  const tickers = ref<ITickers>({})
  const miningApy = ref<any>({})
  const exchangeRates = ref<any>({})
  const apy7d = ref<any>({})
  const icons = ref<any>({})
  const ready = ref<boolean>(false)
  const farmingAPY = ref<any[]>([])

  async function initIfNotInit() {
    if (ready.value) return

    try {
      const exchangeRatesData = await fetchExchangeRates()
      exchangeRates.value = exchangeRatesData

      const initDataResult = await fetchInitialData()
      const { factory, a2sRegistry, descriptionRegistry, decimalsRegistry } = initDataResult

      const [
        poolsDataResult,
        tickersResult,
        apy7dResult,
        iconsResult,
        miningApyResult,
        farmingAPYResult
      ] = await Promise.all([
        fetchPoolData(
            factory,
            a2sRegistry,
            descriptionRegistry,
            decimalsRegistry,
            exchangeRatesData
        ),
        fetchTickers(),
        fetchAPY7Days(),
        fetchIconsList(),
        fetchMiningApy(),
        fetchFarmingAPY()
      ])

      initData.value = initDataResult
      poolsData.value = poolsDataResult
      tickers.value = tickersResult
      miningApy.value = miningApyResult
      apy7d.value = apy7dResult
      icons.value = iconsResult
      farmingAPY.value = farmingAPYResult
      ready.value = true
    } catch (error) {
      console.error('Error initializing store:', error)
      throw error
    }
  }

  return {
    initData,
    poolsData,
    tickers,
    miningApy,
    exchangeRates,
    apy7d,
    icons,
    ready,
    farmingAPY,

    initIfNotInit,
  }
})
