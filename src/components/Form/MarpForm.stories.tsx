import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MarpForm } from './MarpForm';

const T6 = `---
marp: true
paginate: false
style: |
  p, table, ul {
    font-size: 18px;
  }
  h1{
    font-size: 42px;
    padding: 10px 0;
    margin: 10px 0;
  }
  h2{
    font-size: 36px;
    padding: 10px 0;
    margin: 5px 0;
  }
  h3{
    font-size: 30px;
    padding: 10px 0;
    margin: 5px 0;
  }
  h4{
    font-size: 24px;
    padding: 10px 0;
    margin: 2px 0;
  }
  h5{
    font-size: 18px;
    padding: 10px 0;
    margin: 2px 0;
  }
---


<!--
_footer: 'Image:SpaceX'
-->



![bg left:40%](https://img.virtualrocketwatching.net/image/image_4e0ded53-f48a-44bb-a435-92c6beef4e33.jpeg)

# Transporter 6

小型衛星ライドシェア 114機


|||
|-|-|
|日本時間| 1/3(火) 23:55 |
|ロケット| SpaceX \| Falcon 9 Block 5 |
|射点| ケープカナベラル宇宙軍基地  |

---
![bg left:50% vertical](https://pbs.twimg.com/media/FlOdV9raUAIpJlT?format=jpg&name=4096x4096)
![bg](https://www.teslarati.com/wp-content/uploads/2020/06/Starlink-V1-L8-Skysats-16-18-rideshare-June-2020-SpaceX-1-crop-768x432.jpg)

# Smallsat Rideshare Prodram
SpaceX 小型衛星ライドシェアプログラム

<!--
_footer: 'Photo: ExoLaunch, SpaceX'
-->

基本料金 ... 50kgまで$275K
追加料金 ... 1kgにつき$5.5K

ネットでかんたん予約: <https://spacex.com/rideshare>

## SpaceX Transporter

太陽同期軌道ライドシェア
半年ごとに専用の定期便で打ち上げ

## Starlink 相乗りミッション

傾斜角53度の低軌道
相乗り重量分のStarlinkを減らして打ち上げ

---
<!--
_footer: "Image: J. Aerosp. Technol. Manag., 2017、東京大学"
-->
![bg left vertical](https://article-image-ix.nikkei.com/https%3A%2F%2Fimgix-proxy.n8s.jp%2FDSXBZO3269534022072011000001-9.jpg?ixlib=js-2.3.2&w=680&h=850&auto=format%2Ccompress&ch=Width%2CDPR&q=100&fit=crop&bg=FFFFFF&s=cca1536f7cebd6ab929045213b9aa202)

# 成長する小型衛星市場

2010年代から急速な打ち上げ数増加
キューブサット、ESPAなど小型衛星の規格化

## キューブサット

超小型衛星: 1~10kg級
10cm * 10cm * 10cm の立方体を1Uとして規格化

![h:300](https://minio.scielo.br/documentstore/2175-9146/FJyCtWr5jnDTZV5dNSvR7Pw/f1fb4b677593a0cad8d93444b786a66c726766d6.jpg)

---

<!--
_footer: "Image: Electron, JAXA"
-->
![bg left vertical](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNjzTFfoMmVhV3MQVQtyGiOdF0-eoSZpadnw&usqp=CAU)
![bg ](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAaVSl8UG-2WTZ-N8y_rbW9Gx1yNTkQSsfoQqcYOjdcBGCYyAa6T1jD7LnwU8Taxw53Qs&usqp=CAU)
![bg fit](https://fanfun.jaxa.jp/countdown/astro_h/images/cubesat_image.jpg)

# 小型衛星の打ち上げ手段

### 国際宇宙ステーションから放出

国際宇宙ステーション補給機に相乗り
→ ロボットアームで放出

実験棟「きぼう」 ... 300万円～
低価格だが、軌道はISS近傍に限定

### 大型ロケットに相乗り

H-IIAロケット ... 2,700万円～
価格はピンキリ、主衛星の軌道に限定


### 小型ロケットの専用ミッション

Electronロケット
- 低軌道に300kg、コスト$7.5M (8億円)
- 1kg単価 低軌道に285万円

---

![bg left:40% fit vertical](https://www.eoportal.org/api/cms/documents/163813/2897662/STP1_Auto5.jpeg)
![bg](https://techable.jp/wp-content/uploads/2019/08/SmallSat-Rideshare-1.png)

# 小型衛星の打ち上げ手段

## ESPA

EELV Secondary Payload Adapter
米国 発展型使い捨てロケット (Atlas-V, Delta-IV) 向けに開発

軍事ミッション向け 小型ロケットのための放出機構の規格
現在は商業ミッションでも活用

### SpaceX Transporter

ESPAクラス小型衛星の相乗り
アダプターを大量搭載して小型ライドシェア専門ミッション

基本料金 ... 50kgまで$275K
追加料金 ... 1kgにつき$5.5K


---

<!--
_footer: "Image: EXOLaunch"
-->
![bg left vertical fit](https://pbs.twimg.com/media/E-CbJ6bWYAYSqSc?format=jpg&name=large)
![bg fit](https://pbs.twimg.com/media/Ffb_PXZUoAMcjog?format=png&name=900x900)

# EXOLaunch

ドイツのベンチャー企業
放出機構を独自提供

### EXOPorts

複数のEXOPod, CarboNIXがESPAに結合
ESPAから複数の小型衛星を放出
ほぼSpaceX向け

### EXOPod

キューブサット放出機構
複数のキューブが相乗りで放出


---
<!--
_footer: "Image: EXOLaunch, SpaceX"
-->
![bg left vertical fit](https://pbs.twimg.com/media/Ffb-S4lUcAAviIS?format=jpg&name=medium)
![bg fit](https://pbs.twimg.com/media/Ffb-UqTUUAEJ9-X?format=jpg&name=medium)

# SpaceX 相乗り料金改定

改定前 ... ESPA級の小型衛星向け

- 200kgまで基本料金$1.1M (1億円)
- 追加料金 1kgあたり5K (57万円)

改定後 (2022年10月発表) ... より小型の衛星向けの放出機構
角柱形の新型アダプター
- 基本料金 ... 50kgまで$275K
- 追加料金 ... 1kgにつき$5.5K


![](https://m.exolaunch.com/img/news/news52_%D1%81.jpg)

---

# 衛星キャリア

顧客の衛星を搭載して軌道遷移
SpaceX Transporterと別の軌道に投入

![bg left:40% vertical](https://cdnb.artstation.com/p/assets/images/images/057/514/609/4k/martin-miguel-orbiter-update-dispensing-mktg.jpg?1671800635)
![bg](https://cdnb.artstation.com/p/assets/images/images/057/514/601/4k/martin-miguel-orbiter-update-launcher-light-separation.jpg?1671800624&dl=1)

<!--
_footer: "Image: Launcher"
-->

## Launcher Orbiter SN1

国/種別 ... 米国 / 衛星キャリア
運用 ... Launcher
装備 ... キューブサット放出機構

最大400kgのペイロードを搭載して軌道遷移
エタン/亜酸化窒素の推進系 （dV = 500m/s）

将来的には自社の小型ロケットの上段としても運用？


---

![bg left:40%](https://storage.googleapis.com/nextspaceflight/media/rockets/Block_5.jpg)

# Falcon 9 Block 5

2段式ロケット+ 補助ブースター0基

|||
|-|-|
|初飛行|2018年 5/12(土) 05:14 <br> (Bangabandhu-1)|
|飛行回数|139回目|
|性能|地球低軌道に 22.8 トン<br>GTO(静止軌道遷移軌道)に 8.3 トン|
|大きさ|全長70.0 m<br>フェアリング: 直径5.2 m * 高さ13.0 m|
|離昇推力|7607.0 kN (776トン重)|
|費用|$67M (87億円)|
|kg単価|地球低軌道に $2K (38万円)<br>GTO(静止軌道遷移軌道)に $8K (105万円)|

---

|名前|国|仲介業者|運用/製造|構成/重量|概要|
|-|-|-|-|-|-|
|KuwaitSat-1|クウェート|||キューブサット (2U) |技術実証|
|BDSAT|チェコ|| BD Sensors<br>中央ヨーロッパ工科大学|キューブサット (1U) |技術実証
|SharedSat 2211|ブルガリア||EnduroSat / EnduroSat|キューブサット (6U) |技術実証
|Lemur-2 |米国||Spire / Spire|キューブサット (3U) <br> 4 kg　×6機|地球観測<br>交通監視
|Connecta T1.1|トルコ||Plan-S / )|キューブサット (3U) |技術実証, 通信
|GAMA|
|BRO 8|フランス||UnseenLabs / GOMSpace|キューブサット (6U) / 6 kg|スペクトル分析<br>交通監視
|Menut|
|MilSpace-1 & 2<br>(Huygens  & Birkeland)|ノルウェー<br>オランダ||ノルウェー防衛技研<br> オランダ王立航空宇宙センター <br> NanoAvionics|キューブサット (6U) <br> 10 kg ×2機|技術実証

---

|名前|国|仲介業者|運用/製造|構成/重量|概要|
|-|-|-|-|-|-|
|Star-Vibe
|KSF 3|ルクセンブルク|ISILAUNCH |Kleos Space / ISISpace|キューブサット (6U) <br> ×4機 |スペクトル分析<br> 交通監視
|SpaceBEE-156/167 |米国||Swarm Technologies|キューブサット (0.25U) <br> 0.25 kg ×10機| IoT向けスターリンク
|RROCI
|PolyItan 2 ||SpaceBD<br>ISILAUNCH
|Flock-4Y <br>(SuperDove)|米国||Planet Labs|キューブサット (3U) <br> 5 kg　×36機|技術実証
|Guardian alpha|スペイン|| OrbAstro|キューブサット (3U) |地球観測
|Sony Sphere-1|日本|SpaceBD |SONY| キューブサット (6U) |地球観測
|NSLSat 2|イスラエル|ISILAUNCH|NSLComm / ÅAC Clyde Space|キューブサット (6U) |技術実証

---

|名前|国|仲介業者|運用/製造|構成/重量|概要|
|-|-|-|-|-|-|
|Sternula 1|Denmark|ISILAUNCH|GOMSpace / GOMSpace|キューブサット (6U) |交通監視, 通信
|Lynk Tower 03/04|米国||Lynk Global Inc| × 2機|通信
|YAM 5|米国||Loft Orbital & LeoStella |LeoStella bus / 83 kg|技術実証
|Ñusat 34 & 35|アルゼンチン||Satellogic S.A. | 41 kg |地球観測
|ION-SCV 7 & 8|イタリア||D-Orbit / D-Orbit|ION mk02 platform |衛星キャリア
|Orbiter SN1|米国|| Launcher| |衛星キャリア
|ICEYE X21,X22,X27|フィンランド||ICEYE| |地球観測
|Umbra-SAR 2001|米国||Umbra Lab| 65 kg × 2機|地球観測
|Skykraft Deployer 1|オーストラリア||Skykraft| |衛星キャリア
|Vigoride 5|米国||Momentus| |衛星キャリア
|Chimera LEO-1|米国||Epic Aerospace| |衛星キャリア
|EOS-SAT 1|南アフリカ||Dragonfly Aerospace|µDragonfly bus / ~100 kg|地球観測

---
<!--
_footer: "Image: KuwaitSat.space CEITEC"
-->

![bg left:40% vertical](https://kuwaitsat.space/img/2-Unit-structure.png)


### KuwaitSat-1

国/種別 ... クウェート / 技術実証
構成 ... キューブサット (2U)

カメラを用いた姿勢制御の実験


![bg left:40% vertical](https://space.skyrocket.de/img_sat/bd-sat__1.jpg)

### BDSAT 2

国/種別 ... チェコ / 技術実証
運用 ... BD Sensors,中央ヨーロッパ工科大学
構成 ... キューブサット (1U) / 1 kg


アマチュア無線ペイロード
圧力測定装置、スーパーキャパシタの実証


---


![bg left:40% vertical](https://space.skyrocket.de/img_sat/spartan__1.jpg)

<!--
_footer: "Image: EnduroSat"
-->

### SharedSat 2211

国/種別 ... ブルガリア / 技術実証
運用 ... EnduroSat
構成 ... キューブサット (6U)

顧客の実験機器をのせて実験衛星として運用


![bg left:40% vertical](https://space.skyrocket.de/img_sat/lemur-2__2.jpg)

<!--
_footer: "Image: Spire"
-->

### Lemur-2 ×6機

国/種別 ... 米国 / 地球観測, 交通監視
運用 ... Spire
構成 ... キューブサット (3U) / 4 kg

STRATOS (GNSS電波掩蔽機器)
SENSE (AIS受信機)
AirSafe (ASD-B受信機)


---


![bg left:40% vertical](https://space.skyrocket.de/img_sat/connecta-t1-1__1.jpg)
![bg](https://static.wixstatic.com/media/3d111e_3418c619fc884ffe862f71f5ff717874~mv2.png/v1/fill/w_324,h_183,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3d111e_3418c619fc884ffe862f71f5ff717874~mv2.png)

<!--
_footer: "Image: Plan-S"
-->

### Connecta T1.1

国/種別 ... Turkey / 技術実証, 通信
運用 ... Plan-S
構成 ... キューブサット (3U)

### Gama Alpha


国/種別 ... フランス / 技術実証

ソーラセイルの実証
（画像は将来構想）

<!--
https://www.satelliteevolution.com/post/nanoavionics-and-gama-to-set-sail-in-space-demonstrating-solar-sail-propulsion-in-leo
-->

---

![bg left:40% vertical](https://space.skyrocket.de/img_sat/bro-1__1.jpg)
![bg left:40% vertical](https://2.bp.blogspot.com/-65wD7oIG90M/VaYrTG3K_UI/AAAAAAAAvn8/yUk3rBTyajw/s800/space_jinkoueisei.png)

<!--
_footer: "Image: UnseenLabs"
-->

### BRO 8

国/種別 ... フランス / 電磁スペクトル分析, SIGINT, 交通監視
運用 ... UnseenLabs　/ GOMSpace
構成 ... キューブサット (6U) / 6 kg

民間SIGINT衛星
船舶等の電波を受信して解析

### Menut

国/種別 ... スペイン / 地球観測
運用 ... Open Cosmos
構成 ... キューブサット (6U)

---

![bg left:40% vertical](https://space.skyrocket.de/img_sat/milspace2__1.jpg)

<!--
_footer: "Image: NanoAvionics"
-->

### MilSpace2 (Huygens  & Birkeland)

国/種別 ... ノルウェー, オランダ / 技術実証
運用 ... ノルウェー防衛技研, オランダ王立航空宇宙センター
製造 ... NanoAvionics
構成 ... キューブサット (6U) / 10 kg

NanoAvioncsの衛星プラットフォーム
顧客の実験機器をのせて実験


![bg left:40% vertical](https://space.skyrocket.de/img_sat/ksf-1__1.jpg)

<!--
_footer: "Image: ISISpace"
-->

### KSF 3 ×4機

国/種別 ... ルクセンブルク / 電磁スペクトル分析, SIGINT, 交通監視
運用 ... Kleos Space
構成 ... ISISpace / キューブサット (6U) ×4機

海上無線の位置情報を解析
人命救助・国境警備・偵察に利用

---


![bg left:40% vertical](https://space.skyrocket.de/img_sat/spacebee-10__1.jpg)

<!--
_footer: "Image: Swarm Technologies"
-->

# SpaceBEE ×10機

国/種別 ... 米国 / 通信 M2M/IoT
運用 ... Swarm Technologies
構成 ... キューブサット (0.25U) / 0.25 kg


### IoT向け Starlink

2021年8月 IoT向け衛星通信事業者「Swarm」を買収
月額$5で世界中どこでもインターネット接続

0.25Uの超超小型衛星でIoT向け通信
これまでに180機以上を投入

海洋ブイ、農業、車両追跡などに利用


---

![bg left:40% vertical](https://2.bp.blogspot.com/-65wD7oIG90M/VaYrTG3K_UI/AAAAAAAAvn8/yUk3rBTyajw/s800/space_jinkoueisei.png)

![bg left:40% vertical](https://2.bp.blogspot.com/-65wD7oIG90M/VaYrTG3K_UI/AAAAAAAAvn8/yUk3rBTyajw/s800/space_jinkoueisei.png)

### RROCI

国/種別 ... 米国 / 気象観測
運用 ... アメリカ宇宙軍
構成 ... キューブサット (12U)

### PolyItan HP-30

国/種別 ... ウクライナ / 技術実証
構成 ... キューブサット (2U)

ヒートパイプの技術実証


---

![bg left:40% vertical](https://space.skyrocket.de/img_sat/flock-1__2.jpg)

<!--
_footer: "Image: Planet Labs, Aistech"
-->

### Flock-4Y

国/種別 ... 米国 / 技術実証
運用 ... Planet Labs
構成 ... キューブサット (3U) / 5 kg
装備 ... PS0, PS1 or PS2 画像ペイロード
寿命 ... 2-3年

![bg left:40% vertical](https://space.skyrocket.de/img_sat/guardian-alpha__1.jpg)


### Guardian alpha

国/種別 ... Spain / 地球観測
運用 ... OrbAstro
構成 ... キューブサット (3U)
推進系 ... 2 × FEEP

---
<!--
_footer: "Image: SONY"
-->
![bg left vertical](https://readyfor.jp/s3/readyfor-img/ckeditor_assets/pictures/922871/content_f08fb8dc6e0ccba778d083db486e7ca4e0274e4c.png)
![bg](https://prcdn.freetls.fastly.net/release_image/103296/2/103296-2-adc6e381074b63fe28be41200901a93a-1597x889.png?format=jpeg&auto=webp&quality=85%2C65&width=1950&height=1350&fit=bounds)

## Sony Sphere-1 "EYE"

国/種別 ... 日本 / 技術実証
運用 ... SONY
構成 ... キューブサット (6U)
推進系 ... 水ベースの電気推進

### ソニー 衛星画像撮影体験サービス

「誰でも宇宙カメラマン」
自社製のフルサイズカメラ ＋ レンズ (28-135mm, F4)

地上局と通信しながら衛星を制御して画像を撮影
リアルタイムの画像確認＆360度操作


東京大学 ... 水スラスターの提供・技術実証（革新3号で実証予定だった）
JAXA ... 人工衛星の開発・運用ノウハウ

今回の打ち上げはSONYのYoutube・Webメタバースで中継
~~(ロケみる集会やんけ)~~

---

![bg left:40% vertical](https://space.skyrocket.de/img_sat/nslsat-1__1.jpg)

<!--
_footer: "Image: Sternula, NSLComm"
-->

### NSLSat 2

国/種別 ... イスラエル / 技術実証
運用 ... NSLComm / ÅAC Clyde Space
構成 ... キューブサット (6U)

2Uのスペースから非剛性リフレクターを展開
最大1Gbpsの通信を提供

![bg left:40% vertical](https://space.skyrocket.de/img_sat/sternula-1__1.jpg)

### Sternula 1

国/種別 ... デンマーク / 技術実証, 交通監視, 通信
運用 ... GOMSpace
構成 ... キューブサット (6U)
装備 ... AIS受信機, VDES通信機器


---


![bg left:40% vertical](https://space.skyrocket.de/img_sat/lynk-06__1.jpg)


### Lynk Tower 03, 04

国/種別 ... 米国 / 通信
運用 ... Lynk Global Inc.

既存の携帯電話と直接通信


![bg left:40% vertical](https://space.skyrocket.de/img_sat/yam-3__1.jpg)

<!--
_footer: "Image: Lynk Global, Loft Orbital, Dragonfly Aerospace"
-->


### YAM 5

国/種別 ... 米国 / 技術実証
運用 ... Loft Orbital; LeoStella (bus)
重量 ...  LeoStella bus / 83 kg

顧客の衛星を搭載して実験

![bg left:40% vertical fit](https://space.skyrocket.de/img_sat/eos-sat-1__1.jpg)

## EOS-SAT 1

国/種別 ... South Africa / 地球観測
運用 ... Dragonfly Aerospace
構成 ... µDragonfly bus / ~100 kg
装備 ... 2 × Dragoneye 画像ペイロード


---

![bg left:40% vertical](https://space.skyrocket.de/img_sat/nusat-1__1.jpg)


### Ñusat 34 & 35

国/種別 ... アルゼンチン / 地球観測
運用 ... Satellogic S.A.
重量 ... 41 kg
装備 ... 画像ペイロード
寿命 ... 3-4年


![bg left:40% vertical](https://space.skyrocket.de/img_sat/iceye-x4__1.jpg)

<!--
_footer: "Image: ICEYE, Umbra Lab, Satellogic"
-->

## ICEYE X21, X22, X27

国/種別 ... フィンランド, 米国 / 地球観測 (レーダー)
運用 ... ICEYE
装備 ... X-band SAR


![bg left:40% vertical](https://space.skyrocket.de/img_sat/umbra-sar__1.jpg)


### Umbra-SAR

国/種別 ... 米国 / 地球観測 (レーダー)
運用 ... Umbra Lab
重量 ... 65 kg
装備 ... X-band SAR



---

![bg left:40% vertical fit](https://space.skyrocket.de/img_sat/ion-scv2__1.jpg)

<!--
_footer: "Image: D-Orbit, Skykraft"
-->

# 衛星キャリア

顧客の衛星を搭載して軌道遷移
SpaceX Transporterと別の軌道に投入

## ION-SCV 007, 008

国/種別 ... イタリア / 衛星キャリア
運用 ... D-Orbit
構成 ... ION mk02 platform
装備 ... キューブサット放出機構

## Skykraft Deployer 1

(画像は搭載されてる方)

国/種別 ... オーストラリア / 衛星キャリア
運用 ... Skykraft


自社の通信衛星「Skykraft Block 2」を搭載
(ADS-B受信機, VHS通信機器を搭載して通信・海上監視)

![bg left:40% vertical](https://space.skyrocket.de/img_sat/skykraft_block2__1.jpg)

---

# 衛星キャリア

顧客の衛星を搭載して軌道遷移
SpaceX Transporterと別の軌道に投入


![bg left:40% vertical](https://space.skyrocket.de/img_sat/vigoride__1.jpg)

<!--
_footer: "Image: Momentus, Epic Aerospace"
-->

### Vigoride 1, 2, 3, 4, 5

国/種別 ... 米国 / 衛星キャリア
運用 ... Momentus
装備 ... キューブサット放出機構
推進系 ... 水ベースのマイクロ波式電気推進

![bg left:40% fit vertical](https://pbs.twimg.com/media/FlhgTdNaYAEFBQJ?format=jpg&name=large)


### Chimera LEO-1

国/種別 ... 米国 / 衛星キャリア
運用 ... Epic Aerospace
装備 ... キューブサット放出機構

最大200kgのペイロードを搭載して軌道遷移
過酸化水素系のスラスタ （dV = 100m/s）
将来的にはGTOに投入可能なサイズまで大型化？

---

# 衛星キャリア

顧客の衛星を搭載して軌道遷移
SpaceX Transporterと別の軌道に投入

![bg left:40% vertical](https://cdnb.artstation.com/p/assets/images/images/057/514/609/4k/martin-miguel-orbiter-update-dispensing-mktg.jpg?1671800635)
![bg](https://cdnb.artstation.com/p/assets/images/images/057/514/601/4k/martin-miguel-orbiter-update-launcher-light-separation.jpg?1671800624&dl=1)

<!--
_footer: "Image: Launcher"
-->

## Launcher Orbiter SN1

国/種別 ... 米国 / 衛星キャリア
運用 ... Launcher
装備 ... キューブサット放出機構

最大400kgのペイロードを搭載して軌道遷移
エタン/亜酸化窒素の推進系 （dV = 500m/s）

将来的には自社の小型ロケットの上段としても運用？
`;

export default {
  component: MarpForm,
  title: 'MarpForm',
};

const Template: ComponentStory<typeof MarpForm> = (args) => (
  <MarpForm {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Sample = Template.bind({});
Sample.args = {
  title: 'Transporter 6',
  markdown: T6,
};
