<template>
  <div id="userLayout" class="w-full h-full relative">
    <vue-particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="{
        fpsLimit: 60,
        interactivity: {
          detectsOn: 'canvas',
          events: {
            onClick: {
              enable: true,
              mode: 'push'
            },
            onHover: {
              enable: true,
              mode: 'grab'
            },
            resize: true
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.5,
              size: 40
            },
            push: {
              quantity: 4
            },
            grab: {
              distance: 200,
              duration: 0.4
            },
            attract: {
              distance: 200,
              duration: 0.4,
              factor: 5
            }
          }
        },
        particles: {
          color: {
            value: '#84A9BC'
          },
          links: {
            color: '#84A9BC',
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1
          },
          collisions: {
            enable: true
          },
          move: {
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
            bounce: false,
            direction: 'none',
            enable: true,
            out_mode: 'out',
            random: false,
            speed: 1,
            straight: false
          },
          number: {
            density: {
              enable: true,
              value_area: 800
            },
            value: 80
          },
          opacity: {
            value: 0.5
          },
          shape: {
            type: 'circle'
          },
          size: {
            random: true,
            value: 5
          }
        },
        detectRetina: true
      }"
    />

    <div class="centerC" :class="{ animate: isAnimate }">
      <el-icon style="cursor: pointer; margin-left: 5px; font-size: 22px; position: absolute; top: 20px; right: 20px">
        <Sort @click="dialogVisible = true" />
      </el-icon>

      <el-dialog v-model="dialogVisible" width="50%" style="background-color: #ffffff" center>
        <div style="color: #64748b; font-weight: 600; font-size: 18px">{{ $t('Login.PleaseSelectALanguage') }}</div>
        <template #footer>
          <div class="lang-switch">
            <el-button type="primary" @click="switchLang('zh-CN')" :class="{ active: currentLang === 'zh-CN' }">
              中文
            </el-button>
            <el-button type="primary" @click="switchLang('en')" :class="{ active: currentLang === 'en' }">
              English
            </el-button>
          </div>
        </template>
      </el-dialog>

      <h2 class="titleF">{{ $t('Login.SystemName') }}</h2>
      <el-form
        style="margin-top: 30px"
        ref="loginForm"
        :model="loginFormData"
        :rules="rules"
        :validate-on-rule-change="false"
        @keyup.enter="submitForm"
      >
        <el-form-item prop="username" class="mb-6">
          <el-input
            v-model="loginFormData.username"
            size="large"
            :placeholder="$t('Login.UsernamePlaceholder')"
            prefix-icon="Avatar"
            clearable
          />
        </el-form-item>
        <el-form-item prop="password" class="mb-6">
          <el-input
            v-model="loginFormData.password"
            show-password
            size="large"
            type="password"
            :placeholder="$t('Login.PasswordPlaceholder')"
            prefix-icon="WarningFilled"
            clearable
          />
        </el-form-item>

        <el-form-item prop="captcha" class="mb-6">
          <div class="captcha-wrapper">
            <el-input
              v-model="loginFormData.captcha"
              size="large"
              :placeholder="$t('Login.CaptchaPlaceholder') || '请输入验证码'"
              prefix-icon="Key"
              clearable
              style="flex: 1; margin-right: 12px"
            />
            <img
              v-if="picPath"
              :src="picPath"
              class="captcha-img"
              alt="captcha"
              @click="loginVerify"
              title="点击刷新验证码"
            />
          </div>
        </el-form-item>
        <el-form-item class="mb-6">
          <el-input
            v-model="loginFormData.googleCode"
            size="large"
            :placeholder="$t('Login.GooglePlaceholder')"
            prefix-icon="ChromeFilled"
            clearable
          />
        </el-form-item>
        <el-form-item class="mb-6">
          <el-checkbox
            v-model="IsPassword"
            :label="$t('Login.RememberAccountAndPassword')"
            @change="RememberPasswordFn"
            style="color: #8d9095; position: absolute; top: -10px; right: 0; font-weight: 600"
          ></el-checkbox>
        </el-form-item>

        <el-form-item class="mb-6">
          <el-button
            class="shadow shadow-active h-11 w-full btn"
            type="primary"
            size="large"
            @click="submitForm"
            style="margin-top: 30px"
          >
            {{ $t('Login.LoginBtn') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
  import { captcha } from '@/api/user'
  import { checkDB } from '@/api/initdb'
  import BottomInfo from '@/components/bottomInfo/bottomInfo.vue'
  import { reactive, ref, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/pinia/modules/user'
  import { Sort } from '@element-plus/icons-vue'

  defineOptions({
    name: 'Login'
  })

  const router = useRouter()
  // 新增：控制动画触发的状态
  const isAnimate = ref(false)

  // 验证函数
  const checkUsername = (rule, value, callback) => {
    if (value.length < 5) {
      return callback(new Error(t('Login.PleaseEnterTheCorrectUsername')))
    } else {
      callback()
    }
  }
  const checkPassword = (rule, value, callback) => {
    if (value.length < 6) {
      return callback(new Error(t('Login.PleaseEnterTheCorrectPassword')))
    } else {
      callback()
    }
  }

  // 密码失焦校验（还原原有代码）
  const handlePasswordBlur = () => {
    const password = loginFormData.password
    if (!password) {
      return
    }
    checkPasswordStrength(null, password, (error) => {
      if (error) {
        ElMessage({
          type: 'warning',
          message: error.message,
          showClose: true,
          duration: 3000
        })
      }
    })
  }

  // 密码自定义校验
  const checkPasswordStrength = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('请输入密码'))
    }
    if (value.length < 18) {
      return callback(new Error('密码长度不能少于18位'))
    }
    const hasNumber = /\d/.test(value)
    const hasLowerCase = /[a-z]/.test(value)
    const hasUpperCase = /[A-Z]/.test(value)
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)

    if (!hasNumber || !hasLowerCase || !hasUpperCase || !hasSpecialChar) {
      return callback(new Error('密码必须同时包含数字、大写字母、小写字母和特殊字符'))
    }
    callback()
  }

  // 获取验证码
  const loginVerify = async () => {
    const ele = await captcha()
    rules.captcha = [
      {
        max: ele.data.captchaLength,
        min: ele.data.captchaLength,
        message: `请输入${ele.data.captchaLength}位验证码`,
        trigger: 'blur'
      }
    ]
    picPath.value = ele.data.picPath
    captchaId.value = ele.data.captchaId
  }

  // 登录相关操作
  const loginForm = ref(null)
  const picPath = ref('')
  const captchaId = ref('')
  const loginFormData = reactive({
    username: localStorage.getItem('userName') || '',
    password: localStorage.getItem('password') || '',
    googleCode: '',
    captcha: '',
    captchaId: ''
  })

  let IsPassword = ref(false)
  const rules = reactive({
    username: [{ validator: checkUsername, trigger: 'blur' }],
    password: [{ validator: checkPassword, trigger: 'blur' }],
    captcha: []
  })

  const userStore = useUserStore()
  const login = async () => {
    const params = { ...loginFormData }
    params.captchaId = captchaId.value
    params.password = btoa(params.password)
    return await userStore.LoginIn(params)
  }
  const submitForm = () => {
    loginForm.value.validate(async (v) => {
      if (!v) return false
      const flag = await login()
      if (!flag) return false

      if (IsPassword.value) {
        localStorage.setItem('userName', loginFormData.username)
        localStorage.setItem('password', loginFormData.password)
      } else {
        localStorage.removeItem('userName')
        localStorage.removeItem('password')
      }
      return true
    })
  }

  // 跳转初始化
  const checkInit = async () => {
    const res = await checkDB()
    if (res.code === 0) {
      if (res.data?.needInit) {
        userStore.NeedInit()
        await router.push({ name: 'Init' })
      } else {
        ElMessage({
          type: 'info',
          message: '已配置数据库信息，无法初始化'
        })
      }
    }
  }

  import { loadFull } from 'tsparticles'
  const particlesInit = async (engine) => {
    await loadFull(engine)
  }

  const particlesLoaded = async (container) => {
    console.log('Particles container loaded', container)
  }

  import { useI18n } from 'vue-i18n'
  import { computed } from 'vue'
  import { throttle } from '@/utils/throttle'
  const { locale, t } = useI18n()

  const currentLang = computed(() => locale.value)

  const switchLang = throttle((lang) => {
    locale.value = lang
    localStorage.setItem('lang', lang)
    console.log(t('login.loginBtn'))

    ElMessage({
      message: t('GlobalUniversality.OperationSuccessful'),
      type: 'success'
    })
  }, 1000)

  const dialogVisible = ref(false)

  onMounted(async () => {
    // 新增：延迟触发动画，等待粒子背景加载完成
    setTimeout(() => {
      isAnimate.value = true
    }, 200)

    IsPassword.value = !!localStorage.getItem('userName') || !!localStorage.getItem('password')

    // 加载验证码
    try {
      await loginVerify()
    } catch (e) {
      console.warn('验证码加载失败，可手动点击刷新', e)
    }
  })

  const RememberPasswordFn = () => {}
</script>

<style lang="scss" scoped>
  .centerC {
    width: 760px;
    min-height: 620px;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -58%) scale(0.95) translateY(20px);
    opacity: 0;
    background: #ffffff;
    padding: 50px 60px 55px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    will-change: transform, opacity;
    backface-visibility: hidden;
    transition:
      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 0.6s ease 0.1s;
    box-shadow:
      0 2px 8px rgba(26, 45, 80, 0.06),
      0 12px 40px rgba(26, 45, 80, 0.12),
      0 0 0 1px rgba(212, 175, 55, 0.15) inset;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #1a2d50 0%, #d4af37 50%, #1a2d50 100%);
      background-size: 200% 100%;
      animation: goldSweep 3s ease-in-out infinite;
    }

    &::after {
      content: '';
      position: absolute;
      top: 18px;
      left: 50%;
      transform: translateX(-50%);
      width: 56px;
      height: 56px;
      background:
        radial-gradient(circle at 50% 38%, #d4af37 0%, #b8941f 40%, transparent 42%),
        linear-gradient(180deg, #1a2d50 0%, #0f1f3a 100%);
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      box-shadow:
        0 0 0 3px rgba(212, 175, 55, 0.25),
        0 8px 20px rgba(26, 45, 80, 0.25);
      opacity: 0.9;
      pointer-events: none;
    }

    &.animate {
      transform: translate(-50%, -58%) scale(1) translateY(0);
      opacity: 1;
      box-shadow:
        0 4px 16px rgba(26, 45, 80, 0.08),
        0 24px 64px rgba(26, 45, 80, 0.18),
        0 0 0 1px rgba(212, 175, 55, 0.2) inset;
    }

    .titleF {
      text-align: center;
      margin-top: 24px;
      margin-bottom: 8px;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 1px;
      background: linear-gradient(135deg, #1a2d50 0%, #2a4a80 50%, #d4af37 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      opacity: 0;
      transform: translateY(10px);
      transition:
        opacity 0.4s ease-out 0.2s,
        transform 0.4s ease-out 0.2s;
    }

    &.animate .titleF {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes goldSweep {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  :deep(.el-form) {
    opacity: 0;
    transform: translateY(15px);
    transition:
      opacity 0.4s ease-out 0.3s,
      transform 0.4s ease-out 0.3s;
    margin-top: 36px;
  }

  .centerC.animate :deep(.el-form) {
    opacity: 1;
    transform: translateY(0);
  }

  :deep(.el-form-item) {
    margin-bottom: 28px;

    &.mb-6 {
      margin-bottom: 28px;
    }
  }

  :deep(.el-input--large .el-input__wrapper) {
    padding: 2px 18px;
    height: 58px;
    margin-top: 0;
    font-size: 16px;
    border-radius: 10px;
    background: linear-gradient(180deg, #fafbfd 0%, #ffffff 100%);
    border: 1px solid #e3e8f0;
    box-shadow: 0 1px 2px rgba(26, 45, 80, 0.04) inset;
    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease,
      background 0.25s ease;

    &:hover {
      border-color: #a8b4cc;
      box-shadow:
        0 2px 8px rgba(26, 45, 80, 0.06),
        0 1px 2px rgba(26, 45, 80, 0.04) inset;
    }

    &.is-focus {
      border-color: #1a2d50;
      box-shadow:
        0 0 0 3px rgba(26, 45, 80, 0.1),
        0 2px 10px rgba(26, 45, 80, 0.08);
      background: #ffffff;
    }
  }

  :deep(.el-input--large .el-input__inner) {
    color: #1a2d50;
    font-weight: 500;

    &::placeholder {
      color: #94a3b8;
      font-weight: 400;
    }
  }

  :deep(.el-input__prefix-inner) {
    color: #1a2d50;
    opacity: 0.75;
  }

  .btn {
    height: 58px;
    margin-top: 12px;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 2px;
    border-radius: 10px;
    background: linear-gradient(135deg, #1a2d50 0%, #2a4a80 100%);
    border: 1px solid #1a2d50;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(212, 175, 55, 0.25) 50%,
        transparent 100%
      );
      transition: left 0.6s ease;
    }

    &:hover {
      transform: translateY(-2px);
      background: linear-gradient(135deg, #233a66 0%, #345a9a 100%);
      box-shadow:
        0 8px 24px rgba(26, 45, 80, 0.25),
        0 0 0 1px rgba(212, 175, 55, 0.35) inset;

      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(0);
    }
  }

  .lang-switch {
    margin-top: 10px;
  }

  :deep(.el-checkbox__inner) {
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 2px solid #c3cbe0;
    transition: all 0.2s ease;

    &:hover {
      border-color: #1a2d50;
    }
  }

  :deep(.el-checkbox.is-checked .el-checkbox__inner) {
    background: linear-gradient(135deg, #1a2d50 0%, #2a4a80 100%);
    border-color: #1a2d50;
    box-shadow: 0 0 0 3px rgba(26, 45, 80, 0.1);
  }

  :deep(.el-checkbox__inner::after) {
    width: 7px;
    height: 14px;
    border-color: #d4af37;
  }

  :deep(.el-checkbox__label) {
    font-size: 15px;
    color: #475569;
    font-weight: 500;
  }

  .captcha-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 14px;
  }

  :deep(.captcha-wrapper .el-input) {
    margin-right: 0 !important;
  }

  .captcha-img {
    width: 170px;
    height: 58px;
    margin-top: 0;
    border-radius: 10px;
    border: 1px solid #e3e8f0;
    cursor: pointer;
    object-fit: cover;
    background: linear-gradient(180deg, #fafbfd 0%, #f1f5fb 100%);
    box-shadow: 0 1px 3px rgba(26, 45, 80, 0.06);
    transition: all 0.25s ease;
    flex-shrink: 0;

    &:hover {
      border-color: #1a2d50;
      box-shadow:
        0 4px 14px rgba(26, 45, 80, 0.12),
        0 0 0 2px rgba(212, 175, 55, 0.2);
      transform: translateY(-1px);
    }
  }

  #userLayout {
    overflow: hidden;
  }
</style>
