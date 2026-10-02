<template>
  <el-drawer
    v-model="visible"
    :title="$t('GameDetailDrawer.Title')"
    size="90%"
    destroy-on-close
    :before-close="handleClose"
  >
    <div class="game-detail-container">
      <!-- 页面标题和基本信息 -->
      <el-card class="header-card" shadow="never">
        <template #header>
          <div class="card-header">
            <!-- 原: 牌局详情 -->
            <span class="title">{{ $t('GameDetailDrawer.Title') }}</span>
            <el-tag type="primary">{{ gameData.PaiJuId }}</el-tag>
          </div>
        </template>

        <el-descriptions :column="3" border>
          <!-- 原: 牌局编号 -->
          <el-descriptions-item :label="$t('GameDetailDrawer.PaiJuNumber')">
            {{ gameData.TableId }}
          </el-descriptions-item>
          <!-- 原: 游戏时间 -->
          <el-descriptions-item :label="$t('GameDetailDrawer.GameTime')">
            {{ formatDate(gameData.CreateTime) }}
          </el-descriptions-item>
          <!-- 原: 牌桌名称 -->
          <el-descriptions-item :label="$t('GameDetailDrawer.TableName')">
            {{ decodeBase64(gameData.TableName) }}
          </el-descriptions-item>
          <!-- 原: 小盲/大盲 -->
          <el-descriptions-item v-if="hasBlinds" :label="$t('GameDetailDrawer.SmallBigBlind')">
            {{ jsonData.nSmallBlind }}/{{ jsonData.nBigBlind }}
          </el-descriptions-item>
          <!-- 原: 前注/庄家 -->
          <el-descriptions-item v-if="hasAnte" :label="$t('GameDetailDrawer.AnteBanker')">
            {{ anteInfo.normalAnte }}/{{ anteInfo.bankerAnte }}
          </el-descriptions-item>
          <!-- 原: 下注总额 -->
          <el-descriptions-item :label="$t('GameDetailDrawer.TotalBet')">
            <el-tag type="success">{{ totalPool }}</el-tag>
          </el-descriptions-item>
          <!-- 原: 参与人数 -->
          <el-descriptions-item :label="$t('GameDetailDrawer.Participants')"> {{ jsonData.arrUserPartIn?.length || 0 }}{{ $t('GameDetailDrawer.People') }} </el-descriptions-item>
        </el-descriptions>
      </el-card>

      <!-- 公共牌展示 -->
      <el-card class="community-cards-card" shadow="never">
        <template #header>
          <!-- 原: 公共牌（翻牌、转牌、河牌） -->
          <span class="card-header-title">{{ $t('GameDetailDrawer.CommunityCardsTitle') }}</span>
        </template>
        <div class="community-cards-container">
          <div v-if="communityCards.length === 0" class="empty-cards">{{ $t('GameDetailDrawer.NoCommunityCards') }}</div>
          <div v-else class="cards-wrapper">
            <div
              v-for="(card, index) in communityCards"
              :key="index"
              class="poker-card"
              :class="{ highlighted: isCardInWinningHand(card) }"
            >
              <div class="card-content">
                <span class="card-point" :class="getCardColorClass(card)">
                  {{ getCardPoint(card) }}
                </span>
                <span class="card-suit" :class="getCardColorClass(card)">
                  {{ getCardSuit(card) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 游戏进程时间线 - 折叠面板 -->
      <el-collapse v-model="activeCollapse" class="collapse-card">
        <el-collapse-item name="timeline">
          <template #title>
            <div class="collapse-title">
              <!-- 原: 游戏进程 -->
              <span class="card-header-title">{{ $t('GameDetailDrawer.GameProgress') }}</span>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="(event, index) in gameTimeline"
              :key="index"
              :timestamp="event.stage"
              placement="top"
              :type="event.type"
              :size="event.size || 'normal'"
            >
              <el-card>
                <h4>{{ event.title }}</h4>
                <p v-html="event.description"></p>
                <!-- 公共牌展示 -->
                <div v-if="event.cards && event.cards.length" class="event-cards">
                  <div v-for="(card, idx) in event.cards" :key="idx" class="poker-card mini">
                    <div class="card-content">
                      <span class="card-point" :class="getCardColorClass(card)">
                        {{ getCardPoint(card) }}
                      </span>
                      <span class="card-suit" :class="getCardColorClass(card)">
                        {{ getCardSuit(card) }}
                      </span>
                    </div>
                  </div>
                </div>
                <!-- 玩家底牌展示 -->
                <div v-if="event.playerCards && event.playerCards.length" class="player-hole-cards">
                  <div v-for="(playerCard, idx) in event.playerCards" :key="idx" class="player-card-item">
                    <!-- 原: 位置 -->
                    <div class="player-position">{{ $t('GameDetailDrawer.Position') }} {{ playerCard.positionDisplay }}:</div>
                    <div class="event-cards">
                      <div v-for="(card, cardIdx) in playerCard.cards" :key="cardIdx" class="poker-card mini">
                        <div class="card-content">
                          <span class="card-point" :class="getCardColorClass(card)">
                            {{ getCardPoint(card) }}
                          </span>
                          <span class="card-suit" :class="getCardColorClass(card)">
                            {{ getCardSuit(card) }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-collapse-item>
      </el-collapse>

      <!-- 玩家详情表格 - 折叠面板 -->
      <el-collapse v-model="activeCollapse" class="collapse-card">
        <el-collapse-item name="players">
          <template #title>
            <div class="collapse-title">
              <!-- 原: 玩家详情 -->
              <span class="card-header-title">{{ $t('GameDetailDrawer.PlayerDetails') }}</span>
            </div>
          </template>
          <el-table :data="playersData" border stripe style="width: 100%" :row-class-name="tableRowClassName">
            <!-- 原: 位置 -->
            <el-table-column prop="position" :label="$t('GameDetailDrawer.Position')" width="80" align="center">
              <template #default="{ row }">
                <el-tag :type="row.isBanker ? 'danger' : 'info'" size="small">
                  {{ row.position }}
                </el-tag>
              </template>
            </el-table-column>

            <!-- 原: 玩家昵称 -->
            <el-table-column prop="name" :label="$t('GameDetailDrawer.Nickname')" width="180">
              <template #default="{ row }">
                <div class="player-name">
                  <el-text
                    :type="row.isBanker ? 'danger' : 'default'"
                    :style="{ fontWeight: row.isBanker ? 'bold' : 'normal' }"
                  >
                    {{ row.name }}
                  </el-text>
                  <!-- 原: 庄家 -->
                  <el-tag v-if="row.isBanker" type="danger" size="small" style="margin-left: 8px">{{ $t('GameDetailDrawer.Banker') }}</el-tag>
                </div>
              </template>
            </el-table-column>

            <!-- 原: 玩家ID -->
            <el-table-column prop="userId" :label="$t('GameDetailDrawer.PlayerID')" width="120">
              <template #default="{ row }">
                <div class="player-name">
                  <el-text
                    :type="row.isBanker ? 'danger' : 'default'"
                    :style="{ fontWeight: row.isBanker ? 'bold' : 'normal' }"
                  >
                    {{ row.userId }}
                  </el-text>
                </div>
              </template>
            </el-table-column>

            <!-- 原: 手牌 -->
            <el-table-column :label="$t('GameDetailDrawer.HoleCards')" width="180">
              <template #default="{ row }">
                <div v-if="row.showHoleCards" class="hole-cards">
                  <div
                    v-for="(card, index) in row.holeCards"
                    :key="index"
                    class="poker-card mini"
                    :class="{
                      dimmed: !row.isFold && !isCardInPlayerWinning(card, row.combinedCards),
                      fold: row.isFold
                    }"
                  >
                    <div class="card-content">
                      <span class="card-point" :class="getCardColorClass(card)">
                        {{ getCardPoint(card) }}
                      </span>
                      <span class="card-suit" :class="getCardColorClass(card)">
                        {{ getCardSuit(card) }}
                      </span>
                    </div>
                  </div>
                </div>
                <el-text v-else type="info">{{ $t('GameDetailDrawer.NotShown') }}</el-text>
              </template>
            </el-table-column>

            <!-- 原: 牌型 -->
            <el-table-column prop="cardType" :label="$t('GameDetailDrawer.CardType')" width="100">
              <template #default="{ row }">
                <el-tag v-if="!row.isFold" :type="getCardTypeTagType(row.cardType)">
                  {{ row.cardTypeName }}
                </el-tag>
                <el-tag v-else type="info">{{ $t('GameDetailDrawer.Fold') }}</el-tag>
              </template>
            </el-table-column>

            <!-- 原: 最佳组合 -->
            <el-table-column :label="$t('GameDetailDrawer.BestCombination')" min-width="250">
              <template #default="{ row }">
                <div v-if="!row.isFold && row.combinedCards?.length" class="combined-cards">
                  <div v-for="(card, index) in row.combinedCards" :key="index" class="poker-card mini highlighted">
                    <div class="card-content">
                      <span class="card-point" :class="getCardColorClass(card)">
                        {{ getCardPoint(card) }}
                      </span>
                      <span class="card-suit" :class="getCardColorClass(card)">
                        {{ getCardSuit(card) }}
                      </span>
                    </div>
                  </div>
                </div>
                <el-text v-else type="info">-</el-text>
              </template>
            </el-table-column>

            <!-- 原: 操作记录 -->
            <el-table-column :label="$t('GameDetailDrawer.OperationRecords')" min-width="200">
              <template #default="{ row }">
                <div class="operations">
                  <el-tag
                    v-for="(op, index) in row.operations"
                    :key="index"
                    :type="getOperationTagType(op.type)"
                    size="small"
                    style="margin-right: 5px; margin-bottom: 5px"
                  >
                    {{ op.textKey ? $t(op.textKey, op.textParams || {}) : op.text }}
                  </el-tag>
                </div>
              </template>
            </el-table-column>

            <!-- 原: 购买保险金额 -->
            <el-table-column
              prop="insureBuyAmount"
              :label="$t('GameDetailDrawer.InsuranceBuyAmount')"
              width="140"
              align="right"
            >
              <template #default="{ row }">
                <el-text v-if="row.insureBuyAmount" type="danger">
                  -{{ formatNumber(row.insureBuyAmount) }}
                </el-text>
                <el-text v-else type="info">-</el-text>
              </template>
            </el-table-column>

            <!-- 原: 赔付金额 -->
            <el-table-column
              prop="insurePayoutAmount"
              :label="$t('GameDetailDrawer.InsurancePayoutAmount')"
              width="140"
              align="right"
            >
              <template #default="{ row }">
                <el-text v-if="row.insurePayoutAmount" type="success">
                  +{{ formatNumber(row.insurePayoutAmount) }}
                </el-text>
                <el-text v-else type="info">-</el-text>
              </template>
            </el-table-column>

            <!-- 原: 抽水 -->
            <el-table-column prop="nChouShui" :label="$t('GameDetailDrawer.Rake')" width="120" align="right">
              <template #header>
                <span>{{ $t('GameDetailDrawer.Rake') }} <el-tag type="success">{{ typeMap[nchoushuiType] }}</el-tag></span>
              </template>
              <template #default="{ row }">
                <el-text v-if="row.nChouShui" type="warning">
                  {{ formatNumber(row.nChouShui) }}
                </el-text>
                <el-text v-else type="info">0</el-text>
              </template>
            </el-table-column>

            <!-- 原: 总盈亏 -->
            <el-table-column prop="totalProfit" :label="$t('GameDetailDrawer.Profit')" width="120" align="right">
              <template #default="{ row }">
                <el-text
                  :type="row.totalProfit > 0 ? 'danger' : row.totalProfit < 0 ? 'success' : 'info'"
                  size="large"
                  style="font-weight: bold"
                >
                  {{ row.totalProfit > 0 ? '+' : '' }}{{ formatNumber(row.totalProfit) }}
                </el-text>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-drawer>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { formatDate } from '@/utils/format'

  defineOptions({ name: 'GameDetailDrawer' })

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    detailData: {
      type: Object,
      default: () => ({})
    }
  })

  const emit = defineEmits(['update:modelValue', 'close'])

  const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })

  const currentUserId = ref(null)
  const activeCollapse = ref([])

  const gameData = computed(() => props.detailData.ClubPlayBackData || {})
  const jsonData = computed(() => {
    try {
      if (gameData.value.PlayBackData) {
        return JSON.parse(gameData.value.PlayBackData)
      }
      return {}
    } catch (error) {
      console.error('解析 PlayBackData 失败:', error)
      return {}
    }
  })

  const nchoushuiType = computed(() => props.detailData.ChouShuiType || 0)
  const typeMap = {
    0: '把抽',
    1: '局抽'
  }

  // 检查是否有大小盲事件
  const hasBlinds = computed(() => {
    const events = jsonData.value.arrEvent || []
    return events.some((event) => event[0] === -11)
  })

  // 检查是否有前注事件并提取前注信息
  const hasAnte = computed(() => {
    const events = jsonData.value.arrEvent || []
    return events.some((event) => event[0] === -13)
  })

  // 前注信息：普通前注/庄家前注
  const anteInfo = computed(() => {
    const events = jsonData.value.arrEvent || []
    let bankerPosition = null
    let bankerAnte = 0
    let normalAnte = 0
    // 先找到庄家位置
    events.forEach((event) => {
      if (event[0] === -10) {
        bankerPosition = event[1]
      }
    })
    // 再找前注事件
    events.forEach((event) => {
      if (event[0] === -13) {
        for (let i = 1; i < event.length; i++) {
          const [pos, amount] = event[i]
          if (pos === bankerPosition) {
            bankerAnte = amount
          } else {
            normalAnte = amount
          }
        }
      }
    })
    return {
      normalAnte: normalAnte || 0,
      bankerAnte: bankerAnte || 0
    }
  })

  // 底池总额
  const totalPool = computed(() => {
    const pools = jsonData.value.arrPool || []
    return pools.reduce((sum, pool) => sum + pool, 0)
  })

  // 公共牌
  const communityCards = computed(() => {
    const cards = []
    const events = jsonData.value.arrEvent || []
    events.forEach((event) => {
      if (event[0] === -9) {
        const newCards = event[1] || []
        cards.push(...newCards)
      }
    })
    return cards
  })

  const cardTypeMap = {
    1: '高牌',
    2: '一对',
    3: '两对',
    4: '三条',
    5: '顺子',
    6: '同花',
    7: '葫芦',
    8: '四条',
    9: '同花顺',
    10: '皇家同花顺'
  }

  // 玩家数据处理
  const playersData = computed(() => {
    const players = []
    const userPartIn = jsonData.value.arrUserPartIn || []
    const userSettle = jsonData.value.arrUserSettle || []
    const events = jsonData.value.arrEvent || []

    // 统计各位置玩家的保险购买与赔付总额（事件 -16）
    const insuranceStats = {}
    events.forEach((event) => {
      if (event[0] === -16) {
        for (let i = 1; i < event.length; i++) {
          const detail = event[i]
          if (!detail || detail.length < 4) continue
          const pos = detail[0]
          const buy = Number(detail[2]) || 0
          const payout = Number(detail[3]) || 0
          if (!insuranceStats[pos]) {
            insuranceStats[pos] = { buy: 0, payout: 0 }
          }
          insuranceStats[pos].buy += buy
          insuranceStats[pos].payout += payout
        }
      }
    })

    // 获取所有玩家的操作记录
    const playerOperations = {}
    events.forEach((event) => {
      const eventType = event[0]

      // 处理各种操作
      if (eventType === -11) {
        // 大小盲
        const smallBlind = event[1]
        const bigBlind = event[2]
        if (smallBlind) {
          const pos = smallBlind[0]
          if (!playerOperations[pos]) playerOperations[pos] = []
          playerOperations[pos].push({ type: 'SB', bet: smallBlind[1], text: `小盲 ${smallBlind[1]}` })
        }
        if (bigBlind) {
          const pos = bigBlind[0]
          if (!playerOperations[pos]) playerOperations[pos] = []
          playerOperations[pos].push({ type: 'BB', bet: bigBlind[1], text: `大盲 ${bigBlind[1]}` })
        }
      } else if (eventType === -6) {
        // 跟注
        const pos = event[1]
        const bet = event[2]
        if (!playerOperations[pos]) playerOperations[pos] = []
        playerOperations[pos].push({ type: 'C', bet: bet, text: `跟注 ${bet}` })
      } else if (eventType === -2) {
        // 过牌
        const pos = event[1]
        if (!playerOperations[pos]) playerOperations[pos] = []
        playerOperations[pos].push({ type: 'X', bet: 0, text: '过牌' })
      } else if (eventType === -5) {
        // 弃牌
        const pos = event[1]
        if (!playerOperations[pos]) playerOperations[pos] = []
        playerOperations[pos].push({ type: 'F', bet: 0, text: '弃牌' })
      } else if (eventType === -3) {
        // 加注
        const pos = event[1]
        const bet = event[2]
        if (!playerOperations[pos]) playerOperations[pos] = []
        playerOperations[pos].push({ type: 'R', bet: bet, text: `加注 ${bet}` })
      } else if (eventType === -1) {
        // All-in
        const pos = event[1]
        const bet = event[2]
        if (!playerOperations[pos]) playerOperations[pos] = []
        playerOperations[pos].push({ type: 'A', bet: bet, text: `All-in ${bet}` })
      }
    })

    // 构建玩家数据
    userPartIn.forEach((user) => {
      const [userId, position, , nameBase64, , account, takeIn, insurScore] = user

      // 查找该玩家的结算数据
      const settleData = userSettle.find((s) => s[0] === position)

      // 获取手牌
      let holeCards = []
      events.forEach((event) => {
        if (event[0] === -12) {
          for (let i = 1; i < event.length; i++) {
            if (event[i][0] === position) {
              holeCards = event[i][1] || []
              break
            }
          }
        }
      })

      // 判断是否弃牌
      const operations = playerOperations[position] || []
      const isFold = operations.some((op) => op.type === 'F')

      const isCurrentUser = userId === currentUserId.value
      const showHoleCards = true

      const insuranceInfo = insuranceStats[position] || { buy: 0, payout: 0 }

      const playerData = {
        userId,
        position,
        name: decodeBase64(nameBase64),
        account,
        takeIn,
        insureScore: insurScore,
        // 保险明细（从事件 -16 汇总）
        insureBuyAmount: insuranceInfo.buy,
        insurePayoutAmount: insuranceInfo.payout,
        holeCards,
        showHoleCards,
        isFold,
        operations,
        isCurrentUser,
        isBanker: false
      }

      if (settleData) {
        playerData.combinedCards = settleData[1] || [] // 最佳5张牌
        playerData.cardType = settleData[2] // 牌型
        playerData.cardTypeName = cardTypeMap[settleData[2]] || '未知'
        // 基础盈亏（不含其它项目）
        playerData.baseProfit = settleData[5] // 原始盈亏字段
        // 总盈亏（第 12 位，为本局最终盈亏）
        playerData.totalProfit = settleData.length > 11 ? settleData[11] : settleData[5]
        // profit 也指向总盈亏
        playerData.profit = playerData.totalProfit
        playerData.nChouShui = settleData[9] || 0 // 抽水
      } else {
        playerData.combinedCards = []
        playerData.cardType = 0
        playerData.cardTypeName = '-'
        playerData.baseProfit = 0
        playerData.totalProfit = 0
        playerData.profit = 0
        playerData.nChouShui = 0
      }

      players.push(playerData)
    })

    // 确定庄家位置
    events.forEach((event) => {
      if (event[0] === -10) {
        // 定庄事件
        const bankerPos = event[1]
        const banker = players.find((p) => p.position === bankerPos)
        if (banker) banker.isBanker = true
      }
    })

    // 按位置排序
    players.sort((a, b) => a.position - b.position)
    return players
  })

  // 游戏时间线
  const gameTimeline = computed(() => {
    const timeline = []
    const events = jsonData.value.arrEvent || []
    let stageIndex = 0
    const stages = ['翻前', '翻牌', '转牌', '河牌', '结算']

    // 创建位置到玩家昵称的映射
    const positionToName = {}
    const userPartIn = jsonData.value.arrUserPartIn || []
    userPartIn.forEach((user) => {
      const position = user[1] // 位置
      const nameBase64 = user[3] // Base64编码的昵称
      positionToName[position] = decodeBase64(nameBase64)
    })

    // 获取玩家显示文本：位置（昵称）
    const getPlayerDisplay = (pos) => {
      const name = positionToName[pos]
      return name ? `${pos}（${name}）` : pos
    }

    events.forEach((event) => {
      const eventType = event[0]

      if (eventType === -10) {
        // 定庄
        const pos = event[1]
        timeline.push({
          stage: '游戏开始',
          type: 'primary',
          size: 'large',
          title: '定庄',
          description: `庄家位置：<strong>${getPlayerDisplay(pos)}</strong>`
        })
      } else if (eventType === -13) {
        // 前注
        const anteDetails = []
        for (let i = 1; i < event.length; i++) {
          const [pos, amount] = event[i]
          anteDetails.push(`位置 ${getPlayerDisplay(pos)} 下注 <strong>${amount}</strong>`)
        }
        timeline.push({
          stage: stages[stageIndex],
          type: 'primary',
          title: '前注',
          description: anteDetails.join('<br>')
        })
      } else if (eventType === -14) {
        // 抓头
        const zhuaTouDetails = []
        for (let i = 1; i < event.length; i++) {
          const [pos, amount] = event[i]
          zhuaTouDetails.push(`位置 ${getPlayerDisplay(pos)} 下注 <strong>${amount}</strong>`)
        }
        timeline.push({
          stage: stages[stageIndex],
          type: 'primary',
          title: '抓头下注',
          description: zhuaTouDetails.join('<br>')
        })
      } else if (eventType === -11) {
        // 大小盲
        const sb = event[1]
        const bb = event[2]
        timeline.push({
          stage: stages[stageIndex],
          type: 'primary',
          title: '大小盲下注',
          description: `小盲位置 ${getPlayerDisplay(sb[0])} 下注 <strong>${sb[1]}</strong><br>大盲位置 ${getPlayerDisplay(bb[0])} 下注 <strong>${bb[1]}</strong>`
        })
      } else if (eventType === -12) {
        // 发底牌
        const playerCards = []
        for (let i = 1; i < event.length; i++) {
          const [pos, cards] = event[i]
          playerCards.push({
            position: pos,
            positionDisplay: getPlayerDisplay(pos),
            cards: cards
          })
        }
        timeline.push({
          stage: stages[stageIndex],
          type: 'success',
          title: '发放底牌',
          description: `为 ${playerCards.length} 位玩家发放底牌`,
          playerCards: playerCards
        })
      } else if (eventType === -9) {
        // 发公共牌
        stageIndex++
        const cards = event[1] || []
        timeline.push({
          stage: stages[stageIndex],
          type: 'warning',
          size: 'large',
          title: `${stages[stageIndex]} - 发公共牌`,
          description: `新增 ${cards.length} 张公共牌`,
          cards: cards
        })
      } else if (eventType === -6) {
        // 跟注
        const pos = event[1]
        const bet = event[2]
        const time = event[3]
        timeline.push({
          stage: stages[stageIndex],
          type: 'success',
          title: '玩家跟注',
          description: `位置 ${getPlayerDisplay(pos)} 跟注 <strong>${bet}</strong>（用时 ${time}s）`
        })
      } else if (eventType === -2) {
        // 过牌
        const pos = event[1]
        const time = event[3]
        timeline.push({
          stage: stages[stageIndex],
          type: 'info',
          title: '玩家过牌',
          description: `位置 ${getPlayerDisplay(pos)} 过牌（用时 ${time}s）`
        })
      } else if (eventType === -5) {
        // 弃牌
        const pos = event[1]
        const time = event[3]
        timeline.push({
          stage: stages[stageIndex],
          type: 'danger',
          title: '玩家弃牌',
          description: `位置 ${getPlayerDisplay(pos)} 弃牌（用时 ${time}s）`
        })
      } else if (eventType === -3) {
        // 加注
        const pos = event[1]
        const bet = event[2]
        const time = event[3]
        timeline.push({
          stage: stages[stageIndex],
          type: 'warning',
          title: '玩家加注',
          description: `位置 ${getPlayerDisplay(pos)} 加注 <strong>${bet}</strong>（用时 ${time}s）`
        })
      } else if (eventType === -1) {
        // All-in
        const pos = event[1]
        const bet = event[2]
        const time = event[3]
        timeline.push({
          stage: stages[stageIndex],
          type: 'danger',
          size: 'large',
          title: '玩家 All-in',
          description: `位置 ${getPlayerDisplay(pos)} All-in <strong>${bet}</strong>（用时 ${time}s）`
        })
      }
    })

    // 添加结算信息
    timeline.push({
      stage: '结算',
      type: 'success',
      size: 'large',
      title: '游戏结算',
      description: `底池总额：<strong>${totalPool.value}</strong><br>游戏结束`
    })

    return timeline
  })

  // Base64 解码
  const decodeBase64 = (str) => {
    try {
      return decodeURIComponent(escape(atob(str)))
    } catch (e) {
      return str
    }
  }

  // 解析牌值（16进制编码）
  const getCardPoint = (cardValue) => {
    if (!cardValue) return '?'
    const point = cardValue % 16
    const pointMap = {
      1: 'A',
      11: 'J',
      12: 'Q',
      13: 'K',
      14: 'A'
    }
    return pointMap[point] || point
  }

  // 解析花色
  const getCardSuit = (cardValue) => {
    if (!cardValue) return '?'
    const suit = Math.floor(cardValue / 16)
    const suitMap = {
      1: '♦', // 方块
      2: '♣', // 梅花
      3: '♥', // 红桃
      4: '♠' // 黑桃
    }
    return suitMap[suit] || '?'
  }

  // 获取牌的颜色类 class
  const getCardColorClass = (cardValue) => {
    const suit = Math.floor(cardValue / 16)
    return suit === 1 || suit === 3 ? 'red-card' : 'black-card'
  }


  // 判断牌是否在获胜牌组中
  const isCardInWinningHand = (card) => {
    // 检查是否有任何玩家的最佳组合中包含这张牌
    return playersData.value.some((player) => !player.isFold && player.combinedCards?.includes(card))
  }

  // 判断牌是否在玩家的获胜组合中
  const isCardInPlayerWinning = (card, combinedCards) => {
    return combinedCards && combinedCards.includes(card)
  }

  // 获取牌型标签类型
  const getCardTypeTagType = (cardType) => {
    if (cardType >= 9) return 'danger' // 同花顺、皇家同花顺
    if (cardType >= 7) return 'warning' // 葫芦、四条
    if (cardType >= 5) return 'success' // 顺子、同花
    if (cardType >= 3) return 'primary' // 两对、三条
    return 'info' // 高牌、一对
  }

  // 获取操作标签类型
  const getOperationTagType = (type) => {
    const typeMap = {
      SB: 'info',
      BB: 'info',
      C: 'success',
      X: 'info',
      F: 'danger',
      R: 'warning',
      A: 'danger'
    }
    return typeMap[type] || 'info'
  }

  const tableRowClassName = ({ row }) => {
    if (row.isCurrentUser) return 'current-user-row'
    if (row.isFold) return 'fold-row'
    return ''
  }

  const formatNumber = (num) => {
    if (!num && num !== 0) return '-'
    return num.toFixed(2)
  }

  const handleClose = () => {
    visible.value = false
    emit('close')
  }
</script>

<style scoped lang="scss">
  .game-detail-container {
    padding: 20px;
    background: #f5f5f5;
    min-height: 100%;

    .el-card {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: 18px;
        font-weight: bold;
      }
    }

    .card-header-title {
      font-size: 16px;
      font-weight: bold;
    }

    .collapse-card {
      margin-bottom: 20px;
      background: white;
      border-radius: 4px;
      border: 1px solid #dcdfe6;

      :deep(.el-collapse-item__header) {
        padding: 5px 14px;
        font-size: 16px;
        font-weight: bold;
        background-color: #fafafa;
        border-bottom: 1px solid #dcdfe6;
        transition: all 0.3s;
        width: 96%;

        &:hover {
          background-color: #f5f5f5;
        }
      }

      :deep(.el-collapse-item__wrap) {
        background-color: white;
      }

      :deep(.el-collapse-item__content) {
        padding: 20px;
      }

      .collapse-title {
        display: flex;
        align-items: center;
        width: 100%;

        .card-header-title {
          font-size: 16px;
          font-weight: bold;
          color: #303133;
        }
      }
    }

    .community-cards-container {
      display: flex;
      justify-content: center;
      padding: 20px 0;

      .empty-cards {
        color: #909399;
        font-size: 14px;
      }

      .cards-wrapper {
        display: flex;
        gap: 10px;
      }
    }

    .poker-card {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 84px;
      background: white;
      border: 2px solid #dcdfe6;
      border-radius: 6px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.3s;
      position: relative;

      &.small {
        width: 50px;
        height: 70px;
      }

      &.mini {
        width: 40px;
        height: 56px;
        margin-right: 4px;

        .card-content {
          font-size: 12px;
        }
      }

      &.highlighted {
        border-color: #409eff;
        box-shadow: 0 0 10px rgba(64, 158, 255, 0.5);
        transform: translateY(-2px);
      }

      &.dimmed {
        // opacity: 0.4;

        .card-content {
          filter: grayscale(60%);
        }
      }

      &.fold {
        // opacity: 0.3;
        background: #f5f5f5;

        .card-content {
          filter: grayscale(100%);
        }
      }

      .card-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: bold;

        .card-point {
          font-size: 18px;
          line-height: 1;
          margin-bottom: 4px;
        }

        .card-suit {
          font-size: 24px;
          line-height: 1;
        }

        &.mini {
          .card-point {
            font-size: 14px;
          }
          .card-suit {
            font-size: 18px;
          }
        }
      }

      .red-card {
        color: #f56c6c;
      }

      .black-card {
        color: #303133;
      }
    }

    .event-cards {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }

    .player-hole-cards {
      margin-top: 15px;

      .player-card-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        padding: 8px;
        background-color: #f9f9f9;
        border-radius: 4px;

        &:last-child {
          margin-bottom: 0;
        }

        .player-position {
          font-weight: bold;
          color: #606266;
          min-width: 80px;
          font-size: 14px;
        }

        .event-cards {
          margin-top: 0;
        }
      }
    }

    .player-name {
      display: flex;
      align-items: center;
    }

    .hole-cards,
    .combined-cards {
      padding: 5px;
      display: flex;
      gap: 4px;
    }

    .operations {
      display: flex;
      flex-wrap: wrap;
    }

    :deep(.current-user-row) {
      background: #ecf5ff !important;
    }

    :deep(.fold-row) {
      background: #f5f5f5 !important;
      // opacity: 0.7;
    }

    :deep(.el-timeline-item__timestamp) {
      color: #409eff;
      font-weight: bold;
    }

    :deep(.el-timeline-item__wrapper) {
      .el-card {
        margin-bottom: 0;

        h4 {
          margin: 0 0 8px 0;
          color: #303133;
        }

        p {
          margin: 0;
          line-height: 1.6;
          color: #606266;
        }
      }
    }
  }
</style>
