/*
    This file was automatically generated by Studio 3T.

    MongoDB Source Collection: `movieServer.users`

    Warnings about type conversion issues are stored as comments above the
    corresponding INSERT statement of each document.
*/


SET NAMES 'utf8' COLLATE 'utf8_general_ci';

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `__v` INTEGER,
    `_id` VARBINARY(12) NOT NULL,
    `password` LONGTEXT,
    `userAdmin` BIT,
    `userMail` LONGTEXT,
    `userPhone` LONGTEXT,
    `userPower` INTEGER,
    `userStop` BIT,
    `username` LONGTEXT,
    PRIMARY KEY (`_id`)
) CHARSET=utf8;

INSERT INTO `users` (`__v`, `_id`, `password`, `userAdmin`, `userMail`, `userPhone`, `userPower`, `userStop`, `username`)
    VALUES
        (0, x'5D108217D13CF511A850C171', 'aaa', FALSE, 'aa@qq.com', '15904911111', 0, TRUE, 'aa');
INSERT INTO `users` (`__v`, `_id`, `password`, `userAdmin`, `userMail`, `userPhone`, `userPower`, `userStop`, `username`)
    VALUES
        (0, x'5D10825ED13CF511A850C172', 'admin', TRUE, 'admin@163.com', '13808086666', 2, FALSE, 'admin');
INSERT INTO `users` (`__v`, `_id`, `password`, `userAdmin`, `userMail`, `userPhone`, `userPower`, `userStop`, `username`)
    VALUES
        (0, x'5D1082F8D13CF511A850C173', 'admin2', TRUE, 'admin2@gmail.com', '13923990666', 1, FALSE, 'admin2');
INSERT INTO `users` (`__v`, `_id`, `password`, `userAdmin`, `userMail`, `userPhone`, `userPower`, `userStop`, `username`)
    VALUES
        (0, x'5D10910D26E8F91AB0302D75', '666', FALSE, 'wj@qq.com', '13866660708', 0, FALSE, 'wj');
INSERT INTO `users` (`__v`, `_id`, `password`, `userAdmin`, `userMail`, `userPhone`, `userPower`, `userStop`, `username`)
    VALUES
        (0, x'5D10A16BDC89001D9C6986A5', '666', FALSE, 'user1@163.com', '13811110001', 0, TRUE, 'user1');
INSERT INTO `users` (`__v`, `_id`, `password`, `userAdmin`, `userMail`, `userPhone`, `userPower`, `userStop`, `username`)
    VALUES
        (0, x'5D11A76D7CAF172090B85917', '123', FALSE, '111@qq.com', '15900001111', 0, FALSE, 'yjp');