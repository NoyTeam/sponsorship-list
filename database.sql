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

 Date: 14/03/2022 00:10:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `money` int(11) NOT NULL,
  `time` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES (1, '狐狸', 'https://ci.cncn3.cn/06c3bddb75ca09d29f6d38a011bb45d1.jpg', 18000, 1625846400);
INSERT INTO `record` VALUES (2, '浮休', '', 12000, 1625760000);
INSERT INTO `record` VALUES (3, '問心', 'https://ci.cncn3.cn/8b3364539c3003421baf5a211be1894b.md.jpg', 1200, 1628091811);
INSERT INTO `record` VALUES (4, '阿狗', 'https://ci.cncn3.cn/453829abcc24c5d6bbbe3be1391d1fd6.md.png', 2020, 1628092330);
INSERT INTO `record` VALUES (5, 'gzx7301', 'https://ci.cncn3.cn/84379af707d1cfa6eea8f5c9e4aa37d2.jpg', 180, 1628092815);
INSERT INTO `record` VALUES (6, '蘿蔔', 'https://ci.cncn3.cn/8129a3617fcb7fc33536e8ec7533108a.md.png', 1600, 1640515135);
INSERT INTO `record` VALUES (7, 'LUVORATORRRRRY', NULL, 1875, 1642086390);
INSERT INTO `record` VALUES (8, '宇哥不開機', NULL, 110, 1642086621);
INSERT INTO `record` VALUES (9, '可浮醬', 'https://ci.cncn3.cn/d0259a448183529aec2d576b2cfa53aa.md.png', 170, 1642088073);
INSERT INTO `record` VALUES (10, 'Semonfc', 'https://ci.cncn3.cn/bd295d465357b160951d89ca19ab0ec3.md.png', 1470, 1645807270);
INSERT INTO `record` VALUES (11, 'JimWong', 'https://pic1.afdiancdn.com/user/6db11fe4139011ecb80052540025c377/avatar/13b2c47e85c2fc5b62666dfb25be0758_w700_h700_s514.jpg', 2470, 1645806025);
INSERT INTO `record` VALUES (12, '爱发电用户_m4GK', 'https://pic1.afdiancdn.com/default/avatar/avatar-blue.png', 860, 1645040450);

SET FOREIGN_KEY_CHECKS = 1;
