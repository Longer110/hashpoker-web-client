<template>
  <el-drawer v-model="visible" :size="drawerSize" :before-close="handleClose" :show-close="false">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-lg">{{ headerTitle }}</span>
        <div>
          <el-button :loading="btnLoading" type="primary" @click="handleConfirm">{{ $t('Common.Confirm') }}</el-button>
          <el-button @click="handleClose">{{ $t('Common.Cancel') }}</el-button>
        </div>
      </div>
    </template>

    <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" :inline="true">
      <el-divider content-position="center">
        <p class="text-center font-medium">{{ $t('HallTableDialog.Divider.RoomConfig') }}</p>
      </el-divider>
      <el-row>
        <el-col :span="12">
          <!-- 模板名称 -->
          <el-form-item :label="$t('HallTableDialog.Fields.TemplateName.Label')" prop="name">
            <el-input
              v-model="formData.name"
              :placeholder="$t('HallTableDialog.Fields.TemplateName.Placeholder')"
              style="width: 240px"
              clearable
              maxlength="12"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 分组 -->
          <el-form-item :label="$t('HallTableDialog.Fields.Group.Label')" prop="nGroupId">
            <el-select
              v-model="formData.nGroupId"
              :placeholder="$t('HallTableDialog.Fields.Group.Placeholder')"
              style="width: 240px"
              clearable
            >
              <el-option
                v-for="item in groupOptions"
                :key="item.GroupId"
                :label="item.GroupName"
                :value="item.GroupId"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <!-- 游戏 -->
          <el-form-item :label="$t('HallTableDialog.Fields.Game.Label')" prop="nGameId">
            <el-select
              v-model="formData.nGameId"
              :placeholder="$t('HallTableDialog.Fields.Game.Placeholder')"
              style="width: 240px"
              clearable
            >
              <el-option v-for="item in gameOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 金币类型 -->
          <el-form-item :label="$t('HallTableDialog.Fields.GoldType.Label')" prop="nGoldType">
            <el-select v-model="formData.nGoldType" :placeholder="$t('HallTableDialog.Fields.GoldType.Placeholder')" style="width: 240px">
              <el-option label="USDT" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <!-- 开桌数量 -->
          <el-form-item :label="$t('HallTableDialog.Fields.OpenCount.Label')" prop="nOpenCount">
            <el-input
              v-model.number="formData.nOpenCount"
              :placeholder="$t('HallTableDialog.Fields.OpenCount.Placeholder')"
              style="width: 240px"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 房间时长 -->
          <el-form-item :label="$t('HallTableDialog.Fields.KeepTime.Label')" prop="nKeepTime">
            <el-select
              v-model="formData.nKeepTime"
              :placeholder="$t('HallTableDialog.Fields.KeepTime.Placeholder')"
              style="width: 240px"
              clearable
            >
              <el-option v-for="item in nKeepTimeOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <!-- 超时自动续开 -->
          <el-form-item :label="$t('HallTableDialog.Fields.AutoContinue.Label')" prop="isAutomatic">
            <el-switch
              v-model="formData.isAutomatic"
              inline-prompt
              :active-text="$t('HallTableDialog.Switch.Yes')"
              :inactive-text="$t('HallTableDialog.Switch.No')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12"> </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <!-- 实时音视频 -->
          <el-form-item :label="$t('HallTableDialog.Fields.RealtimeAV.Label')">
            <el-select v-model="formData.isVideoFee" :placeholder="$t('HallTableDialog.Placeholder.Select')" style="width: 200px">
              <el-option :label="$t('HallTableDialog.Switch.Enable')" :value="true" />
              <el-option :label="$t('HallTableDialog.Switch.Disable')" :value="false" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 语音收费（U/分钟） -->
          <el-form-item :label="$t('HallTableDialog.Fields.VoiceFee.Label')" v-if="formData.isVideoFee">
            <el-select
              v-model="formData.nVideoFee"
              :placeholder="$t('HallTableDialog.Fields.VoiceFee.Placeholder')"
              style="width: 150px"
              @change="handleVideoFeeChange"
            >
              <el-option v-for="item in nVideoFeeOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <!-- 语音收费（U/分钟）（自定义） -->
          <el-form-item
            :label="$t('HallTableDialog.Fields.VoiceFeeCustom.Label')"
            label-width="180px"
            v-if="showCustomVideoFee && formData.isVideoFee"
          >
            <el-input-number
              v-model="formData.nVideoFeeCustom"
              :placeholder="$t('HallTableDialog.Placeholder.Input')"
              style="width: 240px"
              :min="0.001"
              :step="0.001"
              :precision="3"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider content-position="center">
        <p class="text-center font-medium">{{ $t('HallTableDialog.Divider.ClubTexasConfig') }}</p>
      </el-divider>

      <!-- 短牌模式选择 -->
      <el-row v-if="formData.nGameId === 175">
        <el-col :span="12">
          <el-form-item :label="$t('HallTableDialog.Fields.modelRule.Label')" prop="shortPokerMode">
            <el-radio-group v-model="formData.shortPokerMode">
              <el-radio :label="1">{{ $t('HallTableDialog.Fields.modelRule.modelType1') }}</el-radio>
              <el-radio :label="2">{{ $t('HallTableDialog.Fields.modelRule.modelType2') }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="showAnteSwitch">
        <el-col :span="12">
          <!-- 前注，开/关 -->
          <el-form-item :label="$t('HallTableDialog.Fields.AnteSwitch.Label')" prop="isPreAnteEnabled">
            <el-switch
              v-model="isPreAnteEnabled"
              inline-prompt
              :active-text="$t('HallTableDialog.Switch.On')"
              :inactive-text="$t('HallTableDialog.Switch.Off')"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="showAnteValue">
        <el-col :span="12">
          <!-- 前注值 -->
          <el-form-item :label="$t('HallTableDialog.Fields.AnteValue.Label')" prop="nPreAnte">
            <el-select
              v-model="formData.nPreAnte"
              :placeholder="$t('HallTableDialog.Fields.AnteValue.Placeholder')"
              style="width: 120px"
              clearable
              @change="handlePreAnteChange"
            >
              <el-option v-for="item in nPreAnteOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 庄家=N倍前注 -->
          <el-form-item v-if="showDealerMultiple" :label="$t('HallTableDialog.Fields.DealerMultiple.Label')" prop="preAnteOdd">
            <el-select
              v-model="formData.preAnteOdd"
              :placeholder="$t('HallTableDialog.Fields.DealerMultiple.Placeholder')"
              style="width: 70px"
            >
              <el-option
                v-for="item in magnificationOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <p class="text-base text-gray-500 ml-4">
              {{ Math.round(formData.nPreAnte * formData.preAnteOdd * 100) / 100 || '' }}
            </p>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 前注（自定义） -->
      <el-form-item v-if="showCustomPreAnte" :label="$t('HallTableDialog.Fields.AnteCustom.Label')" prop="nPreAnteCustom">
        <el-input-number
          v-model="formData.nPreAnteCustom"
          :min="0.1"
          :max="1000"
          :step="0.1"
          :precision="1"
          :placeholder="$t('HallTableDialog.Fields.AnteCustom.Placeholder')"
          style="width: 240px"
          clearable
        />
      </el-form-item>

      <div v-if="showSmallBigBlind" class="flex items-center justify-start">
        <!-- 小盲 -->
        <el-form-item :label="$t('HallTableDialog.Fields.SmallBlind.Label')" prop="nSmallBlind" style="margin-right: 10px">
          <div style="width: 500px; height: 50px">
            <el-slider
              v-model="formData.nSmallBlind"
              :min="isSmallBlindOpen ? 0 : 0.1"
              :max="1000"
              :step="0.1"
              show-input
              @change="handleSmallBlindChange"
              :disabled="isSmallBlindOpen"
            />
          </div>
          <p v-show="!isSmallBlindOpen" class="text-red-500 mb-5 ml-2">
            {{ $t('HallTableDialog.Tips.SmallBlindManual') }}
          </p>
        </el-form-item>
      </div>

      <!-- 大盲 -->
      <el-form-item v-if="showSmallBigBlind" :label="$t('HallTableDialog.Fields.BigBlind.Label')" prop="nBigBlind">
        <div style="width: 500px; height: 50px">
          <el-slider v-model="formData.nBigBlind" :min="isSmallBlindOpen ? 0 : 0.1" :max="2000" show-input disabled />
        </div>
      </el-form-item>

      <!-- 牌桌人数 -->
      <el-form-item :label="$t('HallTableDialog.Fields.Capacity.Label')" prop="nCapacity">
        <div style="width: 500px; height: 50px">
          <el-slider v-model="formData.nCapacity" :min="2" :max="9" show-stops show-input />
        </div>
      </el-form-item>

      <!-- 补码上限 -->
      <el-form-item :label="$t('HallTableDialog.Fields.BumaLimit.Label')" prop="nTakeInLimit">
        <div style="width: 500px; height: 50px">
          <el-slider
            v-model="formData.nTakeInLimit"
            :min="0"
            :max="10"
            :marks="{ 0: '关闭', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10' }"
            @change="handleTakeInLimitChange"
          />
        </div>
      </el-form-item>

      <!-- 自动开始人数 -->
      <el-form-item :label="$t('HallTableDialog.Fields.AutoStartPlayers.Label')" prop="nPlayerCnt">
        <el-select
          v-model="formData.nPlayerCnt"
          :placeholder="$t('HallTableDialog.Fields.AutoStartPlayers.Placeholder')"
          style="width: 240px"
          clearable
        >
          <el-option
            v-for="item in playerCountOptions"
            :key="item"
            :label="$t('HallTableDialog.Options.PlayerCount', { count: item })"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <!-- 最小买入BB -->
      <el-form-item :label="$t('HallTableDialog.Fields.MinBuyIn.Label')" prop="nMinTabkeInBB">
        <el-input
          v-model.number="formData.nMinTabkeInBB"
          :placeholder="$t('HallTableDialog.Fields.MinBuyIn.Placeholder')"
          style="width: 240px"
          clearable
        />
        <p class="text-base text-gray-500 ml-4">
          {{ $t('HallTableDialog.Tips.BuyInAmountPrefix') }}{{ calculateMinTabkeInAmount() }}
        </p>
      </el-form-item>

      <!-- 最大买入BB -->
      <el-form-item :label="$t('HallTableDialog.Fields.MaxBuyIn.Label')" prop="nMaxTabkeInBB">
        <el-input
          v-model.number="formData.nMaxTabkeInBB"
          :placeholder="$t('HallTableDialog.Fields.MaxBuyIn.Placeholder')"
          style="width: 240px"
          clearable
        />
        <p class="text-base text-gray-500 ml-4">
          {{ $t('HallTableDialog.Tips.BuyInAmountPrefix') }}{{ calculateMaxTabkeInAmount() }}
        </p>
      </el-form-item>

      <!-- 入池率 -->
      <el-form-item :label="$t('HallTableDialog.Fields.PoolEntryRate.Label')" prop="nPoolEntryRate">
        <el-select
          v-model="formData.nPoolEntryRate"
          :placeholder="$t('HallTableDialog.Fields.PoolEntryRate.Placeholder')"
          style="width: 240px"
          clearable
        >
          <el-option v-for="item in nPoolEntryRateOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <!-- n手之内不受入池率限制 -->
      <el-form-item :label="$t('HallTableDialog.Fields.PoolEntryRateHands.Label')" prop="nPoolEntryRateHands" label-width="170px">
        <el-input-number
          v-model.number="formData.nPoolEntryRateHands"
          :placeholder="$t('HallTableDialog.Fields.PoolEntryRateHands.Placeholder')"
          style="width: 240px"
          clearable
          :min="0"
          :step="1"
          :precision="0"
        />
      </el-form-item>
      <el-row>
        <el-col :span="10">
          <!-- 止损上限 -->
          <el-form-item :label="$t('HallTableDialog.Fields.StopLoss.Label')" prop="isTabkeOutForce">
            <el-select v-model="formData.isTabkeOutForce" :placeholder="$t('HallTableDialog.Placeholder.Select')" style="width: 200px">
              <el-option :label="$t('HallTableDialog.Switch.Enable')" :value="1" />
              <el-option :label="$t('HallTableDialog.Switch.Disable')" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <!-- 输钱金额倍数 -->
          <el-form-item :label="$t('HallTableDialog.Fields.LossMultiplier.Label')" prop="nLoseMaxAmount" v-if="showTabkeOutForce">
            <el-select
              v-model="formData.nLoseMaxAmount"
              :placeholder="$t('HallTableDialog.Fields.LossMultiplier.Placeholder')"
              style="width: 200px"
            >
              <el-option
                v-for="item in nLoseMaxAmountOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="showTabkeOutFeature">
        <el-col :span="10">
          <!-- 是否可撤码 -->
          <el-form-item :label="$t('HallTableDialog.Fields.AllowTakeOut.Label')">
            <el-select v-model="formData.isTabkeOut" :placeholder="$t('HallTableDialog.Placeholder.Select')" style="width: 200px">
              <el-option :label="$t('HallTableDialog.Switch.Enable')" :value="true" />
              <el-option :label="$t('HallTableDialog.Switch.Disable')" :value="false" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <!-- 撤码倍数 -->
          <el-form-item :label="$t('HallTableDialog.Fields.TakeOutMultiplier.Label')" prop="nTabkeOutOdd" v-if="formData.isTabkeOut">
            <el-select
              v-model="formData.nTabkeOutOdd"
              :placeholder="$t('HallTableDialog.Fields.TakeOutMultiplier.Placeholder')"
              style="width: 200px"
            >
              <el-option
                v-for="item in nTabkeOutOddOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <!-- 手数限制 -->
          <el-form-item :label="$t('HallTableDialog.Fields.HandLimit.Label')">
            <el-select v-model="formData.isHandLimit" :placeholder="$t('HallTableDialog.Placeholder.Select')" style="width: 200px">
              <el-option :label="$t('HallTableDialog.Switch.Enable')" :value="1" />
              <el-option :label="$t('HallTableDialog.Switch.Disable')" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <!-- 手数选项 -->
          <el-form-item :label="$t('HallTableDialog.Fields.HandLimitOptions.Label')" prop="nPoolHands" v-if="formData.isHandLimit">
            <el-select
              v-model="formData.nPoolHands"
              :placeholder="$t('HallTableDialog.Fields.HandLimitOptions.Placeholder')"
              style="width: 200px"
              @change="handleHandLimitChange"
            >
              <el-option v-for="item in nHandLimitOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <!-- 手数限制（自定义） -->
          <el-form-item
            :label="$t('HallTableDialog.Fields.HandLimitCustom.Label')"
            prop="nPoolHandsCustom"
            v-if="formData.isHandLimit && showCustomHandLimit"
          >
            <el-input-number
              v-model="formData.nPoolHandsCustom"
              :placeholder="$t('HallTableDialog.Fields.HandLimitCustom.Placeholder')"
              :min="1"
              :step="1"
              :precision="0"
              style="width: 240px"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <!-- 强制抓头 -->
        <el-form-item v-if="showForceZhuaTou" :label="$t('HallTableDialog.Fields.ForceBlind.Label')" prop="isForceBlind">
          <el-switch
            v-model="formData.isForceBlind"
            inline-prompt
            :active-text="$t('HallTableDialog.Switch.Yes')"
            :inactive-text="$t('HallTableDialog.Switch.No')"
          />
        </el-form-item>
      </el-row>

      <el-divider content-position="center">
        <p class="text-center font-medium">{{ $t('HallTableDialog.Divider.RakeSettings') }}</p>
      </el-divider>

      <!-- 抽水方式 -->
      <el-form-item :label="$t('HallTableDialog.Fields.RakeMethod.Label')" prop="nComputeMode">
        <el-select
          v-model="formData.nComputeMode"
          :placeholder="$t('HallTableDialog.Fields.RakeMethod.Placeholder')"
          style="width: 240px"
          clearable
        >
          <el-option :label="$t('HallTableList.ComputeMode.Profit')" :value="1" />
        </el-select>
      </el-form-item>

      <!-- 抽水类型 -->
      <el-form-item :label="$t('HallTableDialog.Fields.RakeType.Label')" prop="nModeType">
        <el-select
          v-model="formData.nModeType"
          :placeholder="$t('HallTableDialog.Fields.RakeType.Placeholder')"
          style="width: 240px"
        >
          <el-option v-for="item in nModeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <!-- 服务费比例 -->
      <el-form-item :label="$t('HallTableDialog.Fields.ServiceRate.Label')" prop="nTaxRate">
        <template #label>
          <div class="label-with-tooltip">
            <span>{{ $t('HallTableDialog.Fields.ServiceRate.Label') }}</span>
            <el-tooltip :content="$t('HallTableDialog.Tooltips.ServiceRate')" placement="top" effect="light">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
        </template>
        <el-input
          v-model.number="formData.nTaxRate"
          :placeholder="$t('HallTableDialog.Fields.ServiceRate.Placeholder')"
          style="width: 240px"
          clearable
        >
          <template #append>%</template>
        </el-input>
      </el-form-item>

      <!-- 每手抽佣封顶 -->
      <el-form-item :label="$t('HallTableDialog.Fields.TopLimit.Label')" prop="nTopLimitBB">
        <el-input
          v-model.number="formData.nTopLimitBB"
          :placeholder="$t('HallTableDialog.Fields.TopLimit.Placeholder')"
          style="width: 240px"
          clearable
          :disabled="!isComputeModeJuChou || isComputeModeJuChouAndTaxRateIs0"
        />
        <span class="ml-2">BB</span>
      </el-form-item>

      <!-- 触发抽佣底池 -->
      <el-form-item :label="$t('HallTableDialog.Fields.TriggerPot.Label')" prop="nLimitBB">
        <el-input
          v-model.number="formData.nLimitBB"
          :placeholder="$t('HallTableDialog.Fields.TriggerPot.Placeholder')"
          style="width: 240px"
          clearable
          :disabled="!isComputeModeJuChou || isComputeModeJuChouAndTaxRateIs0"
        />
        <span class="ml-2">BB</span>
      </el-form-item>

      <el-divider content-position="center">
        <p class="text-center font-medium">{{ $t('HallTableDialog.Divider.CardSettings') }}</p>
      </el-divider>
      <template v-for="(cardConfig, index) in cardConfigOptions" :key="index">
        <el-row>
          <el-col :span="10">
            <!-- 看牌设置选项 -->
            <el-form-item :label="cardConfig.label">
              <el-select
                v-model="formData.cardConfigs[index].open"
                :placeholder="$t('HallTableDialog.Placeholder.Select')"
                style="width: 200px"
                @change="handleOpenChange(index)"
              >
                <el-option :label="$t('HallTableDialog.Switch.Enable')" :value="1" />
                <el-option :label="$t('HallTableDialog.Switch.Disable')" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <!-- 看牌额度 -->
            <el-form-item :label="cardConfig.costLabel" v-if="formData.cardConfigs[index].open === 1">
              <el-select
                v-model="formData.cardConfigs[index].nCost"
                :placeholder="$t('HallTableDialog.Placeholder.SelectCost', { label: cardConfig.costLabel })"
                style="width: 150px"
                @change="(val) => handleCostChange(val, index)"
              >
                <el-option
                  v-for="item in cardConfig.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <span class="ml-2">BB</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="showCustomCost[index] && formData.cardConfigs[index].open === 1">
          <el-col :span="24">
            <!-- 看牌额度（自定义） -->
            <el-form-item :label="$t('HallTableDialog.CardConfig.CustomLabel', { label: cardConfig.costLabel })" label-width="180px">
              <el-input-number
                v-model="formData.cardConfigs[index].nCostCustom"
                :placeholder="$t('HallTableDialog.Placeholder.InputCost', { label: cardConfig.costLabel })"
                style="width: 240px"
                :min="0.001"
                :step="0.001"
                :precision="3"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <!-- 延迟看牌 -->
      <el-form-item :label="$t('HallTableDialog.Fields.DelayLook.Label')" prop="isDelayLook">
        <el-switch
          v-model="formData.isDelayLook"
          inline-prompt
          :active-text="$t('HallTableDialog.Switch.Yes')"
          :inactive-text="$t('HallTableDialog.Switch.No')"
        />
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'
  import { useAppStore } from '@/pinia'
  import { ElMessage } from 'element-plus'
  import { QuestionFilled } from '@element-plus/icons-vue'
  import { useI18n } from 'vue-i18n'
  import { createDeskTemplateApi, updateDeskTemplateApi } from '@/api/dezhou/tableTemplate'
  import * as tableConfig from '../../tableConfig'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'add'
    },
    groupOptions: {
      type: Array,
      default: () => []
    }
  })

  const emit = defineEmits(['update:modelValue', 'confirm', 'close'])

  const appStore = useAppStore()
  const { t } = useI18n()

  // 抽屉显示状态
  const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })

  const drawerSize = computed(() => appStore.drawerSize)
  const headerTitle = computed(() => {
    if (props.title) {
      return props.title
    }
    return props.type === 'edit' ? t('HallTableList.Dialog.EditTitle') : t('HallTableList.Dialog.CreateTitle')
  })

  const formRef = ref(null)
  const btnLoading = ref(false)
  const showCustomPreAnte = ref(false)
  const isPreAnteEnabled = ref(false) // 前注开关状态
  const showCustomVideoFee = ref(false)
  const showCustomHandLimit = ref(false) // 手数限制自定义显示状态

  const gameOptions = computed(() => tableConfig.gameOptions(t))
  const nKeepTimeOptions = computed(() => {
    const base = tableConfig.nKeepTimeOptions(t)
    if (import.meta.env.VITE_ENV === 'sit') {
      const insertOption = {
        value: 300,
        label: t('HallTableDialog.Options.KeepTime.Minutes5') // 原文：5分钟
      }
      if (base.length > 0) {
        return [base[0], insertOption, ...base.slice(1)]
      }
      return [insertOption]
    }
    return base
  })
  const nPreAnteOptions = computed(() => tableConfig.nPreAnteOptions(t))
  const magnificationOptions = computed(() => tableConfig.magnificationOptions(t))
  const nModeOptions = computed(() => tableConfig.nComputeModeOptions(t))
  const playerCountOptions = ref(tableConfig.playerCountOptions)
  const nPoolEntryRateOptions = computed(() => tableConfig.nPoolEntryRateOptions(t))
  const nTabkeOutOddOptions = computed(() => tableConfig.nTabkeOutOddOptions(t))
  const nLoseMaxAmountOptions = computed(() => tableConfig.nLoseMaxAmountOptions(t))
  const nVideoFeeOptions = computed(() => tableConfig.nVideoFeeOptions(t))
  const nHandLimitOptions = computed(() => tableConfig.nHandLimitOptions(t))
  const cardConfigOptions = computed(() => tableConfig.cardConfigOptions(t))

  const createDefaultCardConfigs = () => (cardConfigOptions.value || []).map(() => ({ open: 0, nCost: 0, nCostCustom: 0 }))
  const createCostVisibilityFlags = () => (cardConfigOptions.value || []).map(() => false)

  const showCustomCost = ref(createCostVisibilityFlags())

  const isComputeModeJuChou = computed(() => formData.value.nModeType === 1)

  // 把抽且服务费比例为0
  const isComputeModeJuChouAndTaxRateIs0 = computed(
    () => formData.value.nModeType === 1 && formData.value.nTaxRate === 0
  )

  // 是否显示强制抓头选项
  const showForceZhuaTou = computed(() => {
    // 只有短牌时不显示，其他情况都显示
    if (formData.value.nGameId === 175) {
      return false
    }
    return true
  })

  // 表单数据
  const formData = ref({
    id: undefined, // 编辑时需要的ID
    name: '', // 模板名称
    nGroupId: null,
    nGameId: 125,
    nOpenCount: 1,
    nGoldType: 1, // USDT
    nKeepTime: 1800, // 默认1小时
    nContinuedNum: 0,
    isAutomatic: false,
    IsOpen: true,
    shortPokerMode: 1, // 短牌模式：1-庄位模式，2-盲注模式
    nPreAnte: 0,
    nPreAnteCustom: 0,
    nSmallBlind: 2,
    nBigBlind: 4,
    nTakeIn: 400,
    nCapacity: 6,
    nPlayerCnt: 2,
    nMinTabkeInBB: 20,
    nMaxTabkeInBB: 200,
    nTakeInLimit: 2, // 补码上限
    nPoolEntryRate: 0,
    nPoolEntryRateHands: 0,
    nZhuaTou: 0,
    nComputeMode: 1,
    nModeType: 1,
    nTaxRate: 0,
    nTopLimitBB: 0,
    nLimitBB: 0,
    isDPreAnte: false, //短牌--庄家是否要下两倍前注 true:开启 false:关闭
    isForceBlind: true, //强制抓头 true:开启 false:关闭
    preAnteOdd: 2, //前注倍数
    isTabkeOutForce: 0, //止损上限 true:开启 false:关闭
    nLoseMaxAmount: 0, //输钱限制金额
    isTabkeOut: false, //是否可撤码 true:开启 false:关闭
    nTabkeOutOdd: 4, //撤码倍数
    nInsureMode: 1, //保险模式-暂无字段-默认传1
    isVideoFee: false, // 实时音视频开关
    nVideoFee: 0.002, // 语音收费
    nVideoFeeCustom: 0, // 语音收费自定义值
    isHandLimit: 0, // 手数限制开关 0:关闭 1:开启
    nPoolHands: 100, // 手数限制值
    nPoolHandsCustom: 0, // 手数限制自定义值
    // 看牌配置数组
    cardConfigs: createDefaultCardConfigs(),
    isDelayLook: false // 延迟看牌开关
  })

  const buildRequiredMessage = (labelKey) => {
    const prefix = t('HallTableDialog.Placeholder.Input')
    const label = t(labelKey)
    const separator = /[a-zA-Z]$/.test(prefix) ? ' ' : ''
    return `${prefix}${separator}${label}`
  }

  const rules = computed(() => ({
    name: [{ required: true, message: t('HallTableDialog.Fields.TemplateName.Placeholder'), trigger: 'blur' }],
    nGroupId: [{ required: true, message: t('HallTableDialog.Validation.GroupRequired'), trigger: 'change' }],
    nGameId: [{ required: true, message: t('HallTableDialog.Validation.GameRequired'), trigger: 'change' }],
    nOpenCount: [{ required: true, message: t('HallTableDialog.Fields.OpenCount.Placeholder'), trigger: 'blur' }],
    nSmallBlind: [{ required: true, message: buildRequiredMessage('HallTableDialog.Fields.SmallBlind.Label'), trigger: 'change' }],
    nCapacity: [{ required: true, message: buildRequiredMessage('HallTableDialog.Fields.Capacity.Label'), trigger: 'change' }],
    nPlayerCnt: [{ required: true, message: t('HallTableDialog.Fields.AutoStartPlayers.Placeholder'), trigger: 'change' }],
    nPoolEntryRateHands: [{ required: true, message: t('HallTableDialog.Validation.PoolEntryRateHandsRequired'), trigger: 'blur' }],
    preAnteOdd: [
      {
        validator: (rule, value, callback) => {
          if (isSmallBlindOpen.value) {
            if (value === '' || value === null || value === undefined) {
              callback(new Error(t('HallTableDialog.Validation.DealerMultiplierRequired')))
            } else {
              callback()
            }
          } else {
            callback()
          }
        },
        trigger: 'change'
      }
    ],
    nTaxRate: [
      {
        validator: (rule, value, callback) => {
          if (value === '' || value === null || value === undefined) {
            callback(new Error(t('HallTableDialog.Validation.ServiceRateRequired')))
          } else if (value > 10) {
            callback(new Error(t('HallTableDialog.Validation.ServiceRateMax')))
          } else if (value < 0) {
            callback(new Error(t('HallTableDialog.Validation.ServiceRateMin')))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ],
    nTopLimitBB: [
      {
        validator: (rule, value, callback) => {
          if (formData.value.nModeType === 1 && formData.value.nTaxRate > 0 && value === 0) {
            callback(new Error(t('HallTableDialog.Validation.TopLimitRequired')))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ]
  }))

  const handlePreAnteChange = (val) => {
    if (val === 'custom') {
      showCustomPreAnte.value = true
      formData.value.nPreAnte = formData.value.nPreAnteCustom || 0
    } else {
      showCustomPreAnte.value = false
      formData.value.nPreAnte = val
    }
  }

  const handleVideoFeeChange = (val) => {
    if (val === 'custom') {
      showCustomVideoFee.value = true
      formData.value.nVideoFee = formData.value.nVideoFeeCustom || 0
    } else {
      showCustomVideoFee.value = false
      formData.value.nVideoFee = val
    }
  }

  const handleHandLimitChange = (val) => {
    if (val === 'custom') {
      showCustomHandLimit.value = true
      formData.value.nPoolHands = formData.value.nPoolHandsCustom || 100
    } else {
      showCustomHandLimit.value = false
      formData.value.nPoolHands = val
    }
  }

  // 处理开关变化
  const handleOpenChange = (index) => {
    if (formData.value.cardConfigs[index].open === 0) {
      // 关闭时清空数据
      formData.value.cardConfigs[index].nCost = 0
      formData.value.cardConfigs[index].nCostCustom = 0
      showCustomCost.value[index] = false
    }
  }

  // 处理额度选择变化
  const handleCostChange = (val, index) => {
    if (val === 'custom') {
      showCustomCost.value[index] = true
      formData.value.cardConfigs[index].nCost = formData.value.cardConfigs[index].nCostCustom || 0
    } else {
      showCustomCost.value[index] = false
      formData.value.cardConfigs[index].nCost = val
    }
  }



  // 计算买入筹码倍率最小值的最小额度
  const calculateMinTabkeInAmount = () => {
    const { nMinTabkeInBB, nPreAnte, preAnteOdd, nBigBlind } = formData.value
    if (isSmallBlindOpen.value) {
      return `${nMinTabkeInBB}*${Math.round(nPreAnte*preAnteOdd*100)/100} = ${Math.round(nMinTabkeInBB * nPreAnte * preAnteOdd * 100) / 100}`
    } else {
      return `${nMinTabkeInBB}*${nBigBlind} = ${Math.round(nMinTabkeInBB * nBigBlind * 100) / 100}`
    }
  }

  // 计算买入筹码倍率最大值的最大额度
  const calculateMaxTabkeInAmount = () => {
    const { nMaxTabkeInBB, nPreAnte, preAnteOdd, nBigBlind } = formData.value
    if (isSmallBlindOpen.value) {
      return `${nMaxTabkeInBB}*${Math.round(nPreAnte*preAnteOdd*100)/100} = ${Math.round(nMaxTabkeInBB * nPreAnte * preAnteOdd * 100) / 100}`
    } else {
      return `${nMaxTabkeInBB}*${nBigBlind} = ${Math.round(nMaxTabkeInBB * nBigBlind * 100) / 100}`
    }
  }



  // 是否显示撤码功能
  const showTabkeOutFeature = computed(() => formData.value.nGameId === 175)

  // 监听前注开关变化
  watch(
    () => isPreAnteEnabled.value,
    (val) => {
      if (val) {
        // 开启前注时，设置默认值为2
        if (formData.value.nPreAnte === 0) {
          formData.value.nPreAnte = 2
        }
      } else {
        // 关闭前注时，设置为0
        formData.value.nPreAnte = 0
        showCustomPreAnte.value = false
      }
    }
  )

  const handleSmallBlindChange = (val) => {
    formData.value.nBigBlind = val * 2
    formData.value.nTakeIn = val * 200
  }

  // 处理补码上限变化，跳过1
  const handleTakeInLimitChange = (val) => {
    if (val === 1) {
      formData.value.nTakeInLimit = 2
    }
  }

  const showTabkeOutForce = computed(() => formData.value.isTabkeOutForce === 1)
  watch(
    () => formData.value.isTabkeOutForce,
    (val) => {
      if (val === 1) {
        showTabkeOutForce.value = true
      } else {
        showTabkeOutForce.value = false
        formData.value.nLoseMaxAmount = 0
      }
    }
  )

  // 监听撤码开关变化，短牌开启撤码时设置默认倍数为4
  watch(
    () => formData.value.isTabkeOut,
    (val) => {
      if (val && formData.value.nGameId === 175 && formData.value.nTabkeOutOdd === 0) {
        formData.value.nTabkeOutOdd = 4
      }
    }
  )

  // 是否禁用小盲大盲（只有短牌庄位模式才会禁用）
  const isSmallBlindOpen = computed(() => {
    // 只有短牌庄位模式：前注值不为0时，小盲大盲禁用
    if (formData.value.nGameId === 175 && formData.value.shortPokerMode === 1) {
      return formData.value.nPreAnte !== 0
    }
    // 其他情况（德州模式、短牌盲注模式）都不禁用
    return false
  })

  // 是否显示前注开关（德州模式 或 短牌盲注模式）
  const showAnteSwitch = computed(() => {
    return formData.value.nGameId === 125 || (formData.value.nGameId === 175 && formData.value.shortPokerMode === 2)
  })

  // 是否显示前注值（德州开启前注 或 短牌庄位模式 或 短牌盲注模式开启前注）
  const showAnteValue = computed(() => {
    // 德州模式：前注开关开启时显示
    if (formData.value.nGameId === 125) {
      return isPreAnteEnabled.value
    }
    // 短牌庄位模式：始终显示前注值
    if (formData.value.nGameId === 175 && formData.value.shortPokerMode === 1) {
      return true
    }
    // 短牌盲注模式：前注开关开启时显示
    if (formData.value.nGameId === 175 && formData.value.shortPokerMode === 2) {
      return isPreAnteEnabled.value
    }
    return false
  })

  // 是否显示庄家倍数（短牌庄位模式）
  const showDealerMultiple = computed(() => {
    return formData.value.nGameId === 175 && formData.value.shortPokerMode === 1
  })

  // 是否显示小盲大盲（德州模式 或 短牌盲注模式）
  const showSmallBigBlind = computed(() => {
    return formData.value.nGameId === 125 || (formData.value.nGameId === 175 && formData.value.shortPokerMode === 2)
  })

  // 监听游戏类型变化，从德州切换到短牌时默认选择庄位模式
  watch(
    () => formData.value.nGameId,
    (newGameId, oldGameId) => {
      // 从德州切换到短牌时，默认选择庄位模式
      if (newGameId === 175 && oldGameId === 125) {
        formData.value.shortPokerMode = 1
      }
    }
  )

  // 监听游戏类型、短牌模式和前注值的变化
  watch(
    () => [formData.value.nGameId, formData.value.shortPokerMode, formData.value.nPreAnte],
    ([gameId, shortPokerMode, preAnte], [oldGameId, oldShortPokerMode, oldPreAnte]) => {
      // 从德州切换到短牌庄位模式，设置前注默认值
      if (gameId === 175 && oldGameId === 125 && shortPokerMode === 1) {
        if (formData.value.nPreAnte === 0) {
          formData.value.nPreAnte = 2
        }
        if (!formData.value.preAnteOdd) {
          formData.value.preAnteOdd = 2
        }
      }

      // 短牌庄位模式且前注开启：小盲大盲置为0，开启庄家下两倍前注
      if (gameId === 175 && shortPokerMode === 1 && preAnte !== 0) {
        formData.value.nSmallBlind = 0
        formData.value.nBigBlind = 0
        formData.value.nTakeIn = preAnte * 100
        formData.value.isDPreAnte = true
      }
      // 从短牌庄位模式切换出来，恢复小盲大盲
      else if (oldGameId === 175 && oldShortPokerMode === 1 && oldPreAnte !== 0) {
        formData.value.nSmallBlind = 2
        formData.value.nBigBlind = 4
        formData.value.nTakeIn = 400
        formData.value.isDPreAnte = false
        // 如果不是短牌庄位模式，清空preAnteOdd
        if (!(gameId === 175 && shortPokerMode === 1)) {
          formData.value.preAnteOdd = undefined
        }
      }
      // 其他情况：德州模式和短牌盲注模式，前注和小盲大盲不互斥
      else {
        formData.value.isDPreAnte = false
        // 短牌庄位模式保留preAnteOdd，其他情况清空
        if (!(gameId === 175 && shortPokerMode === 1)) {
          formData.value.preAnteOdd = undefined
        }
      }

      // 切换到德州模式时，重置撤码相关字段
      if (gameId === 125) {
        formData.value.isTabkeOut = false
        formData.value.nTabkeOutOdd = 0
      }
      // 切换到短牌模式时，如果开启了撤码，设置默认倍数为4
      if (gameId === 175 && formData.value.isTabkeOut && formData.value.nTabkeOutOdd === 0) {
        formData.value.nTabkeOutOdd = 4
      }
    }
  )

  // 监听短牌模式切换
  watch(
    () => formData.value.shortPokerMode,
    (newMode, oldMode) => {
      if (formData.value.nGameId !== 175) return

      // 切换到庄位模式
      if (newMode === 1) {
        // 如果前注值为0，设置默认值
        if (formData.value.nPreAnte === 0) {
          formData.value.nPreAnte = 2
        }
        // 设置默认庄家倍数
        if (!formData.value.preAnteOdd) {
          formData.value.preAnteOdd = 2
        }
        // 关闭前注开关（庄位模式不需要开关）
        isPreAnteEnabled.value = false
      }
      // 切换到盲注模式
      else if (newMode === 2) {
        // 恢复小盲大盲默认值
        if (oldMode === 1) {
          formData.value.nSmallBlind = 2
          formData.value.nBigBlind = 4
          formData.value.nTakeIn = 400
        }
        // 关闭前注开关
        isPreAnteEnabled.value = false
        // 清空前注值
        formData.value.nPreAnte = 0
      }
    }
  )



  watch(
    () => formData.value.nPreAnteCustom,
    (val) => {
      if (showCustomPreAnte.value) {
        formData.value.nPreAnte = val
      }
    }
  )

  // 监听看牌配置的自定义值变化
  watch(
    () => formData.value.cardConfigs.map((config) => config.nCostCustom),
    (newVals) => {
      newVals.forEach((val, index) => {
        if (showCustomCost.value[index]) {
          formData.value.cardConfigs[index].nCost = val || 0
        }
      })
    },
    { deep: true }
  )

  // 监听语音收费自定义值变化
  watch(
    () => formData.value.nVideoFeeCustom,
    (val) => {
      if (showCustomVideoFee.value) {
        formData.value.nVideoFee = val || 0
      }
    }
  )

  // 监听实时音视频开关变化
  watch(
    () => formData.value.isVideoFee,
    (val) => {
      if (!val) {
        formData.value.nVideoFee = 0
        formData.value.nVideoFeeCustom = 0
        showCustomVideoFee.value = false
      } else{
        formData.value.nVideoFee = 0.002
      }
    }
  )

  // 监听手数限制自定义值变化
  watch(
    () => formData.value.nPoolHandsCustom,
    (val) => {
      if (showCustomHandLimit.value) {
        formData.value.nPoolHands = val || 100
      }
    }
  )

  // 监听手数限制开关变化
  watch(
    () => formData.value.isHandLimit,
    (val) => {
      if (val === 0) {
        formData.value.nPoolHands = 0
        formData.value.nPoolHandsCustom = 0
        showCustomHandLimit.value = false
      }
    }
  )

  watch(
    () => formData.value.nModeType,
    (val) => {
      if (val !== 1) {
        formData.value.nTopLimitBB = 0
        formData.value.nLimitBB = 0
      }
    }
  )

  watch(
    () => formData.value.nTaxRate,
    (val) => {
      if (val === 0 || val === null || val === undefined || val === '') {
        formData.value.nTopLimitBB = 0
        formData.value.nLimitBB = 0
      }
    }
  )

  // 监听强制抓头开关和大盲变化，自动计算nZhuaTou
  watch(
    () => [formData.value.isForceBlind, formData.value.nBigBlind, formData.value.nGameId, formData.value.nPreAnte],
    ([isForce, bigBlind]) => {
      if (formData.value.nGameId === 175 && formData.value.nPreAnte !== 0) {
        formData.value.nZhuaTou = 0
      } else {
        formData.value.nZhuaTou = isForce ? bigBlind * 2 : 0
      }
    }
  )

  const resetForm = () => {
    formData.value = {
      id: undefined,
      name: '',
      nGroupId: null,
      nGameId: 125,
      nOpenCount: 1,
      nGoldType: 1,
      nKeepTime: 1800,
      nContinuedNum: 0,
      isAutomatic: false,
      IsOpen: true,
      shortPokerMode: 1, // 短牌模式：1-庄位模式，2-盲注模式
      nPreAnte: 0,
      nPreAnteCustom: 0,
      nSmallBlind: 2,
      nBigBlind: 4,
      nTakeIn: 400,
      nCapacity: 6,
      nPlayerCnt: 2,
      nMinTabkeInBB: 20,
      nMaxTabkeInBB: 200,
      nTakeInLimit: 2,
      nPoolEntryRate: 0,
      nPoolEntryRateHands: 0,
      nZhuaTou: 0,
      nComputeMode: 1,
      nModeType: 1,
      nTaxRate: 0,
      nTopLimitBB: 0,
      nLimitBB: 0,
      isDPreAnte: false, //短牌--庄家是否要下两倍前注 true:开启 false:关闭
      isForceBlind: true, //强制抓头 true:开启 false:关闭
      preAnteOdd: 2, //前注倍数
      isTabkeOutForce: 0, //止损上限 true:开启 false:关闭
      nLoseMaxAmount: 0, //输钱限制金额
      isTabkeOut: false, //是否可撤码 true:开启 false:关闭
      nTabkeOutOdd: 4,
      nInsureMode: 1, //保险模式-暂无字段-默认传1
      isVideoFee: false,
      nVideoFee: 0.002,
      nVideoFeeCustom: 0,
      isHandLimit: 0,
      nPoolHands: 100,
      nPoolHandsCustom: 0,
      // 看牌配置数组
      cardConfigs: createDefaultCardConfigs(),
      isDelayLook: false // 延迟看牌开关
    }
    showCustomPreAnte.value = false
    isPreAnteEnabled.value = false // 重置前注开关
    showCustomCost.value = createCostVisibilityFlags() // 重置自定义显示状态
    showCustomVideoFee.value = false // 重置语音收费自定义显示状态
    showCustomHandLimit.value = false // 重置手数限制自定义显示状态
    formRef.value?.resetFields()
  }

  const handleClose = () => {
    resetForm()
    emit('update:modelValue', false)
    emit('close')
  }

  const handleConfirm = async () => {
    try {
      await formRef.value?.validate()

      btnLoading.value = true

      const submitData = { ...formData.value }

      if (showCustomPreAnte.value) {
        submitData.nPreAnte = formData.value.nPreAnteCustom
      }

      // 删除自定义前注字段
      delete submitData.nPreAnteCustom

      // 删除短牌模式字段，不需要提交
      delete submitData.shortPokerMode

      // 如果不是短牌庄位模式，删除preAnteOdd字段
      if (!(formData.value.nGameId === 175 && formData.value.shortPokerMode === 1)) {
        delete submitData.preAnteOdd
      }

      // 处理输钱超额将强制站起：直接提交选择的倍数值
      delete submitData.isTabkeOutForce
      if (formData.value.isTabkeOutForce === 0) {
        submitData.nLoseMaxAmount = 0
      }

      // 德州模式下，强制设置撤码相关字段为默认值
      if (formData.value.nGameId === 125) {
        submitData.isTabkeOut = false
        submitData.nTabkeOutOdd = 0
      }

      // 处理语音收费
      delete submitData.nVideoFeeCustom
      delete submitData.isVideoFee
      if (formData.value.isVideoFee) {
        if (showCustomVideoFee.value) {
          submitData.nVideoFee = formData.value.nVideoFeeCustom
        }
        // 如果开启但没有自定义，nVideoFee 保持原值
      } else {
        // 关闭时删除 nVideoFee 字段
        delete submitData.nVideoFee
      }

      // 处理手数限制
      delete submitData.isHandLimit
      delete submitData.nPoolHandsCustom
      if (formData.value.isHandLimit === 0) {
        submitData.nPoolHands = 0
      } else {
        if (showCustomHandLimit.value) {
          submitData.nPoolHands = formData.value.nPoolHandsCustom
        }
      }

      // 转换看牌配置为 nTableCost 格式
      // 直接传下拉框选择的值，不需要计算
      submitData.nTableCost = formData.value.cardConfigs.map((config, index) => {
        let costValue = 0
        if (config.open === 1) {
          // 如果是自定义值，使用 nCostCustom，否则使用 nCost
          if (showCustomCost.value[index]) {
            costValue = config.nCostCustom || 0
          } else {
            costValue = config.nCost || 0
          }
        }
        return {
          nId: index + 1,
          open: config.open,
          nCost: costValue
        }
      })

      delete submitData.cardConfigs

      let res
      if (props.type === 'add') {
        res = await createDeskTemplateApi(submitData)
      } else {
        res = await updateDeskTemplateApi(submitData)
      }

      btnLoading.value = false

      if (res.code === 0) {
        const successMessage =
          props.type === 'add'
            ? res.msg || t('HallTableDialog.Messages.CreateSuccess')
            : res.msg || t('HallTableDialog.Messages.UpdateSuccess')
        ElMessage.success(successMessage)
        handleClose()
        emit('confirm')
      }
    } catch (error) {
      btnLoading.value = false
      console.log('Form validation failed:', error)
    }
  }

  // 打开抽屉（供父组件调用，用于编辑时设置数据）
  const open = (data = {}) => {
    if (data && Object.keys(data).length > 0) {
      Object.keys(formData.value).forEach((key) => {
        if (data[key] !== undefined) {
          formData.value[key] = data[key]
        }
      })

      // 判断短牌模式：如果是短牌且有preAnteOdd，说明是庄位模式
      if (formData.value.nGameId === 175) {
        if (data.preAnteOdd && data.preAnteOdd > 0) {
          formData.value.shortPokerMode = 1 // 庄位模式
          formData.value.preAnteOdd = data.preAnteOdd
        } else {
          formData.value.shortPokerMode = 2 // 盲注模式
        }
      }

      // 根据前注值设置前注开关状态
      if (data.nPreAnte !== undefined && data.nPreAnte !== null) {
        if (data.nPreAnte === 0) {
          isPreAnteEnabled.value = false
        } else {
          isPreAnteEnabled.value = true
          // 判断是否为自定义值
          const preAnteValues = [2, 5, 10, 20]
          if (!preAnteValues.includes(data.nPreAnte)) {
            showCustomPreAnte.value = true
            formData.value.nPreAnteCustom = data.nPreAnte
            formData.value.nPreAnte = 'custom'
          }
        }
      }

      // 编辑时回显撤码配置
      if (data.isTabkeOut) {
        formData.value.nTabkeOutOdd = data.nTabkeOutOdd
        formData.value.isTabkeOut = true
      } else {
        formData.value.isTabkeOut = false
        formData.value.nTabkeOutOdd = 0
      }

      // 编辑时回显输钱超额将强制站起配置
      if (data.nLoseMaxAmount !== undefined && data.nLoseMaxAmount !== 0) {
        formData.value.isTabkeOutForce = 1
        formData.value.nLoseMaxAmount = data.nLoseMaxAmount
      } else {
        formData.value.isTabkeOutForce = 0
        formData.value.nLoseMaxAmount = 0
      }
      // 编辑时回显语音收费配置
      if (data.nVideoFee !== undefined && data.nVideoFee !== null && data.nVideoFee > 0) {
        formData.value.isVideoFee = true
        const videoFeeValues = [0.002, 0.25, 0.5]
        if (!videoFeeValues.includes(data.nVideoFee)) {
          showCustomVideoFee.value = true
          formData.value.nVideoFeeCustom = data.nVideoFee
          formData.value.nVideoFee = 'custom'
        } else {
          formData.value.nVideoFee = data.nVideoFee
        }
      } else {
        formData.value.isVideoFee = false
        formData.value.nVideoFee = 0.002 // 默认值
        formData.value.nVideoFeeCustom = 0
        showCustomVideoFee.value = false
      }

      // 编辑时回显手数限制配置
      if (data.nPoolHands !== undefined && data.nPoolHands !== null && data.nPoolHands > 0) {
        formData.value.isHandLimit = 1
        const handLimitValues = [50, 100, 200, 300, 500]
        if (!handLimitValues.includes(data.nPoolHands)) {
          showCustomHandLimit.value = true
          formData.value.nPoolHandsCustom = data.nPoolHands
          formData.value.nPoolHands = 'custom'
        } else {
          formData.value.nPoolHands = data.nPoolHands || 100
        }
      } else {
        formData.value.isHandLimit = 0
        formData.value.nPoolHands = 0
        formData.value.nPoolHandsCustom = 0
        showCustomHandLimit.value = false
      }

      // 编辑时回显看牌配置
      if (data.nTableCost && Array.isArray(data.nTableCost)) {
        data.nTableCost.forEach((item, index) => {
          if (index < formData.value.cardConfigs.length) {
            formData.value.cardConfigs[index].open = item.open || 0

            if (item.open === 1 && item.nCost > 0) {
              // 后端传来的就是倍率值，直接使用
              const costValue = item.nCost

              // 判断是否为预设值
              const presetValues = index < 2 ? [0.25, 0.5, 1, 2] : [0.5, 1, 1.5, 2]
              if (presetValues.includes(costValue)) {
                formData.value.cardConfigs[index].nCost = costValue
                showCustomCost.value[index] = false
              } else {
                // 自定义值
                formData.value.cardConfigs[index].nCost = 'custom'
                formData.value.cardConfigs[index].nCostCustom = costValue
                showCustomCost.value[index] = true
              }
            } else {
              formData.value.cardConfigs[index].nCost = 0
              formData.value.cardConfigs[index].nCostCustom = 0
              showCustomCost.value[index] = false
            }
          }
        })
      } else {
        // 没有看牌配置数据，重置为默认值
        formData.value.cardConfigs = createDefaultCardConfigs()
        showCustomCost.value = createCostVisibilityFlags()
      }
    } else {
      resetForm()
    }
    visible.value = true
  }

  defineExpose({
    open,
    resetForm
  })
</script>

<style scoped lang="scss">
  ::v-deep(.el-form-item__content) {
    margin-left: 0 !important;
  }
  .label-with-tooltip {
    display: flex;
    align-items: center;
    gap: 6px;

    .el-icon {
      color: #909399;
      cursor: help;

      &:hover {
        color: #409eff;
      }
    }
  }
</style>
