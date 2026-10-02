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
        <!-- 房间配置 -->
        <p class="text-center font-medium">{{ $t('HallTableDialog.Divider.RoomConfig') }}</p>
      </el-divider>

      <el-row>
        <el-col :span="12">
          <!-- 牌桌名称 -->
          <el-form-item :label="$t('HallTableDialog.Fields.TableName.Label')" prop="sTableName">
            <!-- 请输入牌桌名称 -->
            <el-input
              v-model="formData.sTableName"
              :placeholder="$t('HallTableDialog.Fields.TableName.Placeholder')"
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
            <!-- 请选择分组 -->
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
            <!-- 请选择游戏 -->
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
            <!-- 请选择金币类型 -->
            <el-select
              v-model="formData.nGoldType"
              :placeholder="$t('HallTableDialog.Fields.GoldType.Placeholder')"
              style="width: 240px"
            >
              <el-option label="USDT" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <!-- 开桌数量 -->
          <el-form-item :label="$t('HallTableDialog.Fields.OpenCount.Label')" prop="nOpenCount">
            <!-- 请输入开桌数量 -->
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
            <!-- 请选择房间时长 -->
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
            <!-- 是/否 -->
            <el-switch
              v-model="formData.isAutomatic"
              inline-prompt
              :active-text="$t('HallTableDialog.Switch.Yes')"
              :inactive-text="$t('HallTableDialog.Switch.No')"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <!-- 私人房(密码房) -->
          <el-form-item :label="$t('HallTableDialog.Fields.PrivateRoom.Label')">
            <el-switch
              v-model="formData.nIsPerson"
              inline-prompt
              :active-text="$t('HallTableDialog.Switch.Yes')"
              :inactive-text="$t('HallTableDialog.Switch.No')"
              :active-value="1"
              :inactive-value="0"
            />
            <el-tooltip
              :content="$t('HallTableDialog.Tooltips.PrivateRoom')"
              placement="top"
              effect="dark"
            >
              <el-icon class="ml-2 cursor-help text-gray-500"><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="formData.nIsPerson === 1">
          <!-- 大厅可见 -->
          <el-form-item :label="$t('HallTableDialog.Fields.PrivateRoom.ShowInLobby')">
            <el-switch
              v-model="formData.nIsShow"
              inline-prompt
              :active-text="$t('HallTableDialog.Switch.Yes')"
              :inactive-text="$t('HallTableDialog.Switch.No')"
              :active-value="1"
              :inactive-value="0"
            />
            <el-tooltip
              :content="$t('HallTableDialog.Tooltips.PrivateRoomShowInLobby')"
              placement="top"
              effect="dark"
            >
              <el-icon class="ml-2 cursor-help text-gray-500"><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="formData.nIsPerson === 1">
        <el-col :span="24">
          <!-- 进房密码 -->
          <el-form-item :label="$t('HallTableDialog.Fields.PrivateRoom.Password')" prop="sPassWord">
            <el-input
              v-model="formData.sPassWord"
              :placeholder="$t('HallTableDialog.Fields.PrivateRoom.PasswordPlaceholder')"
              style="width: 240px"
              maxlength="6"
              show-word-limit
              type="password"
              show-password
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <!-- 实时音视频 -->
          <el-form-item :label="$t('HallTableDialog.Fields.RealtimeAV.Label')">
            <!-- 请选择 -->
            <el-select v-model="formData.isVideoFee" :placeholder="$t('HallTableDialog.Placeholder.Select')" style="width: 200px">
              <!-- 开启/关闭 -->
              <el-option :label="$t('HallTableDialog.Switch.Enable')" :value="true" />
              <el-option :label="$t('HallTableDialog.Switch.Disable')" :value="false" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 语音收费(U/分钟) -->
          <el-form-item :label="$t('HallTableDialog.Fields.VoiceFee.Label')" v-if="formData.isVideoFee">
            <!-- 请选择 -->
            <el-select
              v-model="formData.nVideoFee"
              :placeholder="$t('HallTableDialog.Fields.VoiceFee.Placeholder')"
              style="width: 150px"
            >
              <el-option v-for="item in nVideoFeeOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>


      <el-divider content-position="center">
        <!-- 俱乐部德州配置 -->
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
          <!-- 前注 -->
          <el-form-item :label="$t('HallTableDialog.Fields.AnteSwitch.Label')" prop="isPreAnteEnabled">
            <!-- 开/关 -->
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
            <!-- 请选择前注 -->
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
            <!-- 请选择倍率 -->
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

      <!-- 前注(自定义) -->
      <el-form-item v-if="showCustomPreAnte" :label="$t('HallTableDialog.Fields.AnteCustom.Label')" prop="nPreAnteCustom">
        <!-- 请输入前注 -->
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
          <!-- 小盲可手动输入 -->
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
        <!-- 请选择自动开始人数 -->
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
        <!-- 请输入最小值 -->
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
        <!-- 请输入最大值 -->
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
        <!-- 请选择入池率 -->
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
      <el-form-item
        :label="$t('HallTableDialog.Fields.PoolEntryRateHands.Label')"
        prop="nPoolEntryRateHands"
        label-width="170px"
      >
        <!-- 请输入 -->
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
            >
              <el-option v-for="item in nHandLimitOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <!-- 强制抓头 -->
        <el-form-item v-if="showForceZhuaTou" :label="$t('HallTableDialog.Fields.ForceBlind.Label')" prop="isForceBlind">
          <!-- 是/否 -->
          <el-switch
            v-model="formData.isForceBlind"
            inline-prompt
            :active-text="$t('HallTableDialog.Switch.Yes')"
            :inactive-text="$t('HallTableDialog.Switch.No')"
          />
        </el-form-item>
      </el-row>

      <el-divider content-position="center">
        <!-- 抽水设置 -->
        <p class="text-center font-medium">{{ $t('HallTableDialog.Divider.RakeSettings') }}</p>
      </el-divider>

      <!-- 抽水方式 -->
      <el-form-item :label="$t('HallTableDialog.Fields.RakeMethod.Label')" prop="nComputeMode">
        <!-- 请选择抽水方式 -->
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
        <!-- 请选择抽水类型 -->
        <el-select
          v-model="formData.nModeType"
          :placeholder="$t('HallTableDialog.Fields.RakeType.Placeholder')"
          style="width: 240px"
        >
          <el-option v-for="item in nComputeModeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <!-- 服务费比例 -->
      <el-form-item :label="$t('HallTableDialog.Fields.ServiceRate.Label')" prop="nTaxRate">
        <template #label>
          <div class="label-with-tooltip">
            <!-- 服务费比例 -->
            <span>{{ $t('HallTableDialog.Fields.ServiceRate.Label') }}</span>
            <el-tooltip :content="$t('HallTableDialog.Tooltips.ServiceRate')" placement="top" effect="light">
              <el-icon>
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
        <!-- 请输入服务费比例 -->
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
        <!-- 请输入封顶倍数 -->
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
        <!-- 请输入低于倍数 -->
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
        <!-- 看牌设置 -->
        <p class="text-center font-medium">{{ $t('HallTableDialog.Divider.CardSettings') }}</p>
      </el-divider>

      <template v-for="(cardConfig, index) in cardConfigOptions" :key="cardConfig.id || index">
        <el-row>
          <el-col :span="10">
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
            <el-form-item :label="$t('HallTableDialog.CardConfig.CustomLabel', { label: cardConfig.costLabel })" label-width="180px">
              <el-input-number
                v-model="formData.cardConfigs[index].nCostCustom"
                :placeholder="$t('HallTableDialog.Placeholder.InputCost', { label: cardConfig.costLabel })"
                style="width: 240px"
                :min="0.1"
                :step="0.1"
                :precision="2"
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
  import { clubTableConfigEditApi } from '@/api/dezhou/tableConfiguration'
  import { getGlobalGroupingApi } from '@/api/dezhou/global'
  import * as tableConfig from '../../tableConfig'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
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
  const headerTitle = computed(() => props.title || t('HallTableConfig.Dialog.EditTitle'))

  const formRef = ref(null)
  const btnLoading = ref(false)
  const showCustomPreAnte = ref(false)
  const isPreAnteEnabled = ref(false) // 前注开关状态

  const groupOptions = ref([])

  const gameOptions = computed(() => tableConfig.gameOptions(t))
  const nKeepTimeOptions = computed(() => tableConfig.nKeepTimeOptions(t))
  const nPreAnteOptions = computed(() => tableConfig.nPreAnteOptions(t))
  const nComputeModeOptions = computed(() => tableConfig.nComputeModeOptions(t))
  const magnificationOptions = computed(() => tableConfig.magnificationOptions(t))
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

  const isComputeModeJuChou = computed(() => formData.value.nModeType === 1)

  // 把抽且服务费比例为0
  const isComputeModeJuChouAndTaxRateIs0 = computed(
    () => formData.value.nModeType === 1 && formData.value.nTaxRate === 0
  )

  const showForceZhuaTou = computed(() => {
    if (formData.value.nGameId === 175) {
      return false
    }
    return true
  })

  // 表单数据
  const formData = ref({
    RadisKey: '', // 编辑时需要的字段
    key: '', // 编辑时需要的字段
    nClubId: null, // 俱乐部ID
    sTableName: '', // 牌桌名称
    nGroupId: null, // 分组
    nGameId: 125, // 游戏
    nOpenCount: 1, // 开桌数量
    nGoldType: 1, // USDT
    nKeepTime: 1800, // 默认1小时(分钟)
    nContinuedNum: 0, // 补开数量
    isAutomatic: false, // 超时自动续开
    IsOpen: true, // 自动开始
    shortPokerMode: 1, // 短牌模式：1-庄位模式，2-盲注模式
    nPreAnte: 0, // 前注
    nPreAnteCustom: 0, // 自定义前注
    nSmallBlind: 2, // 小盲
    nBigBlind: 4, // 大盲
    nCapacity: 6, // 牌桌人数
    nPlayerCnt: 2, // 自动开始人数
    nMinTabkeInBB: 20, // 带入筹码倍数最小值
    nMaxTabkeInBB: 200, // 带入筹码倍数最大值
    nTakeInLimit: 2, // 补码上限
    nPoolEntryRate: 0, // 入池率
    nPoolEntryRateHands: 0,
    nZhuaTou: 0, // 抓头数额
    nComputeMode: 1, // 抽水方式：按盈利比例
    nModeType: 1, // 抽水类型
    nTaxRate: 0, // 服务费比例
    nTopLimitBB: 0, // 封顶N个大盲倍数
    nLimitBB: 0, // 低于N倍大盲不抽水
    nTakeIn: 400, // 默认带入
    isDPreAnte: false, // 短牌--庄家是否要下两倍前注
    isForceBlind: true, // 强制抓头开关
    preAnteOdd: 2, // 前注倍数
    isTabkeOutForce: 0, //止损上限 1:开启 0:关闭
    nLoseMaxAmount: 0, // 输钱限制金额倍数
    isTabkeOut: false, // 是否可撤码 1:开启 0:关闭
    nTabkeOutOdd: 4, // 撤码倍数
    nInsureMode: 1, //保险模式-暂无字段-默认传1
    isVideoFee: false, // 实时音视频开关
    nVideoFee: 0.002, // 语音收费
    isHandLimit: 0, // 手数限制开关 0:关闭 1:开启
    nPoolHands: 100, // 手数限制值
    // 看牌配置数组
    cardConfigs: createDefaultCardConfigs(),
    isDelayLook: false, // 延迟看牌开关
    nIsPerson: 0, // 是否私人房：0 否，1 是
    sPassWord: '', // 私人房密码（6位数字）
    nIsShow: 1 // 是否在大厅可见：0 否，1 是
  })

  const buildRequiredMessage = (labelKey) => {
    const prefix = t('HallTableDialog.Placeholder.Input')
    const label = t(labelKey)
    const separator = /[a-zA-Z]$/.test(prefix) ? ' ' : ''
    return `${prefix}${separator}${label}`
  }

  const rules = computed(() => ({
    sTableName: [{ required: true, message: t('HallTableDialog.Validation.TableNameRequired'), trigger: 'blur' }],
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
    ],
    sPassWord: [
      {
        validator: (rule, value, callback) => {
          if (formData.value.nIsPerson === 1) {
            if (!value) {
              callback(new Error(t('HallTableDialog.Validation.PrivateRoomPasswordRequired')))
            } else if (!/^\d{6}$/.test(value)) {
              callback(new Error(t('HallTableDialog.Validation.PrivateRoomPasswordFormat')))
            } else {
              callback()
            }
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ]
  }))

  // 获取分组列表
  const getGroupOptions = async () => {
    try {
      const res = await getGlobalGroupingApi()
      if (res.code === 0) {
        groupOptions.value = res.data.list || []
      }
    } catch (error) {
      console.error('获取分组列表失败:', error)
    }
  }

  const handlePreAnteChange = (val) => {
    if (val === 'custom') {
      showCustomPreAnte.value = true
      formData.value.nPreAnte = formData.value.nPreAnteCustom || 0
    } else {
      showCustomPreAnte.value = false
      formData.value.nPreAnte = val
    }
  }



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

  // 监听实时音视频开关变化
  watch(
    () => formData.value.isVideoFee,
    (val) => {
      if (!val) {
        formData.value.nVideoFee = 0
      } else {
        formData.value.nVideoFee = 0.002
      }
    }
  )

  // 监听手数限制开关变化
  watch(
    () => formData.value.isHandLimit,
    (val) => {
      if (val === 0) {
        formData.value.nPoolHands = 0
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

  // 监听是否私人房变化
  watch(
    () => formData.value.nIsPerson,
    (val) => {
      if (val === 0) {
        // 关闭私人房时清空密码
        formData.value.sPassWord = ''
        formData.value.nIsShow = 1
      } else {
        // 开启私人房时，默认设置大厅可见为可见
        if (formData.value.nIsShow === undefined || formData.value.nIsShow === null) {
          formData.value.nIsShow = 1
        }
      }
    }
  )

  const resetForm = () => {
    formData.value = {
      RadisKey: '',
      key: '',
      nClubId: null,
      sTableName: '',
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
      nTakeIn: 400,
      isDPreAnte: false,
      isForceBlind: true,
      preAnteOdd: 2,
      isTabkeOutForce: 0, //止损上限 1:开启 0:关闭
      nLoseMaxAmount: 0,
      isTabkeOut: false,
      nTabkeOutOdd: 4,
      nInsureMode: 1, //保险模式-暂无字段-默认传1
      isVideoFee: false,
      nVideoFee: 0.002,
      isHandLimit: 0,
      nPoolHands: 100,
      // 看牌配置数组
      cardConfigs: createDefaultCardConfigs(),
      isDelayLook: false, // 延迟看牌开关
      nIsPerson: 0, // 是否私人房：0 否，1 是
      sPassWord: '', // 私人房密码（6位数字）
      nIsShow: 1 // 是否在大厅可见：0 否，1 是
    }
    showCustomPreAnte.value = false
    isPreAnteEnabled.value = false // 重置前注开关
    showCustomCost.value = createCostVisibilityFlags() // 重置自定义显示状态
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

      // 如果是自定义前注，使用自定义值
      if (showCustomPreAnte.value) {
        submitData.nPreAnte = formData.value.nPreAnteCustom
      }

      // 删除自定义前注字段，不需要提交
      delete submitData.nPreAnteCustom

      delete submitData.shortPokerMode // 短牌模式字段不提交到后端

      // 如果不是短牌庄位模式，删除preAnteOdd字段
      if (!(formData.value.nGameId === 175 && formData.value.shortPokerMode === 1)) {
        delete submitData.preAnteOdd
      }

      delete submitData.isTabkeOutForce

      // 德州模式下，强制设置撤码相关字段为默认值
      if (formData.value.nGameId === 125) {
        submitData.isTabkeOut = false
        submitData.nTabkeOutOdd = 0
      }

      // 实时音频关闭时，删除 nVideoFee 字段
      if (!formData.value.isVideoFee) {
        delete submitData.nVideoFee
      }
      delete submitData.isVideoFee

      delete submitData.isHandLimit
      if (formData.value.isHandLimit === 0) {
        submitData.nPoolHands = 0
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

      // 处理私人房字段
      if (submitData.nIsPerson === 0 || !submitData.nIsPerson) {
        // 非私人房时，确保 nIsPerson 为 0
        submitData.nIsPerson = 0
        submitData.sPassWord = ''
        submitData.nIsShow = 1
      } else {
        // 私人房：确保字段类型正确
        submitData.nIsPerson = 1
        // 按项目约束：密码字段必须 Base64(btoa) 编码后提交，与游戏客户端 WS 链路保持一致
        if (submitData.sPassWord && submitData.sPassWord !== '') {
          const rawPass = submitData.sPassWord
          submitData.sPassWord = btoa(unescape(encodeURIComponent(rawPass)))
          console.log('[密码房] HTTP后台配置编辑：明文密码=' + rawPass + ' | Base64后=' + submitData.sPassWord)
        }
        // nIsShow 不传时服务端按 1 处理，这里确保有值
        if (submitData.nIsShow === undefined || submitData.nIsShow === null || submitData.nIsShow === '') {
          submitData.nIsShow = 1
        }
      }

      const res = await clubTableConfigEditApi(submitData)

      btnLoading.value = false

      if (res.code === 0) {
        ElMessage.success(res.data?.msg || t('GlobalUniversality.OperationSuccessful'))
        handleClose()
        emit('confirm')
      }
    } catch (error) {
      btnLoading.value = false
      console.log('表单验证失败:', error)
    }
  }

  // 打开抽屉（供父组件调用，用于编辑时设置数据）
  const open = (row) => {
    getGroupOptions()

    if (row && row.value) {
      try {
        // 判断 row.value 是对象还是字符串
        const data = typeof row.value === 'string' ? JSON.parse(row.value) : row.value
        const flattenData = {
          nClubId: row?.nClubId,
          RadisKey: row?.redisKey,
          key: row?.key,
          nGroupId: row?.nGroupId,
          nGameId: row?.nGameId,
          sTableName: row?.name,
          nOpenCount: data.nOpenCount,
          nGoldType: data.tRoomConfig?.nGoldType,
          nKeepTime: data.tRoomConfig?.nKeepTime,
          isAutomatic: data.isAutomatic,
          nContinuedNum: data.nContinuedNum,
          nSmallBlind: data.tRoomConfig?.nSmallBlind,
          nBigBlind: data.tRoomConfig?.nBigBlind,
          nPreAnte: data.tRoomConfig?.nPreAnte,
          nTakeIn: data.tRoomConfig?.nTakeIn,
          nCapacity: data.tRoomConfig?.nCapacity,
          IsOpen: data.tRoomConfig?.tAutostart?.IsOpen,
          nPlayerCnt: data.tRoomConfig?.tAutostart?.nPlayerCnt,
          nMinTabkeInBB: data.tRoomConfig?.nMinTabkeInBB,
          nMaxTabkeInBB: data.tRoomConfig?.nMaxTabkeInBB,
          nTakeInLimit: data.tRoomConfig?.nTakeInLimit,
          nPoolEntryRate: data.tRoomConfig?.nPoolEntryRate,
          nPoolEntryRateHands: data.tRoomConfig?.nPoolEntryRateHands,
          nLoseMaxAmount: data.tRoomConfig?.nLoseMaxAmount,
          nZhuaTou: data.tRoomConfig?.nZhuaTou,
          nModeType: data.tRoomConfig?.tDrawWaterMode?.nModeType,
          nTaxRate: data.tRoomConfig?.tDrawWaterMode?.nTaxRate,
          nTopLimitBB: data.tRoomConfig?.tDrawWaterMode?.nTopLimitBB,
          nLimitBB: row?.nLimitBB,
          nComputeMode: data.tRoomConfig?.tDrawWaterMode?.nComputeMode,
          isDPreAnte: data.tRoomConfig?.isDPreAnte,
          nTabkeOutOdd: data.tRoomConfig?.nTabkeOutOdd || 0,
          isTabkeOut: data.tRoomConfig?.isTabkeOut || false,
          isDelayLook: data.tRoomConfig?.isDelayLook || false,
          nIsPerson: data.tRoomConfig?.nIsPerson || 0,
          sPassWord: (() => { try { return data.tRoomConfig?.sPassWord && data.tRoomConfig.sPassWord !== '' ? decodeURIComponent(escape(atob(data.tRoomConfig.sPassWord))) : (data.tRoomConfig?.sPassWord || '') } catch(e) { return data.tRoomConfig?.sPassWord || '' } })(),
          nIsShow: data.tRoomConfig?.nIsShow !== undefined ? data.tRoomConfig.nIsShow : 1
        }

        Object.keys(formData.value).forEach((key) => {
          if (flattenData[key] !== undefined && flattenData[key] !== null) {
            formData.value[key] = flattenData[key]
          }
        })

        // 根据nZhuaTou推算isForceZhuaTou状态
        if (formData.value.nZhuaTou > 0 && formData.value.nBigBlind > 0) {
          formData.value.isForceBlind = formData.value.nZhuaTou === formData.value.nBigBlind * 2
        } else {
          formData.value.isForceBlind = false
        }

        // 处理前注开关和值
        if (formData.value.nPreAnte !== undefined && formData.value.nPreAnte !== null) {
          if (formData.value.nPreAnte === 0) {
            isPreAnteEnabled.value = false
          } else {
            isPreAnteEnabled.value = true
            // 判断是否为自定义值
            const preAnteValues = [2, 5, 10, 20]
            if (!preAnteValues.includes(formData.value.nPreAnte)) {
              showCustomPreAnte.value = true
              formData.value.nPreAnteCustom = formData.value.nPreAnte
              formData.value.nPreAnte = 'custom'
            }
          }
        }

        // 判断短牌模式：如果是短牌且有preAnteOdd，说明是庄位模式
        if (formData.value.nGameId === 175) {
          if (data.tRoomConfig?.preAnteOdd && data.tRoomConfig?.preAnteOdd > 0) {
            formData.value.shortPokerMode = 1 // 庄位模式
            formData.value.preAnteOdd = data.tRoomConfig.preAnteOdd
          } else {
            formData.value.shortPokerMode = 2 // 盲注模式
          }
        }

        // 短牌庄位模式并开启了前注，设置preAnteOdd的回显值
        if (formData.value.nGameId === 175 && formData.value.shortPokerMode === 1 && formData.value.nPreAnte !== 0) {
          formData.value.preAnteOdd = data.tRoomConfig?.preAnteOdd || 2
        }

        // 编辑时回显撤码配置
        if (flattenData.isTabkeOut) {
          formData.value.isTabkeOut = true
          formData.value.nTabkeOutOdd = flattenData.nTabkeOutOdd
        } else {
          formData.value.isTabkeOut = false
          formData.value.nTabkeOutOdd = 0
        }

        // 编辑时回显输钱超额将强制站起配置
        if (flattenData.nLoseMaxAmount !== undefined && flattenData.nLoseMaxAmount !== 0) {
          formData.value.isTabkeOutForce = 1
          formData.value.nLoseMaxAmount = flattenData.nLoseMaxAmount
        } else {
          formData.value.isTabkeOutForce = 0
          formData.value.nLoseMaxAmount = 0
        }

        // 编辑时回显语音收费配置
        const videoFee = data.tRoomConfig?.nVideoFee
        if (videoFee !== undefined && videoFee !== null && videoFee > 0) {
          formData.value.isVideoFee = true
          formData.value.nVideoFee = videoFee
        } else {
          formData.value.isVideoFee = false
          formData.value.nVideoFee = 0.002 // 默认值
        }

        // 编辑时回显手数限制配置
        const poolHands = data.tRoomConfig?.nPoolHands
        if (poolHands !== undefined && poolHands !== null && poolHands > 0) {
          formData.value.isHandLimit = 1
          formData.value.nPoolHands = poolHands
        } else {
          formData.value.isHandLimit = 0
          formData.value.nPoolHands = 0
        }

        // 编辑时回显看牌配置
        if (data.tRoomConfig?.nTableCost && Array.isArray(data.tRoomConfig.nTableCost)) {
          data.tRoomConfig.nTableCost.forEach((item, index) => {
            if (index < 3) {
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
      } catch (error) {
        console.error('解析数据失败:', error)
        ElMessage.error(t('HallTableDialog.Messages.DataParseError'))
        return
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
