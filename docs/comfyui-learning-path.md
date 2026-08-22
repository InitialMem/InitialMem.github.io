# ComfyUI 完整学习路径

> 从零基础到专业级AI绘画工程师的系统化学习指南

---

## 目录

- [阶段一：基础预备知识](#阶段一基础预备知识)
- [阶段二：ComfyUI 核心概念](#阶段二comfyui-核心概念)
- [阶段三：模型生态](#阶段三模型生态)
- [阶段四：进阶工作流构建](#阶段四进阶工作流构建)
- [阶段五：高级技术](#阶段五高级技术)
- [阶段六：专业应用](#阶段六专业应用)
- [学习资源汇总](#学习资源汇总)

---

## 阶段一：基础预备知识

> 在使用 ComfyUI 之前，需要理解底层技术原理，这样才能真正驾驭工具而非盲目操作。

---

### 1.1 Python 基础

#### 是什么
Python 是 ComfyUI 的开发语言，也是整个 AI 生态的核心语言。

#### 为什么学
- ComfyUI 本身是 Python 项目，理解 Python 能让你读懂源码、排查问题
- 自定义节点开发必须使用 Python
- 遇到报错时能快速定位问题
- 能编写自动化脚本批量处理任务

#### 需要掌握的内容
| 知识点 | 重要程度 | 用途 |
|--------|----------|------|
| 变量、数据类型、流程控制 | ⭐⭐⭐⭐⭐ | 理解节点参数配置 |
| 函数定义与调用 | ⭐⭐⭐⭐⭐ | 自定义节点开发 |
| 类与面向对象 | ⭐⭐⭐⭐⭐ | 理解 ComfyUI 节点架构 |
| 字典、列表操作 | ⭐⭐⭐⭐⭐ | 处理工作流 JSON 数据 |
| 文件读写 | ⭐⭐⭐⭐ | 模型文件管理、配置读取 |
| 虚拟环境（venv/conda） | ⭐⭐⭐⭐ | 环境隔离与依赖管理 |
| pip 包管理 | ⭐⭐⭐⭐ | 安装 ComfyUI 依赖 |
| 异常处理（try/except） | ⭐⭐⭐ | 调试自定义节点 |
| 装饰器 | ⭐⭐⭐ | 理解 ComfyUI 节点注册机制 |

#### 学习建议
- 不需要成为 Python 专家，但需要能读懂和编写中等复杂度的代码
- 推荐学习时间：1-2 周

---

### 1.1.1 PyTorch 基础（ComfyUI 的运行时框架）

#### 是什么
PyTorch 是 ComfyUI 底层的深度学习框架，所有模型加载、张量运算、GPU 加速都依赖它。

#### 为什么学
- ComfyUI 内部所有数据都是 PyTorch Tensor
- 自定义节点开发必须操作 Tensor
- 理解 GPU/CPU 数据迁移才能优化性能
- 排查类型错误、设备错误等常见问题

#### 必须掌握的 PyTorch 概念

**Tensor 创建与操作**
```python
import torch

# 创建张量
t = torch.zeros(1, 4, 64, 64)        # 空白 Latent 形状
img = torch.randn(1, 512, 512, 3)     # 随机图像 [B, H, W, C]

# 设备迁移（GPU ↔ CPU）
t = t.to("cuda")                      # 移到 GPU
t = t.to("cpu")                       # 移回 CPU
t = t.to("cuda:1")                    # 多 GPU 指定设备

# 数据类型转换
t = t.half()                          # 转 FP16（半精度）
t = t.float()                         # 转 FP32（全精度）
t = t.bfloat16()                      # 转 BF16

# 形状操作
t = t.permute(0, 3, 1, 2)            # [B,H,W,C] → [B,C,H,W]
t = t.reshape(1, 4, -1)              # 重塑形状
t = t.unsqueeze(0)                    # 增加一个维度
t = t.squeeze(0)                      # 减少一个维度

# 切片操作（类似 NumPy）
patch = img[:, 100:200, 100:200, :]   # 裁切区域
```

**ComfyUI 中的 Tensor 形状约定**
| 数据类型 | 形状 | 说明 |
|----------|------|------|
| IMAGE | [B, H, W, C] | 通道在最后，值域 0.0-1.0 |
| LATENT | dict, samples=[B, C, H, W] | 通道在前，C=4 |
| MASK | [B, H, W] | 无通道维度 |
| CLIP 输出 | [B, 77, 768] 或 [B, 77, 1280] | Token 序列 |

**Autograd（自动微分）**
```python
# 训练时需要梯度
x = torch.randn(1, requires_grad=True)
y = x ** 2
y.backward()  # 自动计算梯度

# 推理时不需要梯度（节省显存）
with torch.no_grad():
    result = model(input_tensor)
```

**常见错误与排查**
| 错误 | 原因 | 解决方案 |
|------|------|----------|
| `CUDA out of memory` | 显存不足 | 减小分辨率/Batch Size，使用 --lowvram |
| `Expected all tensors to be on the same device` | 设备不一致 | 检查 .to("cuda") 是否遗漏 |
| `dtype mismatch` | 数据类型不匹配 | 统一使用 .half() 或 .float() |
| `size mismatch` | 形状不兼容 | 检查输入图像分辨率是否匹配模型要求 |

---

### 1.2 深度学习基础概念

#### 是什么
深度学习是 AI 绘画的理论基础，Stable Diffusion 就是一种深度学习模型。

#### 为什么学
- 理解模型推理过程，知道每个参数在做什么
- 理解为什么某些设置会产生特定效果
- 出现问题时能从原理层面分析原因
- 为后续理解模型架构打下基础

#### 需要掌握的核心概念

**神经网络基础**
- **神经元与层**：理解信息如何在网络中流动
- **激活函数**：ReLU、SiLU、GELU 等，影响模型表达能力
- **前向传播**：输入如何变成输出
- **反向传播与梯度**：理解模型如何学习（训练时重要）

**张量（Tensor）**
- **是什么**：多维数组，是深度学习中数据的基本表示形式
- **维度概念**：标量(0D) → 向量(1D) → 矩阵(2D) → 3D/4D 张量
- **在 AI 绘画中**：图像被表示为 [Batch, Channel, Height, Width] 的 4D 张量
- **潜空间张量**：Latent 是压缩后的图像表示，通常是 [1, 4, 64, 64]

**注意力机制（Attention）**
- **Self-Attention**：让模型关注图像中不同区域之间的关系
- **Cross-Attention**：让模型将文本信息与图像信息关联
- **为什么重要**：这是文本控制图像生成的核心机制
- **在 ComfyUI 中**：理解 Cross Attention 能帮助你写更好的提示词

**扩散模型基础（必须深入理解）**

**前向扩散（Forward Diffusion）**
- 给干净图像逐步添加高斯噪声，经过 T 步后变成纯噪声
- 数学公式：`x_t = √(ᾱ_t) * x_0 + √(1 - ᾱ_t) * ε`
  - `x_0`：原始干净图像
  - `x_t`：第 t 步的噪声图像
  - `ᾱ_t`（alpha_cumprod）：累积噪声系数，从 1 逐渐减小到 0
  - `ε`：标准高斯噪声 N(0,1)
- **关键理解**：任意时间步的噪声图像可以直接从原图计算，不需要逐步迭代

**反向去噪（Reverse Denoising）**
- 从纯噪声 x_T 出发，逐步去除噪声恢复出清晰图像
- 模型（U-Net/Transformer）预测的是噪声 ε，而非直接预测图像
- 去噪公式：`x_{t-1} = (1/√α_t) * (x_t - (β_t/√(1-ᾱ_t)) * ε_θ(x_t, t)) + σ_t * z`
  - `ε_θ`：模型预测的噪声
  - `z`：随机噪声（某些采样器不需要）

**噪声调度（Noise Schedule）**
- 控制每步添加多少噪声的策略
- **Beta Schedule 类型**：
  - `linear`：线性从 β_start 到 β_end（经典方法）
  - `scaled_linear`：缩放线性（SD 默认）
  - `cosine`：余弦调度，中间步骤噪声更均匀
  - `sqrt`：平方根调度
- **Alpha Cumprod（ᾱ_t）**：
  - 这是最关键的数值，决定每一步的信噪比
  - ᾱ_t 接近 1 = 几乎无噪声（干净图像）
  - ᾱ_t 接近 0 = 几乎纯噪声
  - 在 ComfyUI 中可通过 `ModelSamplingDiscreteDistortion` 等节点查看

**时间步（Timestep）**
- SD 使用 1000 个时间步（0-999）
- t=999：纯噪声
- t=0：干净图像
- `start_at_step` / `end_at_step` 参数控制采样范围
- 图生图中 denoise=0.5 等价于从 t=500 开始采样

**采样器数学原理（简要）**
- **DDPM**：原始方法，每步加随机噪声，较慢
- **DDIM**：确定性采样，可跳步，速度快
- **DPM-Solver**：基于微分方程的求解器，20步即可高质量
- **Euler**：一阶欧拉方法，简单快速
- **UniPC**：统一预测-校正方法，少步数效果极好

---

### 1.3 图像处理基础

#### 是什么
理解数字图像的基本原理，这是所有图像生成和处理的前提。

#### 为什么学
- 正确设置输出分辨率
- 理解色彩空间对生成效果的影响
- 处理图像时知道各操作的含义
- 避免常见的图像质量问题（如色彩偏移、伪影等）

#### 需要掌握的内容

**分辨率与尺寸**
- 像素（Pixel）：图像的最小单位
- 常见分辨率：512×512（SD1.5）、1024×1024（SDXL）
- 宽高比（Aspect Ratio）：影响构图效果
- 潜空间分辨率：VAE 编码后尺寸缩小 8 倍
- **最佳实践**：SD1.5 使用 512×512 或 512×768，SDXL 使用 1024×1024 或 896×1152

**色彩空间**
- **RGB**：红绿蓝三通道，屏幕显示用
- **HSV/HSL**：色相、饱和度、亮度，调整颜色更直观
- **LAB**：感知均匀色彩空间，用于高级色彩调整
- **RGBA**：带 Alpha 透明通道的 RGB

**图像格式**
- PNG：无损压缩，支持透明通道，适合中间处理
- JPEG：有损压缩，文件小，适合最终输出
- WebP：兼顾质量和体积
- EXR：高动态范围，专业图像处理用

**常用图像操作**
- 缩放（Resize）：不同插值算法效果不同（最近邻、双线性、双三次）
- 裁剪（Crop）：调整构图
- 翻转/旋转：数据增强
- 通道操作：通道分离/合并、颜色空间转换

---

### 1.4 Stable Diffusion 原理

#### 是什么
Stable Diffusion 是目前最流行的开源 AI 图像生成模型，ComfyUI 主要围绕它构建。

#### 为什么学
- ComfyUI 的所有节点都是 SD 流程的可视化映射
- 理解 SD 流程才能构建正确的工作流
- 知道每个环节的作用才能有针对性地调优

#### SD 核心架构（必须深入理解）

**CLIP 文本编码器（Text Encoder）**
- **作用**：将文本提示词转换为模型能理解的数值向量（Embedding）
- **原理**：CLIP 是一个经过海量图文对训练的模型，理解"文字-图像"的语义关系
- **工作方式**：
  1. 将提示词拆分为 Token（词元）
  2. 每个 Token 被映射为一个 768 维（SD1.5）或 1280 维（SDXL）的向量
  3. 最终得到一个 [2, 77, 768] 的张量（2 个 CLIP 编码器的输出合并）
- **在 ComfyUI 中**：对应 `CLIP Text Encode` 节点
- **Token 限制**：SD1.5 约 75 个 Token，SDXL 约 150 个 Token

**U-Net / Transformer（噪声预测器）**
- **作用**：预测图像中的噪声，是整个生成过程的核心
- **U-Net 结构（SD1.5/SDXL）**：
  - 编码器（下采样）→ 瓶颈层 → 解码器（上采样）
  - Skip Connections：保留细节信息
  - ResNet 块 + Attention 块交替
- **DiT 结构（SD3/Flux）**：
  - 使用 Transformer 替代 U-Net
  - 注意力机制更强大，生成质量更高
- **在 ComfyUI 中**：内置于 Checkpoint 模型中，对应 KSampler 的去噪过程

**VAE（变分自编码器）**
- **编码器**：将像素空间图像压缩到潜空间（512×512 → 64×64×4）
- **解码器**：将潜空间数据还原为像素空间图像
- **为什么需要**：
  - 大幅减少计算量（像素空间操作量是潜空间的 64 倍）
  - 使模型能在消费级显卡上运行
- **VAE 质量影响**：色彩还原、细节清晰度
- **在 ComfyUI 中**：对应 `VAE Encode` 和 `VAE Decode` 节点

**采样器（Sampler）**
- **作用**：控制从噪声到图像的去噪过程
- **原理**：去噪是一个迭代过程，采样器决定了每步如何从噪声中恢复图像
- **在 ComfyUI 中**：对应 `KSampler` 节点

#### SD 生成流程（完整链路）

**基础文生图流程**
```
文本提示词
    ↓
[CLIP 文本编码器] → 文本向量（Conditioning）
    ↓
[初始噪声生成] → 随机噪声 Latent
    ↓
[采样器 + U-Net] → 迭代去噪（Steps 次）
    ↓
[去噪后的 Latent]
    ↓
[VAE 解码器] → 最终图像
    ↓
保存/显示
```

**SDXL 两阶段流程（Base + Refiner）**
```
第一阶段：Base 模型
    文本提示词 → [双 CLIP 编码器] → 条件向量
    空白噪声 → [Base U-Net 去噪 (step 0→N)] → 中间 Latent
    
第二阶段：Refiner 模型（可选）
    中间 Latent → [Refiner U-Net 去噪 (step N→0)] → 精修 Latent
    精修 Latent → [VAE 解码] → 高质量图像
```
- Base 模型负责整体结构和构图
- Refiner 模型负责细节精修和纹理增强
- 切换点通常在 0.8-0.9（即 Base 完成 80-90% 的去噪）
- 在 ComfyUI 中使用两个 KSampler 串联，第二个 denoise 设为 0.1-0.2

**Flux 架构流程**
```
文本提示词
    ├→ [CLIP ViT-L] → 粗粒度文本特征
    └→ [T5-XXL (4.7B)] → 细粒度文本特征（支持 512 Token）
        ↓
    [DiT Blocks (Transformer)]
        ├→ 文本-图像交叉注意力
        └→ 图像自注意力
        ↓
    [去噪后的 Latent]
        ↓
    [FLUX VAE 解码] → 最终图像（1024×1024+）
```
- Flux 使用 T5-XXL 文本编码器，Token 限制高达 512 个（远超 SD1.5 的 75 个）
- Flux 的 Latent 通道数为 16（SD1.5/SDXL 为 4）
- Flux 使用 `Guidance`（distilled guidance）替代传统 CFG
- Flux Schnell 仅需 4 步即可出图（使用蒸馏技术）

#### 关键参数解释
| 参数 | 作用 | 推荐值 |
|------|------|--------|
| Steps（采样步数） | 去噪迭代次数，越多越精细 | 20-30 |
| CFG Scale | 提示词引导强度 | 5-8 |
| Sampler | 采样算法 | euler, dpmpp_2m, dpmpp_sde |
| Scheduler | 噪声调度策略 | karras, normal, sgm_uniform |
| Seed | 随机种子，控制生成一致性 | 固定值用于复现 |
| CLIP Skip | 跳过 CLIP 最后 N 层 | 1（不跳过）或 2（动漫常用） |

#### CFG Scale 数学原理
```
无分类器引导（Classifier-Free Guidance）原理：

模型同时预测两个噪声：
  ε_uncond = model(x_t, t, ∅)        ← 无条件预测（空提示词）
  ε_cond   = model(x_t, t, c)        ← 有条件预测（你的提示词）

最终预测噪声：
  ε_final = ε_uncond + cfg_scale × (ε_cond - ε_uncond)

通俗理解：
- cfg=1.0：完全忽略提示词（等于没有引导）
- cfg=7.0：提示词影响力中等（推荐）
- cfg=15.0：强制严格遵循提示词（容易过饱和）
- cfg=30.0：极度遵循（通常会崩图）

Flux 特殊说明：
Flux 不使用传统 CFG，而是通过 FluxGuidance 节点控制引导强度
Flux 的 guidance 默认 3.5，范围 0-10
```

#### CLIP Skip 参数详解
```
是什么：跳过 CLIP 文本编码器最后 N 层，只使用前面层的输出
为什么：不同层捕获不同粒度的语义信息
  - 最后几层：细粒度、字面意义
  - 中间层：粗粒度、语义概念

使用方式：
- CLIP Skip = 1（默认）：使用全部层，最忠实于提示词
- CLIP Skip = 2：跳过最后 1 层，动漫风格常用，效果更"概念化"
- CLIP Skip = 3-4：更抽象的语义理解

在 ComfyUI 中：
- CheckpointLoaderSimple 不直接暴露 CLIP Skip
- 使用 CLIPLoader 节点可以设置 clip_name + type
- 或使用 "CLIP Set Last Layer" 节点精确控制

推荐：
- 写实/照片风格：CLIP Skip = 1
- 动漫/二次元：CLIP Skip = 2
- SDXL/Flux：通常 CLIP Skip = 1（架构不同，效果不明显）
```

---

### 1.5 提示词工程（Prompt Engineering）

#### 是什么
通过精心设计的文本描述来控制 AI 生成图像的内容和风格。这是 AI 绘画最基础也最重要的技能。

#### 为什么学
- 提示词是最基础、最直接的控制手段
- 好的提示词能大幅提升生成质量
- 是所有其他控制手段（ControlNet、LoRA 等）的基础
- 不同模型对提示词的响应不同，需要针对性优化

#### 提示词基础语法

**正向提示词（Positive Prompt）**
```
masterpiece, best quality, 1girl, long hair, blue eyes, 
white dress, standing in a garden, sunlight, detailed background
```

**负向提示词（Negative Prompt）**
```
lowres, bad anatomy, bad hands, text, error, missing fingers, 
extra digit, fewer digits, cropped, worst quality, low quality
```

#### 完整权重语法

| 语法 | 示例 | 说明 |
|------|------|------|
| `(keyword:weight)` | `(beautiful:1.3)` | 精确设置权重，1.0 为默认 |
| `((keyword))` | `((beautiful))` | 权重 ×1.1，双括号 = 1.21 |
| `(((keyword)))` | `(((beautiful)))` | 权重 ×1.1³ ≈ 1.33 |
| `[keyword]` | `[ugly]` | 权重 ×0.9（等同于降低权重） |
| `[from:to:step]` | `[cowboy:astronaut:15]` | 前 15 步用 cowboy，之后切换为 astronaut |
| `[from:step]` | `[detailed:10]` | 从第 10 步开始才加入该词 |
| `[:to:step]` | `[:happy:15]` | 前 15 步使用该词，之后移除 |
| `AND keyword` | `cat AND dog` | 同时使用两个概念（部分节点支持） |
| `BREAK` | `a girl BREAK red dress` | 强制分段，每段独立编码（77 Token 限制时使用） |

#### 提示词权重的影响机制
- 权重通过修改 Cross-Attention 中的 Key/Value 缩放来影响生成
- 权重过大（>1.5）容易导致过饱和、伪影、图像崩溃
- 权重过小（<0.5）几乎不起作用
- **安全范围**：0.7-1.3 是最常用的权重范围

#### 提示词组织模板（通用结构）

```
[质量词], [主体描述], [细节描述], [环境/背景], [光线], [风格/渲染]

示例：
masterpiece, best quality, highly detailed,     ← 质量词
1girl, solo, long flowing silver hair,           ← 主体
blue eyes, white lace dress, holding a lantern,  ← 细节
standing in a dark enchanted forest,             ← 环境
moonlight filtering through trees, volumetric lighting,  ← 光线
fantasy art, digital painting, artstation        ← 风格
```

#### SD1.5 vs SDXL vs Flux 提示词策略对比

| 维度 | SD1.5 | SDXL | Flux |
|------|-------|------|------|
| 风格 | 关键词堆砌 | 自然语言混合 | 完整自然语言句子 |
| Token 限制 | ~75 个 | ~150 个 | ~512 个（T5） |
| 质量词 | 必须加 masterpiece 等 | 可选，效果不明显 | 不需要 |
| 权重语法 | 支持完整语法 | 支持，但效果不同 | 基本不支持权重语法 |
| 提示词长度 | 短到中等 | 中等 | 可以很长、很详细 |
| 负向提示词 | 非常重要 | 重要 | 不太需要（架构不同） |

**SD1.5 提示词示例**
```
正向：masterpiece, best quality, 1girl, (long hair:1.2), blue eyes, school uniform
负向：lowres, bad anatomy, bad hands, worst quality, low quality
```

**SDXL 提示词示例**
```
正向：A beautiful young woman with long flowing silver hair and blue eyes, 
wearing a white lace dress, standing in a moonlit enchanted forest, 
fantasy digital painting with volumetric lighting
负向：ugly, deformed, blurry, low quality
```

**Flux 提示词示例**
```
A photorealistic portrait of a young woman with long flowing silver hair 
and piercing blue eyes. She wears an elegant white lace dress and holds 
a glowing lantern. She stands in a dark enchanted forest with moonlight 
filtering through ancient oak trees, creating volumetric light rays. 
Shot with a 85mm lens, shallow depth of field, cinematic lighting.
（Flux 通常不需要负向提示词）
```

#### 高级提示词技巧

**1. Token 顺序的重要性**
- CLIP 对前面的 Token 给予更多注意力
- 最重要的描述放在前面
- 顺序：质量 > 主体 > 细节 > 环境 > 风格

**2. 负向提示词策略**
```
基础负面（必加）：lowres, bad anatomy, worst quality, low quality
手部修复：bad hands, missing fingers, extra digits, fewer digits
面部修复：deformed face, ugly, blurry face
风格控制：(按需) realistic, photo, 3d render (用于动漫风格)
```

**3. 触发词（Trigger Words）**
- 某些模型/LoRA 有特定触发词
- 例如：`<lora:xxx:0.8>` 中的 xxx 可能需要特定触发词激活
- 风格 LoRA 通常在提示词开头加触发词效果最好

**4. 提示词混合（Prompt Blending）**
```
(from:to:step) 语法：
[cowboy:astronaut:0.5]  ← 前50%步用cowboy，后50%用astronaut
[realistic:anime:12]    ← 前12步用realistic，之后切anime
```

**5. 分区提示词（基础概念）**
- ComfyUI 可通过 Attention Couple 等节点实现区域控制
- 左半部分用一个描述，右半部分用另一个描述
- 适合多人场景或复杂构图

#### 常见提示词分类词库

**质量增强词**
```
masterpiece, best quality, highly detailed, ultra-detailed, 
8k, UHD, high resolution, sharp focus, professional
```

**光线描述词**
```
natural lighting, studio lighting, dramatic lighting, rim lighting,
backlighting, golden hour, blue hour, volumetric lighting,
soft lighting, hard lighting, neon lighting, candlelight
```

**构图描述词**
```
close-up, portrait, upper body, full body, wide shot, bird's eye view,
low angle, dutch angle, symmetrical, rule of thirds, centered
```

**风格描述词**
```
digital painting, oil painting, watercolor, concept art, anime,
photorealistic, cinematic, fantasy art, cyberpunk, steampunk,
artstation, deviantart, unreal engine, octane render
```

#### SDXL 提示词特点
- SDXL 对自然语言描述更友好，不需要堆砌关键词
- 可以使用更长、更描述性的句子
- 支持风格词和内容词的更好分离
- SDXL 有专门的 `refiner_aesthetic_score` 参数影响生成质量
- 两个 CLIP 编码器分工不同：一个理解内容，一个理解风格

#### CLIPTextEncodeSDXL 参数完全配置指南

`CLIPTextEncodeSDXL` 是 SDXL 专用的提示词编码节点，它比普通的 `CLIPTextEncode` 多了几个参数，因为 SDXL 在训练时不仅学习提示词，还学习了图片尺寸和裁剪信息。

**节点输入参数详解**

| 参数 | 作用 | 一般怎么填 |
|------|------|-----------|
| `clip` | 双 CLIP 模型（来自 CheckpointLoaderSimple 或 DualCLIPLoader） | 自动连接 |
| `text_g` | Global Prompt（全局描述） | 主提示词 |
| `text_l` | Local Prompt（局部描述） | 细节提示词 |
| `width` | 训练时的原始宽度条件 | 与生成宽度一致 |
| `height` | 训练时的原始高度条件 | 与生成高度一致 |
| `crop_w` | 水平裁剪偏移 | 0 |
| `crop_h` | 垂直裁剪偏移 | 0 |
| `target_width` | 目标宽度 | 与生成宽度一致 |
| `target_height` | 目标高度 | 与生成高度一致 |

**text_g 和 text_l 的三种填法**

SDXL 实际用了两个 CLIP：
- CLIP-G（Global）：理解全局场景和风格
- CLIP-L（Local）：理解局部细节和主体

**方法一：全部复制（推荐，最通用）**
```
text_g = "1girl, blue eyes, white hair, school uniform"
text_l = "1girl, blue eyes, white hair, school uniform"
```
- 简单，兼容所有 SDXL 模型，效果稳定
- 目前最多工作流采用的方式

**方法二：主体和风格分开**
```
text_l = "1girl, white hair, blue eyes"        ← 主体/细节
text_g = "masterpiece, anime style, cinematic lighting"  ← 风格/场景
```
- L 负责主体，G 负责风格
- 控制力更强，但需要更多调优经验

**方法三：只写 text_g**
```
text_g = "1girl, masterpiece, blue eyes"
text_l = ""（留空）
```
- 很多模型也能出图
- 但通常不如方法一稳定，不推荐

**width 和 height**

这个**不是**最终图片尺寸，它是告诉 SDXL："这张图在训练时被认为是什么尺寸"。

```
默认：width = 1024, height = 1024

规则：与实际生成的 Latent 尺寸保持一致

示例：
  生成 1024×1024 → width=1024, height=1024
  生成 1344×768  → width=1344, height=768
  生成 832×1216  → width=832,  height=1216
```

**target_width 和 target_height**

表示最终目标尺寸，绝大多数情况下与 width/height 相同：
```
target_width = width
target_height = height
```

**crop_w 和 crop_h**

SDXL 训练时很多图片会被裁切，这两个参数记录裁切位置。
```
crop_w = 0, crop_h = 0  →  不偏移，从左上角开始（推荐）

理论上 crop_h=200 可能让人物更偏上，crop_w=200 可能让人物更偏左
但实际影响很小，绝大多数工作流设为 0 即可
```

**最推荐的填写方式（适用于所有 SDXL 模型）**

适用于 Pony、Illustrious、NoobAI、Animagine XL、Juggernaut XL、RealVisXL 等：

```
text_g = 正面提示词
text_l = 和 text_g 一样

width = 实际生成宽度
height = 实际生成高度

target_width = 实际生成宽度
target_height = 实际生成高度

crop_w = 0
crop_h = 0
```

**完整配置示例（生成 1344×768 横版图）**
```
text_g = "1girl, masterpiece, blue eyes, white hair, school uniform"
text_l = "1girl, masterpiece, blue eyes, white hair, school uniform"

width = 1344
height = 768

target_width = 1344
target_height = 768

crop_w = 0
crop_h = 0
```

**常见错误**

| 错误 | 原因 | 解决方案 |
|------|------|----------|
| 生成结果分辨率不对 | width/height 与 EmptyLatentImage 不一致 | 保持三处分辨率一致 |
| 画面质量差 | text_g 和 text_l 都留空了 | 至少填写 text_g |
| 提示词不生效 | 用了普通 CLIPTextEncode 但没用 CLIPTextEncodeSDXL | 换用 SDXL 专用节点 |
| 面部变形 | width/height 设为 512（SDXL 不支持） | 改为 1024 或 768 |
| 过饱和 | cfg 过高 + text_g 写了太多质量词 | 降低 cfg，精简质量词 |

---

## 阶段二：ComfyUI 核心概念

> 掌握 ComfyUI 的核心概念和基本操作，建立节点式工作流的思维模式。

---

### 2.1 ComfyUI 是什么

#### 定义
ComfyUI 是一个基于节点的 Stable Diffusion 图形界面工具，由开发者 comfyanonymous 于 2023 年创建。

#### 为什么选择 ComfyUI

| 对比维度 | ComfyUI | WebUI (A1111) | Forge |
|----------|---------|---------------|-------|
| 界面方式 | 节点式工作流 | 参数面板式 | 参数面板式（A1111 优化版） |
| 灵活性 | 极高，可自由组合 | 中等，依赖扩展 | 中等 |
| 性能 | 更优，按需执行 | 一般 | 优化显存管理，比 A1111 快 |
| 可复现性 | 工作流 JSON 完整记录 | 需要额外记录参数 | 同 A1111 |
| 扩展性 | 自定义节点开发简单 | 依赖 Gradio 扩展 | 兼容 A1111 扩展 |
| Flux 支持 | 原生支持 | 有限 | 较好 |
| 学习曲线 | 较陡 | 较平缓 | 较平缓 |
| 适合人群 | 进阶用户、开发者 | 入门用户 | 需要性能优化的用户 |

#### ComfyUI 的核心优势
1. **完全可视化**：每个处理步骤都以节点形式展现，数据流向一目了然
2. **高度灵活**：可以自由组合任意节点，实现 WebUI 无法做到的复杂工作流
3. **高效执行**：只执行有变化的节点，缓存未变化的中间结果
4. **便于分享**：工作流可以导出为 JSON 文件，完美复现
5. **开发友好**：Python 自定义节点开发非常简单

---

### 2.2 节点式工作流概念

#### 核心概念

**节点（Node）**
- 每个节点代表一个独立的处理单元
- 节点有输入端（左侧）和输出端（右侧）
- 每个节点执行一个特定功能

**连接（Connection/Link）**
- 用线连接节点的输入和输出
- 连线代表数据流动方向
- 不同颜色代表不同类型的数据

**数据类型（Slot Types）**
| 颜色 | 数据类型 | 说明 |
|------|----------|------|
| 🟡 黄色 | MODEL | 模型数据（U-Net/Transformer） |
| 🟠 橙色 | CLIP | 文本编码器 |
| 🟣 紫色 | VAE | 变分自编码器 |
| 🔴 红色 | CONDITIONING | 条件数据（文本编码后的向量） |
| 🟢 绿色 | LATENT | 潜空间数据 |
| 🔵 蓝色 | IMAGE | 图像数据 |
| 🟤 棕色 | MASK | 遮罩数据 |
| ⚪ 白色 | STRING | 文本字符串 |
| 🔘 灰色 | INT/FLOAT | 数值 |

**工作流（Workflow）**
- 由多个节点和连接组成的完整处理流程
- 从输入（加载模型/图像）到输出（保存图像）的完整链路
- 可以保存、加载、分享

---

### 2.3 ComfyUI 安装与环境配置

#### 系统要求
| 配置项 | 最低要求 | 推荐配置 |
|--------|----------|----------|
| GPU | NVIDIA GTX 1060 6GB | NVIDIA RTX 3060 12GB+ |
| 显存 | 6GB | 12GB+ |
| 内存 | 8GB | 16GB+ |
| 硬盘 | 20GB（基础） | 100GB+（含模型） |
| Python | 3.10+ | 3.10.x |
| CUDA | 11.8+ | 12.1+ |

#### 安装方式

**方式一：Git 克隆（推荐）**
```bash
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI
pip install -r requirements.txt
```

**方式二：便携版（Windows）**
- 从 GitHub Releases 下载便携版
- 解压即可使用，自带 Python 和依赖

**方式三：Docker**
```bash
docker pull ghcr.io/ai-dock/comfyui:latest
```

#### 目录结构
```
ComfyUI/
├── main.py              # 主入口
├── comfy/               # 核心代码
├── custom_nodes/        # 自定义节点目录 ⭐
├── models/              # 模型目录 ⭐
│   ├── checkpoints/     # 基础模型
│   ├── loras/           # LoRA 模型
│   ├── vae/             # VAE 模型
│   ├── controlnet/      # ControlNet 模型
│   ├── clip/            # CLIP 模型
│   └── embeddings/      # Embedding
├── input/               # 输入图像目录
├── output/              # 输出图像目录
└── web/                 # 前端界面
```

#### 启动命令
```bash
# 基本启动
python main.py

# 指定端口
python main.py --port 8188

# 允许远程访问
python main.py --listen 0.0.0.0

# 使用低显存模式
python main.py --lowvram

# 指定模型目录
python main.py --extra-model-paths-config extra_paths.yaml
```

---

### 2.4 界面介绍与基本操作

#### 主界面区域
- **画布区域**：中央工作区，用于放置和连接节点
- **节点库面板**：右键菜单或侧边栏，列出所有可用节点
- **队列面板**：右侧，管理生成任务队列
- **历史面板**：查看之前的生成记录
- **设置面板**：界面和性能设置

#### 基本操作
| 操作 | 快捷键/方式 |
|------|-------------|
| 添加节点 | 双击画布 / 右键菜单 |
| 连接节点 | 从输出端拖拽到输入端 |
| 删除节点/连线 | 选中后 Delete |
| 多选 | Ctrl+点击 / 框选 |
| 撤销 | Ctrl+Z |
| 重做 | Ctrl+Y |
| 缩放 | 鼠标滚轮 |
| 平移 | 中键拖拽 / 空格+拖拽 |
| 执行工作流 | 点击 Queue Prompt |
| 保存工作流 | Ctrl+S |
| 加载工作流 | 拖拽 JSON 文件到画布 |

#### 界面设置建议
- 开启 `Link Release` 模式：拖拽连线时松手自动连接最近端口
- 设置 `Canvas` 背景色：便于区分不同区域
- 启用 `Badge` 显示：在节点上显示类型信息
- 开启 `Node IDs`：在节点标题显示 ID 号，便于调试和 JSON 编辑

#### 进阶快捷键
| 操作 | 快捷键 | 说明 |
|------|--------|------|
| 折叠/展开节点 | 双击节点标题 | 折叠后节省空间 |
| 禁用节点 | 右键 → Mute | 临时跳过该节点 |
| 旁路节点 | 右键 → Bypass | 直接传递输入到输出 |
| 分组 | Ctrl+G | 将选中节点创建为组 |
| 注释 | 右键 → Note | 添加文字注释 |
| 节点搜索 | Ctrl+F | 搜索节点名称 |
| 切断连线 | Ctrl+拖拽连线端口 | 断开单条连接 |
| 复制节点 | Ctrl+D | 复制选中节点（含参数） |
| 导出图片 | 右键图像 → Save Image | 单独保存预览图 |

---

### 2.5 核心节点详解

#### 2.5.1 加载器节点（Loader Nodes）

**CheckpointLoaderSimple / UNETLoader / DualCLIPLoader / VAELoader**
- **作用**：加载基础模型到内存
- **输出**：MODEL（模型）、CLIP（文本编码器）、VAE（图像编解码器）
- **说明**：CheckpointLoaderSimple 加载包含完整三件套的模型文件

**LoraLoader**
- **作用**：加载 LoRA 微调模型，叠加到基础模型上
- **输入**：MODEL、CLIP（来自 Checkpoint Loader）
- **参数**：
  - `strength_model`：模型影响强度（0.0-2.0）
  - `strength_clip`：文本编码器影响强度（0.0-2.0）
- **输出**：修改后的 MODEL 和 CLIP

**ControlNetLoader / DiffControlNetLoader**
- **作用**：加载 ControlNet 模型
- **输出**：CONTROL_NET

**CLIPLoader / DualCLIPLoader**
- **作用**：单独加载 CLIP 模型
- **用途**：SDXL 需要两个 CLIP 编码器时使用 DualCLIPLoader

---

#### 2.5.2 采样器节点（Sampler Nodes）

**KSampler**
- **作用**：执行核心的去噪采样过程
- **输入**：
  - `model`：模型
  - `positive`：正向条件
  - `negative`：负向条件
  - `latent_image`：初始潜空间（通常是空 Latent）
- **参数**：
  - `seed`：随机种子
  - `steps`：采样步数（推荐 20-30）
  - `cfg`：CFG 引导强度（推荐 5-8）
  - `sampler_name`：采样算法
  - `scheduler`：噪声调度器
  - `denoise`：去噪强度（1.0=完全去噪，<1.0=部分去噪）
- **输出**：LATENT（去噪后的潜空间数据）

**KSamplerAdvanced**
- **作用**：高级采样器，支持更多控制选项
- **额外参数**：
  - `start_at_step` / `end_at_step`：控制采样起止步
  - `add_noise` / `return_with_leftover_noise`：噪声控制
- **用途**：实现分阶段采样、多模型混合采样

**常用采样器对比**
| 采样器 | 速度 | 质量 | 特点 |
|--------|------|------|------|
| euler | 快 | 中 | 经典采样器，适合快速预览 |
| euler_ancestral | 快 | 中 | 有随机性，多样性好 |
| dpmpp_2m | 中 | 高 | 推荐日常使用 |
| dpmpp_sde | 慢 | 高 | 细节丰富 |
| dpmpp_2m_sde | 中 | 高 | 平衡速度与质量 |
| uni_pc | 中 | 高 | 少步数效果好 |
| lcm | 极快 | 中 | 4-8步即可出图 |

**调度器对比**
| 调度器 | 特点 |
|--------|------|
| normal | 标准调度，均匀去噪 |
| karras | 前期去噪多，后期精细，推荐 |
| sgm_uniform | 均匀调度，适合 SDXL |
| exponential | 指数衰减 |
| simple | 简单线性调度 |

---

#### 2.5.3 条件控制节点（Conditioning Nodes）

**CLIPTextEncode**
- **作用**：将文本提示词编码为条件向量
- **输入**：CLIP（文本编码器）、文本字符串
- **输出**：CONDITIONING（条件向量）
- **使用**：需要分别创建正向和负向两个节点

**ConditioningCombine**
- **作用**：合并多个条件
- **用途**：混合不同提示词的效果

**ConditioningSetTimestepRange**
- **作用**：设置条件在特定时间步范围内生效
- **用途**：前几步用一个提示词，后几步用另一个

**ConditioningConcat**
- **作用**：拼接条件向量
- **用途**：组合多个 CLIP 编码器的输出

**ControlNetApply / ControlNetApplyAdvanced**
- **作用**：将 ControlNet 条件应用到已有条件上
- **输入**：CONDITIONING + CONTROL_NET + IMAGE
- **输出**：添加了 ControlNet 引导的 CONDITIONING

---

#### 2.5.4 图像处理节点（Image Processing Nodes）

**VAEEncode**
- **作用**：将像素空间图像编码为潜空间
- **输入**：IMAGE + VAE
- **输出**：LATENT
- **用途**：图生图的起点

**VAEDecode**
- **作用**：将潜空间数据解码为像素空间图像
- **输入**：LATENT + VAE
- **输出**：IMAGE

**EmptyLatentImage**
- **作用**：创建空白潜空间张量
- **参数**：宽度、高度、批次大小
- **用途**：文生图的起点（txt2img）

**LatentUpscale / LatentUpscaleBy**
- **作用**：在潜空间中放大图像
- **注意**：放大会损失细节，通常配合重采样使用

**ImageScale / ImageScaleBy**
- **作用**：在像素空间缩放图像
- **参数**：缩放算法（nearest-exact, bilinear, bicubic, area）

**LatentComposite**
- **作用**：在潜空间中合成两张图像
- **用途**：Inpainting、Outpainting、图像拼接

---

#### 2.5.5 保存与预览节点

**SaveImage**
- **作用**：将图像保存到 output 目录
- **参数**：文件名前缀

**PreviewImage**
- **作用**：在界面中预览图像（不保存到磁盘）

**SaveAnimatedWEBP**
- **作用**：将多帧图像保存为动态 WebP
- **用途**：AnimateDiff 输出

---

#### 2.5.6 遮罩节点（Mask Nodes）

**MaskToImage / ImageToMask**
- 遮罩与图像互相转换
- 遮罩是单通道灰度图，白色=选中区域，黑色=排除区域

**InvertMask**
- 反转遮罩（白变黑，黑变白）
- Inpainting 中常用：有时需要重绘的区域和保留的区域反过来

**GrowMask**
- 扩展/收缩遮罩边界
- 参数 `expand`：正值扩大，负值缩小
- 用途：Inpaint 时扩大遮罩范围以获得更好的边缘融合

**CompositeMask / FeatherMask**
- 合并多个遮罩 / 羽化遮罩边缘
- FeatherMask 让遮罩边缘渐变，避免硬切割线

---

#### 2.5.7 数学与逻辑节点（Math & Logic Nodes）

**Math Expression**
- 支持数学表达式计算
- 用途：动态计算参数（如 `width * 0.5`）

**Compare / Logic Gates**
- 比较和逻辑运算
- 用途：条件分支工作流

**Primitive**
- 基础值节点（INT、FLOAT、STRING、BOOLEAN）
- 可以连接到其他节点的参数输入
- 用途：集中管理参数，便于批量修改

---

#### 2.5.8 实用工具节点（Utility Nodes）

**Reroute**
- **作用**：路由节点，不执行任何操作，仅用于整理连线
- **用途**：让复杂工作流的连线更清晰
- 从输出拖到 Reroute 输入，再从 Reroute 输出拖到目标节点

**Note**
- 添加文字注释
- 右键画布 → Add Node → utils → Note
- 用于记录工作流说明、参数含义等

**Anything Everywhere / Fast Groups Muter**
- ComfyUI-Easy-Use 等插件提供的批量控制节点
- 可以同时禁用/启用一组节点

---

#### 2.5.9 Flux/SD3 专用节点

**UNETLoader（Flux 专用）**
- Flux 模型不包含 CLIP 和 VAE，需要分别加载
- 使用 `DualCLIPLoader` 加载 CLIP + T5
- 使用 `VAELoader` 单独加载 Flux VAE

**FluxGuidance**
- 设置 Flux 的引导强度
- 类似于 CFG，但工作原理不同
- 默认值 3.5，范围 0-10

**ModelSamplingFlux**
- 设置 Flux 的采样方式
- Flux 使用 Rectified Flow 采样（不同于传统 DDPM/DDIM）

---

## 阶段三：模型生态

> 理解各类模型的特点、用途和选择策略，建立完整的模型知识体系。

---

### 3.1 基础模型架构对比

#### SD 1.5
- **发布时间**：2022年10月
- **架构**：U-Net + CLIP ViT-L/14
- **默认分辨率**：512×512
- **特点**：
  - 生态最成熟，模型数量最多
  - 显存需求低（4-6GB）
  - 适合风格化图像生成
  - 有很多高质量社区微调模型

#### SDXL（Stable Diffusion XL）
- **发布时间**：2023年7月
- **架构**：更大 U-Net + 双 CLIP（OpenCLIP ViT-bigG + CLIP ViT-L）
- **默认分辨率**：1024×1024
- **特点**：
  - 图像质量显著提升
  - 更好的文本理解能力
  - 支持更大的分辨率
  - 显存需求较高（8-12GB）
  - 支持 Refiner 模型二次精修

#### SD 3 / SD 3.5
- **发布时间**：2024年（Stability AI）
- **架构**：MMDiT（多模态 Diffusion Transformer）+ 三 CLIP
- **变体**：
  - SD3 Medium（2B 参数）：平衡版
  - SD3.5 Large（8B 参数）：高质量版
  - SD3.5 Large Turbo（8B 参数）：加速版，4 步出图
  - SD3.5 Medium Turbo（2B 参数）：小模型加速版
- **特点**：
  - 用 Transformer 替代 U-Net
  - 文本渲染能力大幅提升
  - 三重文本编码器（CLIP-L + CLIP-G + T5-XXL）
  - 新的 Rectified Flow 采样方法（不同于传统 DDPM）
  - 默认分辨率 1024×1024
- **ComfyUI 使用要点**：
  - 使用 `TripleCLIPLoader` 加载三个 CLIP
  - 使用 `EmptySD3LatentImage`（16 通道 Latent）
  - 采样器推荐 `euler`，调度器推荐 `sgm_uniform`
  - CFG 推荐 4-7

#### Flux
- **发布时间**：2024年8月（Black Forest Labs）
- **架构**：DiT（Diffusion Transformer）+ T5 + CLIP
- **版本**：
  - Flux.1 Pro（闭源，最强）
  - Flux.1 Dev（开放权重，非商用）
  - Flux.1 Schnell（快速版，4步出图）
- **特点**：
  - 目前开源最强图像生成模型之一
  - 极强的文本理解和渲染能力
  - 显存需求高（12-24GB）
  - 使用 GGUF 量化可在低显存运行

---

### 3.2 Checkpoint 模型

#### 是什么
Checkpoint（检查点）是包含完整模型权重的文件，通常包括 U-Net + CLIP + VAE。

#### 常见格式
| 格式 | 说明 | 文件大小 |
|------|------|----------|
| .safetensors | 安全格式，推荐使用 | 2-7GB |
| .ckpt | PyTorch 格式，有安全风险 | 2-7GB |
| .gguf | 量化格式，低显存友好 | 1-4GB |
| .fp16 | 半精度，显存减半 | 2-3.5GB |

#### 如何选择
- **写实风格**：Realistic Vision, MajicMix Realistic, epiCRealism, Juggernaut XL
- **动漫风格**：Anything V5, Counterfeit, Animagine XL, NovelAI
- **2.5D 风格**：DreamShaper, GhostMix, ReV Animated
- **通用型**：Juggernaut XL, SDXL Base, RealVisXL

#### 模型融合（Model Merge）
```
是什么：将两个或多个模型的权重按比例混合，产生新模型

原理：
  merged_weight = model_A_weight × alpha + model_B_weight × (1 - alpha)

在 ComfyUI 中使用：
  安装 ComfyUI-Model-Toolkit 或使用内置的 ModelMerge 节点
  CheckpointSimpleMerge → 混合两个 Checkpoint

常见用途：
- 混合写实模型和动漫模型 → 2.5D 风格
- 混合不同风格模型 → 创造独特画风
- 调整模型比例 → 微调风格倾向

注意事项：
- 只能混合相同架构的模型（SD1.5 + SD1.5，不能 SD1.5 + SDXL）
- 混合比例通常 0.3-0.7，极端值效果不佳
- 混合后需要测试效果，不是所有组合都好看
```

---

### 3.3 LoRA 模型

#### 是什么
LoRA（Low-Rank Adaptation）是一种轻量级模型微调技术，通过在原始模型上叠加小型权重文件来改变生成风格或添加特定概念。

#### 原理
- 在 U-Net 的注意力层中注入低秩矩阵
- 不修改原始模型权重
- 文件大小通常 10-200MB
- 可以叠加多个 LoRA

#### 类型
| 类型 | 说明 | 常见用途 |
|------|------|----------|
| 风格 LoRA | 改变整体画风 | 水彩风、油画风、赛博朋克 |
| 角色 LoRA | 生成特定角色 | IP 角色、真人复刻 |
| 概念 LoRA | 添加特定概念 | 特定姿势、服装、场景 |
| 服装 LoRA | 特定服装 | 制服、古装、时装 |
| 画质 LoRA | 提升画面质量 | 更高细节、更清晰 |

#### 使用要点
- `strength` 参数控制影响强度，通常 0.6-0.8 效果最佳
- 多个 LoRA 叠加时注意总强度不要过高
- LoRA 需要与基础模型匹配（SD1.5 的 LoRA 不能用在 SDXL 上）
- 触发词（Trigger Word）：某些 LoRA 需要在提示词中包含特定关键词才能激活

#### 各架构 LoRA 兼容性
| LoRA 版本 | 可用于 | 不可用于 |
|-----------|--------|----------|
| SD1.5 LoRA | SD1.5 模型 | SDXL, Flux |
| SDXL LoRA | SDXL 模型 | SD1.5, Flux |
| Flux LoRA | Flux Dev/Schnell | SD1.5, SDXL |
| SD3 LoRA | SD3 模型 | SD1.5, SDXL, Flux |

**重要**：不同架构的 LoRA 绝对不能混用，会导致图像崩溃或严重变形。

#### LoRA 叠加策略
```
多个 LoRA 串联方式：
Checkpoint → LoraLoader(A, 0.7) → LoraLoader(B, 0.5) → KSampler

注意事项：
- 总强度建议不超过 1.5-2.0，否则容易崩图
- 不同 LoRA 可能有冲突（特别是都修改同一层时）
- 建议逐个添加 LoRA 测试效果，而非一次性叠加多个
```

#### LoRA 训练基础（了解原理）

**训练流程概述**
```
准备数据集（10-50张目标图像）
    ↓
图像预处理（裁切、打标签）
    ↓
使用 kohya_ss 或 sd-scripts 训练
    ↓
产出 LoRA 文件（.safetensors）
    ↓
在 ComfyUI 中测试效果
```

**训练关键参数**
| 参数 | 说明 | 推荐值 |
|------|------|--------|
| Network Rank (dim) | LoRA 矩阵的秩 | 32-128 |
| Network Alpha | 缩放系数 | 16-64（通常为 dim 的一半） |
| Learning Rate | 学习率 | 1e-4 到 1e-5 |
| Batch Size | 批次大小 | 1-4 |
| Epochs | 训练轮数 | 10-30 |
| Resolution | 训练分辨率 | 512（SD1.5）/ 1024（SDXL） |

**何时需要训练 LoRA**
- 需要生成特定 IP 角色（保持角色一致性）
- 需要特定风格（且现有模型不够）
- 需要特定概念（特定物体、场景等）
- 商业项目中需要品牌风格一致性

---

### 3.4 ControlNet 模型

#### 是什么
ControlNet 是一种条件控制技术，通过输入额外的控制图像来精确控制生成结果的结构、姿态、深度等。

#### 工作原理
- 在 U-Net 上添加额外的控制分支
- 控制分支提取输入图像的特定特征
- 将特征信息注入到去噪过程中
- 实现对生成结果的精确空间控制

#### 各类型详解

**Canny（边缘检测）**
- **输入**：通过 Canny 算法提取的边缘图
- **控制内容**：物体轮廓和边缘
- **适用场景**：保持原有构图，改变风格

**Depth（深度图）**
- **输入**：深度估计图（灰度图，近处亮远处暗）
- **控制内容**：空间深度关系
- **适用场景**：保持空间构图，改变场景内容

**OpenPose（姿态检测）**
- **输入**：人体骨骼关键点图
- **控制内容**：人物姿态和动作
- **适用场景**：控制人物姿势

**MLSD（线段检测）**
- **输入**：直线段检测图
- **控制内容**：建筑和室内线条
- **适用场景**：建筑/室内设计

**Normal Map（法线图）**
- **输入**：表面法线方向图
- **控制内容**：表面朝向和光影
- **适用场景**：3D 感的表面细节

**Scribble（涂鸦）**
- **输入**：手绘涂鸦/简笔画
- **控制内容**：大致形状和构图
- **适用场景**：从草图生成精细图像

**SoftEdge（柔边检测）**
- **输入**：HED 边缘检测图（比 Canny 更柔和）
- **控制内容**：柔和的轮廓信息
- **适用场景**：需要保留更多自由度时

**Lineart（线稿）**
- **输入**：精细线稿图
- **控制内容**：精确的线条结构
- **适用场景**：线稿上色

**Shuffle（内容随机化）**
- **输入**：参考图像
- **控制内容**：色彩和纹理分布
- **适用场景**：保持风格一致性

**Tile（分块控制）**
- **输入**：参考图像
- **控制内容**：超分和细节增强
- **适用场景**：高分辨率生成、图像修复

**IP-Adapter（图像提示适配器）**
- **输入**：参考图像
- **控制内容**：图像风格和内容
- **适用场景**：风格迁移、角色一致性

**InstantID / IP-Adapter-FaceID**
- **输入**：人脸照片
- **控制内容**：面部身份特征
- **适用场景**：保持人物面部一致性

#### ControlNet 使用要点
- `strength` 参数控制控制强度（0.0-1.0）
- 可以同时使用多个 ControlNet 叠加控制
- 预处理器（Preprocessor）的选择影响控制效果
- ControlNet 需要与基础模型版本匹配

#### 预处理器详解（Preprocessor）

预处理器负责从输入图像提取控制图。选择正确的预处理器至关重要。

| ControlNet 类型 | 推荐预处理器 | 输出格式 | 使用建议 |
|----------------|-------------|----------|----------|
| Canny | Canny Edge | 黑白边缘图 | 调整 low/high threshold 控制边缘密度 |
| Depth | Depth Anything / MiDaS | 灰度深度图 | Depth Anything v2 效果最好 |
| OpenPose | OpenPose (Body+Hand+Face) | 骨骼关键点图 | 开启 Body+Hand+Face 获取完整信息 |
| Lineart | Lineart Realistic / Anime | 线稿图 | 写实用 Realistic，动漫用 Anime |
| Scribble | Scribble PiDi / XDoG | 涂鸦线条 | 从照片提取简笔画效果 |
| SoftEdge | HED / PiDi | 柔边检测图 | 比 Canny 更柔和，给模型更多自由度 |
| Normal Map | Normal BAE | 法线贴图 | 用于控制表面光影方向 |
| MLSD | MLSD Line | 直线段图 | 专门用于建筑/室内直线结构 |
| Shuffle | Content Shuffle | 内容重排图 | 用于风格迁移和色彩重排 |
| Tile | Tile (Resample) | 参考图 | 用于超分辨率和细节增强 |

**预处理器参数调节技巧**
- **Canny**：low_threshold=100, high_threshold=200（默认），降低阈值会检测更多边缘
- **OpenPose**：选择 detect_hand 和 detect_face 为 enable 获取手部和面部关键点
- **Depth**：一般使用默认参数即可，Depth Anything v2 基本无需调节
- **Lineart**：coarse 模式线条粗，fine 模式线条细

---

### 3.5 IP-Adapter

#### 是什么
IP-Adapter（Image Prompt Adapter）是一种将图像作为提示词输入的技术，让模型"理解"参考图像的内容和风格。

#### 工作原理
- 使用 CLIP Vision 编码器提取参考图像的特征
- 通过 Cross-Attention 机制注入到 U-Net 中
- 不修改原始模型权重
- 与文本提示词共享注意力空间，可以与文本描述混合控制

#### 版本与类型

| 版本 | 特点 | 适用场景 |
|------|------|----------|
| IP-Adapter v1 | 基础版本 | 风格迁移、内容参考 |
| IP-Adapter v2 | 改进质量 | 同上，效果更好 |
| IP-Adapter Plus | 增强版，更强的语义理解 | 需要精确控制时 |
| IP-Adapter Plus Face | 面部增强版 | 面部一致性 |
| IP-Adapter FaceID | 面部身份保持 | 角色一致性 |
| IP-Adapter FaceID Plus | 面部ID增强版 | 更强的面部一致性 |
| IP-Adapter SDXL | SDXL 专用版 | SDXL 模型使用 |

#### 主要用途
- **风格迁移**：将一张图的风格应用到另一张图
- **角色一致性**：保持角色外观在多张图中一致
- **场景参考**：使用参考图控制整体氛围
- **混合控制**：同时使用图像和文本作为提示词

#### ComfyUI 中的使用
- 需要安装 `ComfyUI_IPAdapter_plus` 自定义节点
- 搭配 CLIP Vision 模型使用（如 `CLIP-ViT-H-14`）
- 可以与 ControlNet 组合使用（结构 + 风格双重控制）

#### IP-Adapter 工作流示例
```
LoadImage (参考图)
    ↓
CLIP Vision Encode
    ↓
IP-Adapter Apply
    ↑
MODEL (来自 Checkpoint)
    ↓
带风格引导的 MODEL → KSampler

同时可以叠加：
ControlNet (结构控制) + IP-Adapter (风格控制)
```

#### 关键参数
- `weight`：IP-Adapter 影响强度（0.0-1.0），通常 0.5-0.8
- `weight_type`：权重类型（linear, ease in, ease out, composition）
- 可以叠加多个 IP-Adapter（内容 + 风格分别控制）

---

### 3.6 VAE 模型

#### 是什么
VAE（Variational Autoencoder）负责图像的编码和解码，影响最终图像的色彩和细节质量。

#### 工作原理
```
编码器（Encode）：
  像素空间 [512×512×3] → 潜空间 [64×64×4]
  压缩比：8倍（每维度），总压缩 64 倍

解码器（Decode）：
  潜空间 [64×64×4] → 像素空间 [512×512×3]
  重建损失：色彩偏移、细节模糊
```

#### 为什么单独更换 VAE
- 默认 VAE 可能存在色彩偏移问题（画面发灰、颜色不准）
- 特定 VAE 能提供更好的色彩还原
- 某些微调模型自带优化过的 VAE
- VAE 解码是最后一步，直接影响最终输出质量

#### VAE 质量对比
| 问题 | 症状 | 解决方案 |
|------|------|----------|
| 色彩偏移 | 整体偏蓝/偏绿/发灰 | 更换 VAE |
| 细节模糊 | 面部/文字模糊 | 更换高质量 VAE |
| 过饱和 | 颜色过于鲜艳 | 降低 CFG 或更换 VAE |
| 色带/条纹 | 渐变区域出现条纹 | 使用 FP16 VAE |

#### 常见 VAE 推荐
| VAE | 适用模型 | 特点 | 文件大小 |
|-----|----------|------|----------|
| vae-ft-mse-840000 | SD1.5 | 色彩准确，细节好，通用推荐 | ~335MB |
| sdxl-vae-fp16-fix | SDXL | 修复色彩偏移，FP16 版本 | ~167MB |
| mse-840000-ema-pruned | SD1.5 | 通用高质量 | ~335MB |
| flux-ae.safetensors | Flux | Flux 专用 VAE | ~335MB |

#### 在 ComfyUI 中更换 VAE
```
方法一：使用 VAELoader 节点
VAELoader → 输出 VAE → 连接到 VAEDecode 的 vae 输入

方法二：Checkpoint 加载时选择
CheckpointLoaderSimple 输出自带 VAE
如果需要更换，使用 VAELoader 覆盖

方法三：自动 VAE 选择
某些 Checkpoint 模型内置了最优 VAE
可以使用 "Load VAE from Checkpoint" 节点
```

#### VAE Tiled（分块编解码 — 高分辨率必用）
```
是什么：将大图像分成小块分别编解码，最后拼合
为什么需要：
  - 高分辨率图像（2048×2048+）直接 VAE Decode 可能 OOM
  - Tiled 方式显存占用恒定，与图像大小无关

使用节点：
  - VAEDecodeTiled：分块解码（替代 VAEDecode）
  - VAEEncodeTiled：分块编码（替代 VAEEncode）

参数：
  - tile_size：块大小（默认 512），越大质量越好但显存越多
  - 可以设为 256-1024

推荐场景：
  - 输出分辨率 > 1536×1536 时使用
  - AnimateDiff 多帧解码时使用
  - 显存不足时的通用替代方案
```

---

### 3.7 Embedding / Textual Inversion

#### 是什么
Textual Inversion 是一种轻量级微调方法，通过学习新的文本嵌入向量来表示特定概念。

#### 工作原理
```
普通提示词：
"beautiful girl" → CLIP Token → [768维向量序列]

Textual Inversion：
"beautiful girl <EasyNegative>" → CLIP Token + 自定义 Token → [768维向量序列]
                                 ↑
                        这个 Token 对应训练好的嵌入向量
```
- 不修改模型权重，只添加新的 Token-向量 对
- 向量维度与 CLIP 编码器一致（SD1.5: 768维，SDXL: 1280维）

#### 特点
- 文件极小（几 KB 到几十 KB）
- 通过触发词激活
- 通常用于负向 Embedding 改善画质
- 不改变模型结构
- 训练速度快（几小时 vs LoRA 的几小时到几天）

#### 常见用法

**负向 Embedding（强烈推荐使用）**
```
负向提示词中添加：
EasyNegative, bad-hands-5, bad_prompt_version2, FastNegativeV2

效果：
- EasyNegative：全面提升画质，减少常见瑕疵
- bad-hands-5：专门修复手部畸形
- bad_prompt_version2：减少低质量输出
- FastNegativeV2：快速负面提示词，减少生成时间
```

**正向 Embedding**
```
正向提示词中使用触发词：
"1girl, <embedding_name>"

用途：
- 特定角色触发
- 特定风格触发
- 质量增强触发
```

#### 在 ComfyUI 中使用 Embedding
```
方式一：在 CLIPTextEncode 中直接写触发词
text: "EasyNegative"  ← 负向提示词

方式二：使用 Embedding 节点
LoadEmbedding → 输出 embedding → 连接到条件控制

注意：Embedding 文件放在 models/embeddings/ 目录下
```

---

### 3.8 模型下载渠道

| 平台 | 网址 | 特点 |
|------|------|------|
| CivitAI | civitai.com | 最大的AI模型社区，质量高，有评分系统 |
| HuggingFace | huggingface.co | 官方模型托管，技术向，速度稳定 |
| LibLib | liblib.art | 国内平台，中文友好，速度快 |
| 吐司 | tusou.com | 国内社区，工作流分享 |
| GitHub | github.com | 官方模型和工具发布 |

#### 模型下载注意事项
1. **格式优先**：优先选择 `.safetensors` 格式（安全，无恶意代码风险）
2. **精度选择**：
   - FP16（半精度）：推荐，体积减半，质量几乎无损
   - FP32（全精度）：仅在精度敏感场景使用
   - GGUF：低显存场景使用
3. **版本确认**：确认模型是 SD1.5、SDXL 还是 Flux 版本
4. **文件大小参考**：
   - SD1.5 Checkpoint：2-4GB（FP16）/ 5-7GB（FP32）
   - SDXL Checkpoint：5-7GB（FP16）
   - Flux Dev：约 24GB（FP16）/ 约 10-15GB（GGUF Q5）
   - LoRA：10-200MB
   - ControlNet：1-3GB
   - VAE：300-800MB
5. **安全检查**：不要运行未知来源的 `.ckpt` 文件（可能含恶意代码），优先用 `.safetensors`

---

## 阶段四：进阶工作流构建

> 掌握各种常见工作流的构建方法，能够独立完成复杂图像生成任务。

---

### 4.1 文生图（txt2img）基础工作流

#### 工作流结构
```
CheckpointLoaderSimple
    ├── MODEL → KSampler
    ├── CLIP → CLIPTextEncode (×2: 正向/负向)
    └── VAE → VAEDecode

EmptyLatentImage → KSampler → VAEDecode → SaveImage

CLIPTextEncode (正向) ──→ KSampler (positive)
CLIPTextEncode (负向) ──→ KSampler (negative)
```

#### 关键参数设置
- 分辨率：SD1.5 用 512×512，SDXL 用 1024×1024
- Steps：20-30
- CFG：6-8
- Sampler：dpmpp_2m
- Scheduler：karras

---

### 4.2 图生图（img2img）工作流

#### 完整节点连接
```
节点1: CheckpointLoaderSimple
    → MODEL, CLIP, VAE

节点2: LoadImage (加载原图)
    → IMAGE, MASK

节点3: CLIPTextEncode (正向提示词, CLIP)
节点4: CLIPTextEncode (负向提示词, CLIP)

节点5: VAEEncode (IMAGE=节点2, VAE=节点1.VAE)
    → LATENT（原图编码后的潜空间）

节点6: KSampler
    model=MODEL, positive=节点3, negative=节点4, latent_image=节点5
    steps=20, cfg=7.0, sampler=dpmpp_2m, scheduler=karras
    denoise=0.6  ← 关键参数！

节点7: VAEDecode (LATENT=节点6, VAE=VAE)
    → IMAGE

节点8: SaveImage
```

#### denoise 参数与效果关系
| denoise | 原图保留度 | 适用场景 |
|---------|-----------|----------|
| 0.1-0.2 | 90-80% | 微调细节、轻微风格化 |
| 0.3-0.4 | 70-60% | 中等风格转换、色彩调整 |
| 0.5-0.6 | 50-40% | 明显风格转换（照片→油画） |
| 0.7-0.8 | 30-20% | 大幅改变，仅保留构图和色调 |
| 0.9-1.0 | 10-0% | 几乎等于重新生成 |

#### denoise 与分辨率的关系
- 低 denoise（0.3-0.5）+ 低分辨率 → 适合快速风格预览
- 高 denoise（0.7-0.9）+ 高分辨率 → 几乎等于 txt2img
- **核心原则**：denoise 越高，原图影响越小，自由度越大

#### 应用场景
- 风格转换（照片→油画、写实→动漫）
- 细节增强（低 denoise 重采样增加细节）
- 色彩调整（改变色调、光线）
- 局部修改预览
- 草图细化（手绘草图 → 精细图像）

---

### 4.3 Inpainting 工作图

#### 工作流结构
```
LoadImage (原图)
    ↓
InvertMask 或 LoadImage (遮罩)
    ↓
VAEEncode (原图) → SetLatentNoiseMask
    ↓
KSampler (denoise=1.0, 使用遮罩)
    ↓
VAEDecode → SaveImage
```

#### Latent Noise Mask 机制详解

**SetLatentNoiseMask 节点**
- 将遮罩信息注入到 Latent 中
- 告诉采样器哪些区域需要重新生成，哪些区域保持不变
- **关键参数**：
  - `mask`：遮罩张量，白色=重绘区域，黑色=保留区域

**Inpainting 去噪过程**
```
步骤 1：原始 Latent 被加噪声（仅遮罩区域）
    ↓
步骤 2：U-Net 对整个 Latent 预测噪声
    ↓
步骤 3：采样器仅在遮罩区域去除噪声（非遮罩区域保持原样）
    ↓
步骤 4：重复 Steps 次直到完成
```

**Inpainting 专用模型 vs 普通模型**
| 对比 | 普通模型 + Mask | Inpainting 专用模型 |
|------|----------------|---------------------|
| 效果 | 一般，边缘可能有接缝 | 更好，边缘融合自然 |
| 输入通道 | 4 通道 Latent | 9 通道 Latent（4 Latent + 1 Mask + 4 原图） |
| 推荐度 | 快速修补可用 | 专业 Inpaint 推荐 |

**Inpainting 专用模型**：
- `sd-v1-5-inpainting.safetensors`（SD1.5 专用）
- `sd_xl_base_1.0_inpainting.safetensors`（SDXL 专用）
- 这些模型在训练时加入了 Mask 和原图信息，效果更好

#### 关键概念
- **遮罩（Mask）**：白色区域=需要重绘，黑色区域=保持不变
- **Inpaint 节点**：ComfyUI 提供专门的 Inpaint 相关节点
- **denoise**：Inpaint 中通常设为 1.0，完全重新生成遮罩区域
- **Mask 边缘羽化**：使用 FeatherMask 让遮罩边缘渐变，避免硬切割线

#### Inpainting 最佳实践
1. 遮罩范围比需要修改的区域稍大一些（使用 GrowMask 扩展 10-20px）
2. 使用 FeatherMask 羽化边缘（8-16px）
3. 配合 Inpainting 专用模型效果更好
4. 提示词中描述遮罩区域应该生成的内容
5. denoise 一般设为 1.0（完全重绘遮罩区域）

#### Outpainting（外绘）
- 扩展图像边界
- 使用 `Pad Image for Outpainting` 节点
- 创建扩展区域的遮罩
- 工作流：原图 → Pad Image → 创建遮罩 → Inpaint 流程

---

### 4.4 三种重绘方式深度对比

> ControlNet 重绘、img2img 直接编码重绘、KJNode 分割遮罩重绘——理解它们的本质区别是掌握 ComfyUI 的关键分水岭。

#### 核心区别总览

| 维度 | img2img 直接编码 | ControlNet 重绘 | KJNode 分割遮罩重绘 |
|------|-----------------|----------------|-------------------|
| **控制层面** | 全局像素级 | 结构/语义级 | 区域级 |
| **重绘范围** | 整张图 | 整张图 | 指定区域 |
| **原图保留度** | denoise 控制（整体模糊） | strength 控制（结构约束） | 遮罩控制（精确区域） |
| **边缘融合** | 无（整体替换） | 自然（注意力层融合） | 需处理（遮罩边缘） |
| **适用场景** | 风格转换、整体重绘 | 保持结构换风格/内容 | 局部修补、换脸换装 |

---

#### 方式一：img2img 直接编码到 Latent 空间

**原理**
```
原图像素 [512×512×3]
    ↓ VAEEncode
原图 Latent [64×64×4]
    ↓ 添加噪声（按 denoise 比例）
带噪 Latent [64×64×4]
    ↓ KSampler 去噪
去噪后 Latent [64×64×4]
    ↓ VAEDecode
新图像素 [512×512×3]
```

**节点连接**
```
LoadImage → VAEEncode → KSampler(denoise=0.6) → VAEDecode → SaveImage
```

**关键特性**
- **全局操作**：整张图的每个像素都参与编码和去噪，不存在"保留区域"
- **denoise 控制**：唯一控制手段就是 denoise 值
  - denoise=0.3 → 原图信息保留 70%（但所有区域均匀保留）
  - denoise=0.7 → 原图信息保留 30%（但所有区域均匀丢失）
- **信息损失不可控**：VAE 编码/解码本身就有信息损失，denoise 越高损失越大
- **没有空间控制**：无法指定"这部分保留、那部分重绘"

**优势**
- 简单，只需 4-5 个节点
- 适合整体风格转换（照片→油画、写实→动漫）
- 速度快

**劣势**
- 无法局部控制
- 原图细节会均匀丢失（高 denoise 时面目全非）
- 面部、手部等关键区域可能变形

---

#### 方式二：ControlNet 重绘

**原理**
```
原图 [512×512×3]
    ↓ 预处理器（Canny/Depth/Lineart 等）
控制图 [512×512×3]（边缘/深度/线稿）
    ↓ ControlNet 编码器
控制特征注入到 U-Net 的每一层
    ↓ 与文本条件共同引导去噪
新图（结构与原图一致，内容/风格可完全不同）
```

**节点连接**
```
LoadImage(原图) → Preprocessor → ControlNetApply
                                      ↑
CheckpointLoader → ControlNetLoader ───┘
                                      ↓
                              CONDITIONING → KSampler → VAEDecode → SaveImage

同时：
EmptyLatentImage → KSampler（注意：是空白 Latent，不是原图编码！）
```

**关键特性**
- **结构级控制**：不是控制像素，而是控制图像的结构/语义
  - Canny：控制边缘轮廓
  - Depth：控制空间深度
  - OpenPose：控制人体姿态
  - Lineart：控制线条结构
- **从空白开始**：KSampler 的输入是 EmptyLatentImage，不是原图编码
  - 这意味着：模型从纯噪声开始生成，但受到 ControlNet 结构约束
  - 原图的色彩、纹理、光影全部不保留，只有结构保留
- **strength 控制**：
  - strength=0.8-1.0：严格遵循控制图结构
  - strength=0.4-0.7：大致遵循，允许自由发挥
  - strength=0.1-0.3：轻微参考
- **与 img2img 的本质区别**：
  - img2img：在原图 Latent 上加噪去噪 → 保留"原图的信息残影"
  - ControlNet：从空白 Latent 开始，用控制信号引导生成 → 保留"原图的结构骨架"

**优势**
- 精确的空间结构控制
- 可以完全改变内容和风格，同时保持构图
- 可以叠加多个 ControlNet（结构+深度+姿态）
- 与文本提示词协同工作，灵活性极高

**劣势**
- 需要额外的 ControlNet 模型（1-3GB）
- 预处理器可能提取不准确（需要调节参数）
- 不保留原图的色彩和纹理信息
- 需要更多节点和更复杂的工作流

---

#### 方式三：KJNode 分割 + 遮罩重绘（Inpainting）

**原理**
```
原图 [512×512×3]
    ↓ 分割检测（SAM/YOLO/语义分割）
分割遮罩 [512×512]（白色=目标区域，黑色=保留区域）
    ↓ 原图 VAEEncode → SetLatentNoiseMask
带遮罩的 Latent [64×64×4]
    ↓ KSampler（仅遮罩区域加噪去噪）
去噪后 Latent（遮罩区域重绘，非遮罩区域原样保留）
    ↓ VAEDecode
新图（只有遮罩区域改变，其余完全不变）
```

**节点连接**
```
LoadImage(原图)
    ↓
SAM/YOLO/语义分割节点 → MASK（自动检测目标区域）
    ↓
VAEEncode(原图) + MASK → SetLatentNoiseMask
    ↓
KSampler(denoise=1.0, 使用带遮罩的 Latent)
    ↓
VAEDecode → SaveImage
```

**关键特性**
- **区域级精确控制**：只重绘遮罩覆盖的区域，其余像素完全保留
- **denoise 通常为 1.0**：因为遮罩区域需要完全重新生成
- **自动分割**：KJNode 等插件提供智能分割能力
  - SAM（Segment Anything Model）：输入点/框自动分割物体
  - YOLO 检测：检测人脸、手部、物体
  - 语义分割：按类别分割（天空、地面、人物等）
- **遮罩质量决定效果**：
  - 遮罩边缘需要羽化（FeatherMask）
  - 遮罩范围需要适当扩展（GrowMask）
  - 遮罩精度直接影响融合效果
- **与 img2img 的本质区别**：
  - img2img：全图均匀改变，无法局部控制
  - 遮罩重绘：只改变指定区域，其余完全保留
- **与 ControlNet 的本质区别**：
  - ControlNet：控制全图的结构，不保留原图像素
  - 遮罩重绘：保留原图大部分像素，只重绘局部

**优势**
- 精确的区域控制（换脸、换装、换背景）
- 非遮罩区域零损失（像素级保留）
- 可以配合不同的区域提示词
- 适合修图、局部优化

**劣势**
- 遮罩边缘可能有接缝（需要羽化处理）
- 重绘区域与原图的风格/光影可能不协调
- 分割可能不准确（需要手动调整）
- 需要更多的节点（分割+遮罩处理+Inpaint）

---

#### 三种方式的工作流对比图

```
方式一 img2img：
原图 → VAEEncode → 加噪 → KSampler → 新图
      ↑ 整张图参与，均匀改变

方式二 ControlNet：
原图 → 预处理器 → 控制图 → ControlNet 引导
                                              ↓
空白噪声 → KSampler → 新图（结构同原图，内容全新）

方式三 遮罩重绘：
原图 → VAEEncode → 带遮罩 Latent → KSampler → 新图
      ↑                    ↑
    非遮罩区域保留      遮罩区域重绘
```

#### 选择决策树

```
你的需求是什么？
    │
    ├→ 整体风格转换（照片→油画）
    │   └→ 方式一：img2img（简单快速）
    │
    ├→ 保持构图/姿态/结构，换内容或风格
    │   └→ 方式二：ControlNet（结构控制精确）
    │
    ├→ 只改局部（换脸/换背景/修瑕疵）
    │   └→ 方式三：遮罩重绘（区域精确）
    │
    └→ 保持结构 + 只改局部
        └→ 方式二 + 方式三 组合使用
           ControlNet 控制整体结构 + 遮罩控制重绘区域
```

#### 组合使用示例

```
最强大的重绘工作流：ControlNet + 遮罩重绘 组合

LoadImage(原图)
    ├→ Depth 预处理器 → ControlNet Apply（保持空间结构）
    ├→ SAM 分割 → MASK（选择要重绘的区域）
    └→ VAEEncode → SetLatentNoiseMask（注入遮罩）

KSampler：
    - model + ControlNet 引导的 conditioning
    - 带遮罩的 Latent
    - denoise=1.0

效果：
- 整体空间结构由 ControlNet 保证
- 只有遮罩区域被重绘
- 非遮罩区域完全保留原图
```

---

### 4.5 ControlNet 多条件组合工作流

#### 工作流结构
```
LoadControlNet → ControlNetApply
    ↑
LoadImage (控制图)

LoadControlNet → ControlNetApply
    ↑
LoadImage (另一控制图)

两个 ControlNetApply 串联或并联到 Conditioning
```

#### 组合策略
- **OpenPose + Depth**：控制姿态和空间关系
- **Canny + IP-Adapter**：控制结构和风格
- **Depth + Tile**：控制构图和细节质量
- **多 ControlNet 串联**：依次叠加控制条件

#### 注意事项
- 多个 ControlNet 的 strength 需要合理分配
- 总强度过高会导致图像僵硬
- 建议每个 ControlNet 的 strength 在 0.4-0.8

---

### 4.6 高清修复（Hires Fix / Upscale）工作流

#### 为什么需要高清修复
- SD1.5 直接生成 1024×1024 会出现重复、变形等问题
- SDXL 直接生成 2048×2048 同样有问题
- 需要先在标准分辨率生成，再放大并补充细节

#### 方法一：潜空间放大 + 重采样（最推荐）
```
第一阶段（低分辨率生成）
EmptyLatentImage (512×512)
    ↓
KSampler (512×512, denoise=1.0, steps=20, cfg=7)
    → 输出低分辨率 Latent

潜空间放大
LatentUpscale (1024×1024, method=bilinear)
    → 输出放大的 Latent（质量损失可控）

第二阶段（高分辨率重采样）
KSampler (1024×1024, denoise=0.5-0.7, steps=15, cfg=7)
    → 输出高分辨率 Latent（补充细节）

VAEDecode → SaveImage
```
**关键参数**：
- 第二阶段 denoise：0.5（保留更多原图）到 0.7（更多细节重建）
- 第二阶段 Steps 可以比第一阶段少（15步通常够用）
- 两次 KSampler 使用相同的 Seed 和 CFG

#### 方法二：像素空间放大 + 重采样（质量更好）
```
第一阶段
KSampler → VAEDecode
    → 输出低分辨率图像

像素空间放大
ImageScale (2x, bicubic)
    → 输出放大的图像

重新编码
VAEEncode
    → 输出放大的 Latent

第二阶段
KSampler (denoise=0.4-0.6)
    → 输出高质量 Latent

VAEDecode → SaveImage
```
**优势**：像素空间放大比潜空间放大质量更好
**劣势**：需要额外的 VAE Encode，稍慢

#### 方法三：超分模型放大（速度最快）
```
KSampler → VAEDecode
    → 输出基础图像

LoadUpscaleModel (RealESRGAN_x4plus 或 4x-UltraSharp)
    ↓
UpscaleImage (使用超分模型放大4x)
    → 输出4倍分辨率图像

ImageScale (缩小到目标尺寸，如2x)
    → 输出最终高分辨率图像

SaveImage
```
**优势**：不需要二次采样，速度快，细节丰富
**劣势**：可能出现过度锐化，风格可能偏移

#### 方法四：超分 + 重采样组合（质量最佳）
```
第一阶段：标准分辨率生成
KSampler (512×512) → VAEDecode
    ↓
第二阶段：超分模型放大
UpscaleImage (RealESRGAN 4x) → ImageScale (缩到 1024×1024)
    ↓
第三阶段：低 denoise 重采样精修
VAEEncode → KSampler (denoise=0.3) → VAEDecode
    ↓
SaveImage
```
**效果**：超分提供细节，重采样修正风格偏移，最终质量最高

#### 推荐方案总结
| 方案 | 质量 | 速度 | 显存 | 适用场景 |
|------|------|------|------|----------|
| 方法一：潜空间放大 | ★★★ | ★★★★ | ★★★★ | 日常使用，平衡方案 |
| 方法二：像素空间放大 | ★★★★ | ★★★ | ★★★ | 需要更好质量时 |
| 方法三：超分模型 | ★★★ | ★★★★★ | ★★★★ | 快速出图 |
| 方法四：超分+重采样 | ★★★★★ | ★★ | ★★ | 商业级质量 |
| SDXL 直出 1024×1024 | ★★★★ | ★★★★★ | ★★★ | SDXL 用户首选 |

#### 超分模型推荐
| 模型 | 倍率 | 特点 | 推荐度 |
|------|------|------|--------|
| RealESRGAN_x4plus | 4x | 通用型，写实效果好 | ⭐⭐⭐⭐ |
| RealESRGAN_x4plus_anime_6B | 4x | 动漫专用 | ⭐⭐⭐⭐ |
| 4x-UltraSharp | 4x | 高锐度，细节丰富 | ⭐⭐⭐⭐⭐ |
| 4x_NMKD-Superscale | 4x | 平衡方案 | ⭐⭐⭐⭐ |
| SwinIR_4x | 4x | 老牌超分模型 | ⭐⭐⭐ |

---

### 4.7 面部修复工作流

#### 为什么需要面部修复
- AI 生成的面部经常有瑕疵（不对称、模糊、畸形）
- 小分辨率生成的面部细节不足
- 放大后面部可能出现伪影

#### 方案一：FaceDetailer（Impact Pack，推荐）
```
工作流：
KSampler → FaceDetailer → SaveImage

FaceDetailer 节点内部流程：
1. 检测人脸位置（使用 YOLO 或其他检测器）
2. 裁切人脸区域（带边距扩展）
3. 对人脸区域单独 Inpaint（使用专门的面部提示词）
4. 将修复后的人脸贴回原图
5. 边缘融合处理

FaceDetailer 关键参数：
- denoise：0.3-0.5（保持面部特征，太高会改变身份）
- detection_threshold：0.5-0.7（人脸检测置信度）
- guide_size：384-512（面部区域的处理分辨率）
- max_size：1024（最大处理尺寸）
- feather：5-10（边缘羽化像素）
```

#### 方案二：CodeFormer / GFPGAN 后处理
```
工作流：
KSampler → VAEDecode → FaceRestoreModelLoader → FaceRestore → SaveImage

FaceRestore 节点参数：
- fidelity：0.5-0.7
  - 值越小：修复越激进，可能改变面部特征
  - 值越大：保留更多原始特征，修复效果温和
- face_restore_model：CodeFormer 或 GFPGAN

模型对比：
| 模型 | 特点 | 推荐场景 |
|------|------|----------|
| CodeFormer | 效果最好，细节丰富 | 高质量面部修复 |
| GFPGAN v1.4 | 速度快，效果好 | 快速面部修复 |
| GFPGAN v1.3 | 较老版本 | 一般不推荐 |
```

#### 方案三：ADetailer 等效手动工作流
```
生成基础图像
    ↓
人脸检测（Face Detection YOLO）
    ↓
裁切人脸区域（Crop By Mask + 扩展边距）
    ↓
对人脸区域单独 Inpaint（denoise=0.3-0.5）
    ↓
贴回原图（Paste Back）
    ↓
输出最终图像
```

#### 面部修复参数建议
| 参数 | 推荐值 | 说明 |
|------|--------|------|
| denoise | 0.3-0.5 | 保持面部特征 |
| face_restore_model | CodeFormer | 质量最好 |
| fidelity | 0.5 | 平衡修复和保真 |
| guide_size | 384 | 面部处理分辨率 |
| 提示词 | 加入 "beautiful face, detailed eyes" | 面部专用描述 |

#### 组合使用最佳实践
```
最佳方案：FaceDetailer + CodeFormer 组合

1. KSampler 生成基础图像
2. FaceDetailer 修复面部结构（Inpaint 方式）
3. FaceRestore + CodeFormer 精修细节（后处理方式）

效果：面部结构正确 + 细节丰富
```

---

### 4.8 批量生成工作流

#### 方法一：批次大小（Batch Size）
```
EmptyLatentImage (batch_size=4)
    ↓
KSampler (一次生成4张)
    ↓
VAEDecode
    ↓
SplitImage / SaveImage (分别保存)
```
**优点**：利用 GPU 并行，速度快
**缺点**：所有图使用相同提示词和参数
**限制**：显存线性增加，8GB 显存通常 batch_size=2-4

#### 方法二：循环工作流（不同 Seed）
```
使用 ComfyUI Loop 功能：
1. 安装 ComfyUI-Easy-Use 或 ComfyUI-Impact-Pack
2. 使用 Loop 节点设置循环次数
3. 每次循环使用 Seed + 1（自动递增）
4. 所有图像保存到 output 目录
```
**优点**：每张图不同，多样性好
**缺点**：不能 GPU 并行，速度较慢

#### 方法三：提示词批量（Dynamic Prompt）
```
使用 Dynamic Prompt 节点：
1. 在提示词中使用 {选项1|选项2|选项3} 语法
2. 每次生成随机选择组合
3. 配合 Loop 实现批量

示例提示词：
"a {beautiful|gorgeous|stunning} {young|elderly} {woman|man}
 wearing {red|blue|green} {dress|suit|coat}
 in {garden|forest|city}"
```

#### 方法四：CSV/文件驱动批量生成
```
1. 准备 CSV 文件，每行一组参数（提示词、种子、模型等）
2. 使用自定义节点读取 CSV
3. 逐行执行工作流
4. 每行对应一张输出图

适用场景：
- 电商产品图（不同产品描述）
- 批量头像（不同角色描述）
- 测试对比（固定种子，不同提示词）
```

#### 方法五：API 驱动批量生成
```python
import json
import random

prompts = [
    "a cat sitting on a table",
    "a dog running in the park",
    "a bird flying over the ocean",
]

for i, prompt_text in enumerate(prompts):
    workflow["3"]["inputs"]["text"] = prompt_text
    workflow["5"]["inputs"]["seed"] = random.randint(0, 2**32)
    queue_prompt(workflow)
    time.sleep(2)  # 等待完成
```
**优点**：最灵活，可编程控制所有参数
**适用**：需要与外部系统集成的场景

---

### 4.9 多模型切换工作流

#### 场景
- 基础模型生成大结构，精细模型优化细节
- 不同阶段使用不同 LoRA

#### 实现方式
```
CheckpointLoaderSimple (模型A)
    ↓
KSampler (start_at_step=0, end_at_step=15)
    ↓
CheckpointLoaderSimple (模型B)
    ↓
KSampler (start_at_step=15, end_at_step=30)
```

---

### 4.10 SDXL Refiner 工作流（仅限官方 SDXL Base + Refiner）

> **结论：如果你不是在用官方 SDXL Base + 官方 SDXL Refiner，直接忽略 Refiner 即可。**
> 
> 绝大多数 SDXL 衍生模型（Pony、NoobAI、Illustrious、Animagine XL、Juggernaut XL、RealVisXL 等）都不使用 Refiner，因为训练时已经把 Refiner 的效果融合进去了。

#### Refiner 是什么

SDXL 官方实际上发布了两个模型：Base 和 Refiner。

```
Base → 先画出整体（80% 去噪）
Refiner → 补细节（最后 20% 去噪）
```

经典设置（30步总步数）：
```
Base: 24 步（80%）
Refiner: 6 步（20%）
即 switch at 0.8
```

#### 为什么现在很少人用了

后来出现的衍生模型（Pony、NoobAI、Illustrious、Juggernaut、RealVisXL 等）训练时已经把 Refiner 的效果融合进去了。因此：
```
直接采样 30 步 → 通常比 20步Base + 10步Refiner 效果更好，而且速度更快
```

#### 如何判断当前模型需不需要 Refiner

看模型作者有没有写 "Requires SDXL Refiner" 或 "Recommended with Refiner"。

以下模型**不需要** Refiner：
- Pony、NoobAI、Illustrious
- Animagine XL、RealVisXL、Juggernaut XL
- 以及几乎所有社区微调 SDXL 模型

#### 如果用官方 Refiner

**CLIPTextEncodeSDXLRefiner 节点参数**

| 参数 | 说明 | 推荐设置 |
|------|------|----------|
| `text` | 正面提示词 | 直接复制 Base 的正面提示词即可 |
| `aesthetic_score` | 美学评分（Refiner 训练时额外学习的参数） | 6.0-7.0（官方推荐 6 或 6.5） |
| `width` | 目标宽度 | 与最终生成尺寸一致 |
| `height` | 目标高度 | 与最终生成尺寸一致 |

**aesthetic_score 详解**
```
范围：1-10
官方推荐：6 或 6.5
越高 → 细节越精致，但可能过拟合
越低 → 越自然，但精修效果弱
常用值：6 或 7
```

**切换点调节**
```
经典：switch at 0.8（Base 80%，Refiner 20%）
社区最常见：0.8

情况1：整体不错但细节糊（眼睛模糊、睫毛少）
  → 从 0.8 降到 0.75，让 Refiner 工作更多步

情况2：构图被破坏（脸歪、人物变样）
  → 从 0.8 升到 0.85，让 Refiner 介入更晚
```

**完整节点连接（仅官方 Base + Refiner）**
```
节点1: CheckpointLoaderSimple (sd_xl_base_1.0.safetensors)
    → MODEL_base, CLIP_base, VAE_base

节点2: CLIPTextEncodeSDXL (正向, 使用 CLIP_base)
节点3: CLIPTextEncodeSDXL (负向, 使用 CLIP_base)

节点4: EmptyLatentImage (1024×1024)

节点5: KSampler (Base)
    model=MODEL_base, positive=节点2, negative=节点3, latent=节点4
    steps=30, cfg=7.0, sampler=dpmpp_2m, scheduler=karras, denoise=1.0

节点6: CheckpointLoaderSimple (sd_xl_refiner_1.0.safetensors)
    → MODEL_refiner, CLIP_refiner, VAE_refiner

节点7: CLIPTextEncodeSDXLRefiner
    text = "和 Base 相同的正面提示词"
    aesthetic_score = 6
    width = 1024, height = 1024

节点8: KSampler (Refiner)
    model=MODEL_refiner, positive=节点7, negative=节点3, latent=节点5的输出
    steps=6, cfg=7.0, sampler=dpmpp_2m, scheduler=karras, denoise=0.2

节点9: VAEDecode → SaveImage
```

#### 学习建议

先把 Refiner 当作历史知识了解即可。优先掌握以下内容，它们对出图影响远大于 Refiner：
1. Prompt（提示词）
2. LoRA
3. CFG
4. Sampler / Scheduler
5. Hires Fix
6. ControlNet

等你真正开始研究原版 SDXL Base 1.0 时，再专门玩 Refiner，会更容易理解它的作用。

#### 为什么几乎只有官方出了 Refiner 模型

实际上你能正常用到的 Refiner 几乎只有官方 SDXL Refiner 1.0，它是专门与 SDXL Base 1.0 配套训练的。后来社区几乎没人再做 Refiner，原因如下：

**原因一：必须与 Base 配套训练**
```
Refiner 不是独立模型。
A模型 + A模型Refiner → 效果最好
Pony + 官方Refiner → 画风漂移、人脸变化、衣服改变

因为两者训练数据不同，特征空间不匹配。
```

**原因二：训练成本翻倍**
```
训练一个完整 SDXL 模型已经很贵
再训练配套 Refiner → 成本直接翻倍
所以大部分作者选择：直接把 Refiner 能力融进 Base
```

**社区 Refiner 尝试**
- Juggernaut Refiner、DreamShaper Refiner、RealVis Refiner 等实验版本存在过
- 但普及度很低，很多已无人维护
- 效果未必超过直接增加采样步数

**SD1.5 时代有 Refiner 吗**
- 严格来说没有
- 当年常见的是 txt2img → img2img 二次重绘，思想类似但不是 Refiner 模型

**Flux、Pony、NoobAI 呢**
- 这些基本已放弃 Refiner 思路
- 它们通常采用：单模型 + 更多训练 + LoRA + 高分辨率修复
- 而非 Base + Refiner 两阶段

#### 现代替代 Refiner 的方案

如果觉得细节不够，现代工作流一般优先用以下方案，通常比官方 Refiner 更有效：

| 方案 | 说明 |
|------|------|
| 增加采样步数 | 20步 → 30步，最简单 |
| Hires Fix | 低分辨率生成 → 放大 → 二次采样补充细节 |
| Ultimate SD Upscale | 分块放大，大图必备 |
| Tile ControlNet | 用参考图控制放大后的细节 |
| 4x-UltraSharp 等超分模型 | AI 放大，细节丰富 |

**总结**：对于当前 ComfyUI 生态，SDXL Refiner 主要是学习 SDXL 架构时需要了解的概念。实际出图中，Pony、NoobAI、Illustrious、Flux 用户基本可以认为 Refiner 已经退出主流工作流了。

---

### 4.11 Flux 专用工作流

#### 基础 Flux 文生图工作流
```
节点1: UNETLoader (flux1-dev.safetensors 或 flux1-schnell.safetensors)
    → MODEL

节点2: DualCLIPLoader
    clip_name1 = t5xxl_fp16.safetensors  (T5 文本编码器)
    clip_name2 = clip_l.safetensors       (CLIP 编码器)
    type = flux
    → CLIP

节点3: VAELoader (ae.safetensors — Flux 专用 VAE)
    → VAE

节点4: CLIPTextEncode (提示词, 使用 CLIP)
    → CONDITIONING

节点5: EmptySD3LatentImage (1024×1024)
    → LATENT

节点6: FluxGuidance
    conditioning = 节点4
    guidance = 3.5
    → CONDITIONING（带引导）

节点7: KSampler
    model=MODEL, positive=节点6, latent=节点5
    steps=20 (Dev) / 4 (Schnell), cfg=1.0, sampler=euler, scheduler=normal, denoise=1.0

节点8: VAEDecode (VAE)
节点9: SaveImage
```

#### Flux 特殊注意事项
- Flux 使用 `EmptySD3LatentImage` 而非 `EmptyLatentImage`（通道数不同：16 vs 4）
- Flux Schnell 仅需 4 步，Dev 推荐 20 步
- CFG 通常设为 1.0（Flux 架构内置引导机制）
- 提示词用自然语言，不需要质量词和权重语法
- Flux 使用 `FluxGuidance` 节点替代传统 CFG 引导
- T5 模型文件较大（约 9.8GB FP16），显存需求高

---

## 阶段五：高级技术

> 深入 ComfyUI 的高级功能和开发能力，成为真正的 ComfyUI 专家。

---

### 5.1 ComfyUI 自定义节点开发

#### 什么是自定义节点
- 用 Python 编写的自定义处理逻辑
- 可以添加新的节点到 ComfyUI 界面
- 通过 `custom_nodes/` 目录加载

#### 节点结构
```python
class MyCustomNode:
    """
    自定义节点类
    """
    
    # 类属性定义节点信息
    CATEGORY = "my_nodes"           # 节点分类
    FUNCTION = "execute"            # 执行函数名
    RETURN_TYPES = ("IMAGE",)       # 返回类型
    RETURN_NAMES = ("image",)       # 返回名称
    
    @classmethod
    def INPUT_TYPES(cls):
        """定义输入参数"""
        return {
            "required": {
                "image": ("IMAGE",),
                "strength": ("FLOAT", {
                    "default": 1.0,
                    "min": 0.0,
                    "max": 2.0,
                    "step": 0.01
                }),
            },
            "optional": {
                "mask": ("MASK",),
            }
        }
    
    def execute(self, image, strength, mask=None):
        """
        执行逻辑
        """
        # 处理逻辑
        result = image * strength
        return (result,)
```

#### 节点注册
```python
# __init__.py 或 node.py 末尾
NODE_CLASS_MAPPINGS = {
    "MyCustomNode": MyCustomNode,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "MyCustomNode": "My Custom Node",
}
```

#### 数据类型对应
| ComfyUI 类型 | Python 类型 | 说明 |
|--------------|-------------|------|
| IMAGE | torch.Tensor [B,H,W,C] | 图像张量 |
| LATENT | dict with 'samples' | 潜空间字典 |
| MASK | torch.Tensor [B,H,W] | 遮罩张量 |
| MODEL | torch.nn.Module | 模型对象 |
| CLIP | 对象 | CLIP 编码器 |
| VAE | 对象 | VAE 编码器 |
| CONDITIONING | list | 条件列表 |
| CONTROL_NET | 对象 | ControlNet 模型 |
| STRING | str | 字符串 |
| INT | int | 整数 |
| FLOAT | float | 浮点数 |
| BOOLEAN | bool | 布尔值 |

#### 开发流程
1. 在 `custom_nodes/` 创建目录
2. 编写节点 Python 文件
3. 创建 `__init__.py` 注册节点
4. 重启 ComfyUI 加载节点
5. 在界面中测试

#### 高级功能
- **Lazy Evaluation**：按需计算，优化性能
- **IS_CHANGED**：控制缓存行为
- **VALIDATE_INPUTS**：输入验证
- **OUTPUT_NODE**：标记为输出节点
- **CATEGORY**：多级分类用 `/` 分隔

#### 完整自定义节点示例：图像混合节点

```python
# custom_nodes/image_blend/node.py
import torch
import torch.nn.functional as F

class ImageBlendNode:
    """
    将两张图像按指定模式混合
    """
    
    CATEGORY = "image/blend"
    FUNCTION = "blend"
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("blended_image",)

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image1": ("IMAGE",),
                "image2": ("IMAGE",),
                "blend_mode": (["normal", "multiply", "screen", "overlay"],),
                "opacity": ("FLOAT", {
                    "default": 0.5,
                    "min": 0.0,
                    "max": 1.0,
                    "step": 0.01,
                    "display": "slider"
                }),
            },
            "optional": {
                "mask": ("MASK",),
            }
        }

    def blend(self, image1, image2, blend_mode, opacity, mask=None):
        # 确保两张图像尺寸一致
        if image1.shape != image2.shape:
            image2 = F.interpolate(
                image2.permute(0, 3, 1, 2),
                size=(image1.shape[1], image1.shape[2]),
                mode='bilinear',
                align_corners=False
            ).permute(0, 2, 3, 1)
        
        # 根据混合模式计算
        if blend_mode == "normal":
            result = image2
        elif blend_mode == "multiply":
            result = image1 * image2
        elif blend_mode == "screen":
            result = 1 - (1 - image1) * (1 - image2)
        elif blend_mode == "overlay":
            result = torch.where(
                image1 < 0.5,
                2 * image1 * image2,
                1 - 2 * (1 - image1) * (1 - image2)
            )
        
        # 按透明度混合
        blended = image1 * (1 - opacity) + result * opacity
        
        # 如果有遮罩，应用遮罩
        if mask is not None:
            mask = mask.unsqueeze(-1).expand_as(image1)
            blended = image1 * (1 - mask) + blended * mask
        
        # 裁切到有效范围
        blended = torch.clamp(blended, 0, 1)
        
        return (blended,)


# 注册节点
NODE_CLASS_MAPPINGS = {
    "ImageBlendNode": ImageBlendNode,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "ImageBlendNode": "Image Blend",
}
```

```python
# custom_nodes/image_blend/__init__.py
from .node import NODE_CLASS_MAPPINGS, NODE_DISPLAY_NAME_MAPPINGS

__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS']
```

#### 节点开发最佳实践
1. **输入验证**：使用 `VALIDATE_INPUTS` 方法验证输入参数
2. **错误处理**：用 try/except 包裹可能出错的代码，返回有意义的错误信息
3. **类型安全**：确保输出类型与 `RETURN_TYPES` 声明一致
4. **显存管理**：处理大图像时注意 `torch.no_grad()` 和及时释放不用的张量
5. **文档字符串**：在类中写清楚节点的功能说明
6. **测试**：在 ComfyUI 中实际测试节点的各种输入情况

---

### 5.2 ComfyUI Manager

#### 是什么
ComfyUI Manager 是 ComfyUI 生态中最核心的管理工具，由开发者 ltdrdata 维护，提供图形界面管理自定义节点和模型。

#### 核心功能详解

**1. 节点管理**
- **Install Custom Nodes**：浏览和安装社区开发的节点包
- **Update All**：一键更新所有已安装的节点
- **Disable/Enable**：临时禁用节点（不需要卸载）
- **Uninstall**：卸载不需要的节点
- **冲突检测**：检测不同节点包之间的命名冲突

**2. 缺失节点检测**
- 打开工作流时自动检测缺失的节点
- 提示缺失节点的名称和安装方式
- 支持一键安装缺失节点

**3. 模型下载**
- 直接从 CivitAI / HuggingFace 下载模型
- 自动放入正确的目录
- 支持断点续传

**4. 依赖管理**
- 自动检测节点的 Python 依赖
- 提示安装缺失的 pip 包
- 支持 requirements.txt 自动安装

#### 安装方式
```bash
cd ComfyUI/custom_nodes
git clone https://github.com/ltdrdata/ComfyUI-Manager.git
# 重启 ComfyUI 后在界面右侧出现 Manager 按钮
```

#### 使用建议
- 定期点击 "Update All" 更新已安装节点
- 安装节点后需要重启 ComfyUI
- 注意节点兼容性（某些节点可能冲突）
- 使用 "Install via Git URL" 安装特定版本
- 遇到问题时可以 "Disable All Custom Nodes" 排查是否是自定义节点导致

---

### 5.3 通配符与动态提示词

#### Wildcards（通配符）
- **语法**：`__character__` 从预定义列表中随机选择
- **用途**：批量生成时增加多样性
- **示例**：
  ```
  a __haircolor__ haired __age__ woman wearing __clothing__
  ```
  会从 haircolor.txt、age.txt、clothing.txt 中随机选择

#### Dynamic Prompts
- **语法**：`{option1|option2|option3}` 随机选择一个
- **组合使用**：可以嵌套和组合
- **示例**：
  ```
  a {beautiful|gorgeous|stunning} {young|elderly} woman
  ```

#### 在 ComfyUI 中使用
- 需要安装 `ComfyUI-Dynamic-Prompts` 或 `ComfyUI-Impact-Pack` 等节点
- 使用 `WildcardProcessor` 或 `DynamicPromptText` 节点

---

### 5.4 区域提示词（Regional Prompting）

#### 是什么
对图像的不同区域应用不同的提示词，实现分区控制。这是处理多人场景和复杂构图的关键技术。

#### 工作方式
1. 定义区域（矩形、圆形、遮罩）
2. 每个区域绑定独立的提示词
3. 在去噪过程中，不同区域使用不同的条件
4. 区域之间通过注意力机制自然融合

#### 实现方法

**方法一：Attention Couple（推荐）**
```
原理：将图像分为多个注意力区域，每个区域独立编码
优点：自然融合，无硬边界
使用节点：AttentionCouple

工作流：
1. 创建区域遮罩（矩形/圆形/自定义）
2. 每个区域绑定一个 CLIPTextEncode
3. 使用 AttentionCouple 节点组合所有区域
4. 输出合并后的 Conditioning → KSampler
```

**方法二：Conditioning Set Area**
```
原理：ComfyUI 内置节点，按矩形区域设置条件
优点：简单直接，无需额外插件
使用节点：ConditioningSetArea

工作流：
CLIPTextEncode(左半描述) → ConditioningSetArea(width=512, x=0) → ConditioningCombine
CLIPTextEncode(右半描述) → ConditioningSetArea(width=512, x=512) → ConditioningCombine
合并后的 Conditioning → KSampler
```

**方法三：BNK Conditioning**
```
使用 ComfyUI_BNK 插件
支持更灵活的区域定义和条件混合
```

#### 应用场景
- **多人场景**：左边描述人物A，右边描述人物B
- **复杂构图**：前景/中景/背景分别控制
- **多风格区域**：左半写实，右半动漫
- **产品展示**：产品区域和背景区域分别描述

#### 实际示例：双人场景
```
区域1（左半，遮罩遮住右半）：
"a young woman with red hair, wearing a blue dress"

区域2（右半，遮罩遮住左半）：
"an old man with white beard, wearing a suit"

背景（全图）：
"in a beautiful garden with flowers"

合并后的效果：图左边是红发蓝裙年轻女性，右边是白胡须西装老人，背景是花园
```

---

### 5.5 AnimateDiff 视频生成工作流

#### 是什么
AnimateDiff 是将 Stable Diffusion 扩展为视频生成的技术，通过运动模块让静态图像动起来。它是目前 ComfyUI 中最成熟的视频生成方案。

#### 工作原理
- 在 U-Net 中注入时间注意力层（Temporal Attention）
- 运动模块学习帧间运动规律（从视频数据集中训练）
- 一次生成连续多帧（通常 16 帧）
- 使用滑动窗口（Context Batch）机制生成更长视频

#### 完整工作流节点连接
```
节点1: CheckpointLoaderSimple
    → MODEL, CLIP, VAE

节点2: AnimateDiff Loader
    model = MODEL
    model_name = mm_sd_v15_v2.safetensors (运动模块)
    → 带运动模块的 MODEL

节点3: AnimateDiff Model Settings
    model = 节点2输出
    beta_schedule = sqrt_linear (推荐)
    → 带设置的 MODEL

节点4: CLIPTextEncode (正向提示词)
节点5: CLIPTextEncode (负向提示词)

节点6: EmptyLatentImage
    width = 512, height = 512
    batch_size = 16 (帧数)
    → LATENT

节点7: KSampler
    model = 节点3, positive = 节点4, negative = 节点5, latent = 节点6
    steps = 20, cfg = 7.0, sampler = dpmpp_2m, scheduler = karras
    → LATENT (16帧)

节点8: VAEDecode
    samples = 节点7, vae = VAE
    → IMAGE (16张图像)

节点9: Video Combine
    images = 节点8
    frame_rate = 8
    format = video/h264-mp4
    → 视频文件
```

#### 关键参数详解
| 参数 | 推荐值 | 说明 |
|------|--------|------|
| 帧数（Frames） | 16-32 | 一次生成的帧数，受显存限制 |
| 帧率（FPS） | 8-12 | 输出视频的播放速度 |
| 运动模块版本 | mm_sd_v15_v2 | 推荐的运动模块 |
| beta_schedule | sqrt_linear | 噪声调度策略 |
| Context Batch | 16 | 滑动窗口大小 |
| Context Stride | 1-4 | 滑动窗口步长 |

#### 运动模块选择
| 运动模块 | 特点 | 适用场景 |
|----------|------|----------|
| mm_sd_v15_v2 | 通用版，稳定 | 通用动画 |
| mm_sd_v15_v3 | 更多运动 | 动态场景 |
| mm_sdxl_v10 | SDXL 专用 | SDXL 高清动画 |
| mm-Stabilized | 更稳定的运动 | 减少闪烁 |
| mm-Camera | 相机运动控制 | 推拉摇移 |
| temporaldiff | 高质量 | 高级动画 |

#### 进阶应用

**ControlNet + AnimateDiff**
```
用途：控制每帧的姿态/深度/边缘
效果：保持帧间一致性，控制运动轨迹
工作流：在 KSampler 之前叠加 ControlNetApply
```

**IP-Adapter + AnimateDiff**
```
用途：保持风格一致性
效果：整个视频保持统一风格
工作流：在 AnimateDiff Loader 之后叠加 IP-Adapter Apply
```

**长视频生成（滑动窗口）**
```
使用 Context Options 节点：
- context_length = 16 (每批处理16帧)
- context_stride = 4 (滑动步长)
- context_overlap = 4 (重叠帧数)
- closed_loop = True (首尾循环)

效果：生成任意长度的视频
原理：每次处理16帧，滑动窗口向前移动，重叠区域平滑过渡
```

#### 常见问题
- **闪烁严重**：增加 Steps，使用 Stabilized 模块，降低运动强度
- **运动太大**：降低 motion_scale 参数
- **显存不足**：减少帧数（16→8），减小分辨率
- **画面静止**：提示词中加入动态描述（walking, flowing, blowing）

---

### 5.6 ComfyUI 与外部 API 集成

#### API 接口概述
ComfyUI 提供完整的 REST API 和 WebSocket API，支持程序化控制所有操作。

#### REST API 端点

| 端点 | 方法 | 说明 |
|------|------|------|
| `/prompt` | POST | 提交工作流执行 |
| `/prompt/{prompt_id}` | GET | 查询任务状态 |
| `/history` | GET | 获取历史记录 |
| `/history/{prompt_id}` | GET | 获取特定任务历史 |
| `/queue` | GET | 查看队列状态 |
| `/queue` | POST | 操作队列（清空等） |
| `/object_info` | GET | 获取所有节点信息 |
| `/object_info/{node_name}` | GET | 获取特定节点信息 |
| `/system_stats` | GET | 系统状态（GPU 信息等） |
| `/view` | GET | 获取生成的图像 |
| `/upload/image` | POST | 上传图像到 input 目录 |
| `/upload/mask` | POST | 上传遮罩 |

#### 完整 Python API 调用示例

```python
import json
import urllib.request
import urllib.parse
import websocket
import uuid
import time

SERVER_ADDRESS = "127.0.0.1:8188"
CLIENT_ID = str(uuid.uuid4())

def queue_prompt(prompt):
    """提交工作流到 ComfyUI"""
    p = {"prompt": prompt, "client_id": CLIENT_ID}
    data = json.dumps(p).encode('utf-8')
    req = urllib.request.Request(
        f"http://{SERVER_ADDRESS}/prompt",
        data=data,
        headers={'Content-Type': 'application/json'}
    )
    response = urllib.request.urlopen(req)
    return json.loads(response.read())

def get_image(filename, subfolder, folder_type):
    """获取生成的图像"""
    data = {"filename": filename, "subfolder": subfolder, "type": folder_type}
    url_values = urllib.parse.urlencode(data)
    response = urllib.request.urlopen(
        f"http://{SERVER_ADDRESS}/view?{url_values}"
    )
    return response.read()

def get_history(prompt_id):
    """获取任务历史"""
    response = urllib.request.urlopen(
        f"http://{SERVER_ADDRESS}/history/{prompt_id}"
    )
    return json.loads(response.read())

def wait_for_completion(prompt_id):
    """通过 WebSocket 等待任务完成"""
    ws = websocket.WebSocket()
    ws.connect(f"ws://{SERVER_ADDRESS}/ws?clientId={CLIENT_ID}")
    
    while True:
        out = ws.recv()
        if isinstance(out, str):
            message = json.loads(out)
            if message['type'] == 'executing':
                data = message['data']
                if data['node'] is None and data['prompt_id'] == prompt_id:
                    break  # 执行完成
    ws.close()

# 定义工作流（API 格式，非 UI 格式）
workflow = {
    "1": {
        "class_type": "CheckpointLoaderSimple",
        "inputs": {
            "ckpt_name": "v1-5-pruned.safetensors"
        }
    },
    "2": {
        "class_type": "EmptyLatentImage",
        "inputs": {
            "width": 512,
            "height": 512,
            "batch_size": 1
        }
    },
    "3": {
        "class_type": "CLIPTextEncode",
        "inputs": {
            "text": "a beautiful sunset over mountains",
            "clip": ["1", 1]
        }
    },
    "4": {
        "class_type": "CLIPTextEncode",
        "inputs": {
            "text": "low quality, blurry",
            "clip": ["1", 1]
        }
    },
    "5": {
        "class_type": "KSampler",
        "inputs": {
            "model": ["1", 0],
            "positive": ["3", 0],
            "negative": ["4", 0],
            "latent_image": ["2", 0],
            "seed": 42,
            "steps": 20,
            "cfg": 7.0,
            "sampler_name": "dpmpp_2m",
            "scheduler": "karras",
            "denoise": 1.0
        }
    },
    "6": {
        "class_type": "VAEDecode",
        "inputs": {
            "samples": ["5", 0],
            "vae": ["1", 2]
        }
    },
    "7": {
        "class_type": "SaveImage",
        "inputs": {
            "filename_prefix": "output",
            "images": ["6", 0]
        }
    }
}

# 执行
prompt_id = queue_prompt(workflow)['prompt_id']
wait_for_completion(prompt_id)

# 获取结果
history = get_history(prompt_id)[prompt_id]
for node_id, node_output in history['outputs'].items():
    if 'images' in node_output:
        for img in node_output['images']:
            image_data = get_image(img['filename'], img['subfolder'], img['type'])
            with open(f"output_{img['filename']}", 'wb') as f:
                f.write(image_data)
```

#### API 工作流 vs UI 工作流的区别
- **UI 工作流**：包含节点位置、颜色等显示信息（`.json` 或 `.png` 嵌入）
- **API 工作流**：仅包含节点连接和参数（纯数据）
- 在 ComfyUI 界面中：右键 → `Save (API Format)` 导出 API 格式

#### 应用场景
- Web 应用后端集成（Flask/FastAPI 封装）
- 批量自动化生成（循环调用 API，修改 Seed/提示词）
- 与其他 AI 系统对接（LLM 生成提示词 → ComfyUI 生成图像）
- 移动端/小程序接入
- 自动化流水线（CI/CD 集成）

---

### 5.7 工作流 JSON 结构

> 完整的 JSON 格式参考请见 [附录 G：工作流 JSON 完整参考](#附录-g工作流-json-完整参考)

#### 核心概念速览
ComfyUI 工作流有两种格式：
- **UI 格式**：界面保存用，包含节点位置、大小等显示信息（`Ctrl+S` 导出）
- **API 格式**：程序调用用，仅包含节点类型和参数（`Save (API Format)` 导出）

API 格式中引用其他节点输出的方式：
```json
{
  "clip": ["源节点ID", 输出端口索引]
}
```

#### 常见操作
| 操作 | 方法 |
|------|------|
| 保存 UI 格式 | `Ctrl+S` |
| 保存 API 格式 | 菜单 → `Save (API Format)` |
| 从图像恢复工作流 | 拖拽含元数据的 PNG 到画布 |
| 批量修改参数 | 用 Python 脚本读取 JSON 并修改（见附录 G.5） |

---

### 5.8 性能优化

#### 显存管理
| 策略 | 说明 | 效果 |
|------|------|------|
| `--lowvram` | 低显存模式 | 降低显存占用，变慢 |
| `--novram` | 极低显存模式 | 最大限度降低显存 |
| `--cpu` | CPU 模式 | 无需 GPU，极慢 |
| `--fp16-vae` | 半精度 VAE | 减少 VAE 显存 |
| `--fp8_e4m3fn-unet` | FP8 UNet | 显存减半，RTX 40 系优化 |
| 模型卸载 | 不用的模型自动卸载 | 释放显存 |
| 手动模型管理 | 使用 `ModelLoader` 节点 | 精确控制显存 |

#### 批次处理
- **Batch Size**：一次生成多张，利用 GPU 并行
- **注意**：Batch Size 增加会线性增加显存占用
- **建议**：在显存允许范围内尽量增大 Batch Size
- **显存估算公式**：
  - SD1.5：约 2GB 基础 + 每张 512×512 约 0.5GB
  - SDXL：约 6GB 基础 + 每张 1024×1024 约 2GB
  - Flux Dev：约 12GB 基础（使用量化后约 8GB）

#### 模型量化详解

| 量化方式 | 精度 | 模型大小 | 显存需求 | 质量损失 | 适用场景 |
|----------|------|----------|----------|----------|----------|
| FP32 | 32位 | 最大 | 最高 | 无 | 训练 |
| FP16/BF16 | 16位 | 减半 | 减半 | 极小 | 推理首选 |
| FP8 (E4M3) | 8位 | 1/4 | 明显降低 | 小 | RTX 40 系列 |
| INT8 | 8位 | 1/4 | 明显降低 | 中等 | 通用 |
| NF4 | 4位 | 1/8 | 极低 | 较大 | 极低显存 |
| GGUF Q4 | 4位混合 | 1/8 | 极低 | 中等 | CPU+GPU 混合推理 |
| GGUF Q5 | 5位混合 | ~1/6 | 很低 | 较小 | 平衡方案 |
| GGUF Q8 | 8位混合 | ~1/4 | 低 | 小 | 高质量量化 |

#### GGUF 量化详解
- **是什么**：GGUF（GPT-Generated Unified Format）是 llama.cpp 项目开发的量化格式
- **优势**：
  - 支持 CPU+GPU 混合推理（部分层在 CPU，部分在 GPU）
  - 极低显存也能运行大模型（如 Flux）
  - 质量损失相对较小
- **在 ComfyUI 中使用**：
  - 安装 `ComfyUI-GGUF` 自定义节点
  - 使用 `UnetLoaderGGUF` 节点加载 .gguf 模型
  - T5 文本编码器也可量化为 GGUF（大幅减少显存）
- **量化等级选择**：
  - Q4_K_M：最低显存，可接受质量
  - Q5_K_M：平衡选择，推荐
  - Q8_0：最高质量量化，接近原始 FP16

#### LCM / Turbo / Lightning 加速模型

**LCM（Latent Consistency Models）**
- **原理**：通过蒸馏技术，将去噪步骤压缩到 4-8 步
- **使用方法**：
  1. 加载 LCM LoRA 或 LCM 专用模型
  2. KSampler 设置 steps=4-8, cfg=1.0-2.0, sampler=lcm
- **效果**：速度提升 5-10 倍，质量略有下降
- **适用场景**：实时预览、快速迭代、交互式创作

**Turbo 模型（SD Turbo）**
- Stability AI 发布的加速模型
- 1-4 步即可出图
- cfg=1.0，denoise=1.0
- 适合实时交互场景

**Lightning 模型（SDXL Lightning）**
- ByteDance 发布的 SDXL 加速版
- 2-4 步出图，质量优于 Turbo
- 需要特定的采样器设置

**加速模型对比**
| 模型 | 步数 | CFG | 速度 | 质量 | 兼容性 |
|------|------|-----|------|------|--------|
| 标准模型 | 20-30 | 5-8 | 基准 | 最好 | 最佳 |
| LCM | 4-8 | 1-2 | 5× | 好 | 好（LoRA 形式） |
| Turbo | 1-4 | 1.0 | 10× | 中 | 专用模型 |
| Lightning | 2-4 | 1.0 | 8× | 好 | SDXL 专用 |
| Flux Schnell | 4 | 1.0 | 8× | 很好 | Flux 专用 |

#### 缓存机制
- ComfyUI 自动缓存未变化节点的输出
- 修改下游节点不会重新执行上游
- 使用 `CacheNode` 手动控制缓存
- 缓存数据存储在内存和显存中
- 大量图像的缓存可能导致内存不足，需要手动清理

#### 执行优化
- `--preview-method auto`：生成过程中实时预览
- 合理拆分工作流，避免不必要的重复计算
- 使用 `Reroute` 节点整理连线，不影响性能
- 启用 `--fast` 模式（实验性，优化执行顺序）

#### torch.compile 优化（高级）
```bash
# 启动时启用 torch.compile
python main.py --use-pytorch-cross-attention
```
- PyTorch 2.0+ 的编译优化，可加速推理 10-30%
- 首次运行需要编译时间（几分钟），后续复用缓存
- 仅支持 Linux，Windows 支持有限

---

## 阶段六：专业应用

> 将 ComfyUI 应用于实际生产场景，掌握专业级工作流和技术。

---

### 6.1 商业级图像生成流程

#### 标准化流程
1. **需求分析**：明确图像用途、尺寸、风格要求
2. **模型选择**：根据需求选择合适的基础模型
3. **工作流搭建**：构建标准化工作流模板
4. **参数调优**：通过小批量测试确定最佳参数
5. **批量生成**：使用确定参数批量生成
6. **质量筛选**：人工或自动筛选满意结果
7. **后处理**：Photoshop 等工具精修
8. **交付输出**：按要求格式输出

#### 质量控制要点
- 固定 Seed 用于复现
- 建立参数基准（Baseline）
- 多批次对比测试
- 记录每张图的完整参数

---

### 6.2 风格一致性控制

#### 方法一：LoRA + 固定参数
```
使用固定风格 LoRA + 固定 Seed + 固定参数
优点：简单直接
缺点：灵活性低
```

#### 方法二：IP-Adapter 风格参考
```
参考图像 → IP-Adapter → 注入风格特征
优点：灵活，可以参考任意图像
缺点：需要额外模型，占用显存
```

#### 方法三：LoRA + IP-Adapter 组合
```
风格 LoRA（定义大方向）+ IP-Adapter（微调细节）
优点：兼顾一致性和灵活性
```

#### 方法四：风格 Prompt 标准化
```
定义标准化风格描述模板
所有生成使用统一的风格前缀
```

---

### 6.3 角色一致性工作流

#### 挑战
- AI 生成的人物每次都不一样
- 需要在多张图中保持同一角色外观

#### 解决方案

**方案一：角色 LoRA**
- 训练角色专用 LoRA
- 使用固定触发词
- 优点：一致性最好
- 缺点：需要训练数据和时间

**方案二：IP-Adapter FaceID**
- 使用参考人脸照片
- IP-Adapter 保持面部特征
- 优点：无需训练
- 缺点：非面部部分一致性较低

**方案三：InstantID**
- 单张照片即可保持面部身份
- 比 FaceID 更精确
- 优点：效果好，使用简单
- 缺点：模型较大

**方案四：PuLID**
- 最新的身份保持技术
- 更好的面部一致性
- 优点：质量高
- 缺点：较新，生态待完善

#### 最佳实践
1. 先用 IP-Adapter/InstantID 确定角色基础外观
2. 固定 Seed 和参数
3. 使用 ControlNet 控制姿态
4. 必要时训练角色 LoRA

---

### 6.4 ComfyUI 与外部工具协作

#### ComfyUI + Photoshop
- **ComfyUI → PS**：生成图像后在 PS 中精修
- **PS → ComfyUI**：PS 中制作遮罩/草图，送入 ComfyUI 处理
- **自动化**：使用脚本实现 PS 和 ComfyUI 的自动化流水线
- **ComfyUI 插件**：`ComfyUI-Photoshop` 可实现 PS 与 ComfyUI 的直接连接

#### ComfyUI + Blender
- Blender 渲染深度图/法线图
- 送入 ControlNet 控制生成
- 适合 3D 辅助的 2D 创作
- **工作流**：
  1. 在 Blender 中搭建简单 3D 场景
  2. 渲染出 Depth / Normal / Canny 图
  3. 送入 ComfyUI 的 ControlNet
  4. 生成风格化的 2D 图像

#### ComfyUI + LLM（大语言模型）协作

**LLM 辅助提示词生成**
```
用户输入需求描述
    ↓
LLM（GPT/Claude/本地模型）生成结构化提示词
    ↓
自动传入 ComfyUI API 生成图像
    ↓
输出结果
```

**实现方式**
```python
# 伪代码示例
def llm_to_comfyui(user_request):
    # 1. 调用 LLM 生成提示词
    prompt = call_llm(f"""
    根据以下需求生成 Stable Diffusion 提示词：
    {user_request}
    返回格式：正向提示词 | 负向提示词
    """)
    
    # 2. 解析提示词
    positive, negative = parse_prompt(prompt)
    
    # 3. 调用 ComfyUI API
    workflow = build_workflow(positive, negative, seed=random())
    result = queue_prompt(workflow)
    
    return result
```

**应用场景**
- 自动化内容生成平台
- 电商产品图自动生成
- 社交媒体内容自动化
- 游戏美术资产批量生成

#### ComfyUI + 3D 工具
- 使用 Depth ControlNet 从 3D 场景提取深度
- 保持空间关系的同时改变视觉风格

---

### 6.5 工作流模板化与复用

#### 模板化策略
1. **参数外置**：将常用参数暴露为输入节点
2. **子图（Group Node）**：将常用组合封装为子图
3. **工作流变体**：基于一个基础工作流创建不同变体
4. **版本管理**：使用 Git 管理工作流版本

#### Group Node（组节点）
- 选择多个节点 → 右键 → Create Group
- 组节点可以保存和复用
- 类似于函数封装

#### 工作流模板库
- 建立个人工作流模板库
- 按用途分类（人像、风景、产品等）
- 定期优化和更新模板

---

### 6.6 ComfyUI 部署方案

#### 本地部署（最常见）
```
硬件要求：NVIDIA GPU + 12GB+ 显存推荐
操作系统：Windows / Linux
安装方式：Git 克隆 + pip install
优点：完全控制，无网络延迟
缺点：需要本地硬件
```

#### 云服务器部署
```
推荐平台：
- AutoDL（国内，便宜）
- 阿里云 / 腾讯云 GPU 实例
- Vast.ai（海外，按需租 GPU）
- RunPod（海外，Serverless 方案）

部署步骤：
1. 租用 GPU 服务器（推荐 RTX 3090/4090）
2. 安装 CUDA + Python 环境
3. Git 克隆 ComfyUI
4. 配置 --listen 0.0.0.0 允许外部访问
5. 配置 Nginx 反向代理（可选，加 HTTPS）
```

#### Docker 部署
```bash
# 使用官方镜像
docker run -d --gpus all \
  -p 8188:8188 \
  -v ./models:/home/ComfyUI/models \
  -v ./output:/home/ComfyUI/output \
  -v ./custom_nodes:/home/ComfyUI/custom_nodes \
  ghcr.io/ai-dock/comfyui:latest

# 使用 docker-compose
version: '3'
services:
  comfyui:
    image: ghcr.io/ai-dock/comfyui:latest
    ports:
      - "8188:8188"
    volumes:
      - ./models:/home/ComfyUI/models
      - ./output:/home/ComfyUI/output
      - ./custom_nodes:/home/ComfyUI/custom_nodes
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]
```

#### ComfyUI + Web 前端集成
- **ComfyUI-React**：React 前端封装
- **ComfyUI-API-Web**：基于 API 的 Web 应用
- 自建前端：使用 WebSocket API + Canvas 渲染

---

### 6.7 常见问题排查与调试技巧

#### 常见问题

**显存不足（OOM）**
```
错误信息：CUDA out of memory / RuntimeError: CUDA error

解决方案（按优先级）：
1. 使用 --lowvram 或 --novram 启动
2. 减小分辨率（512→384，1024→768）
3. 使用 FP16 模型（--fp16-vae）
4. 减少 Batch Size 为 1
5. 关闭其他占用显存的程序（Chrome 等）
6. 使用 GGUF 量化模型
7. 使用 LCM/Turbo 减少 Steps
8. 如果是 SDXL/Flux，考虑降级到 SD1.5

显存参考表：
| 任务 | SD1.5 | SDXL | Flux |
|------|-------|------|------|
| 512×512 txt2img | 4GB | - | - |
| 1024×1024 txt2img | - | 8GB | 16GB+ |
| Inpainting | 5GB | 10GB | 18GB+ |
| ControlNet | 6GB | 12GB | 20GB+ |
| AnimateDiff 16帧 | 8GB | 14GB | - |
```

**生成质量差**
```
排查步骤：
1. 检查提示词是否合理
   - 是否有足够的描述词？
   - 负向提示词是否正确？
   - 权重是否过高导致过饱和？
2. 确认分辨率是否匹配模型
   - SD1.5 用 512×512 或 512×768
   - SDXL 用 1024×1024 或 896×1152
   - 分辨率不对会导致重复/变形
3. 检查 CFG 值
   - 过高（>12）：过饱和、出现伪影
   - 过低（<3）：模糊、不受提示词控制
4. 更换采样器和调度器
   - 推荐：dpmpp_2m + karras
   - 快速预览：euler 或 lcm
5. 检查 VAE 是否正常
   - 发灰/颜色偏移通常是 VAE 问题
   - 更换为 mse-840000-ema-pruned 试试
6. 增加 Steps 数量（20→30）
7. 检查模型文件是否损坏
```

**颜色偏移/发灰**
```
解决方案：
1. 更换 VAE 模型（最常见的原因）
   - SD1.5：vae-ft-mse-840000-ema-pruned
   - SDXL：sdxl-vae-fp16-fix
2. 检查是否使用了正确的色彩空间
3. 调整 CFG 值（过高可能导致色彩失真）
4. 检查负向提示词中是否有冲突的颜色词
5. 如果是 VAE Decode 后的颜色问题，尝试使用其他 VAE
```

**人物畸形（手指/肢体）**
```
解决方案：
1. 使用负面 Embedding
   - bad-hands-5, EasyNegative, bad_prompt_version2
   - 在负向提示词中引用：< EasyNegative>
2. 使用 ControlNet OpenPose 控制姿态
3. 使用 ADetailer / FaceDetailer 修复面部
4. 增加负向提示词：bad anatomy, extra limbs, extra fingers
5. 使用 Inpaint 局部重绘有问题的区域
6. 选择对解剖学训练更好的模型（如 Realistic Vision）
7. 降低 CFG（过高会加剧畸形问题）
```

**模型加载失败**
```
常见原因及解决：
1. 文件路径错误 → 检查模型是否放在正确目录
2. 文件损坏 → 重新下载模型
3. 格式不支持 → 确认是 .safetensors 或 .ckpt
4. 内存不足 → 使用 --lowvram 或量化模型
5. 缺少依赖 → pip install -r requirements.txt
6. 版本不兼容 → 更新 ComfyUI 到最新版
```

**节点报错**
```
排查方法：
1. 查看 ComfyUI 控制台输出的错误堆栈
2. 错误信息通常会指明哪个节点、哪个输入有问题
3. 常见错误：
   - "Expected X but got Y" → 数据类型不匹配
   - "NoneType has no attribute" → 上游节点输出为空
   - "Size mismatch" → 图像尺寸与模型期望不匹配
4. 解决：检查节点连线是否正确，输入参数是否有效
```

**工作流加载失败**
```
排查方法：
1. 检查是否有缺失的自定义节点
   - ComfyUI Manager 会提示缺失节点
   - 安装缺失节点后重启
2. 检查 JSON 格式是否正确
3. 检查模型文件路径是否变化
4. 尝试使用 ComfyUI 的 "Load Default Workflow" 恢复
```

#### 调试工具与技巧
- **Preview 节点**：在中间步骤插入预览节点查看中间结果（Latent → Image 预览）
- **Seed 固定**：固定 Seed 进行对比测试，只改一个变量
- **逐节点测试**：禁用部分节点（Mute），逐步排查问题节点
- **日志查看**：查看 ComfyUI 控制台输出，关注 WARNING 和 ERROR
- **Show Any 节点**：查看任意数据类型的内容
- **Math 节点**：验证数值计算是否正确

---

## 学习资源汇总

### 官方资源
| 资源 | 地址 | 说明 |
|------|------|------|
| ComfyUI GitHub | github.com/comfyanonymous/ComfyUI | 官方仓库 |
| ComfyUI Examples | github.com/comfyanonymous/ComfyUI_examples | 官方示例工作流 |
| ComfyUI Wiki | github.com/comfyanonymous/ComfyUI/wiki | 官方文档 |

### 社区资源
| 资源 | 地址 | 说明 |
|------|------|------|
| OpenArt | openart.ai/workflows | 工作流分享平台 |
| CivitAI | civitai.com | 模型社区 |
| ComfyUI Manager | github.com/ltdrdata/ComfyUI-Manager | 节点管理器 |
| ComfyUI Discord | discord.gg/comfyui | 官方社区 |
| ComfyUI Examples | openart.ai/workflows | 海量社区工作流 |
| 吐司 AI | tusou.com | 国内工作流分享 |

### 必装自定义节点推荐

| 节点包 | 功能 | 重要程度 |
|--------|------|----------|
| ComfyUI-Manager | 节点/模型管理 | ⭐⭐⭐⭐⭐ |
| ComfyUI-Impact-Pack | 人脸修复、检测、批量处理 | ⭐⭐⭐⭐⭐ |
| ComfyUI_IPAdapter_plus | IP-Adapter 图像提示 | ⭐⭐⭐⭐⭐ |
| ComfyUI-AnimateDiff-Evolved | 视频生成 | ⭐⭐⭐⭐ |
| ComfyUI-GGUF | GGUF 量化模型加载 | ⭐⭐⭐⭐ |
| ComfyUI-KJNodes | 实用工具节点集合 | ⭐⭐⭐⭐ |
| ComfyUI-Easy-Use | 简化操作的整合节点 | ⭐⭐⭐⭐ |
| ComfyUI-Dynamic-Prompts | 动态提示词/通配符 | ⭐⭐⭐ |
| ComfyUI_essentials | 常用小工具节点 | ⭐⭐⭐ |
| ComfyUI-Advanced-ControlNet | 高级 ControlNet 控制 | ⭐⭐⭐ |
| ComfyUI-Florence2 | Florence2 图像理解/标注 | ⭐⭐⭐ |
| was-node-suite-comfyui | 大量实用节点 | ⭐⭐⭐ |

### 学习路线建议

```
第1-2周：基础预备知识
├── Python 基础 + PyTorch 张量操作
├── 深度学习概念（注意力机制、扩散模型数学）
├── SD 原理（CLIP → U-Net → VAE 全链路）
└── 提示词工程（基础语法、权重、负向提示词）

第3-4周：ComfyUI 入门
├── 安装配置 + ComfyUI Manager
├── 基本操作（节点、连线、快捷键）
├── 核心节点熟悉（加载器、采样器、条件、图像处理）
├── 基础工作流（txt2img, img2img）
└── 模型下载与管理（Checkpoint、LoRA、VAE）

第5-6周：模型与控制
├── 模型生态深入（SD1.5/SDXL/Flux 特点）
├── LoRA 使用（叠加、触发词、强度控制）
├── ControlNet 使用（各类型预处理器、强度调节）
├── IP-Adapter 使用（风格迁移、角色参考）
└── Inpainting/Outpainting 工作流

第7-8周：进阶工作流
├── Hires Fix / Upscale（三种放大方案）
├── 面部修复（FaceDetailer + CodeFormer）
├── 批量生成（Batch、循环、动态提示词）
├── 多条件组合（多 ControlNet、ControlNet + IP-Adapter）
├── SDXL Refiner 两阶段工作流
└── Flux 基础工作流

第9-12周：高级技术
├── 自定义节点 Python 开发
├── AnimateDiff 视频生成
├── ComfyUI REST/WebSocket API
├── 工作流 JSON 手动编辑
├── 性能优化（量化、LCM、缓存）
├── GGUF 量化模型使用
└── 区域提示词（Regional Prompting）

第13周+：专业应用
├── 商业级图像生成流程
├── 风格/角色一致性控制（LoRA + IP-Adapter + InstantID）
├── ComfyUI + LLM 协作自动化
├── ComfyUI + Photoshop/Blender 工具链
├── 工作流模板化与版本管理
├── 部署方案（本地/云端/Docker）
└── 持续学习新模型/技术
```

### 推荐实践项目

1. **入门**：生成一组不同风格的人物头像
2. **进阶**：使用 ControlNet 控制姿态生成系列插图
3. **高级**：构建 AnimateDiff 动画工作流
4. **专业**：为特定商业需求构建完整自动化流程
5. **专家**：开发自定义节点并开源

---

## 附录

### 附录 A：ComfyUI 启动参数速查表

| 参数 | 说明 | 示例 |
|------|------|------|
| `--listen` | 监听地址 | `--listen 0.0.0.0` |
| `--port` | 端口号 | `--port 8188` |
| `--lowvram` | 低显存模式 | 所有模型按需加载到 GPU |
| `--novram` | 极低显存模式 | 模型常驻 CPU，按需传输到 GPU |
| `--cpu` | CPU 模式 | 不使用 GPU |
| `--fp16-vae` | FP16 VAE | 减少 VAE 显存占用 |
| `--fp8_e4m3fn-unet` | FP8 UNet | RTX 40 系优化 |
| `--force-fp16` | 强制 FP16 | 所有模型使用半精度 |
| `--preview-method auto` | 实时预览 | 生成过程中显示中间结果 |
| `--extra-model-paths-config` | 额外模型路径 | 引用外部模型目录 |
| `--output-directory` | 输出目录 | 指定图像保存位置 |
| `--dont-print-server` | 禁止打印启动信息 | |
| `--auto-launch` | 自动打开浏览器 | |

### 附录 B：常用分辨率速查表

**SD 1.5 推荐分辨率（总像素 ≤ 512×512 = 262,144）**
| 宽高比 | 分辨率 | 用途 |
|--------|--------|------|
| 1:1 | 512×512 | 头像、图标 |
| 4:3 | 512×384 | 横版插图 |
| 3:4 | 384×512 | 竖版插图 |
| 16:9 | 768×432 | 风景宽屏 |
| 9:16 | 432×768 | 手机壁纸 |
| 2:3 | 448×672 | 人物全身 |
| 3:2 | 672×448 | 摄影构图 |

**SDXL 推荐分辨率（总像素 ≤ 1024×1024 = 1,048,576）**
| 宽高比 | 分辨率 | 用途 |
|--------|--------|------|
| 1:1 | 1024×1024 | 方形图 |
| 4:3 | 1024×768 | 横版 |
| 3:4 | 768×1024 | 竖版 |
| 16:9 | 1344×768 | 宽屏 |
| 9:16 | 768×1344 | 竖屏 |
| 2:3 | 832×1216 | 人物 |
| 3:2 | 1216×832 | 风景 |

**Flux 推荐分辨率**
- Flux 支持更大分辨率（1024-2048）
- 推荐：1024×1024, 1344×768, 768×1344

### 附录 C：采样器选择指南

| 场景 | 推荐采样器 | 推荐调度器 | Steps |
|------|-----------|-----------|-------|
| 日常使用 | dpmpp_2m | karras | 20-25 |
| 高质量 | dpmpp_sde | karras | 30-40 |
| 快速预览 | euler | normal | 10-15 |
| 极速出图 | lcm | normal | 4-8 |
| 少步数 | uni_pc | normal | 10-15 |
| 写实照片 | dpmpp_2m_sde | karras | 25-30 |
| 动漫风格 | dpmpp_2m | karras | 20-25 |
| Flux Dev | euler | normal | 20 |
| Flux Schnell | euler | normal | 4 |

### 附录 D：常见模型文件命名规则

```
命名示例：v1-5-pruned-emaonly.safetensors

v1-5          → SD 版本（1.5）
pruned        → 已修剪（移除冗余权重，更小）
emaonly       → 仅保留 EMA 权重（推理用）
safetensors   → 安全张量格式

常见后缀含义：
- pruned      → 修剪版，体积更小
- emaonly     → 仅 EMA 权重
- fp16        → 半精度浮点
- full        → 完整版（包含训练优化器状态，体积大）
- inpainting  → Inpainting 专用版
- v-prediction → V-prediction 采样方式
```

### 附录 E：关键术语中英对照

| 英文 | 中文 | 说明 |
|------|------|------|
| Checkpoint | 检查点/基础模型 | 包含完整权重的模型文件 |
| LoRA | 低秩适应 | 轻量级微调方法 |
| ControlNet | 控制网络 | 条件控制技术 |
| Prompt | 提示词 | 文本描述 |
| Negative Prompt | 负向提示词 | 不希望出现的内容 |
| Denoise | 去噪强度 | 图生图中控制改变程度 |
| CFG Scale | 分类器自由引导强度 | 提示词影响力 |
| Sampling Steps | 采样步数 | 去噪迭代次数 |
| Seed | 随机种子 | 控制随机性 |
| Latent | 潜空间 | 压缩后的图像表示 |
| VAE | 变分自编码器 | 图像编解码器 |
| Embedding | 嵌入/文本反转 | 轻量级概念微调 |
| Inpainting | 局部重绘 | 重绘图像的指定区域 |
| Outpainting | 外绘/扩展 | 扩展图像边界 |
| Upscale | 放大/超分辨率 | 提升图像分辨率 |
| Hires Fix | 高清修复 | 两阶段放大方法 |
| Batch Size | 批次大小 | 一次生成的图像数量 |
| Workflow | 工作流 | 完整的节点处理流程 |
| Node | 节点 | 工作流中的单个处理单元 |
| Custom Node | 自定义节点 | 社区开发的扩展节点 |

---

### 附录 F：ComfyUI 内置节点完整分类速查表

> 以下为 ComfyUI 核心内置节点（不含自定义节点），按功能分类。

#### F.1 加载器节点（Loaders）

| 节点名称 | 输入 | 输出 | 功能说明 |
|----------|------|------|----------|
| CheckpointLoaderSimple | ckpt_name | MODEL, CLIP, VAE | 加载完整 SD 模型 |
| CheckpointLoader | config_name, ckpt_name | MODEL, CLIP, VAE, CLIP_VISION | 加载模型（高级，指定配置） |
| UNETLoader | unet_name, weight_dtype | MODEL | 仅加载 UNet（Flux/SD3 用） |
| CLIPLoader | clip_name, type | CLIP | 仅加载单个 CLIP |
| DualCLIPLoader | clip_name1, clip_name2, type | CLIP | 加载双 CLIP（SDXL/Flux 用） |
| TripleCLIPLoader | clip_name1, clip_name2, clip_name3 | CLIP | 加载三 CLIP（SD3 用） |
| VAELoader | vae_name | VAE | 加载 VAE 模型 |
| LoraLoader | lora_name, strength_model, strength_clip | MODEL, CLIP | 加载 LoRA 叠加到模型 |
| LoraLoaderModelOnly | lora_name, strength | MODEL | 仅加载 LoRA 到模型（不改 CLIP） |
| ControlNetLoader | control_net_name | CONTROL_NET | 加载 ControlNet 模型 |
| DiffControlNetLoader | control_net_name, base_model | CONTROL_NET | 加载 DiffControlNet |
| UpscaleModelLoader | model_name | UPSCALE_MODEL | 加载超分模型（RealESRGAN 等） |
| LoadImage | image | IMAGE, MASK | 加载输入图像 |
| LoadImageMask | image, channel | MASK | 从图像加载遮罩 |
| LoadVideo | video, force_rate, frame_load_cap | IMAGE, INT | 加载视频帧（需 VHS 插件） |
| HypernetworkLoader | hypernetwork_name, strength | MODEL | 加载 Hypernetwork |

#### F.2 采样器节点（Samplers）

| 节点名称 | 输入 | 输出 | 功能说明 |
|----------|------|------|----------|
| KSampler | model, positive, negative, latent_image, seed, steps, cfg, sampler_name, scheduler, denoise | LATENT | 核心采样器 |
| KSamplerAdvanced | model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, return_with_leftover_noise, denoise | LATENT | 高级采样器（分步控制） |
| SamplerCustom | model, add_noise, noise_seed, cfg, positive, negative, sampler, sigmas, latent_image | LATENT, OUTPUT | 自定义采样器（完全控制） |

**可用采样器名称**（sampler_name 参数值）：
```
euler, euler_ancestral, heun, heunpp2, dpm_2, dpm_2_ancestral,
lms, dpm_fast, dpm_adaptive, dpmpp_2s_ancestral, dpmpp_sde,
dpmpp_sde_gpu, dpmpp_2m, dpmpp_2m_sde, dpmpp_2m_sde_gpu,
dpmpp_3m_sde, dpmpp_3m_sde_gpu, ddpm, lcm, uni_pc, uni_pc_bh2
```

**可用调度器名称**（scheduler 参数值）：
```
normal, karras, exponential, sgm_uniform, simple, ddim_uniform, beta
```

#### F.3 条件控制节点（Conditioning）

| 节点名称 | 输入 | 输出 | 功能说明 |
|----------|------|------|----------|
| CLIPTextEncode | text, clip | CONDITIONING | 文本编码为条件 |
| CLIPTextEncodeSDXL | clip, width, height, crop_w, crop_h, target_width, target_height, text_g, text_l | CONDITIONING | SDXL 专用文本编码 |
| CLIPTextEncodeFlux | clip, clip_l, t5xxl, guidance | CONDITIONING | Flux 专用文本编码 |
| ConditioningCombine | conditioning_1, conditioning_2 | CONDITIONING | 合并两个条件 |
| ConditioningConcat | conditioning_to, conditioning_from | CONDITIONING | 拼接条件向量 |
| ConditioningSetTimestepRange | conditioning, start, end | CONDITIONING | 设置条件生效的时间步范围 |
| ConditioningSetArea | conditioning, width, height, x, y, strength | CONDITIONING | 设置条件生效的区域（矩形） |
| ConditioningSetMask | conditioning, mask, strength, set_cond_area | CONDITIONING | 设置条件生效的遮罩区域 |
| ControlNetApply | conditioning, control_net, image, strength | CONDITIONING | 应用 ControlNet |
| ControlNetApplyAdvanced | positive, negative, control_net, image, strength, start_percent, end_percent | CONDITIONING, CONDITIONING | 高级 ControlNet（正负分别控制） |
| GLIGENTextBoxApply | conditioning, latents, gligen_textbox_model, text, width, height, x, y | CONDITIONING | GLIGEN 文本框布局控制 |
| FluxGuidance | conditioning, guidance | CONDITIONING | Flux 引导设置 |

#### F.4 潜空间节点（Latent）

| 节点名称 | 输入 | 输出 | 功能说明 |
|----------|------|------|----------|
| EmptyLatentImage | width, height, batch_size | LATENT | 创建空白 Latent（SD1.5/SDXL） |
| EmptySD3LatentImage | width, height, batch_size | LATENT | 创建空白 Latent（SD3/Flux，16通道） |
| LatentUpscale | samples, upscale_method, width, height, crop | LATENT | 潜空间放大 |
| LatentUpscaleBy | samples, upscale_method, scale_by | LATENT | 按倍率潜空间放大 |
| LatentComposite | samples_to, samples_from, x, y, feather | LATENT | 潜空间合成（拼接图像） |
| LatentCompositeMasked | destination_from, source_from, x, y, mask, resize_source | LATENT | 遮罩合成 |
| LatentRotate | samples, rotation | LATENT | 旋转 Latent |
| LatentFlip | samples, flip_method | LATENT | 翻转 Latent |
| LatentCrop | samples, width, height, x, y | LATENT | 裁切 Latent |
| SetLatentNoiseMask | samples, mask | LATENT | 设置噪声遮罩（Inpainting 用） |
| LatentBatch | samples1, samples2 | LATENT | 合并两个 Latent 批次 |
| LatentBatchSeedBehavior | samples, seed_behavior | LATENT | 设置批次种子行为 |

#### F.5 图像节点（Image）

| 节点名称 | 输入 | 输出 | 功能说明 |
|----------|------|------|----------|
| SaveImage | images, filename_prefix | — | 保存图像到 output/ |
| PreviewImage | images | — | 预览图像（不保存） |
| ImageScale | image, upscale_method, width, height, crop | IMAGE | 缩放图像 |
| ImageScaleBy | image, upscale_method, scale_by | IMAGE | 按倍率缩放 |
| ImageInvert | image | IMAGE | 反转图像颜色 |
| ImageBatch | image1, image2 | IMAGE | 合并图像批次 |
| ImagePadForOutpaint | image, left, top, right, bottom, feathering | IMAGE, MASK | 外绘填充 |
| ImageCrop | image, width, height, x, y | IMAGE | 裁切图像 |
| ImageBlend | image1, image2, blend_factor, blend_mode | IMAGE | 混合两张图像 |
| ImageBlur | image, blur_radius, sigma | IMAGE | 模糊图像 |
| ImageQuantize | image, colors | IMAGE | 量化图像颜色 |
| ImageSharpen | image, sharpen_radius, sigma | IMAGE | 锐化图像 |
| ConvertImage | image, type | IMAGE | 转换图像格式 |

#### F.6 遮罩节点（Mask）

| 节点名称 | 输入 | 输出 | 功能说明 |
|----------|------|------|----------|
| InvertMask | mask | MASK | 反转遮罩 |
| MaskToImage | mask | IMAGE | 遮罩转图像 |
| ImageToMask | image, channel | MASK | 图像转遮罩 |
| SolidMask | value, width, height | MASK | 创建纯色遮罩 |
| GrowMask | mask, expand, tapered_corners | MASK | 扩展/收缩遮罩 |
| FeatherMask | mask, left, top, right, bottom | MASK | 羽化遮罩边缘 |
| ThresholdMask | mask, value | MASK | 阈值化遮罩 |
| MaskComposite | destination, source, x, y, operation | MASK | 遮罩合成 |

#### F.7 编解码节点（VAE Encode/Decode）

| 节点名称 | 输入 | 输出 | 功能说明 |
|----------|------|------|----------|
| VAEDecode | samples, vae | IMAGE | Latent 解码为图像 |
| VAEEncode | pixels, vae | LATENT | 图像编码为 Latent |
| VAEEncodeForInpaint | pixels, vae, mask, grow_mask_by | LATENT | 为 Inpaint 编码（含遮罩） |
| VAEDecodeTiled | samples, vae | IMAGE | 分块解码（省显存） |
| VAEEncodeTiled | pixels, vae | LATENT | 分块编码（省显存） |

#### F.8 上采样节点（Upscale）

| 节点名称 | 输入 | 输出 | 功能说明 |
|----------|------|------|----------|
| UpscaleModelLoader | model_name | UPSCALE_MODEL | 加载超分模型 |
| ImageUpscaleWithModel | upscale_model, image | IMAGE | 使用模型超分 |
| ImageUpscale | image, upscale_method, width | IMAGE | 使用算法超分 |

#### F.9 视频节点（需 VHS 插件）

| 节点名称 | 输入 | 输出 | 功能说明 |
|----------|------|------|----------|
| VideoCombine | images, frame_rate, loop_count, format, pingpong | VHS_VIDEO | 合并图像为视频 |
| LoadVideo | video, force_rate, frame_load_cap | IMAGE, INT | 加载视频 |
| VideoLinearCFGGuidance | model, min_cfg | MODEL | 视频线性 CFG 引导 |

#### F.10 实用工具节点（Utilities）

| 节点名称 | 输入 | 输出 | 功能说明 |
|----------|------|------|----------|
| Reroute | * | * | 路由整理连线 |
| Note | text | — | 文字注释 |
| Primitive | value | ANY | 基础值节点 |
| MathExpression | expression, a, b | INT/FLOAT | 数学表达式计算 |
| Compare | a, b, comparison | BOOLEAN | 比较运算 |
| Integer | value | INT | 整数常量 |
| Float | value | FLOAT | 浮点常量 |
| String | value | STRING | 字符串常量 |
| Boolean | value | BOOLEAN | 布尔常量 |
| GetImageSize | image | INT, INT | 获取图像宽高 |

---

### 附录 G：工作流 JSON 完整参考

#### G.1 JSON 结构概述

ComfyUI 工作流有两种格式：

**UI 格式**（界面保存）
```json
{
  "last_node_id": 7,
  "last_link_id": 6,
  "nodes": [
    {
      "id": 1,
      "type": "CheckpointLoaderSimple",
      "pos": [0, 0],
      "size": [300, 100],
      "widgets_values": ["v1-5-pruned.safetensors"],
      "inputs": [],
      "outputs": [
        {"name": "MODEL", "type": "MODEL", "links": [1]},
        {"name": "CLIP", "type": "CLIP", "links": [2, 3]},
        {"name": "VAE", "type": "VAE", "links": [4]}
      ]
    }
  ],
  "links": [
    [1, 1, 0, 4, 0, "MODEL"]
  ],
  "config": {},
  "extra": {},
  "version": 0.4
}
```

**API 格式**（程序调用用）
```json
{
  "1": {
    "class_type": "CheckpointLoaderSimple",
    "inputs": {
      "ckpt_name": "v1-5-pruned.safetensors"
    }
  },
  "2": {
    "class_type": "CLIPTextEncode",
    "inputs": {
      "text": "a beautiful cat",
      "clip": ["1", 1]
    }
  }
}
```

#### G.2 UI 格式 vs API 格式转换

| 操作 | 方法 |
|------|------|
| UI → API | ComfyUI 界面：点击菜单 → `Save (API Format)` |
| API → UI | 使用 `ComfyUI-Workflow-Serializer` 等工具 |
| 导出 UI 格式 | `Ctrl+S` 或 `Save` 菜单 |
| 加载工作流 | 拖拽 `.json` 文件到画布，或 `Ctrl+O` |

#### G.3 API 格式中引用其他节点输出

```json
{
  "clip": ["1", 1]
}
```
- `"1"`：源节点 ID（字符串）
- `1`：源节点输出端口索引（整数，从 0 开始）

**输出端口索引对照表**（以 CheckpointLoaderSimple 为例）：
```
输出端口 0 → MODEL
输出端口 1 → CLIP
输出端口 2 → VAE
```

#### G.4 完整 API 工作流示例（SD1.5 文生图）

```json
{
  "1": {
    "class_type": "CheckpointLoaderSimple",
    "inputs": {
      "ckpt_name": "v1-5-pruned.safetensors"
    }
  },
  "2": {
    "class_type": "EmptyLatentImage",
    "inputs": {
      "width": 512,
      "height": 512,
      "batch_size": 1
    }
  },
  "3": {
    "class_type": "CLIPTextEncode",
    "inputs": {
      "text": "masterpiece, best quality, 1girl, long hair, blue eyes, white dress, garden",
      "clip": ["1", 1]
    }
  },
  "4": {
    "class_type": "CLIPTextEncode",
    "inputs": {
      "text": "lowres, bad anatomy, worst quality, low quality",
      "clip": ["1", 1]
    }
  },
  "5": {
    "class_type": "KSampler",
    "inputs": {
      "model": ["1", 0],
      "positive": ["3", 0],
      "negative": ["4", 0],
      "latent_image": ["2", 0],
      "seed": 42,
      "steps": 20,
      "cfg": 7.0,
      "sampler_name": "dpmpp_2m",
      "scheduler": "karras",
      "denoise": 1.0
    }
  },
  "6": {
    "class_type": "VAEDecode",
    "inputs": {
      "samples": ["5", 0],
      "vae": ["1", 2]
    }
  },
  "7": {
    "class_type": "SaveImage",
    "inputs": {
      "filename_prefix": "ComfyUI",
      "images": ["6", 0]
    }
  }
}
```

#### G.5 批量修改工作流 JSON 的技巧

```python
import json

# 加载工作流
with open("workflow.json", "r") as f:
    workflow = json.load(f)

# 批量替换模型路径
for node_id, node in workflow.items():
    if node["class_type"] == "CheckpointLoaderSimple":
        node["inputs"]["ckpt_name"] = "new_model.safetensors"

# 批量修改 Seed
for node_id, node in workflow.items():
    if node["class_type"] == "KSampler":
        import random
        node["inputs"]["seed"] = random.randint(0, 2**32)

# 批量修改分辨率
for node_id, node in workflow.items():
    if node["class_type"] == "EmptyLatentImage":
        node["inputs"]["width"] = 1024
        node["inputs"]["height"] = 1024

# 保存
with open("modified_workflow.json", "w") as f:
    json.dump(workflow, f, indent=2)
```

---

### 附录 H：硬件选购指南与显存需求矩阵

#### H.1 GPU 选购建议

| GPU | 显存 | 价格区间 | 适合模型 | 推荐度 |
|-----|------|----------|----------|--------|
| RTX 3060 | 12GB | ¥1500-2000 | SD1.5/SDXL（需优化） | ⭐⭐⭐ 入门首选 |
| RTX 3080 | 10GB | ¥2500-3500 | SD1.5/SDXL | ⭐⭐⭐⭐ |
| RTX 3090 | 24GB | ¥4000-6000 | 全模型通用 | ⭐⭐⭐⭐⭐ 性价比之王 |
| RTX 4060 Ti 16GB | 16GB | ¥3000-3500 | SD1.5/SDXL | ⭐⭐⭐⭐ |
| RTX 4070 Ti Super | 16GB | ¥5000-6000 | SD1.5/SDXL | ⭐⭐⭐⭐ |
| RTX 4080 | 16GB | ¥7000-8000 | SD1.5/SDXL | ⭐⭐⭐⭐ |
| RTX 4090 | 24GB | ¥12000-15000 | 全模型（含 Flux） | ⭐⭐⭐⭐⭐ 旗舰之选 |
| RTX 5070 Ti | 16GB | ¥5000-6000 | SD1.5/SDXL/Flux（量化） | ⭐⭐⭐⭐ |
| RTX 5080 | 16GB | ¥8000-10000 | SD1.5/SDXL/Flux（量化） | ⭐⭐⭐⭐ |
| RTX 5090 | 32GB | ¥16000+ | 全模型无压力 | ⭐⭐⭐⭐⭐ |

#### H.2 显存需求矩阵（详细版）

| 任务 | SD1.5 | SDXL | SD3 | Flux Dev | Flux Schnell |
|------|-------|------|-----|----------|-------------|
| txt2img 512² | 3-4 GB | — | — | — | — |
| txt2img 1024² | 5-6 GB | 6-8 GB | 8-10 GB | 12-16 GB | 10-14 GB |
| img2img | 4-5 GB | 8-10 GB | 10-12 GB | 14-18 GB | 12-16 GB |
| Inpainting | 5-6 GB | 10-12 GB | 12-14 GB | 16-20 GB | 14-18 GB |
| ControlNet ×1 | 6-7 GB | 10-12 GB | 12-14 GB | 16-20 GB | 14-18 GB |
| ControlNet ×2 | 7-8 GB | 12-14 GB | 14-16 GB | 18-22 GB | 16-20 GB |
| LoRA ×1 | 4-5 GB | 7-9 GB | 9-11 GB | 13-17 GB | 11-15 GB |
| IP-Adapter | 6-8 GB | 10-12 GB | — | — | — |
| AnimateDiff 16帧 | 6-8 GB | 12-14 GB | — | — | — |
| Hires Fix 2x | 6-8 GB | 10-12 GB | 12-14 GB | 16-20 GB | 14-18 GB |
| Flux GGUF Q5 | — | — | — | 8-10 GB | 6-8 GB |
| Flux GGUF Q4 | — | — | — | 6-8 GB | 5-6 GB |

**注**：以上为 FP16 精度下的估算，实际取决于图像尺寸、Batch Size、自定义节点等因素。

#### H.3 内存（RAM）建议
- **最低**：8GB（仅 SD1.5）
- **推荐**：16GB（SD1.5 + SDXL）
- **理想**：32GB+（Flux + 大量自定义节点 + 批量生成）

#### H.4 存储建议
- **系统盘**：SSD，256GB+
- **模型盘**：建议单独 SSD，512GB-2TB
  - SD1.5 模型：每个 2-7GB，收藏 20 个约 100GB
  - SDXL 模型：每个 5-7GB，收藏 10 个约 70GB
  - Flux 模型：每个 10-24GB
  - LoRA/ControlNet/VAE：额外 50-100GB
- **输出目录**：建议 HDD，1TB+（图像积累很快）

---

### 附录 I：LoRA 训练完整实操流程

#### I.1 环境准备

```bash
# 1. 安装 kohya_ss（最流行的 LoRA 训练工具）
git clone https://github.com/bmaltais/kohya_ss.git
cd kohya_ss
pip install -r requirements.txt

# 2. 启动图形界面
python kohya_gui.py
```

#### I.2 数据集准备

**数据集要求**
| 项目 | 要求 | 说明 |
|------|------|------|
| 图像数量 | 10-50 张 | 太少过拟合，太多训练慢 |
| 图像质量 | 高清、无水印 | 低质量数据 = 低质量输出 |
| 图像尺寸 | 512×512 或 1024×1024 | 与训练分辨率一致 |
| 多样性 | 不同角度、光线、背景 | 避免过拟合特定场景 |
| 标注 | 每张图配一个 .txt 文件 | 描述图像内容 |

**目录结构**
```
dataset/
├── 10_my_trigger_word/     ← 数字=重复次数, 文字=触发词
│   ├── image1.png
│   ├── image1.txt          ← 标注文件
│   ├── image2.png
│   ├── image2.txt
│   └── ...
```

**标注示例**
```
文件：image1.txt
内容：my_trigger_word, 1girl, long hair, blue eyes, white dress, standing in garden

说明：
- my_trigger_word 必须在每个标注开头
- 后面是图像内容的描述
- 标注越精确，训练效果越好
```

**自动标注工具**
- **BLIP / BLIP-2**：自动生成图像描述
- **WD14 Tagger**：自动打标签（推荐动漫图像）
- **Florence2**：高质量图像理解
- 在 kohya_ss GUI 中可直接使用自动标注功能

#### I.3 训练参数设置

**基础参数**
```yaml
# 训练模型
pretrained_model: v1-5-pruned.safetensors  # 基础模型

# 训练设置
train_batch_size: 1           # 批次大小（显存不足时设为1）
num_epochs: 10                # 训练轮数
learning_rate: 1e-4           # 学习率
unet_lr: 1e-4                 # UNet 学习率
text_encoder_lr: 5e-5         # 文本编码器学习率（通常低于 UNet）

# LoRA 设置
network_dim: 64               # LoRA 维度（rank），越大越精细但越大
network_alpha: 32             # 缩放系数（通常为 dim 的一半）
```

**高级参数**
```yaml
# 优化器
optimizer_type: AdamW8bit     # 推荐，省显存

# 调度器
lr_scheduler: cosine_with_restarts  # 余弦退火

# 混合精度
mixed_precision: fp16          # 半精度训练

# 保存设置
save_every_n_epochs: 2         # 每2轮保存一次检查点

# 数据增强
flip_aug: true                 # 水平翻转增强
color_aug: false               # 颜色增强（一般关闭）
```

#### I.4 训练过程

```
1. 在 kohya_ss GUI 中设置所有参数
2. 点击 "Start Training"
3. 训练过程中观察 loss 曲线
   - loss 逐渐下降 = 正常
   - loss 不下降 = 学习率太低或数据问题
   - loss 震荡剧烈 = 学习率太高
4. 训练完成后在 output 目录找到 LoRA 文件
```

#### I.5 训练时间参考

| 图像数量 | Epochs | RTX 3060 12GB | RTX 4090 24GB |
|----------|--------|---------------|---------------|
| 20 张 | 10 | ~30 分钟 | ~10 分钟 |
| 50 张 | 10 | ~1 小时 | ~20 分钟 |
| 100 张 | 10 | ~2 小时 | ~40 分钟 |
| 20 张 | 30 | ~1.5 小时 | ~30 分钟 |

#### I.6 训练后测试与调优

```
1. 将 LoRA 文件放入 ComfyUI/models/loras/
2. 使用 LoraLoader 节点加载
3. 测试不同 strength 值（0.5-1.0）
4. 如果效果不理想：
   - 过拟合（所有图都一样）→ 减少 epochs 或增加数据
   - 欠拟合（不像目标）→ 增加 epochs 或增大 network_dim
   - 风格偏移 → 调整学习率或增加数据多样性
```

#### I.7 Flux LoRA 训练注意事项

```
- Flux LoRA 训练显存需求更高（24GB+推荐）
- 推荐使用 ai-toolkit 或 kohya_ss 的 Flux 训练模式
- network_dim 通常设为 16-32（Flux 不需要太大）
- 训练速度比 SD1.5/SDXL 慢约 3-5 倍
- 推荐使用 FP8 或 BF16 混合精度
```

---

> **最后建议**：AI 绘画技术发展极快，新模型、新技术层出不穷。保持学习心态，关注社区动态，持续实践是成为专业 AI 绘画工程师的关键。技术是工具，审美和创意才是核心竞争力。
>
> **更新记录**：本文档基于 2024-2025 年 ComfyUI 生态编写，建议定期检查是否有新的模型架构、节点包或工作流范式出现。
