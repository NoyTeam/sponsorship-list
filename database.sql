/*
 Navicat Premium Data Transfer

 Source Server         : bill
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : bill

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 14/03/2022 22:03:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for money
-- ----------------------------
DROP TABLE IF EXISTS `money`;
CREATE TABLE `money`  (
  `id` int(11) NOT NULL,
  `type` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `format` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tohkd` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of money
-- ----------------------------
INSERT INTO `money` VALUES (1, 'USD', '$123 USD', 780);
INSERT INTO `money` VALUES (2, 'USDT', '$123 USDT', 780);
INSERT INTO `money` VALUES (3, 'CNY', '￥123 CNY', 120);
INSERT INTO `money` VALUES (4, 'JPY', '￥123 JPY', 7);
INSERT INTO `money` VALUES (5, 'NTD', '$123 NTD', 28);
INSERT INTO `money` VALUES (6, 'MOP', '$123 MOP', 100);
INSERT INTO `money` VALUES (7, 'HKD', '$123 HKD', 100);

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `money` int(11) NOT NULL,
  `hkd` int(11) NOT NULL,
  `time` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES (1, '狐狸', 'https://ci.cncn3.cn/06c3bddb75ca09d29f6d38a011bb45d1.jpg', 35000, 42000, 1625846400, 3);
INSERT INTO `record` VALUES (2, '浮休', '', 10000, 12000, 1625760000, 3);
INSERT INTO `record` VALUES (3, '問心', 'https://ci.cncn3.cn/8b3364539c3003421baf5a211be1894b.md.jpg', 1000, 1200, 1628091811, 3);
INSERT INTO `record` VALUES (4, '阿狗', 'https://ci.cncn3.cn/453829abcc24c5d6bbbe3be1391d1fd6.md.png', 1640, 1968, 1628092330, 3);
INSERT INTO `record` VALUES (5, 'gzx7301', 'https://ci.cncn3.cn/84379af707d1cfa6eea8f5c9e4aa37d2.jpg', 150, 180, 1628092815, 3);
INSERT INTO `record` VALUES (6, '蘿蔔', 'https://ci.cncn3.cn/8129a3617fcb7fc33536e8ec7533108a.md.png', 200, 1560, 1640515135, 1);
INSERT INTO `record` VALUES (7, 'LUVORATORRRRRY', NULL, 1520, 1824, 1642086390, 3);
INSERT INTO `record` VALUES (8, '宇哥不開機', NULL, 90, 108, 1642086621, 3);
INSERT INTO `record` VALUES (9, '可浮醬', 'https://ci.cncn3.cn/d0259a448183529aec2d576b2cfa53aa.md.png', 140, 168, 1642088073, 3);
INSERT INTO `record` VALUES (10, 'Semonfc', 'https://ci.cncn3.cn/bd295d465357b160951d89ca19ab0ec3.md.png', 1476, 1771, 1645807270, 3);
INSERT INTO `record` VALUES (11, 'JimWong', 'https://pic1.afdiancdn.com/user/6db11fe4139011ecb80052540025c377/avatar/13b2c47e85c2fc5b62666dfb25be0758_w700_h700_s514.jpg', 2000, 2400, 1645806025, 3);
INSERT INTO `record` VALUES (12, '爱发电用户_m4GK', 'https://pic1.afdiancdn.com/default/avatar/avatar-blue.png', 700, 840, 1645040450, 3);
INSERT INTO `record` VALUES (13, '小宫', 'https://ci.cncn3.cn/bc463b17544462cf35e822d517fb312c.md.png', 999, 7792, 1647189678, 2);
INSERT INTO `record` VALUES (14, '虚梦', 'https://ci.cncn3.cn/967da6d3fb17cd96f76d1a745b7248eb.md.png', 2000, 15600, 1647189678, 2);
INSERT INTO `record` VALUES (15, 'cny', 'https://pic1.afdiancdn.com/default/avatar/avatar-blue.png', 1145, 1374, 1647210204, 3);
INSERT INTO `record` VALUES (16, 'Hase', 'https://ci.cncn3.cn/34e328edff62f4f44207ea70dabbfc3a.md.png', 1588, 12386, 1647263679, 2);

SET FOREIGN_KEY_CHECKS = 1;
