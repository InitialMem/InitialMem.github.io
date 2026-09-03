# ComfyUI

## 放大算法

`[待补充]`

## 关闭浏览器通知

`[待补充]`

## 使用FaceDetailer修脸修手

`[待补充]`

## WD14 Tagger图像反推

模型直接下载model.onnx(实际模型)和selected_tags.csv(标签列表)，放ComfyUI-WD14-Tagger/models/

## 秋叶启动器更新后生图变慢的问题

高级选项->CUDA内存分配方案，选择PyTorch原生分配器，VAE精度改成fp16

## Danbooru和e621数据集

danbooru主要是以二次元人类角色为主，e621主要以动物兽人福瑞为主

## V-pred
相比一般的e-pred，告诉模型预测去掉什么的方式不同
e-pred: 告诉你噪声是多少
v-pred: 告诉你应该往哪个方向变化
一般不需要手动选择预测方式，不代表效果更好，仅在稳定性方面更好

## Scribble ControlNet中HED和PiDiNet预处理器的区别
两种方式仅提取方式不同，HED方式提取出来的线条更多，更接近原图，PiDiNet的方式更接近草稿，细节更少