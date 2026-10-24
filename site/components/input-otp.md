# 验证码输入 InputOtp

<p class="page-desc"><code>type="filled"</code> 对应 Arco VerificationCode，默认 outlined 保留 Element Plus 形态。 属性用法见 <a href="https://element-plus.org/zh-CN/component/input-otp.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 填充式验证码

`type="filled"` 对应 Arco 的填充格子，`size` 控制尺寸。

::: demo input-otp/basic
:::

## 其他形态

outlined 和 underlined 在 Arco 中没有对应项，保留 Element Plus 形态。

::: demo input-otp/types
:::

## 与 Arco 的差异

- 格子固定间距，不像 Arco 按容器宽度平均分布。
- 聚焦已填格子的行为保留 Element Plus；outlined 和 underlined 没有 Arco 对应项。
