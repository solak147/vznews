export default defineAppConfig({
  addressConfig: [
    {
      text: '臺北市',
      value: '1',
      CityEngName: 'Taipei City',
      children: [
        { value: '100', text: '中正區', AreaEngName: 'Zhongzheng Dist.' },
        { value: '103', text: '大同區', AreaEngName: 'Datong Dist.' },
        { value: '104', text: '中山區', AreaEngName: 'Zhongshan Dist.' },
        { value: '105', text: '松山區', AreaEngName: 'Songshan Dist.' },
        { value: '106', text: '大安區', AreaEngName: 'Da’an Dist.' },
        { value: '108', text: '萬華區', AreaEngName: 'Wanhua Dist.' },
        { value: '110', text: '信義區', AreaEngName: 'Xinyi Dist.' },
        { value: '111', text: '士林區', AreaEngName: 'Shilin Dist.' },
        { value: '112', text: '北投區', AreaEngName: 'Beitou Dist.' },
        { value: '114', text: '內湖區', AreaEngName: 'Neihu Dist.' },
        { value: '115', text: '南港區', AreaEngName: 'Nangang Dist.' },
        { value: '116', text: '文山區', AreaEngName: 'Wenshan Dist.' }
      ]
    },
    {
      text: '基隆市',
      value: '2',
      CityEngName: 'Keelung City',
      children: [
        { value: '200', text: '仁愛區', AreaEngName: 'Ren’ai Dist.' },
        { value: '201', text: '信義區', AreaEngName: 'Xinyi Dist.' },
        { value: '202', text: '中正區', AreaEngName: 'Zhongzheng Dist.' },
        { value: '203', text: '中山區', AreaEngName: 'Zhongshan Dist.' },
        { value: '204', text: '安樂區', AreaEngName: 'Anle Dist.' },
        { value: '205', text: '暖暖區', AreaEngName: 'Nuannuan Dist.' },
        { value: '206', text: '七堵區', AreaEngName: 'Qidu Dist.' }
      ]
    },
    {
      text: '新北市',
      value: '3',
      CityEngName: 'New Taipei City',
      children: [
        { value: '207', text: '萬里區', AreaEngName: 'Wanli Dist.' },
        { value: '208', text: '金山區', AreaEngName: 'Jinshan Dist.' },
        { value: '220', text: '板橋區', AreaEngName: 'Banqiao Dist.' },
        { value: '221', text: '汐止區', AreaEngName: 'Xizhi Dist.' },
        { value: '222', text: '深坑區', AreaEngName: 'Shenkeng Dist.' },
        { value: '223', text: '石碇區', AreaEngName: 'Shiding Dist.' },
        { value: '224', text: '瑞芳區', AreaEngName: 'Ruifang Dist.' },
        { value: '226', text: '平溪區', AreaEngName: 'Pingxi Dist.' },
        { value: '227', text: '雙溪區', AreaEngName: 'Shuangxi Dist.' },
        { value: '228', text: '貢寮區', AreaEngName: 'Gongliao Dist.' },
        { value: '231', text: '新店區', AreaEngName: 'Xindian Dist.' },
        { value: '232', text: '坪林區', AreaEngName: 'Pinglin Dist.' },
        { value: '233', text: '烏來區', AreaEngName: 'Wulai Dist.' },
        { value: '234', text: '永和區', AreaEngName: 'Yonghe Dist.' },
        { value: '235', text: '中和區', AreaEngName: 'Zhonghe Dist.' },
        { value: '236', text: '土城區', AreaEngName: 'Tucheng Dist.' },
        { value: '237', text: '三峽區', AreaEngName: 'Sanxia Dist.' },
        { value: '238', text: '樹林區', AreaEngName: 'Shulin Dist.' },
        { value: '239', text: '鶯歌區', AreaEngName: 'Yingge Dist.' },
        { value: '241', text: '三重區', AreaEngName: 'Sanchong Dist.' },
        { value: '242', text: '新莊區', AreaEngName: 'Xinzhuang Dist.' },
        { value: '243', text: '泰山區', AreaEngName: 'Taishan Dist.' },
        { value: '244', text: '林口區', AreaEngName: 'Linkou Dist.' },
        { value: '247', text: '蘆洲區', AreaEngName: 'Luzhou Dist.' },
        { value: '248', text: '五股區', AreaEngName: 'Wugu Dist.' },
        { value: '249', text: '八里區', AreaEngName: 'Bali Dist.' },
        { value: '251', text: '淡水區', AreaEngName: 'Tamsui Dist.' },
        { value: '252', text: '三芝區', AreaEngName: 'Sanzhi Dist.' },
        { value: '253', text: '石門區', AreaEngName: 'Shimen Dist.' }
      ]
    },
    {
      text: '連江縣',
      value: '4',
      CityEngName: 'Lienchiang County',
      children: [
        { value: '209', text: '南竿鄉', AreaEngName: 'Nangan Township' },
        { value: '210', text: '北竿鄉', AreaEngName: 'Beigan Township' },
        { value: '211', text: '莒光鄉', AreaEngName: 'Juguang Township' },
        { value: '212', text: '東引鄉', AreaEngName: 'Dongyin Township' }
      ]
    },
    {
      text: '宜蘭縣',
      value: '5',
      CityEngName: 'Yilan County',
      children: [
        { value: '260', text: '宜蘭市', AreaEngName: 'Yilan City' },
        { value: '263', text: '壯圍鄉', AreaEngName: 'Zhuangwei Township' },
        { value: '261', text: '頭城鎮', AreaEngName: 'Toucheng Township' },
        { value: '262', text: '礁溪鄉', AreaEngName: 'Jiaoxi Township' },
        { value: '264', text: '員山鄉', AreaEngName: 'Yuanshan Township' },
        { value: '265', text: '羅東鎮', AreaEngName: 'Luodong Township' },
        { value: '266', text: '三星鄉', AreaEngName: 'Sanxing Township' },
        { value: '267', text: '大同鄉', AreaEngName: 'Datong Township' },
        { value: '268', text: '五結鄉', AreaEngName: 'Wujie Township' },
        { value: '269', text: '冬山鄉', AreaEngName: 'Dongshan Township' },
        { value: '270', text: '蘇澳鎮', AreaEngName: 'Su’ao Township' },
        { value: '272', text: '南澳鄉', AreaEngName: 'Nan’ao Township' },
        { value: '290', text: '釣魚臺', AreaEngName: 'Diaoyutai' }
      ]
    },
    {
      text: '釣魚臺',
      value: '6',
      CityEngName: 'Diauyutai',
      children: [{ value: '290', text: '釣魚臺', AreaEngName: 'Diaoyutai' }]
    },
    {
      text: '新竹市',
      value: '7',
      CityEngName: 'Hsinchu City',
      children: [
        { value: '300', text: '東區', AreaEngName: 'East Dist.' },
        { value: '300', text: '北區', AreaEngName: 'North Dist.' },
        { value: '300', text: '香山區', AreaEngName: 'Xiangshan Dist.' }
      ]
    },
    {
      text: '新竹縣',
      value: '8',
      CityEngName: 'Hsinchu County',
      children: [
        { value: '308', text: '寶山鄉', AreaEngName: 'Baoshan Township' },
        { value: '302', text: '竹北市', AreaEngName: 'Zhubei City' },
        { value: '303', text: '湖口鄉', AreaEngName: 'Hukou Township' },
        { value: '304', text: '新豐鄉', AreaEngName: 'Xinfeng Township' },
        { value: '305', text: '新埔鎮', AreaEngName: 'Xinpu Township' },
        { value: '306', text: '關西鎮', AreaEngName: 'Guanxi Township' },
        { value: '307', text: '芎林鄉', AreaEngName: 'Qionglin Township' },
        { value: '310', text: '竹東鎮', AreaEngName: 'Zhudong Township' },
        { value: '311', text: '五峰鄉', AreaEngName: 'Wufeng Township' },
        { value: '312', text: '橫山鄉', AreaEngName: 'Hengshan Township' },
        { value: '313', text: '尖石鄉', AreaEngName: 'Jianshi Township' },
        { value: '314', text: '北埔鄉', AreaEngName: 'Beipu Township' },
        { value: '315', text: '峨眉鄉', AreaEngName: 'Emei Township' }
      ]
    },
    {
      text: '桃園市',
      value: '9',
      CityEngName: 'Taoyuan City',
      children: [
        { value: '320', text: '中壢區', AreaEngName: 'Zhongli Dist.' },
        { value: '324', text: '平鎮區', AreaEngName: 'Pingzhen Dist.' },
        { value: '325', text: '龍潭區', AreaEngName: 'Longtan Dist.' },
        { value: '326', text: '楊梅區', AreaEngName: 'Yangmei Dist.' },
        { value: '327', text: '新屋區', AreaEngName: 'Xinwu Dist.' },
        { value: '328', text: '觀音區', AreaEngName: 'Guanyin Dist.' },
        { value: '330', text: '桃園區', AreaEngName: 'Taoyuan Dist.' },
        { value: '333', text: '龜山區', AreaEngName: 'Guishan Dist.' },
        { value: '334', text: '八德區', AreaEngName: 'Bade Dist.' },
        { value: '335', text: '大溪區', AreaEngName: 'Daxi Dist.' },
        { value: '336', text: '復興區', AreaEngName: 'Fuxing Dist.' },
        { value: '337', text: '大園區', AreaEngName: 'Dayuan Dist.' },
        { value: '338', text: '蘆竹區', AreaEngName: 'Luzhu Dist.' }
      ]
    },
    {
      text: '苗栗縣',
      value: '10',
      CityEngName: 'Miaoli County',
      children: [
        { value: '350', text: '竹南鎮', AreaEngName: 'Zhunan Township' },
        { value: '351', text: '頭份市', AreaEngName: 'Toufen City' },
        { value: '352', text: '三灣鄉', AreaEngName: 'Sanwan Township' },
        { value: '353', text: '南庄鄉', AreaEngName: 'Nanzhuang Township' },
        { value: '354', text: '獅潭鄉', AreaEngName: 'Shitan Township' },
        { value: '356', text: '後龍鎮', AreaEngName: 'Houlong Township' },
        { value: '357', text: '通霄鎮', AreaEngName: 'Tongxiao Township' },
        { value: '358', text: '苑裡鎮', AreaEngName: 'Yuanli Township' },
        { value: '360', text: '苗栗市', AreaEngName: 'Miaoli City' },
        { value: '361', text: '造橋鄉', AreaEngName: 'Zaoqiao Township' },
        { value: '362', text: '頭屋鄉', AreaEngName: 'Touwu Township' },
        { value: '363', text: '公館鄉', AreaEngName: 'Gongguan Township' },
        { value: '364', text: '大湖鄉', AreaEngName: 'Dahu Township' },
        { value: '365', text: '泰安鄉', AreaEngName: 'Tai’an Township' },
        { value: '366', text: '銅鑼鄉', AreaEngName: 'Tongluo Township' },
        { value: '367', text: '三義鄉', AreaEngName: 'Sanyi Township' },
        { value: '368', text: '西湖鄉', AreaEngName: 'Xihu Township' },
        { value: '369', text: '卓蘭鎮', AreaEngName: 'Zhuolan Township' }
      ]
    },
    {
      text: '臺中市',
      value: '11',
      CityEngName: 'Taichung City',
      children: [
        { value: '400', text: '中區', AreaEngName: 'Central Dist.' },
        { value: '401', text: '東區', AreaEngName: 'East Dist.' },
        { value: '402', text: '南區', AreaEngName: 'South Dist.' },
        { value: '403', text: '西區', AreaEngName: 'West Dist.' },
        { value: '404', text: '北區', AreaEngName: 'North Dist.' },
        { value: '406', text: '北屯區', AreaEngName: 'Beitun Dist.' },
        { value: '407', text: '西屯區', AreaEngName: 'Xitun Dist.' },
        { value: '408', text: '南屯區', AreaEngName: 'Nantun Dist.' },
        { value: '411', text: '太平區', AreaEngName: 'Taiping Dist.' },
        { value: '412', text: '大里區', AreaEngName: 'Dali Dist.' },
        { value: '413', text: '霧峰區', AreaEngName: 'Wufeng Dist.' },
        { value: '414', text: '烏日區', AreaEngName: 'Wuri Dist.' },
        { value: '420', text: '豐原區', AreaEngName: 'Fengyuan Dist.' },
        { value: '421', text: '后里區', AreaEngName: 'Houli Dist.' },
        { value: '422', text: '石岡區', AreaEngName: 'Shigang Dist.' },
        { value: '423', text: '東勢區', AreaEngName: 'Dongshi Dist.' },
        { value: '424', text: '和平區', AreaEngName: 'Heping Dist.' },
        { value: '426', text: '新社區', AreaEngName: 'Xinshe Dist.' },
        { value: '427', text: '潭子區', AreaEngName: 'Tanzi Dist.' },
        { value: '428', text: '大雅區', AreaEngName: 'Daya Dist.' },
        { value: '429', text: '神岡區', AreaEngName: 'Shengang Dist.' },
        { value: '432', text: '大肚區', AreaEngName: 'Dadu Dist.' },
        { value: '433', text: '沙鹿區', AreaEngName: 'Shalu Dist.' },
        { value: '434', text: '龍井區', AreaEngName: 'Longjing Dist.' },
        { value: '435', text: '梧棲區', AreaEngName: 'Wuqi Dist.' },
        { value: '436', text: '清水區', AreaEngName: 'Qingshui Dist.' },
        { value: '437', text: '大甲區', AreaEngName: 'Dajia Dist.' },
        { value: '438', text: '外埔區', AreaEngName: 'Waipu Dist.' },
        { value: '439', text: '大安區', AreaEngName: 'Da’an Dist.' }
      ]
    },
    {
      text: '彰化縣',
      value: '12',
      CityEngName: 'Changhua County',
      children: [
        { value: '500', text: '彰化市', AreaEngName: 'Changhua City' },
        { value: '502', text: '芬園鄉', AreaEngName: 'Fenyuan Township' },
        { value: '503', text: '花壇鄉', AreaEngName: 'Huatan Township' },
        { value: '504', text: '秀水鄉', AreaEngName: 'Xiushui Township' },
        { value: '505', text: '鹿港鎮', AreaEngName: 'Lukang Township' },
        { value: '506', text: '福興鄉', AreaEngName: 'Fuxing Township' },
        { value: '507', text: '線西鄉', AreaEngName: 'Xianxi Township' },
        { value: '508', text: '和美鎮', AreaEngName: 'Hemei Township' },
        { value: '509', text: '伸港鄉', AreaEngName: 'Shengang Township' },
        { value: '510', text: '員林市', AreaEngName: 'Yuanlin City' },
        { value: '511', text: '社頭鄉', AreaEngName: 'Shetou Township' },
        { value: '512', text: '永靖鄉', AreaEngName: 'Yongjing Township' },
        { value: '513', text: '埔心鄉', AreaEngName: 'Puxin Township' },
        { value: '514', text: '溪湖鎮', AreaEngName: 'Xihu Township' },
        { value: '515', text: '大村鄉', AreaEngName: 'Dacun Township' },
        { value: '516', text: '埔鹽鄉', AreaEngName: 'Puyan Township' },
        { value: '520', text: '田中鎮', AreaEngName: 'Tianzhong Township' },
        { value: '521', text: '北斗鎮', AreaEngName: 'Beidou Township' },
        { value: '522', text: '田尾鄉', AreaEngName: 'Tianwei Township' },
        { value: '523', text: '埤頭鄉', AreaEngName: 'Pitou Township' },
        { value: '524', text: '溪州鄉', AreaEngName: 'Xizhou Township' },
        { value: '525', text: '竹塘鄉', AreaEngName: 'Zhutang Township' },
        { value: '526', text: '二林鎮', AreaEngName: 'Erlin Township' },
        { value: '527', text: '大城鄉', AreaEngName: 'Dacheng Township' },
        { value: '528', text: '芳苑鄉', AreaEngName: 'Fangyuan Township' },
        { value: '530', text: '二水鄉', AreaEngName: 'Ershui Township' }
      ]
    },
    {
      text: '南投縣',
      value: '13',
      CityEngName: 'Nantou County',
      children: [
        { value: '540', text: '南投市', AreaEngName: 'Nantou City' },
        { value: '541', text: '中寮鄉', AreaEngName: 'Zhongliao Township' },
        { value: '542', text: '草屯鎮', AreaEngName: 'Caotun Township' },
        { value: '544', text: '國姓鄉', AreaEngName: 'Guoxing Township' },
        { value: '545', text: '埔里鎮', AreaEngName: 'Puli Township' },
        { value: '546', text: '仁愛鄉', AreaEngName: 'Ren’ai Township' },
        { value: '551', text: '名間鄉', AreaEngName: 'Mingjian Township' },
        { value: '552', text: '集集鎮', AreaEngName: 'Jiji Township' },
        { value: '553', text: '水里鄉', AreaEngName: 'Shuili Township' },
        { value: '555', text: '魚池鄉', AreaEngName: 'Yuchi Township' },
        { value: '556', text: '信義鄉', AreaEngName: 'Xinyi Township' },
        { value: '557', text: '竹山鎮', AreaEngName: 'Zhushan Township' },
        { value: '558', text: '鹿谷鄉', AreaEngName: 'Lugu Township' }
      ]
    },
    {
      text: '嘉義市',
      value: '14',
      CityEngName: 'Chiayi City',
      children: [
        { value: '600', text: '西區', AreaEngName: 'West Dist.' },
        { value: '600', text: '東區', AreaEngName: 'East Dist.' }
      ]
    },
    {
      text: '嘉義縣',
      value: '15',
      CityEngName: 'Chiayi County',
      children: [
        { value: '602', text: '番路鄉', AreaEngName: 'Fanlu Township' },
        { value: '603', text: '梅山鄉', AreaEngName: 'Meishan Township' },
        { value: '604', text: '竹崎鄉', AreaEngName: 'Zhuqi Township' },
        { value: '605', text: '阿里山鄉', AreaEngName: 'Alishan Township' },
        { value: '606', text: '中埔鄉', AreaEngName: 'Zhongpu Township' },
        { value: '607', text: '大埔鄉', AreaEngName: 'Dapu Township' },
        { value: '608', text: '水上鄉', AreaEngName: 'Shuishang Township' },
        { value: '611', text: '鹿草鄉', AreaEngName: 'Lucao Township' },
        { value: '612', text: '太保市', AreaEngName: 'Taibao City' },
        { value: '613', text: '朴子市', AreaEngName: 'Puzi City' },
        { value: '614', text: '東石鄉', AreaEngName: 'Dongshi Township' },
        { value: '615', text: '六腳鄉', AreaEngName: 'Liujiao Township' },
        { value: '616', text: '新港鄉', AreaEngName: 'Xingang Township' },
        { value: '621', text: '民雄鄉', AreaEngName: 'Minxiong Township' },
        { value: '622', text: '大林鎮', AreaEngName: 'Dalin Township' },
        { value: '623', text: '溪口鄉', AreaEngName: 'Xikou Township' },
        { value: '624', text: '義竹鄉', AreaEngName: 'Yizhu Township' },
        { value: '625', text: '布袋鎮', AreaEngName: 'Budai Township' }
      ]
    },
    {
      text: '雲林縣',
      value: '16',
      CityEngName: 'Yunlin County',
      children: [
        { value: '630', text: '斗南鎮', AreaEngName: 'Dounan Township' },
        { value: '631', text: '大埤鄉', AreaEngName: 'Dapi Township' },
        { value: '632', text: '虎尾鎮', AreaEngName: 'Huwei Township' },
        { value: '633', text: '土庫鎮', AreaEngName: 'Tuku Township' },
        { value: '634', text: '褒忠鄉', AreaEngName: 'Baozhong Township' },
        { value: '635', text: '東勢鄉', AreaEngName: 'Dongshi Township' },
        { value: '636', text: '臺西鄉', AreaEngName: 'Taixi Township' },
        { value: '637', text: '崙背鄉', AreaEngName: 'Lunbei Township' },
        { value: '638', text: '麥寮鄉', AreaEngName: 'Mailiao Township' },
        { value: '640', text: '斗六市', AreaEngName: 'Douliu City' },
        { value: '643', text: '林內鄉', AreaEngName: 'Linnei Township' },
        { value: '646', text: '古坑鄉', AreaEngName: 'Gukeng Township' },
        { value: '647', text: '莿桐鄉', AreaEngName: 'Citong Township' },
        { value: '648', text: '西螺鎮', AreaEngName: 'Xiluo Township' },
        { value: '649', text: '二崙鄉', AreaEngName: 'Erlun Township' },
        { value: '651', text: '北港鎮', AreaEngName: 'Beigang Township' },
        { value: '652', text: '水林鄉', AreaEngName: 'Shuilin Township' },
        { value: '653', text: '口湖鄉', AreaEngName: 'Kouhu Township' },
        { value: '654', text: '四湖鄉', AreaEngName: 'Sihu Township' },
        { value: '655', text: '元長鄉', AreaEngName: 'Yuanchang Township' }
      ]
    },
    {
      text: '臺南市',
      value: '17',
      CityEngName: 'Tainan City',
      children: [
        { value: '700', text: '中西區', AreaEngName: 'West Central Dist.' },
        { value: '701', text: '東區', AreaEngName: 'East Dist.' },
        { value: '702', text: '南區', AreaEngName: 'South Dist.' },
        { value: '704', text: '北區', AreaEngName: 'North Dist.' },
        { value: '708', text: '安平區', AreaEngName: 'Anping Dist.' },
        { value: '709', text: '安南區', AreaEngName: 'Annan Dist.' },
        { value: '710', text: '永康區', AreaEngName: 'Yongkang Dist.' },
        { value: '711', text: '歸仁區', AreaEngName: 'Guiren Dist.' },
        { value: '712', text: '新化區', AreaEngName: 'Xinhua Dist.' },
        { value: '713', text: '左鎮區', AreaEngName: 'Zuozhen Dist.' },
        { value: '714', text: '玉井區', AreaEngName: 'Yujing Dist.' },
        { value: '715', text: '楠西區', AreaEngName: 'Nanxi Dist.' },
        { value: '716', text: '南化區', AreaEngName: 'Nanhua Dist.' },
        { value: '717', text: '仁德區', AreaEngName: 'Rende Dist.' },
        { value: '718', text: '關廟區', AreaEngName: 'Guanmiao Dist.' },
        { value: '719', text: '龍崎區', AreaEngName: 'Longqi Dist.' },
        { value: '720', text: '官田區', AreaEngName: 'Guantian Dist.' },
        { value: '721', text: '麻豆區', AreaEngName: 'Madou Dist.' },
        { value: '722', text: '佳里區', AreaEngName: 'Jiali Dist.' },
        { value: '723', text: '西港區', AreaEngName: 'Xigang Dist.' },
        { value: '724', text: '七股區', AreaEngName: 'Qigu Dist.' },
        { value: '725', text: '將軍區', AreaEngName: 'Jiangjun Dist.' },
        { value: '726', text: '學甲區', AreaEngName: 'Xuejia Dist.' },
        { value: '727', text: '北門區', AreaEngName: 'Beimen Dist.' },
        { value: '730', text: '新營區', AreaEngName: 'Xinying Dist.' },
        { value: '731', text: '後壁區', AreaEngName: 'Houbi Dist.' },
        { value: '732', text: '白河區', AreaEngName: 'Baihe Dist.' },
        { value: '733', text: '東山區', AreaEngName: 'Dongshan Dist.' },
        { value: '734', text: '六甲區', AreaEngName: 'Liujia Dist.' },
        { value: '735', text: '下營區', AreaEngName: 'Xiaying Dist.' },
        { value: '736', text: '柳營區', AreaEngName: 'Liuying Dist.' },
        { value: '737', text: '鹽水區', AreaEngName: 'Yanshui Dist.' },
        { value: '741', text: '善化區', AreaEngName: 'Shanhua Dist.' },
        { value: '744', text: '新市區', AreaEngName: 'Xinshi Dist.' },
        { value: '742', text: '大內區', AreaEngName: 'Danei Dist.' },
        { value: '743', text: '山上區', AreaEngName: 'Shanshang Dist.' },
        { value: '745', text: '安定區', AreaEngName: 'Anding Dist.' }
      ]
    },
    {
      text: '高雄市',
      value: '18',
      CityEngName: 'Kaohsiung City',
      children: [
        { value: '800', text: '新興區', AreaEngName: 'Xinxing Dist.' },
        { value: '801', text: '前金區', AreaEngName: 'Qianjin Dist.' },
        { value: '802', text: '苓雅區', AreaEngName: 'Lingya Dist.' },
        { value: '803', text: '鹽埕區', AreaEngName: 'Yancheng Dist.' },
        { value: '804', text: '鼓山區', AreaEngName: 'Gushan Dist.' },
        { value: '805', text: '旗津區', AreaEngName: 'Qijin Dist.' },
        { value: '806', text: '前鎮區', AreaEngName: 'Qianzhen Dist.' },
        { value: '807', text: '三民區', AreaEngName: 'Sanmin Dist.' },
        { value: '811', text: '楠梓區', AreaEngName: 'Nanzi Dist.' },
        { value: '812', text: '小港區', AreaEngName: 'Xiaogang Dist.' },
        { value: '813', text: '左營區', AreaEngName: 'Zuoying Dist.' },
        { value: '814', text: '仁武區', AreaEngName: 'Renwu Dist.' },
        { value: '815', text: '大社區', AreaEngName: 'Dashe Dist.' },
        { value: '817', text: '東沙群島', AreaEngName: 'Dongsha Islands' },
        { value: '819', text: '南沙群島', AreaEngName: 'Nansha Islands' },
        { value: '820', text: '岡山區', AreaEngName: 'Gangshan Dist.' },
        { value: '821', text: '路竹區', AreaEngName: 'Luzhu Dist.' },
        { value: '822', text: '阿蓮區', AreaEngName: 'Alian Dist.' },
        { value: '823', text: '田寮區', AreaEngName: 'Tianliao Dist.' },
        { value: '824', text: '燕巢區', AreaEngName: 'Yanchao Dist.' },
        { value: '825', text: '橋頭區', AreaEngName: 'Qiaotou Dist.' },
        { value: '826', text: '梓官區', AreaEngName: 'Ziguan Dist.' },
        { value: '827', text: '彌陀區', AreaEngName: 'Mituo Dist.' },
        { value: '828', text: '永安區', AreaEngName: 'Yong’an Dist.' },
        { value: '829', text: '湖內區', AreaEngName: 'Hunei Dist.' },
        { value: '830', text: '鳳山區', AreaEngName: 'Fengshan Dist.' },
        { value: '831', text: '大寮區', AreaEngName: 'Daliao Dist.' },
        { value: '832', text: '林園區', AreaEngName: 'Linyuan Dist.' },
        { value: '833', text: '鳥松區', AreaEngName: 'Niaosong Dist.' },
        { value: '840', text: '大樹區', AreaEngName: 'Dashu Dist.' },
        { value: '842', text: '旗山區', AreaEngName: 'Qishan Dist.' },
        { value: '843', text: '美濃區', AreaEngName: 'Meinong Dist.' },
        { value: '844', text: '六龜區', AreaEngName: 'Liugui Dist.' },
        { value: '845', text: '內門區', AreaEngName: 'Neimen Dist.' },
        { value: '846', text: '杉林區', AreaEngName: 'Shanlin Dist.' },
        { value: '847', text: '甲仙區', AreaEngName: 'Jiaxian Dist.' },
        { value: '848', text: '桃源區', AreaEngName: 'Taoyuan Dist.' },
        { value: '849', text: '那瑪夏區', AreaEngName: 'Namaxia Dist.' },
        { value: '851', text: '茂林區', AreaEngName: 'Maolin Dist.' },
        { value: '852', text: '茄萣區', AreaEngName: 'Qieding Dist.' }
      ]
    },
    {
      text: '南海島',
      value: '19',
      CityEngName: 'Nanhai',
      children: [
        { value: '817', text: '東沙群島', AreaEngName: 'Dongsha Islands' },
        { value: '819', text: '南沙群島', AreaEngName: 'Nansha Islands' }
      ]
    },
    {
      text: '澎湖縣',
      value: '20',
      CityEngName: 'Penghu County',
      children: [
        { value: '880', text: '馬公市', AreaEngName: 'Magong City' },
        { value: '881', text: '西嶼鄉', AreaEngName: 'Xiyu Township' },
        { value: '882', text: '望安鄉', AreaEngName: 'Wang’an Township' },
        { value: '883', text: '七美鄉', AreaEngName: 'Qimei Township' },
        { value: '884', text: '白沙鄉', AreaEngName: 'Baisha Township' },
        { value: '885', text: '湖西鄉', AreaEngName: 'Huxi Township' }
      ]
    },
    {
      text: '金門縣',
      value: '21',
      CityEngName: 'Kinmen County',
      children: [
        { value: '890', text: '金沙鎮', AreaEngName: 'Jinsha Township' },
        { value: '891', text: '金湖鎮', AreaEngName: 'Jinhu Township' },
        { value: '892', text: '金寧鄉', AreaEngName: 'Jinning Township' },
        { value: '893', text: '金城鎮', AreaEngName: 'Jincheng Township' },
        { value: '894', text: '烈嶼鄉', AreaEngName: 'Lieyu Township' },
        { value: '896', text: '烏坵鄉', AreaEngName: 'Wuqiu Township' }
      ]
    },
    {
      text: '屏東縣',
      value: '22',
      CityEngName: 'Pingtung County',
      children: [
        { value: '900', text: '屏東市', AreaEngName: 'Pingtung City' },
        { value: '901', text: '三地門鄉', AreaEngName: 'Sandimen Township' },
        { value: '902', text: '霧臺鄉', AreaEngName: 'Wutai Township' },
        { value: '903', text: '瑪家鄉', AreaEngName: 'Majia Township' },
        { value: '904', text: '九如鄉', AreaEngName: 'Jiuru Township' },
        { value: '905', text: '里港鄉', AreaEngName: 'Ligang Township' },
        { value: '906', text: '高樹鄉', AreaEngName: 'Gaoshu Township' },
        { value: '907', text: '鹽埔鄉', AreaEngName: 'Yanpu Township' },
        { value: '908', text: '長治鄉', AreaEngName: 'Changzhi Township' },
        { value: '909', text: '麟洛鄉', AreaEngName: 'Linluo Township' },
        { value: '911', text: '竹田鄉', AreaEngName: 'Zhutian Township' },
        { value: '912', text: '內埔鄉', AreaEngName: 'Neipu Township' },
        { value: '913', text: '萬丹鄉', AreaEngName: 'Wandan Township' },
        { value: '920', text: '潮州鎮', AreaEngName: 'Chaozhou Township' },
        { value: '921', text: '泰武鄉', AreaEngName: 'Taiwu Township' },
        { value: '922', text: '來義鄉', AreaEngName: 'Laiyi Township' },
        { value: '923', text: '萬巒鄉', AreaEngName: 'Wanluan Township' },
        { value: '924', text: '崁頂鄉', AreaEngName: 'Kanding Township' },
        { value: '925', text: '新埤鄉', AreaEngName: 'Xinpi Township' },
        { value: '926', text: '南州鄉', AreaEngName: 'Nanzhou Township' },
        { value: '927', text: '林邊鄉', AreaEngName: 'Linbian Township' },
        { value: '928', text: '東港鎮', AreaEngName: 'Donggang Township' },
        { value: '929', text: '琉球鄉', AreaEngName: 'Liuqiu Township' },
        { value: '931', text: '佳冬鄉', AreaEngName: 'Jiadong Township' },
        { value: '932', text: '新園鄉', AreaEngName: 'Xinyuan Township' },
        { value: '940', text: '枋寮鄉', AreaEngName: 'Fangliao Township' },
        { value: '941', text: '枋山鄉', AreaEngName: 'Fangshan Township' },
        { value: '942', text: '春日鄉', AreaEngName: 'Chunri Township' },
        { value: '943', text: '獅子鄉', AreaEngName: 'Shizi Township' },
        { value: '944', text: '車城鄉', AreaEngName: 'Checheng Township' },
        { value: '945', text: '牡丹鄉', AreaEngName: 'Mudan Township' },
        { value: '946', text: '恆春鎮', AreaEngName: 'Hengchun Township' },
        { value: '947', text: '滿州鄉', AreaEngName: 'Manzhou Township' }
      ]
    },
    {
      text: '臺東縣',
      value: '23',
      CityEngName: 'Taitung County',
      children: [
        { value: '950', text: '臺東市', AreaEngName: 'Taitung City' },
        { value: '951', text: '綠島鄉', AreaEngName: 'Ludao Township' },
        { value: '952', text: '蘭嶼鄉', AreaEngName: 'Lanyu Township' },
        { value: '953', text: '延平鄉', AreaEngName: 'Yanping Township' },
        { value: '954', text: '卑南鄉', AreaEngName: 'Beinan Township' },
        { value: '955', text: '鹿野鄉', AreaEngName: 'Luye Township' },
        { value: '956', text: '關山鎮', AreaEngName: 'Guanshan Township' },
        { value: '957', text: '海端鄉', AreaEngName: 'Haiduan Township' },
        { value: '958', text: '池上鄉', AreaEngName: 'Chishang Township' },
        { value: '959', text: '東河鄉', AreaEngName: 'Donghe Township' },
        { value: '961', text: '成功鎮', AreaEngName: 'Chenggong Township' },
        { value: '962', text: '長濱鄉', AreaEngName: 'Changbin Township' },
        { value: '963', text: '太麻里鄉', AreaEngName: 'Taimali Township' },
        { value: '964', text: '金峰鄉', AreaEngName: 'Jinfeng Township' },
        { value: '965', text: '大武鄉', AreaEngName: 'Dawu Township' },
        { value: '966', text: '達仁鄉', AreaEngName: 'Daren Township' }
      ]
    },
    {
      text: '花蓮縣',
      value: '24',
      CityEngName: 'Hualien County',
      children: [
        { value: '970', text: '花蓮市', AreaEngName: 'Hualien City' },
        { value: '971', text: '新城鄉', AreaEngName: 'Xincheng Township' },
        { value: '972', text: '秀林鄉', AreaEngName: 'Xiulin Township' },
        { value: '973', text: '吉安鄉', AreaEngName: 'Ji’an Township' },
        { value: '974', text: '壽豐鄉', AreaEngName: 'Shoufeng Township' },
        { value: '975', text: '鳳林鎮', AreaEngName: 'Fenglin Township' },
        { value: '976', text: '光復鄉', AreaEngName: 'Guangfu Township' },
        { value: '977', text: '豐濱鄉', AreaEngName: 'Fengbin Township' },
        { value: '978', text: '瑞穗鄉', AreaEngName: 'Ruisui Township' },
        { value: '979', text: '萬榮鄉', AreaEngName: 'Wanrong Township' },
        { value: '981', text: '玉里鎮', AreaEngName: 'Yuli Township' },
        { value: '982', text: '卓溪鄉', AreaEngName: 'Zhuoxi Township' },
        { value: '983', text: '富里鄉', AreaEngName: 'Fuli Township' }
      ]
    }
  ]
})
